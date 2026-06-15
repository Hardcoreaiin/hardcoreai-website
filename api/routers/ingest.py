from __future__ import annotations

import asyncio
import logging
import os
from typing import Any

from fastapi import APIRouter, BackgroundTasks, HTTPException
from supabase import create_client, Client

from api.services.chunker import process_pdf
from api.services.embedder import generate_embeddings

logger = logging.getLogger(__name__)
router = APIRouter(tags=["ingest"])


def _get_supabase() -> Client:
    url = os.getenv("SUPABASE_URL") or os.getenv("NEXT_PUBLIC_SUPABASE_URL")
    key = os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")
    if not url or not key:
        raise RuntimeError("Supabase URL or key not configured")
    return create_client(url, key)


# ---------------------------------------------------------------------------
# Background ingestion task
# ---------------------------------------------------------------------------
async def _ingest_document(doc_id: str) -> None:
    """Download PDF, chunk, embed, and store vectors for a single document."""
    supabase = _get_supabase()

    # 1. Fetch document record
    doc_resp = supabase.table("documents").select("*").eq("id", doc_id).single().execute()
    doc: dict[str, Any] = doc_resp.data
    if not doc:
        logger.error("Document %s not found in database", doc_id)
        return

    storage_path: str = doc["storage_path"]
    project_id: str = doc["project_id"]

    logger.info("Starting ingestion for doc %s  (path: %s)", doc_id, storage_path)

    try:
        # 2. Mark as processing
        supabase.table("documents").update({"status": "processing"}).eq("id", doc_id).execute()

        # 3. Download PDF from Supabase Storage
        pdf_bytes = supabase.storage.from_("project-documents").download(storage_path)
        if not pdf_bytes:
            raise RuntimeError("Downloaded empty file from storage")

        logger.info("Downloaded %d bytes for doc %s", len(pdf_bytes), doc_id)

        # 4 + 5. Extract text and chunk
        chunks, page_count = process_pdf(pdf_bytes)
        logger.info("Extracted %d chunks from %d pages", len(chunks), page_count)

        if not chunks:
            raise RuntimeError("No text chunks extracted from PDF")

        # 6. Generate embeddings
        chunk_texts = [c.content for c in chunks]
        embeddings = await generate_embeddings(chunk_texts)
        logger.info("Generated %d embeddings", len(embeddings))

        # 7. Insert chunks into document_chunks table
        rows = [
            {
                "document_id": doc_id,
                "project_id": project_id,
                "content": chunk.content,
                "page_number": chunk.page_number,
                "chunk_index": chunk.chunk_index,
                "embedding": embedding,
            }
            for chunk, embedding in zip(chunks, embeddings)
        ]

        # Insert in batches of 100 to avoid payload limits
        batch_size = 100
        for i in range(0, len(rows), batch_size):
            batch = rows[i : i + batch_size]
            supabase.table("document_chunks").insert(batch).execute()
            logger.info(
                "Inserted chunk batch %d–%d / %d",
                i,
                min(i + batch_size, len(rows)),
                len(rows),
            )

        # 8. Mark as ready and update page count
        supabase.table("documents").update({
            "status": "ready",
            "page_count": page_count,
        }).eq("id", doc_id).execute()

        logger.info("✅ Ingestion complete for doc %s (%d chunks, %d pages)", doc_id, len(chunks), page_count)

    except Exception as exc:
        logger.exception("❌ Ingestion failed for doc %s: %s", doc_id, exc)
        try:
            supabase.table("documents").update({"status": "error"}).eq("id", doc_id).execute()
        except Exception as update_exc:
            logger.error("Failed to update document status to error: %s", update_exc)


# ---------------------------------------------------------------------------
# Route
# ---------------------------------------------------------------------------
@router.post("/ingest/{doc_id}", status_code=202)
async def ingest_document(doc_id: str, background_tasks: BackgroundTasks) -> dict[str, str]:
    """Trigger async PDF ingestion for a document.

    Returns 202 immediately; processing runs in the background.
    """
    # Validate the document exists before accepting
    supabase = _get_supabase()
    try:
        doc_resp = supabase.table("documents").select("id, status").eq("id", doc_id).single().execute()
        if not doc_resp.data:
            raise HTTPException(status_code=404, detail=f"Document {doc_id} not found")
    except HTTPException:
        raise
    except Exception as exc:
        logger.error("Failed to look up document %s: %s", doc_id, exc)
        raise HTTPException(status_code=404, detail=f"Document {doc_id} not found") from exc

    # Don't re-process documents that are already processing or ready
    current_status = doc_resp.data.get("status")
    if current_status == "processing":
        return {"status": "already_processing", "doc_id": doc_id}
    if current_status == "ready":
        return {"status": "already_ready", "doc_id": doc_id}

    background_tasks.add_task(asyncio.to_thread, asyncio.run, _ingest_document(doc_id))

    return {"status": "accepted", "doc_id": doc_id}

from __future__ import annotations

import os
import logging
from typing import Optional

logger = logging.getLogger(__name__)

BATCH_SIZE = 50


async def generate_embeddings(texts: list[str]) -> list[list[float]]:
    """Generate embeddings for a list of texts.

    Tries Gemini first (if GOOGLE_API_KEY is set), then falls back to
    OpenAI text-embedding-3-small.  Batches in groups of BATCH_SIZE.
    """
    google_key = os.getenv("GOOGLE_API_KEY")
    openai_key = os.getenv("OPENAI_API_KEY")

    if google_key:
        return await _embed_with_gemini(texts, google_key)
    elif openai_key:
        return await _embed_with_openai(texts, openai_key)
    else:
        raise RuntimeError(
            "No embedding API key configured. "
            "Set GOOGLE_API_KEY or OPENAI_API_KEY in your environment."
        )


# ---------------------------------------------------------------------------
# Gemini embeddings
# ---------------------------------------------------------------------------
async def _embed_with_gemini(texts: list[str], api_key: str) -> list[list[float]]:
    import google.generativeai as genai

    genai.configure(api_key=api_key)
    all_embeddings: list[list[float]] = []

    for i in range(0, len(texts), BATCH_SIZE):
        batch = texts[i : i + BATCH_SIZE]
        logger.info(
            "Gemini embedding batch %d–%d / %d",
            i,
            min(i + BATCH_SIZE, len(texts)),
            len(texts),
        )
        try:
            result = genai.embed_content(
                model="models/embedding-001",
                content=batch,
                task_type="retrieval_document",
            )
            # result["embedding"] is a list of lists when content is a list
            embeddings = result["embedding"]
            if isinstance(embeddings[0], float):
                # Single text was sent, wrap it
                all_embeddings.append(embeddings)
            else:
                all_embeddings.extend(embeddings)
        except Exception as exc:
            logger.error("Gemini embedding failed on batch starting at %d: %s", i, exc)
            raise RuntimeError(f"Gemini embedding failed: {exc}") from exc

    return all_embeddings


# ---------------------------------------------------------------------------
# OpenAI embeddings
# ---------------------------------------------------------------------------
async def _embed_with_openai(texts: list[str], api_key: str) -> list[list[float]]:
    from openai import OpenAI

    client = OpenAI(api_key=api_key)
    all_embeddings: list[list[float]] = []

    for i in range(0, len(texts), BATCH_SIZE):
        batch = texts[i : i + BATCH_SIZE]
        logger.info(
            "OpenAI embedding batch %d–%d / %d",
            i,
            min(i + BATCH_SIZE, len(texts)),
            len(texts),
        )
        try:
            response = client.embeddings.create(
                model="text-embedding-3-small",
                input=batch,
            )
            batch_embeddings = [item.embedding for item in response.data]
            all_embeddings.extend(batch_embeddings)
        except Exception as exc:
            logger.error("OpenAI embedding failed on batch starting at %d: %s", i, exc)
            raise RuntimeError(f"OpenAI embedding failed: {exc}") from exc

    return all_embeddings

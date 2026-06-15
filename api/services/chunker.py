from __future__ import annotations

import logging
from dataclasses import dataclass

import fitz  # PyMuPDF
import tiktoken

logger = logging.getLogger(__name__)

TARGET_CHUNK_TOKENS = 500
OVERLAP_TOKENS = 50


@dataclass
class TextChunk:
    content: str
    page_number: int
    chunk_index: int


def extract_pages(pdf_bytes: bytes) -> list[tuple[int, str]]:
    """Return a list of (page_number, text) tuples from raw PDF bytes."""
    pages: list[tuple[int, str]] = []
    try:
        doc = fitz.open(stream=pdf_bytes, filetype="pdf")
        for page_num in range(len(doc)):
            page = doc.load_page(page_num)
            text = page.get_text("text")
            if text.strip():
                pages.append((page_num + 1, text))
        doc.close()
    except Exception as exc:
        logger.error("Failed to extract text from PDF: %s", exc)
        raise RuntimeError(f"PDF text extraction failed: {exc}") from exc

    if not pages:
        raise RuntimeError("PDF contained no extractable text")

    return pages


def _token_count(text: str, encoding: tiktoken.Encoding) -> int:
    return len(encoding.encode(text))


def chunk_text(
    pages: list[tuple[int, str]],
    target_tokens: int = TARGET_CHUNK_TOKENS,
    overlap_tokens: int = OVERLAP_TOKENS,
) -> list[TextChunk]:
    """Split page text into ~target_tokens-sized chunks with overlap.

    Each chunk records the page it originated from and a global chunk index.
    """
    encoding = tiktoken.get_encoding("cl100k_base")
    chunks: list[TextChunk] = []
    chunk_index = 0

    for page_number, page_text in pages:
        words = page_text.split()
        if not words:
            continue

        current_words: list[str] = []
        current_token_count = 0

        for word in words:
            word_tokens = _token_count(word + " ", encoding)

            if current_token_count + word_tokens > target_tokens and current_words:
                chunk_content = " ".join(current_words).strip()
                if chunk_content:
                    chunks.append(TextChunk(
                        content=chunk_content,
                        page_number=page_number,
                        chunk_index=chunk_index,
                    ))
                    chunk_index += 1

                # Keep last N tokens worth of words for overlap
                overlap_words: list[str] = []
                overlap_count = 0
                for w in reversed(current_words):
                    wt = _token_count(w + " ", encoding)
                    if overlap_count + wt > overlap_tokens:
                        break
                    overlap_words.insert(0, w)
                    overlap_count += wt

                current_words = overlap_words
                current_token_count = overlap_count

            current_words.append(word)
            current_token_count += word_tokens

        # Flush remaining words for this page
        if current_words:
            chunk_content = " ".join(current_words).strip()
            if chunk_content:
                chunks.append(TextChunk(
                    content=chunk_content,
                    page_number=page_number,
                    chunk_index=chunk_index,
                ))
                chunk_index += 1

    logger.info("Chunked PDF into %d chunks across %d pages", len(chunks), len(pages))
    return chunks


def process_pdf(pdf_bytes: bytes) -> tuple[list[TextChunk], int]:
    """High-level helper: extract pages, chunk text, return (chunks, page_count)."""
    pages = extract_pages(pdf_bytes)
    page_count = len(pages)
    chunks = chunk_text(pages)
    return chunks, page_count

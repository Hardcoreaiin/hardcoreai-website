from __future__ import annotations

import os
import logging
from contextlib import asynccontextmanager
from typing import AsyncGenerator

from dotenv import load_dotenv
from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware

from api.routers.ingest import router as ingest_router

load_dotenv()

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger(__name__)


# ---------------------------------------------------------------------------
# API-secret guard middleware
# ---------------------------------------------------------------------------
class APISecretMiddleware(BaseHTTPMiddleware):
    """Reject requests that don't carry the correct X-API-Secret header.

    Health-check and CORS preflight requests are exempted.
    """

    EXEMPT_PATHS = {"/health", "/docs", "/openapi.json", "/redoc"}

    async def dispatch(self, request: Request, call_next) -> Response:  # type: ignore[override]
        if request.method == "OPTIONS":
            return await call_next(request)

        if request.url.path in self.EXEMPT_PATHS:
            return await call_next(request)

        expected = os.getenv("PYTHON_API_SECRET")
        if not expected:
            logger.warning("PYTHON_API_SECRET env var is not set – denying request")
            return Response(content="Server misconfigured", status_code=500)

        incoming = request.headers.get("X-API-Secret") or request.headers.get("Authorization", "").removeprefix("Bearer ").strip()

        if incoming != expected:
            return Response(content="Unauthorized", status_code=401)

        return await call_next(request)


# ---------------------------------------------------------------------------
# App factory
# ---------------------------------------------------------------------------
@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    logger.info("🚀 HardcoreAI API starting up")
    yield
    logger.info("🛑 HardcoreAI API shutting down")


app = FastAPI(
    title="HardcoreAI API",
    version="0.1.0",
    lifespan=lifespan,
)

# CORS – allow the Next.js dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(APISecretMiddleware)

# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------
app.include_router(ingest_router)


@app.get("/health")
async def health_check() -> dict[str, str]:
    return {"status": "ok"}

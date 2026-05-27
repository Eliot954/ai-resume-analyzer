import logging

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from app.services.extractor import TextExtractionError
from app.services.analyzer import AIAnalysisError, AIRateLimitError
from app.utils.validators import FileTooLargeError, UnsupportedFileTypeError

logger = logging.getLogger(__name__)


def register_exception_handlers(app: FastAPI) -> None:
    @app.exception_handler(FileTooLargeError)
    async def file_too_large_handler(_request: Request, exc: FileTooLargeError):
        return JSONResponse(
            status_code=413,
            content={"success": False, "data": None, "error": str(exc)},
        )

    @app.exception_handler(UnsupportedFileTypeError)
    async def unsupported_file_handler(_request: Request, exc: UnsupportedFileTypeError):
        return JSONResponse(
            status_code=415,
            content={"success": False, "data": None, "error": str(exc)},
        )

    @app.exception_handler(TextExtractionError)
    async def extraction_error_handler(_request: Request, exc: TextExtractionError):
        return JSONResponse(
            status_code=422,
            content={"success": False, "data": None, "error": str(exc)},
        )

    @app.exception_handler(AIRateLimitError)
    async def rate_limit_handler(_request: Request, exc: AIRateLimitError):
        headers = {}
        if exc.retry_after:
            headers["Retry-After"] = exc.retry_after
        return JSONResponse(
            status_code=429,
            content={"success": False, "data": None, "error": "Rate limited. Please retry shortly."},
            headers=headers,
        )

    @app.exception_handler(AIAnalysisError)
    async def ai_error_handler(_request: Request, exc: AIAnalysisError):
        return JSONResponse(
            status_code=502,
            content={"success": False, "data": None, "error": str(exc)},
        )

    @app.exception_handler(Exception)
    async def generic_error_handler(_request: Request, exc: Exception):
        logger.exception("Unhandled exception")
        return JSONResponse(
            status_code=500,
            content={"success": False, "data": None, "error": "Internal server error"},
        )

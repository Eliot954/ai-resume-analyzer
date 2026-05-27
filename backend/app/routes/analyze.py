import uuid

from fastapi import APIRouter, File, UploadFile

from app.models.request import AnalysisResponse, HealthResponse
from app.services.extractor import extract_text
from app.services.analyzer import analyze_resume
from app.utils.validators import validate_file

router = APIRouter(prefix="/api")


@router.get("/health", response_model=HealthResponse)
async def health():
    return {"status": "ok"}


@router.post("/analyze", response_model=AnalysisResponse)
async def analyze(file: UploadFile = File(...)):
    validate_file(file)
    text = await extract_text(file)
    result, request_id = await analyze_resume(text)

    return AnalysisResponse(
        success=True,
        data=result,
        request_id=request_id,
    )

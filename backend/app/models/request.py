from pydantic import BaseModel
from app.models.analysis import AnalysisResult


class AnalysisResponse(BaseModel):
    success: bool
    data: AnalysisResult | None = None
    error: str | None = None
    request_id: str | None = None


class HealthResponse(BaseModel):
    status: str

import json
import logging
import openai
from openai import AsyncOpenAI
from app.config import settings
from app.models.analysis import AnalysisResult

logger = logging.getLogger(__name__)

SYSTEM_PROMPT = f"""You are a professional resume analyst and career coach. Analyze the given resume and return a JSON object with the exact schema below.

Do NOT include any text outside the JSON object. Your entire response must be valid JSON.

Schema:
{json.dumps(AnalysisResult.model_json_schema(), indent=2)}

Guidelines:
- overall_score: 0-100 holistic rating
- summary: one-paragraph professional assessment
- skills: 5-8 items, each with name (string) and score (int 0-10)
- experience: all work entries, each with company, role, duration_years (float), start_date, end_date, highlights (list of strings)
- education: all education entries, each with institution, degree, field, year
- strengths: 3-5 specific strengths (list of strings)
- weaknesses: 3-5 areas for improvement (list of strings)
- career_suggestions: 3-5 actionable suggestions (list of strings)
- skill_gaps: missing skills for target roles (list of strings)
- recommended_roles: 2-4 suitable job titles (list of strings)
- years_of_experience: float total from work history

Be objective and evidence-based. Never make up credentials."""


class AIAnalysisError(Exception):
    pass


class AIRateLimitError(Exception):
    def __init__(self, retry_after: str | None = None):
        self.retry_after = retry_after


_client = AsyncOpenAI(
    api_key=settings.DEEPSEEK_API_KEY,
    base_url="https://api.deepseek.com/v1"
)


async def analyze_resume(resume_text: str) -> tuple[AnalysisResult, str]:
    try:
        resp = await _client.chat.completions.create(
            model="deepseek-chat",
            max_tokens=8000,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": f"Analyze the following resume:\n\n{resume_text}"}
            ],
            response_format={"type": "json_object"},
        )

        raw = resp.choices[0].message.content
        request_id = resp.id
        result = AnalysisResult.model_validate_json(raw)
        return result, request_id

    except ValueError as e:
        logger.error(f"Failed to parse Deepseek JSON response: {e}")
        raise AIAnalysisError("AI returned malformed response, please retry")
    except openai.RateLimitError as e:
        retry = e.response.headers.get("retry-after") if e.response else None
        raise AIRateLimitError(retry)
    except openai.BadRequestError as e:
        logger.error(f"Bad request to Deepseek API: {e}", extra={"request_id": e.request_id})
        raise AIAnalysisError(f"Invalid request: {e}")
    except openai.APIStatusError as e:
        logger.error(f"Deepseek error (status {e.status_code}): {e}", extra={"request_id": e.request_id})
        raise AIAnalysisError("AI service temporarily unavailable")
    except openai.APIConnectionError as e:
        logger.error(f"Connection error to Deepseek: {e}")
        raise AIAnalysisError("Cannot reach AI service")
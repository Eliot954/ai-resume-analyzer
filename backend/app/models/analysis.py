from pydantic import BaseModel, Field


class SkillDimension(BaseModel):
    name: str = Field(description="Skill category name, e.g. 'Python', 'Leadership'")
    score: int = Field(ge=0, le=10, description="Proficiency score 0-10")


class Experience(BaseModel):
    company: str
    role: str
    duration_years: float = Field(description="Years at this position")
    start_date: str = Field(description="Approximate start date, e.g. '2020-03'")
    end_date: str = Field(description="End date or 'Present'")
    highlights: list[str] = Field(description="Key achievements or responsibilities")


class Education(BaseModel):
    institution: str
    degree: str
    field: str
    year: str = Field(description="Graduation year or expected, e.g. '2024'")


class AnalysisResult(BaseModel):
    overall_score: int = Field(ge=0, le=100, description="Overall resume score 0-100")
    summary: str = Field(description="One-paragraph professional summary assessment")
    skills: list[SkillDimension] = Field(description="5-8 skill dimensions with scores")
    experience: list[Experience] = Field(description="Extracted work experiences")
    education: list[Education] = Field(description="Extracted education entries")
    strengths: list[str] = Field(min_length=3, max_length=5, description="Key strengths")
    weaknesses: list[str] = Field(min_length=3, max_length=5, description="Areas for improvement")
    career_suggestions: list[str] = Field(min_length=3, max_length=5, description="Actionable career advice")
    skill_gaps: list[str] = Field(description="Missing skills for target roles")
    recommended_roles: list[str] = Field(description="Recommended job titles based on profile")
    years_of_experience: float = Field(description="Total calculated years of experience")

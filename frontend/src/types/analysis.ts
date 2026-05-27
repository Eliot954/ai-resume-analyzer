export interface SkillDimension {
  name: string
  score: number
}

export interface Experience {
  company: string
  role: string
  duration_years: number
  start_date: string
  end_date: string
  highlights: string[]
}

export interface Education {
  institution: string
  degree: string
  field: string
  year: string
}

export interface AnalysisResult {
  overall_score: number
  summary: string
  skills: SkillDimension[]
  experience: Experience[]
  education: Education[]
  strengths: string[]
  weaknesses: string[]
  career_suggestions: string[]
  skill_gaps: string[]
  recommended_roles: string[]
  years_of_experience: number
}

export interface AnalysisResponse {
  success: boolean
  data: AnalysisResult | null
  error: string | null
}

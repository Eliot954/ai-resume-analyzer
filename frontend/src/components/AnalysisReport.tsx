import type { AnalysisResult } from '../types/analysis'
import { ScoreCard } from './ScoreCard'
import { SkillsRadarChart } from './SkillsRadarChart'
import { ExperienceBarChart } from './ExperienceBarChart'
import { EducationTimeline } from './EducationTimeline'
import { StrengthsWeaknesses } from './StrengthsWeaknesses'
import { CareerSuggestions } from './CareerSuggestions'

interface AnalysisReportProps {
  result: AnalysisResult
}

export function AnalysisReport({ result }: AnalysisReportProps) {
  return (
    <div className="max-w-5xl mx-auto mt-8 space-y-8 pb-12">
      <ScoreCard score={result.overall_score} summary={result.summary} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SkillsRadarChart skills={result.skills} />
        <EducationTimeline education={result.education} />
      </div>

      <ExperienceBarChart experience={result.experience} />

      <StrengthsWeaknesses strengths={result.strengths} weaknesses={result.weaknesses} />

      <CareerSuggestions
        suggestions={result.career_suggestions}
        recommendedRoles={result.recommended_roles}
        skillGaps={result.skill_gaps}
      />

      <div className="flex justify-center gap-4 no-print">
        <button
          onClick={() => window.print()}
          className="px-6 py-3 bg-gray-800 text-white rounded-xl font-medium hover:bg-gray-900 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print / Save PDF
        </button>
        <button
          onClick={() => {
            const json = JSON.stringify(result, null, 2)
            const blob = new Blob([json], { type: 'application/json' })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = 'resume-analysis.json'
            a.click()
            URL.revokeObjectURL(url)
          }}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export JSON
        </button>
      </div>
    </div>
  )
}

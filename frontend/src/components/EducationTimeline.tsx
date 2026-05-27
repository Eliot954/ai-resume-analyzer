import type { Education } from '../types/analysis'

interface EducationTimelineProps {
  education: Education[]
}

export function EducationTimeline({ education }: EducationTimelineProps) {
  const sorted = [...education].sort((a, b) => a.year.localeCompare(b.year))

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Education</h3>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200" />
        <div className="space-y-6">
          {sorted.map((edu, i) => (
            <div key={i} className="relative flex gap-4 pl-10">
              <div className="absolute left-2 w-5 h-5 rounded-full bg-blue-600 border-4 border-blue-100" />
              <div>
                <p className="font-medium text-gray-900">{edu.degree} in {edu.field}</p>
                <p className="text-sm text-gray-600">{edu.institution}</p>
                <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium text-blue-700 bg-blue-50 rounded">
                  {edu.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

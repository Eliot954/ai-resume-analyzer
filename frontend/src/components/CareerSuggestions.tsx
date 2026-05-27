interface CareerSuggestionsProps {
  suggestions: string[]
  recommendedRoles: string[]
  skillGaps: string[]
}

const SUGGESTION_ICONS = [
  'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
  'M12 6v6m0 0v6m0-6h6m-6 0H6',
  'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  'M14.828 14.828a4 4 0 01-5.656 0M9.172 9.172a4 4 0 015.656 0M12 2l2.5 5.5L20 10l-5.5 2.5L12 18l-2.5-5.5L4 10l5.5-2.5L12 2z',
  'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
]

export function CareerSuggestions({ suggestions, recommendedRoles, skillGaps }: CareerSuggestionsProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Career Guidance</h3>

      <div className="space-y-3 mb-6">
        {suggestions.map((s, i) => (
          <div key={i} className="flex gap-3 p-3 bg-blue-50 rounded-lg">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">
              {i + 1}
            </span>
            <p className="text-sm text-gray-800">{s}</p>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Recommended Roles</h4>
        <div className="flex flex-wrap gap-2">
          {recommendedRoles.map((role, i) => (
            <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              {role}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Skill Gaps</h4>
        <div className="flex flex-wrap gap-2">
          {skillGaps.map((gap, i) => (
            <span key={i} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium border border-purple-200">
              {gap}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

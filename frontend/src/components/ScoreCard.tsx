interface ScoreCardProps {
  score: number
  summary: string
}

function getScoreColor(score: number): string {
  if (score >= 80) return '#16a34a'
  if (score >= 60) return '#2563eb'
  if (score >= 40) return '#ea580c'
  return '#dc2626'
}

function getScoreLabel(score: number): string {
  if (score >= 80) return 'Excellent'
  if (score >= 60) return 'Good'
  if (score >= 40) return 'Fair'
  return 'Needs Work'
}

export function ScoreCard({ score, summary }: ScoreCardProps) {
  const color = getScoreColor(score)
  const circumference = 2 * Math.PI * 54
  const offset = circumference * (1 - score / 100)

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="relative shrink-0">
          <svg width="140" height="140" viewBox="0 0 140 140">
            <circle cx="70" cy="70" r="54" fill="none" stroke="#e5e7eb" strokeWidth="10" />
            <circle
              cx="70" cy="70" r="54" fill="none"
              stroke={color} strokeWidth="10" strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform="rotate(-90 70 70)"
              style={{ transition: 'stroke-dashoffset 1s ease' }}
            />
            <text x="70" y="66" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#111827">{score}</text>
            <text x="70" y="86" textAnchor="middle" fontSize="12" fill="#6b7280">/ 100</text>
          </svg>
        </div>
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xl font-bold text-gray-900">Overall Score</span>
            <span className="px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: color + '18', color }}>
              {getScoreLabel(score)}
            </span>
          </div>
          <p className="text-gray-600 leading-relaxed">{summary}</p>
        </div>
      </div>
    </div>
  )
}

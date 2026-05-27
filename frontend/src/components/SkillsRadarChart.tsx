import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts'
import type { SkillDimension } from '../types/analysis'

interface SkillsRadarChartProps {
  skills: SkillDimension[]
}

export function SkillsRadarChart({ skills }: SkillsRadarChartProps) {
  const data = skills.map((s) => ({ skill: s.name, score: s.score, fullMark: 10 }))

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills Profile</h3>
      <ResponsiveContainer width="100%" height={350}>
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12, fill: '#4b5563' }} />
          <PolarRadiusAxis angle={90} domain={[0, 10]} tick={{ fontSize: 10, fill: '#9ca3af' }} />
          <Radar
            name="Skills"
            dataKey="score"
            stroke="#2563eb"
            fill="#2563eb"
            fillOpacity={0.3}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}

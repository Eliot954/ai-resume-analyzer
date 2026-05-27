import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import type { Experience } from '../types/analysis'

interface ExperienceBarChartProps {
  experience: Experience[]
}

export function ExperienceBarChart({ experience }: ExperienceBarChartProps) {
  const data = experience.map((exp) => ({
    name: exp.company,
    years: exp.duration_years,
    role: exp.role,
    highlights: exp.highlights,
  }))

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Experience Timeline</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical" margin={{ left: 20, right: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis type="number" tick={{ fontSize: 12, fill: '#6b7280' }} />
          <YAxis
            dataKey="name"
            type="category"
            tick={{ fontSize: 12, fill: '#374151' }}
            width={100}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null
              const item = payload[0].payload
              return (
                <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
                  <p className="font-medium text-gray-900">{item.role} at {item.name}</p>
                  <p className="text-sm text-gray-600">{item.years} years</p>
                  <ul className="mt-1 text-xs text-gray-500">
                    {item.highlights.map((h: string, i: number) => (
                      <li key={i}>&#8226; {h}</li>
                    ))}
                  </ul>
                </div>
              )
            }}
          />
          <Bar dataKey="years" fill="#2563eb" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

import type { AnalysisResponse } from '../types/analysis'

const API_BASE = '/api'

export async function uploadAndAnalyze(file: File): Promise<AnalysisResponse> {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(`${API_BASE}/analyze`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    const body = await response.json().catch(() => ({ error: `Server error: ${response.status}` }))
    throw new Error(body.error || `Server error: ${response.status}`)
  }

  return response.json()
}

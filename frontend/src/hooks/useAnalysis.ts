import { useState, useCallback } from 'react'
import { uploadAndAnalyze } from '../api/client'
import type { AnalysisResult } from '../types/analysis'

export type AnalysisState =
  | { status: 'idle' }
  | { status: 'uploading' }
  | { status: 'analyzing'; stage: string }
  | { status: 'done'; result: AnalysisResult }
  | { status: 'error'; message: string }

export function useAnalysis() {
  const [state, setState] = useState<AnalysisState>({ status: 'idle' })

  const analyze = useCallback(async (file: File) => {
    setState({ status: 'uploading' })
    setState({ status: 'analyzing', stage: 'Extracting text from resume...' })

    try {
      const response = await uploadAndAnalyze(file)

      if (!response.success || !response.data) {
        setState({ status: 'error', message: response.error || 'Analysis failed' })
        return
      }

      setState({ status: 'done', result: response.data })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unexpected error'
      setState({ status: 'error', message })
    }
  }, [])

  const reset = useCallback(() => {
    setState({ status: 'idle' })
  }, [])

  return { state, analyze, reset }
}

import { useAnalysis } from '../hooks/useAnalysis'
import { FileUpload } from '../components/FileUpload'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { ErrorBanner } from '../components/ErrorBanner'
import { AnalysisReport } from '../components/AnalysisReport'

export function Home() {
  const { state, analyze, reset } = useAnalysis()

  return (
    <div className="min-h-screen">
      <header className="bg-white border-b border-gray-200 no-print">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h1 className="text-xl font-bold text-gray-900">AI Resume Analyzer</h1>
          </div>
          <span className="text-sm text-gray-400">Upload your resume and get instant AI analysis</span>
        </div>
      </header>

      <main className="px-6">
        {state.status === 'idle' && (
          <>
            <div className="text-center mt-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Analyze Your Resume with AI
              </h2>
              <p className="text-lg text-gray-500 max-w-md mx-auto">
                Get detailed insights, skill assessments, and career recommendations powered by Claude.
              </p>
            </div>
            <FileUpload onAnalyze={analyze} disabled={false} />
          </>
        )}

        {state.status === 'uploading' && (
          <LoadingSpinner stage="Uploading file..." />
        )}

        {state.status === 'analyzing' && (
          <LoadingSpinner stage={state.stage} />
        )}

        {state.status === 'error' && (
          <>
            <ErrorBanner message={state.message} onDismiss={reset} />
            <div className="text-center mt-8">
              <button
                onClick={reset}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Try again
              </button>
            </div>
          </>
        )}

        {state.status === 'done' && (
          <>
            <AnalysisReport result={state.result} />
            <div className="text-center pb-12 no-print">
              <button
                onClick={reset}
                className="mt-8 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                Analyze Another Resume
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

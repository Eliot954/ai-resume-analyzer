import { useState, useRef, type DragEvent, type ChangeEvent } from 'react'

interface FileUploadProps {
  onAnalyze: (file: File) => void
  disabled: boolean
}

const ACCEPTED_TYPES = ['.pdf', '.docx', '.doc']
const MAX_SIZE = 10 * 1024 * 1024

export function FileUpload({ onAnalyze, disabled }: FileUploadProps) {
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  function validate(file: File): string | null {
    const ext = '.' + file.name.split('.').pop()?.toLowerCase()
    if (!ACCEPTED_TYPES.includes(ext)) {
      return 'Only PDF and DOCX files are supported'
    }
    if (file.size > MAX_SIZE) {
      return `File exceeds ${MAX_SIZE / (1024 * 1024)}MB limit`
    }
    return null
  }

  function handleFile(file: File) {
    const err = validate(file)
    setError(err)
    if (!err) {
      setSelectedFile(file)
    } else {
      setSelectedFile(null)
    }
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault()
    setDragOver(false)
    if (disabled) return
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  function handleSubmit() {
    if (selectedFile && !disabled) {
      onAnalyze(selectedFile)
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-12">
      <div
        onDragOver={(e) => { e.preventDefault(); if (!disabled) setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`
          border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all
          ${dragOver ? 'border-blue-500 bg-blue-50 scale-[1.02]' : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-gray-50'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx,.doc"
          className="hidden"
          onChange={handleChange}
          disabled={disabled}
        />

        {selectedFile ? (
          <div className="space-y-2">
            <svg className="w-12 h-12 mx-auto text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="font-medium text-gray-800">{selectedFile.name}</p>
            <p className="text-sm text-gray-500">{(selectedFile.size / 1024).toFixed(1)} KB</p>
          </div>
        ) : (
          <div className="space-y-3">
            <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-lg text-gray-600">
              <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
            </p>
            <p className="text-sm text-gray-400">PDF or DOCX (max 10MB)</p>
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-600 mt-3 text-center">{error}</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={!selectedFile || disabled}
        className="mt-6 w-full py-3 px-6 text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-xl font-medium transition-colors"
      >
        {disabled ? 'Analyzing...' : 'Analyze Resume'}
      </button>
    </div>
  )
}

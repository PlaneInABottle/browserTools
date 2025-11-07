export interface PdfFile {
  id: string
  file: File
  name: string
  size: number
  pageCount: number
  status: 'idle' | 'loading' | 'ready' | 'error'
  error?: string
}

export interface MergeOptions {
  outputFilename: string
}

export interface ConvertedImage {
  pageNumber: number
  blob: Blob
  width: number
  height: number
}

export interface ConversionOptions {
  format: 'png' | 'jpeg'
  quality: number // 1-100, for JPEG
  scale: number // 1.0 = 72dpi, 2.0 = 144dpi, etc.
}

export interface PdfFileItem {
  id: string
  file: File
  name: string
  size: number
  pageCount: number
  status: 'loading' | 'ready' | 'processing' | 'completed' | 'error'
  error?: string
  images?: ConvertedImage[]
}

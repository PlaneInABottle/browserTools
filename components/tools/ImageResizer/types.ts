export interface ImageFile {
  id: string
  file: File
  preview: string
  originalWidth: number
  originalHeight: number
  originalSize: number
  resizedBlob?: Blob
  resizedWidth?: number
  resizedHeight?: number
  resizedSize?: number
  status: 'pending' | 'processing' | 'completed' | 'error'
  error?: string
}

export type ResizeMode = 'fit' | 'exact' | 'fill'
export type ImageFormat = 'jpeg' | 'png' | 'webp'

export interface ResizeOptions {
  width: number
  height: number
  mode: ResizeMode
  quality: number
  format: ImageFormat
}

export interface PresetSize {
  name: string
  width: number
  height: number
  category?: string
}

export const PRESETS: PresetSize[] = [
  { name: 'Thumbnail', width: 150, height: 150, category: 'General' },
  { name: 'Small', width: 320, height: 240, category: 'General' },
  { name: 'Medium', width: 640, height: 480, category: 'General' },
  { name: 'Large', width: 1024, height: 768, category: 'General' },
  { name: 'Instagram Square', width: 1080, height: 1080, category: 'Social' },
  { name: 'Instagram Portrait', width: 1080, height: 1350, category: 'Social' },
  { name: 'Twitter Header', width: 1500, height: 500, category: 'Social' },
  { name: 'Facebook Cover', width: 820, height: 312, category: 'Social' },
  { name: 'YouTube Thumbnail', width: 1280, height: 720, category: 'Social' },
  { name: 'HD (1080p)', width: 1920, height: 1080, category: 'Standard' },
  { name: '2K', width: 2560, height: 1440, category: 'Standard' },
  { name: '4K', width: 3840, height: 2160, category: 'Standard' },
]

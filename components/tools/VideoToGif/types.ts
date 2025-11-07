export interface VideoFile {
  id: string
  file: File
  preview: string
  duration: number
  width: number
  height: number
  size: number
  status: 'pending' | 'processing' | 'completed' | 'error'
  gifBlob?: Blob
  gifSize?: number
  error?: string
  progress?: number // 0-100
}

export interface ConversionOptions {
  frameRate: number      // 5-30 FPS
  quality: number        // 1-10 (gif.js quality)
  maxWidth: number       // Output dimensions
  maxHeight: number
  startTime: number      // Clip start (seconds)
  duration: number       // Clip duration (seconds)
  loop: boolean          // Infinite loop
  maintainAspectRatio: boolean
}

export interface VideoMetadata {
  duration: number
  width: number
  height: number
  frameRate?: number
  bitrate?: number
  codec?: string
}

export interface ConversionResult {
  success: boolean
  gifBlob?: Blob
  error?: string
  processingTime?: number
  originalSize: number
  gifSize?: number
  compressionRatio?: number
  finalQuality?: number
  finalWidth?: number
  finalHeight?: number
  finalFrameRate?: number
}

export interface PresetOption {
  name: string
  frameRate: number
  quality: number
  description: string
}

export const CONVERSION_PRESETS: PresetOption[] = [
  {
    name: 'Fast & Small',
    frameRate: 10,
    quality: 3,
    description: 'Quick conversion, smaller file size'
  },
  {
    name: 'Balanced',
    frameRate: 15,
    quality: 5,
    description: 'Good balance of quality and file size'
  },
  {
    name: 'High Quality',
    frameRate: 20,
    quality: 7,
    description: 'Better quality, larger file size'
  },
  {
    name: 'Ultra Smooth',
    frameRate: 25,
    quality: 8,
    description: 'Very smooth animation, largest file size'
  }
]

export const ACCEPTED_VIDEO_FORMATS = [
  'video/mp4',
  'video/webm',
  'video/quicktime',
  'video/avi',
  'video/x-msvideo'
] as const

export const MAX_CLIENT_FILE_SIZE = 50 * 1024 * 1024 // 50MB
export const MAX_VIDEO_DURATION = 300 // 5 minutes
export const MIN_VIDEO_DURATION = 0.1 // 100ms

export type VideoFormat = typeof ACCEPTED_VIDEO_FORMATS[number]
import Pica from 'pica'
import type { ResizeOptions, ResizeMode } from '@/components/tools/ImageResizer/types'

// Disable workers to avoid issues - use main thread instead
const pica = Pica({ features: ['js'] })

export async function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    // Ensure image is treated as coming from the same origin to avoid CORS issues
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = URL.createObjectURL(file)
  })
}

export function calculateDimensions(
  originalWidth: number,
  originalHeight: number,
  targetWidth: number,
  targetHeight: number,
  mode: ResizeMode
): { width: number; height: number } {
  const aspectRatio = originalWidth / originalHeight

  if (mode === 'exact') {
    return { width: targetWidth, height: targetHeight }
  }

  if (mode === 'fit') {
    if (targetWidth / targetHeight > aspectRatio) {
      return {
        width: Math.round(targetHeight * aspectRatio),
        height: targetHeight,
      }
    } else {
      return {
        width: targetWidth,
        height: Math.round(targetWidth / aspectRatio),
      }
    }
  }

  if (mode === 'fill') {
    if (targetWidth / targetHeight < aspectRatio) {
      return {
        width: Math.round(targetHeight * aspectRatio),
        height: targetHeight,
      }
    } else {
      return {
        width: targetWidth,
        height: Math.round(targetWidth / aspectRatio),
      }
    }
  }

  return { width: targetWidth, height: targetHeight }
}

export async function resizeImage(
  file: File,
  options: ResizeOptions
): Promise<Blob> {
  const img = await loadImage(file)

  const { width, height } = calculateDimensions(
    img.width,
    img.height,
    options.width,
    options.height,
    options.mode
  )

  const picaOptions: any = {
    quality: 3,
    alpha: false,
    unsharpAmount: 0,
    unsharpRadius: 0,
    unsharpThreshold: 0,
  }

  // For exact mode, stretch image to exact dimensions (may distort aspect ratio)
  if (options.mode === 'exact') {
    const canvas = document.createElement('canvas')
    canvas.width = options.width
    canvas.height = options.height

    try {
      const ctx = canvas.getContext('2d', { alpha: false })!
      ctx.imageSmoothingEnabled = true
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    } finally {
      URL.revokeObjectURL(img.src)
    }

    return canvasToBlob(canvas, options)
  }

  if (options.mode === 'fill') {
    const canvas = document.createElement('canvas')
    canvas.width = options.width
    canvas.height = options.height
    try {
      const ctx = canvas.getContext('2d', { alpha: false })!
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.imageSmoothingEnabled = true

      const scale = Math.max(
        canvas.width / img.width,
        canvas.height / img.height
      )
      const imgWidth = img.width * scale
      const imgHeight = img.height * scale
      const x = (canvas.width - imgWidth) / 2
      const y = (canvas.height - imgHeight) / 2

      ctx.drawImage(img, x, y, imgWidth, imgHeight)
    } finally {
      URL.revokeObjectURL(img.src)
    }
    return canvasToBlob(canvas, options)
  }

  // Fit mode - standard resize using pica
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  try {
    await pica.resize(img, canvas, picaOptions)
  } finally {
    URL.revokeObjectURL(img.src)
  }

  return canvasToBlob(canvas, options)
}

function canvasToBlob(canvas: HTMLCanvasElement, options: ResizeOptions): Promise<Blob> {
  const mimeType = `image/${options.format}`
  const quality = options.quality / 100

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob)
        } else {
          reject(new Error('Failed to create blob'))
        }
      },
      mimeType,
      quality
    )
  })
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`
}

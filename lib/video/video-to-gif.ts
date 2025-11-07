import GIF from 'gif.js'
import type {
  VideoFile,
  ConversionOptions,
  VideoMetadata,
  ConversionResult,
  VideoFormat
} from '@/components/tools/VideoToGif/types'
import {
  ACCEPTED_VIDEO_FORMATS,
  MAX_CLIENT_FILE_SIZE,
  MAX_VIDEO_DURATION,
  MIN_VIDEO_DURATION
} from '@/components/tools/VideoToGif/types'

/**
 * Validate video file format and size
 */
export function validateVideoFile(file: File): { valid: boolean; error?: string } {
  // Check file type
  if (!ACCEPTED_VIDEO_FORMATS.includes(file.type as VideoFormat)) {
    return {
      valid: false,
      error: `Unsupported format: ${file.type}. Supported formats: MP4, WebM, MOV, AVI`
    }
  }

  // Check file size
  if (file.size > MAX_CLIENT_FILE_SIZE) {
    return {
      valid: false,
      error: `File too large: ${(file.size / 1024 / 1024).toFixed(1)}MB. Maximum size: ${MAX_CLIENT_FILE_SIZE / 1024 / 1024}MB`
    }
  }

  return { valid: true }
}

/**
 * Extract video metadata using HTML5 video element
 */
export async function extractVideoMetadata(file: File): Promise<VideoMetadata> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    const url = URL.createObjectURL(file)

    video.preload = 'metadata'
    video.src = url

    video.onloadedmetadata = () => {
      URL.revokeObjectURL(url)
      resolve({
        duration: video.duration,
        width: video.videoWidth,
        height: video.videoHeight,
        // Note: frameRate and other advanced metadata would require more complex parsing
      })
    }

    video.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Failed to load video metadata'))
    }

    // Timeout after 10 seconds
    setTimeout(() => {
      URL.revokeObjectURL(url)
      reject(new Error('Timeout loading video metadata'))
    }, 10000)
  })
}

/**
 * Validate video duration and dimensions
 */
export function validateVideoMetadata(metadata: VideoMetadata): { valid: boolean; error?: string } {
  if (metadata.duration < MIN_VIDEO_DURATION) {
    return {
      valid: false,
      error: `Video too short: ${metadata.duration.toFixed(1)}s. Minimum duration: ${MIN_VIDEO_DURATION}s`
    }
  }

  if (metadata.duration > MAX_VIDEO_DURATION) {
    return {
      valid: false,
      error: `Video too long: ${metadata.duration.toFixed(1)}s. Maximum duration: ${MAX_VIDEO_DURATION}s`
    }
  }

  if (metadata.width === 0 || metadata.height === 0) {
    return {
      valid: false,
      error: 'Invalid video dimensions'
    }
  }

  return { valid: true }
}

/**
 * Calculate optimal output dimensions maintaining aspect ratio
 */
export function calculateOptimalDimensions(
  originalWidth: number,
  originalHeight: number,
  maxWidth: number,
  maxHeight: number,
  maintainAspectRatio: boolean = true
): { width: number; height: number } {
  if (!maintainAspectRatio) {
    return { width: maxWidth, height: maxHeight }
  }

  const aspectRatio = originalWidth / originalHeight

  let width = maxWidth
  let height = maxWidth / aspectRatio

  if (height > maxHeight) {
    height = maxHeight
    width = maxHeight * aspectRatio
  }

  return {
    width: Math.round(width),
    height: Math.round(height)
  }
}

/**
 * Extract frames from video at specified intervals
 */
export async function extractVideoFrames(
  videoFile: File,
  options: ConversionOptions,
  onProgress?: (progress: number) => void
): Promise<ImageData[]> {
  const { startTime, duration, frameRate, maxWidth, maxHeight } = options

  // Create a dedicated video element for processing (completely isolated from UI)
  const processingVideo = document.createElement('video')
  const videoUrl = URL.createObjectURL(videoFile)
  processingVideo.src = videoUrl
  processingVideo.preload = 'auto'
  processingVideo.muted = true
  processingVideo.playsInline = true
  
  // Append to DOM temporarily (required for some browsers to properly decode video)
  processingVideo.style.position = 'absolute'
  processingVideo.style.left = '-9999px'
  processingVideo.style.width = '1px'
  processingVideo.style.height = '1px'
  processingVideo.style.opacity = '0'
  processingVideo.style.pointerEvents = 'none'
  document.body.appendChild(processingVideo)

  try {
    // Wait for the processing video to load
    await new Promise<void>((resolve, reject) => {
      processingVideo.onloadedmetadata = () => resolve()
      processingVideo.onerror = () => reject(new Error('Failed to load processing video'))
      setTimeout(() => reject(new Error('Processing video load timeout')), 10000)
    })

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) throw new Error('Failed to get canvas context')

    // Set canvas dimensions
    const dimensions = calculateOptimalDimensions(
      processingVideo.videoWidth,
      processingVideo.videoHeight,
      maxWidth,
      maxHeight
    )
    canvas.width = dimensions.width
    canvas.height = dimensions.height

    const frames: ImageData[] = []
    const totalFrames = Math.ceil(duration * frameRate)
    // Use the actual frame rate for interval calculation to ensure smooth animation
    const frameInterval = 1 / frameRate

    // Extract frames sequentially to avoid race conditions
    for (let i = 0; i < totalFrames; i++) {
      const currentTime = startTime + (i * frameInterval)

      // Seek and extract frame
      await new Promise<void>((resolve, reject) => {
        processingVideo.currentTime = currentTime

        const onSeeked = () => {
          processingVideo.removeEventListener('seeked', onSeeked)
          processingVideo.removeEventListener('error', onError)

          try {
            // Draw frame to canvas
            ctx.drawImage(processingVideo, 0, 0, dimensions.width, dimensions.height)

            // Get image data
            const imageData = ctx.getImageData(0, 0, dimensions.width, dimensions.height)
            frames.push(imageData)
            resolve()
          } catch (error) {
            reject(error)
          }
        }

        const onError = () => {
          processingVideo.removeEventListener('seeked', onSeeked)
          processingVideo.removeEventListener('error', onError)
          reject(new Error('Failed to seek to frame time'))
        }

        processingVideo.addEventListener('seeked', onSeeked, { once: true })
        processingVideo.addEventListener('error', onError, { once: true })

        // Timeout after 5 seconds
        setTimeout(() => {
          processingVideo.removeEventListener('seeked', onSeeked)
          processingVideo.removeEventListener('error', onError)
          reject(new Error('Frame extraction timeout'))
        }, 5000)
      })

      // Update progress
      if (onProgress) {
        onProgress(((i + 1) / totalFrames) * 100)
      }
    }

    return frames
  } finally {
    // Always cleanup: remove the processing video from DOM and revoke URL
    document.body.removeChild(processingVideo)
    URL.revokeObjectURL(videoUrl)
  }
}

/**
 * Generate GIF from video frames using gif.js
 */
export async function generateGifFromFrames(
  frames: ImageData[],
  options: ConversionOptions,
  onProgress?: (progress: number) => void
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const { frameRate, quality, loop } = options

    // gif.js quality: lower is better (1-20 scale), so invert our 1-10 scale
    // User quality 1 (lowest) -> gif.js quality 20
    // User quality 10 (highest) -> gif.js quality 1
    const gifQuality = Math.max(1, 21 - quality * 2)

    const gif = new GIF({
      workers: 2,
      quality: gifQuality,
      width: frames[0].width,
      height: frames[0].height,
      workerScript: '/workers/gif.worker.js',
      repeat: loop ? 0 : -1, // 0 = infinite loop, -1 = no loop
      debug: false
    })

    // Add frames to GIF
    frames.forEach((frame, index) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      canvas.width = frame.width
      canvas.height = frame.height
      ctx.putImageData(frame, 0, 0)

      // Calculate delay based on frame rate (in milliseconds)
      const delay = Math.round(1000 / frameRate)
      gif.addFrame(canvas, { delay })

      if (onProgress) {
        onProgress((index + 1) / frames.length * 50) // First 50% of progress
      }
    })

    // Handle GIF completion
    gif.on('finished', (blob: Blob) => {
      if (onProgress) {
        onProgress(100)
      }
      resolve(blob)
    })

    // Start rendering
    gif.render()
  })
}

/**
 * Convert video file to GIF
 */
export async function convertVideoToGif(
  videoFile: VideoFile,
  options: ConversionOptions,
  onProgress?: (progress: number) => void
): Promise<ConversionResult> {
  const startTime = Date.now()

  try {
    // Start with more conservative settings to avoid bloat
    let currentQuality = options.quality
    let currentFrameRate = options.frameRate
    let scaleFactor = 1.0
    
    const frames = await extractVideoFrames(videoFile.file, options, (progress) => {
      if (onProgress) onProgress(progress * 0.35)
    })

    // Helper to scale frames
    const scaleFrames = (frameList: ImageData[], scale: number): ImageData[] => {
      if (scale >= 1.0) return frameList
      
      return frameList.map(f => {
        const newWidth = Math.round(f.width * scale)
        const newHeight = Math.round(f.height * scale)
        const canvas = document.createElement('canvas')
        canvas.width = newWidth
        canvas.height = newHeight
        const ctx = canvas.getContext('2d')!
        
        const tempCanvas = document.createElement('canvas')
        tempCanvas.width = f.width
        tempCanvas.height = f.height
        const tempCtx = tempCanvas.getContext('2d')!
        tempCtx.putImageData(f, 0, 0)
        
        ctx.drawImage(tempCanvas, 0, 0, newWidth, newHeight)
        return ctx.getImageData(0, 0, newWidth, newHeight)
      })
    }

    // Helper to reduce frame count
    const reduceFrameCount = (frameList: ImageData[], targetFPS: number): ImageData[] => {
      const ratio = currentFrameRate / targetFPS
      if (ratio <= 1) return frameList
      
      const reducedFrames: ImageData[] = []
      for (let i = 0; i < frameList.length; i += ratio) {
        reducedFrames.push(frameList[Math.floor(i)])
      }
      return reducedFrames
    }

    let processedFrames = frames
    let gifBlob = await generateGifFromFrames(processedFrames, { ...options, quality: currentQuality }, (progress) => {
      if (onProgress) onProgress(35 + progress * 0.65)
    })

    // Aggressive optimization loop: quality -> FPS -> scale
    let attempts = 0
    const maxAttempts = 8
    
    while (gifBlob.size > videoFile.size * 0.8 && attempts < maxAttempts) {
      attempts++
      
      // Step 1: Reduce quality (increase sampling)
      if (currentQuality > 1) {
        currentQuality = Math.max(1, currentQuality - 2)
        gifBlob = await generateGifFromFrames(processedFrames, { ...options, quality: currentQuality })
        if (gifBlob.size <= videoFile.size * 0.8) break
      }
      
      // Step 2: Reduce frame rate
      if (currentFrameRate > 10) {
        currentFrameRate = Math.max(10, currentFrameRate - 5)
        processedFrames = reduceFrameCount(frames, currentFrameRate)
        gifBlob = await generateGifFromFrames(processedFrames, { 
          ...options, 
          quality: currentQuality,
          frameRate: currentFrameRate 
        })
        if (gifBlob.size <= videoFile.size * 0.8) break
      }
      
      // Step 3: Scale down dimensions
      if (scaleFactor > 0.5) {
        scaleFactor = Math.max(0.5, scaleFactor - 0.15)
        processedFrames = scaleFrames(reduceFrameCount(frames, currentFrameRate), scaleFactor)
        gifBlob = await generateGifFromFrames(processedFrames, { 
          ...options, 
          quality: currentQuality,
          frameRate: currentFrameRate 
        })
        if (gifBlob.size <= videoFile.size * 0.8) break
      } else {
        break // Can't optimize further
      }
    }

    const processingTime = Date.now() - startTime
    const compressionRatio = videoFile.size > 0 ? (gifBlob.size / videoFile.size) : 0
    const finalWidth = Math.round(frames[0].width * scaleFactor)
    const finalHeight = Math.round(frames[0].height * scaleFactor)

    return {
      success: true,
      gifBlob,
      processingTime,
      originalSize: videoFile.size,
      gifSize: gifBlob.size,
      compressionRatio,
      finalQuality: currentQuality,
      finalWidth,
      finalHeight,
      finalFrameRate: currentFrameRate
    }

  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown conversion error',
      originalSize: videoFile.size
    }
  }
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'

  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

/**
 * Format duration for display
 */
export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)

  if (minutes > 0) {
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return `${remainingSeconds}s`
}

/**
 * Check if browser supports required features
 */
export function checkBrowserSupport(): { supported: boolean; missingFeatures: string[] } {
  const missingFeatures: string[] = []

  if (!window.HTMLCanvasElement) {
    missingFeatures.push('Canvas API')
  }

  if (!window.HTMLVideoElement) {
    missingFeatures.push('Video API')
  }

  if (!window.Worker) {
    missingFeatures.push('Web Workers')
  }

  if (!window.Blob) {
    missingFeatures.push('Blob API')
  }

  return {
    supported: missingFeatures.length === 0,
    missingFeatures
  }
}
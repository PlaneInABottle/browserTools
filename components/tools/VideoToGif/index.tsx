'use client'

import { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import { Upload, X, Download, Loader2, Video as VideoIcon, Play, Pause, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { toast } from 'sonner'
import JSZip from 'jszip'
import type { VideoFile, ConversionOptions } from './types'
import {
  CONVERSION_PRESETS,
  ACCEPTED_VIDEO_FORMATS,
  MAX_CLIENT_FILE_SIZE
} from './types'
import {
  validateVideoFile,
  extractVideoMetadata,
  validateVideoMetadata,
  convertVideoToGif,
  formatFileSize,
  formatDuration,
  checkBrowserSupport
} from '@/lib/video/video-to-gif'

const ACCEPTED_FORMATS_STRING = ACCEPTED_VIDEO_FORMATS.join(',')

export default function VideoToGif() {
  const [videos, setVideos] = useState<VideoFile[]>([])
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const [conversionOptions, setConversionOptions] = useState<ConversionOptions>({
    frameRate: 15,
    quality: 5,
    maxWidth: 640,
    maxHeight: 480,
    startTime: 0,
    duration: 10,
    loop: true,
    maintainAspectRatio: true,
  })

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [videoDuration, setVideoDuration] = useState(0)
  const [previewGifUrl, setPreviewGifUrl] = useState<string | null>(null)

  const selectedVideo = videos.find((video) => video.id === selectedVideoId)

  // Check browser support on mount
  useEffect(() => {
    const support = checkBrowserSupport()
    if (!support.supported) {
      toast.error(`Browser not supported. Missing features: ${support.missingFeatures.join(', ')}`)
    }
  }, [])

  // Cleanup all video preview URLs only on component unmount (not on videos array changes)
  useEffect(() => {
    return () => {
      videos.forEach((video) => {
        URL.revokeObjectURL(video.preview)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Empty deps - only run on unmount

  // Cleanup preview GIF URL
  useEffect(() => {
    return () => {
      if (previewGifUrl) {
        URL.revokeObjectURL(previewGifUrl)
      }
    }
  }, [previewGifUrl])

  // Calculate estimated output size with realistic GIF compression
  const estimatedGifSize = useMemo(() => {
    if (!selectedVideo) return 0

    const frameCount = Math.ceil(conversionOptions.duration * conversionOptions.frameRate)
    const pixelsPerFrame = conversionOptions.maxWidth * conversionOptions.maxHeight
    
    // GIF uses LZW compression, typically achieving 3-10x compression on photographic content
    // Quality affects color palette reduction
    const qualityFactor = conversionOptions.quality / 10 // 0.1 to 1.0
    const compressionFactor = 0.15 + (qualityFactor * 0.15) // 0.15 to 0.3 bytes per pixel
    
    const estimatedSize = frameCount * pixelsPerFrame * compressionFactor
    
    // Cap at 80% of original video size (our optimization target)
    return Math.min(estimatedSize, selectedVideo.size * 0.8)
  }, [selectedVideo, conversionOptions])

  // Calculate estimated conversion time
  const estimatedConversionTime = useMemo(() => {
    if (!selectedVideo) return 0

    const frameCount = Math.ceil(conversionOptions.duration * conversionOptions.frameRate)
    const processingTimePerFrame = 50 // ms per frame (rough estimate)
    return (frameCount * processingTimePerFrame) / 1000 // seconds
  }, [selectedVideo, conversionOptions])

  // Update video duration only when selected video id changes to prevent flicker during progress updates
  useEffect(() => {
    if (!selectedVideo || !videoRef.current) return
    const video = videoRef.current

    // Avoid resetting src if already set (prevents reload flicker)
    if (video.src !== selectedVideo.preview) {
      video.src = selectedVideo.preview

      const updateDuration = () => {
        setVideoDuration(video.duration)
        setConversionOptions(prev => ({
          ...prev,
          duration: Math.min(prev.duration, video.duration)
        }))
      }

      video.addEventListener('loadedmetadata', updateDuration)
      return () => video.removeEventListener('loadedmetadata', updateDuration)
    }
  }, [selectedVideo?.id])

  // Update current time during playback
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current

      const updateTime = () => setCurrentTime(video.currentTime)
      const updatePlaying = () => setIsPlaying(!video.paused)

      video.addEventListener('timeupdate', updateTime)
      video.addEventListener('play', updatePlaying)
      video.addEventListener('pause', updatePlaying)

      return () => {
        video.removeEventListener('timeupdate', updateTime)
        video.removeEventListener('play', updatePlaying)
        video.removeEventListener('pause', updatePlaying)
      }
    }
  }, [selectedVideo])

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    const newVideos: VideoFile[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      // Validate file
      const validation = validateVideoFile(file)
      if (!validation.valid) {
        toast.error(`${file.name}: ${validation.error}`)
        continue
      }

      try {
        // Extract metadata
        const metadata = await extractVideoMetadata(file)
        const metadataValidation = validateVideoMetadata(metadata)

        if (!metadataValidation.valid) {
          toast.error(`${file.name}: ${metadataValidation.error}`)
          continue
        }

        const preview = URL.createObjectURL(file)

        newVideos.push({
          id: crypto.randomUUID(),
          file,
          preview,
          duration: metadata.duration,
          width: metadata.width,
          height: metadata.height,
          size: file.size,
          status: 'pending',
        })
      } catch (error) {
        toast.error(`${file.name}: Failed to process video`)
      }
    }

    setVideos((prev) => [...prev, ...newVideos])
    if (newVideos.length > 0 && !selectedVideoId) {
      setSelectedVideoId(newVideos[0].id)
    }
    toast.success(`${newVideos.length} video(s) added`)
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFiles(e.dataTransfer.files)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const removeVideo = (id: string) => {
    setVideos((prev) => {
      const videoToRemove = prev.find((v) => v.id === id)
      
      // Cleanup: revoke blob URLs to prevent memory leak
      if (videoToRemove) {
        URL.revokeObjectURL(videoToRemove.preview)
        if (videoToRemove.gifBlob) {
          // Note: gifBlob URL is created on-demand, not stored
        }
      }
      
      const filtered = prev.filter((video) => video.id !== id)
      if (selectedVideoId === id && filtered.length > 0) {
        setSelectedVideoId(filtered[0].id)
      } else if (filtered.length === 0) {
        setSelectedVideoId(null)
      }
      return filtered
    })
  }

  const applyPreset = (preset: typeof CONVERSION_PRESETS[0]) => {
    setConversionOptions((prev) => ({
      ...prev,
      frameRate: preset.frameRate,
      quality: preset.quality,
    }))
  }

  const convertVideo = async (video: VideoFile): Promise<VideoFile> => {
    try {
      // Validate video before conversion
      if (video.duration < 0.1) {
        throw new Error('Video is too short for conversion')
      }

      if (conversionOptions.startTime + conversionOptions.duration > video.duration) {
        throw new Error('Trim settings exceed video duration')
      }

      const result = await convertVideoToGif(video, conversionOptions, (progress) => {
        setVideos((prev) =>
          prev.map((v) =>
            v.id === video.id ? { ...v, progress } : v
          )
        )
      })

      if (result.success && result.gifBlob) {
        const compressionRatio = video.size > 0 ? (result.gifSize! / video.size) * 100 : 0
        toast.success(`Converted ${video.file.name} (${compressionRatio.toFixed(1)}% of original size)`)

        // Set preview URL for the selected video to show inline
        if (selectedVideoId === video.id) {
          setPreviewGifUrl(URL.createObjectURL(result.gifBlob))
        }

        return {
          ...video,
          gifBlob: result.gifBlob,
          gifSize: result.gifSize,
          status: 'completed',
        }
      } else {
        const errorMsg = result.error || 'Unknown conversion error'
        toast.error(`Failed to convert ${video.file.name}: ${errorMsg}`)
        return {
          ...video,
          status: 'error',
          error: errorMsg,
        }
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Conversion failed'
      toast.error(`Failed to convert ${video.file.name}: ${errorMsg}`)
      return {
        ...video,
        status: 'error',
        error: errorMsg,
      }
    }
  }

  const handleConvertAll = async () => {
    if (videos.length === 0) {
      toast.error('No videos to convert')
      return
    }

    setVideos((prev) =>
      prev.map((video) => ({ ...video, status: 'processing' }))
    )

    const results: VideoFile[] = []
    for (const video of videos) {
      const result = await convertVideo(video)
      results.push(result)
      setVideos((prev) =>
        prev.map((v) => (v.id === result.id ? result : v))
      )
    }

    const successCount = results.filter((video) => video.status === 'completed').length
    const errorCount = results.filter((video) => video.status === 'error').length

    if (errorCount > 0) {
      toast.error(`${successCount} converted, ${errorCount} failed`)
    } else {
      toast.success(`All ${successCount} videos converted successfully`)
    }
  }

  const downloadGif = (video: VideoFile) => {
    if (!video.gifBlob) return

    const url = URL.createObjectURL(video.gifBlob)
    const a = document.createElement('a')
    a.href = url
    const baseName = video.file.name.replace(/\.[^/.]+$/, '')
    a.download = `${baseName}.gif`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('GIF downloaded')
  }

  const downloadAllAsZip = async () => {
    const completedVideos = videos.filter(
      (video) => video.status === 'completed' && video.gifBlob
    )

    if (completedVideos.length === 0) {
      toast.error('No converted GIFs to download')
      return
    }

    const zip = new JSZip()

    completedVideos.forEach((video) => {
      const baseName = video.file.name.replace(/\.[^/.]+$/, '')
      const filename = `${baseName}.gif`
      zip.file(filename, video.gifBlob!)
    })

    const blob = await zip.generateAsync({ type: 'blob' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `converted-gifs-${Date.now()}.zip`
    a.click()
    URL.revokeObjectURL(url)
    toast.success(`Downloaded ${completedVideos.length} GIFs as ZIP`)
  }

  const togglePlayback = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }
  }



  const setStartTime = () => {
    if (videoRef.current) {
      setConversionOptions(prev => ({
        ...prev,
        startTime: videoRef.current!.currentTime
      }))
    }
  }

  const setEndTime = () => {
    if (videoRef.current) {
      const endTime = videoRef.current.currentTime
      const duration = endTime - conversionOptions.startTime
      setConversionOptions(prev => ({
        ...prev,
        duration: Math.max(0.1, duration)
      }))
    }
  }

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Videos</CardTitle>
          <CardDescription>
            Drag and drop videos or click to browse. Supports MP4, WebM, MOV, AVI (max {formatFileSize(MAX_CLIENT_FILE_SIZE)} per file)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
              isDragging
                ? 'border-primary bg-primary/5'
                : 'border-muted-foreground/25 hover:border-primary/50'
            }`}
          >
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              {isDragging ? 'Drop videos here' : 'Drag and drop videos or click to browse'}
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_FORMATS_STRING}
            multiple
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
            aria-label="Upload video files"
          />
        </CardContent>
      </Card>

      {videos.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Videos ({videos.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 max-h-96 overflow-y-auto">
              {videos.map((video) => (
                <div
                  key={video.id}
                  onClick={() => setSelectedVideoId(video.id)}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedVideoId === video.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:bg-muted/50'
                  }`}
                >
                  <VideoIcon className="w-8 h-8 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{video.file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {video.width} × {video.height} • {formatDuration(video.duration)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(video.size)}
                    </p>
                    {video.status === 'processing' && (
                      <div className="mt-1">
                        <Progress value={video.progress || 0} className="h-1" />
                        <p className="text-xs text-blue-600 mt-1">Converting...</p>
                      </div>
                    )}
                    {video.status === 'completed' && (
                      <div className="flex items-center gap-1">
                        <p className="text-xs text-green-600">✓ Converted</p>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                              <Eye className="h-3 w-3" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>GIF Preview - {video.file.name}</DialogTitle>
                            </DialogHeader>
                            <div className="flex flex-col items-center space-y-4">
                              <div className="border rounded-lg p-4 bg-muted/20">
                                <img
                                  src={URL.createObjectURL(video.gifBlob!)}
                                  alt="GIF Preview"
                                  className="max-w-full max-h-96 object-contain"
                                />
                              </div>
                              <div className="text-center text-sm text-muted-foreground">
                                <p>Size: {formatFileSize(video.gifSize || 0)}</p>
                                <p>Dimensions: {conversionOptions.maxWidth} × {conversionOptions.maxHeight}</p>
                                <p>Frame Rate: {conversionOptions.frameRate} FPS</p>
                         {video.status === 'completed' && (
                           <p>Quality: {(video as any).finalQuality || conversionOptions.quality}/10</p>
                         )}
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    )}
                    {video.status === 'error' && (
                      <p className="text-xs text-red-600">✗ {video.error}</p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeVideo(video.id)
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Conversion Settings */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Conversion Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Preset Options */}
              <div className="space-y-2">
                <Label>Presets</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {CONVERSION_PRESETS.map((preset) => (
                    <Button
                      key={preset.name}
                      variant="outline"
                      size="sm"
                      onClick={() => applyPreset(preset)}
                      className="text-xs"
                    >
                      {preset.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Frame Rate */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Frame Rate</Label>
                  <span className="text-sm text-muted-foreground">{conversionOptions.frameRate} FPS</span>
                </div>
                <Slider
                  value={[conversionOptions.frameRate]}
                  onValueChange={([value]) =>
                    setConversionOptions((prev) => ({ ...prev, frameRate: value }))
                  }
                  min={5}
                  max={30}
                  step={1}
                />
              </div>

              {/* Quality */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Quality</Label>
                  <span className="text-sm text-muted-foreground">{conversionOptions.quality}/10</span>
                </div>
                <Slider
                  value={[conversionOptions.quality]}
                  onValueChange={([value]) =>
                    setConversionOptions((prev) => ({ ...prev, quality: value }))
                  }
                  min={1}
                  max={10}
                  step={1}
                />
              </div>

              {/* Dimensions */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="width">Width (px)</Label>
                  <Input
                    id="width"
                    type="number"
                    value={conversionOptions.maxWidth}
                    onChange={(e) => setConversionOptions((prev) => ({
                      ...prev,
                      maxWidth: parseInt(e.target.value) || 640
                    }))}
                    min={64}
                    max={1920}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height (px)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={conversionOptions.maxHeight}
                    onChange={(e) => setConversionOptions((prev) => ({
                      ...prev,
                      maxHeight: parseInt(e.target.value) || 480
                    }))}
                    min={64}
                    max={1080}
                  />
                </div>
              </div>

              {/* Loop Option */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="loop"
                  checked={conversionOptions.loop}
                  onChange={(e) =>
                    setConversionOptions((prev) => ({ ...prev, loop: e.target.checked }))
                  }
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="loop">Loop animation</Label>
              </div>

              {/* Conversion Estimate */}
              {selectedVideo && (
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Conversion Estimate</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Frames:</span>
                      <span className="ml-2 font-medium">
                        {Math.ceil(conversionOptions.duration * conversionOptions.frameRate)}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Est. Size:</span>
                      <span className="ml-2 font-medium">
                        {formatFileSize(estimatedGifSize)}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Est. Time:</span>
                      <span className="ml-2 font-medium">
                        {estimatedConversionTime < 60
                          ? `${estimatedConversionTime.toFixed(1)}s`
                          : `${(estimatedConversionTime / 60).toFixed(1)}m`
                        }
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Compression:</span>
                      <span className="ml-2 font-medium">
                        ~{((estimatedGifSize / selectedVideo.size) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button 
                  onClick={handleConvertAll} 
                  className="flex-1"
                  disabled={videos.some((video) => video.status === 'processing')}
                >
                  {videos.some((video) => video.status === 'processing') ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Converting...
                    </>
                  ) : (
                    <>Convert to GIF ({videos.length})</>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={downloadAllAsZip}
                  disabled={!videos.some((video) => video.status === 'completed')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download ZIP
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* GIF Preview & Download - Show when conversion is complete */}
      {selectedVideo && selectedVideo.status === 'completed' && selectedVideo.gifBlob && (
        <Card>
          <CardHeader>
            <CardTitle>GIF Preview & Download</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg bg-green-50 dark:bg-green-950/20">
                <div>
                  <p className="font-medium">✓ GIF Ready</p>
                  <p className="text-sm text-muted-foreground">
                    Original: {formatFileSize(selectedVideo.size)} •
                    GIF: {formatFileSize(selectedVideo.gifSize || 0)} 
                    ({((selectedVideo.gifSize || 0) / selectedVideo.size * 100).toFixed(1)}% of original)
                  </p>
                </div>
                <Button onClick={() => downloadGif(selectedVideo)}>
                  <Download className="h-4 w-4 mr-2" />
                  Download GIF
                </Button>
              </div>
              
              {/* Inline GIF Preview */}
              <div className="border rounded-lg p-4 bg-muted/20">
                <h3 className="font-medium mb-2">Preview</h3>
                <div className="flex flex-col items-center">
                  <img
                    src={URL.createObjectURL(selectedVideo.gifBlob)}
                    alt="GIF Preview"
                    className="max-w-full max-h-96 object-contain border rounded"
                  />
                  <div className="text-center text-sm text-muted-foreground mt-2">
                    <p>Size: {formatFileSize(selectedVideo.gifSize || 0)}</p>
                    <p>Dimensions: {(selectedVideo as any).finalWidth || conversionOptions.maxWidth} × {(selectedVideo as any).finalHeight || conversionOptions.maxHeight}</p>
                    <p>Frame Rate: {(selectedVideo as any).finalFrameRate || conversionOptions.frameRate} FPS</p>
                    <p>Quality: {(selectedVideo as any).finalQuality || conversionOptions.quality}/10</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Video Preview & Trimming */}
      {selectedVideo && (
        <Card>
          <CardHeader>
            <CardTitle>Video Preview & Trimming</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Video Player */}
              <div className="border rounded-lg p-4 bg-muted/20">
                <video
                  ref={videoRef}
                  className="w-full max-h-96 object-contain"
                  controls
                  preload="metadata"
                />
              </div>

              {/* Timeline Controls */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Trim Settings</Label>
                  <div className="text-sm text-muted-foreground">
                    {formatDuration(conversionOptions.startTime)} - {formatDuration(conversionOptions.startTime + conversionOptions.duration)}
                  </div>
                </div>

                {/* Video Timeline */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Current: {formatDuration(currentTime)}</span>
                    <span>Total: {formatDuration(videoDuration)}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={videoDuration || 100}
                    step={0.1}
                    value={currentTime}
                    onChange={(e) => {
                      const time = parseFloat(e.target.value)
                      if (videoRef.current) {
                        videoRef.current.currentTime = time
                      }
                    }}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                </div>

                {/* Trim Markers */}
                <div className="space-y-2">
                  <Label>Start & End Markers</Label>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={setStartTime}>
                      Set Start ({formatDuration(conversionOptions.startTime)})
                    </Button>
                    <Button variant="outline" size="sm" onClick={setEndTime}>
                      Set End ({formatDuration(conversionOptions.startTime + conversionOptions.duration)})
                    </Button>
                  </div>
                </div>

                {/* Duration Input */}
                <div className="space-y-2">
                  <Label>Duration (seconds)</Label>
                  <Input
                    type="number"
                    value={conversionOptions.duration}
                    onChange={(e) => setConversionOptions((prev) => ({
                      ...prev,
                      duration: Math.max(0.1, Math.min(videoDuration - conversionOptions.startTime, parseFloat(e.target.value) || 0))
                    }))}
                    min={0.1}
                    max={videoDuration - conversionOptions.startTime}
                    step={0.1}
                  />
                </div>

                {/* Playback Controls */}
                <div className="flex gap-2 justify-center">
                  <Button variant="outline" size="sm" onClick={() => {
                    if (videoRef.current) videoRef.current.currentTime = 0
                  }}>
                    ⏮️
                  </Button>
                  <Button variant="outline" size="sm" onClick={togglePlayback}>
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => {
                    if (videoRef.current) videoRef.current.currentTime = conversionOptions.startTime
                  }}>
                    🎬 Start
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => {
                    if (videoRef.current) videoRef.current.currentTime = conversionOptions.startTime + conversionOptions.duration
                  }}>
                    🎬 End
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

    </div>
  )
}
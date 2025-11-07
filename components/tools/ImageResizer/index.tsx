'use client'

import { useState, useCallback, useRef, useMemo, useEffect } from 'react'
import { Upload, X, Download, Loader2, Image as ImageIcon, Lock, Unlock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import JSZip from 'jszip'
import { resizeImage, loadImage, formatFileSize, calculateDimensions } from '@/lib/image/image-resizer'
import type { ImageFile, ResizeOptions, ResizeMode, ImageFormat, PresetSize } from './types'
import { PRESETS } from './types'

const ACCEPTED_FORMATS = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/bmp']
const MAX_FILE_SIZE = 25 * 1024 * 1024 // 25MB

export default function ImageResizer() {
  const [images, setImages] = useState<ImageFile[]>([])
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isAspectRatioLocked, setIsAspectRatioLocked] = useState(true)

  const [resizeOptions, setResizeOptions] = useState<ResizeOptions>({
    width: 800,
    height: 600,
    mode: 'fit',
    quality: 85,
    format: 'jpeg',
  })

  const selectedImage = images.find((img) => img.id === selectedImageId)

  const resizedPreviewUrl = useMemo(() => {
    if (selectedImage?.resizedBlob) {
      return URL.createObjectURL(selectedImage.resizedBlob)
    }
    return null
  }, [selectedImage?.resizedBlob])

  useEffect(() => {
    return () => {
      if (resizedPreviewUrl) {
        URL.revokeObjectURL(resizedPreviewUrl)
      }
    }
  }, [resizedPreviewUrl])

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    const newImages: ImageFile[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      if (!ACCEPTED_FORMATS.includes(file.type)) {
        toast.error(`${file.name}: Unsupported format`)
        continue
      }

      if (file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name}: File too large (max 25MB)`)
        continue
      }

      try {
        const img = await loadImage(file)
        const preview = URL.createObjectURL(file)

        newImages.push({
          id: crypto.randomUUID(),
          file,
          preview,
          originalWidth: img.width,
          originalHeight: img.height,
          originalSize: file.size,
          status: 'pending',
        })
      } catch (error) {
        toast.error(`${file.name}: Failed to load image`)
      }
    }

    setImages((prev) => [...prev, ...newImages])
    if (newImages.length > 0 && !selectedImageId) {
      setSelectedImageId(newImages[0].id)
    }
    toast.success(`${newImages.length} image(s) added`)
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

  const removeImage = (id: string) => {
    setImages((prev) => {
      const filtered = prev.filter((img) => img.id !== id)
      if (selectedImageId === id && filtered.length > 0) {
        setSelectedImageId(filtered[0].id)
      } else if (filtered.length === 0) {
        setSelectedImageId(null)
      }
      return filtered
    })
  }

  const applyPreset = (preset: PresetSize) => {
    setResizeOptions((prev) => ({
      ...prev,
      width: preset.width,
      height: preset.height,
    }))
  }

  const resizeSingleImage = async (image: ImageFile): Promise<ImageFile> => {
    try {
      const { width, height } = calculateDimensions(
        image.originalWidth,
        image.originalHeight,
        resizeOptions.width,
        resizeOptions.height,
        resizeOptions.mode
      )

      const resizedBlob = await resizeImage(image.file, resizeOptions)

      return {
        ...image,
        resizedBlob,
        resizedWidth: width,
        resizedHeight: height,
        resizedSize: resizedBlob.size,
        status: 'completed',
      }
    } catch (error) {
      return {
        ...image,
        status: 'error',
        error: error instanceof Error ? error.message : 'Resize failed',
      }
    }
  }

  const handleResizeAll = async () => {
    if (images.length === 0) {
      toast.error('No images to resize')
      return
    }

    setImages((prev) =>
      prev.map((img) => ({ ...img, status: 'processing' as const }))
    )

    const results: ImageFile[] = []
    for (const image of images) {
      const result = await resizeSingleImage(image)
      results.push(result)
      setImages((prev) =>
        prev.map((img) => (img.id === result.id ? result : img))
      )
    }

    const successCount = results.filter((img) => img.status === 'completed').length
    const errorCount = results.filter((img) => img.status === 'error').length

    if (errorCount > 0) {
      toast.error(`${successCount} resized, ${errorCount} failed`)
    } else {
      toast.success(`All ${successCount} images resized successfully`)
    }
  }

  const downloadImage = (image: ImageFile) => {
    if (!image.resizedBlob) return

    const url = URL.createObjectURL(image.resizedBlob)
    const a = document.createElement('a')
    a.href = url
    const ext = resizeOptions.format === 'jpeg' ? 'jpg' : resizeOptions.format
    const baseName = image.file.name.replace(/\.[^/.]+$/, '')
    a.download = `${baseName}-${image.resizedWidth}x${image.resizedHeight}.${ext}`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Image downloaded')
  }

  const downloadAllAsZip = async () => {
    const completedImages = images.filter(
      (img) => img.status === 'completed' && img.resizedBlob
    )

    if (completedImages.length === 0) {
      toast.error('No resized images to download')
      return
    }

    const zip = new JSZip()
    const ext = resizeOptions.format === 'jpeg' ? 'jpg' : resizeOptions.format

    completedImages.forEach((image) => {
      const baseName = image.file.name.replace(/\.[^/.]+$/, '')
      const filename = `${baseName}-${image.resizedWidth}x${image.resizedHeight}.${ext}`
      zip.file(filename, image.resizedBlob!)
    })

    const blob = await zip.generateAsync({ type: 'blob' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `resized-images-${Date.now()}.zip`
    a.click()
    URL.revokeObjectURL(url)
    toast.success(`Downloaded ${completedImages.length} images as ZIP`)
  }

  const updateDimension = (dimension: 'width' | 'height', value: number) => {
    if (isAspectRatioLocked && selectedImage && resizeOptions.mode !== 'exact') {
      const aspectRatio = selectedImage.originalWidth / selectedImage.originalHeight
      if (dimension === 'width') {
        setResizeOptions((prev) => ({
          ...prev,
          width: value,
          height: Math.round(value / aspectRatio),
        }))
      } else {
        setResizeOptions((prev) => ({
          ...prev,
          height: value,
          width: Math.round(value * aspectRatio),
        }))
      }
    } else {
      setResizeOptions((prev) => ({ ...prev, [dimension]: value }))
    }
  }

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Images</CardTitle>
          <CardDescription>
            Drag and drop images or click to browse. Supports JPEG, PNG, WebP, GIF, BMP (max 25MB
            per file)
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
              {isDragging ? 'Drop images here' : 'Drag and drop images or click to browse'}
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_FORMATS.join(',')}
            multiple
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
            aria-label="Upload image files"
          />
        </CardContent>
      </Card>

      {images.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Image List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Images ({images.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 max-h-96 overflow-y-auto">
              {images.map((image) => (
                <div
                  key={image.id}
                  onClick={() => setSelectedImageId(image.id)}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedImageId === image.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:bg-muted/50'
                  }`}
                >
                  <img
                    src={image.preview}
                    alt={image.file.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{image.file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {image.originalWidth} × {image.originalHeight}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(image.originalSize)}
                    </p>
                    {image.status === 'processing' && (
                      <p className="text-xs text-blue-600">Processing...</p>
                    )}
                    {image.status === 'completed' && (
                      <p className="text-xs text-green-600">✓ Resized</p>
                    )}
                    {image.status === 'error' && (
                      <p className="text-xs text-red-600">✗ Failed</p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeImage(image.id)
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Resize Controls */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Resize Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Preset Sizes */}
              <div className="space-y-2">
                <Label>Preset Sizes</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {PRESETS.map((preset) => (
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

              {/* Custom Dimensions */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Target Dimensions</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsAspectRatioLocked((v) => !v)}
                    className="h-8 px-2"
                  >
                    {isAspectRatioLocked ? (
                      <>
                        <Lock className="h-3.5 w-3.5 mr-1.5" />
                        <span className="text-xs">Linked</span>
                      </>
                    ) : (
                      <>
                        <Unlock className="h-3.5 w-3.5 mr-1.5" />
                        <span className="text-xs">Unlinked</span>
                      </>
                    )}
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="width" className="text-sm text-muted-foreground">
                      Width (px)
                    </Label>
                    <Input
                      id="width"
                      type="number"
                      value={resizeOptions.width}
                      onChange={(e) => updateDimension('width', parseInt(e.target.value) || 0)}
                      min={1}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height" className="text-sm text-muted-foreground">
                      Height (px)
                    </Label>
                    <Input
                      id="height"
                      type="number"
                      value={resizeOptions.height}
                      onChange={(e) => updateDimension('height', parseInt(e.target.value) || 0)}
                      min={1}
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  {isAspectRatioLocked
                    ? '🔗 Width and height are linked - changing one updates the other proportionally'
                    : '🔓 Width and height are independent - change them freely'}
                </p>
              </div>

              {/* Resize Mode */}
              <div className="space-y-2">
                <Label htmlFor="mode">How to Fit Image</Label>
                <Select
                  value={resizeOptions.mode}
                  onValueChange={(value) =>
                    setResizeOptions((prev) => ({ ...prev, mode: value as ResizeMode }))
                  }
                >
                  <SelectTrigger id="mode">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fit">
                      <div className="flex flex-col">
                        <span className="font-medium">Fit</span>
                        <span className="text-xs text-muted-foreground">
                          Resize to fit within dimensions, keep proportions
                        </span>
                      </div>
                    </SelectItem>
                    <SelectItem value="exact">
                      <div className="flex flex-col">
                        <span className="font-medium">Exact</span>
                        <span className="text-xs text-muted-foreground">
                          Force exact dimensions (may stretch/squish)
                        </span>
                      </div>
                    </SelectItem>
                    <SelectItem value="fill">
                      <div className="flex flex-col">
                        <span className="font-medium">Fill</span>
                        <span className="text-xs text-muted-foreground">
                          Fill dimensions completely (may crop edges)
                        </span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  {resizeOptions.mode === 'fit' &&
                    '📐 Image will fit inside the dimensions without distortion'}
                  {resizeOptions.mode === 'exact' &&
                    '⚠️ Image will be forced to exact size, may look distorted'}
                  {resizeOptions.mode === 'fill' &&
                    '✂️ Image will fill the entire area, excess parts will be cropped'}
                </p>
              </div>

              {/* Quality */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Quality</Label>
                  <span className="text-sm text-muted-foreground">{resizeOptions.quality}%</span>
                </div>
                <Slider
                  value={[resizeOptions.quality]}
                  onValueChange={([value]) =>
                    setResizeOptions((prev) => ({ ...prev, quality: value }))
                  }
                  min={1}
                  max={100}
                  step={1}
                />
              </div>

              {/* Format */}
              <div className="space-y-2">
                <Label htmlFor="format">Output Format</Label>
                <Select
                  value={resizeOptions.format}
                  onValueChange={(value) =>
                    setResizeOptions((prev) => ({ ...prev, format: value as ImageFormat }))
                  }
                >
                  <SelectTrigger id="format">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jpeg">JPEG</SelectItem>
                    <SelectItem value="png">PNG</SelectItem>
                    <SelectItem value="webp">WebP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button onClick={handleResizeAll} className="flex-1">
                  {images.some((img) => img.status === 'processing') ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>Resize All ({images.length})</>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={downloadAllAsZip}
                  disabled={!images.some((img) => img.status === 'completed')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download ZIP
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Preview */}
      {selectedImage && (
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Original */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Original</h3>
                  <span className="text-sm text-muted-foreground">
                    {selectedImage.originalWidth} × {selectedImage.originalHeight} •{' '}
                    {formatFileSize(selectedImage.originalSize)}
                  </span>
                </div>
                <div className="border rounded-lg p-4 bg-muted/20 flex items-center justify-center">
                  <img
                    src={selectedImage.preview}
                    alt="Original"
                    className="max-w-full max-h-96 object-contain"
                  />
                </div>
              </div>

              {/* Resized */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Resized</h3>
                  {selectedImage.resizedBlob && (
                    <span className="text-sm text-muted-foreground">
                      {selectedImage.resizedWidth} × {selectedImage.resizedHeight} •{' '}
                      {formatFileSize(selectedImage.resizedSize || 0)}
                    </span>
                  )}
                </div>
                <div className="border rounded-lg p-4 bg-muted/20 flex items-center justify-center min-h-[200px]">
                  {selectedImage.status === 'completed' && resizedPreviewUrl ? (
                    <img
                      src={resizedPreviewUrl}
                      alt="Resized"
                      className="max-w-full max-h-96 object-contain"
                    />
                  ) : selectedImage.status === 'processing' ? (
                    <div className="text-center">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Processing...</p>
                    </div>
                  ) : selectedImage.status === 'error' ? (
                    <div className="text-center text-red-600">
                      <p className="text-sm">Error: {selectedImage.error}</p>
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground">
                      <ImageIcon className="h-12 w-12 mx-auto mb-2" />
                      <p className="text-sm">Click &quot;Resize All&quot; to process</p>
                    </div>
                  )}
                </div>
                {selectedImage.status === 'completed' && selectedImage.resizedBlob && (
                  <Button onClick={() => downloadImage(selectedImage)} className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download This Image
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

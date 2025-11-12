'use client'

import { useState, useRef, useCallback, useMemo, useEffect } from 'react'
import { Upload, Download, X, Loader2, AlertCircle, FileDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import {
  loadPdfDocument,
  getPdfPageCount,
  convertPdfToImages,
  downloadImage,
  createZipArchive,
  formatFileSize,
} from '@/lib/pdf/pdf-to-images'
import { ConvertedImage, ConversionOptions, PdfFileItem } from './types'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const MAX_PAGES = 100
const PAGE_NUMBER_PADDING = 3

export function PdfToImagesConverter() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [pdfFile, setPdfFile] = useState<PdfFileItem | null>(null)
  const [images, setImages] = useState<ConvertedImage[]>([])
  const [isConverting, setIsConverting] = useState(false)
  const [conversionProgress, setConversionProgress] = useState({ current: 0, total: 0 })
  const [dragActive, setDragActive] = useState(false)

  const [options, setOptions] = useState<ConversionOptions>({
    format: 'png',
    quality: 90,
    scale: 2,
  })

  // Create object URLs for preview images and clean up on unmount or when images change
  const imageUrls = useMemo(() => images.map((img) => URL.createObjectURL(img.blob)), [images])

  useEffect(() => {
    return () => {
      // Clean up all object URLs when component unmounts or images change
      imageUrls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [imageUrls])

  const handleFileSelect = useCallback(async (file: File) => {
    // Validate file type
    if (file.type !== 'application/pdf') {
      toast.error('Please select a valid PDF file')
      return
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      toast.error(`File size must be less than ${formatFileSize(MAX_FILE_SIZE)}`)
      return
    }

    try {
      // Get page count
      const pdf = await loadPdfDocument(file)
      const pageCount = await getPdfPageCount(pdf)

      if (pageCount > MAX_PAGES) {
        toast.error(`PDF has too many pages. Maximum ${MAX_PAGES} pages allowed.`)
        return
      }

      setPdfFile({
        id: crypto.randomUUID(),
        file,
        name: file.name,
        size: file.size,
        pageCount,
        status: 'ready',
      })

      toast.success(`PDF loaded: ${pageCount} page(s)`)
    } catch (error) {
      toast.error('Failed to load PDF. Please ensure it is a valid, non-encrypted PDF.')
      console.error('Error loading PDF:', error)
    }
  }, [])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)

      const files = e.dataTransfer.files
      if (files && files.length > 0) {
        handleFileSelect(files[0])
      }
    },
    [handleFileSelect]
  )

  const handleConvert = useCallback(async () => {
    if (!pdfFile) return

    try {
      setIsConverting(true)
      setPdfFile((prev) => (prev ? { ...prev, status: 'processing' } : null))

      const convertedImages = await convertPdfToImages(pdfFile.file, options, (current, total) => {
        setConversionProgress({ current, total })
      })

      setImages(convertedImages)
      setPdfFile((prev) => (prev ? { ...prev, status: 'completed', images: convertedImages } : null))
      toast.success(`Successfully converted ${convertedImages.length} page(s)`)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      toast.error(`Conversion failed: ${errorMessage}`)
      setPdfFile((prev) => (prev ? { ...prev, status: 'error', error: errorMessage } : null))
    } finally {
      setIsConverting(false)
      setConversionProgress({ current: 0, total: 0 })
    }
  }, [pdfFile, options])

  const handleDownloadImage = useCallback(
    (image: ConvertedImage) => {
      const ext = options.format === 'jpeg' ? '.jpg' : '.png'
      const filename = `${pdfFile?.name.replace(/\.pdf$/i, '') || 'image'}_page_${String(image.pageNumber).padStart(PAGE_NUMBER_PADDING, '0')}${ext}`
      downloadImage(image.blob, filename)
      toast.success('Image downloaded')
    },
    [pdfFile?.name, options.format]
  )

  const handleDownloadAll = useCallback(async () => {
    if (!pdfFile || images.length === 0) return

    const toastId = toast.loading('Creating archive...')

    try {
      const zipBlob = await createZipArchive(images, pdfFile.name)
      const filename = pdfFile.name.replace(/\.pdf$/i, '') + '.zip'
      downloadImage(zipBlob, filename)
      toast.success('All images downloaded as ZIP', { id: toastId })
    } catch (error) {
      toast.error('Failed to create ZIP archive', { id: toastId })
      console.error('Error creating ZIP:', error)
    }
  }, [pdfFile, images])

  const handleReset = useCallback(() => {
    setPdfFile(null)
    setImages([])
    setConversionProgress({ current: 0, total: 0 })
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [])

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Upload PDF</CardTitle>
          <CardDescription>Select a PDF file to convert to images</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={cn(
              'relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
              dragActive
                ? 'border-primary bg-primary/5'
                : 'border-muted-foreground/25 hover:border-muted-foreground/50'
            )}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />

            {!pdfFile ? (
              <div className="space-y-2">
                <Upload className="w-10 h-10 mx-auto text-muted-foreground" />
                <div>
                  <p className="font-semibold">Drag and drop your PDF here</p>
                  <p className="text-sm text-muted-foreground">or click to select</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Maximum file size: {formatFileSize(MAX_FILE_SIZE)}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="font-semibold">{pdfFile.name}</p>
                <div className="flex justify-center gap-2 flex-wrap">
                  <Badge variant="secondary">{pdfFile.pageCount} pages</Badge>
                  <Badge variant="secondary">{formatFileSize(pdfFile.size)}</Badge>
                </div>
                {pdfFile.status === 'error' && (
                  <p className="text-sm text-destructive">{pdfFile.error}</p>
                )}
              </div>
            )}
          </div>

          {pdfFile && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="mt-4 w-full"
            >
              <X className="w-4 h-4 mr-2" />
              Clear
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Settings Section */}
      {pdfFile && !images.length && (
        <Card>
          <CardHeader>
            <CardTitle>Conversion Settings</CardTitle>
            <CardDescription>Configure output format and quality</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Format Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Output Format</label>
              <Select value={options.format} onValueChange={(value) =>
                setOptions({
                  ...options,
                  format: value as 'png' | 'jpeg',
                })
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="png">PNG (Lossless)</SelectItem>
                  <SelectItem value="jpeg">JPEG (Compressed)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                PNG: Larger file size, no quality loss. JPEG: Smaller file size, adjustable quality.
              </p>
            </div>

            {/* Quality Slider (JPEG only) */}
            {options.format === 'jpeg' && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Quality: {options.quality}%</label>
                <Slider
                  value={[options.quality]}
                  onValueChange={([value]) =>
                    setOptions({ ...options, quality: value })
                  }
                  min={1}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Higher values produce better quality but larger files.
                </p>
              </div>
            )}

            {/* Scale/DPI Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Resolution Scale</label>
              <Select value={options.scale.toString()} onValueChange={(value) =>
                setOptions({
                  ...options,
                  scale: parseFloat(value),
                })
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1x (72 DPI) - Smaller files</SelectItem>
                  <SelectItem value="2">2x (144 DPI) - Recommended</SelectItem>
                  <SelectItem value="3">3x (216 DPI) - High quality</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Higher resolution produces larger, more detailed images.
              </p>
            </div>

            {/* Convert Button */}
            <Button
              onClick={handleConvert}
              disabled={isConverting || pdfFile.status === 'processing'}
              className="w-full"
              size="lg"
            >
              {isConverting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Converting ({conversionProgress.current}/{conversionProgress.total})
                </>
              ) : (
                'Convert to Images'
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Progress */}
      {isConverting && conversionProgress.total > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Converting pages...</span>
                <span className="text-sm text-muted-foreground">
                  {conversionProgress.current} / {conversionProgress.total}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-200"
                  style={{
                    width: `${(conversionProgress.current / conversionProgress.total) * 100}%`,
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Images Preview */}
      {images.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Converted Images</CardTitle>
                <CardDescription>{images.length} image(s) ready for download</CardDescription>
              </div>
              <Button onClick={handleDownloadAll} size="sm">
                <FileDown className="w-4 h-4 mr-2" />
                Download All as ZIP
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div key={image.pageNumber} className="space-y-2">
                  <div className="relative bg-muted rounded-lg overflow-hidden aspect-[8.5/11]">
                    <img
                      src={imageUrls[index]}
                      alt={`Page ${image.pageNumber}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-center">Page {image.pageNumber}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownloadImage(image)}
                      className="w-full"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Info Section */}
      {!pdfFile && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Your PDF and images are processed entirely in your browser. No data is uploaded to any server.
            Maximum 100 pages per PDF.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}

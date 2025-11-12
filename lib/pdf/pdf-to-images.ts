import { ConvertedImage, ConversionOptions } from '@/components/tools/PdfToImages/types'
import type * as PDFJS from 'pdfjs-dist'

let pdfjsLib: typeof PDFJS | null = null

async function initPdfJs() {
  if (pdfjsLib) return pdfjsLib

  pdfjsLib = await import('pdfjs-dist')
  if (typeof window !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
  }
  return pdfjsLib
}

const MAX_CANVAS_AREA = 16777216 // 4096 x 4096 pixels
const BATCH_SIZE = 3 // Process pages in batches of 3 to avoid blocking UI
const PAGE_NUMBER_PADDING = 3

export async function loadPdfDocument(file: File) {
  const lib = await initPdfJs()
  const arrayBuffer = await file.arrayBuffer()
  return lib.getDocument({ data: arrayBuffer }).promise
}

export async function getPdfPageCount(pdf: PDFJS.PDFDocumentProxy): Promise<number> {
  return pdf.numPages
}

export async function convertPageToImage(
  page: PDFJS.PDFPageProxy,
  options: ConversionOptions
): Promise<ConvertedImage> {
  const viewport = page.getViewport({ scale: options.scale })

  // Validate canvas size to prevent browser limits
  if (viewport.width * viewport.height > MAX_CANVAS_AREA) {
    throw new Error(
      `Page resolution too high (${Math.round(viewport.width)}x${Math.round(viewport.height)}). Try a lower scale.`
    )
  }

  // Create canvas
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  if (!context) {
    throw new Error('Failed to get canvas context')
  }

  canvas.width = viewport.width
  canvas.height = viewport.height

  // Render page to canvas
  await page.render({
    canvasContext: context,
    viewport: viewport,
    canvas: canvas,
  }).promise

  // Convert canvas to blob
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        // Validate blob
        if (!blob || !blob.type.startsWith('image/')) {
          // Clean up canvas after error
          canvas.width = 0
          canvas.height = 0
          reject(new Error('Failed to convert canvas to blob'))
          return
        }

        // Clean up canvas resources
        canvas.width = 0
        canvas.height = 0

        resolve({
          pageNumber: page.pageNumber,
          blob,
          width: viewport.width,
          height: viewport.height,
        })
      },
      `image/${options.format === 'jpeg' ? 'jpeg' : 'png'}`,
      options.format === 'jpeg' ? options.quality / 100 : undefined
    )
  })
}

export async function convertPdfToImages(
  file: File,
  options: ConversionOptions,
  onProgress?: (current: number, total: number) => void
): Promise<ConvertedImage[]> {
  let pdf: PDFJS.PDFDocumentProxy | null = null

  try {
    // Load PDF
    pdf = await loadPdfDocument(file)
    const pageCount = await getPdfPageCount(pdf)

    const images: ConvertedImage[] = []

    // Convert pages in batches to avoid blocking UI
    for (let i = 0; i < pageCount; i += BATCH_SIZE) {
      const batchEnd = Math.min(i + BATCH_SIZE, pageCount)
      const batchPromises = []

      // Start batch of page conversions
      for (let pageNum = i + 1; pageNum <= batchEnd; pageNum++) {
        batchPromises.push(
          pdf
            .getPage(pageNum)
            .then((page) => {
              return convertPageToImage(page, options).then((image) => {
                // Clean up page resources
                ;(page as any).cleanup?.()
                return image
              })
            })
        )
      }

      // Wait for batch to complete
      const batchResults = await Promise.all(batchPromises)
      images.push(...batchResults)

      // Update progress
      onProgress?.(batchEnd, pageCount)
    }

    return images
  } catch (error) {
    throw new Error(
      `Failed to convert PDF: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  } finally {
    // Always cleanup PDF resources
    if (pdf) {
      try {
        pdf.cleanup?.()
        ;(pdf as any).destroy?.()
      } catch (e) {
        // Cleanup errors are non-critical
        console.debug('PDF cleanup error:', e)
      }
    }
  }
}

export function downloadImage(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export async function createZipArchive(
  images: ConvertedImage[],
  pdfName: string
): Promise<Blob> {
  const { default: JSZip } = await import('jszip')

  const zip = new JSZip()
  const baseName = pdfName.replace(/\.pdf$/i, '')
  const ext = images[0]?.blob.type.includes('jpeg') ? '.jpg' : '.png'

  // Add each image to zip
  for (const image of images) {
    const filename = `${baseName}_page_${String(image.pageNumber).padStart(PAGE_NUMBER_PADDING, '0')}${ext}`
    zip.file(filename, image.blob)
  }

  return zip.generateAsync({ type: 'blob' })
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

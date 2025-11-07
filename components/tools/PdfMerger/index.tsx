'use client'

import { useState, useRef } from 'react'
import { PDFDocument } from 'pdf-lib'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Upload, X, GripVertical, FileText, Download, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { PdfFile } from './types'
import { SortableItem } from './SortableItem'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const MAX_TOTAL_SIZE = 50 * 1024 * 1024 // 50MB

export default function PdfMerger() {
  const [pdfFiles, setPdfFiles] = useState<PdfFile[]>([])
  const [outputFilename, setOutputFilename] = useState('merged_document.pdf')
  const [isMerging, setIsMerging] = useState(false)
  const [mergeProgress, setMergeProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const validatePdf = (file: File): { valid: boolean; error?: string } => {
    if (file.type !== 'application/pdf') {
      return { valid: false, error: 'Only PDF files are allowed' }
    }
    
    if (file.size > MAX_FILE_SIZE) {
      return { valid: false, error: `File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit` }
    }
    
    return { valid: true }
  }

  const getTotalSize = (files: PdfFile[]): number => {
    return files.reduce((sum, file) => sum + file.size, 0)
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const loadPdfMetadata = async (file: File): Promise<number> => {
    try {
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await PDFDocument.load(arrayBuffer)
      return pdf.getPageCount()
    } catch (error) {
      console.error('Error loading PDF metadata:', error)
      throw error
    }
  }

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    const fileArray = Array.from(files)
    const newPdfFiles: PdfFile[] = []

    for (const file of fileArray) {
      const validation = validatePdf(file)
      
      if (!validation.valid) {
        toast.error(`${file.name}: ${validation.error}`)
        continue
      }

      const newFile: PdfFile = {
        id: crypto.randomUUID(),
        file,
        name: file.name,
        size: file.size,
        pageCount: 0,
        status: 'loading',
      }

      newPdfFiles.push(newFile)
    }

    if (newPdfFiles.length === 0) return

    const currentTotal = getTotalSize(pdfFiles)
    const newTotal = getTotalSize(newPdfFiles)

    if (currentTotal + newTotal > MAX_TOTAL_SIZE) {
      toast.error(`Total size would exceed ${MAX_TOTAL_SIZE / 1024 / 1024}MB limit`)
      return
    }

    setPdfFiles(prev => [...prev, ...newPdfFiles])

    for (const pdfFile of newPdfFiles) {
      try {
        const pageCount = await loadPdfMetadata(pdfFile.file)
        setPdfFiles(prev =>
          prev.map(f =>
            f.id === pdfFile.id
              ? { ...f, pageCount, status: 'ready' as const }
              : f
          )
        )
      } catch (error) {
        setPdfFiles(prev =>
          prev.map(f =>
            f.id === pdfFile.id
              ? { ...f, status: 'error' as const, error: 'Failed to read PDF' }
              : f
          )
        )
        toast.error(`Failed to read ${pdfFile.name}`)
      }
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setPdfFiles(items => {
        const oldIndex = items.findIndex(item => item.id === active.id)
        const newIndex = items.findIndex(item => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const removePdf = (id: string) => {
    setPdfFiles(prev => prev.filter(f => f.id !== id))
  }

  const clearAll = () => {
    setPdfFiles([])
    setMergeProgress(0)
  }

  const mergePdfs = async () => {
    const readyFiles = pdfFiles.filter(f => f.status === 'ready')
    
    if (readyFiles.length < 2) {
      toast.error('Please add at least 2 valid PDF files to merge')
      return
    }

    setIsMerging(true)
    setMergeProgress(0)

    try {
      const mergedPdf = await PDFDocument.create()
      
      for (let i = 0; i < readyFiles.length; i++) {
        const pdfFile = readyFiles[i]
        const arrayBuffer = await pdfFile.file.arrayBuffer()
        const pdf = await PDFDocument.load(arrayBuffer)
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
        
        copiedPages.forEach(page => {
          mergedPdf.addPage(page)
        })

        setMergeProgress(((i + 1) / readyFiles.length) * 100)
      }

      const mergedPdfBytes = await mergedPdf.save()
      const blob = new Blob([new Uint8Array(mergedPdfBytes)], { type: 'application/pdf' })
      
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = outputFilename.endsWith('.pdf') ? outputFilename : `${outputFilename}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast.success('PDFs merged successfully!')
      setMergeProgress(100)
    } catch (error) {
      console.error('Error merging PDFs:', error)
      toast.error('Failed to merge PDFs. Please try again.')
      setMergeProgress(0)
    } finally {
      setIsMerging(false)
    }
  }

  const totalPages = pdfFiles.reduce((sum, f) => sum + (f.status === 'ready' ? f.pageCount : 0), 0)
  const totalSize = getTotalSize(pdfFiles)
  const readyCount = pdfFiles.filter(f => f.status === 'ready').length

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload PDFs</CardTitle>
          <CardDescription>
            Select or drag & drop multiple PDF files to merge them into one document
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`
              border-2 border-dashed rounded-lg p-12 text-center cursor-pointer
              transition-colors duration-200
              ${isDragging
                ? 'border-primary bg-primary/5'
                : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-accent/50'
              }
            `}
          >
            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium mb-2">
              {isDragging ? 'Drop PDF files here' : 'Drop PDF files here'}
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              or click to browse
            </p>
            <p className="text-xs text-muted-foreground">
              Max {MAX_FILE_SIZE / 1024 / 1024}MB per file • {MAX_TOTAL_SIZE / 1024 / 1024}MB total
            </p>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            multiple
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
            aria-label="Upload PDF files"
          />
        </CardContent>
      </Card>

      {pdfFiles.length > 0 && (
        <>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Selected PDFs ({pdfFiles.length})</CardTitle>
                  <CardDescription>
                    {readyCount} ready • {totalPages} pages • {formatFileSize(totalSize)}
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={pdfFiles.map(f => f.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-2">
                    {pdfFiles.map((pdf, index) => (
                      <SortableItem
                        key={pdf.id}
                        id={pdf.id}
                        pdf={pdf}
                        index={index}
                        onRemove={removePdf}
                        formatFileSize={formatFileSize}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Output Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="filename">Output Filename</Label>
                <Input
                  id="filename"
                  value={outputFilename}
                  onChange={(e) => setOutputFilename(e.target.value)}
                  placeholder="merged_document.pdf"
                />
              </div>

              {isMerging && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Merging PDFs...</span>
                    <span className="font-medium">{Math.round(mergeProgress)}%</span>
                  </div>
                  <Progress value={mergeProgress} />
                </div>
              )}

              <Button
                onClick={mergePdfs}
                disabled={isMerging || readyCount < 2}
                className="w-full"
                size="lg"
              >
                <Download className="w-4 h-4 mr-2" />
                {isMerging ? 'Merging...' : 'Merge PDFs'}
              </Button>

              {readyCount < 2 && pdfFiles.length > 0 && (
                <p className="text-xs text-muted-foreground text-center">
                  Add at least 2 valid PDF files to merge
                </p>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, FileText, X, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PdfFile } from './types'

interface SortableItemProps {
  id: string
  pdf: PdfFile
  index: number
  onRemove: (id: string) => void
  formatFileSize: (bytes: number) => string
}

export function SortableItem({ id, pdf, index, onRemove, formatFileSize }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        flex items-center gap-3 p-3 rounded-lg border bg-card
        ${isDragging ? 'shadow-lg' : 'shadow-sm'}
      `}
    >
      <button
        className="cursor-grab active:cursor-grabbing touch-none p-1 hover:bg-accent rounded"
        {...attributes}
        {...listeners}
        aria-label="Drag to reorder"
      >
        <GripVertical className="w-5 h-5 text-muted-foreground" />
      </button>

      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="flex-shrink-0 w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
          <span className="text-sm font-semibold text-primary">{index + 1}</span>
        </div>

        <FileText className="w-5 h-5 text-muted-foreground flex-shrink-0" />

        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm truncate">{pdf.name}</p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {pdf.status === 'loading' && (
              <>
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>Loading...</span>
              </>
            )}
            {pdf.status === 'ready' && (
              <>
                <span>{pdf.pageCount} {pdf.pageCount === 1 ? 'page' : 'pages'}</span>
                <span>•</span>
                <span>{formatFileSize(pdf.size)}</span>
              </>
            )}
            {pdf.status === 'error' && (
              <>
                <AlertCircle className="w-3 h-3 text-destructive" />
                <span className="text-destructive">{pdf.error || 'Error loading PDF'}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => onRemove(id)}
        className="flex-shrink-0"
        aria-label={`Remove ${pdf.name}`}
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  )
}

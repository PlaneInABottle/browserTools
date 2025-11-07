'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { ArrowLeftRight, Copy, Download, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import * as Diff from 'diff'

type ComparisonMode = 'chars' | 'words' | 'lines'
type ViewMode = 'side-by-side' | 'inline'

interface DiffPart {
  added?: boolean
  removed?: boolean
  value: string
}

interface DiffStats {
  additions: number
  deletions: number
  changes: number
  similarity: number
}

export default function TextDiffChecker() {
  const [text1, setText1] = useState('')
  const [text2, setText2] = useState('')
  const [comparisonMode, setComparisonMode] = useState<ComparisonMode>('lines')
  const [viewMode, setViewMode] = useState<ViewMode>('side-by-side')
  const [ignoreCase, setIgnoreCase] = useState(false)
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false)

  const diffResult = useMemo(() => {
    if (!text1 && !text2) return []

    let processedText1 = text1
    let processedText2 = text2

    if (ignoreCase) {
      processedText1 = text1.toLowerCase()
      processedText2 = text2.toLowerCase()
    }

    if (ignoreWhitespace) {
      processedText1 = processedText1.replace(/\s+/g, ' ').trim()
      processedText2 = processedText2.replace(/\s+/g, ' ').trim()
    }

    switch (comparisonMode) {
      case 'chars':
        return Diff.diffChars(processedText1, processedText2)
      case 'words':
        return Diff.diffWords(processedText1, processedText2)
      case 'lines':
        return Diff.diffLines(processedText1, processedText2)
      default:
        return []
    }
  }, [text1, text2, comparisonMode, ignoreCase, ignoreWhitespace])

  const stats: DiffStats = useMemo(() => {
    const additions = diffResult.filter(d => d.added).length
    const deletions = diffResult.filter(d => d.removed).length
    const unchanged = diffResult.filter(d => !d.added && !d.removed).length
    const total = diffResult.length

    return {
      additions,
      deletions,
      changes: additions + deletions,
      similarity: total > 0 ? Math.round((unchanged / total) * 100) : 100
    }
  }, [diffResult])

  const handleSwap = () => {
    const temp = text1
    setText1(text2)
    setText2(temp)
  }

  const handleClear = () => {
    setText1('')
    setText2('')
  }

  const handleCopyDiff = async () => {
    const diffText = diffResult
      .map(part => {
        const prefix = part.added ? '+ ' : part.removed ? '- ' : '  '
        return part.value.split('\n').map(line => prefix + line).join('\n')
      })
      .join('')

    try {
      await navigator.clipboard.writeText(diffText)
      toast.success('Diff copied to clipboard!')
    } catch (err) {
      toast.error('Failed to copy to clipboard')
    }
  }

  const handleDownload = () => {
    const diffText = diffResult
      .map(part => {
        const prefix = part.added ? '+ ' : part.removed ? '- ' : '  '
        return part.value.split('\n').map(line => prefix + line).join('\n')
      })
      .join('')

    const blob = new Blob([diffText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `diff-${new Date().toISOString().slice(0, 10)}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-medium mb-2 block">Comparison Mode</label>
              <Select value={comparisonMode} onValueChange={(v) => setComparisonMode(v as ComparisonMode)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="chars">Character Level</SelectItem>
                  <SelectItem value="words">Word Level</SelectItem>
                  <SelectItem value="lines">Line Level</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2 flex-wrap items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={ignoreCase}
                  onChange={(e) => setIgnoreCase(e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm">Ignore Case</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={ignoreWhitespace}
                  onChange={(e) => setIgnoreWhitespace(e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm">Ignore Whitespace</span>
              </label>
            </div>

            <div className="flex gap-2 ml-auto">
              <Button variant="outline" size="sm" onClick={handleSwap}>
                <ArrowLeftRight className="h-4 w-4 mr-2" />
                Swap
              </Button>
              <Button variant="outline" size="sm" onClick={handleClear} disabled={!text1 && !text2}>
                <Trash2 className="h-4 w-4 mr-2" />
                Clear
              </Button>
              <Button variant="outline" size="sm" onClick={handleCopyDiff} disabled={diffResult.length === 0}>
                <Copy className="h-4 w-4 mr-2" />
                Copy Diff
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload} disabled={diffResult.length === 0}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Input Areas */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold mb-2">Original Text</h3>
            <Textarea
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              placeholder="Paste or type the original text here..."
              className="min-h-[300px] font-mono text-sm resize-y"
              aria-label="Original text input"
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold mb-2">Modified Text</h3>
            <Textarea
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              placeholder="Paste or type the modified text here..."
              className="min-h-[300px] font-mono text-sm resize-y"
              aria-label="Modified text input"
            />
          </CardContent>
        </Card>
      </div>

      {/* Statistics */}
      {(text1 || text2) && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold mb-4">Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {stats.additions}
                </div>
                <div className="text-xs text-muted-foreground mt-1">Additions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {stats.deletions}
                </div>
                <div className="text-xs text-muted-foreground mt-1">Deletions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  {stats.changes}
                </div>
                <div className="text-xs text-muted-foreground mt-1">Changes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {stats.similarity}%
                </div>
                <div className="text-xs text-muted-foreground mt-1">Similarity</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Diff Output */}
      {diffResult.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold">Comparison Result</h3>
              <Select value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inline">Inline View</SelectItem>
                  <SelectItem value="side-by-side">Side-by-Side</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {viewMode === 'inline' ? (
              <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900 font-mono text-sm overflow-x-auto">
                {diffResult.map((part, index) => (
                  <span
                    key={index}
                    className={
                      part.added
                        ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200'
                        : part.removed
                        ? 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 line-through'
                        : 'text-gray-700 dark:text-gray-300'
                    }
                  >
                    {part.value}
                  </span>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                  <h4 className="text-xs font-semibold mb-2 text-muted-foreground">Original</h4>
                  <div className="font-mono text-sm overflow-x-auto whitespace-pre-wrap break-words">
                    {diffResult.map((part, index) =>
                      !part.added ? (
                        <span
                          key={index}
                          className={
                            part.removed
                              ? 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200'
                              : 'text-gray-700 dark:text-gray-300'
                          }
                        >
                          {part.value}
                        </span>
                      ) : null
                    )}
                  </div>
                </div>

                <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                  <h4 className="text-xs font-semibold mb-2 text-muted-foreground">Modified</h4>
                  <div className="font-mono text-sm overflow-x-auto whitespace-pre-wrap break-words">
                    {diffResult.map((part, index) =>
                      !part.removed ? (
                        <span
                          key={index}
                          className={
                            part.added
                              ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200'
                              : 'text-gray-700 dark:text-gray-300'
                          }
                        >
                          {part.value}
                        </span>
                      ) : null
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

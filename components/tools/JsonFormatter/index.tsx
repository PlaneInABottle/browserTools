'use client'

import { useState, useMemo, useCallback } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Copy, Download, Trash2, CheckCircle, XCircle } from 'lucide-react'
import { toast } from 'sonner'

type ViewMode = 'formatted' | 'minified' | 'tree'
type IndentSize = 2 | 4

interface ValidationResult {
  isValid: boolean
  error?: string
  errorLine?: number
  errorColumn?: number
}

const SAMPLE_JSON = `{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "zip": "10001"
  },
  "hobbies": ["reading", "coding", "hiking"],
  "active": true
}`

export default function JsonFormatter() {
  const [input, setInput] = useState(SAMPLE_JSON)
  const [viewMode, setViewMode] = useState<ViewMode>('formatted')
  const [indentSize, setIndentSize] = useState<IndentSize>(2)
  const [sortKeys, setSortKeys] = useState(false)

  const validation = useMemo((): ValidationResult => {
    if (!input.trim()) {
      return { isValid: false, error: 'Input is empty' }
    }

    try {
      JSON.parse(input)
      return { isValid: true }
    } catch (error) {
      if (error instanceof SyntaxError) {
        const match = error.message.match(/position (\d+)/)
        const position = match ? parseInt(match[1]) : 0
        
        const lines = input.substring(0, position).split('\n')
        const line = lines.length
        const column = lines[lines.length - 1].length + 1
        
        return {
          isValid: false,
          error: error.message,
          errorLine: line,
          errorColumn: column
        }
      }
      return {
        isValid: false,
        error: 'Invalid JSON'
      }
    }
  }, [input])

  const sortObjectKeys = useCallback((obj: any): any => {
    if (Array.isArray(obj)) {
      return obj.map(sortObjectKeys)
    } else if (obj !== null && typeof obj === 'object') {
      return Object.keys(obj)
        .sort()
        .reduce((result: any, key) => {
          result[key] = sortObjectKeys(obj[key])
          return result
        }, {})
    }
    return obj
  }, [])

  const formattedOutput = useMemo(() => {
    if (!validation.isValid) return ''

    try {
      const parsed = JSON.parse(input)
      const data = sortKeys ? sortObjectKeys(parsed) : parsed

      if (viewMode === 'minified') {
        return JSON.stringify(data)
      } else {
        return JSON.stringify(data, null, indentSize)
      }
    } catch {
      return ''
    }
  }, [input, viewMode, indentSize, sortKeys, validation.isValid, sortObjectKeys])

  const stats = useMemo(() => {
    if (!validation.isValid) return null

    try {
      const parsed = JSON.parse(input)
      const lines = formattedOutput.split('\n').length
      
      const countItems = (obj: any): number => {
        if (Array.isArray(obj)) {
          return obj.length
        } else if (obj !== null && typeof obj === 'object') {
          return Object.keys(obj).length
        }
        return 0
      }

      return {
        lines,
        size: new Blob([formattedOutput]).size,
        items: countItems(parsed)
      }
    } catch {
      return null
    }
  }, [validation.isValid, input, formattedOutput])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedOutput)
      toast.success('JSON copied to clipboard!')
    } catch {
      toast.error('Failed to copy to clipboard')
    }
  }

  const handleDownload = () => {
    const blob = new Blob([formattedOutput], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'formatted.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleClear = () => {
    setInput('')
  }

  const handleFormat = () => {
    if (validation.isValid) {
      setInput(formattedOutput)
      toast.success('JSON formatted!')
    }
  }

  const handleMinify = () => {
    if (validation.isValid) {
      try {
        const parsed = JSON.parse(input)
        const minified = JSON.stringify(parsed)
        setInput(minified)
        toast.success('JSON minified!')
      } catch {
        toast.error('Failed to minify JSON')
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex gap-2">
              <Button onClick={handleFormat} disabled={!validation.isValid} size="sm">
                Format
              </Button>
              <Button onClick={handleMinify} disabled={!validation.isValid} size="sm" variant="outline">
                Minify
              </Button>
            </div>

            <div className="flex-1 min-w-[150px]">
              <Select value={indentSize.toString()} onValueChange={(v) => setIndentSize(Number(v) as IndentSize)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 Spaces</SelectItem>
                  <SelectItem value="4">4 Spaces</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={sortKeys}
                onChange={(e) => setSortKeys(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm">Sort Keys</span>
            </label>

            <div className="flex gap-2 ml-auto">
              <Button variant="outline" size="sm" onClick={handleCopy} disabled={!validation.isValid}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload} disabled={!validation.isValid}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" size="sm" onClick={handleClear} disabled={!input}>
                <Trash2 className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Validation Status */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            {validation.isValid ? (
              <>
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-green-600">Valid JSON</span>
                {stats && (
                  <span className="text-sm text-muted-foreground ml-2">
                    ({stats.lines} lines, {stats.items} {stats.items === 1 ? 'property' : 'properties'}, {stats.size} bytes)
                  </span>
                )}
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 text-red-600" />
                <span className="text-sm font-medium text-red-600">
                  {validation.error}
                  {validation.errorLine && ` (Line ${validation.errorLine}, Column ${validation.errorColumn})`}
                </span>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Editor */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold mb-2">Input JSON</h3>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your JSON here..."
              className="h-[500px] font-mono text-sm resize-none"
              aria-label="JSON input"
              aria-invalid={!validation.isValid}
              aria-describedby="json-validation-status"
              spellCheck={false}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold">Output</h3>
              <Select value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="formatted">Formatted</SelectItem>
                  <SelectItem value="minified">Minified</SelectItem>
                  <SelectItem value="tree">Tree View</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {viewMode === 'tree' ? (
              <div className="h-[500px] p-4 border rounded-lg bg-white dark:bg-gray-900 overflow-auto">
                {validation.isValid ? (
                  <JsonTree data={JSON.parse(input)} />
                ) : (
                  <p className="text-muted-foreground text-sm">Fix JSON errors to view tree</p>
                )}
              </div>
            ) : (
              <Textarea
                value={formattedOutput}
                readOnly
                className="h-[500px] font-mono text-sm resize-none"
                aria-label="JSON output"
                spellCheck={false}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

interface JsonTreeProps {
  data: any
  level?: number
}

function JsonTree({ data, level = 0 }: JsonTreeProps) {
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set())

  const toggleCollapse = (key: string) => {
    setCollapsed(prev => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  if (data === null) {
    return <span className="text-purple-600 dark:text-purple-400">null</span>
  }

  if (typeof data !== 'object') {
    return (
      <span className={getTypeColor(typeof data)}>
        {JSON.stringify(data)}
      </span>
    )
  }

  const isArray = Array.isArray(data)
  const entries = isArray 
    ? data.map((v, i) => [i, v]) 
    : Object.entries(data)

  return (
    <div className={level > 0 ? 'ml-4' : ''}>
      {entries.map(([key, value]) => {
        const uniqueKey = `${level}-${key}`
        const isCollapsed = collapsed.has(uniqueKey)
        const hasChildren = typeof value === 'object' && value !== null
        
        return (
          <div key={uniqueKey} className="my-1">
            <div className="flex items-start gap-2">
              {hasChildren && (
                <button
                  onClick={() => toggleCollapse(uniqueKey)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 mt-0.5"
                  aria-label={isCollapsed ? 'Expand' : 'Collapse'}
                >
                  {isCollapsed ? '▶' : '▼'}
                </button>
              )}
              {!hasChildren && <span className="w-4" />}
              
              <span className="text-blue-600 dark:text-blue-400 font-semibold">
                {isArray ? `[${key}]` : `"${key}"`}:
              </span>
              
              {!hasChildren && (
                <JsonTree data={value} level={level + 1} />
              )}
              
              {hasChildren && isCollapsed && (
                <span className="text-gray-500 dark:text-gray-400">
                  {isArray ? '[...]' : '{...}'}
                </span>
              )}
            </div>
            
            {hasChildren && !isCollapsed && (
              <div className="ml-2">
                <JsonTree data={value} level={level + 1} />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function getTypeColor(type: string): string {
  switch (type) {
    case 'string': return 'text-green-600 dark:text-green-400'
    case 'number': return 'text-purple-600 dark:text-purple-400'
    case 'boolean': return 'text-orange-600 dark:text-orange-400'
    default: return 'text-gray-600 dark:text-gray-400'
  }
}

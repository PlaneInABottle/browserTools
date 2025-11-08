'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Copy, Download, RefreshCw, Trash2, CheckCircle, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

type UUIDFormat = 'standard' | 'no-hyphens' | 'uppercase' | 'lowercase'
type ExportFormat = 'text' | 'json' | 'csv'

interface GeneratedUUID {
  id: string
  timestamp: Date
  format: UUIDFormat
}

// RFC 4122 v4 UUID generation using crypto.getRandomValues()
function generateUUID(): string {
  const array = new Uint8Array(16)
  crypto.getRandomValues(array)

  // Set version (4) and variant bits according to RFC 4122
  array[6] = (array[6] & 0x0f) | 0x40  // Version 4
  array[8] = (array[8] & 0x3f) | 0x80  // Variant 10

  // Convert to hex string
  const hex = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')

  // Insert hyphens according to RFC 4122 format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`
}

function formatUUID(uuid: string, format: UUIDFormat): string {
  const cleanUUID = uuid.replace(/-/g, '')

  switch (format) {
    case 'standard':
      return `${cleanUUID.slice(0, 8)}-${cleanUUID.slice(8, 12)}-${cleanUUID.slice(12, 16)}-${cleanUUID.slice(16, 20)}-${cleanUUID.slice(20, 32)}`
    case 'no-hyphens':
      return cleanUUID
    case 'uppercase':
      return `${cleanUUID.slice(0, 8)}-${cleanUUID.slice(8, 12)}-${cleanUUID.slice(12, 16)}-${cleanUUID.slice(16, 20)}-${cleanUUID.slice(20, 32)}`.toUpperCase()
    case 'lowercase':
      return `${cleanUUID.slice(0, 8)}-${cleanUUID.slice(8, 12)}-${cleanUUID.slice(12, 16)}-${cleanUUID.slice(16, 20)}-${cleanUUID.slice(20, 32)}`.toLowerCase()
    default:
      return uuid
  }
}

function validateUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return uuidRegex.test(uuid)
}

function exportUUIDs(uuids: GeneratedUUID[], format: ExportFormat): string {
  switch (format) {
    case 'json':
      return JSON.stringify(uuids.map(u => u.id), null, 2)
    case 'csv':
      return 'UUID,Timestamp,Format\n' + uuids.map(u =>
        `"${u.id}","${u.timestamp.toISOString()}","${u.format}"`
      ).join('\n')
    case 'text':
    default:
      return uuids.map(u => u.id).join('\n')
  }
}

export default function UUIDGenerator() {
  const [uuids, setUuids] = useState<GeneratedUUID[]>([])
  const [batchSize, setBatchSize] = useState([1])
  const [format, setFormat] = useState<UUIDFormat>('standard')
  const [autoCopy, setAutoCopy] = useState(false)
  const [validationInput, setValidationInput] = useState('')
  const [isValidating, setIsValidating] = useState(false)
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean | null
    message: string
  }>({ isValid: null, message: '' })

  const generateSingleUUID = useCallback(() => {
    const newUUID = generateUUID()
    const formattedUUID = formatUUID(newUUID, format)
    const uuidEntry: GeneratedUUID = {
      id: formattedUUID,
      timestamp: new Date(),
      format
    }

    setUuids(prev => [uuidEntry, ...prev])

    if (autoCopy) {
      navigator.clipboard.writeText(formattedUUID).then(() => {
        toast.success('UUID copied to clipboard')
      }).catch(() => {
        toast.error('Failed to copy to clipboard')
      })
    } else {
      toast.success('UUID generated')
    }
  }, [format, autoCopy])

  const generateBatchUUIDs = useCallback(() => {
    const count = batchSize[0]
    const newUUIDs: GeneratedUUID[] = []

    for (let i = 0; i < count; i++) {
      const newUUID = generateUUID()
      const formattedUUID = formatUUID(newUUID, format)
      newUUIDs.push({
        id: formattedUUID,
        timestamp: new Date(),
        format
      })
    }

    setUuids(prev => [...newUUIDs, ...prev])
    toast.success(`${count} UUIDs generated`)
  }, [batchSize, format])

  const copyUUID = useCallback(async (uuid: string) => {
    try {
      await navigator.clipboard.writeText(uuid)
      toast.success('UUID copied to clipboard')
    } catch (error) {
      toast.error('Failed to copy to clipboard')
    }
  }, [])

  const copyAllUUIDs = useCallback(async () => {
    if (uuids.length === 0) {
      toast.error('No UUIDs to copy')
      return
    }

    const allUUIDs = uuids.map(u => u.id).join('\n')
    try {
      await navigator.clipboard.writeText(allUUIDs)
      toast.success(`${uuids.length} UUIDs copied to clipboard`)
    } catch (error) {
      toast.error('Failed to copy to clipboard')
    }
  }, [uuids])

  const exportUUIDsFile = useCallback((exportFormat: ExportFormat) => {
    if (uuids.length === 0) {
      toast.error('No UUIDs to export')
      return
    }

    const content = exportUUIDs(uuids, exportFormat)
    const blob = new Blob([content], {
      type: exportFormat === 'json' ? 'application/json' :
            exportFormat === 'csv' ? 'text/csv' : 'text/plain'
    })

    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `uuids-${new Date().toISOString().slice(0, 10)}.${exportFormat}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast.success(`UUIDs exported as ${exportFormat.toUpperCase()}`)
  }, [uuids])

  const clearHistory = useCallback(() => {
    setUuids([])
    toast.success('History cleared')
  }, [])

  const validateInputUUID = useCallback(() => {
    if (!validationInput.trim()) {
      setValidationResult({ isValid: null, message: 'Please enter a UUID to validate' })
      toast.error('Please enter a UUID to validate')
      return
    }

    setIsValidating(true)
    const isValid = validateUUID(validationInput.trim())
    setIsValidating(false)

    if (isValid) {
      setValidationResult({ isValid: true, message: 'Valid RFC 4122 UUID format' })
      toast.success('Valid UUID format')
    } else {
      setValidationResult({ isValid: false, message: 'Invalid UUID format - must be xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' })
      toast.error('Invalid UUID format')
    }
  }, [validationInput])

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Generation Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>🔄</span>
            <span>Generate UUIDs</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="format-select">Format</Label>
              <Select value={format} onValueChange={(value: UUIDFormat) => setFormat(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard (with hyphens)</SelectItem>
                  <SelectItem value="no-hyphens">No Hyphens</SelectItem>
                  <SelectItem value="uppercase">Uppercase</SelectItem>
                  <SelectItem value="lowercase">Lowercase</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Batch Size: {batchSize[0]}</Label>
              <Slider
                value={batchSize}
                onValueChange={setBatchSize}
                min={1}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="auto-copy"
              checked={autoCopy}
              onCheckedChange={setAutoCopy}
            />
            <Label htmlFor="auto-copy">Auto-copy generated UUIDs</Label>
          </div>

          <div className="flex gap-2">
            <Button onClick={generateSingleUUID} className="flex-1">
              <RefreshCw className="w-4 h-4 mr-2" />
              Generate Single UUID
            </Button>
            <Button onClick={generateBatchUUIDs} variant="outline" className="flex-1">
              <RefreshCw className="w-4 h-4 mr-2" />
              Generate {batchSize[0]} UUIDs
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {uuids.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <span>📋</span>
                <span>Generated UUIDs ({uuids.length})</span>
              </CardTitle>
              <div className="flex gap-2">
                <Button onClick={copyAllUUIDs} variant="outline" size="sm">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy All
                </Button>
                <Button onClick={() => exportUUIDsFile('text')} variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export TXT
                </Button>
                <Button onClick={() => exportUUIDsFile('json')} variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export JSON
                </Button>
                <Button onClick={() => exportUUIDsFile('csv')} variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
                <Button onClick={clearHistory} variant="outline" size="sm">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {uuids.map((uuid, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex-1 min-w-0">
                    <code className="text-sm font-mono break-all">{uuid.id}</code>
                    <div className="text-xs text-muted-foreground mt-1">
                      {uuid.timestamp.toLocaleString()} • {uuid.format}
                    </div>
                  </div>
                  <Button
                    onClick={() => copyUUID(uuid.id)}
                    variant="ghost"
                    size="sm"
                    className="ml-2 flex-shrink-0"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* UUID Validator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>✅</span>
            <span>UUID Validator</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="validation-input">Enter UUID to validate</Label>
            <div className="flex gap-2">
              <Input
                id="validation-input"
                value={validationInput}
                onChange={(e) => {
                setValidationInput(e.target.value)
                setValidationResult({ isValid: null, message: '' })
              }}
                placeholder="e.g., 550e8400-e29b-41d4-a716-446655440000"
                className="font-mono"
              />
              <Button onClick={validateInputUUID} disabled={isValidating}>
                {isValidating ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <CheckCircle className="w-4 h-4" />
                )}
                Validate
              </Button>
            </div>
          </div>

          {validationResult.isValid !== null && (
            <div className={`p-3 rounded-lg border ${
              validationResult.isValid
                ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
                : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
            }`}>
              <div className="flex items-center gap-2">
                {validationResult.isValid ? (
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                )}
                <span className={`font-medium ${
                  validationResult.isValid
                    ? 'text-green-800 dark:text-green-200'
                    : 'text-red-800 dark:text-red-200'
                }`}>
                  {validationResult.message}
                </span>
              </div>
            </div>
          )}

          <div className="text-sm text-muted-foreground">
            <p><strong>RFC 4122 UUID Format:</strong> xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx</p>
            <p>Where x is a hexadecimal digit (0-9, a-f, A-F)</p>
          </div>
        </CardContent>
      </Card>

      {/* Info Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>ℹ️</span>
            <span>About UUIDs</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">What is a UUID?</h4>
              <p className="text-muted-foreground">
                A Universally Unique Identifier (UUID) is a 128-bit number used to uniquely identify information in computer systems.
                UUIDs are designed to be unique across space and time.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">RFC 4122 Version 4</h4>
              <p className="text-muted-foreground">
                Version 4 UUIDs are randomly generated using cryptographically secure random number generation.
                They provide the highest entropy and are suitable for most applications.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Common Uses</h4>
              <ul className="text-muted-foreground space-y-1">
                <li>• Database primary keys</li>
                <li>• API resource identifiers</li>
                <li>• Session tokens</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Security</h4>
              <ul className="text-muted-foreground space-y-1">
                <li>• Cryptographically secure</li>
                <li>• No predictable patterns</li>
                <li>• Collision resistant</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Standards</h4>
              <ul className="text-muted-foreground space-y-1">
                <li>• RFC 4122 compliant</li>
                <li>• 36 character format</li>
                <li>• 5 groups with hyphens</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
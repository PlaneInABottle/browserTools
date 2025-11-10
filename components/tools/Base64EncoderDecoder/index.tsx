'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Copy, Upload, Trash2, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'
import { Alert, AlertDescription } from '@/components/ui/alert'

type Mode = 'encode' | 'decode'

export default function Base64EncoderDecoder() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<Mode>('encode')
  const [error, setError] = useState<string | null>(null)

  // Encode text to Base64
  const encodeToBase64 = useCallback((text: string): string => {
    try {
      return btoa(unescape(encodeURIComponent(text)))
    } catch {
      throw new Error('Failed to encode text to Base64')
    }
  }, [])

  // Decode Base64 to text
  const decodeFromBase64 = useCallback((base64: string): string => {
    try {
      return decodeURIComponent(escape(atob(base64)))
    } catch {
      throw new Error('Invalid Base64 string or decoding failed')
    }
  }, [])

  // Handle text input change
  const handleInputChange = useCallback((value: string) => {
    setInput(value)
    setError(null)

    if (!value.trim()) {
      setOutput('')
      return
    }

    try {
      if (mode === 'encode') {
        setOutput(encodeToBase64(value))
      } else {
        setOutput(decodeFromBase64(value))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setOutput('')
    }
  }, [mode, encodeToBase64, decodeFromBase64])

  // Handle mode change
  const handleModeChange = useCallback((newMode: Mode) => {
    setMode(newMode)
    setError(null)
    if (input.trim()) {
      try {
        if (newMode === 'encode') {
          setOutput(encodeToBase64(input))
        } else {
          setOutput(decodeFromBase64(input))
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        setOutput('')
      }
    }
  }, [input, encodeToBase64, decodeFromBase64])

  // Handle file upload
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result
      if (typeof result === 'string') {
        // For text files, set as input
        if (file.type.startsWith('text/')) {
          setInput(result)
          handleInputChange(result)
        } else {
          // For binary files, encode to Base64
          const base64 = result.split(',')[1] // Remove data URL prefix
          setInput(base64)
          if (mode === 'decode') {
            try {
              setOutput(decodeFromBase64(base64))
            } catch {
              setError('This appears to be binary data. Use decode mode to convert to text.')
            }
          } else {
            setOutput(base64)
          }
        }
      }
    }
    reader.readAsDataURL(file)
  }, [mode, handleInputChange, decodeFromBase64])

  // Copy to clipboard
  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success('Copied to clipboard!')
    } catch {
      toast.error('Failed to copy')
    }
  }, [])

  // Clear all
  const clearAll = useCallback(() => {
    setInput('')
    setOutput('')
    setError(null)
  }, [])

  return (
    <div className="space-y-6">
      {/* Mode Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Base64 Encoder/Decoder</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={mode} onValueChange={(value) => handleModeChange(value as Mode)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="encode">Encode to Base64</TabsTrigger>
              <TabsTrigger value="decode">Decode from Base64</TabsTrigger>
            </TabsList>

            <TabsContent value="encode" className="space-y-4">
              <div>
                <Label htmlFor="encode-input">Text to Encode</Label>
                <Textarea
                  id="encode-input"
                  placeholder="Enter text to encode to Base64..."
                  value={input}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className="min-h-[120px] font-mono text-sm"
                />
              </div>
            </TabsContent>

            <TabsContent value="decode" className="space-y-4">
              <div>
                <Label htmlFor="decode-input">Base64 to Decode</Label>
                <Textarea
                  id="decode-input"
                  placeholder="Enter Base64 string to decode..."
                  value={input}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className="min-h-[120px] font-mono text-sm"
                />
              </div>
            </TabsContent>
          </Tabs>

          {/* File Upload */}
          <div className="flex items-center gap-2 mt-4">
            <input
              type="file"
              id="file-upload"
              onChange={handleFileUpload}
              className="hidden"
              accept="*/*"
            />
            <Label htmlFor="file-upload">
              <Button variant="outline" size="sm" asChild>
                <span className="cursor-pointer">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload File
                </span>
              </Button>
            </Label>
            <Button onClick={clearAll} variant="outline" size="sm">
              <Trash2 className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Output */}
      {output && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                {mode === 'encode' ? 'Base64 Output' : 'Decoded Text'}
              </CardTitle>
              <Button
                onClick={() => copyToClipboard(output)}
                variant="outline"
                size="sm"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={output}
              readOnly
              className="min-h-[120px] font-mono text-sm bg-muted"
            />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
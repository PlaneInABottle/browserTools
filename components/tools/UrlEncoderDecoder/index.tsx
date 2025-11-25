'use client'

import { useState, useCallback, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Copy, Trash2, AlertCircle, CheckCircle, XCircle, Plus } from 'lucide-react'
import { toast } from 'sonner'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  encodeUrlComponent,
  decodeUrlComponent,
  parseQueryParams,
  parseAndValidateUrl,
  buildUrl,
  type QueryParam,
  type UrlParts
} from '@/lib/url/url-utils'

type Mode = 'encode' | 'decode'

export default function UrlEncoderDecoder() {
  // Main encoder/decoder state
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<Mode>('encode')
  const [error, setError] = useState<string | null>(null)

  // Query parser state
  const [parserUrl, setParserUrl] = useState('')
  const parsedParams = useMemo(() => parseQueryParams(parserUrl), [parserUrl])

  // URL validator state
  const [validatorUrl, setValidatorUrl] = useState('')
  const validationResult = useMemo(() => parseAndValidateUrl(validatorUrl), [validatorUrl])

  // URL builder state
  const [protocol, setProtocol] = useState('https')
  const [domain, setDomain] = useState('')
  const [path, setPath] = useState('')
  const [queryParams, setQueryParams] = useState<{ key: string; value: string }[]>([])
  const [hash, setHash] = useState('')
  const builtUrl = useMemo(
    () => buildUrl({ protocol, domain, path, queryParams, hash }),
    [protocol, domain, path, queryParams, hash]
  )

  // Collapsible sections state
  const [parserOpen, setParserOpen] = useState(false)
  const [validatorOpen, setValidatorOpen] = useState(false)
  const [builderOpen, setBuilderOpen] = useState(false)

  // Handle main input change
  const handleInputChange = useCallback((value: string) => {
    setInput(value)
    setError(null)

    if (!value.trim()) {
      setOutput('')
      return
    }

    try {
      if (mode === 'encode') {
        setOutput(encodeUrlComponent(value))
      } else {
        setOutput(decodeUrlComponent(value))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setOutput('')
    }
  }, [mode])

  // Handle mode change
  const handleModeChange = useCallback((newMode: Mode) => {
    setMode(newMode)
    setError(null)
    if (input.trim()) {
      try {
        if (newMode === 'encode') {
          setOutput(encodeUrlComponent(input))
        } else {
          setOutput(decodeUrlComponent(input))
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        setOutput('')
      }
    }
  }, [input])

  // Copy to clipboard
  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success('Copied to clipboard!')
    } catch {
      toast.error('Failed to copy to clipboard')
    }
  }

  // Clear input/output
  const handleClear = () => {
    setInput('')
    setOutput('')
    setError(null)
  }

  // URL Builder functions
  const addQueryParam = () => {
    setQueryParams([...queryParams, { key: '', value: '' }])
  }

  const updateQueryParam = (index: number, field: 'key' | 'value', value: string) => {
    const updated = [...queryParams]
    updated[index][field] = value
    setQueryParams(updated)
  }

  const removeQueryParam = (index: number) => {
    setQueryParams(queryParams.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      {/* Main Encoder/Decoder */}
      <Card>
        <CardHeader>
          <CardTitle>URL Encoder/Decoder</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={mode} onValueChange={(value) => handleModeChange(value as Mode)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="encode">Encode URL</TabsTrigger>
              <TabsTrigger value="decode">Decode URL</TabsTrigger>
            </TabsList>

            <TabsContent value="encode" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="encode-input">Text to Encode</Label>
                <Textarea
                  id="encode-input"
                  placeholder="Enter text to encode (e.g., hello world, special chars: #?&=)"
                  value={input}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className="min-h-[120px] font-mono text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="encode-output">Encoded URL</Label>
                <Textarea
                  id="encode-output"
                  placeholder="Encoded result will appear here..."
                  value={output}
                  readOnly
                  className="min-h-[120px] font-mono text-sm bg-muted"
                />
              </div>
            </TabsContent>

            <TabsContent value="decode" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="decode-input">Encoded URL to Decode</Label>
                <Textarea
                  id="decode-input"
                  placeholder="Enter URL-encoded text (e.g., hello%20world)"
                  value={input}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className="min-h-[120px] font-mono text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="decode-output">Decoded Text</Label>
                <Textarea
                  id="decode-output"
                  placeholder="Decoded result will appear here..."
                  value={output}
                  readOnly
                  className="min-h-[120px] font-mono text-sm bg-muted"
                />
              </div>
            </TabsContent>
          </Tabs>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex items-center gap-2 mt-4">
            <Button variant="outline" size="sm" onClick={() => handleCopy(output)} disabled={!output}>
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
            <Button variant="outline" size="sm" onClick={handleClear}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Query Parameter Parser */}
      <Card>
        <CardHeader className="cursor-pointer" onClick={() => setParserOpen(!parserOpen)}>
          <CardTitle className="flex items-center justify-between">
            <span>Query Parameter Parser</span>
            <span className="text-sm text-muted-foreground">{parserOpen ? '▼' : '▶'}</span>
          </CardTitle>
        </CardHeader>
        {parserOpen && (
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="parser-url">Enter URL with Query Parameters</Label>
              <Input
                id="parser-url"
                placeholder="https://example.com?key1=value1&key2=value2"
                value={parserUrl}
                onChange={(e) => setParserUrl(e.target.value)}
                className="font-mono text-sm"
              />
            </div>

            {parsedParams.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 text-sm font-semibold">Key</th>
                      <th className="text-left p-2 text-sm font-semibold">Value (Decoded)</th>
                      <th className="text-left p-2 text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parsedParams.map((param, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="p-2 font-mono text-sm">{param.key}</td>
                        <td className="p-2 font-mono text-sm">{param.decodedValue}</td>
                        <td className="p-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCopy(`${param.key}=${param.decodedValue}`)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => handleCopy(JSON.stringify(Object.fromEntries(parsedParams.map(p => [p.key, p.decodedValue])), null, 2))}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy All as JSON
                </Button>
              </div>
            ) : parserUrl.trim() ? (
              <p className="text-sm text-muted-foreground">No query parameters found in URL</p>
            ) : null}
          </CardContent>
        )}
      </Card>

      {/* URL Validator */}
      <Card>
        <CardHeader className="cursor-pointer" onClick={() => setValidatorOpen(!validatorOpen)}>
          <CardTitle className="flex items-center justify-between">
            <span>URL Validator</span>
            <span className="text-sm text-muted-foreground">{validatorOpen ? '▼' : '▶'}</span>
          </CardTitle>
        </CardHeader>
        {validatorOpen && (
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="validator-url">Enter URL to Validate</Label>
              <Input
                id="validator-url"
                placeholder="https://example.com:8080/path?query=value#hash"
                value={validatorUrl}
                onChange={(e) => setValidatorUrl(e.target.value)}
                className="font-mono text-sm"
              />
            </div>

            {validatorUrl.trim() && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  {validationResult.isValid ? (
                    <>
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">Valid URL</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                      <span className="text-sm font-medium text-red-600 dark:text-red-400">Invalid URL</span>
                    </>
                  )}
                </div>

                {validationResult.isValid ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-muted-foreground">Protocol</Label>
                      <p className="font-mono text-sm">{validationResult.protocol || '(none)'}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Hostname</Label>
                      <p className="font-mono text-sm">{validationResult.hostname || '(none)'}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Port</Label>
                      <p className="font-mono text-sm">{validationResult.port || '(default)'}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Pathname</Label>
                      <p className="font-mono text-sm">{validationResult.pathname || '/'}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Query String</Label>
                      <p className="font-mono text-sm">{validationResult.search || '(none)'}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Hash</Label>
                      <p className="font-mono text-sm">{validationResult.hash || '(none)'}</p>
                    </div>
                  </div>
                ) : (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{validationResult.error}</AlertDescription>
                  </Alert>
                )}
              </div>
            )}
          </CardContent>
        )}
      </Card>

      {/* URL Builder */}
      <Card>
        <CardHeader className="cursor-pointer" onClick={() => setBuilderOpen(!builderOpen)}>
          <CardTitle className="flex items-center justify-between">
            <span>URL Builder</span>
            <span className="text-sm text-muted-foreground">{builderOpen ? '▼' : '▶'}</span>
          </CardTitle>
        </CardHeader>
        {builderOpen && (
          <CardContent className="space-y-4">
            {builtUrl && (
              <div className="space-y-2">
                <Label htmlFor="built-url">Generated URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="built-url"
                    value={builtUrl}
                    readOnly
                    className="font-mono text-sm bg-muted"
                  />
                  <Button variant="outline" size="sm" onClick={() => handleCopy(builtUrl)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="protocol">Protocol</Label>
                <Select value={protocol} onValueChange={setProtocol}>
                  <SelectTrigger id="protocol">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="https">https</SelectItem>
                    <SelectItem value="http">http</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="domain">Domain</Label>
                <Input
                  id="domain"
                  placeholder="example.com"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="font-mono text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="path">Path</Label>
              <Input
                id="path"
                placeholder="/path/to/page"
                value={path}
                onChange={(e) => setPath(e.target.value)}
                className="font-mono text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label>Query Parameters</Label>
              {queryParams.map((param, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input
                    placeholder="key"
                    value={param.key}
                    onChange={(e) => updateQueryParam(idx, 'key', e.target.value)}
                    className="font-mono text-sm"
                  />
                  <Input
                    placeholder="value"
                    value={param.value}
                    onChange={(e) => updateQueryParam(idx, 'value', e.target.value)}
                    className="font-mono text-sm"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => removeQueryParam(idx)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button size="sm" variant="outline" onClick={addQueryParam}>
                <Plus className="h-4 w-4 mr-2" />
                Add Parameter
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hash">Hash (Fragment)</Label>
              <Input
                id="hash"
                placeholder="section"
                value={hash}
                onChange={(e) => setHash(e.target.value)}
                className="font-mono text-sm"
              />
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}

'use client'

import { useState, useMemo, useCallback, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Download, Copy, RefreshCw, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'
import qrcodegen from 'nayuki-qr-code-generator'

type ErrorCorrectionLevel = 'low' | 'medium' | 'quartile' | 'high'

const ERROR_CORRECTION_MAP = {
  low: qrcodegen.QrCode.Ecc.LOW,
  medium: qrcodegen.QrCode.Ecc.MEDIUM,
  quartile: qrcodegen.QrCode.Ecc.QUARTILE,
  high: qrcodegen.QrCode.Ecc.HIGH,
} as const

function generateQRCode(text: string, size: number, errorCorrection: ErrorCorrectionLevel): string | null {
  try {
    if (!text.trim()) {
      return null
    }

    const qr = qrcodegen.QrCode.encodeText(text, ERROR_CORRECTION_MAP[errorCorrection])

    // Generate SVG manually by iterating through modules
    const border = 4
    const moduleSize = size / (qr.size + border * 2)
    const svgSize = size

    let svg = `<svg width="${svgSize}" height="${svgSize}" viewBox="0 0 ${svgSize} ${svgSize}" xmlns="http://www.w3.org/2000/svg">`
    svg += '<rect width="100%" height="100%" fill="white"/>'

    for (let y = 0; y < qr.size; y++) {
      for (let x = 0; x < qr.size; x++) {
        if (qr.getModule(x, y)) {
          const px = (x + border) * moduleSize
          const py = (y + border) * moduleSize
          svg += `<rect x="${px}" y="${py}" width="${moduleSize}" height="${moduleSize}" fill="black"/>`
        }
      }
    }

    svg += '</svg>'
    return svg
  } catch (error) {
    console.error('QR Code generation failed:', error)
    return null
  }
}

function downloadQRCode(svgString: string, format: 'png' | 'jpg' | 'svg', filename: string) {
  if (format === 'svg') {
    // Direct SVG download
    const blob = new Blob([svgString], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${filename}.svg`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } else {
    // Convert SVG to PNG/JPG using canvas
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new Image()
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)

      canvas.toBlob((blob) => {
        if (!blob) return
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${filename}.${format}`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }, `image/${format}`, 0.9)
    }
    img.src = `data:image/svg+xml;base64,${btoa(svgString)}`
  }
}

export default function QRCodeGenerator() {
  const [text, setText] = useState('https://toolympics.dev')
  const [size, setSize] = useState([300])
  const [errorCorrection, setErrorCorrection] = useState<ErrorCorrectionLevel>('medium')
  const svgRef = useRef<HTMLDivElement>(null)

  const qrCodeSvg = useMemo(() => {
    return generateQRCode(text, size[0], errorCorrection)
  }, [text, size, errorCorrection])

  const handleDownload = useCallback((format: 'png' | 'jpg' | 'svg') => {
    if (!qrCodeSvg) {
      toast.error('No QR code to download')
      return
    }

    const timestamp = new Date().toISOString().slice(0, 10)
    const filename = `qr-code-${timestamp}`
    downloadQRCode(qrCodeSvg, format, filename)
    toast.success(`QR code downloaded as ${format.toUpperCase()}`)
  }, [qrCodeSvg])

  const handleCopy = useCallback(async () => {
    if (!qrCodeSvg) {
      toast.error('No QR code to copy')
      return
    }

    try {
      await navigator.clipboard.writeText(qrCodeSvg)
      toast.success('QR code SVG copied to clipboard')
    } catch (error) {
      toast.error('Failed to copy to clipboard')
    }
  }, [qrCodeSvg])

  const handleRegenerate = useCallback(() => {
    // Force re-render by updating a dummy state
    setText(prev => prev)
    toast.success('QR code regenerated')
  }, [])

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>📝</span>
            <span>Input Text</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="text-input">Text or URL to encode</Label>
            <Input
              id="text-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text or URL..."
              className="font-mono"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>QR Code Size: {size[0]}px</Label>
              <Slider
                value={size}
                onValueChange={setSize}
                min={200}
                max={1000}
                step={50}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="error-correction">Error Correction Level</Label>
              <Select value={errorCorrection} onValueChange={(value: ErrorCorrectionLevel) => setErrorCorrection(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low (7%)</SelectItem>
                  <SelectItem value="medium">Medium (15%)</SelectItem>
                  <SelectItem value="quartile">Quartile (25%)</SelectItem>
                  <SelectItem value="high">High (30%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>👁️</span>
            <span>QR Code Preview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            <div
              ref={svgRef}
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 bg-white dark:bg-gray-800"
              style={{ minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {qrCodeSvg ? (
                <div
                  dangerouslySetInnerHTML={{ __html: qrCodeSvg }}
                  className="qr-code-svg"
                />
              ) : (
                <div className="text-center text-muted-foreground">
                  <AlertCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Enter text above to generate QR code</p>
                </div>
              )}
            </div>

            {qrCodeSvg && (
              <div className="flex flex-wrap gap-2 justify-center">
                <Button onClick={() => handleDownload('png')} variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  PNG
                </Button>
                <Button onClick={() => handleDownload('jpg')} variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  JPG
                </Button>
                <Button onClick={() => handleDownload('svg')} variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  SVG
                </Button>
                <Button onClick={handleCopy} variant="outline" size="sm">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy SVG
                </Button>
                <Button onClick={handleRegenerate} variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Regenerate
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Info Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>ℹ️</span>
            <span>About QR Codes</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Error Correction Levels:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li><strong>Low (7%):</strong> Basic error correction</li>
                <li><strong>Medium (15%):</strong> Good balance of size and reliability</li>
                <li><strong>Quartile (25%):</strong> Higher error correction</li>
                <li><strong>High (30%):</strong> Maximum error correction</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Tips:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>Use shorter URLs for smaller QR codes</li>
                <li>Higher error correction = larger QR codes</li>
                <li>Test your QR codes before printing</li>
                <li>Ensure good contrast when printing</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
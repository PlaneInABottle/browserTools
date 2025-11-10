'use client'

import { useState, useMemo, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Copy, Palette, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'
import {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  isValidHex,
  isValidRgb,
  isValidHsl,
  formatRgb,
  formatHsl,
  parseRgbString,
  parseHslString,
  PRESET_COLORS,
} from '@/lib/color'

interface ColorFormats {
  hex: string
  rgb: string
  rgba: string
  hsl: string
  hsla: string
}

export default function ColorConverter() {
  const [currentColor, setCurrentColor] = useState('#3B82F6')
  const [recentColors, setRecentColors] = useState<string[]>([])

  // Compute all color formats
  const colorFormats = useMemo<ColorFormats | null>(() => {
    if (!isValidHex(currentColor)) {
      return null
    }

    const rgb = hexToRgb(currentColor)
    if (!rgb) {
      return null
    }

    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)

    return {
      hex: currentColor.toUpperCase(),
      rgb: formatRgb(rgb.r, rgb.g, rgb.b),
      rgba: formatRgb(rgb.r, rgb.g, rgb.b, 1),
      hsl: formatHsl(hsl.h, hsl.s, hsl.l),
      hsla: formatHsl(hsl.h, hsl.s, hsl.l, 1),
    }
  }, [currentColor])

  // Handle color change from picker
  const handleColorPick = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value
    setCurrentColor(newColor)
    addToRecentColors(newColor)
  }, [])

  // Handle HEX input change
  const handleHexChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    if (!value.startsWith('#')) {
      value = '#' + value
    }
    setCurrentColor(value)
    if (isValidHex(value)) {
      addToRecentColors(value)
    }
  }, [])

  // Handle RGB input change
  const handleRgbChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseRgbString(e.target.value)
    if (parsed && isValidRgb(parsed.r, parsed.g, parsed.b)) {
      const hex = rgbToHex(parsed.r, parsed.g, parsed.b)
      setCurrentColor(hex)
      addToRecentColors(hex)
    }
  }, [])

  // Handle HSL input change
  const handleHslChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseHslString(e.target.value)
    if (parsed && isValidHsl(parsed.h, parsed.s, parsed.l)) {
      const rgb = hslToRgb(parsed.h, parsed.s, parsed.l)
      const hex = rgbToHex(rgb.r, rgb.g, rgb.b)
      setCurrentColor(hex)
      addToRecentColors(hex)
    }
  }, [])

  // Add color to recent colors
  const addToRecentColors = useCallback((color: string) => {
    if (isValidHex(color)) {
      setRecentColors((prev) => {
        const normalized = color.toUpperCase()
        const filtered = prev.filter((c) => c !== normalized)
        return [normalized, ...filtered].slice(0, 10)
      })
    }
  }, [])

  // Copy to clipboard
  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success('Copied to clipboard!')
    } catch {
      toast.error('Failed to copy')
    }
  }, [])

  // Generate random color
  const generateRandomColor = useCallback(() => {
    const randomHex =
      '#' + Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0')
        .toUpperCase()
    setCurrentColor(randomHex)
    addToRecentColors(randomHex)
  }, [])

  // Clear recent colors
  const clearRecentColors = useCallback(() => {
    setRecentColors([])
    toast.success('Recent colors cleared')
  }, [])

  // Fallback color for display when invalid
  const displayColor = colorFormats ? currentColor : '#000000'

  return (
    <div className="space-y-6">
      {/* Color Preview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Color Swatch */}
            <div className="flex flex-col items-center gap-4">
              <div
                className="w-40 h-40 rounded-xl border-4 border-border shadow-lg transition-all"
                style={{ backgroundColor: currentColor }}
              />
              <p className="text-sm text-muted-foreground font-mono">{currentColor}</p>
            </div>

            {/* Color Picker and Actions */}
            <div className="flex-1 space-y-4">
              <div>
                <Label htmlFor="color-picker" className="mb-2 block">
                  Pick a Color
                </Label>
                <input
                  id="color-picker"
                  type="color"
                  value={currentColor}
                  onChange={handleColorPick}
                  className="w-full h-16 cursor-pointer rounded-lg border-2 border-border"
                />
              </div>

              <div className="flex gap-2 flex-wrap">
                <Button onClick={generateRandomColor} variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Random Color
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Color Formats */}
      <Card>
        <CardHeader>
          <CardTitle>Color Formats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {/* HEX */}
            <div className="space-y-2">
              <Label htmlFor="hex-input">HEX</Label>
              <div className="flex gap-2">
                <Input
                  id="hex-input"
                  value={currentColor}
                  onChange={handleHexChange}
                  className="font-mono"
                  placeholder="#000000"
                />
                <Button
                  onClick={() => colorFormats && copyToClipboard(colorFormats.hex)}
                  variant="outline"
                  size="icon"
                  title="Copy HEX"
                  disabled={!colorFormats}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* RGB */}
            <div className="space-y-2">
              <Label htmlFor="rgb-input">RGB</Label>
              <div className="flex gap-2">
                <Input
                  id="rgb-input"
                  value={colorFormats?.rgb || ''}
                  onChange={handleRgbChange}
                  className="font-mono"
                  placeholder="rgb(0, 0, 0)"
                />
                <Button
                  onClick={() => colorFormats && copyToClipboard(colorFormats.rgb)}
                  variant="outline"
                  size="icon"
                  title="Copy RGB"
                  disabled={!colorFormats}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* RGBA */}
            <div className="space-y-2">
              <Label htmlFor="rgba-input">RGBA</Label>
              <div className="flex gap-2">
                <Input
                  id="rgba-input"
                  value={colorFormats?.rgba || ''}
                  readOnly
                  className="font-mono"
                />
                <Button
                  onClick={() => colorFormats && copyToClipboard(colorFormats.rgba)}
                  variant="outline"
                  size="icon"
                  title="Copy RGBA"
                  disabled={!colorFormats}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* HSL */}
            <div className="space-y-2">
              <Label htmlFor="hsl-input">HSL</Label>
              <div className="flex gap-2">
                <Input
                  id="hsl-input"
                  value={colorFormats?.hsl || ''}
                  onChange={handleHslChange}
                  className="font-mono"
                  placeholder="hsl(0, 0%, 0%)"
                />
                <Button
                  onClick={() => colorFormats && copyToClipboard(colorFormats.hsl)}
                  variant="outline"
                  size="icon"
                  title="Copy HSL"
                  disabled={!colorFormats}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* HSLA */}
            <div className="space-y-2">
              <Label htmlFor="hsla-input">HSLA</Label>
              <div className="flex gap-2">
                <Input
                  id="hsla-input"
                  value={colorFormats?.hsla || ''}
                  readOnly
                  className="font-mono"
                />
                <Button
                  onClick={() => colorFormats && copyToClipboard(colorFormats.hsla)}
                  variant="outline"
                  size="icon"
                  title="Copy HSLA"
                  disabled={!colorFormats}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preset Colors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Common Colors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
            {PRESET_COLORS.map((color) => (
              <button
                key={color.hex}
                className="aspect-square rounded-lg border-2 border-border hover:border-primary transition-colors cursor-pointer group"
                style={{ backgroundColor: color.hex }}
                onClick={() => {
                  setCurrentColor(color.hex)
                  addToRecentColors(color.hex)
                }}
                title={color.name}
              >
                <span className="sr-only">{color.name}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Colors */}
      {recentColors.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Colors</CardTitle>
              <Button onClick={clearRecentColors} variant="ghost" size="sm">
                Clear
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 flex-wrap">
              {recentColors.map((color) => (
                <button
                  key={color}
                  className="group relative"
                  onClick={() => setCurrentColor(color)}
                  title={color}
                >
                  <div
                    className="w-12 h-12 rounded-lg border-2 border-border hover:border-primary transition-colors cursor-pointer"
                    style={{ backgroundColor: color }}
                  />
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {color}
                  </span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

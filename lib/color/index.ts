/**
 * Color conversion utilities
 * Supports: HEX, RGB, RGBA, HSL, HSLA
 */

/**
 * Convert HEX color to RGB
 * @param hex - HEX color code (e.g., "#FF0000" or "FF0000")
 * @returns Object with r, g, b values or null if invalid
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  // Remove # if present
  hex = hex.replace(/^#/, '')

  // Handle shorthand hex (#RGB -> #RRGGBB)
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('')
  }

  // Validate length
  if (hex.length !== 6) {
    return null
  }

  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

  if (!result) {
    return null
  }

  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  }
}

/**
 * Convert RGB values to HEX
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @returns HEX color code (e.g., "#FF0000")
 */
export function rgbToHex(r: number, g: number, b: number): string {
  if (!isValidRgb(r, g, b)) {
    return '#000000'
  }

  const toHex = (n: number) => {
    const hex = n.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase()
}

/**
 * Convert RGB to HSL
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @returns Object with h (0-360), s (0-100), l (0-100)
 */
export function rgbToHsl(
  r: number,
  g: number,
  b: number
): { h: number; s: number; l: number } {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

/**
 * Convert HSL to RGB
 * @param h - Hue (0-360)
 * @param s - Saturation (0-100)
 * @param l - Lightness (0-100)
 * @returns Object with r, g, b values (0-255)
 */
export function hslToRgb(
  h: number,
  s: number,
  l: number
): { r: number; g: number; b: number } {
  h = h / 360
  s = s / 100
  l = l / 100

  let r, g, b

  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  }
}

/**
 * Validate HEX color
 * @param hex - HEX color code to validate
 * @returns true if valid, false otherwise
 */
export function isValidHex(hex: string): boolean {
  const cleaned = hex.replace(/^#/, '')
  return /^([a-f\d]{3}|[a-f\d]{6})$/i.test(cleaned)
}

/**
 * Validate RGB values
 * @param r - Red value
 * @param g - Green value
 * @param b - Blue value
 * @returns true if all values are valid (0-255 integers), false otherwise
 */
export function isValidRgb(r: number, g: number, b: number): boolean {
  return [r, g, b].every((val) => Number.isInteger(val) && val >= 0 && val <= 255)
}

/**
 * Validate HSL values
 * @param h - Hue value (0-360)
 * @param s - Saturation value (0-100)
 * @param l - Lightness value (0-100)
 * @returns true if all values are valid, false otherwise
 */
export function isValidHsl(h: number, s: number, l: number): boolean {
  return h >= 0 && h <= 360 && s >= 0 && s <= 100 && l >= 0 && l <= 100
}

/**
 * Validate alpha/opacity value
 * @param a - Alpha value to validate
 * @returns true if valid (0-1), false otherwise
 */
export function isValidAlpha(a: number): boolean {
  return a >= 0 && a <= 1
}

/**
 * Parse RGB string format (e.g., "rgb(255, 0, 0)")
 * @param rgb - RGB string to parse
 * @returns Object with r, g, b values or null if invalid
 */
export function parseRgbString(rgb: string): { r: number; g: number; b: number } | null {
  const match = rgb.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i)
  if (!match) {
    return null
  }

  const r = parseInt(match[1], 10)
  const g = parseInt(match[2], 10)
  const b = parseInt(match[3], 10)

  if (isValidRgb(r, g, b)) {
    return { r, g, b }
  }

  return null
}

/**
 * Parse HSL string format (e.g., "hsl(120, 100%, 50%)")
 * @param hsl - HSL string to parse
 * @returns Object with h, s, l values or null if invalid
 */
export function parseHslString(hsl: string): { h: number; s: number; l: number } | null {
  const match = hsl.match(/hsla?\s*\(\s*(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?/i)
  if (!match) {
    return null
  }

  const h = parseInt(match[1], 10)
  const s = parseInt(match[2], 10)
  const l = parseInt(match[3], 10)

  if (isValidHsl(h, s, l)) {
    return { h, s, l }
  }

  return null
}

/**
 * Format RGB values as string
 * @param r - Red value
 * @param g - Green value
 * @param b - Blue value
 * @param a - Optional alpha value (0-1)
 * @returns Formatted RGB(A) string
 */
export function formatRgb(r: number, g: number, b: number, a?: number): string {
  if (a !== undefined && isValidAlpha(a)) {
    return `rgba(${r}, ${g}, ${b}, ${a})`
  }
  return `rgb(${r}, ${g}, ${b})`
}

/**
 * Format HSL values as string
 * @param h - Hue value (0-360)
 * @param s - Saturation value (0-100)
 * @param l - Lightness value (0-100)
 * @param a - Optional alpha value (0-1)
 * @returns Formatted HSL(A) string
 */
export function formatHsl(h: number, s: number, l: number, a?: number): string {
  if (a !== undefined && isValidAlpha(a)) {
    return `hsla(${h}, ${s}%, ${l}%, ${a})`
  }
  return `hsl(${h}, ${s}%, ${l}%)`
}

/**
 * Preset colors for quick selection
 */
export const PRESET_COLORS = [
  { name: 'Red', hex: '#FF0000' },
  { name: 'Green', hex: '#00AA00' },
  { name: 'Blue', hex: '#0000FF' },
  { name: 'Yellow', hex: '#FFFF00' },
  { name: 'Cyan', hex: '#00FFFF' },
  { name: 'Magenta', hex: '#FF00FF' },
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Gray', hex: '#808080' },
  { name: 'Orange', hex: '#FFA500' },
  { name: 'Purple', hex: '#800080' },
  { name: 'Pink', hex: '#FFC0CB' },
  { name: 'Brown', hex: '#A52A2A' },
  { name: 'Navy', hex: '#000080' },
  { name: 'Teal', hex: '#008080' },
  { name: 'Olive', hex: '#808000' },
]

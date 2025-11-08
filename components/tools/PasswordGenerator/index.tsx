'use client'

import { useState, useMemo, useCallback } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Copy, RefreshCw, ChevronDown, ChevronUp, Shield, ShieldCheck, ShieldAlert } from 'lucide-react'
import { toast } from 'sonner'

// Character sets
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const NUMBERS = '0123456789'
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?'

// Similar/ambiguous characters to exclude
const SIMILAR_CHARS = '0O1Il'
const AMBIGUOUS_CHARS = '`~\'"'

type PasswordStrength = 'weak' | 'medium' | 'strong'

interface PasswordOptions {
  length: number
  uppercase: boolean
  lowercase: boolean
  numbers: boolean
  symbols: boolean
  excludeSimilar: boolean
  excludeAmbiguous: boolean
}

function generateSecurePassword(options: PasswordOptions): string {
  let charset = ''

  // Build character set based on options
  if (options.lowercase) charset += LOWERCASE
  if (options.uppercase) charset += UPPERCASE
  if (options.numbers) charset += NUMBERS
  if (options.symbols) charset += SYMBOLS

  // Remove excluded characters
  if (options.excludeSimilar) {
    charset = charset.split('').filter(char => !SIMILAR_CHARS.includes(char)).join('')
  }
  if (options.excludeAmbiguous) {
    charset = charset.split('').filter(char => !AMBIGUOUS_CHARS.includes(char)).join('')
  }

  if (charset.length === 0) {
    throw new Error('No character types selected')
  }

  // Generate password using cryptographically secure random values
  const password = new Array(options.length)
  const randomValues = new Uint32Array(options.length)

  // Use crypto.getRandomValues for true randomness
  crypto.getRandomValues(randomValues)

  for (let i = 0; i < options.length; i++) {
    password[i] = charset[randomValues[i] % charset.length]
  }

  return password.join('')
}

function calculatePasswordStrength(password: string, options: PasswordOptions): PasswordStrength {
  if (password.length < 8) return 'weak'

  let score = 0

  // Length scoring
  if (password.length >= 12) score += 2
  else if (password.length >= 8) score += 1

  // Character variety scoring
  if (options.uppercase && /[A-Z]/.test(password)) score += 1
  if (options.lowercase && /[a-z]/.test(password)) score += 1
  if (options.numbers && /\d/.test(password)) score += 1
  if (options.symbols && /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) score += 1

  // Complexity scoring
  if (password.length >= 16) score += 1
  if (score >= 6) return 'strong'
  if (score >= 4) return 'medium'
  return 'weak'
}

function getStrengthColor(strength: PasswordStrength): string {
  switch (strength) {
    case 'weak': return 'text-red-500'
    case 'medium': return 'text-yellow-500'
    case 'strong': return 'text-green-500'
  }
}

function getStrengthIcon(strength: PasswordStrength) {
  switch (strength) {
    case 'weak': return <ShieldAlert className="h-4 w-4" />
    case 'medium': return <Shield className="h-4 w-4" />
    case 'strong': return <ShieldCheck className="h-4 w-4" />
  }
}

function getStrengthText(strength: PasswordStrength): string {
  switch (strength) {
    case 'weak': return 'Weak - Easily cracked'
    case 'medium': return 'Medium - Moderately secure'
    case 'strong': return 'Strong - Very secure'
  }
}

export default function PasswordGenerator() {
  const [options, setOptions] = useState<PasswordOptions>({
    length: 12,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeSimilar: false,
    excludeAmbiguous: false,
  })

  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)
  const [advancedOpen, setAdvancedOpen] = useState(false)

  // Generate initial password
  useMemo(() => {
    try {
      const newPassword = generateSecurePassword(options)
      setPassword(newPassword)
    } catch (error) {
      setPassword('')
    }
  }, [options])

  const strength = useMemo(() =>
    password ? calculatePasswordStrength(password, options) : 'weak',
    [password, options]
  )

  const handleGenerate = useCallback(() => {
    try {
      const newPassword = generateSecurePassword(options)
      setPassword(newPassword)
      setCopied(false)
    } catch (error) {
      toast.error('Please select at least one character type')
    }
  }, [options])

  const handleCopy = useCallback(async () => {
    if (!password) return

    try {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast.success('Password copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy:', err)
      toast.error('Failed to copy to clipboard')
    }
  }, [password])

  const updateOption = useCallback((key: keyof PasswordOptions, value: boolean | number) => {
    setOptions(prev => ({ ...prev, [key]: value }))
  }, [])

  const selectedTypesCount = [options.uppercase, options.lowercase, options.numbers, options.symbols].filter(Boolean).length

  return (
    <div className="space-y-6">
      {/* Generated Password Display */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Generated Password</h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleGenerate}
                  className="gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Generate
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  disabled={!password}
                  className="gap-2"
                >
                  <Copy className="h-4 w-4" />
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            </div>

            {/* Password Display */}
            <div className="relative">
              <div className="p-4 bg-muted rounded-lg border-2 border-dashed min-h-[60px] flex items-center">
                <code className="text-lg font-mono break-all select-all">
                  {password || 'Click Generate to create a password...'}
                </code>
              </div>
            </div>

            {/* Strength Indicator */}
            {password && (
              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                <div className={getStrengthColor(strength)}>
                  {getStrengthIcon(strength)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Password Strength</span>
                    <span className={`text-sm font-semibold ${getStrengthColor(strength)}`}>
                      {getStrengthText(strength)}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        strength === 'weak' ? 'bg-red-500 w-1/3' :
                        strength === 'medium' ? 'bg-yellow-500 w-2/3' :
                        'bg-green-500 w-full'
                      }`}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Password Options */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Password Options</h2>

            {/* Length Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label htmlFor="length" className="text-sm font-medium">
                  Password Length: {options.length} characters
                </Label>
                <span className="text-xs text-muted-foreground">
                  {options.length < 8 ? 'Too short' : options.length < 12 ? 'Good' : 'Excellent'}
                </span>
              </div>
              <Slider
                id="length"
                min={4}
                max={128}
                step={1}
                value={[options.length]}
                onValueChange={(value) => updateOption('length', value[0])}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>4</span>
                <span>64</span>
                <span>128</span>
              </div>
            </div>

            {/* Character Types */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">
                Character Types ({selectedTypesCount} selected)
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="uppercase" className="text-sm">
                    Uppercase (A-Z)
                  </Label>
                  <Switch
                    id="uppercase"
                    checked={options.uppercase}
                    onCheckedChange={(checked: boolean) => updateOption('uppercase', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="lowercase" className="text-sm">
                    Lowercase (a-z)
                  </Label>
                  <Switch
                    id="lowercase"
                    checked={options.lowercase}
                    onCheckedChange={(checked: boolean) => updateOption('lowercase', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="numbers" className="text-sm">
                    Numbers (0-9)
                  </Label>
                  <Switch
                    id="numbers"
                    checked={options.numbers}
                    onCheckedChange={(checked: boolean) => updateOption('numbers', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="symbols" className="text-sm">
                    Symbols (!@#$%)
                  </Label>
                  <Switch
                    id="symbols"
                    checked={options.symbols}
                    onCheckedChange={(checked: boolean) => updateOption('symbols', checked)}
                  />
                </div>
              </div>
            </div>

            {/* Advanced Options */}
            <div className="space-y-3">
              <Button
                variant="ghost"
                className="w-full justify-between p-0 h-auto"
                onClick={() => setAdvancedOpen(!advancedOpen)}
              >
                <span className="text-sm font-medium">Advanced Options</span>
                {advancedOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>

              {advancedOpen && (
                <div className="space-y-3 mt-3 pt-3 border-t">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="excludeSimilar" className="text-sm">
                      Exclude similar characters (0/O, 1/I/l)
                    </Label>
                    <Switch
                      id="excludeSimilar"
                      checked={options.excludeSimilar}
                      onCheckedChange={(checked: boolean) => updateOption('excludeSimilar', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="excludeAmbiguous" className="text-sm">
                      Exclude ambiguous characters (`~'"")
                    </Label>
                    <Switch
                      id="excludeAmbiguous"
                      checked={options.excludeAmbiguous}
                      onCheckedChange={(checked: boolean) => updateOption('excludeAmbiguous', checked)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
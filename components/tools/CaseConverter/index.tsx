'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

import { Copy, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

type CaseType =
  | 'original'
  | 'uppercase'
  | 'lowercase'
  | 'titlecase'
  | 'sentencecase'
  | 'camelcase'
  | 'pascalcase'
  | 'snakecase'
  | 'kebabcase'
  | 'alternatingcase'

function convertCase(text: string, caseType: CaseType): string {
  if (!text.trim()) return text

  switch (caseType) {
    case 'original':
      return text

    case 'uppercase':
      return text.toUpperCase()

    case 'lowercase':
      return text.toLowerCase()

    case 'titlecase':
      return text.replace(/\w\S*/g, (txt) =>
        txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
      )

    case 'sentencecase':
      return text.replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase())

    case 'camelcase':
      return text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
        .replace(/^./, (char) => char.toLowerCase())

    case 'pascalcase':
      return text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
        .replace(/^./, (char) => char.toUpperCase())

    case 'snakecase':
      return text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '')

    case 'kebabcase':
      return text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')

    case 'alternatingcase':
      return text
        .split('')
        .map((char, index) =>
          index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
        )
        .join('')

    default:
      return text
  }
}

const caseOptions = [
  { value: 'original', label: 'Original', description: 'No changes' },
  { value: 'uppercase', label: 'UPPERCASE', description: 'All letters uppercase' },
  { value: 'lowercase', label: 'lowercase', description: 'All letters lowercase' },
  { value: 'titlecase', label: 'Title Case', description: 'First letter of each word capitalized' },
  { value: 'sentencecase', label: 'Sentence case', description: 'First letter of each sentence capitalized' },
  { value: 'camelcase', label: 'camelCase', description: 'First word lowercase, subsequent words capitalized' },
  { value: 'pascalcase', label: 'PascalCase', description: 'All words capitalized, no spaces' },
  { value: 'snakecase', label: 'snake_case', description: 'Words separated by underscores' },
  { value: 'kebabcase', label: 'kebab-case', description: 'Words separated by hyphens' },
  { value: 'alternatingcase', label: 'AlTeRnAtInG cAsE', description: 'Alternating uppercase and lowercase' },
] as const

export default function CaseConverter() {
  const [inputText, setInputText] = useState('')
  const [selectedCase, setSelectedCase] = useState<CaseType>('original')
  const [copied, setCopied] = useState(false)

  const convertedText = useMemo(() =>
    convertCase(inputText, selectedCase),
    [inputText, selectedCase]
  )

  const handleClear = () => {
    setInputText('')
    setSelectedCase('original')
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(convertedText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast.success('Text copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy:', err)
      toast.error('Failed to copy to clipboard')
    }
  }



  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Enter Your Text</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClear}
                disabled={inputText.length === 0}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type or paste your text here..."
              className="min-h-[200px] text-base resize-y"
              aria-label="Text input for case conversion"
            />
          </div>
        </CardContent>
      </Card>

      {/* Case Selection */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Select Case Type</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
              {caseOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={selectedCase === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCase(option.value)}
                  className="text-xs h-auto py-2 px-3"
                  title={option.description}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Output Section */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Converted Text</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                disabled={convertedText.length === 0}
              >
                <Copy className="h-4 w-4 mr-2" />
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            <div className="min-h-[200px] p-4 border rounded-md bg-muted/30">
              <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
                {convertedText || 'Your converted text will appear here...'}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>


    </div>
  )
}
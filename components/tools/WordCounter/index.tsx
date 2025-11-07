'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Copy, Trash2 } from 'lucide-react'

interface TextStats {
  words: number
  characters: number
  charactersNoSpaces: number
  sentences: number
  paragraphs: number
  readingTime: string
  speakingTime: string
  averageWordLength: number
  longestWord: string
  topKeywords: Array<{ word: string; count: number }>
}

function analyzeText(text: string): TextStats {
  const trimmedText = text.trim()
  
  // Words
  const words = trimmedText ? trimmedText.split(/\s+/).filter(word => word.length > 0) : []
  const wordCount = words.length
  
  // Characters
  const characters = text.length
  const charactersNoSpaces = text.replace(/\s/g, '').length
  
  // Sentences - split by .!? followed by space or end of string
  const sentences = trimmedText ? trimmedText.split(/[.!?]+/).filter(s => s.trim().length > 0) : []
  const sentenceCount = sentences.length
  
  // Paragraphs - split by multiple newlines
  const paragraphs = trimmedText ? trimmedText.split(/\n\s*\n/).filter(p => p.trim().length > 0) : []
  const paragraphCount = paragraphs.length
  
  // Reading time (200 words per minute)
  const readingMinutes = Math.floor(wordCount / 200)
  const readingSeconds = Math.round((wordCount % 200) / 200 * 60)
  const readingTime = wordCount > 0 
    ? `${readingMinutes} min ${readingSeconds} sec`
    : '0 min 0 sec'
  
  // Speaking time (150 words per minute)
  const speakingMinutes = Math.floor(wordCount / 150)
  const speakingSeconds = Math.round((wordCount % 150) / 150 * 60)
  const speakingTime = wordCount > 0
    ? `${speakingMinutes} min ${speakingSeconds} sec`
    : '0 min 0 sec'
  
  // Average word length
  const totalChars = words.reduce((sum, word) => sum + word.length, 0)
  const averageWordLength = wordCount > 0 ? Math.round((totalChars / wordCount) * 10) / 10 : 0
  
  // Longest word
  const longestWord = words.length > 0
    ? words.reduce((longest, word) => word.length > longest.length ? word : longest, '')
    : ''
  
  // Keyword density - top 5 words (excluding common words)
  const commonWords = new Set(['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from', 'is', 'was', 'are', 'been'])
  const wordFreq = new Map<string, number>()
  
  words.forEach(word => {
    const cleanWord = word.toLowerCase().replace(/[^a-z0-9]/g, '')
    if (cleanWord.length > 2 && !commonWords.has(cleanWord)) {
      wordFreq.set(cleanWord, (wordFreq.get(cleanWord) || 0) + 1)
    }
  })
  
  const topKeywords = Array.from(wordFreq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word, count]) => ({ word, count }))
  
  return {
    words: wordCount,
    characters,
    charactersNoSpaces,
    sentences: sentenceCount,
    paragraphs: paragraphCount,
    readingTime,
    speakingTime,
    averageWordLength,
    longestWord,
    topKeywords
  }
}

export default function WordCounter() {
  const [text, setText] = useState('')
  const [copied, setCopied] = useState(false)
  
  const stats = useMemo(() => analyzeText(text), [text])
  
  const handleClear = () => {
    setText('')
  }
  
  const handleCopyStats = async () => {
    const statsText = `
Word Count: ${stats.words}
Character Count: ${stats.characters}
Characters (no spaces): ${stats.charactersNoSpaces}
Sentence Count: ${stats.sentences}
Paragraph Count: ${stats.paragraphs}
Reading Time: ${stats.readingTime}
Speaking Time: ${stats.speakingTime}
Average Word Length: ${stats.averageWordLength}
Longest Word: ${stats.longestWord}
${stats.topKeywords.length > 0 ? `\nTop Keywords:\n${stats.topKeywords.map(k => `  ${k.word}: ${k.count}`).join('\n')}` : ''}
    `.trim()
    
    try {
      await navigator.clipboard.writeText(statsText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }
  
  return (
    <div className="space-y-6">
      {/* Main Input Area */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Enter Your Text</h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyStats}
                  disabled={stats.words === 0}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  {copied ? 'Copied!' : 'Copy Stats'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClear}
                  disabled={text.length === 0}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>
            </div>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste your text here..."
              className="min-h-[300px] text-base font-mono resize-y"
              aria-label="Text input for word counting"
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Words" value={stats.words} />
        <StatCard label="Characters" value={stats.characters} />
        <StatCard label="Characters (no spaces)" value={stats.charactersNoSpaces} />
        <StatCard label="Sentences" value={stats.sentences} />
        <StatCard label="Paragraphs" value={stats.paragraphs} />
        <StatCard label="Reading Time" value={stats.readingTime} />
        <StatCard label="Speaking Time" value={stats.speakingTime} />
        <StatCard label="Avg Word Length" value={stats.averageWordLength} />
      </div>
      
      {/* Additional Stats */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold mb-2 text-muted-foreground">Longest Word</h3>
            <p className="text-2xl font-bold break-all">
              {stats.longestWord || '-'}
            </p>
            {stats.longestWord && (
              <p className="text-sm text-muted-foreground mt-1">
                {stats.longestWord.length} characters
              </p>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold mb-2 text-muted-foreground">Top Keywords</h3>
            {stats.topKeywords.length > 0 ? (
              <div className="space-y-1">
                {stats.topKeywords.map((keyword, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="font-medium">{keyword.word}</span>
                    <span className="text-sm text-muted-foreground">{keyword.count}×</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">-</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-xs font-semibold mb-1 text-muted-foreground">{label}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  )
}

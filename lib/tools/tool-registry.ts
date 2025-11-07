export interface Tool {
  id: string
  name: string
  description: string
  icon: string
  category: 'audio' | 'text' | 'image' | 'pdf' | 'video'
  href: string
  featured?: boolean
  pagePath: string // Path to the page file for git tracking
}

export const tools: Tool[] = [
  {
    id: 'speech-to-text',
    name: 'Speech to Text',
    description: 'Convert audio recordings to text using AI. Free, fast, and privacy-focused.',
    icon: '🎤',
    category: 'audio',
    href: '/tools/speech-to-text',
    pagePath: 'speech-to-text',
    featured: true
  },
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Count words, characters, sentences, paragraphs, and reading time instantly. Free and works offline.',
    icon: '📝',
    category: 'text',
    href: '/tools/word-counter',
    pagePath: 'word-counter',
    featured: true
  },
  {
    id: 'text-diff-checker',
    name: 'Text Diff Checker',
    description: 'Compare two texts side-by-side and see the differences highlighted. Free, fast, and completely private.',
    icon: '🔍',
    category: 'text',
    href: '/tools/text-diff-checker',
    pagePath: 'text-diff-checker',
    featured: true
  },
  {
    id: 'markdown-to-html',
    name: 'Markdown to HTML',
    description: 'Convert Markdown to HTML instantly with live preview. Free, fast, and works offline.',
    icon: '📄',
    category: 'text',
    href: '/tools/markdown-to-html',
    pagePath: 'markdown-to-html',
    featured: true
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format, validate, and beautify JSON instantly. Find errors, minify, and convert with ease. Free and works offline.',
    icon: '{ }',
    category: 'text',
    href: '/tools/json-formatter',
    pagePath: 'json-formatter',
    featured: true
  },
]

export const categories = [
  { id: 'all', name: 'All Tools', icon: '🔧' },
  { id: 'audio', name: 'Audio', icon: '🎵' },
  { id: 'text', name: 'Text', icon: '📝' },
  { id: 'image', name: 'Image', icon: '🖼️' },
  { id: 'pdf', name: 'PDF', icon: '📄' },
  { id: 'video', name: 'Video', icon: '🎬' },
] as const

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
  {
    id: 'pdf-merger',
    name: 'PDF Merger',
    description: 'Combine multiple PDF files into one document. Free, fast, and secure. All processing happens in your browser.',
    icon: '📄',
    category: 'pdf',
    href: '/tools/pdf-merger',
    pagePath: 'pdf-merger',
    featured: true
  },
   {
     id: 'image-resizer',
     name: 'Image Resizer',
     description: 'Resize images to any dimensions with quality control and format conversion. Batch process multiple images. 100% private.',
     icon: '🖼️',
     category: 'image',
     href: '/tools/image-resizer',
     pagePath: 'image-resizer',
     featured: true
   },
   {
     id: 'qr-code-generator',
     name: 'QR Code Generator',
     description: 'Generate QR codes from text and URLs instantly. Customizable size and error correction. Free, fast, and works offline.',
     icon: '📱',
     category: 'image',
     href: '/tools/qr-code-generator',
     pagePath: 'qr-code-generator',
     featured: true
   },
   {
     id: 'video-to-gif',
     name: 'Video to GIF',
     description: 'Convert videos to animated GIFs with customizable quality, frame rate, and dimensions. Trim clips and adjust settings. 100% private.',
     icon: '🎬',
     category: 'video',
     href: '/tools/video-to-gif',
     pagePath: 'video-to-gif',
     featured: true
   },
   {
     id: 'case-converter',
     name: 'Case Converter',
     description: 'Convert text between different cases instantly. Supports uppercase, lowercase, title case, camelCase, snake_case, and more. Free and works offline.',
     icon: '🔄',
     category: 'text',
     href: '/tools/case-converter',
     pagePath: 'case-converter',
     featured: true
   },
   {
     id: 'password-generator',
     name: 'Password Generator',
     description: 'Generate strong, secure passwords with customizable length and character options. Cryptographically secure, works offline, no data collection.',
     icon: '🔐',
     category: 'text',
     href: '/tools/password-generator',
     pagePath: 'password-generator',
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

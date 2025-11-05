export interface Tool {
  id: string
  name: string
  description: string
  icon: string
  category: 'audio' | 'text' | 'image' | 'pdf' | 'video'
  href: string
  featured?: boolean
}

export const tools: Tool[] = [
  {
    id: 'speech-to-text',
    name: 'Speech to Text',
    description: 'Convert audio recordings to text using AI. Free, fast, and privacy-focused.',
    icon: '🎤',
    category: 'audio',
    href: '/tools/speech-to-text',
    featured: true
  },
  // Future tools will be added here
]

export const categories = [
  { id: 'all', name: 'All Tools', icon: '🔧' },
  { id: 'audio', name: 'Audio', icon: '🎵' },
  { id: 'text', name: 'Text', icon: '📝' },
  { id: 'image', name: 'Image', icon: '🖼️' },
  { id: 'pdf', name: 'PDF', icon: '📄' },
  { id: 'video', name: 'Video', icon: '🎬' },
] as const

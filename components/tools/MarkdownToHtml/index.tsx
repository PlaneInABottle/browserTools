'use client'

import { useState, useMemo } from 'react'
import { marked } from 'marked'
import DOMPurify from 'isomorphic-dompurify'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Copy, Download, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

type ViewMode = 'split' | 'preview' | 'code'
type Template = 'basic' | 'styled' | 'full'

const DEFAULT_MARKDOWN = `# Welcome to Markdown to HTML Converter

This tool converts **Markdown** to *HTML* in real-time.

## Features

- GitHub Flavored Markdown support
- Live preview
- Multiple templates
- Syntax highlighting

## Try it out!

1. Edit this text
2. See the live preview
3. Copy or download the HTML

[Learn more about Markdown](https://www.markdownguide.org/)

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

> This is a blockquote. Markdown makes formatting easy!

| Feature | Status |
|---------|--------|
| Tables  | ✅     |
| Lists   | ✅     |
| Links   | ✅     |
`

export default function MarkdownToHtml() {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN)
  const [viewMode, setViewMode] = useState<ViewMode>('split')
  const [template, setTemplate] = useState<Template>('styled')
  const [gfm, setGfm] = useState(true)
  const [breaks, setBreaks] = useState(false)

  // Configure marked
  marked.setOptions({
    gfm: gfm,
    breaks: breaks,
  })

  const html = useMemo(() => {
    try {
      const rawHtml = marked.parse(markdown) as string
      return DOMPurify.sanitize(rawHtml)
    } catch (error) {
      toast.error('Error parsing markdown')
      return '<p class="text-red-500">Error parsing markdown. Please check your syntax.</p>'
    }
  }, [markdown, gfm, breaks])

  const wrappedHtml = useMemo(() => {
    return wrapHtmlTemplate(html, template)
  }, [html, template])

  const handleCopyHtml = async () => {
    try {
      await navigator.clipboard.writeText(wrappedHtml)
      toast.success('HTML copied to clipboard!')
    } catch (err) {
      toast.error('Failed to copy to clipboard')
    }
  }

  const handleDownloadHtml = () => {
    const blob = new Blob([wrappedHtml], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `converted-${new Date().toISOString().slice(0, 10)}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleDownloadMarkdown = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `document-${new Date().toISOString().slice(0, 10)}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleClear = () => {
    setMarkdown('')
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-medium mb-2 block">View Mode</label>
              <Select value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="split">Split View</SelectItem>
                  <SelectItem value="preview">Preview Only</SelectItem>
                  <SelectItem value="code">HTML Code Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-medium mb-2 block">HTML Template</label>
              <Select value={template} onValueChange={(v) => setTemplate(v as Template)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic HTML</SelectItem>
                  <SelectItem value="styled">Styled HTML</SelectItem>
                  <SelectItem value="full">Full Page</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2 flex-wrap items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={gfm}
                  onChange={(e) => setGfm(e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm">GitHub Flavored Markdown</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={breaks}
                  onChange={(e) => setBreaks(e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm">Line Breaks</span>
              </label>
            </div>

            <div className="flex gap-2 ml-auto">
              <Button variant="outline" size="sm" onClick={handleCopyHtml}>
                <Copy className="h-4 w-4 mr-2" />
                Copy HTML
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownloadHtml}>
                <Download className="h-4 w-4 mr-2" />
                Download HTML
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownloadMarkdown}>
                <Download className="h-4 w-4 mr-2" />
                Download MD
              </Button>
              <Button variant="outline" size="sm" onClick={handleClear} disabled={!markdown}>
                <Trash2 className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Editor Area */}
      {viewMode === 'split' && (
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-sm font-semibold mb-2">Markdown Input</h3>
              <Textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                placeholder="Enter your Markdown here..."
                className="min-h-[500px] font-mono text-sm resize-y"
                aria-label="Markdown input"
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-sm font-semibold mb-2">Live Preview</h3>
              <div 
                className="h-[500px] p-6 border rounded-lg bg-white dark:bg-gray-900 overflow-auto markdown-preview"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </CardContent>
          </Card>
        </div>
      )}

      {viewMode === 'preview' && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold mb-2">Preview</h3>
            <div
              className="h-[600px] p-6 border rounded-lg bg-white dark:bg-gray-900 overflow-auto markdown-preview"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </CardContent>
        </Card>
      )}

      {viewMode === 'code' && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold mb-2">HTML Code</h3>
            <Textarea
              value={wrappedHtml}
              readOnly
              className="min-h-[500px] font-mono text-sm resize-y"
              aria-label="HTML output"
            />
          </CardContent>
        </Card>
      )}

      {/* Show both input and code in split mode */}
      {viewMode === 'split' && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold mb-2">HTML Code Output</h3>
            <Textarea
              value={wrappedHtml}
              readOnly
              className="min-h-[200px] font-mono text-sm resize-y"
              aria-label="HTML code output"
            />
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function wrapHtmlTemplate(html: string, template: Template): string {
  switch (template) {
    case 'basic':
      return html

    case 'styled':
      return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      max-width: 800px;
      margin: 2rem auto;
      padding: 0 1rem;
      color: #333;
    }
    code {
      background: #f4f4f4;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
    }
    pre {
      background: #f4f4f4;
      padding: 1rem;
      border-radius: 5px;
      overflow-x: auto;
    }
    pre code {
      background: none;
      padding: 0;
    }
    blockquote {
      border-left: 4px solid #ddd;
      margin: 0;
      padding-left: 1rem;
      color: #666;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 1rem 0;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px 12px;
      text-align: left;
    }
    th {
      background: #f4f4f4;
      font-weight: 600;
    }
    img {
      max-width: 100%;
      height: auto;
    }
    a {
      color: #0066cc;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
${html}
</body>
</html>`

    case 'full':
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Converted from Markdown">
  <title>Converted from Markdown</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background: #fff;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }
    h1, h2, h3, h4, h5, h6 {
      margin-top: 1.5rem;
      margin-bottom: 0.75rem;
      font-weight: 600;
      line-height: 1.25;
    }
    h1 { font-size: 2rem; }
    h2 { font-size: 1.5rem; }
    h3 { font-size: 1.25rem; }
    p {
      margin-bottom: 1rem;
    }
    ul, ol {
      margin-bottom: 1rem;
      padding-left: 2rem;
    }
    li {
      margin-bottom: 0.25rem;
    }
    code {
      background: #f4f4f4;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
      font-size: 0.9em;
    }
    pre {
      background: #f4f4f4;
      padding: 1rem;
      border-radius: 5px;
      overflow-x: auto;
      margin-bottom: 1rem;
    }
    pre code {
      background: none;
      padding: 0;
    }
    blockquote {
      border-left: 4px solid #ddd;
      margin: 1rem 0;
      padding-left: 1rem;
      color: #666;
      font-style: italic;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 1rem 0;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px 12px;
      text-align: left;
    }
    th {
      background: #f4f4f4;
      font-weight: 600;
    }
    tr:nth-child(even) {
      background: #f9f9f9;
    }
    img {
      max-width: 100%;
      height: auto;
      display: block;
      margin: 1rem 0;
    }
    a {
      color: #0066cc;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    hr {
      border: none;
      border-top: 2px solid #ddd;
      margin: 2rem 0;
    }
  </style>
</head>
<body>
  <div class="container">
${html}
  </div>
</body>
</html>`

    default:
      return html
  }
}

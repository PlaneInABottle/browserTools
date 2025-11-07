import type { Metadata } from 'next'
import Link from 'next/link'
import MarkdownToHtml from '@/components/tools/MarkdownToHtml'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { siteConfig } from '@/lib/config/site'

export const metadata: Metadata = {
  title: 'Markdown to HTML Converter - Free Online Tool',
  description: 'Convert Markdown to HTML instantly with live preview. Supports GitHub Flavored Markdown, tables, code blocks, and more. Free, fast, and works offline.',
  keywords: [
    'markdown to html',
    'markdown converter',
    'md to html',
    'markdown parser',
    'github flavored markdown',
    'markdown preview',
    'free markdown converter',
    'online markdown tool',
    'markdown editor',
    'gfm converter',
  ],
  openGraph: {
    title: 'Markdown to HTML Converter - Free Tool',
    description: 'Convert Markdown to HTML with live preview. Supports GFM, tables, code blocks. Free and private.',
    type: 'website',
    url: `${siteConfig.url}/tools/markdown-to-html`,
  },
  alternates: {
    canonical: `${siteConfig.url}/tools/markdown-to-html`,
    languages: {
      'en-US': `${siteConfig.url}/tools/markdown-to-html`,
    },
  },
}

export const dynamic = 'force-static'

export default function MarkdownToHtmlPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Markdown to HTML Converter',
        url: `${siteConfig.url}/tools/markdown-to-html`,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: 'Free online Markdown to HTML converter with live preview.',
        featureList: [
          'Real-time Markdown to HTML conversion',
          'GitHub Flavored Markdown support',
          'Live preview with styling',
          'Syntax highlighting for code blocks',
          'Download as HTML file',
          'XSS protection with sanitization',
          'Works offline',
          'No data collection'
        ],
      },
      {
        '@type': 'HowTo',
        name: 'How to Convert Markdown to HTML',
        description: 'Convert Markdown markup to HTML code',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Enter Markdown',
            text: 'Type or paste your Markdown text in the editor',
          },
          {
            '@type': 'HowToStep',
            name: 'View Live Preview',
            text: 'See the rendered HTML preview in real-time as you type',
          },
          {
            '@type': 'HowToStep',
            name: 'Copy or Download',
            text: 'Copy the HTML code or download as a file',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is Markdown?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Markdown is a lightweight markup language that uses plain text formatting syntax. It\'s designed to be easy to read and write, and can be converted to HTML.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is GitHub Flavored Markdown (GFM)?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'GitHub Flavored Markdown is an extension of Markdown that adds support for tables, task lists, strikethrough, and automatic linking. It\'s the standard used on GitHub.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is my markdown saved or sent to a server?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. All conversion happens locally in your browser. Your markdown never leaves your device and is not saved anywhere.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I include CSS styling in the HTML output?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! You can choose different templates including basic HTML, styled HTML with CSS, or a full HTML page with complete styling.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does it support syntax highlighting for code blocks?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, the tool renders code blocks with proper formatting. The HTML output includes styling for code blocks.',
            },
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: siteConfig.url,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Tools',
            item: `${siteConfig.url}/tools`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Markdown to HTML',
            item: `${siteConfig.url}/tools/markdown-to-html`,
          },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm mb-6" aria-label="Breadcrumb">
          <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:underline focus:underline focus:outline-none focus:ring-1 focus:ring-blue-500">Home</Link>
          <span className="mx-2 text-gray-400 dark:text-gray-600">/</span>
          <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:underline focus:underline focus:outline-none focus:ring-1 focus:ring-blue-500">Tools</Link>
          <span className="mx-2 text-gray-400 dark:text-gray-600">/</span>
          <span className="text-gray-900 dark:text-gray-100 font-medium" aria-current="page">Markdown to HTML</span>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
            <span>📄</span>
            <span>Markdown to HTML Converter</span>
          </h1>
          <p className="text-muted-foreground">
            Convert Markdown to HTML instantly with live preview. Supports GitHub Flavored Markdown, tables, and code blocks.
          </p>
        </div>

        {/* Tool Component */}
        <MarkdownToHtml />

        {/* Markdown Cheatsheet */}
        <Card className="mt-16">
          <CardHeader>
            <CardTitle className="text-2xl">Markdown Cheatsheet</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Headers</h3>
                  <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded block">
                    # H1<br/>
                    ## H2<br/>
                    ### H3
                  </code>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Emphasis</h3>
                  <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded block">
                    **bold**<br/>
                    *italic*<br/>
                    ~~strikethrough~~
                  </code>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Lists</h3>
                  <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded block">
                    - Bullet list<br/>
                    1. Numbered list<br/>
                    - [ ] Task list
                  </code>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Links & Images</h3>
                  <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded block">
                    [Link text](url)<br/>
                    ![Alt text](image.jpg)
                  </code>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Code</h3>
                  <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded block">
                    `inline code`<br/>
                    ```javascript<br/>
                    code block<br/>
                    ```
                  </code>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Blockquotes & Tables</h3>
                  <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded block">
                    &gt; Quote<br/>
                    | Col 1 | Col 2 |<br/>
                    |-------|-------|
                  </code>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Use Cases */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">Use Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-semibold">📚 README Files</h3>
                <p className="text-sm text-muted-foreground">
                  Convert markdown README files to HTML for documentation sites or GitHub Pages.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">📝 Blog Posts</h3>
                <p className="text-sm text-muted-foreground">
                  Draft blog posts in Markdown and convert to HTML for publishing.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">📖 Documentation</h3>
                <p className="text-sm text-muted-foreground">
                  Generate HTML documentation from Markdown source files.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">✍️ Technical Writing</h3>
                <p className="text-sm text-muted-foreground">
                  Write technical articles in Markdown format and export as HTML.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">📧 Email Templates</h3>
                <p className="text-sm text-muted-foreground">
                  Create HTML email templates from Markdown content.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">🌐 Static Sites</h3>
                <p className="text-sm text-muted-foreground">
                  Generate HTML content for static site generators.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How to Use */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">How to Use</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-3 text-muted-foreground leading-relaxed">
              <li>
                <strong className="text-foreground">Enter your Markdown</strong> - Type or paste Markdown text in the editor (example provided by default)
              </li>
              <li>
                <strong className="text-foreground">View live preview</strong> - See the rendered HTML in real-time as you type
              </li>
              <li>
                <strong className="text-foreground">Choose template</strong> - Select basic HTML, styled HTML, or full page template
              </li>
              <li>
                <strong className="text-foreground">Copy or download</strong> - Copy the HTML code to clipboard or download as a file
              </li>
            </ol>
          </CardContent>
        </Card>

        {/* Features */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-semibold">⚡ Real-time Preview</h3>
                <p className="text-sm text-muted-foreground">
                  See HTML preview update instantly as you type your Markdown.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">🎯 GFM Support</h3>
                <p className="text-sm text-muted-foreground">
                  Full support for GitHub Flavored Markdown including tables and task lists.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">🎨 Multiple Templates</h3>
                <p className="text-sm text-muted-foreground">
                  Choose from basic HTML, styled HTML, or full page templates with CSS.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">💾 Download Options</h3>
                <p className="text-sm text-muted-foreground">
                  Download as HTML or Markdown file with one click.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">🔒 Privacy First</h3>
                <p className="text-sm text-muted-foreground">
                  All conversion happens in your browser. No data sent to servers.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">📱 Mobile Friendly</h3>
                <p className="text-sm text-muted-foreground">
                  Responsive design works perfectly on phones and tablets.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">🛡️ XSS Protection</h3>
                <p className="text-sm text-muted-foreground">
                  Output is sanitized to prevent cross-site scripting attacks.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">🌙 Dark Mode</h3>
                <p className="text-sm text-muted-foreground">
                  Works seamlessly in both light and dark mode.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">What is Markdown?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Markdown is a lightweight markup language that uses plain text formatting syntax. It&apos;s designed to be easy to read and write, and can be converted to HTML. Created by John Gruber in 2004, it&apos;s now widely used for README files, documentation, blogs, and more.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">What is GitHub Flavored Markdown (GFM)?</h3>
              <p className="text-muted-foreground leading-relaxed">
                GitHub Flavored Markdown is an extension of standard Markdown that adds support for tables, task lists, strikethrough text, and automatic linking of URLs. It&apos;s the standard used on GitHub and is more feature-rich than basic Markdown.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">Is my markdown saved or sent to a server?</h3>
              <p className="text-muted-foreground leading-relaxed">
                No. All Markdown to HTML conversion happens entirely in your browser using JavaScript. Your content never leaves your device, is not sent to any server, and is not saved anywhere. This ensures complete privacy and security.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">Can I include CSS styling in the HTML output?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Yes! You can choose from three templates: <strong>Basic HTML</strong> (just the converted HTML), <strong>Styled HTML</strong> (includes CSS for nice formatting), or <strong>Full Page</strong> (complete HTML document with comprehensive styling).
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">Does it support syntax highlighting for code blocks?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Yes, code blocks are rendered with proper formatting and monospace fonts. The HTML output includes CSS styling for code blocks to make them visually distinct and easy to read.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Related Tools */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">Related Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/tools/word-counter" className="p-4 border-2 rounded-lg hover:border-blue-500 transition-colors">
                <div className="text-3xl mb-2">📝</div>
                <h3 className="font-semibold">Word Counter</h3>
                <p className="text-sm text-muted-foreground">Count words, characters, and sentences</p>
              </Link>
              <Link href="/tools/text-diff-checker" className="p-4 border-2 rounded-lg hover:border-blue-500 transition-colors">
                <div className="text-3xl mb-2">🔍</div>
                <h3 className="font-semibold">Text Diff Checker</h3>
                <p className="text-sm text-muted-foreground">Compare two texts side-by-side</p>
              </Link>
              <div className="p-4 border-2 border-dashed rounded-lg opacity-60">
                <div className="text-3xl mb-2 grayscale">{ }</div>
                <h3 className="font-semibold text-muted-foreground">JSON Formatter</h3>
                <p className="text-sm text-muted-foreground">Format and validate JSON</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

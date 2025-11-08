import type { Metadata } from 'next'
import Link from 'next/link'
import JsonFormatter from '@/components/tools/JsonFormatter'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { siteConfig } from '@/lib/config/site'
import { getToolPageLastModified } from '@/lib/utils/git-dates'

const lastModified = getToolPageLastModified('json-formatter')

export const metadata: Metadata = {
  title: 'JSON Formatter & Validator - Free Online Tool | Toolympics',
  description: 'Format, validate, and beautify JSON online. Find errors, minify JSON, convert to tree view, and more. Free, fast, and works offline.',
  keywords: [
    'json formatter',
    'json validator',
    'json beautifier',
    'json minifier',
    'format json online',
    'validate json',
    'json pretty print',
    'free json tool',
    'json syntax checker',
    'json parser',
    'json viewer',
    'json tree view',
  ],
  openGraph: {
    title: 'JSON Formatter & Validator - Free Online Tool',
    description: 'Format, validate, and beautify JSON instantly. Find errors, minify, and convert. Free and private.',
    type: 'website',
    url: `${siteConfig.url}/tools/json-formatter`,
    images: [
      {
        url: `${siteConfig.url}/og-images/json-formatter.svg`,
        width: 1200,
        height: 630,
        alt: 'JSON Formatter & Validator Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Formatter & Validator - Free Online Tool',
    description: 'Format, validate, and beautify JSON instantly. Find errors, minify, and convert. Free and private.',
    images: [`${siteConfig.url}/og-images/json-formatter.svg`],
  },
  alternates: {
    canonical: `${siteConfig.url}/tools/json-formatter`,
  },
}

export const dynamic = 'force-static'

export default function JsonFormatterPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'JSON Formatter & Validator',
        url: `${siteConfig.url}/tools/json-formatter`,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: 'Free online JSON formatter and validator with syntax highlighting.',
        dateModified: lastModified.toISOString(),
        featureList: [
          'Format and beautify JSON',
          'Validate JSON syntax',
          'Minify JSON',
          'Tree view visualization',
          'Error detection with line numbers',
          'Sort object keys alphabetically',
          'Copy and download',
          'Works offline',
          'No data collection'
        ],
        browserRequirements: 'Requires JavaScript. Works in modern browsers (Chrome, Firefox, Safari, Edge).',
      },
      {
        '@type': 'HowTo',
        name: 'How to Format JSON',
        description: 'Format and validate JSON data',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Paste JSON',
            text: 'Paste or type your JSON data into the editor',
          },
          {
            '@type': 'HowToStep',
            name: 'Auto Validation',
            text: 'See validation errors highlighted in real-time',
          },
          {
            '@type': 'HowToStep',
            name: 'Format or Minify',
            text: 'Click Format to beautify or Minify to compress',
          },
          {
            '@type': 'HowToStep',
            name: 'Copy or Download',
            text: 'Copy the formatted JSON or download as a file',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is JSON?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'JSON (JavaScript Object Notation) is a lightweight data interchange format that is easy for humans to read and write, and easy for machines to parse and generate. It is commonly used for transmitting data in web applications.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I validate JSON?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Paste your JSON into the editor and it will automatically validate. Any syntax errors will be highlighted with the line number and error message displayed below the controls.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is my JSON data saved or sent to a server?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. All JSON processing happens locally in your browser. Your data never leaves your device and is not saved anywhere, ensuring complete privacy.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between formatting and minifying?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Formatting (beautifying) adds proper indentation and line breaks to make JSON human-readable. Minifying removes all whitespace and line breaks to make the file smaller for transmission.',
            },
          },
          {
            '@type': 'Question',
            name: 'What does "Sort Keys" do?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Sort Keys arranges all object properties alphabetically by key name, making it easier to compare JSON files or maintain consistent formatting across your project.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is tree view?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Tree view displays your JSON data in a hierarchical, collapsible structure that makes it easy to navigate and understand complex nested objects and arrays.',
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
            name: 'JSON Formatter',
            item: `${siteConfig.url}/tools/json-formatter`,
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
          <span className="text-gray-900 dark:text-gray-100 font-medium" aria-current="page">JSON Formatter</span>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
            <span className="text-2xl">{'{ }'}</span>
            <span>JSON Formatter & Validator</span>
          </h1>
          <p className="text-muted-foreground">
            Format, validate, and beautify JSON online. Find errors, minify, and visualize in tree view.
          </p>
        </div>

        {/* Tool Component */}
        <JsonFormatter />

        {/* Common JSON Errors */}
        <Card className="mt-16">
          <CardHeader>
            <CardTitle className="text-2xl">Common JSON Errors & Fixes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">1. Trailing Commas</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-red-600 dark:text-red-400 mb-2">❌ Invalid</p>
                  <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto">
{`{
  "name": "John",
  "age": 30,
}`}
                  </pre>
                </div>
                <div>
                  <p className="text-sm text-green-600 dark:text-green-400 mb-2">✅ Valid</p>
                  <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto">
{`{
  "name": "John",
  "age": 30
}`}
                  </pre>
                </div>
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">2. Single Quotes Instead of Double</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-red-600 dark:text-red-400 mb-2">❌ Invalid</p>
                  <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto">
{`{
  'name': 'John'
}`}
                  </pre>
                </div>
                <div>
                  <p className="text-sm text-green-600 dark:text-green-400 mb-2">✅ Valid</p>
                  <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto">
{`{
  "name": "John"
}`}
                  </pre>
                </div>
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">3. Missing Closing Brackets</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-red-600 dark:text-red-400 mb-2">❌ Invalid</p>
                  <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto">
{`{
  "name": "John"`}
                  </pre>
                </div>
                <div>
                  <p className="text-sm text-green-600 dark:text-green-400 mb-2">✅ Valid</p>
                  <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto">
{`{
  "name": "John"
}`}
                  </pre>
                </div>
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">4. Unescaped Quotes in Strings</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-red-600 dark:text-red-400 mb-2">❌ Invalid</p>
                  <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto">
{`{
  "text": "He said "hello""
}`}
                  </pre>
                </div>
                <div>
                  <p className="text-sm text-green-600 dark:text-green-400 mb-2">✅ Valid</p>
                  <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto">
{`{
  "text": "He said \\"hello\\""
}`}
                  </pre>
                </div>
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">5. Comments (Not Allowed)</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-red-600 dark:text-red-400 mb-2">❌ Invalid</p>
                  <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto">
{`{
  // This is a comment
  "name": "John"
}`}
                  </pre>
                </div>
                <div>
                  <p className="text-sm text-green-600 dark:text-green-400 mb-2">✅ Valid</p>
                  <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto">
{`{
  "name": "John"
}`}
                  </pre>
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
                <h3 className="font-semibold">🔌 API Development</h3>
                <p className="text-sm text-muted-foreground">
                  Test and format API responses to ensure proper JSON structure.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">⚙️ Configuration Files</h3>
                <p className="text-sm text-muted-foreground">
                  Validate and beautify config.json files for your applications.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">🐛 Debugging</h3>
                <p className="text-sm text-muted-foreground">
                  Find syntax errors quickly with line-by-line validation.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">📖 Code Review</h3>
                <p className="text-sm text-muted-foreground">
                  Beautify minified JSON for easier code review and understanding.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">📚 Learning</h3>
                <p className="text-sm text-muted-foreground">
                  Understand JSON structure with tree view visualization.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">🔄 Data Migration</h3>
                <p className="text-sm text-muted-foreground">
                  Validate JSON data before importing into databases or systems.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">📝 Documentation</h3>
                <p className="text-sm text-muted-foreground">
                  Create clean, formatted JSON examples for technical documentation.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">🎨 Data Visualization</h3>
                <p className="text-sm text-muted-foreground">
                  Use tree view to explore complex nested data structures.
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
                <strong className="text-foreground">Paste your JSON</strong> - Copy and paste JSON data into the input editor
              </li>
              <li>
                <strong className="text-foreground">See validation results</strong> - Errors are shown immediately with line numbers
              </li>
              <li>
                <strong className="text-foreground">Format or minify</strong> - Click Format to beautify or Minify to compress
              </li>
              <li>
                <strong className="text-foreground">Choose view mode</strong> - Switch between formatted, minified, or tree view
              </li>
              <li>
                <strong className="text-foreground">Copy or download</strong> - Copy to clipboard or download as .json file
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
                <h3 className="font-semibold">✅ Real-time Validation</h3>
                <p className="text-sm text-muted-foreground">
                  Instant syntax validation with detailed error messages and line numbers.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">🎨 Format & Beautify</h3>
                <p className="text-sm text-muted-foreground">
                  Make JSON readable with proper indentation (2 or 4 spaces).
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">📦 Minify</h3>
                <p className="text-sm text-muted-foreground">
                  Remove whitespace to reduce file size for production use.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">🌲 Tree View</h3>
                <p className="text-sm text-muted-foreground">
                  Visualize nested structures with collapsible tree hierarchy.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">🔤 Sort Keys</h3>
                <p className="text-sm text-muted-foreground">
                  Alphabetically sort object keys for consistent formatting.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">💾 Download</h3>
                <p className="text-sm text-muted-foreground">
                  Save formatted or minified JSON as a .json file.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">🔒 Privacy First</h3>
                <p className="text-sm text-muted-foreground">
                  All processing happens in your browser. No server uploads.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">⚡ Zero Dependencies</h3>
                <p className="text-sm text-muted-foreground">
                  Uses native JSON API for lightning-fast performance.
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
              <h3 className="font-semibold text-lg mb-2">What is JSON?</h3>
              <p className="text-muted-foreground leading-relaxed">
                JSON (JavaScript Object Notation) is a lightweight data interchange format that is easy for humans to read and write, and easy for machines to parse and generate. It is commonly used for transmitting data in web applications, storing configuration files, and exchanging data between servers and clients.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">How do I validate JSON?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Simply paste your JSON into the input editor and it will automatically validate. Any syntax errors will be highlighted immediately with the exact line and column number where the error occurred, along with a description of what went wrong.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">Is my JSON data saved or sent to a server?</h3>
              <p className="text-muted-foreground leading-relaxed">
                No. All JSON processing happens entirely in your browser using JavaScript. Your data never leaves your device, is not sent to any server, and is not saved anywhere. This ensures complete privacy and security of your data.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">What is the difference between formatting and minifying?</h3>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Formatting (beautifying)</strong> adds proper indentation and line breaks to make JSON human-readable and easier to understand. <strong>Minifying</strong> removes all whitespace and line breaks to make the file as small as possible, which is useful for reducing bandwidth when transmitting data.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">What does &quot;Sort Keys&quot; do?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Sort Keys arranges all object properties alphabetically by key name throughout your entire JSON structure. This is useful for comparing JSON files, maintaining consistent formatting across your project, or making diffs easier to read in version control.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">What is tree view?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Tree view displays your JSON data in a hierarchical, collapsible structure similar to a file explorer. You can expand and collapse objects and arrays to navigate complex nested data structures more easily. Values are color-coded by type (strings, numbers, booleans, null).
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
              <Link href="/tools/markdown-to-html" className="p-4 border-2 rounded-lg hover:border-blue-500 transition-colors">
                <div className="text-3xl mb-2">📄</div>
                <h3 className="font-semibold">Markdown to HTML</h3>
                <p className="text-sm text-muted-foreground">Convert Markdown to HTML</p>
              </Link>
              <Link href="/tools/word-counter" className="p-4 border-2 rounded-lg hover:border-blue-500 transition-colors">
                <div className="text-3xl mb-2">📝</div>
                <h3 className="font-semibold">Word Counter</h3>
                <p className="text-sm text-muted-foreground">Count words and characters</p>
              </Link>
              <Link href="/tools/text-diff-checker" className="p-4 border-2 rounded-lg hover:border-blue-500 transition-colors">
                <div className="text-3xl mb-2">🔍</div>
                <h3 className="font-semibold">Text Diff Checker</h3>
                <p className="text-sm text-muted-foreground">Compare two texts</p>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

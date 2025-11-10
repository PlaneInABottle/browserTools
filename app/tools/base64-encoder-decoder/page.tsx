import type { Metadata } from 'next'
import Link from 'next/link'
import Base64EncoderDecoder from '@/components/tools/Base64EncoderDecoder'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { siteConfig } from '@/lib/config/site'
import { getToolPageLastModified } from '@/lib/utils/git-dates'

const lastModified = getToolPageLastModified('base64-encoder-decoder')

export const metadata: Metadata = {
  title: 'Base64 Encoder/Decoder - Free Online Base64 Converter | Toolympics',
  description: 'Free online Base64 encoder and decoder. Convert text to Base64 and decode Base64 back to text instantly. Supports file uploads, works offline, no data collection.',
  keywords: [
    'base64 encoder',
    'base64 decoder',
    'base64 converter',
    'text to base64',
    'base64 to text',
    'base64 encode',
    'base64 decode',
    'online base64 tool',
    'free base64 converter',
    'base64 file encoder',
    'base64 text converter',
    'base64 utility',
    'base64 encoding',
    'base64 decoding',
    'web base64 tool',
  ],
  openGraph: {
    title: 'Base64 Encoder/Decoder - Free Online Base64 Converter',
    description: 'Convert text to Base64 and decode Base64 back to text instantly. Free, fast, and completely private.',
    type: 'website',
    url: `${siteConfig.url}/tools/base64-encoder-decoder`,
    images: [
      {
        url: `${siteConfig.url}/og-images/base64-encoder-decoder.svg`,
        width: 1200,
        height: 630,
        alt: 'Base64 Encoder/Decoder Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Base64 Encoder/Decoder - Free Online Base64 Converter',
    description: 'Convert text to Base64 and decode Base64 back to text instantly. Free, fast, and completely private.',
    images: [`${siteConfig.url}/og-images/base64-encoder-decoder.svg`],
  },
  alternates: {
    canonical: `${siteConfig.url}/tools/base64-encoder-decoder`,
  },
}

export const dynamic = 'force-static'

export default function Base64EncoderDecoderPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Base64 Encoder/Decoder',
        url: `${siteConfig.url}/tools/base64-encoder-decoder`,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: 'Free online Base64 encoder and decoder. Convert text to Base64 and decode Base64 back to text instantly with file upload support.',
        dateModified: lastModified.toISOString(),
        featureList: [
          'Text to Base64 encoding',
          'Base64 to text decoding',
          'File upload support',
          'Unicode text support',
          'Copy to clipboard',
          'Real-time conversion',
          'Error validation',
          'Works offline',
          'No data collection',
        ],
        browserRequirements: 'Requires JavaScript. Works in modern browsers (Chrome, Firefox, Safari, Edge).',
      },
      {
        '@type': 'HowTo',
        name: 'How to Encode and Decode Base64',
        description: 'Learn how to convert text to Base64 and decode Base64 back to text',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Choose Operation Mode',
            text: 'Select "Encode to Base64" to convert text to Base64, or "Decode from Base64" to convert Base64 back to text.',
          },
          {
            '@type': 'HowToStep',
            name: 'Enter Your Data',
            text: 'Type your text or Base64 string in the input area, or upload a file to encode its contents.',
          },
          {
            '@type': 'HowToStep',
            name: 'View Results',
            text: 'The converted result appears automatically in the output area below.',
          },
          {
            '@type': 'HowToStep',
            name: 'Copy Result',
            text: 'Click the copy button to copy the result to your clipboard.',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is Base64 encoding?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. It\'s commonly used to encode data for transmission over text-based protocols like HTTP, and for embedding binary data in text formats like JSON or HTML.',
            },
          },
          {
            '@type': 'Question',
            name: 'When should I use Base64 encoding?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Base64 encoding is useful when you need to transmit binary data over text-only channels, embed images in CSS/HTML, send binary data in JSON APIs, or store binary data in databases that expect text. It\'s also used for basic obfuscation of data.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is my data safe and private?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! All encoding and decoding happens in your browser using JavaScript. Your data never leaves your device and is not sent to any servers. The tool works completely offline after the initial page load.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does it support Unicode characters?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, the tool properly handles Unicode characters by using UTF-8 encoding/decoding. This ensures that text with special characters, emojis, and international text is correctly converted to and from Base64.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I upload files to encode?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, you can upload files to encode them to Base64. The tool supports any file type and will convert the binary data to a Base64 string. Note that very large files may impact browser performance.',
            },
          },
          {
            '@type': 'Question',
            name: 'What happens if I enter invalid Base64?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The tool will display an error message indicating that the Base64 string is invalid. It validates the input and provides clear feedback when decoding fails.',
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
            name: 'Base64 Encoder/Decoder',
            item: `${siteConfig.url}/tools/base64-encoder-decoder`,
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
          <span className="text-gray-900 dark:text-gray-100 font-medium" aria-current="page">Base64 Encoder/Decoder</span>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
            <span>🔄</span>
            <span>Base64 Encoder/Decoder</span>
          </h1>
          <p className="text-muted-foreground">
            Convert text to Base64 and decode Base64 back to text instantly. Supports file uploads and works completely offline.
          </p>
        </div>

        {/* Tool Component */}
        <Base64EncoderDecoder />

        {/* Features */}
        <Card className="mt-16">
          <CardHeader>
            <CardTitle className="text-2xl">Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-semibold">🔄 Bidirectional Conversion</h3>
                <p className="text-sm text-muted-foreground">
                  Easily switch between encoding text to Base64 and decoding Base64 back to text with a simple tab interface.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">📁 File Upload Support</h3>
                <p className="text-sm text-muted-foreground">
                  Upload any file to encode its binary contents to Base64, perfect for embedding images or other data.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">🌐 Unicode Support</h3>
                <p className="text-sm text-muted-foreground">
                  Properly handles Unicode characters, emojis, and international text using UTF-8 encoding/decoding.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">⚡ Real-time Processing</h3>
                <p className="text-sm text-muted-foreground">
                  See results instantly as you type, with immediate validation and error feedback.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">📋 Copy to Clipboard</h3>
                <p className="text-sm text-muted-foreground">
                  One-click copying of encoded or decoded results to your clipboard for easy use elsewhere.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">🔒 100% Private</h3>
                <p className="text-sm text-muted-foreground">
                  All processing happens in your browser. No data is sent to servers or stored anywhere.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What is Base64 */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">What is Base64?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format using 64 different characters.
                It&apos;s commonly used to encode data for transmission over text-based protocols and for embedding binary data in text formats.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p className="font-mono text-sm mb-2">Example:</p>
                <p className="font-mono text-sm">Text: &quot;Hello World&quot;</p>
                <p className="font-mono text-sm">Base64: &quot;SGVsbG8gV29ybGQ=&quot;</p>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-lg mb-3">Common Use Cases</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span><strong>Web Development:</strong> Embedding images in CSS/HTML using data URLs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span><strong>API Communication:</strong> Sending binary data in JSON or XML formats</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span><strong>Email Attachments:</strong> Encoding binary files for text-based email protocols</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span><strong>Data Storage:</strong> Storing binary data in databases that expect text</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span><strong>Basic Obfuscation:</strong> Simple encoding for basic data protection</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* How to Use */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">How to Use Base64 Encoder/Decoder</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-3 text-muted-foreground leading-relaxed">
              <li>
                <strong className="text-foreground">Select operation mode:</strong> Choose &quot;Encode to Base64&quot; to convert text to Base64, or &quot;Decode from Base64&quot; to convert Base64 back to text.
              </li>
              <li>
                <strong className="text-foreground">Enter your data:</strong> Type your text or Base64 string in the input area, or click &quot;Upload File&quot; to encode a file&apos;s contents.
              </li>
              <li>
                <strong className="text-foreground">View the result:</strong> The converted output appears automatically in the result area below.
              </li>
              <li>
                <strong className="text-foreground">Copy the result:</strong> Click the &quot;Copy&quot; button to copy the encoded or decoded text to your clipboard.
              </li>
              <li>
                <strong className="text-foreground">Clear when done:</strong> Use the &quot;Clear&quot; button to reset the tool for new conversions.
              </li>
            </ol>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">What is Base64 encoding?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Base64 is a binary-to-text encoding scheme that converts binary data into a text format using 64 different ASCII characters.
                It&apos;s designed to safely transmit binary data over text-based communication channels and is commonly used in web development, email, and APIs.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">When should I use Base64 encoding?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Base64 encoding is useful when you need to transmit binary data over text-only protocols, embed binary content in text formats like JSON or HTML,
                or store binary data in text-based databases.                 It&apos;s also commonly used for data URLs in web development.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">Is my data safe and private?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Absolutely! All Base64 encoding and decoding happens entirely in your browser using JavaScript. Your data never leaves your device,
                is never sent to any servers, and works completely offline after the initial page load.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">Does it support Unicode and special characters?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Yes, the tool properly handles Unicode characters, emojis, and international text by using UTF-8 encoding and decoding.
                This ensures that all text, regardless of language or special characters, is correctly converted.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">Can I encode files to Base64?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Yes! You can upload any file type and the tool will encode its binary contents to Base64. This is particularly useful for
                embedding images in CSS/HTML or sending binary data through text-based APIs. Note that very large files may affect browser performance.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">What happens with invalid Base64 input?</h3>
              <p className="text-muted-foreground leading-relaxed">
                The tool validates Base64 input and will display a clear error message if the input is not valid Base64 format.
                This helps you identify and correct any issues with your Base64 strings before attempting to decode them.
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
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/tools/json-formatter" className="p-4 border rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                <div className="text-3xl mb-2">🔧</div>
                <h3 className="font-semibold">JSON Formatter</h3>
                <p className="text-sm text-muted-foreground">Format and validate JSON data</p>
              </Link>
              <Link href="/tools/markdown-to-html" className="p-4 border rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                <div className="text-3xl mb-2">📄</div>
                <h3 className="font-semibold">Markdown to HTML</h3>
                <p className="text-sm text-muted-foreground">Convert Markdown to HTML</p>
              </Link>
              <Link href="/tools/case-converter" className="p-4 border rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                <div className="text-3xl mb-2">🔄</div>
                <h3 className="font-semibold">Case Converter</h3>
                <p className="text-sm text-muted-foreground">Convert text case formats</p>
              </Link>
              <Link href="/tools/text-diff-checker" className="p-4 border rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
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
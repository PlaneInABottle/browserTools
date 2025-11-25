import type { Metadata } from 'next'
import Link from 'next/link'
import UrlEncoderDecoder from '@/components/tools/UrlEncoderDecoder'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { siteConfig } from '@/lib/config/site'
import { getToolPageLastModified } from '@/lib/utils/git-dates'

const lastModified = getToolPageLastModified('url-encoder-decoder')

export const metadata: Metadata = {
  title: 'URL Encoder/Decoder - Free Online URL Converter | Toolympics',
  description: 'Free online URL encoder and decoder. Encode and decode URLs, parse query parameters, validate URLs, and build URLs from components. Works offline, no data collection.',
  keywords: [
    'url encoder',
    'url decoder',
    'url encode online',
    'url decode online',
    'uri encoder',
    'uri decoder',
    'percent encoding',
    'query string parser',
    'url parameter parser',
    'url validator',
    'url checker',
    'validate url',
    'url builder',
    'build url',
    'encode uri component',
    'decode uri component',
    'free url encoder',
  ],
  openGraph: {
    title: 'URL Encoder/Decoder - Free Online URL Converter',
    description: 'Encode and decode URLs, parse query parameters, validate URLs, and build URLs. Free, fast, and completely private.',
    type: 'website',
    url: `${siteConfig.url}/tools/url-encoder-decoder`,
    images: [
      {
        url: `${siteConfig.url}/og-images/url-encoder-decoder.svg`,
        width: 1200,
        height: 630,
        alt: 'URL Encoder/Decoder Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'URL Encoder/Decoder - Free Online URL Converter',
    description: 'Encode and decode URLs, parse query parameters, validate URLs, and build URLs. Free, fast, and completely private.',
    images: [`${siteConfig.url}/og-images/url-encoder-decoder.svg`],
  },
  alternates: {
    canonical: `${siteConfig.url}/tools/url-encoder-decoder`,
  },
}

export const dynamic = 'force-static'

export default function UrlEncoderDecoderPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'URL Encoder/Decoder',
        url: `${siteConfig.url}/tools/url-encoder-decoder`,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: 'Free online URL encoder and decoder with query parameter parsing, URL validation, and URL building capabilities.',
        dateModified: lastModified.toISOString(),
        featureList: [
          'URL encoding (encodeURIComponent)',
          'URL decoding (decodeURIComponent)',
          'Query parameter parsing',
          'URL validation',
          'URL building from components',
          'Real-time conversion',
          'Copy to clipboard',
          'Works offline',
          'No data collection',
        ],
        browserRequirements: 'Requires JavaScript. Works in modern browsers (Chrome, Firefox, Safari, Edge).',
      },
      {
        '@type': 'HowTo',
        name: 'How to Encode and Decode URLs',
        description: 'Learn how to encode and decode URLs, parse query parameters, and validate URLs',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Choose Operation',
            text: 'Select "Encode URL" to convert text to URL-encoded format, or "Decode URL" to convert URL-encoded text back to plain text.',
          },
          {
            '@type': 'HowToStep',
            name: 'Enter Your Data',
            text: 'Type your text or URL-encoded string in the input area.',
          },
          {
            '@type': 'HowToStep',
            name: 'View Results',
            text: 'The converted result appears automatically in the output area below.',
          },
          {
            '@type': 'HowToStep',
            name: 'Use Additional Tools',
            text: 'Expand the Query Parser, URL Validator, or URL Builder sections for additional URL utilities.',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is URL encoding?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'URL encoding (also called percent encoding) converts characters into a format that can be safely transmitted over the internet. Special characters are replaced with a % followed by two hexadecimal digits. For example, a space becomes %20.',
            },
          },
          {
            '@type': 'Question',
            name: 'When should I use URL encoding?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'URL encoding is essential when passing data in URLs, especially in query parameters. Use it when your data contains spaces, special characters (#, ?, &, =), or non-ASCII characters like accented letters or emojis.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is my data safe and private?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! All encoding, decoding, parsing, and validation happens entirely in your browser using JavaScript. Your data never leaves your device and is not sent to any servers. The tool works completely offline after the initial page load.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does it support Unicode characters?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, the tool properly handles Unicode characters including emojis, accented letters, and international text. The encodeURIComponent function correctly encodes all UTF-8 characters.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between URL encoding and Base64?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'URL encoding is designed specifically for URLs and only encodes characters that are unsafe in URLs. Base64 is a binary-to-text encoding that converts any data to a different character set. Use URL encoding for query parameters and path segments; use Base64 for binary data.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I parse query parameters from a URL?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! Use the Query Parameter Parser section to extract and decode all query parameters from a URL. It displays them in a table and allows you to copy individual parameters or export all as JSON.',
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
            name: 'URL Encoder/Decoder',
            item: `${siteConfig.url}/tools/url-encoder-decoder`,
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
          <span className="text-gray-900 dark:text-gray-100 font-medium" aria-current="page">URL Encoder/Decoder</span>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
            <span>🔗</span>
            <span>URL Encoder/Decoder</span>
          </h1>
          <p className="text-muted-foreground">
            Encode and decode URLs, parse query parameters, validate URLs, and build URLs from components. Works completely offline.
          </p>
        </div>

        {/* Tool Component */}
        <UrlEncoderDecoder />

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
                  Easily switch between encoding text to URL format and decoding URL-encoded text with a simple tab interface.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">🔍 Query Parameter Parser</h3>
                <p className="text-sm text-muted-foreground">
                  Extract and decode query parameters from URLs. View them in a table and copy individual or all parameters as JSON.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">✅ URL Validator</h3>
                <p className="text-sm text-muted-foreground">
                  Validate URLs and see a breakdown of all components: protocol, hostname, port, path, query string, and hash.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">🔧 URL Builder</h3>
                <p className="text-sm text-muted-foreground">
                  Build URLs from components with a form-based interface. Add multiple query parameters and see the URL update in real-time.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">⚡ Real-time Processing</h3>
                <p className="text-sm text-muted-foreground">
                  See results instantly as you type, with immediate validation and error feedback for all operations.
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

        {/* What is URL Encoding */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">What is URL Encoding?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                URL encoding (also known as percent encoding) is a mechanism for encoding information in a Uniform Resource Identifier (URI).
                Characters that cannot be used in a URL are converted to a format that can be safely transmitted over the internet.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p className="font-mono text-sm mb-2">Examples:</p>
                <p className="font-mono text-sm">Text: &quot;hello world&quot;</p>
                <p className="font-mono text-sm mb-3">Encoded: &quot;hello%20world&quot;</p>
                <p className="font-mono text-sm">Text: &quot;user@example.com&quot;</p>
                <p className="font-mono text-sm">Encoded: &quot;user%40example.com&quot;</p>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-lg mb-3">Common Use Cases</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span><strong>Query Parameters:</strong> Encoding data passed in URL query strings (e.g., search terms, filters)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span><strong>API Requests:</strong> Safely passing parameters to REST APIs and web services</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span><strong>Form Data:</strong> Encoding form submissions sent via GET requests</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span><strong>Special Characters:</strong> Handling spaces, ampersands, equals signs, and other reserved characters</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span><strong>International Text:</strong> Encoding Unicode characters, emojis, and non-ASCII text</span>
                </li>
              </ul>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-lg mb-3">Reserved Characters</h3>
              <p className="text-muted-foreground mb-2">
                These characters have special meaning in URLs and should be encoded when used as data:
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p className="font-mono text-sm">
                  : / ? # [ ] @ ! $ & &apos; ( ) * + , ; =
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How to Use */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">How to Use URL Encoder/Decoder</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-3 text-muted-foreground leading-relaxed">
              <li>
                <strong className="text-foreground">Select operation:</strong> Choose &quot;Encode URL&quot; to convert text to URL-encoded format, or &quot;Decode URL&quot; to convert URL-encoded text back to plain text.
              </li>
              <li>
                <strong className="text-foreground">Enter your data:</strong> Type your text or URL-encoded string in the input area.
              </li>
              <li>
                <strong className="text-foreground">View the result:</strong> The converted output appears automatically in the result area below.
              </li>
              <li>
                <strong className="text-foreground">Use additional tools:</strong> Expand the Query Parameter Parser to extract parameters from URLs, the URL Validator to check URL structure, or the URL Builder to construct URLs from components.
              </li>
              <li>
                <strong className="text-foreground">Copy the result:</strong> Click the &quot;Copy&quot; button to copy results to your clipboard.
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
              <h3 className="font-semibold text-lg mb-2">What is URL encoding?</h3>
              <p className="text-muted-foreground leading-relaxed">
                URL encoding (percent encoding) converts characters into a format that can be safely transmitted in URLs.
                Special characters are replaced with a % sign followed by two hexadecimal digits representing the character&apos;s ASCII code.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">When should I use URL encoding?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Use URL encoding when passing data in URLs, especially in query parameters. It&apos;s essential when your data contains spaces,
                special characters (like #, ?, &, =), or non-ASCII characters like accented letters or emojis.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">Is my data safe and private?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Absolutely! All URL encoding, decoding, parsing, and validation happens entirely in your browser using JavaScript.
                Your data never leaves your device, is never sent to any servers, and works completely offline after the initial page load.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">Does it support Unicode and special characters?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Yes, the tool properly handles Unicode characters including emojis, accented letters, and international text.
                The encodeURIComponent function correctly encodes all UTF-8 characters for safe URL transmission.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">What&apos;s the difference between URL encoding and Base64?</h3>
              <p className="text-muted-foreground leading-relaxed">
                URL encoding is specifically designed for URLs and only encodes characters that are unsafe in URLs. Base64 is a
                binary-to-text encoding that converts any data to a different character set. Use URL encoding for query parameters
                and path segments; use Base64 for binary data or when you need to encode entire URLs.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">Can I parse query parameters from a URL?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Yes! Expand the &quot;Query Parameter Parser&quot; section to extract and decode all query parameters from a URL.
                It displays them in an easy-to-read table and allows you to copy individual parameters or export all of them as JSON.
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
              <Link href="/tools/base64-encoder-decoder" className="p-4 border rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                <div className="text-3xl mb-2">🔄</div>
                <h3 className="font-semibold">Base64 Encoder/Decoder</h3>
                <p className="text-sm text-muted-foreground">Convert text to Base64 and back</p>
              </Link>
              <Link href="/tools/json-formatter" className="p-4 border rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                <div className="text-3xl mb-2">{ }</div>
                <h3 className="font-semibold">JSON Formatter</h3>
                <p className="text-sm text-muted-foreground">Format and validate JSON data</p>
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

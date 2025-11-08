import type { Metadata } from 'next'
import Link from 'next/link'
import CaseConverter from '@/components/tools/CaseConverter'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { siteConfig } from '@/lib/config/site'
import { getToolPageLastModified } from '@/lib/utils/git-dates'

const lastModified = getToolPageLastModified('case-converter')

export const metadata: Metadata = {
  title: 'Case Converter - Free Text Case Conversion Online | Toolympics',
  description: 'Free online case converter tool. Convert text between uppercase, lowercase, title case, camelCase, snake_case, kebab-case, and more. Works offline, no data collection.',
  keywords: [
    'case converter',
    'text case converter',
    'uppercase converter',
    'lowercase converter',
    'title case converter',
    'camel case converter',
    'snake case converter',
    'kebab case converter',
    'text transformation',
    'case changer',
    'free case converter',
    'online case converter',
    'text formatter',
  ],
  openGraph: {
    title: 'Case Converter - Free Text Case Conversion Online',
    description: 'Convert text between different cases instantly. Free, fast, and completely private.',
    type: 'website',
    url: `${siteConfig.url}/tools/case-converter`,
    images: [
      {
        url: `${siteConfig.url}/og-images/case-converter.svg`,
        width: 1200,
        height: 630,
        alt: 'Case Converter Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Converter - Free Text Case Conversion Online',
    description: 'Convert text between different cases instantly. Free, fast, and completely private.',
    images: [`${siteConfig.url}/og-images/case-converter.svg`],
  },
  alternates: {
    canonical: `${siteConfig.url}/tools/case-converter`,
  },
}

export const dynamic = 'force-static'

export default function CaseConverterPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Case Converter',
        url: `${siteConfig.url}/tools/case-converter`,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: 'Free online case converter. Convert text between uppercase, lowercase, title case, camelCase, snake_case, kebab-case, and more.',
        dateModified: lastModified.toISOString(),
        featureList: [
          'Multiple case conversions',
          'Real-time text transformation',
          'Copy to clipboard',
          'Works offline',
          'No data collection',
          'Instant results'
        ],
        browserRequirements: 'Requires JavaScript. Works in modern browsers (Chrome, Firefox, Safari, Edge).',
      },
      {
        '@type': 'HowTo',
        name: 'How to Convert Text Case',
        description: 'Convert text between different case formats',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Enter Text',
            text: 'Type or paste your text into the input area',
          },
          {
            '@type': 'HowToStep',
            name: 'Select Case Type',
            text: 'Choose the desired case conversion (uppercase, lowercase, title case, etc.)',
          },
          {
            '@type': 'HowToStep',
            name: 'Copy Result',
            text: 'Copy the converted text to your clipboard',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What case conversions are supported?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'We support uppercase, lowercase, title case, sentence case, camelCase, PascalCase, snake_case, kebab-case, and alternating case.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is my text saved or collected?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. Everything runs in your browser. Your text never leaves your device and is not saved anywhere.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does it work offline?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! After loading the page once, you can use the case converter offline.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is camelCase?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'camelCase is a naming convention where the first word is lowercase and subsequent words start with uppercase letters, with no spaces or punctuation.',
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
            name: 'Case Converter',
            item: `${siteConfig.url}/tools/case-converter`,
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
          <span className="text-gray-900 dark:text-gray-100 font-medium" aria-current="page">Case Converter</span>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
            <span>🔄</span>
            <span>Case Converter</span>
          </h1>
          <p className="text-muted-foreground">
            Convert text between different cases instantly. Free, fast, and completely private.
          </p>
        </div>

        {/* Tool Component */}
        <CaseConverter />

        {/* Features */}
        <Card className="mt-16">
          <CardHeader>
            <CardTitle className="text-2xl">Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-semibold">🔄 Multiple Case Types</h3>
                <p className="text-sm text-muted-foreground">
                  Convert text to uppercase, lowercase, title case, sentence case, camelCase, PascalCase, snake_case, kebab-case, and alternating case.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">⚡ Real-time Conversion</h3>
                <p className="text-sm text-muted-foreground">
                  See your text transform instantly as you type. No need to click any buttons.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">📋 Copy to Clipboard</h3>
                <p className="text-sm text-muted-foreground">
                  One-click copying of converted text with visual feedback.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">🔒 100% Private</h3>
                <p className="text-sm text-muted-foreground">
                  Your text never leaves your browser. No servers, no tracking, no data collection.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">💾 Works Offline</h3>
                <p className="text-sm text-muted-foreground">
                  After first load, use the tool without an internet connection.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">📱 Mobile Friendly</h3>
                <p className="text-sm text-muted-foreground">
                  Responsive design that works perfectly on phones and tablets.
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
                <strong className="text-foreground">Type or paste your text</strong> into the input area above
              </li>
              <li>
                <strong className="text-foreground">Select a case type</strong> from the available options (uppercase, lowercase, title case, etc.)
              </li>
              <li>
                <strong className="text-foreground">View the converted text</strong> in the output area below
              </li>
              <li>
                <strong className="text-foreground">Copy the result</strong> using the &ldquo;Copy&rdquo; button
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
              <h3 className="font-semibold text-lg mb-2">What case conversions are supported?</h3>
              <p className="text-muted-foreground leading-relaxed">
                We support all major case types: uppercase, lowercase, title case, sentence case, camelCase, PascalCase, snake_case, kebab-case, and alternating case.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">What is the difference between camelCase and PascalCase?</h3>
              <p className="text-muted-foreground leading-relaxed">
                camelCase starts with a lowercase letter (e.g., &ldquo;camelCase&rdquo;), while PascalCase starts with an uppercase letter (e.g., &ldquo;PascalCase&rdquo;). Both join words without spaces.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">Is my text saved or collected?</h3>
              <p className="text-muted-foreground leading-relaxed">
                No. Everything runs in your browser. Your text never leaves your device and is not saved anywhere. We have no servers to store your data.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">Does it work offline?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Yes! After loading the page once, you can use the case converter offline. All processing happens locally in your browser.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">What is alternating case?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Alternating case alternates between uppercase and lowercase letters (e.g., &ldquo;AlTeRnAtInG cAsE&rdquo;). This is sometimes called &ldquo;sponge case&rdquo; or &ldquo;mocking text.&rdquo;
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Related Tools */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">More Text Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/tools/word-counter" className="p-4 border rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                <div className="text-3xl mb-2">📝</div>
                <h3 className="font-semibold">Word Counter</h3>
                <p className="text-sm text-muted-foreground">Count words, characters, and reading time</p>
              </Link>
              <Link href="/tools/text-diff-checker" className="p-4 border rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                <div className="text-3xl mb-2">🔍</div>
                <h3 className="font-semibold">Text Diff Checker</h3>
                <p className="text-sm text-muted-foreground">Compare two texts side-by-side</p>
              </Link>
              <Link href="/tools/markdown-to-html" className="p-4 border rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                <div className="text-3xl mb-2">📄</div>
                <h3 className="font-semibold">Markdown to HTML</h3>
                <p className="text-sm text-muted-foreground">Convert Markdown to HTML</p>
              </Link>
              <Link href="/tools/json-formatter" className="p-4 border rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                <div className="text-3xl mb-2">{`{ }`}</div>
                <h3 className="font-semibold">JSON Formatter</h3>
                <p className="text-sm text-muted-foreground">Format and validate JSON</p>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
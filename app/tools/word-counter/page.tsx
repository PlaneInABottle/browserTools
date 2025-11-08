import type { Metadata } from 'next'
import Link from 'next/link'
import WordCounter from '@/components/tools/WordCounter'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { siteConfig } from '@/lib/config/site'
import { getToolPageLastModified } from '@/lib/utils/git-dates'

const lastModified = getToolPageLastModified('word-counter')

export const metadata: Metadata = {
  title: 'Word Counter - Free Character & Sentence Counter Online | Toolympics',
  description: 'Free online word counter tool. Count words, characters, sentences, paragraphs, and get reading time estimates instantly. Works offline, no data collection.',
  keywords: [
    'word counter',
    'character counter',
    'word count tool',
    'character count',
    'sentence counter',
    'paragraph counter',
    'reading time calculator',
    'free word counter',
    'online word counter',
    'text analyzer',
    'text statistics',
    'keyword density',
  ],
  openGraph: {
    title: 'Word Counter - Free Character & Sentence Counter Online',
    description: 'Count words, characters, sentences instantly. Free, fast, and completely private.',
    type: 'website',
    url: `${siteConfig.url}/tools/word-counter`,
    images: [
      {
        url: `${siteConfig.url}/og-images/word-counter.svg`,
        width: 1200,
        height: 630,
        alt: 'Word Counter Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Word Counter - Free Character & Sentence Counter Online',
    description: 'Count words, characters, sentences instantly. Free, fast, and completely private.',
    images: [`${siteConfig.url}/og-images/word-counter.svg`],
  },
  alternates: {
    canonical: `${siteConfig.url}/tools/word-counter`,
  },
}

export const dynamic = 'force-static'

export default function WordCounterPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Word Counter',
        url: `${siteConfig.url}/tools/word-counter`,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: 'Free online word counter. Count words, characters, sentences, and get reading time estimates.',
        dateModified: lastModified.toISOString(),
        featureList: [
          'Real-time word counting',
          'Character count with and without spaces',
          'Sentence and paragraph counting',
          'Reading time estimation',
          'Speaking time estimation',
          'Keyword density analysis',
          'Works offline',
          'No data collection'
        ],
        browserRequirements: 'Requires JavaScript. Works in modern browsers (Chrome, Firefox, Safari, Edge).',
      },
      {
        '@type': 'HowTo',
        name: 'How to Count Words',
        description: 'Count words and analyze text statistics',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Enter Text',
            text: 'Type or paste your text into the text area',
          },
          {
            '@type': 'HowToStep',
            name: 'View Statistics',
            text: 'See real-time word count, character count, and other statistics',
          },
          {
            '@type': 'HowToStep',
            name: 'Analyze Results',
            text: 'Review reading time, keyword density, and other metrics',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How accurate is the word counter?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Very accurate. Words are counted by splitting text on whitespace and filtering empty strings. This matches standard word processing software counting methods.',
            },
          },
          {
            '@type': 'Question',
            name: 'How is reading time calculated?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Reading time is calculated using the average reading speed of 200 words per minute for adults. Speaking time uses 150 words per minute.',
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
              text: 'Yes! After loading the page once, you can use the word counter offline.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is keyword density?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Keyword density shows how often each word appears in your text. This helps identify the most frequently used words.',
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
            name: 'Word Counter',
            item: `${siteConfig.url}/tools/word-counter`,
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
          <span className="text-gray-900 dark:text-gray-100 font-medium" aria-current="page">Word Counter</span>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
            <span>📝</span>
            <span>Word Counter</span>
          </h1>
          <p className="text-muted-foreground">
            Count words, characters, sentences, and paragraphs instantly. Free, fast, and completely private.
          </p>
        </div>

        {/* Tool Component */}
        <WordCounter />

        {/* Features */}
        <Card className="mt-16">
          <CardHeader>
            <CardTitle className="text-2xl">Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-semibold">📊 Comprehensive Statistics</h3>
                <p className="text-sm text-muted-foreground">
                  Get detailed metrics including word count, character count (with and without spaces), sentences, paragraphs, and more.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">⚡ Real-time Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  See statistics update instantly as you type. No need to click any buttons.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">📖 Reading & Speaking Time</h3>
                <p className="text-sm text-muted-foreground">
                  Estimate how long it takes to read (200 wpm) or speak (150 wpm) your text.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">🔍 Keyword Density</h3>
                <p className="text-sm text-muted-foreground">
                  Discover the most frequently used words in your text, excluding common words.
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
                <strong className="text-foreground">Type or paste your text</strong> into the text area above
              </li>
              <li>
                <strong className="text-foreground">View real-time statistics</strong> as they update automatically
              </li>
              <li>
                <strong className="text-foreground">Copy statistics</strong> using the &ldquo;Copy Stats&rdquo; button to share or save them
              </li>
              <li>
                <strong className="text-foreground">Clear text</strong> with the &ldquo;Clear&rdquo; button when you&apos;re done
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
              <h3 className="font-semibold text-lg mb-2">How accurate is the word counter?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Very accurate. Words are counted by splitting text on whitespace and filtering empty strings. This matches standard word processing software counting methods.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">How is reading time calculated?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Reading time is calculated using the average reading speed of 200 words per minute for adults. Speaking time uses 150 words per minute. These are industry-standard rates.
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
                Yes! After loading the page once, you can use the word counter offline. All processing happens locally in your browser.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">What is keyword density?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Keyword density shows how often each word appears in your text. This helps identify the most frequently used words. We exclude common words like &ldquo;the&rdquo;, &ldquo;and&rdquo;, &ldquo;is&rdquo; to show you the most meaningful keywords.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">What&apos;s the difference between character count with and without spaces?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Character count includes all characters (letters, numbers, punctuation, and spaces). Character count without spaces excludes space characters, which is useful for platforms with character limits that don&apos;t count spaces.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Related Tools */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">More Text Tools Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border-2 border-dashed rounded-lg opacity-60">
                <div className="text-3xl mb-2 grayscale">🔄</div>
                <h3 className="font-semibold text-muted-foreground">Case Converter</h3>
                <p className="text-sm text-muted-foreground">Convert text between different cases</p>
              </div>
              <div className="p-4 border-2 border-dashed rounded-lg opacity-60">
                <div className="text-3xl mb-2 grayscale">📋</div>
                <h3 className="font-semibold text-muted-foreground">Text Diff Checker</h3>
                <p className="text-sm text-muted-foreground">Compare two texts side-by-side</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

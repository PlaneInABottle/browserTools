import type { Metadata } from 'next'
import Link from 'next/link'
import TextDiffChecker from '@/components/tools/TextDiffChecker'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { siteConfig } from '@/lib/config/site'

export const metadata: Metadata = {
  title: 'Text Diff Checker - Free Online Text Comparison Tool',
  description: 'Compare two texts and see differences highlighted. Free online diff checker with side-by-side view, word-level comparison, and download options. Works offline, no data collection.',
  keywords: [
    'text diff checker',
    'compare text',
    'text comparison',
    'diff tool',
    'text difference',
    'compare documents',
    'side by side comparison',
    'text compare online',
    'free diff checker',
    'code diff',
    'file comparison',
    'text analyzer',
  ],
  openGraph: {
    title: 'Text Diff Checker - Compare Texts Online',
    description: 'Compare two texts side-by-side and see differences highlighted. Free, fast, and completely private.',
    type: 'website',
    url: `${siteConfig.url}/tools/text-diff-checker`,
  },
  alternates: {
    canonical: `${siteConfig.url}/tools/text-diff-checker`,
    languages: {
      'en-US': `${siteConfig.url}/tools/text-diff-checker`,
    },
  },
}

export const dynamic = 'force-static'

export default function TextDiffCheckerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Text Diff Checker',
        url: `${siteConfig.url}/tools/text-diff-checker`,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: 'Free online text comparison tool. Compare two texts and see differences highlighted.',
        featureList: [
          'Side-by-side text comparison',
          'Character, word, and line-level diffs',
          'Syntax highlighting for differences',
          'Ignore case and whitespace options',
          'Download diff results',
          'Real-time comparison',
          'Works offline',
          'No data collection'
        ],
      },
      {
        '@type': 'HowTo',
        name: 'How to Compare Texts',
        description: 'Compare two texts and see the differences',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Enter First Text',
            text: 'Paste or type the original text in the left panel',
          },
          {
            '@type': 'HowToStep',
            name: 'Enter Second Text',
            text: 'Paste or type the modified text in the right panel',
          },
          {
            '@type': 'HowToStep',
            name: 'View Differences',
            text: 'See differences highlighted automatically - additions in green, deletions in red',
          },
          {
            '@type': 'HowToStep',
            name: 'Customize View',
            text: 'Toggle between character, word, or line-level comparison modes',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How does the text diff checker work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The tool uses a diff algorithm to compare two texts and identify differences. It highlights additions in green, deletions in red, and shows unchanged text normally. All processing happens in your browser.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between character, word, and line comparison?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Character-level shows exact character differences, word-level compares whole words, and line-level compares entire lines. Choose based on your needs - character for precise changes, word for readability, line for code comparison.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is my text saved or sent to a server?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. All text comparison happens locally in your browser. Your texts never leave your device and are not saved anywhere.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I compare code files?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! The diff checker works great for comparing code, configuration files, JSON, XML, or any text-based content.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I download the comparison results?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, you can download the diff results as a text file with additions and deletions clearly marked.',
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
            name: 'Text Diff Checker',
            item: `${siteConfig.url}/tools/text-diff-checker`,
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
          <span className="text-gray-900 dark:text-gray-100 font-medium" aria-current="page">Text Diff Checker</span>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
            <span>🔍</span>
            <span>Text Diff Checker</span>
          </h1>
          <p className="text-muted-foreground">
            Compare two texts side-by-side and see differences highlighted instantly. Free, fast, and completely private.
          </p>
        </div>

        {/* Tool Component */}
        <TextDiffChecker />

        {/* Use Cases */}
        <Card className="mt-16">
          <CardHeader>
            <CardTitle className="text-2xl">Use Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-semibold">💻 Code Review</h3>
                <p className="text-sm text-muted-foreground">
                  Compare code before and after changes to review modifications and spot bugs.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">📝 Document Editing</h3>
                <p className="text-sm text-muted-foreground">
                  See what changed between drafts and track document revisions.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">🌍 Translation Verification</h3>
                <p className="text-sm text-muted-foreground">
                  Compare original and translated text to verify accuracy.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">⚖️ Legal Documents</h3>
                <p className="text-sm text-muted-foreground">
                  Compare contract versions to identify changes and amendments.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">⚙️ Configuration Files</h3>
                <p className="text-sm text-muted-foreground">
                  Spot changes in config files between environments or versions.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">✍️ Proofreading</h3>
                <p className="text-sm text-muted-foreground">
                  Identify edits made by collaborators or editors.
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
                <strong className="text-foreground">Paste your texts</strong> - Enter the original text in the left panel and the modified text in the right panel
              </li>
              <li>
                <strong className="text-foreground">Choose comparison mode</strong> - Select character, word, or line-level comparison based on your needs
              </li>
              <li>
                <strong className="text-foreground">View differences</strong> - See additions highlighted in green and deletions in red automatically
              </li>
              <li>
                <strong className="text-foreground">Customize options</strong> - Toggle &ldquo;Ignore Case&rdquo; or &ldquo;Ignore Whitespace&rdquo; for more flexible comparison
              </li>
              <li>
                <strong className="text-foreground">Export results</strong> - Copy the diff to clipboard or download as a text file
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
                <h3 className="font-semibold">📊 Multiple Comparison Modes</h3>
                <p className="text-sm text-muted-foreground">
                  Choose between character, word, or line-level comparison for precise control.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">👁️ Two View Modes</h3>
                <p className="text-sm text-muted-foreground">
                  Switch between inline view and side-by-side view for easier comparison.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">🎨 Color-Coded Differences</h3>
                <p className="text-sm text-muted-foreground">
                  Additions in green, deletions in red for instant visual feedback.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">📈 Statistics Display</h3>
                <p className="text-sm text-muted-foreground">
                  See addition, deletion, and similarity percentages at a glance.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">⚙️ Flexible Options</h3>
                <p className="text-sm text-muted-foreground">
                  Ignore case sensitivity or whitespace differences when needed.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">💾 Export Options</h3>
                <p className="text-sm text-muted-foreground">
                  Copy to clipboard or download diff results as a text file.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">🔒 100% Private</h3>
                <p className="text-sm text-muted-foreground">
                  All comparison happens in your browser. No data sent to servers.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">📱 Mobile Friendly</h3>
                <p className="text-sm text-muted-foreground">
                  Responsive design works perfectly on phones and tablets.
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
              <h3 className="font-semibold text-lg mb-2">How does the text diff checker work?</h3>
              <p className="text-muted-foreground leading-relaxed">
                The tool uses a diff algorithm to compare two texts and identify differences. It highlights additions in green, deletions in red, and shows unchanged text normally. All processing happens in your browser, ensuring complete privacy.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">What is the difference between character, word, and line comparison?</h3>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Character-level</strong> shows exact character differences (best for small changes), <strong>word-level</strong> compares whole words (good for readability), and <strong>line-level</strong> compares entire lines (perfect for code comparison). Choose based on your specific needs.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">Is my text saved or sent to a server?</h3>
              <p className="text-muted-foreground leading-relaxed">
                No. All text comparison happens locally in your browser using JavaScript. Your texts never leave your device and are not saved anywhere. This ensures complete privacy and security.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">Can I compare code files?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Yes! The diff checker works great for comparing code, configuration files, JSON, XML, HTML, CSS, or any text-based content. Line-level comparison is particularly useful for code review.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">Can I download the comparison results?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Yes, you can download the diff results as a text file with additions marked with &ldquo;+&rdquo; and deletions marked with &ldquo;-&rdquo;. You can also copy the diff to your clipboard.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">What does &ldquo;Ignore Whitespace&rdquo; do?</h3>
              <p className="text-muted-foreground leading-relaxed">
                When enabled, the tool treats multiple spaces, tabs, and line breaks as a single space. This is useful when comparing code with different indentation styles or texts with formatting differences.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Related Tools */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">Related Text Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/tools/word-counter" className="p-4 border-2 rounded-lg hover:border-blue-500 transition-colors">
                <div className="text-3xl mb-2">📝</div>
                <h3 className="font-semibold">Word Counter</h3>
                <p className="text-sm text-muted-foreground">Count words, characters, and sentences</p>
              </Link>
              <div className="p-4 border-2 border-dashed rounded-lg opacity-60">
                <div className="text-3xl mb-2 grayscale">🔄</div>
                <h3 className="font-semibold text-muted-foreground">Case Converter</h3>
                <p className="text-sm text-muted-foreground">Convert text between different cases</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

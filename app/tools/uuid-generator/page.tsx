import type { Metadata } from 'next'
import Link from 'next/link'
import UUIDGenerator from '@/components/tools/UUIDGenerator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { siteConfig } from '@/lib/config/site'
import { getToolPageLastModified } from '@/lib/utils/git-dates'

const lastModified = getToolPageLastModified('uuid-generator')

export const metadata: Metadata = {
  title: 'UUID Generator - Free Online UUID Creator | Toolympics',
  description: 'Generate RFC 4122 compliant UUIDs instantly. Create single or batch UUIDs with multiple format options. Cryptographically secure, works offline, no data collection.',
  keywords: [
    'uuid generator',
    'guid generator',
    'unique identifier generator',
    'random uuid',
    'uuid v4 generator',
    'rfc 4122 uuid',
    'cryptographically secure uuid',
    'batch uuid generator',
    'uuid creator online',
    'free uuid generator',
    'online uuid maker',
    'uuid tool',
    'generate uuid',
    'uuid generator free',
    'random guid generator',
  ],
  openGraph: {
    title: 'UUID Generator - Free Online UUID Creator',
    description: 'Generate RFC 4122 compliant UUIDs instantly. Create single or batch UUIDs with multiple format options. Cryptographically secure and works offline.',
    type: 'website',
    url: `${siteConfig.url}/tools/uuid-generator`,
    images: [
      {
        url: `${siteConfig.url}/og-images/uuid-generator.svg`,
        width: 1200,
        height: 630,
        alt: 'UUID Generator Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UUID Generator - Free Online UUID Creator',
    description: 'Generate RFC 4122 compliant UUIDs instantly. Create single or batch UUIDs with multiple format options. Cryptographically secure and works offline.',
    images: [`${siteConfig.url}/og-images/uuid-generator.svg`],
  },
  alternates: {
    canonical: `${siteConfig.url}/tools/uuid-generator`,
  },
}

export const dynamic = 'force-static'

export default function UUIDGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'UUID Generator',
        url: `${siteConfig.url}/tools/uuid-generator`,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: 'Free online UUID generator. Create RFC 4122 compliant UUIDs with batch generation and multiple format options.',
        dateModified: lastModified.toISOString(),
        featureList: [
          'RFC 4122 v4 UUID generation',
          'Cryptographically secure random generation',
          'Batch generation (1-100 UUIDs)',
          'Multiple format options (standard, no-hyphens, uppercase, lowercase)',
          'UUID validation tool',
          'Export to JSON, CSV, or text',
          'Copy to clipboard functionality',
          'Works offline',
          'No data collection'
        ],
        browserRequirements: 'Requires JavaScript and crypto.getRandomValues() support. Works in modern browsers (Chrome, Firefox, Safari, Edge).',
      },
      {
        '@type': 'HowTo',
        name: 'How to Generate UUIDs',
        description: 'Learn how to generate unique identifiers for your applications',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Choose Format',
            text: 'Select your preferred UUID format (standard with hyphens, no hyphens, uppercase, or lowercase)',
          },
          {
            '@type': 'HowToStep',
            name: 'Set Batch Size',
            text: 'Choose how many UUIDs to generate (1-100) using the slider',
          },
          {
            '@type': 'HowToStep',
            name: 'Generate UUIDs',
            text: 'Click Generate to create cryptographically secure RFC 4122 v4 UUIDs',
          },
          {
            '@type': 'HowToStep',
            name: 'Copy or Export',
            text: 'Copy individual UUIDs or export the entire batch as JSON, CSV, or plain text',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is a UUID and why do I need one?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A UUID (Universally Unique Identifier) is a 128-bit number that uniquely identifies information in computer systems. UUIDs are essential for creating unique identifiers in databases, APIs, distributed systems, and anywhere you need to ensure uniqueness without coordination between systems.',
            },
          },
          {
            '@type': 'Question',
            name: 'Are the generated UUIDs truly random and secure?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, absolutely. The UUIDs are generated using the Web Crypto API\'s crypto.getRandomValues() function, which provides cryptographically secure random number generation. This is the same level of security used by banks and security systems.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between UUID versions?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'This generator creates RFC 4122 Version 4 UUIDs, which are randomly generated. Version 1 uses timestamp and MAC address, Version 3 and 5 use namespace hashing. Version 4 provides the highest entropy and is suitable for most applications.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does it work offline?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! After the initial page load, you can generate UUIDs completely offline. All generation happens in your browser using JavaScript and the Web Crypto API.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is my data safe and private?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Completely. All UUID generation happens client-side in your browser. No data is sent to servers, and we don\'t store or collect any information about the UUIDs you generate.',
            },
          },
          {
            '@type': 'Question',
            name: 'What format should I use for my application?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The standard format (with hyphens) is most common and widely supported. Use no-hyphens for compact storage, uppercase for legacy systems, and lowercase for modern web applications. All formats contain the same unique identifier.',
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
            name: 'UUID Generator',
            item: `${siteConfig.url}/tools/uuid-generator`,
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
          <span className="text-gray-900 dark:text-gray-100 font-medium" aria-current="page">UUID Generator</span>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
            <span>🆔</span>
            <span>UUID Generator</span>
          </h1>
          <p className="text-muted-foreground">
            Generate RFC 4122 compliant UUIDs instantly. Cryptographically secure, works offline.
          </p>
        </div>

        {/* Tool Component */}
        <UUIDGenerator />

        {/* Features */}
        <Card className="mt-16">
          <CardHeader>
            <CardTitle className="text-2xl">Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-semibold">🔐 Cryptographically Secure</h3>
                <p className="text-sm text-muted-foreground">
                  Uses crypto.getRandomValues() for true randomness, ensuring UUIDs are genuinely unpredictable and secure.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">📋 Batch Generation</h3>
                <p className="text-sm text-muted-foreground">
                  Generate up to 100 UUIDs at once with a single click. Perfect for populating databases or testing.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">🎯 Multiple Formats</h3>
                <p className="text-sm text-muted-foreground">
                  Choose from standard (with hyphens), compact (no hyphens), uppercase, or lowercase formats.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">📤 Export Options</h3>
                <p className="text-sm text-muted-foreground">
                  Export generated UUIDs as JSON arrays, CSV files, or plain text lists for easy integration.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">✅ UUID Validation</h3>
                <p className="text-sm text-muted-foreground">
                  Built-in validator to check if UUIDs conform to RFC 4122 standards and format requirements.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">🔒 100% Private</h3>
                <p className="text-sm text-muted-foreground">
                  All generation happens in your browser. No data is sent to servers, no UUIDs are stored anywhere.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How to Use */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">How to Generate UUIDs</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-3 text-muted-foreground leading-relaxed">
              <li>
                <strong className="text-foreground">Choose your format</strong> from the dropdown menu. Standard format (with hyphens) is recommended for most applications.
              </li>
              <li>
                <strong className="text-foreground">Set batch size</strong> using the slider if you need multiple UUIDs (1-100).
              </li>
              <li>
                <strong className="text-foreground">Enable auto-copy</strong> if you want UUIDs automatically copied to your clipboard.
              </li>
              <li>
                <strong className="text-foreground">Click Generate</strong> to create cryptographically secure RFC 4122 v4 UUIDs.
              </li>
              <li>
                <strong className="text-foreground">Copy or export</strong> the generated UUIDs using the buttons in the results section.
              </li>
            </ol>
          </CardContent>
        </Card>

        {/* UUID Standards */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">UUID Standards & Versions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-3">RFC 4122 Version 4 (Random)</h3>
              <p className="text-muted-foreground leading-relaxed mb-3">
                This generator creates Version 4 UUIDs, which are randomly generated using cryptographically secure random number generation.
                Version 4 UUIDs provide the highest entropy and are suitable for most applications requiring unique identifiers.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p className="font-mono text-sm">Format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Where each x is a hexadecimal digit (0-9, a-f). The version is indicated by the 4 in the 13th position.
                </p>
              </div>
            </div>

            <Separator />

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Other UUID Versions</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Version 1:</strong> Timestamp and MAC address based
                  </div>
                  <div>
                    <strong>Version 3:</strong> MD5 hash of namespace and name
                  </div>
                  <div>
                    <strong>Version 5:</strong> SHA-1 hash of namespace and name
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">When to Use UUIDs</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Database primary keys</li>
                  <li>• Distributed system identifiers</li>
                  <li>• API resource identifiers</li>
                  <li>• Session tokens</li>
                  <li>• File names (to avoid conflicts)</li>
                  <li>• User-generated content IDs</li>
                </ul>
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
              <h3 className="font-semibold text-lg mb-2">What is a UUID and why do I need one?</h3>
              <p className="text-muted-foreground leading-relaxed">
                A UUID (Universally Unique Identifier) is a 128-bit number that provides unique identification across space and time.
                UUIDs are essential for creating unique identifiers in distributed systems, databases, and applications where coordination between systems isn't possible.
                They're particularly useful for primary keys, API resources, and any scenario requiring guaranteed uniqueness.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">Are the generated UUIDs truly random and secure?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Absolutely. The UUIDs are generated using the Web Crypto API's crypto.getRandomValues() function, which provides cryptographically secure pseudorandom number generation.
                This is the same security level used by banks, password managers, and security-critical applications. The randomness is statistically indistinguishable from true randomness.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">What is the difference between UUID versions?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Version 4 UUIDs (generated here) are randomly generated and provide the highest entropy. Version 1 uses timestamp and MAC address (not recommended for privacy).
                Versions 3 and 5 use hashing of namespace identifiers and names, which are deterministic (same input always produces same UUID).
                Version 4 is recommended for most applications requiring unique identifiers.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">Does it work offline?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Yes! After the initial page load, you can generate UUIDs completely offline. All generation logic runs locally in your browser using JavaScript and the Web Crypto API.
                No internet connection is required once the page has loaded.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">Is my data safe and private?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Completely safe and private. All UUID generation happens client-side in your browser. No data is transmitted to servers, and we don't store, log, or collect any information about the UUIDs you generate.
                Your privacy is guaranteed - this is a fully client-side application.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">What format should I use for my application?</h3>
              <p className="text-muted-foreground leading-relaxed">
                The standard format (with hyphens) is most widely supported and recommended for most applications. Use no-hyphens for compact storage or when hyphens aren't allowed.
                Uppercase is sometimes required by legacy systems, while lowercase is standard for modern web applications. All formats contain the same unique identifier.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Related Tools */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">More Developer Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/tools/password-generator" className="p-4 border rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                <div className="text-3xl mb-2">🔐</div>
                <h3 className="font-semibold">Password Generator</h3>
                <p className="text-sm text-muted-foreground">Generate secure passwords</p>
              </Link>
              <Link href="/tools/json-formatter" className="p-4 border rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                <div className="text-3xl mb-2">{ }</div>
                <h3 className="font-semibold">JSON Formatter</h3>
                <p className="text-sm text-muted-foreground">Format and validate JSON</p>
              </Link>
              <div className="p-4 border-2 border-dashed rounded-lg opacity-60">
                <div className="text-3xl mb-2 grayscale">🔢</div>
                <h3 className="font-semibold text-muted-foreground">Base64 Encoder</h3>
                <p className="text-sm text-muted-foreground">Encode/decode Base64</p>
              </div>
              <div className="p-4 border-2 border-dashed rounded-lg opacity-60">
                <div className="text-3xl mb-2 grayscale">🔒</div>
                <h3 className="font-semibold text-muted-foreground">Hash Generator</h3>
                <p className="text-sm text-muted-foreground">Generate file hashes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
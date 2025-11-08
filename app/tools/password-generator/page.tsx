import type { Metadata } from 'next'
import Link from 'next/link'
import PasswordGenerator from '@/components/tools/PasswordGenerator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { siteConfig } from '@/lib/config/site'
import { getToolPageLastModified } from '@/lib/utils/git-dates'

const lastModified = getToolPageLastModified('password-generator')

export const metadata: Metadata = {
  title: 'Password Generator - Free Secure Random Password Creator | Toolympics',
  description: 'Free online password generator. Create strong, secure passwords with customizable length and character options. Generate random passwords instantly, works offline, no data collection.',
  keywords: [
    'password generator',
    'secure password generator',
    'random password generator',
    'strong password creator',
    'password maker',
    'random password',
    'secure password',
    'password security',
    'password strength',
    'free password generator',
    'online password generator',
    'random password tool',
    'password generator online',
    'strong password generator',
  ],
  openGraph: {
    title: 'Password Generator - Free Secure Random Password Creator',
    description: 'Generate strong, secure passwords instantly. Customizable length, character options, and security features. Free, fast, and completely private.',
    type: 'website',
    url: `${siteConfig.url}/tools/password-generator`,
    images: [
      {
        url: `${siteConfig.url}/og-images/password-generator.svg`,
        width: 1200,
        height: 630,
        alt: 'Password Generator Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Password Generator - Free Secure Random Password Creator',
    description: 'Generate strong, secure passwords instantly. Customizable length, character options, and security features. Free, fast, and completely private.',
    images: [`${siteConfig.url}/og-images/password-generator.svg`],
  },
  alternates: {
    canonical: `${siteConfig.url}/tools/password-generator`,
  },
}

export const dynamic = 'force-static'

export default function PasswordGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Password Generator',
        url: `${siteConfig.url}/tools/password-generator`,
        applicationCategory: 'SecurityApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: 'Free online password generator. Create strong, secure passwords with customizable length and character options.',
        dateModified: lastModified.toISOString(),
        featureList: [
          'Cryptographically secure password generation',
          'Customizable password length (8-128 characters)',
          'Multiple character types (uppercase, lowercase, numbers, symbols)',
          'Password strength indicator',
          'Advanced security options',
          'Copy to clipboard',
          'Works offline',
          'No data collection'
        ],
        browserRequirements: 'Requires JavaScript. Works in modern browsers (Chrome, Firefox, Safari, Edge).',
      },
      {
        '@type': 'HowTo',
        name: 'How to Generate a Secure Password',
        description: 'Create strong, secure passwords for better online security',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Set Password Length',
            text: 'Choose your desired password length using the slider (recommended: 12-16 characters)',
          },
          {
            '@type': 'HowToStep',
            name: 'Select Character Types',
            text: 'Check the boxes for uppercase letters, lowercase letters, numbers, and symbols',
          },
          {
            '@type': 'HowToStep',
            name: 'Generate Password',
            text: 'Click the Generate button to create a secure random password',
          },
          {
            '@type': 'HowToStep',
            name: 'Copy and Use',
            text: 'Copy the generated password and use it for your accounts',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How secure are the generated passwords?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Very secure. Passwords are generated using cryptographically secure random number generation (crypto.getRandomValues) and include proper character distribution across all selected character types.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is my password saved or collected?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. Everything runs in your browser. Passwords are generated client-side and never leave your device. We have no servers to store your data.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does it work offline?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! After loading the page once, you can generate passwords offline. All processing happens locally in your browser.',
            },
          },
          {
            '@type': 'Question',
            name: 'What makes a password strong?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Strong passwords include a mix of uppercase and lowercase letters, numbers, and symbols. Longer passwords (12+ characters) are generally more secure than shorter ones.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I exclude certain characters?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. The advanced options allow you to exclude similar-looking characters (like 0 and O) and ambiguous characters to make passwords easier to read and type.',
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
            name: 'Password Generator',
            item: `${siteConfig.url}/tools/password-generator`,
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
          <span className="text-gray-900 dark:text-gray-100 font-medium" aria-current="page">Password Generator</span>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
            <span>🔐</span>
            <span>Password Generator</span>
          </h1>
          <p className="text-muted-foreground">
            Generate strong, secure passwords instantly. Customizable options for maximum security.
          </p>
        </div>

        {/* Tool Component */}
        <PasswordGenerator />

        {/* Features */}
        <Card className="mt-16">
          <CardHeader>
            <CardTitle className="text-2xl">Security Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-semibold">🔒 Cryptographically Secure</h3>
                <p className="text-sm text-muted-foreground">
                  Uses crypto.getRandomValues() for true randomness, not Math.random(). Every password is genuinely unpredictable.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">📏 Customizable Length</h3>
                <p className="text-sm text-muted-foreground">
                  Generate passwords from 8 to 128 characters. Longer passwords are more secure but harder to remember.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">🎯 Character Variety</h3>
                <p className="text-sm text-muted-foreground">
                  Mix uppercase letters, lowercase letters, numbers, and symbols for maximum password strength.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">📊 Strength Indicator</h3>
                <p className="text-sm text-muted-foreground">
                  Real-time feedback on password strength with color-coded visual indicators and security recommendations.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">🚫 Advanced Filtering</h3>
                <p className="text-sm text-muted-foreground">
                  Exclude similar-looking characters (0/O, 1/I/l) and ambiguous characters for better readability.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">🔒 100% Private</h3>
                <p className="text-sm text-muted-foreground">
                  Passwords are generated in your browser. No data is sent to servers, no passwords are stored anywhere.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How to Use */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">How to Generate Secure Passwords</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-3 text-muted-foreground leading-relaxed">
              <li>
                <strong className="text-foreground">Set password length</strong> using the slider (12-16 characters recommended for most security)
              </li>
              <li>
                <strong className="text-foreground">Select character types</strong> by checking the boxes for uppercase, lowercase, numbers, and symbols
              </li>
              <li>
                <strong className="text-foreground">Use advanced options</strong> to exclude similar characters if needed for readability
              </li>
              <li>
                <strong className="text-foreground">Click Generate</strong> to create a new secure password
              </li>
              <li>
                <strong className="text-foreground">Copy the password</strong> and use it immediately, or generate another one
              </li>
            </ol>
          </CardContent>
        </Card>

        {/* Password Security Tips */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">Password Security Best Practices</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">✅ Do's</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Use at least 12 characters</li>
                  <li>• Include uppercase and lowercase letters</li>
                  <li>• Add numbers and symbols</li>
                  <li>• Use unique passwords for each account</li>
                  <li>• Use a password manager</li>
                  <li>• Enable two-factor authentication</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3">❌ Don'ts</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Don't use personal information</li>
                  <li>• Don't use common words or phrases</li>
                  <li>• Don't reuse passwords across sites</li>
                  <li>• Don't share passwords</li>
                  <li>• Don't write passwords down insecurely</li>
                  <li>• Don't use sequential characters (123456)</li>
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
              <h3 className="font-semibold text-lg mb-2">How secure are the generated passwords?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Extremely secure. We use cryptographically secure random number generation (crypto.getRandomValues) which is the same technology used by banks and security systems. Each password is truly random and unpredictable.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">Is my password data saved or collected?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Absolutely not. All password generation happens in your browser using JavaScript. Passwords never leave your device and are not stored anywhere. We don't have servers that could collect your data.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">Does it work offline?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Yes! After the initial page load, you can generate passwords completely offline. All the generation logic runs locally in your browser.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">What makes a password strong?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Password strength comes from length and complexity. A strong password should be at least 12 characters and include a mix of uppercase letters, lowercase letters, numbers, and symbols. Longer passwords are generally more secure.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">Can I exclude certain characters from passwords?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Yes! The advanced options let you exclude similar-looking characters (like 0 and O, or 1 and I) and ambiguous characters. This makes passwords easier to read and type while maintaining security.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Related Tools */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">More Security Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/tools/word-counter" className="p-4 border rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                <div className="text-3xl mb-2">📝</div>
                <h3 className="font-semibold">Word Counter</h3>
                <p className="text-sm text-muted-foreground">Count words and analyze text</p>
              </Link>
              <Link href="/tools/case-converter" className="p-4 border rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                <div className="text-3xl mb-2">🔄</div>
                <h3 className="font-semibold">Case Converter</h3>
                <p className="text-sm text-muted-foreground">Convert text case formats</p>
              </Link>
              <div className="p-4 border-2 border-dashed rounded-lg opacity-60">
                <div className="text-3xl mb-2 grayscale">🔒</div>
                <h3 className="font-semibold text-muted-foreground">Hash Generator</h3>
                <p className="text-sm text-muted-foreground">Generate file hashes for integrity</p>
              </div>
              <div className="p-4 border-2 border-dashed rounded-lg opacity-60">
                <div className="text-3xl mb-2 grayscale">🔢</div>
                <h3 className="font-semibold text-muted-foreground">UUID Generator</h3>
                <p className="text-sm text-muted-foreground">Generate unique identifiers</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
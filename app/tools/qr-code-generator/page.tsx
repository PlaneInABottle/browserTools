import type { Metadata } from 'next'
import Link from 'next/link'
import QRCodeGenerator from '@/components/tools/QRCodeGenerator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { siteConfig } from '@/lib/config/site'
import { getToolPageLastModified } from '@/lib/utils/git-dates'

const lastModified = getToolPageLastModified('qr-code-generator')

export const metadata: Metadata = {
  title: 'QR Code Generator - Free Online QR Code Creator | Toolympics',
  description: 'Generate QR codes instantly from text and URLs. Customizable size and error correction levels. Free, fast, and works offline. Download as PNG, JPG, or SVG.',
  keywords: [
    'qr code generator',
    'qr code creator',
    'free qr code maker',
    'online qr code generator',
    'qr code maker online',
    'custom qr codes',
    'qr code tool',
    'generate qr code',
    'qr code download',
    'qr code png',
    'qr code svg',
    'qr code jpg',
  ],
  openGraph: {
    title: 'QR Code Generator - Free Online QR Code Creator',
    description: 'Generate custom QR codes from text and URLs instantly. Multiple sizes, error correction levels, and download formats. Free and works offline.',
    type: 'website',
    url: `${siteConfig.url}/tools/qr-code-generator`,
    images: [
      {
        url: `${siteConfig.url}/og-images/qr-code-generator.svg`,
        width: 1200,
        height: 630,
        alt: 'QR Code Generator Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QR Code Generator - Free Online QR Code Creator',
    description: 'Generate custom QR codes from text and URLs instantly. Multiple sizes, error correction levels, and download formats. Free and works offline.',
    images: [`${siteConfig.url}/og-images/qr-code-generator.svg`],
  },
  alternates: {
    canonical: `${siteConfig.url}/tools/qr-code-generator`,
  },
}

export const dynamic = 'force-static'

export default function QRCodeGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'QR Code Generator',
        url: `${siteConfig.url}/tools/qr-code-generator`,
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: 'Free online QR code generator. Create custom QR codes from text and URLs with adjustable size and error correction levels.',
        dateModified: lastModified.toISOString(),
        featureList: [
          'Generate QR codes from text and URLs',
          'Customizable QR code size (200px - 1000px)',
          'Multiple error correction levels',
          'Download as PNG, JPG, or SVG',
          'Copy QR code SVG to clipboard',
          'Works offline',
          'No data collection',
          'Instant generation'
        ],
        browserRequirements: 'Requires JavaScript. Works in modern browsers (Chrome, Firefox, Safari, Edge).',
      },
      {
        '@type': 'HowTo',
        name: 'How to Generate a QR Code',
        description: 'Create custom QR codes for sharing links, text, and information',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Enter Your Content',
            text: 'Type or paste the text, URL, or information you want to encode in the QR code',
          },
          {
            '@type': 'HowToStep',
            name: 'Adjust Settings',
            text: 'Customize the QR code size and error correction level based on your needs',
          },
          {
            '@type': 'HowToStep',
            name: 'Generate QR Code',
            text: 'The QR code will be generated instantly and displayed on screen',
          },
          {
            '@type': 'HowToStep',
            name: 'Download or Copy',
            text: 'Download the QR code as PNG, JPG, or SVG, or copy the SVG code to your clipboard',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What can I encode in a QR code?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'You can encode text, URLs, email addresses, phone numbers, and other types of data. URLs are the most common use case.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is error correction and why does it matter?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Error correction allows QR codes to be scanned even if they are partially damaged or dirty. Higher error correction levels create larger QR codes but are more reliable.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does it work offline?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! After the initial page load, you can generate QR codes completely offline. All processing happens in your browser.',
            },
          },
          {
            '@type': 'Question',
            name: 'Are my QR codes saved or collected?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. Everything runs in your browser. QR codes are generated client-side and never leave your device. We have no servers to store your data.',
            },
          },
          {
            '@type': 'Question',
            name: 'What formats can I download the QR codes in?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'You can download QR codes as PNG, JPG, or SVG files. SVG is vector-based and scales perfectly at any size.',
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
            name: 'QR Code Generator',
            item: `${siteConfig.url}/tools/qr-code-generator`,
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
          <span className="text-gray-900 dark:text-gray-100 font-medium" aria-current="page">QR Code Generator</span>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
            <span>📱</span>
            <span>QR Code Generator</span>
          </h1>
          <p className="text-muted-foreground">
            Generate QR codes from text and URLs instantly. Customizable size and error correction levels.
          </p>
        </div>

        {/* Tool Component */}
        <QRCodeGenerator />

        {/* Features */}
        <Card className="mt-16">
          <CardHeader>
            <CardTitle className="text-2xl">Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-semibold">🎯 Instant Generation</h3>
                <p className="text-sm text-muted-foreground">
                  Generate QR codes instantly as you type. No waiting or processing delays.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">📏 Customizable Size</h3>
                <p className="text-sm text-muted-foreground">
                  Adjust QR code size from 200px to 1000px to fit your specific needs.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">🛡️ Error Correction</h3>
                <p className="text-sm text-muted-foreground">
                  Choose from 4 error correction levels for different reliability requirements.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">📥 Multiple Formats</h3>
                <p className="text-sm text-muted-foreground">
                  Download as PNG, JPG, or SVG. SVG format scales perfectly at any size.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">📋 Copy to Clipboard</h3>
                <p className="text-sm text-muted-foreground">
                  Copy the QR code SVG code directly to your clipboard for easy integration.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">🔒 100% Private</h3>
                <p className="text-sm text-muted-foreground">
                  All processing happens in your browser. No data is sent to servers.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How to Use */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">How to Generate QR Codes</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-3 text-muted-foreground leading-relaxed">
              <li>
                <strong className="text-foreground">Enter your content</strong> in the text field above. This can be a URL, text message, or any other information you want to encode.
              </li>
              <li>
                <strong className="text-foreground">Adjust the size</strong> using the slider to make the QR code larger or smaller based on your needs.
              </li>
              <li>
                <strong className="text-foreground">Choose error correction level</strong> - higher levels create more reliable but larger QR codes.
              </li>
              <li>
                <strong className="text-foreground">Generate and preview</strong> - the QR code appears instantly in the preview area.
              </li>
              <li>
                <strong className="text-foreground">Download or copy</strong> the QR code in your preferred format (PNG, JPG, or SVG).
              </li>
            </ol>
          </CardContent>
        </Card>

        {/* QR Code Best Practices */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">QR Code Best Practices</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">✅ Do's</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Use high contrast colors (black on white)</li>
                  <li>• Include a call-to-action near the QR code</li>
                  <li>• Test QR codes before printing</li>
                  <li>• Use appropriate error correction levels</li>
                  <li>• Keep URLs short and stable</li>
                  <li>• Add a border/frame around the QR code</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3">❌ Don'ts</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Don't use colors that reduce contrast</li>
                  <li>• Don't make QR codes too small to scan</li>
                  <li>• Don't distort or stretch QR codes</li>
                  <li>• Don't place QR codes on curved surfaces</li>
                  <li>• Don't use damaged or low-quality prints</li>
                  <li>• Don't rely solely on QR codes for critical info</li>
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
              <h3 className="font-semibold text-lg mb-2">What can I encode in a QR code?</h3>
              <p className="text-muted-foreground leading-relaxed">
                You can encode various types of data including URLs, plain text, email addresses, phone numbers, SMS messages, and more. URLs are the most common use case for QR codes.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">What is error correction and when should I use different levels?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Error correction allows QR codes to be scanned even if they're partially damaged, dirty, or obscured. Use Low (7%) for clean environments, Medium (15%) for general use, Quartile (25%) for outdoor or industrial use, and High (30%) for maximum reliability.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">Does it work offline?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Yes! After loading the page once, you can generate QR codes completely offline. All the QR code generation logic runs locally in your browser.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">Is my data safe and private?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Absolutely. All QR code generation happens in your browser using JavaScript. Your text and generated QR codes never leave your device. We don't have servers that could collect or store your data.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">What formats can I download the QR codes in?</h3>
              <p className="text-muted-foreground leading-relaxed">
                You can download QR codes as PNG (raster image), JPG (compressed raster), or SVG (vector format). SVG files are scalable and perfect for high-quality printing or digital use.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Related Tools */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">More Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/tools/password-generator" className="p-4 border rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                <div className="text-3xl mb-2">🔐</div>
                <h3 className="font-semibold">Password Generator</h3>
                <p className="text-sm text-muted-foreground">Generate secure passwords</p>
              </Link>
              <Link href="/tools/case-converter" className="p-4 border rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                <div className="text-3xl mb-2">🔄</div>
                <h3 className="font-semibold">Case Converter</h3>
                <p className="text-sm text-muted-foreground">Convert text case formats</p>
              </Link>
              <div className="p-4 border-2 border-dashed rounded-lg opacity-60">
                <div className="text-3xl mb-2 grayscale">📝</div>
                <h3 className="font-semibold text-muted-foreground">Barcode Generator</h3>
                <p className="text-sm text-muted-foreground">Generate various barcode types</p>
              </div>
              <div className="p-4 border-2 border-dashed rounded-lg opacity-60">
                <div className="text-3xl mb-2 grayscale">🖼️</div>
                <h3 className="font-semibold text-muted-foreground">Image to Text</h3>
                <p className="text-sm text-muted-foreground">Extract text from images</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
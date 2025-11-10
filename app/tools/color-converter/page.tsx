import type { Metadata } from 'next'
import Link from 'next/link'
import ColorConverter from '@/components/tools/ColorConverter'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { siteConfig } from '@/lib/config/site'
import { getToolPageLastModified } from '@/lib/utils/git-dates'

const lastModified = getToolPageLastModified('color-converter')

export const metadata: Metadata = {
  title: 'Color Code Converter - Free HEX RGB HSL Converter | Toolympics',
  description: 'Free online color converter. Convert between HEX, RGB, RGBA, HSL, HSLA formats instantly. Visual color picker, presets, and recent colors. Works offline, no data collection.',
  keywords: [
    'color converter',
    'hex to rgb',
    'rgb to hex',
    'hsl converter',
    'color code converter',
    'hex color picker',
    'rgb color converter',
    'color format converter',
    'free color converter',
    'online color tool',
    'color picker online',
    'hex rgb hsl converter',
    'hsla converter',
    'rgba converter',
    'color calculator',
    'web color tool',
  ],
  openGraph: {
    title: 'Color Code Converter - Free HEX RGB HSL Converter',
    description: 'Convert between color formats instantly. Visual color picker, presets, and recent colors history. Free, fast, and completely private.',
    type: 'website',
    url: `${siteConfig.url}/tools/color-converter`,
    images: [
      {
        url: `${siteConfig.url}/og-images/color-converter.svg`,
        width: 1200,
        height: 630,
        alt: 'Color Code Converter Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Color Code Converter - Free HEX RGB HSL Converter',
    description: 'Convert between color formats instantly. Visual color picker, presets, and recent colors. Free, fast, and completely private.',
    images: [`${siteConfig.url}/og-images/color-converter.svg`],
  },
  alternates: {
    canonical: `${siteConfig.url}/tools/color-converter`,
  },
}

export const dynamic = 'force-static'

export default function ColorConverterPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Color Code Converter',
        url: `${siteConfig.url}/tools/color-converter`,
        applicationCategory: 'DesignApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: 'Free online color converter. Convert between HEX, RGB, RGBA, HSL, HSLA color formats instantly with visual preview.',
        dateModified: lastModified.toISOString(),
        featureList: [
          'HEX to RGB conversion',
          'RGB to HSL conversion',
          'HSL to HEX conversion',
          'RGBA and HSLA support',
          'Visual color swatch preview',
          'Interactive color picker',
          'Recent colors history',
          'Preset common colors',
          'Real-time format conversion',
          'Copy to clipboard',
          'Works offline',
          'No data collection',
        ],
        browserRequirements: 'Requires JavaScript and HTML5 color input support. Works in modern browsers (Chrome, Firefox, Safari, Edge).',
      },
      {
        '@type': 'HowTo',
        name: 'How to Convert Color Codes',
        description: 'Learn how to convert between different color formats',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Enter or Pick a Color',
            text: 'Type a color code in any format (HEX like #FF0000, RGB like rgb(255,0,0), or HSL like hsl(0,100%,50%)) or use the interactive color picker.',
          },
          {
            '@type': 'HowToStep',
            name: 'View All Formats',
            text: 'The converter automatically displays your color in all supported formats: HEX, RGB, RGBA, HSL, and HSLA.',
          },
          {
            '@type': 'HowToStep',
            name: 'Copy Format',
            text: 'Click the copy button next to any color format to copy it to your clipboard.',
          },
          {
            '@type': 'HowToStep',
            name: 'Save to Recent',
            text: 'Colors are automatically saved to your recent colors history for quick access.',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What color formats are supported?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'We support HEX (#RRGGBB), RGB (rgb(r,g,b)), RGBA (rgba(r,g,b,a)), HSL (hsl(h,s%,l%)), and HSLA (hsla(h,s%,l%,a)). You can convert between any of these formats instantly.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is my data saved or collected?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. Everything runs in your browser. Your colors never leave your device and are not saved anywhere on servers. The recent colors list is stored only in your browser session.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does it work offline?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! After loading the page once, you can use the color converter completely offline. All color conversions happen in your browser using JavaScript.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between RGB and HSL?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'RGB (Red, Green, Blue) is how computers display colors by mixing light values. HSL (Hue, Saturation, Lightness) is more intuitive for humans - Hue is the color, Saturation is the intensity, and Lightness is how bright it is.',
            },
          },
          {
            '@type': 'Question',
            name: 'Why would I use RGBA or HSLA?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'RGBA and HSLA add an alpha channel for transparency. The alpha value ranges from 0 (fully transparent) to 1 (fully opaque). This is useful for colors with transparency effects in web design.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I use this tool for web design?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Absolutely! This tool is perfect for web designers and developers. You can easily convert between formats that different tools require - CSS uses HEX or RGB, design tools often use HSL, and various platforms may need different formats.',
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
            name: 'Color Converter',
            item: `${siteConfig.url}/tools/color-converter`,
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
          <span className="text-gray-900 dark:text-gray-100 font-medium" aria-current="page">Color Converter</span>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
            <span>🎨</span>
            <span>Color Code Converter</span>
          </h1>
          <p className="text-muted-foreground">
            Convert between HEX, RGB, RGBA, HSL, and HSLA color formats. Visual color picker with presets and history.
          </p>
        </div>

        {/* Tool Component */}
        <ColorConverter />

        {/* Features */}
        <Card className="mt-16">
          <CardHeader>
            <CardTitle className="text-2xl">Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-semibold">🎯 Multiple Format Support</h3>
                <p className="text-sm text-muted-foreground">
                  Convert between HEX, RGB, RGBA, HSL, and HSLA formats with real-time conversion as you type.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">🌈 Visual Color Preview</h3>
                <p className="text-sm text-muted-foreground">
                  See a large, live color swatch preview of your selected color as you make changes.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">🎨 Interactive Color Picker</h3>
                <p className="text-sm text-muted-foreground">
                  Use the native HTML5 color picker for easy visual color selection without typing codes.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">📌 Recent Colors History</h3>
                <p className="text-sm text-muted-foreground">
                  Automatically saves your last 10 used colors for quick access and comparison.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">🎪 Preset Common Colors</h3>
                <p className="text-sm text-muted-foreground">
                  Quick access to 16 common colors including red, green, blue, and many more.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">🔒 100% Private</h3>
                <p className="text-sm text-muted-foreground">
                  All conversions happen in your browser. No data is sent to servers or stored anywhere.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Color Formats Explained */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">Understanding Color Formats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-3">HEX (Hexadecimal)</h3>
              <p className="text-muted-foreground leading-relaxed mb-3">
                The most common color format on the web. HEX colors are represented as #RRGGBB where each pair of characters represents the intensity of Red, Green, and Blue (0-255 or 00-FF in hexadecimal).
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p className="font-mono text-sm">Example: #FF0000 (pure red)</p>
                <p className="text-sm text-muted-foreground mt-2">Also supports shorthand: #F00 (equivalent to #FF0000)</p>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-lg mb-3">RGB / RGBA (Red, Green, Blue)</h3>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Represents colors as a combination of Red, Green, and Blue light values (0-255). RGBA adds an Alpha channel for transparency (0-1, where 0 is fully transparent and 1 is fully opaque).
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p className="font-mono text-sm">RGB: rgb(255, 0, 0) - pure red</p>
                <p className="font-mono text-sm mt-2">RGBA: rgba(255, 0, 0, 0.5) - semi-transparent red</p>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-lg mb-3">HSL / HSLA (Hue, Saturation, Lightness)</h3>
              <p className="text-muted-foreground leading-relaxed mb-3">
                A more intuitive color model for humans. Hue is the color (0-360°), Saturation is the intensity (0-100%), and Lightness is the brightness (0-100%). HSLA adds transparency like RGBA.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p className="font-mono text-sm">HSL: hsl(0, 100%, 50%) - pure red</p>
                <p className="font-mono text-sm mt-2">HSLA: hsla(0, 100%, 50%, 0.5) - semi-transparent red</p>
                <p className="text-sm text-muted-foreground mt-3">
                  💡 HSL is often preferred by designers because it's easier to understand and adjust colors intuitively.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How to Use */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">How to Use Color Converter</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-3 text-muted-foreground leading-relaxed">
              <li>
                <strong className="text-foreground">Choose your input method:</strong> Type a color code (HEX, RGB, HSL) or use the interactive color picker.
              </li>
              <li>
                <strong className="text-foreground">View the conversion:</strong> All color formats are automatically calculated and displayed in real-time.
              </li>
              <li>
                <strong className="text-foreground">Copy any format:</strong> Click the copy button next to any color format to copy it to your clipboard.
              </li>
              <li>
                <strong className="text-foreground">Access history:</strong> Your recent colors are saved automatically for quick access.
              </li>
              <li>
                <strong className="text-foreground">Use presets:</strong> Click any preset color to quickly select common colors like red, blue, green, etc.
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
              <h3 className="font-semibold text-lg mb-2">What color formats are supported?</h3>
              <p className="text-muted-foreground leading-relaxed">
                We support HEX (#RRGGBB), RGB (rgb(r,g,b)), RGBA (rgba(r,g,b,a)), HSL (hsl(h,s%,l%)), and HSLA (hsla(h,s%,l%,a)).
                You can input any of these formats and convert to any other format instantly.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">Is my data saved or collected?</h3>
              <p className="text-muted-foreground leading-relaxed">
                No. Everything runs in your browser. Your colors never leave your device. The recent colors history is stored only in your browser's memory
                and is cleared when you close the page.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">Can I input colors in different ways?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Yes! You can type HEX codes with or without the # symbol, RGB values in the format rgb(255,0,0), or HSL values in the format hsl(0,100%,50%).
                The converter automatically recognizes and parses these formats. You can also use the color picker for visual selection.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">What is the difference between RGB and HSL?</h3>
              <p className="text-muted-foreground leading-relaxed">
                RGB (Red, Green, Blue) is how computers display colors by combining light. HSL (Hue, Saturation, Lightness) is more intuitive for humans.
                With HSL, you can easily think about rotating the color wheel (hue), making it more or less vibrant (saturation), and making it brighter or darker (lightness).
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">Why would I use RGBA or HSLA?</h3>
              <p className="text-muted-foreground leading-relaxed">
                RGBA and HSLA formats include an alpha channel for transparency. The alpha value ranges from 0 (fully transparent) to 1 (fully opaque).
                This is essential for CSS and web design when you need colors with transparency effects, overlays, or blending.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2">Does it work offline?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Yes! After the initial page load, you can use the color converter completely offline. All color conversions happen in your browser using JavaScript,
                so no internet connection is required once the page has loaded.
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
              <Link href="/tools/qr-code-generator" className="p-4 border rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                <div className="text-3xl mb-2">📱</div>
                <h3 className="font-semibold">QR Code Generator</h3>
                <p className="text-sm text-muted-foreground">Create QR codes from text or URLs</p>
              </Link>
              <Link href="/tools/password-generator" className="p-4 border rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                <div className="text-3xl mb-2">🔐</div>
                <h3 className="font-semibold">Password Generator</h3>
                <p className="text-sm text-muted-foreground">Generate secure passwords</p>
              </Link>
              <Link href="/tools/image-resizer" className="p-4 border rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                <div className="text-3xl mb-2">🖼️</div>
                <h3 className="font-semibold">Image Resizer</h3>
                <p className="text-sm text-muted-foreground">Resize and convert images</p>
              </Link>
              <Link href="/tools/json-formatter" className="p-4 border rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                <div className="text-3xl mb-2">{ }</div>
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

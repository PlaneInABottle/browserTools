import { Metadata } from 'next'
import Link from 'next/link'
import ImageResizer from '@/components/tools/ImageResizer'
import { getToolPageLastModified } from '@/lib/utils/git-dates'
import { siteConfig } from '@/lib/config/site'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const lastModified = getToolPageLastModified('image-resizer')

export const metadata: Metadata = {
  title: 'Image Resizer - Resize Images Online Free | QuickTools',
  description:
    'Resize images to any dimensions online. Free, fast, and secure. All processing happens in your browser - no upload required. Batch resize with quality control and format conversion.',
  keywords: [
    'image resizer',
    'resize image online',
    'image resize tool',
    'batch image resize',
    'compress images',
    'image dimensions',
    'resize photos',
    'image converter',
    'resize jpeg png',
    'image quality control',
  ],
  openGraph: {
    title: 'Image Resizer - Resize Images Online Free',
    description:
      'Resize images to any dimensions. Free, fast, and secure. All processing happens in your browser - no upload required.',
    type: 'website',
    url: `${siteConfig.url}/tools/image-resizer`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Image Resizer - Resize Images Online Free',
    description: 'Resize images to any dimensions. Free, fast, and secure. Works in your browser.',
  },
  alternates: {
    canonical: `${siteConfig.url}/tools/image-resizer`,
  },
}

export default function ImageResizerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Image Resizer',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Free online image resizer. Resize images to specific dimensions, maintain aspect ratio, batch process, and convert formats. All processing happens locally in your browser.',
        url: `${siteConfig.url}/tools/image-resizer`,
        dateModified: lastModified.toISOString(),
        featureList: [
          'Resize to custom dimensions',
          'Preset sizes for social media',
          'Batch processing',
          'Quality control',
          'Format conversion (JPEG, PNG, WebP)',
          'Maintain aspect ratio',
          'Download as ZIP',
          'No file upload - 100% client-side',
        ],
        browserRequirements: 'Requires JavaScript. Works in modern browsers (Chrome, Firefox, Safari, Edge).',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${siteConfig.url}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Tools',
            item: `${siteConfig.url}/#tools`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Image Resizer',
            item: `${siteConfig.url}/tools/image-resizer`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Are my images uploaded to a server?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No, all image processing happens locally in your browser. Your images never leave your device, ensuring complete privacy and security.',
            },
          },
          {
            '@type': 'Question',
            name: 'What image formats are supported?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The Image Resizer supports JPEG, PNG, WebP, GIF, and BMP input formats. You can convert between JPEG, PNG, and WebP output formats.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I resize multiple images at once?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, you can upload and resize multiple images in batch. All processed images can be downloaded individually or together as a ZIP file.',
            },
          },
          {
            '@type': 'Question',
            name: 'Will resizing reduce image quality?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The Image Resizer uses high-quality resampling algorithms. You can control the output quality with the quality slider (1-100%). Downscaling generally preserves quality well, while upscaling may reduce sharpness.',
            },
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
          <Link
            href="/"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:underline focus:underline focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            Home
          </Link>
          <span className="mx-2 text-gray-400 dark:text-gray-600">/</span>
          <Link
            href="/"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:underline focus:underline focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            Tools
          </Link>
          <span className="mx-2 text-gray-400 dark:text-gray-600">/</span>
          <span className="text-gray-900 dark:text-gray-100 font-medium" aria-current="page">
            Image Resizer
          </span>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
            <span>🖼️</span>
            <span>Image Resizer</span>
          </h1>
          <p className="text-muted-foreground">
            Resize images to any dimensions with quality control and format conversion. 100%
            private and browser-based.
          </p>
        </div>

        {/* Tool Component */}
        <ImageResizer />

        {/* Features */}
        <Card className="mt-16">
          <CardHeader>
            <CardTitle className="text-2xl">Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  📏 Custom Dimensions
                </h3>
                <p className="text-sm text-muted-foreground">
                  Set exact width and height, or use preset sizes for popular platforms like
                  Instagram, YouTube, and Facebook.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  🔒 Aspect Ratio Lock
                </h3>
                <p className="text-sm text-muted-foreground">
                  Maintain original proportions automatically or create custom aspect ratios for
                  your specific needs.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  📦 Batch Processing
                </h3>
                <p className="text-sm text-muted-foreground">
                  Resize multiple images at once and download them all together as a convenient ZIP
                  file.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  ⚙️ Quality Control
                </h3>
                <p className="text-sm text-muted-foreground">
                  Adjust compression quality (1-100%) to perfectly balance file size and image
                  quality.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  🔄 Format Conversion
                </h3>
                <p className="text-sm text-muted-foreground">
                  Convert between JPEG, PNG, and WebP formats while resizing for maximum
                  flexibility.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  🔐 100% Private
                </h3>
                <p className="text-sm text-muted-foreground">
                  All processing happens locally in your browser - your images never leave your
                  device.
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
            <ol className="space-y-3 list-decimal list-inside">
              <li className="text-sm">
                <span className="font-medium">Upload Images:</span> Drag and drop or click to
                browse and select one or more images
              </li>
              <li className="text-sm">
                <span className="font-medium">Choose Dimensions:</span> Select a preset size
                (Instagram, YouTube, HD, etc.) or enter custom width and height
              </li>
              <li className="text-sm">
                <span className="font-medium">Configure Settings:</span> Pick your resize mode,
                quality level, and output format
              </li>
              <li className="text-sm">
                <span className="font-medium">Process:</span> Click &quot;Resize All&quot; to
                process all images at once
              </li>
              <li className="text-sm">
                <span className="font-medium">Download:</span> Save images individually or download
                all as a ZIP file
              </li>
            </ol>
          </CardContent>
        </Card>

        {/* Resize Modes */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">Resize Modes Explained</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-1">Fit (Recommended)</h3>
                <p className="text-sm text-muted-foreground">
                  Resizes the image to fit within the specified dimensions while maintaining aspect
                  ratio. The result may be smaller than target dimensions but will never be
                  distorted.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Exact</h3>
                <p className="text-sm text-muted-foreground">
                  Forces the image to exact dimensions. Warning: This may distort the image if the
                  aspect ratio differs from the original.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Fill</h3>
                <p className="text-sm text-muted-foreground">
                  Fills the dimensions completely, cropping any excess content if needed. Maintains
                  aspect ratio while ensuring target dimensions are met.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Popular Presets */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">Popular Preset Sizes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-1">Instagram Square</h4>
                <p className="text-xs text-muted-foreground">1080 × 1080 px</p>
              </div>
              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-1">Instagram Portrait</h4>
                <p className="text-xs text-muted-foreground">1080 × 1350 px</p>
              </div>
              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-1">YouTube Thumbnail</h4>
                <p className="text-xs text-muted-foreground">1280 × 720 px</p>
              </div>
              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-1">Facebook Cover</h4>
                <p className="text-xs text-muted-foreground">820 × 312 px</p>
              </div>
              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-1">HD (1080p)</h4>
                <p className="text-xs text-muted-foreground">1920 × 1080 px</p>
              </div>
              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-1">4K UHD</h4>
                <p className="text-xs text-muted-foreground">3840 × 2160 px</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Browser Info */}
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Privacy & Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Your privacy is our priority. All image processing happens entirely in your browser
                using client-side JavaScript. Your images are never uploaded to any server,
                ensuring complete privacy and security. What happens in your browser, stays in your
                browser.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Browser Compatibility</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                The Image Resizer works in all modern browsers including Chrome, Firefox, Safari,
                and Edge. For best performance and latest features, we recommend using the most
                recent version of your browser.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

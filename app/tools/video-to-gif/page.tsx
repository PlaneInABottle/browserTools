import { Metadata } from 'next'
import Link from 'next/link'
import VideoToGif from '@/components/tools/VideoToGif'
import { getToolPageLastModified } from '@/lib/utils/git-dates'
import { siteConfig } from '@/lib/config/site'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const lastModified = getToolPageLastModified('video-to-gif')

export const metadata: Metadata = {
  title: 'Video to GIF Converter - Convert Videos to Animated GIFs Online Free | QuickTools',
  description:
    'Convert video files to animated GIFs online. Free, fast, and secure. Supports MP4, WebM, MOV, AVI. Customize frame rate, quality, and dimensions. All processing happens in your browser - no upload required.',
  keywords: [
    'video to gif',
    'convert video to gif',
    'video to animated gif',
    'gif converter online',
    'video to gif converter',
    'mp4 to gif',
    'webm to gif',
    'video clip to gif',
    'animated gif maker',
    'video to gif free',
  ],
  openGraph: {
    title: 'Video to GIF Converter - Convert Videos to Animated GIFs Online Free',
    description:
      'Convert video files to animated GIFs. Free, fast, and secure. Supports MP4, WebM, MOV, AVI. Customize frame rate, quality, and dimensions.',
    type: 'website',
    url: `${siteConfig.url}/tools/video-to-gif`,
    images: [
      {
        url: `${siteConfig.url}/og-images/video-to-gif.svg`,
        width: 1200,
        height: 630,
        alt: 'Video to GIF Converter Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Video to GIF Converter - Convert Videos to Animated GIFs Online Free',
    description: 'Convert video files to animated GIFs. Free, fast, and secure. Works in your browser.',
    images: [`${siteConfig.url}/og-images/video-to-gif.svg`],
  },
  alternates: {
    canonical: `${siteConfig.url}/tools/video-to-gif`,
  },
}

export default function VideoToGifPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Video to GIF Converter',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Free online video to GIF converter. Convert MP4, WebM, MOV, and AVI videos to animated GIFs. Customize frame rate, quality, dimensions, and duration. All processing happens locally in your browser.',
        url: `${siteConfig.url}/tools/video-to-gif`,
        dateModified: lastModified.toISOString(),
        featureList: [
          'Convert MP4, WebM, MOV, AVI to GIF',
          'Customize frame rate (5-30 FPS)',
          'Adjust quality and dimensions',
          'Trim video clips',
          'Loop animations',
          'Batch processing',
          'Download as GIF or ZIP',
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
            name: 'Video to GIF',
            item: `${siteConfig.url}/tools/video-to-gif`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Are my videos uploaded to a server?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No, all video processing happens locally in your browser. Your videos are never uploaded to any server, ensuring complete privacy and security.',
            },
          },
          {
            '@type': 'Question',
            name: 'What video formats are supported?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The Video to GIF Converter supports MP4, WebM, MOV, and AVI video formats. For best results, use MP4 or WebM files.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I convert multiple videos at once?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, you can upload and convert multiple videos in batch. All processed GIFs can be downloaded individually or together as a ZIP file.',
            },
          },
          {
            '@type': 'Question',
            name: 'How long does conversion take?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Conversion time depends on video length, frame rate, and quality settings. A 30-second video typically converts in 10-30 seconds. Longer videos or higher quality settings will take more time.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the maximum video size I can convert?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'You can convert videos up to 50MB directly in your browser. All processing is done locally on your device. Larger files may cause performance issues or browser crashes, so we recommend using videos under this limit for the best experience.',
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
            Video to GIF
          </span>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
            <span>🎬</span>
            <span>Video to GIF Converter</span>
          </h1>
          <p className="text-muted-foreground">
            Convert videos to animated GIFs with customizable quality, frame rate, and dimensions. 100%
            private and browser-based.
          </p>
        </div>

        {/* Tool Component */}
        <VideoToGif />

        {/* Features */}
        <Card className="mt-16">
          <CardHeader>
            <CardTitle className="text-2xl">Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  🎯 Format Support
                </h3>
                <p className="text-sm text-muted-foreground">
                  Convert MP4, WebM, MOV, and AVI videos to high-quality animated GIFs with automatic
                  format detection.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  ⚙️ Customization
                </h3>
                <p className="text-sm text-muted-foreground">
                  Adjust frame rate (5-30 FPS), quality settings, output dimensions, and loop behavior
                  to optimize your GIFs.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  ✂️ Video Trimming
                </h3>
                <p className="text-sm text-muted-foreground">
                  Extract specific clips from your videos by setting start time and duration for
                  precise GIF creation.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  📦 Batch Processing
                </h3>
                <p className="text-sm text-muted-foreground">
                  Convert multiple videos simultaneously and download them all together as a convenient
                  ZIP file.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  🚀 Performance Optimized
                </h3>
                <p className="text-sm text-muted-foreground">
                  Smart processing with Web Workers for large videos, automatic quality optimization,
                  and memory-efficient frame extraction.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  🔐 100% Private
                </h3>
                <p className="text-sm text-muted-foreground">
                  All processing happens locally in your browser - your videos never leave your device.
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
                <span className="font-medium">Upload Videos:</span> Drag and drop or click to browse and
                select one or more videos (MP4, WebM, MOV, AVI)
              </li>
              <li className="text-sm">
                <span className="font-medium">Preview & Trim:</span> Watch your video and set start time
                and duration for the GIF clip
              </li>
              <li className="text-sm">
                <span className="font-medium">Customize Settings:</span> Adjust frame rate, quality,
                dimensions, and loop options
              </li>
              <li className="text-sm">
                <span className="font-medium">Convert:</span> Click &quot;Convert to GIF&quot; to process
                all videos at once
              </li>
              <li className="text-sm">
                <span className="font-medium">Download:</span> Save GIFs individually or download all as
                a ZIP file
              </li>
            </ol>
          </CardContent>
        </Card>

        {/* Conversion Settings Explained */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">Conversion Settings Explained</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-1">Frame Rate (FPS)</h3>
                <p className="text-sm text-muted-foreground">
                  Controls animation smoothness. Higher FPS (20-30) creates smoother animations but
                  larger file sizes. Lower FPS (5-15) creates smaller files but choppier motion.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Quality</h3>
                <p className="text-sm text-muted-foreground">
                  Affects color accuracy and file size. Higher quality preserves more colors but
                  increases file size. Lower quality reduces colors for smaller files.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Dimensions</h3>
                <p className="text-sm text-muted-foreground">
                  Output GIF size in pixels. Smaller dimensions create smaller files but may reduce
                  detail. Maintains aspect ratio automatically.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Loop</h3>
                <p className="text-sm text-muted-foreground">
                  When enabled, the GIF will repeat infinitely. When disabled, the GIF plays once and
                  stops.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Supported Formats */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">Supported Video Formats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="border rounded-lg p-3 text-center">
                <h4 className="font-semibold text-sm mb-1">MP4</h4>
                <p className="text-xs text-muted-foreground">H.264/AVC recommended</p>
              </div>
              <div className="border rounded-lg p-3 text-center">
                <h4 className="font-semibold text-sm mb-1">WebM</h4>
                <p className="text-xs text-muted-foreground">VP8/VP9 codecs</p>
              </div>
              <div className="border rounded-lg p-3 text-center">
                <h4 className="font-semibold text-sm mb-1">MOV</h4>
                <p className="text-xs text-muted-foreground">QuickTime format</p>
              </div>
              <div className="border rounded-lg p-3 text-center">
                <h4 className="font-semibold text-sm mb-1">AVI</h4>
                <p className="text-xs text-muted-foreground">Legacy format</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              <strong>Note:</strong> For best results, use MP4 files with H.264 encoding. Very long videos
              or high-resolution files may take longer to process.
            </p>
          </CardContent>
        </Card>

        {/* Privacy & Performance */}
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Privacy & Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Your privacy is our priority. All video processing happens entirely in your browser
                using client-side JavaScript. Your videos are never uploaded to any server,
                ensuring complete privacy and security. What happens in your browser, stays in your
                browser.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Performance & Compatibility</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                The Video to GIF Converter works in all modern browsers including Chrome, Firefox,
                Safari, and Edge. For best performance, we recommend using the most recent version of
                your browser with hardware acceleration enabled.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
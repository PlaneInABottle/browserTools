import type { Metadata } from 'next'
import Link from 'next/link'
import SpeechToTextTool from '@/components/tools/SpeechToText'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { siteConfig } from '@/lib/config/site'
import { getToolPageLastModified } from '@/lib/utils/git-dates'

const lastModified = getToolPageLastModified('speech-to-text')

export const metadata: Metadata = {
  title: 'Speech to Text Converter - Free AI Transcription Online | Toolympics',
  description: 'Free browser-based speech-to-text converter. Record audio and get instant AI-powered transcriptions. Private and secure - everything runs in your browser.',
  keywords: [
    'speech to text',
    'voice to text',
    'transcription',
    'audio transcription',
    'voice recognition',
    'free speech to text',
    'browser speech to text',
    'whisper ai',
    'offline transcription',
  ],
  openGraph: {
    title: 'Speech to Text Converter - Free AI Transcription Online',
    description: 'Convert speech to text instantly with AI. Free, fast, and completely private.',
    type: 'website',
    url: `${siteConfig.url}/tools/speech-to-text`,
    images: [
      {
        url: `${siteConfig.url}/og-images/speech-to-text.svg`,
        width: 1200,
        height: 630,
        alt: 'Speech to Text Converter Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Speech to Text Converter - Free AI Transcription Online',
    description: 'Convert speech to text instantly with AI. Free, fast, and completely private.',
    images: [`${siteConfig.url}/og-images/speech-to-text.svg`],
  },
  alternates: {
    canonical: `${siteConfig.url}/tools/speech-to-text`,
  },
}

export const dynamic = 'force-static'

export default function SpeechToTextPage() {
  // JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Speech to Text Converter',
        url: `${siteConfig.url}/tools/speech-to-text`,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: 'Free browser-based speech-to-text converter using AI. Private and secure - everything runs in your browser.',
        dateModified: lastModified.toISOString(),
        featureList: [
          'Record audio or upload files',
          'Choose AI model (Tiny, Base, Small)',
          'Offline transcription after first download',
          'Multiple language support',
          'No file upload - 100% client-side',
        ],
        browserRequirements: 'Requires JavaScript. Works in modern browsers (Chrome, Firefox, Safari, Edge).',
      },
      {
        '@type': 'HowTo',
        name: 'How to Convert Speech to Text',
        description: 'Convert audio recordings to text using AI',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Record Audio',
            text: 'Click "Start Recording" to begin capturing audio from your microphone',
          },
          {
            '@type': 'HowToStep',
            name: 'Stop Recording',
            text: 'Click "Stop Recording" when finished speaking',
          },
          {
            '@type': 'HowToStep',
            name: 'Wait for Model',
            text: 'The AI model will download automatically (first time only)',
          },
          {
            '@type': 'HowToStep',
            name: 'Get Transcription',
            text: 'Your transcription will appear within seconds',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Is my audio data private?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! Everything runs in your browser. Your audio never leaves your device.',
            },
          },
          {
            '@type': 'Question',
            name: 'What models are available?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'We offer three Whisper models from OpenAI: Whisper Tiny (~150MB, fastest), Whisper Base (~290MB, balanced), and Whisper Small (~970MB, most accurate). All are optimized for browser use via Transformers.js.',
            },
          },
          {
            '@type': 'Question',
            name: 'Why is there a download on first use?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The AI model downloads once and is cached in your browser for future use. Size varies from 150MB to 970MB depending on the model you choose.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does it work offline?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'After the first use, yes! The model is cached locally, so you can use it offline.',
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
            name: 'Speech to Text',
            item: `${siteConfig.url}/tools/speech-to-text`,
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
        <Link href="/tools/speech-to-text" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:underline focus:underline focus:outline-none focus:ring-1 focus:ring-blue-500">Tools</Link>
        <span className="mx-2 text-gray-400 dark:text-gray-600">/</span>
        <span className="text-gray-900 dark:text-gray-100 font-medium" aria-current="page">Speech to Text</span>
      </nav>

      {/* Page Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
          <span>🎤</span>
          <span>Speech to Text</span>
        </h1>
        <p className="text-muted-foreground">
          Convert audio recordings to text using AI. Free, fast, and completely private.
        </p>
      </div>

      {/* Tool Component */}
      <SpeechToTextTool />

      {/* How to Use */}
      <Card className="mt-16">
        <CardHeader>
          <CardTitle className="text-2xl">How to Use</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-3">Option 1: Record Audio</h3>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground leading-relaxed">
                <li>Select your preferred AI model (Tiny, Base, or Small)</li>
                <li>Click &ldquo;Start Recording&rdquo; to begin capturing audio from your microphone</li>
                <li>Speak clearly into your microphone</li>
                <li>Click &ldquo;Stop Recording&rdquo; when finished</li>
                <li>The AI model will download automatically (first time only, 150MB-970MB depending on model)</li>
                <li>Your transcription will appear within seconds</li>
              </ol>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-3">Option 2: Upload Audio File</h3>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground leading-relaxed">
                <li>Drag and drop an audio file into the upload zone, or click &ldquo;Choose File&rdquo;</li>
                <li>Supported formats: MP3, WAV, M4A, WebM, and more</li>
                <li>The file will be processed locally in your browser</li>
                <li>Your transcription will appear automatically</li>
              </ol>
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
            <h3 className="font-semibold text-lg mb-2">Is my audio data private?</h3>
            <p className="text-muted-foreground leading-relaxed">
              Yes! Everything runs in your browser. Your audio never leaves your device.
            </p>
          </div>
          <Separator />
          <div>
            <h3 className="font-semibold text-lg mb-2">What models are available?</h3>
            <p className="text-muted-foreground leading-relaxed">
              We offer three Whisper models from OpenAI: <strong>Whisper Tiny</strong> (~150MB, fastest), <strong>Whisper Base</strong> (~290MB, balanced), and <strong>Whisper Small</strong> (~970MB, most accurate). All are optimized for browser use via Transformers.js. You can switch between models based on your needs for speed vs. accuracy.
            </p>
          </div>
          <Separator />
          <div>
            <h3 className="font-semibold text-lg mb-2">Why is there a download on first use?</h3>
            <p className="text-muted-foreground leading-relaxed">
              The AI model downloads once and is cached in your browser for future use. Size varies from 150MB to 970MB depending on which model you choose. Subsequent uses are instant as the model loads from cache.
            </p>
          </div>
          <Separator />
          <div>
            <h3 className="font-semibold text-lg mb-2">Does it work offline?</h3>
            <p className="text-muted-foreground leading-relaxed">
              After the first use, yes! The model is cached locally, so you can use it offline.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Related Tools */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-2xl">Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border-2 border-dashed rounded-lg opacity-60">
              <div className="text-3xl mb-2 grayscale">🖼️</div>
              <h3 className="font-semibold text-muted-foreground">Image Resizer</h3>
              <p className="text-sm text-muted-foreground">Resize and optimize images</p>
            </div>
            <div className="p-4 border-2 border-dashed rounded-lg opacity-60">
              <div className="text-3xl mb-2 grayscale">📄</div>
              <h3 className="font-semibold text-muted-foreground">PDF Converter</h3>
              <p className="text-sm text-muted-foreground">Convert files to/from PDF</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    </>
  )
}

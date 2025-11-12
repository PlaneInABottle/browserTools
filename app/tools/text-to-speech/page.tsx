import { Metadata } from 'next'
import { TextToSpeechConverter } from '@/components/tools/TextToSpeech'
import { getToolPageLastModified } from '@/lib/utils/git-dates'
import { siteConfig } from '@/lib/config/site'

const lastModified = getToolPageLastModified('text-to-speech')

export const metadata: Metadata = {
  title: 'Text to Speech (TTS) - Convert Text to Natural AI Audio | Toolympics',
  description: 'Convert text to natural-sounding speech using AI-powered TTS. Choose from 30+ voices, adjust settings, and download audio. Free, fast, and works completely offline.',
  keywords: [
    'text to speech',
    'tts',
    'ai voice generator',
    'speech synthesis',
    'text to audio',
    'voice generator',
    'natural speech',
    'audio generation',
    'kokoro tts',
    'free tts',
    'online speech generator',
  ],
  openGraph: {
    title: 'Text to Speech (TTS) - AI Voice Generator',
    description: 'Convert text to natural-sounding speech with multiple voices. Free, fast, and completely private.',
    type: 'website',
    url: `${siteConfig.url}/tools/text-to-speech`,
    images: [
      {
        url: `${siteConfig.url}/og-images/text-to-speech.svg`,
        width: 1200,
        height: 630,
        alt: 'Text to Speech Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Text to Speech (TTS) - AI Voice Generator',
    description: 'Convert text to natural-sounding speech with multiple voices. Free and completely private.',
    images: [`${siteConfig.url}/og-images/text-to-speech.svg`],
  },
  alternates: {
    canonical: `${siteConfig.url}/tools/text-to-speech`,
  },
}

export default function TextToSpeechPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Text to Speech (TTS)',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: 'AI-powered text-to-speech converter. Generate natural-sounding audio from text with multiple voice options. Free, fast, and completely private.',
        url: `${siteConfig.url}/tools/text-to-speech`,
        dateModified: lastModified.toISOString(),
        browserRequirements: 'Requires JavaScript and modern browser with WebAssembly support.',
        softwareVersion: '1.0',
        featureList: [
          'AI-powered speech synthesis',
          '30+ natural-sounding voices',
          'Multiple language support',
          'Customizable text length',
          'Real-time generation',
          '100% client-side processing',
          'No data uploaded to servers',
          'Fast offline support',
          'Download audio as WAV',
          'Works offline after first load',
        ],
      },
      {
        '@type': 'HowTo',
        name: 'How to Convert Text to Speech',
        description: 'Step-by-step guide to convert text to natural-sounding speech',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Enter Text',
            text: 'Type or paste the text you want to convert to speech in the text input area (up to 500 characters)',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Select Voice',
            text: 'Choose your preferred voice from the dropdown menu (30+ voices available)',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Generate Speech',
            text: 'Click the "Generate Speech" button to convert your text to audio',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Listen or Download',
            text: 'Play the generated audio using the playback controls or download it as a WAV file',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is Text to Speech (TTS)?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Text to Speech is technology that converts written text into natural-sounding speech. This tool uses AI-powered voice synthesis to generate audio from your text.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is my data safe when using this TTS tool?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! All text-to-speech processing happens entirely in your browser. Your text and generated audio never leave your device and are never uploaded to any server. Your privacy is completely protected.',
            },
          },
          {
            '@type': 'Question',
            name: 'How many characters can I convert at once?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'You can convert up to 500 characters at a time. This ensures fast and reliable speech generation. For longer content, you can convert multiple sections separately.',
            },
          },
          {
            '@type': 'Question',
            name: 'How many voices are available?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'We offer 30+ high-quality AI voices across multiple languages including English (American and British), Japanese, Spanish, French, Hindi, Italian, and Portuguese.',
            },
          },
          {
            '@type': 'Question',
            name: 'How fast is the speech generation?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Most text is converted to speech in under 200 milliseconds. Typical sentences generate in 40-100ms on modern hardware. Speed depends on text length and your device capabilities.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does the TTS tool work offline?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! After the AI model is downloaded on first use (cached in your browser), the tool works completely offline. You can generate speech without an internet connection.',
            },
          },
          {
            '@type': 'Question',
            name: 'What audio format is generated?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The generated audio is in WAV format (PCM, 24kHz sampling rate, mono channel). WAV is a universal audio format compatible with all media players and editing software.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I download the generated audio?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! You can download the generated speech as a WAV file. Simply click the "Download WAV" button after generating your audio.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does the tool work on mobile devices?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, the TTS tool works on all modern smartphones and tablets (iOS and Android) with modern web browsers that support WebAssembly.',
            },
          },
          {
            '@type': 'Question',
            name: 'Which voices are best quality?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The top quality voices are: af_heart (Female American - Grade A), af_bella (Female American - Grade A-), and bf_emma (Female British - Grade B-). These deliver the most natural and expressive speech.',
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
            item: `${siteConfig.url}/#tools`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Text to Speech',
            item: `${siteConfig.url}/tools/text-to-speech`,
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

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">
            <span className="mr-3">🔊</span>
            Text to Speech
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Convert text to natural-sounding speech using AI. Choose from 30+ voices, generate instantly, and download as audio.
          </p>
        </div>

        <TextToSpeechConverter />

        <div className="max-w-4xl mx-auto mt-12 space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-4">How to Use Text to Speech</h2>
            <ol className="space-y-3 list-decimal list-inside">
              <li className="text-muted-foreground">
                <strong className="text-foreground">Enter Text:</strong> Type or paste up to 500 characters in the text input area
              </li>
              <li className="text-muted-foreground">
                <strong className="text-foreground">Choose Voice:</strong> Select your preferred voice from the dropdown (30+ options available)
              </li>
              <li className="text-muted-foreground">
                <strong className="text-foreground">Generate:</strong> Click the "Generate Speech" button to create audio
              </li>
              <li className="text-muted-foreground">
                <strong className="text-foreground">Play or Download:</strong> Listen using the player or download as WAV file
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Features</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-2">🎤 30+ Quality Voices</h3>
                <p className="text-sm text-muted-foreground">
                  Multiple natural-sounding voices in different languages including American, British, Japanese, Spanish, and more
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-2">⚡ Instant Generation</h3>
                <p className="text-sm text-muted-foreground">
                  Most text converts to speech in under 200ms. Fast, reliable, and responsive
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-2">🔒 100% Private</h3>
                <p className="text-sm text-muted-foreground">
                  All processing happens in your browser. Your text and audio never leave your device
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-2">📥 Download as WAV</h3>
                <p className="text-sm text-muted-foreground">
                  Download generated audio in WAV format compatible with all media players and editors
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-2">🌐 Works Offline</h3>
                <p className="text-sm text-muted-foreground">
                  After first load, generate speech without internet connection. Model cached locally
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-2">📱 Mobile Compatible</h3>
                <p className="text-sm text-muted-foreground">
                  Works on all modern smartphones and tablets with no installation required
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-2">💰 Completely Free</h3>
                <p className="text-sm text-muted-foreground">
                  No subscriptions, no limits, no watermarks. Free forever with no hidden costs
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-2">🎯 Natural Synthesis</h3>
                <p className="text-sm text-muted-foreground">
                  AI-powered voice synthesis produces natural, expressive speech with proper intonation
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Supported Voices</h2>
            <div className="space-y-3">
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-1">👩 Female Voices (Grade A)</h3>
                <p className="text-sm text-muted-foreground">
                  af_heart (American), af_bella (American) - Best quality options for female voices
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-1">👨 Male Voices (Grade C+)</h3>
                <p className="text-sm text-muted-foreground">
                  am_michael (American), am_fenrir (American) - High-quality male voice options
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-1">🇬🇧 British Voices</h3>
                <p className="text-sm text-muted-foreground">
                  bf_emma (Female), bm_george (Male) - British English pronunciation options
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-1">🌍 30+ Total Voices</h3>
                <p className="text-sm text-muted-foreground">
                  Additional voices in Japanese, Spanish, French, Hindi, Italian, Portuguese, and Mandarin Chinese
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Use Cases</h2>
            <div className="space-y-3">
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-1">📚 Content Creation</h3>
                <p className="text-sm text-muted-foreground">
                  Generate voiceovers for videos, podcasts, audiobooks, and presentations
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-1">♿ Accessibility</h3>
                <p className="text-sm text-muted-foreground">
                  Make web content and documents accessible through audio narration
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-1">🎓 Education</h3>
                <p className="text-sm text-muted-foreground">
                  Create educational content, tutorials, and learning materials with narration
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-1">🎮 Gaming</h3>
                <p className="text-sm text-muted-foreground">
                  Generate game dialogue, NPC voices, and interactive audio content
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-1">🎤 Voiceover Practice</h3>
                <p className="text-sm text-muted-foreground">
                  Generate reference audio for voice acting and narration practice
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-1">💼 Business Applications</h3>
                <p className="text-sm text-muted-foreground">
                  Create announcements, IVR systems, notifications, and professional audio content
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">What makes this TTS tool special?</h3>
                <p className="text-muted-foreground">
                  We use state-of-the-art Kokoro-82M AI model, ranked #1 in TTS quality benchmarks.
                  It outperforms models 5-15x its size in natural speech synthesis. Plus, it's
                  completely free and works entirely in your browser with no server uploads.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Is my text stored or logged?</h3>
                <p className="text-muted-foreground">
                  No. All processing happens locally in your browser. Your text is never sent to any server.
                  We don't store, log, or track any of your inputs or generated audio. Your privacy is guaranteed.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">How much text can I convert at once?</h3>
                <p className="text-muted-foreground">
                  Up to 500 characters per generation. This is the optimal length for fastest and most
                  natural results. For longer content, split it into multiple sections and generate separately.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Which voice sounds best?</h3>
                <p className="text-muted-foreground">
                  af_heart (Female American) and af_bella (Female American) are Grade A quality and sound most natural.
                  All voices are high-quality, so choose based on your preference for gender and accent.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">How long does it take to generate speech?</h3>
                <p className="text-muted-foreground">
                  Most text converts in 40-200 milliseconds (under 0.2 seconds). The first time you use the tool,
                  the AI model downloads (~90MB, takes 1-3 minutes depending on internet speed). After that, it's cached for instant use.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Can I use the generated audio commercially?</h3>
                <p className="text-muted-foreground">
                  Yes! Audio generated by this tool is yours to use. You can use it in personal projects,
                  commercial products, videos, and any other use without attribution required.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Does it work on my phone?</h3>
                <p className="text-muted-foreground">
                  Yes! The TTS tool works on all modern smartphones (iOS and Android) with any modern web browser.
                  No app installation needed. Just visit on your phone's browser.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Can I edit the generated audio?</h3>
                <p className="text-muted-foreground">
                  The generated WAV files can be edited in any audio editor like Audacity, Adobe Audition, or similar software.
                  You can trim, adjust volume, add effects, and more.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">What if the speech quality sounds robotic?</h3>
                <p className="text-muted-foreground">
                  AI voices may sound slightly artificial to some ears. For best results: use Grade A voices
                  (af_heart/af_bella), keep text length moderate (100-200 characters), and add punctuation
                  to guide prosody (pauses, emphasis).
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Why does the first load take longer?</h3>
                <p className="text-muted-foreground">
                  The AI model (~90MB) needs to download on first use. This is cached in your browser, so
                  subsequent uses are instant. Subsequent loads after browser restart may require redownloading.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Why Choose Our TTS Tool?</h2>
            <div className="space-y-3">
              <div className="p-4 rounded-lg border-l-4 border-primary bg-card">
                <h3 className="font-semibold mb-2">Best-in-Class Quality</h3>
                <p className="text-sm text-muted-foreground">
                  Uses Kokoro-82M, the #1 ranked TTS model in benchmarks.
                  Outperforms larger commercial models from major tech companies.
                </p>
              </div>
              <div className="p-4 rounded-lg border-l-4 border-primary bg-card">
                <h3 className="font-semibold mb-2">Complete Privacy</h3>
                <p className="text-sm text-muted-foreground">
                  100% browser-based processing. No server uploads, no data collection, no tracking.
                  Your data never leaves your device.
                </p>
              </div>
              <div className="p-4 rounded-lg border-l-4 border-primary bg-card">
                <h3 className="font-semibold mb-2">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground">
                  Generate speech in under 200ms. No waiting for server processing.
                  Real-time performance on local hardware.
                </p>
              </div>
              <div className="p-4 rounded-lg border-l-4 border-primary bg-card">
                <h3 className="font-semibold mb-2">Works Offline</h3>
                <p className="text-sm text-muted-foreground">
                  After first load, use completely offline. Model cached in your browser.
                  No internet required for subsequent uses.
                </p>
              </div>
              <div className="p-4 rounded-lg border-l-4 border-primary bg-card">
                <h3 className="font-semibold mb-2">Completely Free</h3>
                <p className="text-sm text-muted-foreground">
                  No subscriptions, no limits, no watermarks, no ads.
                  Use unlimited times at no cost whatsoever.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <a
                href="/tools/speech-to-text"
                className="p-4 rounded-lg border bg-card hover:bg-accent transition-colors"
              >
                <h3 className="font-semibold mb-1">🎤 Speech to Text</h3>
                <p className="text-sm text-muted-foreground">
                  Convert audio to text with AI speech recognition
                </p>
              </a>
              <a
                href="/tools/audio-trimmer"
                className="p-4 rounded-lg border bg-card hover:bg-accent transition-colors"
              >
                <h3 className="font-semibold mb-1">✂️ Audio Tools</h3>
                <p className="text-sm text-muted-foreground">
                  Trim, merge, and edit audio files
                </p>
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

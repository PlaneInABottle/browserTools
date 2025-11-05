import type { Metadata } from 'next'
import SpeechToTextTool from '@/components/tools/SpeechToText'

export const metadata: Metadata = {
  title: 'Speech to Text Converter',
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
    title: 'Speech to Text Converter - Free & Private',
    description: 'Convert speech to text instantly with AI. Free, fast, and completely private.',
    type: 'website',
  },
}

export const dynamic = 'force-static'

export default function SpeechToTextPage() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600 mb-6">
        <a href="/" className="hover:text-blue-600">Home</a>
        <span className="mx-2">/</span>
        <a href="/tools/speech-to-text" className="hover:text-blue-600">Tools</a>
        <span className="mx-2">/</span>
        <span>Speech to Text</span>
      </nav>

      {/* Page Header */}
      <div className="text-center mb-12">
        <div className="text-6xl mb-4">🎤</div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900">
          Speech to Text Converter
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Convert audio recordings to text using AI. Free, fast, and completely private.
        </p>
      </div>

      {/* Tool Component */}
      <SpeechToTextTool />

      {/* How to Use */}
      <section className="mt-16 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">How to Use</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-600">
          <li>Click "Start Recording" to begin capturing audio from your microphone</li>
          <li>Speak clearly into your microphone</li>
          <li>Click "Stop Recording" when finished</li>
          <li>The AI model will download automatically (first time only, ~150MB)</li>
          <li>Your transcription will appear within seconds</li>
        </ol>
      </section>

      {/* FAQ */}
      <section className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-2">Is my audio data private?</h3>
            <p className="text-gray-600">
              Yes! Everything runs in your browser. Your audio never leaves your device.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">What model is used?</h3>
            <p className="text-gray-600">
              We use Whisper Tiny from OpenAI, optimized for browser use via Transformers.js.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Why is there a download on first use?</h3>
            <p className="text-gray-600">
              The AI model (~150MB) downloads once and is cached in your browser for future use.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Does it work offline?</h3>
            <p className="text-gray-600">
              After the first use, yes! The model is cached locally, so you can use it offline.
            </p>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <section className="mt-8 bg-gray-50 rounded-xl border border-gray-200 p-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Coming Soon</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-lg border border-gray-200 opacity-50">
            <div className="text-3xl mb-2">🖼️</div>
            <h3 className="font-semibold">Image Resizer</h3>
            <p className="text-sm text-gray-600">Resize and optimize images</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-gray-200 opacity-50">
            <div className="text-3xl mb-2">📄</div>
            <h3 className="font-semibold">PDF Converter</h3>
            <p className="text-sm text-gray-600">Convert files to/from PDF</p>
          </div>
        </div>
      </section>
    </div>
  )
}

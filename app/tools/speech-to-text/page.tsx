import type { Metadata } from 'next'
import Link from 'next/link'
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
      <nav className="text-sm mb-6" aria-label="Breadcrumb">
        <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:underline focus:underline focus:outline-none focus:ring-1 focus:ring-blue-500">Home</Link>
        <span className="mx-2 text-gray-400 dark:text-gray-600">/</span>
        <Link href="/tools/speech-to-text" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:underline focus:underline focus:outline-none focus:ring-1 focus:ring-blue-500">Tools</Link>
        <span className="mx-2 text-gray-400 dark:text-gray-600">/</span>
        <span className="text-gray-900 dark:text-gray-100 font-medium" aria-current="page">Speech to Text</span>
      </nav>

      {/* Page Header */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-12">
        <div className="text-center">
          <div className="text-6xl mb-4">🎤</div>
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Speech to Text Converter
          </h1>
          <p className="text-xl text-gray-800 dark:text-gray-300 max-w-2xl mx-auto">
            Convert audio recordings to text using AI. Free, fast, and completely private.
          </p>
        </div>
      </div>

      {/* Tool Component */}
      <SpeechToTextTool />

      {/* How to Use */}
      <section className="mt-16 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">How to Use</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-800 dark:text-gray-300 leading-relaxed">
          <li>Click "Start Recording" to begin capturing audio from your microphone</li>
          <li>Speak clearly into your microphone</li>
          <li>Click "Stop Recording" when finished</li>
          <li>The AI model will download automatically (first time only, ~150MB)</li>
          <li>Your transcription will appear within seconds</li>
        </ol>
      </section>

      {/* FAQ */}
      <section className="mt-8 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">Is my audio data private?</h3>
            <p className="text-gray-800 dark:text-gray-300 leading-relaxed">
              Yes! Everything runs in your browser. Your audio never leaves your device.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">What model is used?</h3>
            <p className="text-gray-800 dark:text-gray-300 leading-relaxed">
              We use Whisper Tiny from OpenAI, optimized for browser use via Transformers.js.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">Why is there a download on first use?</h3>
            <p className="text-gray-800 dark:text-gray-300 leading-relaxed">
              The AI model (~150MB) downloads once and is cached in your browser for future use.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">Does it work offline?</h3>
            <p className="text-gray-800 dark:text-gray-300 leading-relaxed">
              After the first use, yes! The model is cached locally, so you can use it offline.
            </p>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <section className="mt-8 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Coming Soon</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-slate-800/50 rounded-lg border-2 border-gray-300 dark:border-gray-700 border-dashed">
            <div className="text-3xl mb-2 grayscale opacity-60">🖼️</div>
            <h3 className="font-semibold text-gray-600 dark:text-gray-400">Image Resizer</h3>
            <p className="text-sm text-gray-600 dark:text-gray-500">Resize and optimize images</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-slate-800/50 rounded-lg border-2 border-gray-300 dark:border-gray-700 border-dashed">
            <div className="text-3xl mb-2 grayscale opacity-60">📄</div>
            <h3 className="font-semibold text-gray-600 dark:text-gray-400">PDF Converter</h3>
            <p className="text-sm text-gray-600 dark:text-gray-500">Convert files to/from PDF</p>
          </div>
        </div>
      </section>
    </div>
  )
}

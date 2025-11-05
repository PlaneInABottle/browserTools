import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://quicktools.tools'),
  title: {
    default: 'QuickTools - Free Browser Utilities',
    template: '%s | QuickTools'
  },
  description: 'Quick & simple browser utilities. Convert, resize, transcribe - all for free. Privacy-focused tools that run entirely in your browser.',
  keywords: ['online tools', 'browser tools', 'free tools', 'speech to text', 'pdf converter', 'image resizer', 'privacy tools'],
  authors: [{ name: 'QuickTools' }],
  creator: 'QuickTools',
  publisher: 'QuickTools',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://quicktools.tools',
    siteName: 'QuickTools',
    title: 'QuickTools - Free Browser Utilities',
    description: 'Quick & simple browser utilities. All processing happens in your browser.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'QuickTools - Free Browser Utilities',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QuickTools - Free Browser Utilities',
    description: 'Quick & simple browser utilities',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <a href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                QuickTools
              </a>
              <nav className="hidden md:flex gap-6">
                <a href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Home
                </a>
                <a href="/tools/speech-to-text" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Tools
                </a>
                <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">
                  About
                </a>
              </nav>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="border-t bg-white mt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center text-gray-600 text-sm">
              <p className="mb-2">© 2024 QuickTools. All rights reserved.</p>
              <p className="text-xs">All tools run locally in your browser. No data is sent to our servers.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

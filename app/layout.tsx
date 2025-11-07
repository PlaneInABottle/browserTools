import type { Metadata, Viewport } from "next";
import "./globals.css";
import Link from "next/link";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/lib/config/site";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Toolympics - Free Browser Utilities',
    template: '%s | Toolympics'
  },
  description: siteConfig.description,
  keywords: ['online tools', 'browser tools', 'free tools', 'speech to text', 'pdf converter', 'image resizer', 'privacy tools'],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: 'Toolympics - Free Browser Utilities',
    description: 'Quick & simple browser utilities. All processing happens in your browser.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Toolympics - Free Browser Utilities',
    description: siteConfig.shortDescription,
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
  verification: {
    // Add when ready: google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
}

// Organization Schema
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/icon?size=512`,
  sameAs: [],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="antialiased min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 text-gray-900 dark:text-gray-100 transition-colors">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <header className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 focus:text-blue-800 dark:focus:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 rounded transition-colors">
                  Toolympics
                </Link>
                <div className="flex items-center gap-4">
                  <nav className="hidden md:flex gap-6" aria-label="Main navigation">
                    <Link href="/" className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 focus:text-blue-600 dark:focus:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 rounded px-2 py-1 transition-colors">
                      Home
                    </Link>
                    <Link href="/#tools" className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 focus:text-blue-600 dark:focus:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 rounded px-2 py-1 transition-colors">
                      Tools
                    </Link>
                    <Link href="#about" className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 focus:text-blue-600 dark:focus:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 rounded px-2 py-1 transition-colors">
                      About
                    </Link>
                  </nav>
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 mt-20">
            <div className="container mx-auto px-4 py-8">
              <div className="text-center text-gray-700 dark:text-gray-300 text-sm">
                <p className="mb-2">© 2025 Toolympics. All rights reserved.</p>
                <p className="text-xs text-gray-700 dark:text-gray-400">All tools run locally in your browser. No data is sent to our servers.</p>
              </div>
            </div>
          </footer>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

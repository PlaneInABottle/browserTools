import Link from 'next/link'
import type { Metadata } from 'next'
import { tools, categories } from '@/lib/tools/tool-registry'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { siteConfig } from '@/lib/config/site'
import { getHomePageLastModified } from '@/lib/utils/git-dates'

export const metadata: Metadata = {
  title: 'Toolympics - Free Online Browser Tools | Privacy-First Utilities',
  description: 'Free online tools for everyday tasks. Speech to text, PDF merger, image resizer, word counter, and more. All tools run in your browser - 100% private, no uploads.',
  keywords: [
    'free online tools',
    'browser utilities',
    'privacy tools',
    'speech to text',
    'pdf merger',
    'image resizer',
    'word counter',
    'text diff checker',
    'markdown converter',
    'json formatter',
    'video to gif',
    'video converter',
    'gif maker',
    'client-side tools',
    'no upload tools',
  ],
  openGraph: {
    title: 'Toolympics - Free Browser Tools',
    description: 'Quick & simple browser utilities. All processing happens in your browser. 100% free and private.',
    type: 'website',
    url: siteConfig.url,
    images: [
      {
        url: `${siteConfig.url}/og-image.svg`,
        width: 1200,
        height: 630,
        alt: 'Toolympics - Free Browser Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Toolympics - Free Browser Tools',
    description: 'Quick & simple browser utilities. 100% free and private.',
    images: [`${siteConfig.url}/og-image.svg`],
  },
  alternates: {
    canonical: siteConfig.url,
  },
}

export default function Home() {
  const lastModified = getHomePageLastModified()
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${siteConfig.url}/?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'ItemList',
        name: 'Available Tools',
        description: 'Free online browser tools',
        numberOfItems: tools.length,
        itemListElement: tools.map((tool, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'SoftwareApplication',
            name: tool.name,
            url: `${siteConfig.url}${tool.href}`,
            description: tool.description,
            applicationCategory: 'UtilityApplication',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
          },
        })),
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
      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Toolympics
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
          Quick & simple browser utilities. All for free.
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-400 max-w-2xl mx-auto">
          🔒 Privacy-first: All tools run entirely in your browser. No uploads, no tracking, no data collection.
        </p>
      </section>

      {/* Tool Sections by Category */}
      <section id="tools" className="space-y-6">
        {categories.filter(cat => cat.id !== 'all').map((category) => {
          const categoryTools = tools.filter(tool => tool.category === category.id)

          return (
            <div key={category.id}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{category.icon}</span>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {category.name}
                </h2>
                <span className="text-xs text-muted-foreground ml-auto">
                  {categoryTools.length} tool{categoryTools.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pb-6">
                {categoryTools.map((tool) => (
                  <Link key={tool.id} href={tool.href} className="block h-full">
                    <Card className="h-full hover:shadow-md hover:border-primary/50 transition-all group cursor-pointer">
                      <CardHeader className="pb-3">
                        <div className="flex items-start gap-2">
                          <div className="text-2xl flex-shrink-0">{tool.icon}</div>
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-sm group-hover:text-primary transition-colors line-clamp-2">
                              {tool.name}
                            </CardTitle>
                            <CardDescription className="text-xs mt-1 leading-snug line-clamp-2">
                              {tool.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      {tool.aiPowered && (
                        <CardContent className="pt-2">
                          <Badge variant="outline" className="text-xs border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300">
                            ✨ AI
                          </Badge>
                        </CardContent>
                      )}
                    </Card>
                  </Link>
                ))}
              </div>
              <Separator className="mt-4" />
            </div>
          )
        })}

        {/* Coming Soon Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🚀</span>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Coming Soon
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <Card className="h-full border-dashed opacity-60">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-2">
                  <div className="text-2xl grayscale flex-shrink-0">📄</div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-sm text-muted-foreground line-clamp-2">PDF Converter</CardTitle>
                    <CardDescription className="text-xs mt-1 leading-snug line-clamp-2">Convert files to/from PDF</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="mt-20">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Why QuickTools?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-3xl mb-3">🔒</div>
                <h3 className="font-semibold text-lg mb-2">Privacy First</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  All processing happens locally in your browser. Your files never leave your device.
                </p>
              </div>
              <div>
                <div className="text-3xl mb-3">⚡</div>
                <h3 className="font-semibold text-lg mb-2">Lightning Fast</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  No uploads, no server processing. Get instant results without waiting.
                </p>
              </div>
              <div>
                <div className="text-3xl mb-3">💯</div>
                <h3 className="font-semibold text-lg mb-2">100% Free</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  No subscriptions, no hidden fees, no ads. Just free tools for everyone.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      </div>
    </>
  )
}

import Link from 'next/link'
import { tools, categories } from '@/lib/tools/tool-registry'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export default function Home() {
  return (
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

      {/* Tool Grid */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Available Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link key={tool.id} href={tool.href} className="block h-full">
              <Card className="h-full hover:shadow-lg hover:border-primary/50 transition-all group cursor-pointer">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{tool.icon}</div>
                    <div className="flex-1">
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {tool.name}
                      </CardTitle>
                      <CardDescription className="mt-2 leading-relaxed">
                        {tool.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{tool.category}</Badge>
                    <Badge variant="outline" className="border-green-200 dark:border-green-700 text-green-700 dark:text-green-300">
                      ✓ Free
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}

          {/* Coming Soon Cards */}
          <Card className="h-full border-dashed opacity-60">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="text-4xl grayscale">📄</div>
                <div className="flex-1">
                  <CardTitle className="text-muted-foreground">PDF Converter</CardTitle>
                  <CardDescription>Convert files to/from PDF</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary">Coming Soon</Badge>
            </CardContent>
          </Card>
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
  )
}

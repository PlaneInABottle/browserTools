import Link from 'next/link'
import { tools, categories } from '@/lib/tools/tool-registry'

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          QuickTools
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
            <Link
              key={tool.id}
              href={tool.href}
              className="block p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{tool.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 leading-relaxed">
                    {tool.description}
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full font-medium border border-blue-200 dark:border-blue-700">
                      {tool.category}
                    </span>
                    <span className="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded-full font-medium border border-green-200 dark:border-green-700">
                      ✓ Free
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {/* Coming Soon Cards */}
          <div className="p-6 bg-gray-50 dark:bg-slate-800/50 rounded-xl border-2 border-gray-300 dark:border-gray-700 border-dashed">
            <div className="flex items-start gap-4">
              <div className="text-4xl grayscale opacity-60">🖼️</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-600 dark:text-gray-400">
                  Image Resizer
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-500 mt-1">
                  Resize and optimize images
                </p>
                <span className="inline-block text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-400 px-2 py-1 rounded-full mt-3 font-medium">
                  Coming Soon
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-50 dark:bg-slate-800/50 rounded-xl border-2 border-gray-300 dark:border-gray-700 border-dashed">
            <div className="flex items-start gap-4">
              <div className="text-4xl grayscale opacity-60">📄</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-600 dark:text-gray-400">
                  PDF Converter
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-500 mt-1">
                  Convert files to/from PDF
                </p>
                <span className="inline-block text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-400 px-2 py-1 rounded-full mt-3 font-medium">
                  Coming Soon
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="mt-20 py-16 px-8 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Why QuickTools?</h2>
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <div>
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">Privacy First</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              All processing happens locally in your browser. Your files never leave your device.
            </p>
          </div>
          <div>
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">Lightning Fast</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              No uploads, no server processing. Get instant results without waiting.
            </p>
          </div>
          <div>
            <div className="text-3xl mb-3">💯</div>
            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">100% Free</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              No subscriptions, no hidden fees, no ads. Just free tools for everyone.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

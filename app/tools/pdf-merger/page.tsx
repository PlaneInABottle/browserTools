import { Metadata } from 'next'
import PdfMerger from '@/components/tools/PdfMerger'
import { getToolPageLastModified } from '@/lib/utils/git-dates'
import { siteConfig } from '@/lib/config/site'

const lastModified = getToolPageLastModified('pdf-merger')

export const metadata: Metadata = {
  title: 'PDF Merger - Combine Multiple PDFs Online Free | Toolympics',
  description: 'Merge multiple PDF files into one document online. Free, fast, and secure. All processing happens in your browser - no upload required. Combine unlimited PDFs instantly.',
  keywords: [
    'pdf merger',
    'combine pdf',
    'merge pdf online',
    'join pdf files',
    'pdf combiner',
    'merge pdf free',
    'combine pdf files',
    'pdf joiner',
    'merge multiple pdfs',
    'pdf merge tool',
  ],
  openGraph: {
    title: 'PDF Merger - Combine Multiple PDFs Online Free',
    description: 'Merge multiple PDF files into one document. Free, fast, and secure. All processing happens in your browser - no upload required.',
    type: 'website',
    url: `${siteConfig.url}/tools/pdf-merger`,
    images: [
      {
        url: `${siteConfig.url}/og-images/pdf-merger.svg`,
        width: 1200,
        height: 630,
        alt: 'PDF Merger Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF Merger - Combine Multiple PDFs Online Free',
    description: 'Merge multiple PDF files into one document. Free, fast, and secure. Works in your browser.',
    images: [`${siteConfig.url}/og-images/pdf-merger.svg`],
  },
  alternates: {
    canonical: `${siteConfig.url}/tools/pdf-merger`,
  },
}

export default function PdfMergerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'PDF Merger',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: 'Merge multiple PDF files into one document online. Free, fast, and secure. All processing happens in your browser.',
        url: `${siteConfig.url}/tools/pdf-merger`,
        dateModified: lastModified.toISOString(),
        browserRequirements: 'Requires JavaScript. Works with modern browsers.',
        softwareVersion: '1.0',
        featureList: [
          'Merge unlimited PDFs',
          'Drag and drop interface',
          'Reorder PDFs before merging',
          'No file size limits',
          '100% client-side processing',
          'No data uploaded to servers',
          'Fast and secure',
          'Works offline',
        ],
      },
      {
        '@type': 'HowTo',
        name: 'How to Merge PDF Files',
        description: 'Step-by-step guide to merge multiple PDF files into one document',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Upload PDFs',
            text: 'Click "Select PDFs" or drag and drop PDF files into the upload area',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Reorder (Optional)',
            text: 'Drag and drop PDFs to change their order in the final merged document',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Set Filename',
            text: 'Optional: Enter a custom filename for your merged PDF',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Merge PDFs',
            text: 'Click the "Merge PDFs" button to combine all files',
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Download',
            text: 'Your merged PDF will automatically download to your device',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Is my data safe when using this PDF merger?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! All PDF merging happens entirely in your browser. Your files never leave your device and are never uploaded to any server. We cannot see your files.',
            },
          },
          {
            '@type': 'Question',
            name: 'How many PDF files can I merge at once?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'There is no strict limit on the number of PDFs you can merge. However, for optimal browser performance, we recommend keeping the total file size under 50MB.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I reorder PDFs before merging them?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! You can drag and drop PDFs to reorder them in any sequence. The final merged PDF will contain pages in the order you specify.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does the PDF merger work on mobile devices?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, the PDF merger works on all modern browsers including mobile devices (iOS Safari, Android Chrome). However, performance may vary based on device capabilities.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do you keep copies of my PDF files?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. All processing happens locally in your browser. We never receive, store, or have access to your files. Your privacy is completely protected.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the file size limit for PDF merging?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Individual files are limited to 10MB each, with a total combined size limit of 50MB. These are soft limits to ensure good browser performance.',
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
            name: 'PDF Merger',
            item: `${siteConfig.url}/tools/pdf-merger`,
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
            <span className="mr-3">📄</span>
            PDF Merger
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Combine multiple PDF files into a single document. Free, fast, and completely private.
          </p>
        </div>

        <PdfMerger />

        <div className="max-w-4xl mx-auto mt-12 space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-4">How to Merge PDFs</h2>
            <ol className="space-y-3 list-decimal list-inside">
              <li className="text-muted-foreground">
                <strong className="text-foreground">Upload PDFs:</strong> Click "Select PDFs" or drag and drop multiple PDF files
              </li>
              <li className="text-muted-foreground">
                <strong className="text-foreground">Reorder (Optional):</strong> Drag and drop PDFs to change their order
              </li>
              <li className="text-muted-foreground">
                <strong className="text-foreground">Set Filename:</strong> Optional - Enter a custom filename for your merged PDF
              </li>
              <li className="text-muted-foreground">
                <strong className="text-foreground">Merge PDFs:</strong> Click the "Merge PDFs" button to combine all files
              </li>
              <li className="text-muted-foreground">
                <strong className="text-foreground">Download:</strong> Your merged PDF will automatically download
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Features</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-2">✅ Unlimited Merging</h3>
                <p className="text-sm text-muted-foreground">
                  Merge as many PDF files as you need with no daily limits or restrictions
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-2">🔒 100% Private</h3>
                <p className="text-sm text-muted-foreground">
                  All processing happens in your browser. Files never leave your device
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-2">⚡ Lightning Fast</h3>
                <p className="text-sm text-muted-foreground">
                  No upload or download delays. Merge PDFs instantly on your device
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-2">📱 Works Everywhere</h3>
                <p className="text-sm text-muted-foreground">
                  Compatible with desktop and mobile browsers. No installation required
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-2">🎯 Easy Reordering</h3>
                <p className="text-sm text-muted-foreground">
                  Drag and drop to arrange PDFs in any order before merging
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-2">💰 Completely Free</h3>
                <p className="text-sm text-muted-foreground">
                  No subscriptions, no watermarks, no hidden costs. Free forever
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-2">🔄 No Registration</h3>
                <p className="text-sm text-muted-foreground">
                  Start merging PDFs immediately without creating an account
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-2">📊 Page Count Display</h3>
                <p className="text-sm text-muted-foreground">
                  See page count and file size for each PDF before merging
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Use Cases</h2>
            <div className="space-y-3">
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-1">📄 Combine Business Documents</h3>
                <p className="text-sm text-muted-foreground">
                  Merge invoices, contracts, and reports into a single professional document
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-1">📚 Consolidate Study Materials</h3>
                <p className="text-sm text-muted-foreground">
                  Combine lecture notes, slides, and handouts into one easy-to-reference PDF
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-1">📋 Create Portfolio</h3>
                <p className="text-sm text-muted-foreground">
                  Merge your resume, cover letter, and work samples into a single portfolio
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-1">📑 Organize Legal Documents</h3>
                <p className="text-sm text-muted-foreground">
                  Combine related legal documents, contracts, or case materials
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-1">📸 Merge Scanned Pages</h3>
                <p className="text-sm text-muted-foreground">
                  Combine multiple scanned pages into a single searchable document
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-1">✈️ Travel Documents</h3>
                <p className="text-sm text-muted-foreground">
                  Keep all travel confirmations, tickets, and itineraries in one file
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Is my data safe when using this PDF merger?</h3>
                <p className="text-muted-foreground">
                  Yes! All PDF merging happens entirely in your browser. Your files never leave your device 
                  and are never uploaded to any server. We cannot see your files. This makes our tool 
                  significantly more secure than online services that require uploading your documents.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">How many PDF files can I merge at once?</h3>
                <p className="text-muted-foreground">
                  There is no strict limit on the number of PDFs you can merge. However, for optimal 
                  browser performance, we recommend keeping the total file size under 50MB. Modern 
                  browsers can typically handle merging 10-20 average-sized PDFs without issues.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Can I reorder PDFs before merging them?</h3>
                <p className="text-muted-foreground">
                  Yes! You can drag and drop PDFs to reorder them in any sequence. The final merged PDF 
                  will contain pages in the exact order you specify. This is useful when you need to 
                  organize documents in a specific sequence.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Does the PDF merger work on mobile devices?</h3>
                <p className="text-muted-foreground">
                  Yes, the PDF merger works on all modern browsers including mobile devices (iOS Safari, 
                  Android Chrome). However, performance may vary based on device capabilities and the 
                  size of your PDF files. Smaller files work best on mobile.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Do you keep copies of my PDF files?</h3>
                <p className="text-muted-foreground">
                  No. All processing happens locally in your browser using JavaScript. We never receive, 
                  store, or have access to your files. When you close the browser tab, all data is 
                  automatically cleared. Your privacy is completely protected.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">What is the file size limit for PDF merging?</h3>
                <p className="text-muted-foreground">
                  Individual files are limited to 10MB each, with a total combined size limit of 50MB. 
                  These are soft limits designed to ensure good browser performance. If you need to merge 
                  larger files, try splitting them or compressing them first.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Can I merge password-protected PDFs?</h3>
                <p className="text-muted-foreground">
                  Currently, password-protected (encrypted) PDFs cannot be merged. You will need to 
                  remove the password protection first, then merge the files. This is a browser 
                  limitation for security reasons.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Does merging reduce PDF quality?</h3>
                <p className="text-muted-foreground">
                  No! Our merger preserves the original quality of all PDFs. Pages are copied exactly 
                  as they are, maintaining all text, images, formatting, and metadata without compression 
                  or quality loss.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Why Choose Our PDF Merger?</h2>
            <div className="space-y-3">
              <div className="p-4 rounded-lg border-l-4 border-primary bg-card">
                <h3 className="font-semibold mb-2">Privacy First</h3>
                <p className="text-sm text-muted-foreground">
                  Unlike other online PDF mergers, your files never touch our servers. Everything 
                  happens in your browser, giving you complete privacy and security.
                </p>
              </div>
              <div className="p-4 rounded-lg border-l-4 border-primary bg-card">
                <h3 className="font-semibold mb-2">No Limitations</h3>
                <p className="text-sm text-muted-foreground">
                  Other services limit daily merges, file sizes, or require subscriptions. Our tool 
                  is completely free with no artificial restrictions or watermarks.
                </p>
              </div>
              <div className="p-4 rounded-lg border-l-4 border-primary bg-card">
                <h3 className="font-semibold mb-2">Faster Processing</h3>
                <p className="text-sm text-muted-foreground">
                  No upload or download delays. Since processing happens locally, merging is instant. 
                  Other services waste time uploading and downloading your files.
                </p>
              </div>
              <div className="p-4 rounded-lg border-l-4 border-primary bg-card">
                <h3 className="font-semibold mb-2">Works Offline</h3>
                <p className="text-sm text-muted-foreground">
                  After the initial page load, you can merge PDFs even without an internet connection. 
                  Perfect for sensitive documents or working on the go.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <a
                href="/tools/word-counter"
                className="p-4 rounded-lg border bg-card hover:bg-accent transition-colors"
              >
                <h3 className="font-semibold mb-1">📝 Word Counter</h3>
                <p className="text-sm text-muted-foreground">
                  Count words, characters, and sentences in your text
                </p>
              </a>
              <a
                href="/tools/markdown-to-html"
                className="p-4 rounded-lg border bg-card hover:bg-accent transition-colors"
              >
                <h3 className="font-semibold mb-1">📄 Markdown to HTML</h3>
                <p className="text-sm text-muted-foreground">
                  Convert Markdown to HTML with live preview
                </p>
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

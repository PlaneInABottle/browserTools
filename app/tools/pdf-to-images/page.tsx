import { Metadata } from 'next'
import { PdfToImagesConverter } from '@/components/tools/PdfToImages'
import { getToolPageLastModified } from '@/lib/utils/git-dates'
import { siteConfig } from '@/lib/config/site'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

const lastModified = getToolPageLastModified('pdf-to-images')

export const metadata: Metadata = {
  title: 'PDF to Images Converter - Extract Pages as JPG/PNG | Toolympics',
  description: 'Convert PDF pages to images (JPG or PNG) online for free. Extract individual pages or batch convert. Adjustable quality and resolution. Completely private - works offline.',
  keywords: [
    'pdf to images',
    'pdf to jpg',
    'pdf to png',
    'convert pdf to image',
    'extract pdf pages',
    'pdf converter',
    'pdf to picture',
    'batch convert pdf',
    'pdf splitter',
    'extract pages from pdf',
  ],
  openGraph: {
    title: 'PDF to Images Converter - Extract Pages as JPG/PNG',
    description: 'Convert PDF pages to images with adjustable quality and resolution. Free, fast, and completely private. Works offline.',
    type: 'website',
    url: `${siteConfig.url}/tools/pdf-to-images`,
    images: [
      {
        url: `${siteConfig.url}/og-images/pdf-to-images.svg`,
        width: 1200,
        height: 630,
        alt: 'PDF to Images Converter Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF to Images Converter - Extract Pages as JPG/PNG',
    description: 'Convert PDF pages to images with adjustable quality and resolution. Free and completely private.',
    images: [`${siteConfig.url}/og-images/pdf-to-images.svg`],
  },
  alternates: {
    canonical: `${siteConfig.url}/tools/pdf-to-images`,
  },
}

export default function PdfToImagesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'PDF to Images Converter',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: 'Convert PDF pages to images (JPG or PNG) online. Extract individual pages or batch convert with adjustable quality and resolution.',
        url: `${siteConfig.url}/tools/pdf-to-images`,
        dateModified: lastModified.toISOString(),
        browserRequirements: 'Requires JavaScript. Works with modern browsers.',
        softwareVersion: '1.0',
        featureList: [
          'Convert PDF to JPG or PNG',
          'Batch convert all pages',
          'Adjustable image quality',
          'Multiple resolution options (1x, 2x, 3x)',
          'Individual or ZIP download',
          '100% client-side processing',
          'No data uploaded to servers',
          'Works offline',
          'Supports up to 100 pages',
          'Drag and drop interface',
        ],
      },
      {
        '@type': 'HowTo',
        name: 'How to Convert PDF to Images',
        description: 'Step-by-step guide to convert PDF pages to image files',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Upload PDF',
            text: 'Click "Upload PDF" or drag and drop a PDF file into the upload area',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Configure Settings',
            text: 'Choose output format (PNG or JPEG), quality, and resolution scale',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Convert Pages',
            text: 'Click "Convert to Images" button to convert all PDF pages',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Preview',
            text: 'Preview the converted images as thumbnails',
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Download',
            text: 'Download individual images or all images as a ZIP file',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Is my PDF file safe when converting to images?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! All PDF conversion happens entirely in your browser. Your PDF file never leaves your device and is never uploaded to any server. We cannot see or store your files.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the maximum file size for PDF conversion?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Individual PDFs can be up to 10MB in size. PDFs can have up to 100 pages. These limits ensure optimal browser performance.',
            },
          },
          {
            '@type': 'Question',
            name: 'What formats can I convert PDFs to?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'You can convert PDF pages to either PNG (lossless) or JPEG (compressed) format. PNG files are larger but have perfect quality, while JPEG files are smaller with adjustable quality.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I adjust the quality of converted images?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! For JPEG format, you can adjust quality from 1-100%. For PNG, quality is always lossless. You can also choose different resolution scales: 1x (72 DPI), 2x (144 DPI), or 3x (216 DPI).',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I download all converted images at once?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! After conversion, you can download individual images or all images bundled together in a ZIP file for convenience.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does the converter work on mobile devices?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, the converter works on all modern browsers including mobile devices (iOS Safari, Android Chrome). Performance may vary based on device capabilities.',
            },
          },
          {
            '@type': 'Question',
            name: 'What happens to my PDF after conversion?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'All processing happens locally in your browser. Once you close the page or convert a new PDF, the previous PDF is completely removed from memory. No data is saved.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I convert encrypted or password-protected PDFs?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Currently, password-protected PDFs cannot be converted. You will need to remove the password protection first, then convert the PDF.',
            },
          },
          {
            '@type': 'Question',
            name: 'What resolution should I use for my images?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Use 1x (72 DPI) for web viewing and small file sizes. Use 2x (144 DPI) for standard quality and balance. Use 3x (216 DPI) for high-quality printing and detailed documents.',
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
            name: 'PDF to Images',
            item: `${siteConfig.url}/tools/pdf-to-images`,
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
            <span className="mr-3">🖼️</span>
            PDF to Images Converter
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Convert PDF pages to JPG or PNG images. Extract individual pages or batch convert all pages at once. Completely private and works offline.
          </p>
        </div>

        <PdfToImagesConverter />

        <div className="max-w-4xl mx-auto mt-12 space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-4">How to Convert PDF to Images</h2>
            <ol className="space-y-3 list-decimal list-inside">
              <li className="text-muted-foreground">
                <strong className="text-foreground">Upload PDF:</strong> Click the upload area or drag and drop a PDF file
              </li>
              <li className="text-muted-foreground">
                <strong className="text-foreground">Choose Format:</strong> Select PNG for lossless quality or JPEG for smaller file sizes
              </li>
              <li className="text-muted-foreground">
                <strong className="text-foreground">Set Quality:</strong> For JPEG, adjust quality slider (1-100%)
              </li>
              <li className="text-muted-foreground">
                <strong className="text-foreground">Select Resolution:</strong> Choose 1x (72 DPI), 2x (144 DPI), or 3x (216 DPI)
              </li>
              <li className="text-muted-foreground">
                <strong className="text-foreground">Convert:</strong> Click "Convert to Images" to process the PDF
              </li>
              <li className="text-muted-foreground">
                <strong className="text-foreground">Download:</strong> Download individual images or all as a ZIP file
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Features</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-2">🖼️ Multiple Formats</h3>
                <p className="text-sm text-muted-foreground">
                  Convert to PNG for lossless quality or JPEG for smaller files with adjustable quality
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-2">⚙️ Resolution Control</h3>
                <p className="text-sm text-muted-foreground">
                  Choose from 1x, 2x, or 3x resolution for optimal balance between quality and file size
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-2">🔒 100% Private</h3>
                <p className="text-sm text-muted-foreground">
                  All conversion happens in your browser. Your PDF never leaves your device
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-2">📦 Batch Download</h3>
                <p className="text-sm text-muted-foreground">
                  Download individual images or all pages as a convenient ZIP file
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-2">⚡ Lightning Fast</h3>
                <p className="text-sm text-muted-foreground">
                  No upload delays. Convert PDFs instantly on your device
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-2">📱 Works Everywhere</h3>
                <p className="text-sm text-muted-foreground">
                  Compatible with desktop and mobile browsers. No installation needed
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-2">👁️ Live Preview</h3>
                <p className="text-sm text-muted-foreground">
                  See thumbnail previews of all converted images before downloading
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-2">💰 Completely Free</h3>
                <p className="text-sm text-muted-foreground">
                  No subscriptions, no watermarks, no hidden costs. Free forever
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Use Cases</h2>
            <div className="space-y-3">
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-1">🖼️ Create Image Gallery</h3>
                <p className="text-sm text-muted-foreground">
                  Extract PDF pages as images for use in presentations or websites
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-1">📚 Share Document Pages</h3>
                <p className="text-sm text-muted-foreground">
                  Convert specific PDF pages to images for sharing on social media or messaging apps
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-1">📑 Archive Documents</h3>
                <p className="text-sm text-muted-foreground">
                  Convert important PDFs to images for easier viewing and archival
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-1">📋 Document Backup</h3>
                <p className="text-sm text-muted-foreground">
                  Create image backups of important documents like certificates or legal papers
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-1">📸 Create Thumbnails</h3>
                <p className="text-sm text-muted-foreground">
                  Generate thumbnail images from PDF pages for cataloging or indexing
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-1">🎓 Share Educational Content</h3>
                <p className="text-sm text-muted-foreground">
                  Convert lecture notes and textbook pages to shareable image format
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Is my PDF file safe when converting to images?</h3>
                <p className="text-muted-foreground">
                  Yes! All conversion happens entirely in your browser. Your PDF file never leaves your device
                  and is never uploaded to any server. We cannot see or store your files. This makes our converter
                  significantly more secure than cloud-based services.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">What is the maximum file size for conversion?</h3>
                <p className="text-muted-foreground">
                  Individual PDFs can be up to 10MB in size with a maximum of 100 pages. These limits ensure
                  good browser performance. If your PDF exceeds these limits, try splitting it into smaller documents first.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Should I use PNG or JPEG format?</h3>
                <p className="text-muted-foreground">
                  PNG format is lossless and maintains perfect quality, making it ideal for documents that need
                  to preserve text clarity and exact appearance. JPEG format uses compression, creating smaller
                  files with adjustable quality. Use PNG for important documents and JPEG for general web use.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">What is the difference between 1x, 2x, and 3x resolution?</h3>
                <p className="text-muted-foreground">
                  1x is 72 DPI (dots per inch) - best for web viewing, creates small files. 2x is 144 DPI -
                  recommended for screen viewing with good balance. 3x is 216 DPI - best for printing or
                  detailed documents requiring high quality.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Can I convert only specific pages from a PDF?</h3>
                <p className="text-muted-foreground">
                  Currently, the converter converts all pages in the PDF. If you need only specific pages,
                  consider using a PDF splitter first to extract only the pages you need, then convert.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">How can I download all images at once?</h3>
                <p className="text-muted-foreground">
                  After conversion, click the "Download All as ZIP" button to download all converted images
                  bundled into a single ZIP file. This is convenient for managing multiple images from large PDFs.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Does the converter work on mobile devices?</h3>
                <p className="text-muted-foreground">
                  Yes, the converter works on all modern browsers including iOS Safari and Android Chrome.
                  Performance may vary based on device capabilities. It works best on newer devices with
                  sufficient RAM and modern browser versions.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Can I convert password-protected PDFs?</h3>
                <p className="text-muted-foreground">
                  Currently, password-protected (encrypted) PDFs cannot be converted. You will need to remove
                  the password protection first using another tool, then convert the unencrypted PDF.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">What happens to my PDF after conversion?</h3>
                <p className="text-muted-foreground">
                  All processing happens locally in your browser using JavaScript. When you close the browser
                  tab or refresh the page, the PDF is automatically deleted from memory. No data is saved on
                  any servers.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Why Choose Our PDF to Images Converter?</h2>
            <div className="space-y-3">
              <div className="p-4 rounded-lg border-l-4 border-primary bg-card">
                <h3 className="font-semibold mb-2">Privacy First</h3>
                <p className="text-sm text-muted-foreground">
                  Unlike cloud-based converters, your PDF never leaves your device. All conversion happens
                  locally in your browser, ensuring complete privacy and security.
                </p>
              </div>
              <div className="p-4 rounded-lg border-l-4 border-primary bg-card">
                <h3 className="font-semibold mb-2">No Limitations</h3>
                <p className="text-sm text-muted-foreground">
                  Other services limit daily conversions or require paid subscriptions. Our tool is completely
                  free with no artificial restrictions or watermarks.
                </p>
              </div>
              <div className="p-4 rounded-lg border-l-4 border-primary bg-card">
                <h3 className="font-semibold mb-2">Full Control</h3>
                <p className="text-sm text-muted-foreground">
                  Adjust quality, resolution, and format to your exact needs. Download individual images or
                  all together as a ZIP file for maximum flexibility.
                </p>
              </div>
              <div className="p-4 rounded-lg border-l-4 border-primary bg-card">
                <h3 className="font-semibold mb-2">Faster Processing</h3>
                <p className="text-sm text-muted-foreground">
                  No upload or download delays. Since conversion happens locally, it's instant. Cloud services
                  waste time transferring your files.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <a
                href="/tools/pdf-merger"
                className="p-4 rounded-lg border bg-card hover:bg-accent transition-colors"
              >
                <h3 className="font-semibold mb-1">📄 PDF Merger</h3>
                <p className="text-sm text-muted-foreground">
                  Combine multiple PDF files into one document
                </p>
              </a>
              <a
                href="/tools/image-resizer"
                className="p-4 rounded-lg border bg-card hover:bg-accent transition-colors"
              >
                <h3 className="font-semibold mb-1">📸 Image Resizer</h3>
                <p className="text-sm text-muted-foreground">
                  Resize and convert images to different formats
                </p>
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

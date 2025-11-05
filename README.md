# QuickTools - Free Browser Utilities

Quick & simple browser utilities. All processing happens locally in your browser for complete privacy.

**Live at:** `http://localhost:3000` (development)

## Features

- 🔒 **Privacy-First**: All processing happens in your browser
- ⚡ **Fast**: No server uploads, instant results
- 💯 **Free**: No subscriptions, no ads, no tracking
- 🎯 **SEO-Optimized**: Each tool has its own page for better discoverability

## Available Tools

### 🎤 Speech to Text
- Convert audio recordings to text using Whisper AI
- Runs entirely in browser (~150MB model)
- Private and offline-capable after first load

### Coming Soon
- 🖼️ Image Resizer
- 📄 PDF Converter
- And more...

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **AI**: Transformers.js (Whisper Tiny model)
- **SEO**: Built-in sitemap, robots.txt, metadata API

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
quicktools/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout with header/footer
│   ├── page.tsx                  # Homepage with tool grid
│   ├── sitemap.ts                # Auto-generated sitemap
│   ├── robots.ts                 # SEO robots.txt
│   └── tools/
│       └── speech-to-text/
│           └── page.tsx          # Speech-to-text tool page
│
├── components/                   # React components
│   └── tools/
│       └── SpeechToText/
│           └── index.tsx         # Speech-to-text component
│
├── lib/                          # Utilities
│   ├── audio/
│   │   └── audio-processor.ts   # Audio processing
│   └── tools/
│       └── tool-registry.ts     # Central tool configuration
│
└── public/
    └── workers/
        └── transcriber-worker.js # Web Worker for AI model
```

## Adding New Tools

1. Add tool metadata to `lib/tools/tool-registry.ts`
2. Create tool page in `app/tools/[tool-name]/page.tsx`
3. Create tool component in `components/tools/[ToolName]/index.tsx`
4. Tool automatically appears on homepage and in sitemap

## SEO

- Each tool has dedicated page with metadata
- Automatic sitemap generation at `/sitemap.xml`
- Robots.txt at `/robots.txt`
- Open Graph images support
- Structured data ready

## Deployment

Optimized for:
- **Vercel** (recommended)
- **Netlify**
- **Cloudflare Pages**
- Any static host

## License

MIT License - Free to use and modify

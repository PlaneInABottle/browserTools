export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://toolympics.com',
  name: 'Toolympics',
  description: 'Quick & simple browser utilities. Convert, resize, transcribe - all for free. Privacy-focused tools that run entirely in your browser.',
  shortDescription: 'Quick & simple browser utilities',
  defaultLocale: 'en-US' as const,
  supportedLocales: ['en-US'] as const, // Add more when ready: ['en-US', 'es', 'fr']
} as const

import { MetadataRoute } from 'next'
import { tools } from '@/lib/tools/tool-registry'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://quicktools.tools'

  const toolPages = tools.map((tool) => ({
    url: `${baseUrl}${tool.href}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    ...toolPages,
  ]
}

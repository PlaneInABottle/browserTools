import { MetadataRoute } from 'next'
import { tools } from '@/lib/tools/tool-registry'
import { siteConfig } from '@/lib/config/site'
import { getHomePageLastModified, getToolPageLastModified } from '@/lib/utils/git-dates'

export default function sitemap(): MetadataRoute.Sitemap {
  const toolPages = tools.map((tool) => ({
    url: `${siteConfig.url}${tool.href}`,
    lastModified: getToolPageLastModified(tool.pagePath),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: siteConfig.url,
      lastModified: getHomePageLastModified(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    ...toolPages,
  ]
}

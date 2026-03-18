import type { MetadataRoute } from 'next';
import { RESOURCES, getResourcePath } from '@/lib/content';

const BASE_URL = 'https://straywebdesign.co';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/resources`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/book`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  const resourcePages: MetadataRoute.Sitemap = RESOURCES.map((resource) => ({
    url: `${BASE_URL}${getResourcePath(resource)}`,
    lastModified: new Date(resource.date),
    changeFrequency: 'monthly' as const,
    priority: resource.type === 'case-study' ? 0.7 : 0.6,
  }));

  return [...staticPages, ...resourcePages];
}

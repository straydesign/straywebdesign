import type { MetadataRoute } from 'next';
import { RESOURCES, getResourcePath, getAllTags } from '@/lib/content';
import { SERVICES } from '@/data/services';
import { INDUSTRIES } from '@/data/industries';
import { LOCATIONS } from '@/data/locations';

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
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/industries`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];

  const resourcePages: MetadataRoute.Sitemap = RESOURCES.map((resource) => ({
    url: `${BASE_URL}${getResourcePath(resource)}`,
    lastModified: new Date(resource.date),
    changeFrequency: 'monthly' as const,
    priority: resource.type === 'case-study' ? 0.7 : 0.6,
  }));

  const servicePages: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${BASE_URL}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const industryPages: MetadataRoute.Sitemap = INDUSTRIES.map((industry) => ({
    url: `${BASE_URL}/industries/${industry.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Location hub pages
  const locationHubPages: MetadataRoute.Sitemap = LOCATIONS.map((location) => ({
    url: `${BASE_URL}/locations/${location.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Location + industry pages
  const locationIndustryPages: MetadataRoute.Sitemap = LOCATIONS.flatMap((location) =>
    INDUSTRIES.map((industry) => ({
      url: `${BASE_URL}/locations/${location.slug}/${industry.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  );

  // Full programmatic pages: location + industry + service
  const programmaticPages: MetadataRoute.Sitemap = LOCATIONS.flatMap((location) =>
    INDUSTRIES.flatMap((industry) =>
      SERVICES.map((service) => ({
        url: `${BASE_URL}/locations/${location.slug}/${industry.slug}/${service.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      }))
    )
  );

  // Tag pages
  const tagPages: MetadataRoute.Sitemap = getAllTags().map((tag) => ({
    url: `${BASE_URL}/resources/tag/${encodeURIComponent(tag)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  // Locations index
  const locationsIndex: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/locations`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  return [
    ...staticPages,
    ...servicePages,
    ...industryPages,
    ...resourcePages,
    ...tagPages,
    ...locationsIndex,
    ...locationHubPages,
    ...locationIndustryPages,
    ...programmaticPages,
  ];
}

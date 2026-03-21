import type { MetadataRoute } from 'next';
import { RESOURCES, getResourcePath } from '@/lib/content';
import { SERVICES } from '@/data/services';
import { INDUSTRIES } from '@/data/industries';
import { LOCATIONS } from '@/data/locations';

const BASE_URL = 'https://straywebdesign.co';

// Stable dates — only update these when content actually changes
const SITE_LAUNCH = '2026-03-15';
const CONTENT_BLITZ = '2026-03-18';

export default function sitemap(): MetadataRoute.Sitemap {
  // ─── Core pages ────────────────────────────────────────────
  const core: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: CONTENT_BLITZ,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/resources`,
      lastModified: CONTENT_BLITZ,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/book`,
      lastModified: SITE_LAUNCH,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: CONTENT_BLITZ,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/industries`,
      lastModified: CONTENT_BLITZ,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/locations`,
      lastModified: CONTENT_BLITZ,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // ─── Service pages ─────────────────────────────────────────
  const servicePages = SERVICES.map((service) => ({
    url: `${BASE_URL}/services/${service.slug}`,
    lastModified: CONTENT_BLITZ,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // ─── Industry pages ────────────────────────────────────────
  const industryPages = INDUSTRIES.map((industry) => ({
    url: `${BASE_URL}/industries/${industry.slug}`,
    lastModified: CONTENT_BLITZ,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // ─── Resources + tags ──────────────────────────────────────
  const resourcePages = RESOURCES.map((resource) => ({
    url: `${BASE_URL}${getResourcePath(resource)}`,
    lastModified: resource.date,
    changeFrequency: 'monthly' as const,
    priority: resource.type === 'case-study' ? 0.7 : 0.6,
  }));

  // Tag pages excluded — thin aggregation pages, noindexed
  // Location × industry pages excluded — 264 programmatic pages too many for a new domain.
  // They stay live and crawlable but we don't push Google to index them yet.

  // ─── Location hubs ─────────────────────────────────────────
  const locationHubs = LOCATIONS.map((location) => ({
    url: `${BASE_URL}/locations/${location.slug}`,
    lastModified: CONTENT_BLITZ,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    ...core,
    ...servicePages,
    ...industryPages,
    ...resourcePages,
    ...locationHubs,
  ];
}

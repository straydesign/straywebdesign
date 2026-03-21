import type { MetadataRoute } from 'next';
import { RESOURCES, getResourcePath } from '@/lib/content';
import { SERVICES } from '@/data/services';

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
  ];

  // ─── Service pages ─────────────────────────────────────────
  const servicePages = SERVICES.map((service) => ({
    url: `${BASE_URL}/services/${service.slug}`,
    lastModified: CONTENT_BLITZ,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // ─── Resources (blog posts + white papers only) ─────────────
  // Case studies excluded — hypothetical transformations, not real client work yet.
  const resourcePages = RESOURCES.filter((r) => r.type !== 'case-study').map((resource) => ({
    url: `${BASE_URL}${getResourcePath(resource)}`,
    lastModified: resource.date,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Excluded from sitemap (pages still live, just not pushed to Google):
  // - /industries, /industries/[slug] — 22 template-driven pages
  // - /locations, /locations/[slug] — 12 template-driven hubs
  // - /locations/[location]/[industry] — 264 programmatic pages
  // - /resources/case-studies/[slug] — 8 hypothetical transformation stories
  // - /resources/tag/[tag] — ~42 thin aggregation pages (also noindexed)
  // Let Google discover these organically once the domain builds trust.

  return [...core, ...servicePages, ...resourcePages];
}

import type { MetadataRoute } from 'next';
import { RESOURCES, getResourcePath } from '@/lib/content';
import { PROJECTS } from '@/data/clients';
import { PILLARS } from '@/data/pillars';

const BASE_URL = 'https://straywebdesign.co';

// Stable dates — only update these when content actually changes
const SITE_LAUNCH = '2026-03-15';
const CONTENT_BLITZ = '2026-03-18';
const PILLAR_LAUNCH = '2026-07-23';

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
      url: `${BASE_URL}/privacy`,
      lastModified: SITE_LAUNCH,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ];

  // ─── Pillar pages (the six buyer-question clusters) ────────
  const pillarPages = PILLARS.map((pillar) => ({
    url: `${BASE_URL}/${pillar.slug}`,
    lastModified: PILLAR_LAUNCH,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // ─── Case studies ──────────────────────────────────────────
  const caseStudies = PROJECTS.map((project) => ({
    url: `${BASE_URL}/work/${project.slug}`,
    lastModified: '2026-07-10',
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // ─── Blog posts ────────────────────────────────────────────
  const blogPages = RESOURCES.map((resource) => ({
    url: `${BASE_URL}${getResourcePath(resource)}`,
    lastModified: resource.date,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...core, ...pillarPages, ...caseStudies, ...blogPages];
}

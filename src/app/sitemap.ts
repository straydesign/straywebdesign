import type { MetadataRoute } from 'next';
import { RESOURCES, getResourcePath, getAllTags } from '@/lib/content';
import { SERVICES } from '@/data/services';
import { INDUSTRIES } from '@/data/industries';
import { LOCATIONS } from '@/data/locations';

const BASE_URL = 'https://straywebdesign.co';

// Stable dates — only update these when content actually changes
const SITE_LAUNCH = '2026-03-15';
const CONTENT_BLITZ = '2026-03-18';

/**
 * Split sitemap into categorized chunks so Google can prioritize.
 * IDs: 0 = core pages, 1 = resources, 2 = location hubs, 3-N = programmatic
 */
export async function generateSitemaps() {
  const programmaticCount = LOCATIONS.length * INDUSTRIES.length * SERVICES.length;
  const chunkSize = 500;
  const programmaticChunks = Math.ceil(programmaticCount / chunkSize);

  return [
    { id: 0 }, // Core: static + services + industries
    { id: 1 }, // Resources: blog + case studies + white papers + tags
    { id: 2 }, // Location hubs + location-industry pages
    ...Array.from({ length: programmaticChunks }, (_, i) => ({ id: 3 + i })),
  ];
}

export default async function sitemap({
  id: rawId,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const id = Number(rawId);

  // ─── Chunk 0: Core pages ─────────────────────────────────
  if (id === 0) {
    return [
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
      ...SERVICES.map((service) => ({
        url: `${BASE_URL}/services/${service.slug}`,
        lastModified: CONTENT_BLITZ,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      })),
      ...INDUSTRIES.map((industry) => ({
        url: `${BASE_URL}/industries/${industry.slug}`,
        lastModified: CONTENT_BLITZ,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      })),
    ];
  }

  // ─── Chunk 1: Resources + tags ───────────────────────────
  if (id === 1) {
    const resourcePages = RESOURCES.map((resource) => ({
      url: `${BASE_URL}${getResourcePath(resource)}`,
      lastModified: resource.date,
      changeFrequency: 'monthly' as const,
      priority: resource.type === 'case-study' ? 0.7 : 0.6,
    }));

    const tagPages = getAllTags().map((tag) => ({
      url: `${BASE_URL}/resources/tag/${encodeURIComponent(tag)}`,
      lastModified: CONTENT_BLITZ,
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    }));

    return [...resourcePages, ...tagPages];
  }

  // ─── Chunk 2: Location hubs + location-industry ──────────
  if (id === 2) {
    const hubs = LOCATIONS.map((location) => ({
      url: `${BASE_URL}/locations/${location.slug}`,
      lastModified: CONTENT_BLITZ,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    const locationIndustry = LOCATIONS.flatMap((location) =>
      INDUSTRIES.map((industry) => ({
        url: `${BASE_URL}/locations/${location.slug}/${industry.slug}`,
        lastModified: CONTENT_BLITZ,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))
    );

    return [...hubs, ...locationIndustry];
  }

  // ─── Chunks 3+: Programmatic pages (500 per chunk) ──────
  const chunkSize = 500;
  const chunkIndex = id - 3;

  const allProgrammatic = LOCATIONS.flatMap((location) =>
    INDUSTRIES.flatMap((industry) =>
      SERVICES.map((service) => ({
        url: `${BASE_URL}/locations/${location.slug}/${industry.slug}/${service.slug}`,
        lastModified: CONTENT_BLITZ,
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      }))
    )
  );

  const start = chunkIndex * chunkSize;
  return allProgrammatic.slice(start, start + chunkSize);
}

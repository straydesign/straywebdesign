import type { MetadataRoute } from 'next';

const BASE_URL = 'https://straywebdesign.co';

/**
 * Four routes. The pillars, the blog, the case studies and the photography
 * page are gone from here because they are gone from the site — they 301 to
 * `/` in next.config.ts. Listing a redirect in a sitemap is a request for
 * Google to keep crawling something you have already retired.
 *
 * /thank-you and /not-a-fit are deliberately absent: both are noindex.
 */
const LANDING_REBUILD = '2026-09-01';
const SITE_LAUNCH = '2026-03-15';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: LANDING_REBUILD,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/book`,
      lastModified: LANDING_REBUILD,
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
}

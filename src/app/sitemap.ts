import type { MetadataRoute } from 'next';
import { CASE_STUDIES } from '@/data/caseStudies';

const BASE_URL = 'https://straywebdesign.co';

/**
 * The page, /book, /privacy and the four case studies (live again since
 * 2026-09-17, listed here since 2026-09-29). The pillars, the blog and the
 * photography page are gone from here because they are gone from the site —
 * they 301 to `/` in next.config.ts. Listing a redirect in a sitemap is a request for
 * Google to keep crawling something you have already retired.
 *
 * /thank-you and /not-a-fit are deliberately absent: both are noindex.
 */
const LANDING_REBUILD = '2026-09-29';
const STUDIES_LIVE = '2026-09-17';
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
    ...CASE_STUDIES.map((study) => ({
      url: `${BASE_URL}/work/${study.slug}`,
      lastModified: STUDIES_LIVE,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}

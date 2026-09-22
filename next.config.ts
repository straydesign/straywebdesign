import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
    optimizePackageImports: ['framer-motion', 'lucide-react', 'lenis'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
  /**
   * September 2026: the site collapsed from 35 routes to four.
   *
   * Three months of Search Console said the other thirty-one earned 2 clicks
   * between them, so there was no traffic to weigh against the cost of having
   * them — and on a page whose only job is booking a call, every route is
   * somewhere else to go. Everything retired redirects rather than 404s, so an
   * old link or a printed QR still lands on the pitch.
   *
   * The four survivors are /, /book, /thank-you and /privacy. Root-level
   * pillars have to be listed one by one: a catch-all at the root would
   * swallow those three too.
   */
  async redirects() {
    const gone = (source: string) => ({ source, destination: '/', permanent: true });

    return [
      // The six pillar pages.
      ...['cost', 'diy-or-hire', 'get-found', 'need-a-website', 'for-your-industry', 'get-customers'].map(
        (slug) => gone(`/${slug}`)
      ),

      // Writing: index, 15 posts, 4 tag pages, and the feed.
      gone('/resources'),
      gone('/resources/:path*'),
      gone('/feed.xml'),

      /* /work and /work/:slug are LIVE again as of 2026-09-17 — the four client
         case studies were ported from straydesign.co. The redirects that used
         to sit here sent both to the homepage, which silently 308'd every new
         study route until it was caught in testing. Do not restore them
         without deleting src/app/work first. */

      gone('/photography'),

      /* /not-a-fit was the survey's disqualifier landing. The survey came off
         on Tom's call 2026-09-17, which left the page reachable by nothing,
         and it was deleted in the 2026-09-22 reposition. It was noindex all
         along, so this is for anyone holding the URL rather than for Google. */
      gone('/not-a-fit'),

      // Retired earlier; kept because Search Console still shows impressions
      // against them. The blog-slug lists these used to carry are covered by
      // the /resources wildcard above now.
      gone('/services'),
      gone('/services/:path*'),
      gone('/audit'),
      gone('/lab'),
      gone('/lab/:path*'),
      gone('/lp/:path*'),
      gone('/locations/:path*'),
      gone('/industries/:path*'),
    ];
  },
};

export default nextConfig;

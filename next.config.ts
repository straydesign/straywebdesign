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
  // Old routes folded into the single page (2026-07). Blog posts still link
  // to /services/* sub-paths, so the wildcard keeps those from 404ing.
  async redirects() {
    return [
      { source: '/work', destination: '/#work', permanent: true },
      { source: '/services', destination: '/#services', permanent: true },
      { source: '/services/:path*', destination: '/#services', permanent: true },
      { source: '/audit', destination: '/', permanent: true },
      { source: '/lab', destination: '/', permanent: true },
      { source: '/lab/:path*', destination: '/', permanent: true },
      { source: '/lp/:path*', destination: '/', permanent: true },
      // June-2026 purge left these indexed and 404ing — GSC still shows
      // impressions on them (Erie-intent queries especially).
      { source: '/locations/:path*', destination: '/', permanent: true },
      { source: '/industries/:path*', destination: '/', permanent: true },
      {
        source:
          '/resources/blog/:slug(ai-integration-small-business-website-2026|ai-ready-website-development-guide|ai-receptionist-for-small-business|ai-seo-optimization-how-to-show-up|content-migration-website-redesign|erie-digital-transformation-guide-2026|geo-optimization-generative-engine-service|local-seo-small-business-erie|seo-vs-geo-which-matters-more|structured-data-schema-markup-business|website-management-service-erie|wordpress-vs-nextjs-which-is-right)',
        destination: '/resources',
        permanent: true,
      },
      // July-2026 blog reset (Tom: replace the SEO-genre posts with idea
      // essays) — retired slugs redirect to the writing index.
      {
        source:
          '/resources/blog/:slug(best-bar-websites|custom-website-cost-vs-template-real-numbers|five-signs-you-need-a-website-redesign|one-time-payment-website-own-it-outright|popmenu-pricing-2026-bentobox-alternative|restaurant-website-cost|website-accessibility-wcag-compliance-guide|website-speed-optimization-guide-2026|what-to-look-for-in-a-web-designer)',
        destination: '/resources',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

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
    ];
  },
};

export default nextConfig;

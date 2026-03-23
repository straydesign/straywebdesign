# Performance Budget

## Core Web Vitals Targets

| Metric | Target | Maximum |
|--------|--------|---------|
| LCP (Largest Contentful Paint) | < 1.5s | < 2.5s |
| FID (First Input Delay) | < 50ms | < 100ms |
| CLS (Cumulative Layout Shift) | < 0.05 | < 0.1 |
| INP (Interaction to Next Paint) | < 100ms | < 200ms |
| FCP (First Contentful Paint) | < 1.0s | < 1.8s |
| TBT (Total Blocking Time) | < 150ms | < 300ms |

## Lighthouse Score Targets

| Category | Minimum |
|----------|---------|
| Performance | 90 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

## Bundle Size Budgets

| Resource | Budget |
|----------|--------|
| Initial JS (compressed) | < 150 KB |
| Initial CSS (compressed) | < 30 KB |
| Total page weight (first load) | < 500 KB |
| Largest image (above fold) | < 100 KB |
| Font files total | < 100 KB |
| R3F chunk (Showcase only) | < 250 KB (lazy loaded) |

## Lazy Loading Rules

1. **3D scenes** — always `dynamic(() => import(...), { ssr: false })`
2. **Images below fold** — Next.js `<Image>` with `loading="lazy"`
3. **Chat widget** — loaded after initial render
4. **Audit tool page** — separate route, not bundled with homepage
5. **Sound system** — initialized on first user interaction only
6. **Heavy animations** — intersection observer trigger, not on mount

## Image Optimization

- Format priority: AVIF > WebP > JPEG
- Use Next.js `<Image>` component for automatic optimization
- Device sizes: 640, 750, 828, 1080, 1200, 1920
- Cache TTL: 1 year (immutable content-hashed URLs)
- Hero images: preload with `priority` prop
- Background images: CSS `background-image` only when parallax needed

## Font Strategy

- Google Fonts with `display: 'swap'`
- Subset: `latin` only (no extended character sets unless needed)
- Preconnect to `fonts.googleapis.com` and `fonts.gstatic.com`
- Maximum 2 font families per site
- Maximum 3-4 weights per family

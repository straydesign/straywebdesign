# Premium Tier — High-Value Clients

Layered on top of Foundation tier for competitive markets and clients who want to stand out.

## Components

### TiltCard
Cards track cursor and rotate in 3D perspective with spring physics.
- Disabled on touch devices
- `className`, `children` props
- Uses `transform: perspective()` with GPU acceleration

### ParallaxWindow
Full-bleed images sit fixed behind opaque content sections, revealed as you scroll between sections like a window.
- `imageUrl`, `alt`, `height`, `overlayOpacity` props
- Scroll-linked parallax using Framer Motion `useScroll` + `useTransform`
- Graceful fallback for reduced motion

### HorizontalScroll
Services or portfolio items scroll horizontally within a vertically-pinned container.
- `children` array — each child becomes a full-viewport panel
- Vertical scroll maps to horizontal translation
- Reduced motion fallback: standard grid layout

### PinnedComparison
Split-screen comparison (template vs. custom site) that stays pinned while content animates in.
- `before` and `after` objects with label, imageUrl, points, accent color
- Scroll-driven reveal of after panel and bullet points
- Reduced motion fallback: side-by-side grid

### PageTransitions
Smooth cross-fade + blur between pages using Framer Motion.
- Implemented via Next.js `template.tsx`
- View Transitions API enabled as experimental enhancement
- No layout shift, back/forward navigation preserved

### PersonalizedText
Client component that reads visitor context (cookies) and renders personalized copy.
- Referrer detection (Google, social, direct)
- Return visitor detection
- Geo-based messaging (Erie local vs. nationwide)
- `field` and `fallback` props

## Usage Pattern

```tsx
// Insert ParallaxWindow between major sections
<Services />
<ParallaxWindow
  imageUrl="/images/erie-skyline.jpg"
  alt="Erie, PA skyline"
  height="50vh"
/>
<SocialProof />
```

## Rules

1. **ParallaxWindow** between every 2-3 major content sections
2. **TiltCard** on any card-based grid (services, features, team)
3. **PageTransitions** — all internal links must use `<Link>` (not `<a>`)
4. **PersonalizedText** — only on hero and primary CTA sections
5. All Premium components must have reduced motion fallbacks

# Foundation Tier — Required on Every Site

These interactions are the minimum bar. No site ships without them.

## Components

### AnimateIn
Blur-fade entrance animation. Elements fade in with directional blur + slide as they enter the viewport.
- Wraps any content block
- Fires once (no re-trigger on scroll back)
- Supports `direction`, `delay`, `className`
- Respects `prefers-reduced-motion`

### MagneticButton
CTAs subtly pull toward the cursor within ~20% of distance. Spring physics (stiffness: 150, damping: 15).
- Renders `<Link>` for internal hrefs, `<a>` for external, `<button>` otherwise
- 3 variants: primary, secondary, ghost
- 3 sizes: sm, md, lg
- Includes haptic feedback on mobile
- Sound-enabled (opt-in via SoundToggle)

### GrainOverlay
Ultra-subtle film grain overlay on dark sections. Adds analog warmth.
- Place inside dark-background sections
- Pure CSS, zero JS overhead

### CountUp
Numbers roll from 0 to target value when scrolled into view.
- Spring-based animation via Framer Motion
- Supports prefix, suffix, decimals
- Fires once on viewport entry

### CustomCursor
Branded dot cursor that morphs (grows on links, becomes arrow on CTAs, blends on images).
- Auto-disabled on touch devices
- Respects `prefers-reduced-motion`

### SmoothScroll (Lenis)
Buttery momentum-based scrolling replacing native browser scroll.
- Wrap entire app in `<SmoothScroll>`
- Removes native jank feel

### GradientText
Flowing color gradient across text. Supports static and animated modes.
- `animate` prop for CSS animation
- `scrollLinked` prop for scroll-driven gradient position

### WordReveal
Headlines appear word-by-word with blur dissolve on first load or section entrance.
- `text` prop with automatic word splitting
- `delay` prop for stagger start

## Rules

1. **Every section entrance** must use AnimateIn — no content dumps
2. **Every CTA** must be MagneticButton — no plain `<button>` or `<a>` for CTAs
3. **Every stat** must use CountUp — never show static numbers
4. **Every dark section** must have GrainOverlay
5. **Scroll must be smooth** — Lenis on every site
6. **prefers-reduced-motion** — all animations must disable, content remains accessible

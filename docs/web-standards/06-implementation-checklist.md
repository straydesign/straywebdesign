# Implementation Checklist — Pre-Deploy Quality Gate

Run this checklist before deploying any client site. Check the items for the applicable tier.

## Foundation Tier (Every Site)

### Entrance Animations
- [ ] No section appears without an entrance animation (AnimateIn)
- [ ] Stagger delay feels natural (0.1-0.2s between siblings)
- [ ] Animations fire once, not on scroll back up

### Interactive Elements
- [ ] All CTAs use MagneticButton
- [ ] All interactive elements have hover/focus states
- [ ] Hover glow + elevation on cards

### Typography & Numbers
- [ ] Stats/numbers animate on scroll (CountUp)
- [ ] Hero has WordReveal or animated headline
- [ ] GradientText on at least one key heading

### Scroll & Navigation
- [ ] Lenis smooth scroll active
- [ ] Scroll progress bar visible at top
- [ ] All internal links use `<Link>` (not `<a>`)

### Texture & Polish
- [ ] Dark sections have GrainOverlay
- [ ] Custom cursor active on desktop
- [ ] Custom cursor hidden on mobile/touch

### Accessibility
- [ ] `prefers-reduced-motion` disables all animations
- [ ] Keyboard navigation works throughout
- [ ] Skip-to-content link present
- [ ] Semantic HTML structure
- [ ] Color contrast passes WCAG AA

### Performance
- [ ] Lighthouse Performance: 90+
- [ ] Lighthouse Accessibility: 100
- [ ] Lighthouse Best Practices: 100
- [ ] Lighthouse SEO: 100
- [ ] No layout shift on load (CLS < 0.1)

---

## Premium Tier (Add to Foundation)

### Advanced Interactions
- [ ] TiltCard on card-based grids
- [ ] ParallaxWindow between major content sections
- [ ] Page transitions smooth (no white flash)
- [ ] Back/forward navigation preserves transitions

### Personalization
- [ ] PersonalizedText renders correct variant for context
- [ ] Return visitor messaging works
- [ ] Referrer detection works
- [ ] Fallback copy displays when no context available

### Scroll Sections
- [ ] HorizontalScroll panels align correctly
- [ ] PinnedComparison reveals smoothly
- [ ] All scroll-pinned sections have reduced motion fallbacks

---

## Showcase Tier (Add to Premium)

### 3D & WebGL
- [ ] HeroScene loads without blocking page render
- [ ] Fallback gradient shows while 3D loads
- [ ] 3D disabled for `prefers-reduced-motion`
- [ ] WebGL fallback for unsupported devices
- [ ] 60fps maintained on mid-range devices

### AI Features
- [ ] Chat widget opens/closes smoothly
- [ ] Streaming responses display correctly
- [ ] Rate limiting active (10 req/min)
- [ ] No PII stored in chat
- [ ] Chat accessible via keyboard

### Audit Tool
- [ ] URL input validates correctly
- [ ] Loading skeleton shows during analysis
- [ ] Scores animate with CountUp + LighthouseGauge
- [ ] Core Web Vitals display correctly
- [ ] Haptic feedback on mobile score reveal
- [ ] Error states handle gracefully

### Sensory
- [ ] Sound muted by default
- [ ] SoundToggle in footer works
- [ ] Haptics only fire on mobile
- [ ] No audio on page load

---

## Final Checks (All Tiers)

- [ ] `npm run build` — zero errors
- [ ] Full scroll-through on desktop — everything animates correctly
- [ ] Full scroll-through on mobile — no broken layouts
- [ ] `git diff main...HEAD` — no unintended changes
- [ ] All existing pages still work (no regressions)
- [ ] Social meta tags (OG, Twitter) render correctly
- [ ] Sitemap includes all pages
- [ ] JSON-LD schema validates

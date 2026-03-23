# Component API Reference

Props, usage, and behavior for every reusable interaction component.

---

## Foundation Tier

### AnimateIn

Scroll-triggered fade-in with directional blur and slide. Also exports `StaggerContainer` and `StaggerItem` for cascading animations.

```typescript
interface AnimateInProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right'; // default: 'up'
  delay?: number;        // default: 0
  duration?: number;     // default: 0.5
  distance?: number;     // default: 24 (px)
  once?: boolean;        // default: true
  className?: string;
  style?: CSSProperties;
  id?: string;
}
```

```tsx
<AnimateIn direction="up" delay={0.2}>
  <Card />
</AnimateIn>

<StaggerContainer>
  {items.map(item => (
    <StaggerItem key={item.id}>
      <Card {...item} />
    </StaggerItem>
  ))}
</StaggerContainer>
```

**Reduced motion:** Content renders immediately, no animation.

---

### MagneticButton

CTA button with cursor-magnetic pull (50px radius), spring physics, click sound, and haptic vibration. Renders `<Link>` for internal hrefs, `<a>` for external, `<button>` otherwise.

```typescript
interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost'; // default: 'primary'
  size?: 'sm' | 'md' | 'lg';                    // default: 'md'
  type?: 'button' | 'submit';                   // default: 'button'
  disabled?: boolean;                            // default: false
}
```

```tsx
<MagneticButton href="/contact" variant="primary" size="lg">
  Get Started
</MagneticButton>

<MagneticButton onClick={handleSubmit} type="submit">
  Send Message
</MagneticButton>
```

**Reduced motion:** Magnetic pull disabled, button still functional.
**Sound:** Plays `playClick()` on click (respects SoundToggle).
**Haptic:** 10ms vibration on mobile tap.

---

### CountUp

Scroll-triggered number animation from 0 to target value.

```typescript
interface CountUpProps {
  value: number;
  suffix?: string;   // default: ''
  prefix?: string;   // default: ''
  decimals?: number;  // default: 0
  duration?: number;  // default: 2 (seconds)
  className?: string;
}
```

```tsx
<CountUp value={150} suffix="+" />
<CountUp value={99.9} suffix="%" decimals={1} />
<CountUp value={500} prefix="$" suffix="K" />
```

**Reduced motion:** Jumps to final value instantly.

---

### WordReveal

Headline text that reveals word-by-word with blur dissolve on scroll entry.

```typescript
interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;    // default: 0
  stagger?: number;  // default: 0.06 (seconds between words)
}
```

```tsx
<WordReveal
  text="We build websites that convert"
  className="text-4xl font-bold"
  delay={0.3}
/>
```

**Reduced motion:** Renders plain text immediately.

---

### GradientText

Text with flowing color gradient. Optional scroll-linked position shift.

```typescript
interface GradientTextProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;      // default: true
  scrollLinked?: boolean;  // default: false
}
```

```tsx
<GradientText className="text-3xl font-bold">
  Premium Design
</GradientText>

<GradientText scrollLinked>
  Scroll to see the gradient shift
</GradientText>
```

**Gradient:** `linear-gradient(90deg, var(--electric), var(--accent), var(--electric))`
**Reduced motion:** Scroll-linked mode disabled, static gradient shown.

---

### CustomCursor

Branded dot cursor that morphs on interactive elements (links, buttons, inputs).

```typescript
// No props — drop into layout
export function CustomCursor()
```

```tsx
// In layout.tsx
<CustomCursor />
```

**Reduced motion:** Cursor hidden entirely, system cursor used.
**Touch devices:** Automatically disabled.

---

### GrainOverlay

Ultra-subtle film grain texture for dark sections.

```typescript
// No props
export default function GrainOverlay()
```

```tsx
<section className="relative bg-navy">
  <GrainOverlay />
  <div className="relative z-10">{content}</div>
</section>
```

**Accessibility:** Renders with `aria-hidden="true"`.

---

### LighthouseGauge

Animated circular gauge for Lighthouse scores (0–100) with color coding.

```typescript
interface LighthouseGaugeProps {
  score: number;
  label: string;
  size?: number;      // default: 120 (px)
  className?: string;
  delay?: number;     // default: 0 (seconds)
}
```

```tsx
<LighthouseGauge score={95} label="Performance" />
<LighthouseGauge score={100} label="Accessibility" delay={0.2} />
```

**Colors:** Green (90+), Orange (50–89), Red (<50).
**Reduced motion:** Jumps to final value.

---

### TiltCard

3D perspective card that tracks cursor and rotates with spring physics.

```typescript
interface TiltCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  noTilt?: boolean;       // default: false
  glowColor?: string;     // default: 'rgba(59, 130, 246, 0.15)'
}
```

```tsx
<TiltCard className="p-6 rounded-xl bg-white">
  <h3>Service Title</h3>
  <p>Description here</p>
</TiltCard>
```

**Rotation range:** ±6 degrees on both axes.
**Reduced motion:** Tilt disabled, hover elevation kept.
**Touch devices:** Tilt disabled.

---

### Carousel

Infinite horizontal scroll carousel with pause/play controls.

```typescript
interface CarouselProps {
  items: ReactNode[];
  speed?: number;                      // default: 40
  direction?: 'left' | 'right';       // default: 'left'
  pauseOnHover?: boolean;             // default: true
  className?: string;
}
```

```tsx
<Carousel items={logos.map(logo => <img src={logo.src} alt={logo.alt} />)} />
```

**Accessibility:** Includes pause/play button for WCAG 2.2.2.

---

### Breadcrumbs

Navigation breadcrumbs with Schema.org BreadcrumbList JSON-LD.

```typescript
interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}
```

```tsx
<Breadcrumbs items={[
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Web Design' }
]} />
```

**Accessibility:** Last item has `aria-current="page"`.

---

### Accordion

FAQ accordion with height animation and chevron rotation.

```typescript
interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: readonly AccordionItem[];
  className?: string;
}
```

```tsx
<Accordion items={[
  { question: 'How long does a site take?', answer: '4-6 weeks...' },
  { question: 'What does it cost?', answer: 'Starting at...' }
]} />
```

**Accessibility:** Full ARIA support (`aria-expanded`, `aria-controls`, `role="region"`).

---

### SmoothScroll (Lenis)

Replaces native scroll with Lenis momentum-based smooth scroll.

```typescript
interface SmoothScrollProps {
  children: ReactNode;
}
```

```tsx
// In layout.tsx — wrap entire page content
<SmoothScroll>{children}</SmoothScroll>
```

**Reduced motion:** Lenis disabled, native scroll used.
**Mobile/touch:** Disabled below 768px.

---

## Premium Tier

### ParallaxWindow

Full-bleed image with scroll-linked parallax reveal effect.

```typescript
interface ParallaxWindowProps {
  imageUrl: string;
  alt: string;
  height?: string;          // default: '60vh'
  overlayOpacity?: number;  // default: 0.15
}
```

```tsx
<Services />
<ParallaxWindow
  imageUrl="/images/erie-skyline.jpg"
  alt="Erie, PA skyline"
  height="50vh"
/>
<SocialProof />
```

**Reduced motion:** Static image, no parallax motion.

---

### HorizontalScroll

Pinned container where vertical scroll drives horizontal panel translation.

```typescript
interface HorizontalScrollProps {
  children: ReactNode[];  // each child = full-viewport panel
  className?: string;
}
```

```tsx
<HorizontalScroll>
  <ServicePanel title="Web Design" />
  <ServicePanel title="SEO" />
  <ServicePanel title="Branding" />
</HorizontalScroll>
```

**Scroll space:** `panelCount * 100vh` of vertical height.
**Reduced motion:** Falls back to standard grid layout.

---

### PinnedComparison

Split-screen before/after comparison with scroll-driven reveal.

```typescript
interface ComparisonSide {
  label: string;
  imageUrl: string;
  points: string[];
  accent: 'red' | 'green';
}

interface PinnedComparisonProps {
  title: string;
  subtitle?: string;
  before: ComparisonSide;
  after: ComparisonSide;
}
```

```tsx
<PinnedComparison
  title="Template vs. Custom"
  subtitle="See the difference"
  before={{
    label: 'Template Site',
    imageUrl: '/images/template.jpg',
    points: ['Generic layout', 'Slow load times', 'No brand identity'],
    accent: 'red'
  }}
  after={{
    label: 'Stray-Built Site',
    imageUrl: '/images/custom.jpg',
    points: ['Custom design', 'Sub-2s load', 'Unique brand'],
    accent: 'green'
  }}
/>
```

**Scroll space:** 300vh.
**Reduced motion:** Side-by-side grid layout.

---

### PageTransition

Route-level cross-fade + blur animation wrapper. Used in `template.tsx`.

```typescript
interface PageTransitionProps {
  children: ReactNode;
}
```

```tsx
// src/app/template.tsx
import PageTransition from '@/components/layout/PageTransition';

export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
```

**Duration:** 350ms cross-fade with blur.
**Reduced motion:** Children rendered directly, no animation.

---

### PersonalizedText

Client component that reads visitor context from cookies and renders personalized copy.

```typescript
interface PersonalizedTextProps {
  field: keyof HeroCopy;  // 'headline' | 'subheadline' | 'cta'
  fallback: string;
}
```

```tsx
<h1>
  <PersonalizedText
    field="headline"
    fallback="Web Design That Converts"
  />
</h1>
```

**Context sources:** Visit count (cookie), referrer (cookie), geo (cookie).
**Variants:** First-time Google visitor, return visitor, local Erie area, default.

---

## Showcase Tier

### HeroScene

React Three Fiber 3D scene with shader background and animated Stray logo.

```typescript
// No props — self-contained scene
export default function HeroScene()
```

```tsx
// Dynamic import in Hero.tsx
const HeroScene = dynamic(() => import('@/components/3d/HeroScene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-electric/20" />
});
```

**Reduced motion:** Static CSS gradient fallback.
**Dependencies:** `@react-three/fiber`, `@react-three/drei`, `three`

---

### ShaderBackground

GLSL animated gradient mesh with simplex noise and cursor reactivity.

```typescript
interface ShaderBackgroundProps {
  mousePosition?: { x: number; y: number };
}
```

```tsx
// Used inside R3F Canvas only
<ShaderBackground mousePosition={{ x: 0.5, y: 0.5 }} />
```

**Palette:** Navy → Electric Blue → Purple.
**GPU:** Pure shader computation, no CPU overhead.

---

### StrayLogo3D

Extruded SVG Stray logo with metallic material and subtle animation.

```typescript
// No props — renders the Stray logo
export default function StrayLogo3D()
```

```tsx
// Used inside R3F Canvas only
<Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
  <StrayLogo3D />
</Float>
```

**Material:** Metallic (0.8 metalness, 0.15 roughness).
**Animation:** Subtle Y-rotation and vertical bob.

---

### ChatWidget

Floating AI chat powered by Claude with streaming responses.

```typescript
// No props — self-contained widget
export default function ChatWidget()
```

```tsx
// In layout.tsx
<ChatWidget />
```

**API endpoint:** `POST /api/chat` — streams SSE responses.
**Rate limit:** 10 requests/minute per IP.
**No PII storage.** Message history is client-side only.

---

### AuditTool

Free website Lighthouse audit with animated score display.

```typescript
// No props — full interactive section
export default function AuditTool()
```

```tsx
// On dedicated audit page
<AuditTool />
```

**API endpoint:** `POST /api/audit` — proxies PageSpeed Insights API.
**Displays:** 4 Lighthouse category scores + Core Web Vitals (FCP, LCP, CLS, TBT).
**Haptic feedback:** Vibration pattern on score reveal (mobile).

---

### SoundToggle

Mute/unmute toggle for global interaction sounds.

```typescript
// No props
export default function SoundToggle()
```

```tsx
// In footer
<SoundToggle />
```

**Default state:** Muted. Sound is always opt-in.
**Icons:** Volume2 (on) / VolumeX (off) from lucide-react.

---

## Sound API

```typescript
import { playClick, playChatOpen, playSuccess, playHover } from '@/lib/sounds';
import { isSoundEnabled, toggleSound } from '@/lib/sounds';

// Check state
if (isSoundEnabled()) {
  playClick();     // Short tick for button clicks
  playChatOpen();  // Rising tone for chat widget open
  playSuccess();   // Cheerful chord for audit completion
  playHover();     // Subtle blip for hover states
}

// Toggle
toggleSound(); // Returns new state (boolean)
```

**Implementation:** Web Audio API synthesis — no audio files loaded.
**Default:** Muted. AudioContext created on first enable.

---

## Personalization API

```typescript
import { getPersonalizationFromCookies, getPersonalizedHeroCopy } from '@/lib/personalization';

// Read context
const context = getPersonalizationFromCookies(document.cookie);
// { visits: 3, referrer: 'google', geo: 'Erie' }

// Get copy variant
const copy = getPersonalizedHeroCopy(context);
// { headline: '...', subheadline: '...', cta: '...' }
```

**Cookie names:** `swd_visits`, `swd_referrer`, `swd_geo`
**Set by:** Edge middleware (`src/middleware.ts`)

---

## Common Patterns

### Entrance Animation + Stagger

```tsx
<AnimateIn>
  <h2>Our Services</h2>
</AnimateIn>
<StaggerContainer>
  {services.map((service, i) => (
    <StaggerItem key={service.id}>
      <TiltCard>
        <h3>{service.title}</h3>
        <CountUp value={service.stat} suffix={service.suffix} />
      </TiltCard>
    </StaggerItem>
  ))}
</StaggerContainer>
```

### Section Break with Parallax

```tsx
<AnimateIn><ServicesSection /></AnimateIn>
<ParallaxWindow imageUrl="/images/hero.jpg" alt="Description" height="50vh" />
<AnimateIn><TestimonialsSection /></AnimateIn>
```

### Personalized Hero

```tsx
<section data-navbar-dark>
  <HeroScene />
  <div className="relative z-10">
    <WordReveal text={fallbackHeadline} />
    <PersonalizedText field="subheadline" fallback="Default subheadline" />
    <MagneticButton href="/contact" variant="primary">
      <PersonalizedText field="cta" fallback="Get Started" />
    </MagneticButton>
  </div>
</section>
```

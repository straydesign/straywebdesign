'use client';

import { lazy, Suspense, useEffect, useState, useCallback, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import MagneticButton from '@/components/ui/MagneticButton';
import AnimateIn from '@/components/ui/AnimateIn';
import LighthouseGauge from '@/components/ui/LighthouseGauge';
import { useClientEnv } from '@/lib/use-client-env';
import TextScramble from '@/components/ui/TextScramble';

const GlassShatter = lazy(() => import('@/components/ui/GlassShatter'));

/* ── Slide data ────────────────────────────────────────────────── */
const SLIDES = [
  {
    badge: 'For Practices, Dealerships & Professional Services in Erie, PA',
    headline: 'Erie, PA Web Design That Outperforms Your Competition',
    body: 'The world is changing rapidly. Your competitors are investing in their online presence — are you ready to compete?',
    cta: { label: "Let's Talk", href: '/book' },
  },
  {
    badge: 'Enterprise-Grade Web Design',
    headline: (
      <>
        If you can dream it,<br />we can build it.
      </>
    ),
    body: 'Hand-coded. Zero templates. Every pixel intentional. We build sites that make your competitors wonder who made yours.',
    cta: { label: 'See Our Work', href: '#services' },
  },
  {
    badge: 'Beyond Just a Website',
    headline: 'Loyalty programs. Booking systems. Customer portals.',
    body: 'Points and rewards systems, appointment scheduling, client dashboards, membership tiers — if your business needs it, we build it into your site.',
    cta: { label: "Let's Talk", href: '/book' },
  },
] as const;

const INTERVAL = 6000;

/* ── Lighthouse comparison ─────────────────────────────────────── */
const LIGHTHOUSE_COMPARISONS = [
  {
    label: 'Your Competitors',
    scores: { performance: 32, accessibility: 45, bestPractices: 56, seo: 62 },
  },
  {
    label: 'Your Site',
    scores: { performance: 90, accessibility: 100, bestPractices: 100, seo: 100 },
  },
];

const SCORE_EXPLANATIONS = [
  {
    label: 'Performance',
    description:
      'How fast your site loads. Every second of delay costs you 7% in conversions. Sites scoring below 50 lose the majority of mobile visitors before they see a single word.',
  },
  {
    label: 'Accessibility',
    description:
      'Whether everyone can use your site — including the 1 in 4 adults with a disability. Low scores mean broken forms, unreadable text, and potential ADA lawsuits. Over 4,100 were filed in 2024.',
  },
  {
    label: 'Best Practices',
    description:
      'Security, modern code standards, and browser compatibility. Low scores signal outdated technology, missing HTTPS, and vulnerabilities that put your business at risk.',
  },
  {
    label: 'SEO',
    description:
      'How visible you are to Google and AI search. Missing meta tags, broken heading structure, and no structured data mean you rank below competitors who have them.',
  },
];

/* ── Slide content variants ────────────────────────────────────── */
const slideVariants = {
  enter: { opacity: 0, y: 20, filter: 'blur(6px)' },
  center: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -20, filter: 'blur(6px)' },
};

/* ── Lighthouse panel ──────────────────────────────────────────── */
function LighthouseComparison() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="space-y-6">
      <div className="space-y-8">
        {LIGHTHOUSE_COMPARISONS.map((comp, idx) => (
          <div
            key={comp.label}
            className="border border-border-default bg-surface-card p-6"
          >
            <h2 className="mb-4 text-center font-mono text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">
              {comp.label}
            </h2>
            <div className="flex justify-center gap-6">
              <LighthouseGauge score={comp.scores.performance} label="Perf" size={90} delay={idx * 0.8 + 0.5} />
              <LighthouseGauge score={comp.scores.accessibility} label="A11y" size={90} delay={idx * 0.8 + 0.7} />
              <LighthouseGauge score={comp.scores.bestPractices} label="BP" size={90} delay={idx * 0.8 + 0.9} />
              <LighthouseGauge score={comp.scores.seo} label="SEO" size={90} delay={idx * 0.8 + 1.1} />
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="inline-flex items-center gap-2 border border-border-strong bg-surface-card px-4 py-2 font-mono text-sm text-text-secondary transition-colors hover:bg-surface-sunken hover:text-text-primary"
        >
          What does this mean?
          <motion.svg
            width="12" height="12" viewBox="0 0 12 12" fill="none"
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </button>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="border border-border-default bg-surface-card p-5">
              <p className="mb-4 font-mono text-sm text-text-tertiary">
                These are Google Lighthouse scores — the same audit Google uses to rank your site. Higher scores mean more traffic, more trust, and more customers.
              </p>
              <div className="space-y-3">
                {SCORE_EXPLANATIONS.map((item) => (
                  <div key={item.label}>
                    <p className="font-mono text-sm font-semibold text-text-primary">{item.label}</p>
                    <p className="font-mono text-sm leading-relaxed text-text-tertiary">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Slide renderer ────────────────────────────────────────────── */
function SlideContent({ index }: { index: number }) {
  const slide = SLIDES[index];

  return (
    <motion.div
      key={index}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {index === 0 ? (
        <a
          href="/locations/erie"
          className="mb-4 inline-block border border-border-strong bg-surface-card px-4 py-1.5 font-mono text-[11px] font-medium uppercase tracking-wider text-accent transition-colors hover:bg-accent hover:text-white"
        >
          {slide.badge}
        </a>
      ) : (
        <span className="mb-4 inline-block border border-border-strong bg-surface-card px-4 py-1.5 font-mono text-[11px] font-medium uppercase tracking-wider text-accent">
          {slide.badge}
        </span>
      )}

      <h1 className="text-balance font-mono text-[clamp(2.25rem,7vw,5rem)] font-bold leading-[1.08] tracking-tight text-text-primary">
        {slide.headline}
      </h1>

      <div className="mt-8 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="max-w-lg font-mono text-lg leading-relaxed text-text-secondary md:text-xl">
            {slide.body}
          </p>

          <div className="mt-8">
            <MagneticButton href={slide.cta.href} variant="primary" size="lg">
              {slide.cta.label}
            </MagneticButton>
          </div>
        </div>

        {/* Lighthouse only on first slide, desktop only */}
        {index === 0 && (
          <AnimateIn direction="right" delay={0.3} className="hidden lg:block">
            <LighthouseComparison />
          </AnimateIn>
        )}
      </div>
    </motion.div>
  );
}

/* ── Progress indicators ───────────────────────────────────────── */
function SlideIndicators({
  count,
  active,
  onSelect,
}: {
  count: number;
  active: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="flex gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          aria-label={`Go to slide ${i + 1}`}
          className="group relative h-1 w-8 overflow-hidden bg-border-default"
        >
          {i === active && (
            <motion.div
              className="absolute inset-0 bg-accent"
              layoutId="hero-indicator"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
          {i === active && (
            <motion.div
              className="absolute inset-y-0 left-0 bg-accent/40"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: INTERVAL / 1000, ease: 'linear' }}
              key={`progress-${active}`}
            />
          )}
        </button>
      ))}
    </div>
  );
}

/* ── Desktop wrapper ───────────────────────────────────────────── */
function HeroContentDesktop({ activeSlide, onSelect }: { activeSlide: number; onSelect: (i: number) => void }) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <motion.div
      className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-28 pb-16 md:px-8 md:pt-36 md:pb-24"
      style={{ y, opacity }}
    >
      <AnimatePresence mode="wait">
        <SlideContent index={activeSlide} />
      </AnimatePresence>
      <div className="mt-10">
        <SlideIndicators count={SLIDES.length} active={activeSlide} onSelect={onSelect} />
      </div>
    </motion.div>
  );
}

/* ── Mobile wrapper ────────────────────────────────────────────── */
function HeroContentMobile({ activeSlide, onSelect }: { activeSlide: number; onSelect: (i: number) => void }) {
  return (
    <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-28 pb-16">
      <AnimatePresence mode="wait">
        <SlideContent index={activeSlide} />
      </AnimatePresence>
      <div className="mt-10">
        <SlideIndicators count={SLIDES.length} active={activeSlide} onSelect={onSelect} />
      </div>
    </div>
  );
}

/* ── Main hero ─────────────────────────────────────────────────── */
export default function Hero() {
  const { mobile, reducedMotion: reduced } = useClientEnv();
  const [activeSlide, setActiveSlide] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pausedRef = useRef(false);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (reduced) return;
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) {
        setActiveSlide((prev) => (prev + 1) % SLIDES.length);
      }
    }, INTERVAL);
  }, [reduced]);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resetTimer]);

  const handleSelect = useCallback((i: number) => {
    setActiveSlide(i);
    resetTimer();
  }, [resetTimer]);

  // Pause on hover (desktop)
  const handleMouseEnter = useCallback(() => { pausedRef.current = true; }, []);
  const handleMouseLeave = useCallback(() => { pausedRef.current = false; }, []);

  // Defer GlassShatter
  const [showShatter, setShowShatter] = useState(false);
  useEffect(() => {
    const hasIdleCallback = typeof window.requestIdleCallback === 'function';
    if (hasIdleCallback) {
      const id = window.requestIdleCallback(() => setShowShatter(true), { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }
    const timer = setTimeout(() => setShowShatter(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="relative flex min-h-[100dvh] items-center overflow-hidden bg-surface-page"
      aria-label="Hero"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glass shatter effect — deferred */}
      {showShatter && (
        <Suspense fallback={null}>
          <GlassShatter delay={1.8} />
        </Suspense>
      )}

      {mobile
        ? <HeroContentMobile activeSlide={activeSlide} onSelect={handleSelect} />
        : <HeroContentDesktop activeSlide={activeSlide} onSelect={handleSelect} />
      }
    </section>
  );
}

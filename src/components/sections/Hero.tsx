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
    badge: 'For Practices, Dealerships & Professional Services in Erie',
    headline: 'Shatter What You Thought Was Possible',
    body: 'Sub-1-second load times. 90+ performance scores. AI-ready from day one — at a fraction of agency cost.',
    cta: { label: 'Get Free Audit', href: '#contact' },
  },
  {
    badge: 'Enterprise-Grade Web Design',
    headline: 'If you can dream it we can build it.',
    body: 'Hand-coded. Zero templates. Every pixel intentional. We build sites that make your competitors wonder who made yours.',
    cta: { label: 'See Our Work', href: '#services' },
  },
  {
    badge: 'Beyond Just a Website',
    headline: 'Loyalty programs. Booking systems. Customer portals.',
    body: 'Points and rewards systems, appointment scheduling, client dashboards, membership tiers — if your business needs it, we build it into your site.',
    cta: { label: 'Talk to Us', href: '#contact' },
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
            className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md"
          >
            <h2 className="mb-4 text-center font-display text-sm font-semibold text-slate-300">
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
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur-sm transition-colors hover:bg-white/10 hover:text-white"
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
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md">
              <p className="mb-4 text-sm text-slate-400">
                These are Google Lighthouse scores — the same audit Google uses to rank your site. Higher scores mean more traffic, more trust, and more customers.
              </p>
              <div className="space-y-3">
                {SCORE_EXPLANATIONS.map((item) => (
                  <div key={item.label}>
                    <p className="text-sm font-semibold text-white">{item.label}</p>
                    <p className="text-sm leading-relaxed text-slate-400">{item.description}</p>
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
      <span className="mb-4 inline-block rounded-xl border border-white/20 bg-white/5 px-4 py-1.5 text-sm font-medium text-electric backdrop-blur-sm sm:rounded-full">
        {slide.badge}
      </span>

      <h1 className="text-balance font-display text-[clamp(2.25rem,7vw,5rem)] font-extrabold leading-[1.08] tracking-tight text-white">
        {slide.headline}
      </h1>

      <div className="mt-8 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="max-w-lg text-lg leading-relaxed text-slate-300 md:text-xl">
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
          className="group relative h-1 w-8 overflow-hidden rounded-full bg-white/20"
        >
          {i === active && (
            <motion.div
              className="absolute inset-0 rounded-full bg-electric"
              layoutId="hero-indicator"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
          {i === active && (
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-white/40"
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
      className="relative flex min-h-[100dvh] items-center overflow-hidden bg-navy"
      aria-label="Hero"
      data-navbar-dark
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_40%,rgba(37,99,235,0.15),transparent),radial-gradient(ellipse_60%_50%_at_80%_60%,rgba(37,99,235,0.08),transparent)]" />
        <div className="absolute inset-0 animate-[drift_20s_ease-in-out_infinite] bg-[radial-gradient(ellipse_50%_40%_at_60%_30%,rgba(37,99,235,0.06),transparent)]" />
      </div>

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

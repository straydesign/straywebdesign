'use client';

import { Code, Palette, Zap, ShieldCheck } from 'lucide-react';
import AnimateIn from '@/components/ui/AnimateIn';
import GradientText from '@/components/ui/GradientText';
import LighthouseGauge from '@/components/ui/LighthouseGauge';

const CREDENTIALS = [
  { icon: Zap, label: 'Lighthouse 100s', description: 'Consistently perfect scores' },
  { icon: Code, label: 'Modern Stack', description: 'React, Next.js, TypeScript' },
  { icon: Palette, label: 'Custom Design', description: 'Never templates, always unique' },
  { icon: ShieldCheck, label: 'Zero Plugins', description: 'No vulnerabilities, no bloat' },
];

export default function Guide() {
  return (
    <section
      id="guide"
      className="section-padding bg-light-gray"
      aria-label="About Stray Web Design"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Empathy + Authority */}
          <div>
            <AnimateIn>
              <span className="mb-4 inline-block text-sm font-semibold tracking-wide text-accent uppercase">
                Your Guide
              </span>
              <h2 className="font-mono text-3xl font-bold text-text-primary md:text-4xl">
                I Help Practices &amp; Firms{' '}
                <GradientText>Punch Above Their Weight.</GradientText>
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-text-secondary">
                I&apos;ve audited hundreds of dental offices, financial firms,
                dealerships, and professional services across Erie. The gap
                between them and enterprise competitors is real — but it&apos;s
                fixable. You don&apos;t need a corporate budget. You need a
                builder who understands what high-CLV businesses are up against.
              </p>
            </AnimateIn>

            <AnimateIn delay={0.2} className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {CREDENTIALS.map((cred) => (
                <div
                  key={cred.label}
                  className="flex items-start gap-3 border border-border-default bg-surface-card p-4"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-accent/10">
                    <cred.icon className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{cred.label}</p>
                    <p className="text-xs text-text-secondary">{cred.description}</p>
                  </div>
                </div>
              ))}
            </AnimateIn>
          </div>

          {/* Right: Lighthouse scores */}
          <AnimateIn direction="right" delay={0.3}>
            <div className="border border-border-default bg-surface-card p-5 sm:p-8">
              <h3 className="mb-6 text-center font-mono text-lg font-semibold text-text-primary">
                Our Standard: Near-Perfect Scores
              </h3>
              <div className="grid grid-cols-2 justify-items-center gap-4 sm:flex sm:justify-center sm:gap-8">
                <LighthouseGauge score={96} label="Performance" size={80} delay={0.5} />
                <LighthouseGauge score={100} label="Accessibility" size={80} delay={0.7} />
                <LighthouseGauge score={100} label="Best Practices" size={80} delay={0.9} />
                <LighthouseGauge score={100} label="SEO" size={80} delay={1.1} />
              </div>
              <p className="mt-6 text-center text-sm text-text-secondary">
                Every site we build targets 95+ across all Lighthouse categories.
              </p>
              <details className="mt-4 border border-border-default bg-surface-sunken px-4 py-3">
                <summary className="cursor-pointer text-sm font-medium text-text-primary">
                  Why not 100% performance?
                </summary>
                <div className="mt-2 space-y-2 text-xs leading-relaxed text-text-secondary">
                  <p>
                    We optimize everything we can — your JPG and PNG logos get
                    converted to SVG so they scale perfectly at any size without
                    losing quality. All images are compressed, converted to modern
                    formats, and lazy-loaded. Fonts are preloaded and subset to
                    only the characters your site uses.
                  </p>
                  <p>
                    The last few points come from the visual effects that make
                    your site feel premium: scroll-triggered animations, smooth
                    scrolling, interactive cards, and polished transitions. These
                    require a small amount of JavaScript — that&apos;s the 96 vs 100.
                  </p>
                  <p>
                    The tradeoff is worth it. A site that feels modern and
                    engaging converts better than a bare-bones page with a
                    perfect score. Your competitors&apos; WordPress sites score
                    30-50. We score 96 <em>and</em> deliver the polish that
                    builds trust.
                  </p>
                </div>
              </details>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}

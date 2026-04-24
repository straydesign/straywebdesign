'use client';

import { Check, ArrowRight, Shield } from 'lucide-react';
import AnimateIn, { StaggerContainer, StaggerItem } from '@/components/ui/AnimateIn';
import GradientText from '@/components/ui/GradientText';

type Tier = {
  name: string;
  tagline: string;
  price: string;
  priceNote: string;
  monthly: string;
  monthlyNote: string;
  blurb: string;
  features: readonly string[];
  cta: string;
  highlight: boolean;
  showPayWhenLive: boolean;
};

const TIERS: readonly Tier[] = [
  {
    name: 'Essential',
    tagline: 'For single-location businesses',
    price: '$1,500',
    priceNote: 'starts at',
    monthly: '$100',
    monthlyNote: '/mo once live',
    blurb:
      'A beautiful, fast marketing site with everything your customers need to find you, trust you, and call you. Simple sites start at $1,500; most land around $2,500.',
    features: [
      'Custom-designed site (1–5 pages, scoped to you)',
      'Custom CMS — edit any content yourself, anytime',
      'Mobile-friendly, accessible, 95+ Google Lighthouse',
      'Google Maps + click-to-call built in',
      'Local SEO + AI search optimization',
      'Unlimited structural changes + ongoing improvements',
    ],
    cta: 'Get started',
    highlight: true,
    showPayWhenLive: true,
  },
  {
    name: 'Custom',
    tagline: 'Scoped around what you actually need.',
    price: "Let's talk",
    priceNote: 'tailored',
    monthly: 'TBD',
    monthlyNote: 'scoped with you',
    blurb:
      "Tell me what you need and I'll build a package that fits. Direct communication, fast turnaround, and real prices — no layers, no upsells.",
    features: [
      'I listen first, quote second',
      'Pick and choose from any feature',
      'Plan + quote back in under 48 hours',
      'Pay a fair price for exactly what you use',
      'No pressure, no obligation',
    ],
    cta: "Let's talk",
    highlight: false,
    showPayWhenLive: false,
  },
  {
    name: 'Complete',
    tagline: 'For multi-location or complex businesses',
    price: '$5,000',
    priceNote: 'starts at',
    monthly: '$200',
    monthlyNote: '/mo once live',
    blurb:
      'Everything in Essential, sized for larger businesses with more traffic, more data, and faster turnaround needs.',
    features: [
      'Everything in Essential — CMS, structural changes, improvements',
      'Unlimited pages, organized by location or service',
      'Online booking / appointment system',
      'Customer CRM + email follow-up',
      'Landing pages for ads & promotions',
      'Optional AI phone answering (24/7)',
      'Priority turnaround on time-sensitive changes',
    ],
    cta: 'Talk to us',
    highlight: false,
    showPayWhenLive: true,
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="border-t border-border-default bg-surface-page py-20 md:py-28"
      aria-label="Pricing"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <AnimateIn className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-block font-mono text-[11px] font-semibold uppercase tracking-wider text-accent">
            Built in Erie. Priced fair.
          </span>
          <h2 className="font-mono text-3xl font-bold text-text-primary md:text-4xl lg:text-5xl">
            Real prices.{' '}
            <GradientText>No surprises.</GradientText>
          </h2>
          <p className="mt-4 font-mono text-lg text-text-secondary">
            You don&apos;t need a full agency to fix your website — you need someone
            who understands what actually makes people take action. That&apos;s what
            I focus on, at a price that makes sense.
          </p>
        </AnimateIn>

        <AnimateIn delay={0.1} className="mt-10">
          <div className="mx-auto flex max-w-2xl items-start gap-4 border-2 border-accent bg-surface-card p-6 md:p-7">
            <Shield className="mt-0.5 h-6 w-6 shrink-0 text-accent" />
            <div>
              <p className="font-mono text-sm font-bold uppercase tracking-wider text-accent">
                $0 up front. Pay when you love it.
              </p>
              <p className="mt-2 font-mono text-sm leading-relaxed text-text-secondary">
                We build your site on our servers, show it to you, and make changes
                until you&apos;re happy. You only pay once it&apos;s live and you&apos;re
                thrilled with the result. If it&apos;s not right, you owe us nothing.
              </p>
            </div>
          </div>
        </AnimateIn>

        <StaggerContainer
          className="mt-16 grid gap-6 md:grid-cols-3"
          staggerDelay={0.15}
        >
          {TIERS.map((tier) => (
            <StaggerItem key={tier.name}>
              <div
                className={`relative flex h-full flex-col border ${
                  tier.highlight
                    ? 'border-accent bg-surface-card shadow-[0_0_0_1px_var(--accent)]'
                    : 'border-border-default bg-surface-card'
                } p-8`}
              >
                {tier.highlight && (
                  <span className="absolute -top-3 left-8 bg-accent px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-white">
                    Most Popular
                  </span>
                )}
                <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">
                  {tier.name}
                </p>
                <p className="mt-1 font-mono text-sm text-text-secondary">
                  {tier.tagline}
                </p>

                <div className="mt-5 flex flex-wrap items-end gap-x-6 gap-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-4xl font-bold text-text-primary md:text-5xl">
                      {tier.price}
                    </span>
                    <span className="font-mono text-xs text-text-tertiary">
                      {tier.priceNote}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-mono text-xs text-text-tertiary">+</span>
                    <span className="font-mono text-2xl font-bold text-text-primary">
                      {tier.monthly}
                    </span>
                    <span className="font-mono text-xs text-text-tertiary">
                      {tier.monthlyNote}
                    </span>
                  </div>
                </div>

                {tier.showPayWhenLive && (
                  <p className="mt-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-accent">
                    $0 up front • Paid only when live
                  </p>
                )}
                <p className="mt-4 font-mono text-sm leading-relaxed text-text-secondary">
                  {tier.blurb}
                </p>

                <ul className="mt-6 flex-1 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span className="font-mono text-sm text-text-secondary">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`mt-8 inline-flex items-center justify-center gap-2 px-5 py-3 font-mono text-sm font-semibold uppercase tracking-wider transition-colors ${
                    tier.highlight
                      ? 'bg-accent text-white hover:bg-accent/90'
                      : 'border border-border-strong bg-surface-card text-text-primary hover:border-accent hover:text-accent'
                  }`}
                >
                  {tier.cta}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimateIn delay={0.4} className="mt-10">
          <div className="mx-auto max-w-3xl border border-border-default bg-surface-card p-6 md:p-8">
            <p className="font-mono text-sm font-semibold uppercase tracking-wider text-accent">
              What the monthly fee covers (both tiers)
            </p>
            <p className="mt-2 font-mono text-sm leading-relaxed text-text-secondary">
              Hosting, deploy pipeline, database (where needed), your custom
              CMS, SEO/analytics monitoring, and{' '}
              <span className="font-semibold text-text-primary">
                unlimited structural changes + ongoing improvement suggestions
              </span>
              . Flat rate — reach out as often as you need.
            </p>
            <p className="mt-4 font-mono text-sm leading-relaxed text-text-secondary">
              <span className="font-semibold text-text-primary">
                Why Complete is $200:
              </span>{' '}
              larger businesses push more traffic, more data, and more database
              load through the stack — and they need priority turnaround on
              time-sensitive changes. The higher rate reflects the actual cost
              of running it and the urgency that comes with it.
            </p>
          </div>
          <p className="mx-auto mt-6 max-w-3xl text-center font-mono text-sm text-text-tertiary">
            Your site breaks at 9pm on a Tuesday? You call a guy in Erie — not a
            ticket queue.
          </p>
          <p className="mt-6 text-center font-mono text-sm text-text-tertiary">
            Tell me about your business and I&apos;ll come back with a plan for
            exactly what the site should do. Back in 24 hours. No pressure.
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}

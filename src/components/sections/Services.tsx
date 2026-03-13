'use client';

import { Zap, Accessibility, Brain, Smartphone, Check } from 'lucide-react';
import AnimateIn, { StaggerContainer, StaggerItem } from '@/components/ui/AnimateIn';
import TiltCard from '@/components/ui/TiltCard';
import GradientText from '@/components/ui/GradientText';
import { SERVICES } from '@/lib/constants';

const ICONS = [Zap, Accessibility, Brain, Smartphone];

export default function Services() {
  return (
    <section id="services" className="section-padding bg-white" aria-label="Services">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <AnimateIn className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold tracking-wide text-electric uppercase">
            What We Build
          </span>
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl lg:text-5xl">
            Enterprise Features,{' '}
            <GradientText>Small Business Prices</GradientText>
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            The same performance, accessibility, and AI optimization that
            enterprise brands pay millions for — built for your business
            at a fraction of the cost.
          </p>
        </AnimateIn>

        <StaggerContainer
          className="mt-14 grid gap-6 md:grid-cols-2"
          staggerDelay={0.1}
        >
          {SERVICES.map((service, idx) => {
            const Icon = ICONS[idx];
            return (
              <StaggerItem key={service.title}>
                <TiltCard className="h-full" glowColor="rgba(59,130,246,0.1)">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-electric/10">
                    <Icon className="h-6 w-6 text-electric" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-navy">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {service.description}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-slate-600"
                      >
                        <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Pricing hint */}
        <AnimateIn delay={0.3} className="mt-12 text-center">
          <div className="inline-block rounded-2xl border border-slate-200/60 bg-light-gray px-8 py-6">
            <p className="text-sm text-slate-500">Projects start at</p>
            <p className="font-display text-3xl font-bold text-navy">$2,500</p>
            <p className="mt-1 text-sm text-slate-500">
              Premium sites from $5,000 &middot; Free audit included
            </p>
            <div className="mt-4 border-t border-slate-200 pt-4">
              <p className="text-sm font-semibold text-navy">$50/mo after launch</p>
              <p className="text-xs text-slate-500">
                Hosting, bug fixes, and content changes — all included. No surprise invoices.
              </p>
              <p className="mt-2 text-xs text-slate-400">
                No meetings to update a headline. No waiting weeks for a text change.
                When your business evolves — new services, new market, new messaging —
                send us a text and we push the update.
              </p>
            </div>
          </div>
          <p className="mx-auto mt-6 max-w-md text-sm text-slate-400">
            This is for Erie business owners who are passionate about what
            they do and want to keep growing. If you care about your business
            enough to want a digital presence that matches — this is for you.
            Not the cheapest option, but the one that scales with your ambition.
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}

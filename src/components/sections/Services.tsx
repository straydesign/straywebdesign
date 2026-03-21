'use client';

import { useState } from 'react';
import {
  Zap,
  Search,
  Phone,
  MessageCircle,
  CalendarCheck,
  BarChart3,
  Check,
  ChevronDown,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimateIn, { StaggerContainer, StaggerItem } from '@/components/ui/AnimateIn';
import TiltCard from '@/components/ui/TiltCard';
import GradientText from '@/components/ui/GradientText';
import { FOUNDATION_SERVICES, ADDON_SERVICES } from '@/lib/constants';
import { isMobile } from '@/lib/mobile';
import { cn } from '@/lib/utils';

const FOUNDATION_ICONS = [Zap, Search];
const ADDON_ICONS = [Phone, MessageCircle, CalendarCheck, BarChart3];

function ProcessToggle({
  process,
}: {
  process: readonly { readonly step: number; readonly title: string; readonly description: string }[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const mobile = isMobile();

  return (
    <>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="mt-4 flex items-center gap-1.5 text-sm font-medium text-navy/70 transition-colors hover:text-electric cursor-pointer"
        aria-expanded={isOpen}
      >
        How does that work?
        {mobile ? (
          <span
            className={cn('shrink-0 css-chevron-rotate', isOpen && 'open')}
            aria-hidden="true"
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </span>
        ) : (
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="shrink-0"
            aria-hidden="true"
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </motion.span>
        )}
      </button>

      {mobile ? (
        <div className={cn('css-accordion-panel', isOpen && 'open')}>
          <div>
            <div className="mt-4 space-y-3 border-t border-slate-100 pt-4">
              {process.map((step) => (
                <div key={step.step} className="flex gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-electric/10 text-[11px] font-bold text-electric">
                    {step.step}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-navy">
                      {step.title}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-3 border-t border-slate-100 pt-4">
                {process.map((step) => (
                  <div key={step.step} className="flex gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-electric/10 text-[11px] font-bold text-electric">
                      {step.step}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-navy">
                        {step.title}
                      </p>
                      <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
}

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
            <GradientText scrollLinked>Mid-Market Prices</GradientText>
          </h2>
        </AnimateIn>

        {/* Tier 1: Foundation */}
        <AnimateIn delay={0.1} className="mt-14">
          <h3 className="mb-6 text-center font-display text-lg font-semibold text-navy">
            Every Site Includes
          </h3>
          <StaggerContainer className="grid gap-6 md:grid-cols-2" staggerDelay={0.1}>
            {FOUNDATION_SERVICES.map((service, idx) => {
              const Icon = FOUNDATION_ICONS[idx];
              return (
                <StaggerItem key={service.title}>
                  <TiltCard className="h-full" glowColor="rgba(59,130,246,0.1)">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-electric/10">
                      <Icon className="h-6 w-6 text-electric" />
                    </div>
                    <h4 className="font-display text-xl font-bold text-navy">
                      {service.title}
                    </h4>
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
                    <ProcessToggle process={service.process} />
                  </TiltCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </AnimateIn>

        {/* Tier 2: AI-Powered Add-Ons */}
        <AnimateIn delay={0.2} className="mt-16">
          <h3 className="mb-6 text-center font-display text-lg font-semibold text-navy">
            AI-Powered Add-Ons
          </h3>
          <StaggerContainer className="grid gap-6 sm:grid-cols-2" staggerDelay={0.08}>
            {ADDON_SERVICES.map((service, idx) => {
              const Icon = ADDON_ICONS[idx];
              return (
                <StaggerItem key={service.title}>
                  <TiltCard className="h-full" glowColor="rgba(59,130,246,0.08)">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-electric/10">
                      <Icon className="h-5 w-5 text-electric" />
                    </div>
                    <h4 className="font-display text-lg font-bold text-navy">
                      {service.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {service.description}
                    </p>
                    <ul className="mt-4 space-y-1.5">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-sm text-slate-600"
                        >
                          <Check className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <ProcessToggle process={service.process} />
                  </TiltCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </AnimateIn>

        {/* Pricing hint */}
        <AnimateIn delay={0.3} className="mt-12 text-center">
          <div className="inline-block rounded-2xl border border-slate-200/60 bg-light-gray px-5 py-5 sm:px-8 sm:py-6">
            <p className="text-sm text-slate-500">Projects start at</p>
            <p className="font-display text-3xl font-bold text-navy">$2,500</p>
            <p className="mt-1 text-sm text-slate-500">
              Premium sites from $5,000 &middot; Free audit included
            </p>
            <div className="mt-4 border-t border-slate-200 pt-4">
              <p className="text-sm font-semibold text-navy">$100/mo after launch</p>
              <p className="text-xs text-slate-500">
                Hosting, support, SEO monitoring, content updates, analytics, and ad-ready infrastructure.
              </p>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useClientEnv } from '@/lib/use-client-env';
import type { Service } from '@/data/services';

interface ServiceCardProps {
  service: Service;
  className?: string;
}

export default function ServiceCard({ service, className }: ServiceCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { mobile } = useClientEnv();

  return (
    <div
      className={cn(
        'group flex h-full flex-col rounded-xl border border-slate-200/60 bg-white p-6 shadow-sm transition-shadow hover:shadow-md',
        className,
      )}
    >
      <h2 className="font-display text-lg font-bold text-navy">
        {service.name}
      </h2>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
        {service.description}
      </p>

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="mt-4 flex items-center gap-1.5 text-sm font-medium text-navy/70 transition-colors hover:text-electric"
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
              {service.process.map((step) => (
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
                {service.process.map((step) => (
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

      <a
        href={`/services/${service.slug}`}
        className="mt-4 flex items-center gap-1 text-sm font-medium text-electric transition-colors hover:text-electric/80"
      >
        Learn more
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
      </a>
    </div>
  );
}

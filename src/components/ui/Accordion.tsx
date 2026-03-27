'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useClientEnv } from '@/lib/use-client-env';

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: readonly AccordionItem[];
  className?: string;
}

export default function Accordion({ items, className = '' }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { mobile } = useClientEnv();

  return (
    <div className={cn('space-y-3', className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="overflow-hidden rounded-xl border border-slate-200/60 bg-white"
          >
            <h3 className="m-0">
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold text-navy transition-colors hover:bg-slate-50 md:p-6"
                aria-expanded={isOpen}
                aria-controls={`accordion-panel-${index}`}
                id={`accordion-trigger-${index}`}
              >
                <span className="font-display text-base md:text-lg">
                  {item.question}
                </span>
                {mobile ? (
                  <span
                    className={cn('shrink-0 css-chevron-rotate', isOpen && 'open')}
                    aria-hidden="true"
                  >
                    <ChevronDown className="h-5 w-5 text-medium-gray" />
                  </span>
                ) : (
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0"
                    aria-hidden="true"
                  >
                    <ChevronDown className="h-5 w-5 text-medium-gray" />
                  </motion.span>
                )}
              </button>
            </h3>
            {mobile ? (
              <div
                id={`accordion-panel-${index}`}
                role="region"
                aria-labelledby={`accordion-trigger-${index}`}
                className={cn('css-accordion-panel', isOpen && 'open')}
              >
                <div>
                  <div className="px-5 pb-5 leading-relaxed text-slate-600 md:px-6 md:pb-6">
                    {item.answer}
                  </div>
                </div>
              </div>
            ) : (
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    id={`accordion-panel-${index}`}
                    role="region"
                    aria-labelledby={`accordion-trigger-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <div className="px-5 pb-5 leading-relaxed text-slate-600 md:px-6 md:pb-6">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        );
      })}
    </div>
  );
}

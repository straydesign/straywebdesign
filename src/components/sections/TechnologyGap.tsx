'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimateIn from '@/components/ui/AnimateIn';
import { FAQ_ITEMS } from '@/lib/constants';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handlePillClick = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const activeItem =
    activeIndex !== null ? FAQ_ITEMS[activeIndex] : null;

  return (
    <section
      id="faq"
      className="border-t border-border-default bg-surface-card py-16 md:py-20"
      aria-label="FAQ"
    >
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <AnimateIn>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-text-tertiary">
            FAQ
          </p>
        </AnimateIn>

        <AnimateIn delay={0.1} className="mt-8">
          <div
            className="flex flex-wrap gap-2.5"
            role="tablist"
            aria-label="Frequently asked questions"
          >
            {FAQ_ITEMS.map((item, index) => (
              <button
                key={index}
                role="tab"
                aria-selected={activeIndex === index}
                aria-controls="faq-answer-panel"
                onClick={() => handlePillClick(index)}
                className={`flex-grow px-4 py-2 text-center font-mono text-sm font-medium transition-all duration-200 cursor-pointer ${
                  activeIndex === index
                    ? 'bg-accent text-white'
                    : 'bg-surface-sunken text-text-primary hover:bg-border-default'
                }`}
              >
                {item.question}
              </button>
            ))}
          </div>
        </AnimateIn>

        <AnimatePresence mode="wait">
          {activeItem && (
            <motion.div
              id="faq-answer-panel"
              role="tabpanel"
              key={activeIndex}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-6 border border-border-default bg-surface-page p-6 md:p-8">
                <h3 className="font-mono text-lg font-semibold text-text-primary">
                  {activeItem.question}
                </h3>
                <p className="mt-3 font-mono leading-relaxed text-text-secondary">
                  {activeItem.answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ_ITEMS.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
          }),
        }}
      />
    </section>
  );
}

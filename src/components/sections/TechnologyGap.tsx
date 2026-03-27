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
      className="border-t border-slate-200 bg-white py-16 md:py-20"
      aria-label="FAQ"
    >
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <AnimateIn>
          <p className="text-sm font-semibold tracking-widest text-slate-400 uppercase">
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
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer ${
                  activeIndex === index
                    ? 'bg-electric text-white shadow-sm'
                    : 'bg-slate-100 text-navy hover:bg-slate-200'
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
              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
                <h3 className="text-lg font-semibold text-navy">
                  {activeItem.question}
                </h3>
                <p className="mt-3 leading-relaxed text-slate-600">
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

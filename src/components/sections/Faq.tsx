'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import AnimateIn from '@/components/ui/AnimateIn';
import { FAQ_GROUPS, FAQ_ITEMS } from '@/data/faqs';

/* Faq — twenty questions, grouped, sitting above the proof rather than at the
   bottom of the page. Split tests on this format move FAQs up almost every
   time: somebody this far down is looking for a reason not to, and the answer
   has to reach them before the reason does. FAQPage JSON-LD rides along. */

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-surface-card">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left md:px-7"
      >
        <span className="font-display text-base font-semibold tracking-tight text-text-primary md:text-lg">
          {q}
        </span>
        <span
          aria-hidden
          className={`shrink-0 text-accent transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
        >
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl px-6 pb-6 font-body text-[15px] leading-relaxed text-text-secondary md:px-7">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  return (
    <section
      id="faq"
      className="border-b border-border-default bg-surface-page py-20 md:py-28"
      aria-label="Questions"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <AnimateIn>
          <h2 className="font-display text-[clamp(1.9rem,4vw,2.9rem)] font-bold leading-[1.05] tracking-tight text-text-primary">
            Everything people ask me.
          </h2>
          <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-text-secondary md:text-lg">
            Including the awkward ones. If yours isn&apos;t here, it&apos;s a
            good question to open the call with.
          </p>
        </AnimateIn>

        <div className="mt-12 flex flex-col gap-10 md:mt-16">
          {FAQ_GROUPS.map((group, gi) => (
            <AnimateIn key={group.label} delay={gi * 0.05}>
              <h3 className="font-mono text-[12px] text-text-tertiary">
                {group.label}
              </h3>
              <div className="mt-4 flex flex-col gap-px overflow-hidden rounded-lg border border-border-default bg-border-default">
                {group.items.map((item) => (
                  <FaqItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}

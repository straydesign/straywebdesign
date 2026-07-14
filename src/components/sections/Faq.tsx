'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import AnimateIn from '@/components/ui/AnimateIn';

/* Faq — the questions people actually ask before hiring a designer, answered
   plainly in first person. Every claim here traces to real offers/prices.
   FAQPage JSON-LD rides along for search and AI assistants. */

const FAQ_ITEMS = [
  {
    q: 'How much does a website cost?',
    a: 'Pricing guides put a professionally designed site anywhere from $500 to $10,000. My basic build is $500 flat, then $20 a month for hosting with small edits included. Those are the real numbers; there is no quote dance.',
  },
  {
    q: 'What does the $20 a month cover?',
    a: 'Hosting and small edits. I keep the site fast and online, and when your hours change or a photo needs swapping, you send it over and I handle it. If your site ever looks the same next quarter, that should only mean nothing about your business changed.',
  },
  {
    q: 'How long does it take?',
    a: 'About a week once you send me your content and photos.',
  },
  {
    q: 'Can my team update things without waiting on you?',
    a: "When the site needs it, yes. Andy's Pub and Bullfrog both keep their own menus and daily specials current through a system I set up for them, events too, with no designer in the loop. For most sites the included small edits cover it, and bigger changes are $30 an hour.",
  },
  {
    q: "What if I'm not in Erie?",
    a: 'Everything works remotely: calls, screen shares, and the same hosting and edit service no matter where you are.',
  },
  {
    q: 'Can it handle online ordering or bookings?',
    a: "Yes. I've wired client sites into Square and PayPal for payments and ordering, and into content systems the team edits themselves. If your business runs on it, the site can talk to it.",
  },
  {
    q: 'What happens to my current website?',
    a: 'Nothing, until the new one is ready. I build your new site from scratch alongside it, we keep your domain and everything true about your business, and we switch over when you say go.',
  },
];

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
      aria-label="FAQ"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <AnimateIn>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-accent">
            <span aria-hidden className="text-accent/60">{'// '}</span>
            questions
          </p>
          <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,2.9rem)] font-bold leading-[1.05] tracking-tight text-text-primary">
            Questions I actually get.
          </h2>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <div className="mt-10 flex flex-col gap-px overflow-hidden rounded-lg border border-border-default bg-border-default">
            {FAQ_ITEMS.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

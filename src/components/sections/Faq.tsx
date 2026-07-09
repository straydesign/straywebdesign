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
    a: "Pricing guides put a professionally designed site anywhere from $500 to $10,000. Mine is $300 flat: I design it, build it, and hand it over finished. The hosting and domain get set up in your name at cost, so there's nothing hidden inside my price.",
  },
  {
    q: 'Do I own the website, or do you?',
    a: 'You own it. The hosting account, the domain, and the billing are all set up in your name from day one. Most designers keep those in their name, which is how people end up stuck. If we ever part ways, everything is already yours.',
  },
  {
    q: 'How long does it take?',
    a: 'About a week once you send me your content and photos.',
  },
  {
    q: 'Can I make changes myself after it launches?',
    a: 'Yes. Before I hand the site over, I teach you to make changes with AI tools: editing text, swapping photos, adding a page. You keep full control without paying a designer for every small change, and if you get stuck you can always book an hour with me.',
  },
  {
    q: "What if I'm not in Erie?",
    a: 'Everything works remotely: calls, screen shares, and a handoff into accounts you own.',
  },
  {
    q: 'Can it handle online ordering or bookings?',
    a: "Yes. I've wired client sites into Square and PayPal for payments and ordering, and into content systems the team edits themselves. If your business runs on it, the site can talk to it.",
  },
  {
    q: 'What does the $20-a-month hosting cover?',
    a: "If you'd rather not run your own hosting, I keep the site fast, online, and current, so it's never something you have to think about.",
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

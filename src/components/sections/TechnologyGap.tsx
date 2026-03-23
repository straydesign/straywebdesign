'use client';

import AnimateIn from '@/components/ui/AnimateIn';
import Accordion from '@/components/ui/Accordion';
import { FAQ_ITEMS } from '@/lib/constants';

export default function FAQ() {
  return (
    <section id="faq" className="border-t border-slate-200 bg-white py-16 md:py-20" aria-label="FAQ">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <AnimateIn>
          <p className="text-sm font-semibold tracking-widest text-slate-400 uppercase">
            FAQ
          </p>
        </AnimateIn>

        <AnimateIn delay={0.1} className="mt-8">
          <Accordion items={[...FAQ_ITEMS]} />
        </AnimateIn>
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

'use client';

import AnimateIn from '@/components/ui/AnimateIn';
import Accordion from '@/components/ui/Accordion';
import GradientText from '@/components/ui/GradientText';
import { FAQ_ITEMS } from '@/lib/constants';

export default function FAQ() {
  return (
    <section id="faq" className="bg-light-gray py-14 md:py-20" aria-label="FAQ">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <AnimateIn>
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">
            Questions We Get Asked
          </h2>
        </AnimateIn>

        <AnimateIn delay={0.2} className="mt-10">
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

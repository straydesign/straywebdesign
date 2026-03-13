'use client';

import AnimateIn from '@/components/ui/AnimateIn';
import Accordion from '@/components/ui/Accordion';
import GradientText from '@/components/ui/GradientText';
import { FAQ_ITEMS } from '@/lib/constants';

export default function TechnologyGap() {
  return (
    <section id="faq" className="section-padding bg-light-gray" aria-label="FAQ">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Context */}
          <AnimateIn>
            <span className="mb-4 inline-block text-sm font-semibold tracking-wide text-electric uppercase">
              The Technology Gap
            </span>
            <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">
              Why WordPress Can&apos;t{' '}
              <GradientText>Compete</GradientText>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Enterprise brands don&apos;t use WordPress. They use custom-built
              platforms optimized for speed, security, and AI. WordPress&apos;s
              plugin-heavy architecture from 2003 can&apos;t match what modern
              businesses need to compete.
            </p>
            <div className="mt-8 space-y-4">
              <div className="rounded-xl border border-slate-200/60 bg-white p-5">
                <h3 className="font-display font-semibold text-navy">
                  What Modern Sites Include
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>&#x2022; Structured data (JSON-LD) for rich search results</li>
                  <li>&#x2022; Core Web Vitals optimization for Google ranking</li>
                  <li>&#x2022; Semantic HTML for accessibility and AI comprehension</li>
                  <li>&#x2022; Edge deployment for global speed</li>
                  <li>&#x2022; llms.txt for AI assistant discoverability</li>
                </ul>
              </div>
              <div className="rounded-xl border border-amber-200/60 bg-amber-50 p-5">
                <h3 className="font-display font-semibold text-navy">
                  What is GEO?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  <strong>Generative Engine Optimization</strong> — the next
                  evolution of SEO. While traditional SEO optimizes for
                  link-based results, GEO optimizes for AI-generated answers.
                  Structured data, conversational content, and machine-readable
                  formats that AI models use to recommend your business.
                </p>
              </div>
            </div>
          </AnimateIn>

          {/* Right: FAQ Accordion */}
          <AnimateIn direction="right" delay={0.2}>
            <h3 className="mb-6 font-display text-xl font-bold text-navy">
              Frequently Asked Questions
            </h3>
            <Accordion items={[...FAQ_ITEMS]} />
          </AnimateIn>
        </div>
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

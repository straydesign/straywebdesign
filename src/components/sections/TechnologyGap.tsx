'use client';

import AnimateIn from '@/components/ui/AnimateIn';
import Accordion from '@/components/ui/Accordion';
import GradientText from '@/components/ui/GradientText';
import { FAQ_ITEMS } from '@/lib/constants';

const WORDPRESS_PROBLEMS = [
  {
    title: "You're Invisible to AI",
    description:
      "No JSON-LD, no llms.txt, no FAQ schema. ChatGPT, Perplexity, and Google AI recommend your competitor because they can actually read their site. Every AI search you miss is a lead gone.",
  },
  {
    title: 'Your Tags Are Stale',
    description:
      "WordPress SEO plugins set-and-forget title tags, descriptions, and OG data. Nobody updates them when your services change. Stale meta = stale rankings.",
  },
  {
    title: 'Your Heading Structure Is Broken',
    description:
      "Page builders let you pick \"big text\" and \"small text\" without proper H1\u2192H2\u2192H3 hierarchy. Screen readers can't navigate it. Google can't parse it. AI can't understand it. Triple penalty.",
  },
  {
    title: "You're Stuck at a Design Ceiling",
    description:
      "Want scroll-triggered parallax? 3D tilt cards? Magnetic buttons? Page builders can't do it. You're stuck with the same flat grid every other business uses. Custom interactions separate \"professional\" from \"template.\"",
  },
  {
    title: '13 Plugins, 13 Invoices',
    description:
      'Average site runs 13 active plugins. Each one: its own database queries, CSS, JavaScript, and security holes. 96% of WordPress vulnerabilities come from plugins (Patchstack 2024). You\'re paying to maintain your own attack surface.',
  },
  {
    title: 'Your Images Are Hemorrhaging Speed',
    description:
      "WordPress serves the exact file you uploaded. No WebP, no responsive sizing, no proper lazy loading. A 3MB hero image that should be 200KB. On mobile, that's 4 seconds of nothing. Google measures this \u2014 you're failing.",
  },
];

export default function TechnologyGap() {
  return (
    <section id="faq" className="section-padding bg-light-gray" aria-label="FAQ">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: WordPress Problems */}
          <AnimateIn>
            <span className="mb-4 inline-block text-sm font-semibold tracking-wide text-electric uppercase">
              The Technology Gap
            </span>
            <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">
              Your WordPress Site Is{' '}
              <GradientText>Burning Money.</GradientText>
              <br />
              <span className="text-2xl md:text-3xl">Here&apos;s Why.</span>
            </h2>

            <div className="mt-8 space-y-4">
              {WORDPRESS_PROBLEMS.map((problem) => (
                <div
                  key={problem.title}
                  className="rounded-xl border border-slate-200/60 bg-white p-5"
                >
                  <h3 className="font-display font-semibold text-navy">
                    {problem.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {problem.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-xl border border-slate-200/60 bg-white p-5">
                <h3 className="font-display font-semibold text-navy">
                  What Modern Sites Include
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>&#x2022; Structured data (JSON-LD) for rich search results &amp; AI citations</li>
                  <li>&#x2022; Core Web Vitals optimization for Google ranking signals</li>
                  <li>&#x2022; Semantic HTML for accessibility, SEO, and AI comprehension</li>
                  <li>&#x2022; Edge deployment across 300+ global CDN nodes</li>
                  <li>&#x2022; llms.txt for AI assistant discoverability</li>
                  <li>&#x2022; Automatic image optimization (AVIF, WebP, responsive sizing)</li>
                </ul>
              </div>
              <div className="rounded-xl border border-blue-200/60 bg-blue-50 p-5">
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

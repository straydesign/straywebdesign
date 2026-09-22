import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LandingPageHeader from '@/components/layout/LandingPageHeader';
import Footer from '@/components/layout/Footer';
import CaseStudy from '@/components/sections/CaseStudy';
import { CASE_STUDIES, getCaseStudy } from '@/data/caseStudies';

/**
 * A case study per client site.
 *
 * straydesign.co runs these inside one client shell and swaps a `Page` union.
 * This site has real routes, so each study is a static page — which is also
 * what lets a prospect land on one from search or from a link in a message.
 */
export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

/**
 * A slug that is not one of the four must 404, not stream.
 *
 * `notFound()` below is correct and still ran, but with dynamicParams on, an
 * unknown slug renders on demand — and the response has already committed
 * 200 and flushed the loading shell by the time it throws. /work/sea-cave
 * (the real slug is `seacave`) answered 200 with the word "Loading…" on it:
 * a soft 404, which is the kind Search Console counts as a live page and
 * indexes against the site.
 *
 * The studies are a fixed array in src/data, so there is nothing to generate
 * on demand. Closing the door is both the fix and the truth.
 */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: `${study.client} — ${study.title} | Stray Web Design`,
    description: study.metaDescription,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      title: `${study.client} — ${study.title}`,
      description: study.metaDescription,
      url: `https://straywebdesign.co/work/${slug}`,
      type: 'article',
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getCaseStudy(slug)) notFound();
  return (
    <>
      <LandingPageHeader />
      <main id="main">
        <CaseStudy slug={slug} />
      </main>
      <Footer />
    </>
  );
}

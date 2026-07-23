import type { ResourceMeta } from '@/lib/content';
import type { Pillar } from '@/data/pillars';

const BASE_URL = 'https://straywebdesign.co';

export function generateArticleJsonLd(meta: ResourceMeta): Record<string, unknown> {
  const url = `${BASE_URL}/resources/blog/${meta.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': meta.schema,
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    dateModified: meta.date,
    url,
    author: {
      '@type': 'Person',
      name: meta.author,
      url: 'https://tomsesler.com',
      sameAs: [
        'https://straydesign.co',
        'https://straywebdesign.co',
      ],
    },
    publisher: {
      '@type': 'Organization',
      name: 'Stray Web Design',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/images/logo-blue-white-square.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    image: `${url}/opengraph-image`,
    articleSection: meta.tag,
    wordCount: undefined, // calculated at render time if needed
    inLanguage: 'en-US',
  };
}

/** FAQPage JSON-LD for a pillar page — each honest-answer band becomes a
    question/answer pair, so the page is eligible for FAQ rich results. */
export function generatePillarJsonLd(pillar: Pillar): Record<string, unknown> {
  const url = `${BASE_URL}/${pillar.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    name: pillar.question,
    description: pillar.metaDescription,
    url,
    inLanguage: 'en-US',
    author: {
      '@type': 'Person',
      name: 'Tom Sesler',
      url: 'https://tomsesler.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Stray Web Design',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/images/logo-blue-white-square.png`,
      },
    },
    mainEntity: pillar.bands.map((band) => ({
      '@type': 'Question',
      name: band.title,
      acceptedAnswer: {
        '@type': 'Answer',
        text: band.body,
      },
    })),
  };
}

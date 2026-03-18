import type { ResourceMeta } from '@/lib/content';

const BASE_URL = 'https://straywebdesign.co';

const TYPE_TO_DIR: Record<string, string> = {
  blog: 'blog',
  'white-paper': 'white-papers',
  'case-study': 'case-studies',
};

export function generateArticleJsonLd(meta: ResourceMeta): Record<string, unknown> {
  const url = `${BASE_URL}/resources/${TYPE_TO_DIR[meta.type]}/${meta.slug}`;

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

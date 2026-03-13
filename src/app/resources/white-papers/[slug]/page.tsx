import { notFound } from 'next/navigation';
import ArticleLayout from '@/components/layout/ArticleLayout';
import { getResourcesByType, getResourceBySlug } from '@/lib/resources';

export function generateStaticParams() {
  return getResourcesByType('white-paper').map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const resource = getResourceBySlug(slug);
    if (!resource) return {};
    return {
      title: `${resource.title} — Stray Web Design`,
      description: resource.description,
    };
  });
}

export default async function WhitePaper({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource || resource.type !== 'white-paper') notFound();
  return <ArticleLayout resource={resource} />;
}

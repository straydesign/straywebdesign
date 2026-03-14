import { notFound } from 'next/navigation';
import ArticleLayout from '@/components/layout/ArticleLayout';
import { getResourcesByType, getResourceBySlug, getResourcePath } from '@/lib/resources';

export function generateStaticParams() {
  return getResourcesByType('blog').map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const resource = getResourceBySlug(slug);
    if (!resource) return {};
    return {
      title: `${resource.title} — Stray Web Design`,
      description: resource.description,
      alternates: { canonical: getResourcePath(resource) },
    };
  });
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource || resource.type !== 'blog') notFound();
  return <ArticleLayout resource={resource} />;
}

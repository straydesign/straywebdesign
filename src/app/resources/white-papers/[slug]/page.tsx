import { notFound } from 'next/navigation';
import ArticleLayout from '@/components/layout/ArticleLayout';
import { getResourcesByType, getResourceBySlug, getResourcePath, getCompiledArticle } from '@/lib/content';

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
      alternates: { canonical: getResourcePath(resource) },
    };
  });
}

export default async function WhitePaper({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getCompiledArticle('white-paper', slug);
  if (!article) notFound();
  return (
    <ArticleLayout meta={article.meta} jsonLd={article.jsonLd}>
      {article.content}
    </ArticleLayout>
  );
}

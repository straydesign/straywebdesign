import { notFound } from 'next/navigation';
import ArticleLayout from '@/components/layout/ArticleLayout';
import { getResourcesByType, getResourceBySlug, getResourcePath, getCompiledArticle, getRelatedResources } from '@/lib/content';

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
  const article = await getCompiledArticle('blog', slug);
  if (!article) notFound();
  const relatedPosts = getRelatedResources(slug, article.meta.tag, 3);
  return (
    <ArticleLayout meta={article.meta} jsonLd={article.jsonLd} relatedPosts={relatedPosts}>
      {article.content}
    </ArticleLayout>
  );
}

import { getResourceBySlug } from '@/lib/resources';
import { createResourceOGImage } from '@/lib/og-image';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);

  if (!resource) {
    return new Response('Not found', { status: 404 });
  }

  return createResourceOGImage({
    title: resource.title,
    type: resource.type,
    tag: resource.tag,
    readTime: resource.readTime,
  });
}

import { getServiceBySlug } from '@/data/services';
import { createResourceOGImage } from '@/lib/og-image';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return new Response('Not found', { status: 404 });
  }

  return createResourceOGImage({
    title: service.name,
    type: 'service',
    tag: 'Services',
    readTime: '',
  });
}

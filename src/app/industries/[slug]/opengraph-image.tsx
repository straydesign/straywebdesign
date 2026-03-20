import { getIndustryBySlug } from '@/data/industries';
import { createResourceOGImage } from '@/lib/og-image';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    return new Response('Not found', { status: 404 });
  }

  return createResourceOGImage({
    title: `${industry.name} Web Design`,
    type: 'industry',
    tag: industry.shortName,
    readTime: '',
  });
}

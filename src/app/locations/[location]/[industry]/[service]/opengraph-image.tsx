import { getLocationBySlug } from '@/data/locations';
import { getIndustryBySlug } from '@/data/industries';
import { getServiceBySlug } from '@/data/services';
import { createResourceOGImage } from '@/lib/og-image';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage({
  params,
}: {
  params: Promise<{ location: string; industry: string; service: string }>;
}) {
  const { location: locSlug, industry: indSlug, service: svcSlug } = await params;
  const location = getLocationBySlug(locSlug);
  const industry = getIndustryBySlug(indSlug);
  const service = getServiceBySlug(svcSlug);

  if (!location || !industry || !service) {
    return new Response('Not found', { status: 404 });
  }

  return createResourceOGImage({
    title: `${service.shortName} for ${industry.name} in ${location.name}, PA`,
    type: 'location',
    tag: industry.shortName,
    readTime: location.name,
  });
}

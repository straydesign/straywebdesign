import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ProgrammaticPageLayout from '@/components/layout/ProgrammaticPageLayout';
import { getAllLocationSlugs, getLocationBySlug } from '@/data/locations';
import { getAllIndustrySlugs, getIndustryBySlug } from '@/data/industries';
import { SERVICES, getAllServiceSlugs, getServiceBySlug } from '@/data/services';
import { getIntersectionContent, getIntersectionFaqs } from '@/data/intersections';

export function generateStaticParams() {
  const locations = getAllLocationSlugs();
  const industries = getAllIndustrySlugs();
  const services = getAllServiceSlugs();
  return locations.flatMap((location) =>
    industries.flatMap((industry) =>
      services.map((service) => ({ location, industry, service }))
    )
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ location: string; industry: string; service: string }>;
}): Promise<Metadata> {
  const { location: locSlug, industry: indSlug, service: svcSlug } = await params;
  const location = getLocationBySlug(locSlug);
  const industry = getIndustryBySlug(indSlug);
  const service = getServiceBySlug(svcSlug);
  if (!location || !industry || !service) return {};
  return {
    title: `${service.shortName} for ${industry.name} in ${location.name}, PA — Stray Web Design`,
    description: `${service.name} for ${industry.name.toLowerCase()} in ${location.fullName}. ${service.description.slice(0, 100)}`,
    alternates: { canonical: `/locations/${locSlug}/${indSlug}/${svcSlug}` },
    keywords: [
      ...industry.keywords.slice(0, 5),
      `${service.shortName.toLowerCase()} ${location.name}`,
      `${industry.shortName.toLowerCase()} ${service.shortName.toLowerCase()} ${location.name} PA`,
    ],
  };
}

function parseStat(value: string): { num: number; prefix?: string; suffix?: string } {
  const cleaned = value.replace(/,/g, '');
  const match = cleaned.match(/^([^0-9]*)([\d.]+)(.*)$/);
  if (!match) return { num: 0 };
  return {
    prefix: match[1] || undefined,
    num: parseFloat(match[2]),
    suffix: match[3] || undefined,
  };
}

export default async function ProgrammaticPage({
  params,
}: {
  params: Promise<{ location: string; industry: string; service: string }>;
}) {
  const { location: locSlug, industry: indSlug, service: svcSlug } = await params;
  const location = getLocationBySlug(locSlug);
  const industry = getIndustryBySlug(indSlug);
  const service = getServiceBySlug(svcSlug);
  if (!location || !industry || !service) notFound();

  const intersectionContent = getIntersectionContent(indSlug, locSlug);
  const faqs = getIntersectionFaqs(indSlug, locSlug);

  // Build stats from industry data
  const stats = industry.stats.slice(0, 4).map((stat) => {
    const parsed = parseStat(stat.value);
    return { value: parsed.num, prefix: parsed.prefix, suffix: parsed.suffix, label: stat.label };
  });

  // Build content sections
  const sections = [
    {
      heading: `Why ${industry.name} in ${location.name} Need ${service.shortName}`,
      content: `<p>${intersectionContent}</p><p class="mt-4">${service.longDescription}</p>`,
    },
    {
      heading: `What Our ${service.shortName} Includes`,
      content: `<ul class="mt-2 space-y-2">${service.features
        .map(
          (f) =>
            `<li class="flex items-start gap-2"><span class="mt-1 text-electric">✓</span><span><strong>${f.title}:</strong> ${f.description}</span></li>`
        )
        .join('')}</ul>`,
    },
    {
      heading: `Our Process for ${location.name} ${industry.name}`,
      content: `<ol class="mt-2 space-y-4">${service.process
        .map(
          (p) =>
            `<li class="flex items-start gap-3"><span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-electric/10 text-sm font-bold text-electric">${p.step}</span><span><strong>${p.title}:</strong> ${p.description}</span></li>`
        )
        .join('')}</ol>`,
    },
    {
      heading: `The ${location.name} Advantage`,
      content: `<p>${location.businessContext}</p><p class="mt-4">We know ${location.name} because we're local. We understand the competitive landscape, the customer base, and what it takes to stand out in ${location.nearbyAreas.length > 0 ? `a market that includes ${location.nearbyAreas.slice(0, 3).join(', ')} and beyond` : 'this market'}.</p>`,
    },
  ];

  // Add service-specific FAQs merged with intersection FAQs
  const allFaqs = [
    ...faqs,
    ...service.faqs.slice(0, 2).map((f) => ({
      question: f.question.replace(/your business/gi, `${industry.name.toLowerCase()} in ${location.name}`),
      answer: f.answer,
    })),
  ];

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `${service.name} for ${industry.name}`,
      description: `${service.name} for ${industry.name.toLowerCase()} in ${location.fullName}.`,
      url: `https://straywebdesign.co/locations/${locSlug}/${indSlug}/${svcSlug}`,
      provider: {
        '@type': 'LocalBusiness',
        name: 'Stray Web Design',
        url: 'https://straywebdesign.co',
        areaServed: {
          '@type': 'City',
          name: location.name,
          containedInPlace: { '@type': 'State', name: 'Pennsylvania' },
        },
      },
      serviceType: service.name,
      audience: {
        '@type': 'Audience',
        audienceType: industry.name,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://straywebdesign.co' },
        { '@type': 'ListItem', position: 2, name: 'Locations', item: 'https://straywebdesign.co/locations' },
        { '@type': 'ListItem', position: 3, name: location.name, item: `https://straywebdesign.co/locations/${locSlug}` },
        { '@type': 'ListItem', position: 4, name: industry.shortName, item: `https://straywebdesign.co/locations/${locSlug}/${indSlug}` },
        { '@type': 'ListItem', position: 5, name: service.shortName },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: allFaqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ];

  // Find related services
  const relatedServices = SERVICES.filter((s) => s.slug !== svcSlug).slice(0, 3);

  return (
    <ProgrammaticPageLayout
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Locations', href: '/locations' },
        { label: location.name, href: `/locations/${locSlug}` },
        { label: industry.shortName, href: `/locations/${locSlug}/${indSlug}` },
        { label: service.shortName },
      ]}
      title={`${service.shortName} for ${industry.name} in ${location.name}`}
      subtitle={`${industry.shortName} · ${service.shortName} · ${location.name}, PA`}
      description={`${service.description} Tailored for ${industry.name.toLowerCase()} in the ${location.name} area.`}
      stats={stats}
      sections={sections}
      faqs={allFaqs}
      jsonLd={jsonLd}
      ctaText={`Get Your Free ${location.name} Audit`}
    />
  );
}

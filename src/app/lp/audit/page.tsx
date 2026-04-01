import type { Metadata } from 'next';
import AuditLandingForm from '@/components/sections/AuditLandingForm';

export const metadata: Metadata = {
  title: 'Free Website Audit — Stray Web Design',
  description:
    'Get a free Lighthouse report, competitor comparison, and action plan for your website. See exactly where you stand.',
  alternates: { canonical: '/lp/audit' },
  openGraph: {
    title: 'Free Website Audit — Stray Web Design',
    description:
      'Get a free Lighthouse report, competitor comparison, and action plan for your website.',
    url: 'https://straywebdesign.co/lp/audit',
    type: 'website',
  },
};

export default function AuditLandingPage() {
  return <AuditLandingForm />;
}

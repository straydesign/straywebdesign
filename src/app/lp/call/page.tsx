import type { Metadata } from 'next';
import CallLandingForm from '@/components/sections/CallLandingForm';

export const metadata: Metadata = {
  title: 'Book a Strategy Call — Stray Web Design',
  description:
    '15 minutes. Zero pressure. Real answers about your website. We review your site live and share specific fixes.',
  alternates: { canonical: '/lp/call' },
  openGraph: {
    title: 'Book a Strategy Call — Stray Web Design',
    description:
      '15 minutes. Zero pressure. Real answers about your website.',
    url: 'https://straywebdesign.co/lp/call',
    type: 'website',
  },
};

export default function CallLandingPage() {
  return <CallLandingForm />;
}

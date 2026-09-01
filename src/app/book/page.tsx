import type { Metadata } from 'next';
import LandingPageHeader from '@/components/layout/LandingPageHeader';
import Footer from '@/components/layout/Footer';
import BookingForm from '@/components/sections/BookingForm';

export const metadata: Metadata = {
  title: "Let's Talk — Stray Web Design",
  description:
    "Tell us about your business. We'll come back with a plan for exactly what the site should do — back in 24 hours. No pitch, no pressure.",
  alternates: { canonical: '/book' },
  openGraph: {
    title: "Let's Talk — Stray Web Design",
    description:
      "Tell us about your business. We'll come back with a plan for exactly what the site should do — back in 24 hours.",
    url: 'https://straywebdesign.co/book',
    type: 'website',
  },
};

export default function BookPage() {
  return (
    <>
      <LandingPageHeader />
      <main id="main">
        <BookingForm />
      </main>
      <Footer />
    </>
  );
}

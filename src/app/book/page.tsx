import type { Metadata } from 'next';
import LandingPageHeader from '@/components/layout/LandingPageHeader';
import Footer from '@/components/layout/Footer';
import BookingForm from '@/components/sections/BookingForm';

export const metadata: Metadata = {
  title: "Let's Talk — Stray Web Design",
  /* Was "I'll come back with a plan ... back in 24 hours", which is the offer
     Tom retired months ago. This page books a thirty-minute call and nothing
     else, so that is what it says. 150 characters, differentiator first. */
  description:
    'Pick a time and tell me about the place. Thirty minutes on what the site needs to do, what it costs, and how fast you can be live. 814-964-0081.',
  alternates: { canonical: '/book' },
  openGraph: {
    title: "Let's Talk — Stray Web Design",
    description:
      'Pick a time and tell me about the place. Thirty minutes on what the site needs to do, what it costs, and how fast you can be live.',
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

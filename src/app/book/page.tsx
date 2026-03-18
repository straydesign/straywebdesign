import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BookingForm from '@/components/sections/BookingForm';

export const metadata: Metadata = {
  title: 'Book a Call — Stray Web Design',
  description:
    'Schedule a free 15-minute discovery call. We\'ll audit your site, discuss your goals, and show you how to compete with enterprise brands.',
  alternates: { canonical: '/book' },
  openGraph: {
    title: 'Book a Call — Stray Web Design',
    description:
      'Schedule a free discovery call. We\'ll audit your site and show you how to compete with the big guys.',
    url: 'https://straywebdesign.co/book',
    type: 'website',
  },
};

export default function BookPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <BookingForm />
      </main>
      <Footer />
    </>
  );
}

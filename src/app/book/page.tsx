import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BookingForm from '@/components/sections/BookingForm';

export const metadata: Metadata = {
  title: "Let's Talk — Stray Web Design",
  description:
    'Tell us about your business. We\'ll reach out with a free site audit and honest assessment of where you stand.',
  alternates: { canonical: '/book' },
  openGraph: {
    title: "Let's Talk — Stray Web Design",
    description:
      'Tell us about your business. Free site audit and honest assessment — no pressure.',
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

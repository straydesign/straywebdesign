import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AuditTool from '@/components/sections/AuditTool';
import GrainOverlay from '@/components/ui/GrainOverlay';

export const metadata: Metadata = {
  title: 'Free Website Audit — Stray Web Design',
  description:
    'Get an instant Lighthouse analysis of your website. See your performance, accessibility, SEO, and best practices scores — free.',
  alternates: { canonical: '/audit' },
};

export default function AuditPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <div className="pt-20">
          <AuditTool />
        </div>
        <GrainOverlay />
      </main>
      <Footer />
    </>
  );
}

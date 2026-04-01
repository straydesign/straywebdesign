import type { Metadata } from 'next';
import LandingPageHeader from '@/components/layout/LandingPageHeader';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function LandingPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LandingPageHeader />
      <main id="main" className="min-h-[100dvh]">
        {children}
      </main>
    </>
  );
}

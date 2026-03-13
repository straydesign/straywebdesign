import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resources — Stray Web Design',
  description:
    'Blogs, white papers, and case studies on web performance, AI readiness, and competing with enterprise brands.',
  alternates: { canonical: '/resources' },
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

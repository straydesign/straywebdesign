import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Writing — Stray Web Design',
  description:
    'Blog posts on web performance, what good design actually costs, and building sites that convert.',
  alternates: { canonical: '/resources' },
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Lab — Stray Web Design',
  description: 'Effect playground — procedural 3D, particles, and scene-morph heroes.',
  robots: { index: false, follow: false },
};

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-black text-white">
      <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-white/10 bg-black/60 px-5 py-3 backdrop-blur-md md:px-8">
        <Link
          href="/lab"
          className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-white/80 transition-colors hover:text-white"
        >
          Stray Lab
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-white/60 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to site
        </Link>
      </header>
      <main className="pt-14">{children}</main>
    </div>
  );
}

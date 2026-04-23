'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

type Props = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export default function DemoShell({ title, subtitle, children }: Props) {
  return (
    <div className="relative h-[calc(100vh-3.5rem)] w-full overflow-hidden bg-black">
      {children}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black via-black/60 to-transparent px-5 pb-8 pt-24 md:px-10">
        <div className="pointer-events-auto mx-auto max-w-5xl">
          <Link
            href="/lab"
            className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-3 w-3" />
            All demos
          </Link>
          <h1 className="mt-2 font-mono text-2xl font-bold text-white md:text-4xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 max-w-xl font-mono text-sm text-white/60">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

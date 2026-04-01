'use client';

import Link from 'next/link';
import StrayLogo from '@/components/ui/StrayLogo';

export default function LandingPageHeader() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-border-default bg-surface-page/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center px-5 md:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 font-mono text-sm font-semibold tracking-wider text-text-primary transition-colors hover:text-accent"
          aria-label="Stray Web Design — Home"
        >
          <StrayLogo width={36} height={18} />
          <span className="hidden sm:inline">STRAY</span>
        </Link>
      </div>
    </header>
  );
}

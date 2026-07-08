'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { SITE } from '@/lib/constants';
import SoundToggle from '@/components/ui/SoundToggle';
import StrayLogo from '@/components/ui/StrayLogo';

const EXPLORE_LINKS = [
  { label: 'Work', href: '/#work' },
  { label: 'Services', href: '/#services' },
  { label: 'Writing', href: '/resources' },
  { label: 'About', href: '/#about' },
];

const CONNECT_LINKS = [
  { label: 'Start a project', href: '#contact' },
  { label: "Let's talk", href: '/book' },
  { label: SITE.phone, href: 'tel:+18144028525' },
  { label: SITE.email, href: `mailto:${SITE.email}` },
];

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  const resolve = (href: string) =>
    href.startsWith('#') && pathname !== '/' ? `/${href}` : href;

  return (
    <footer className="border-t border-border-default bg-surface-card">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="font-mono text-xl font-bold text-text-primary">
              stray<span className="text-accent">web</span>design
            </Link>
            <p className="mt-3 max-w-sm font-body text-sm leading-relaxed text-text-tertiary">
              I&apos;m Tom — a freelance web designer. I build websites that
              carry a business&apos;s energy to its customers, then host and
              manage them so they stay good. Work with me directly, start to
              finish.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-text-tertiary">
              <span aria-hidden className="text-accent/60">{'// '}</span>explore
            </h3>
            <ul className="space-y-2">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-text-secondary transition-colors hover:text-text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-text-tertiary">
              <span aria-hidden className="text-accent/60">{'// '}</span>connect
            </h3>
            <a
              href={resolve('#contact')}
              className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 font-body text-sm font-semibold text-white transition-colors hover:bg-accent/90"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              Start a project
            </a>
            <ul className="mt-4 space-y-2">
              {CONNECT_LINKS.slice(1).map((link) => (
                <li key={link.href}>
                  <Link
                    href={resolve(link.href)}
                    className="font-body text-sm text-text-secondary transition-colors hover:text-text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border-default pt-8 sm:flex-row">
          <div className="flex items-center gap-3">
            <StrayLogo color="#a1a1aa" width={32} height={16} />
            <p className="font-mono text-sm text-text-tertiary">
              &copy; {currentYear} {SITE.name}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="font-mono text-xs text-text-tertiary transition-colors hover:text-text-secondary">
              Privacy Policy
            </Link>
            <SoundToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}

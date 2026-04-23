'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { SITE } from '@/lib/constants';
import SoundToggle from '@/components/ui/SoundToggle';
import StrayLogo from '@/components/ui/StrayLogo';

const SERVICE_LINKS = [
  { label: 'Website Design', href: '/services/website-design' },
  { label: 'AI Receptionist', href: '/services/ai-receptionist' },
  { label: 'SEO Optimization', href: '/services/seo-optimization' },
  { label: 'Website Management', href: '/services/website-management' },
  { label: 'Landing Pages', href: '/services/landing-pages' },
  { label: 'Analytics Setup', href: '/services/analytics-setup' },
];

const INDUSTRY_LINKS = [
  { label: 'Dental Practices', href: '/industries/dental' },
  { label: 'Financial Advisors', href: '/industries/financial-advisors' },
  { label: 'Car Dealerships', href: '/industries/car-dealerships' },
  { label: 'IT Services', href: '/industries/it-services' },
  { label: 'Law Firms', href: '/industries/law-firms' },
  { label: 'Restaurants', href: '/industries/restaurants' },
  { label: 'HVAC', href: '/industries/hvac' },
  { label: 'View All', href: '/industries' },
];

const QUICK_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Resources', href: '/resources' },
  { label: "Let's Talk", href: '/book' },
];

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border-default bg-surface-card">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="font-mono text-xl font-bold text-text-primary">
              stray<span className="text-accent">web</span>design
            </Link>
            <p className="mt-3 max-w-sm font-mono text-sm leading-relaxed text-text-tertiary">
              Your business is serious. Your website should be too. We
              build sites you&apos;re proud to share — living, breathing
              extensions of your business that outperform your market.
            </p>
          </div>

          {/* Services + Industries — side by side on mobile */}
          <div className="grid grid-cols-2 gap-6 sm:contents">
            <div>
              <h3 className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">
                Services
              </h3>
              <ul className="space-y-2">
                {SERVICE_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-mono text-sm text-text-secondary transition-colors hover:text-text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">
                Industries
              </h3>
              <ul className="space-y-2">
                {INDUSTRY_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-mono text-sm text-text-secondary transition-colors hover:text-text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">
              Contact
            </h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>
                <a
                  href={pathname === '/' ? '#contact' : '/#contact'}
                  className="inline-flex items-center gap-2 bg-accent px-4 py-2 font-mono text-sm font-medium text-white transition-colors hover:bg-accent/90"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  Get a Plan
                </a>
              </li>
              <li className="pt-2">
                {QUICK_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href.startsWith('#') && pathname !== '/' ? `/${link.href}` : link.href}
                    className="mr-4 font-mono text-sm text-text-secondary transition-colors hover:text-text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
              </li>
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

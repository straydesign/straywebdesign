'use client';

import { usePathname } from 'next/navigation';
import { SITE } from '@/lib/constants';

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
  { label: 'Book a Call', href: '/book' },
];

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="/" className="font-display text-xl font-bold text-navy">
              stray<span className="text-electric">web</span>design
            </a>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-500">
              Your business is serious. Your website should be too. We
              build sites you&apos;re proud to share — living, breathing
              extensions of your business that outperform your competitors.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-3 font-display text-sm font-semibold text-navy">
              Services
            </h3>
            <ul className="space-y-2">
              {SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-500 transition-colors hover:text-navy"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className="mb-3 font-display text-sm font-semibold text-navy">
              Industries
            </h3>
            <ul className="space-y-2">
              {INDUSTRY_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-500 transition-colors hover:text-navy"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-3 font-display text-sm font-semibold text-navy">
              Contact
            </h3>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-electric/10 px-4 py-2 font-medium text-electric transition-colors hover:bg-electric/20"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phone}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-navy"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  {SITE.phone}
                </a>
                <span className="ml-6 text-xs text-slate-500">(text or voicemail)</span>
              </li>
              <li className="pt-2">
                {QUICK_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href.startsWith('#') && pathname !== '/' ? `/${link.href}` : link.href}
                    className="mr-4 text-sm text-slate-500 transition-colors hover:text-navy"
                  >
                    {link.label}
                  </a>
                ))}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row">
          <p className="text-sm text-slate-500">
            &copy; {currentYear} {SITE.name}. All rights reserved.
          </p>
          <p className="text-sm text-slate-500">
            Built with performance, accessibility, and AI in mind.
          </p>
        </div>
      </div>
    </footer>
  );
}

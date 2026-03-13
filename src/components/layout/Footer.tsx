'use client';

import { usePathname } from 'next/navigation';
import { SITE, NAV_LINKS } from '@/lib/constants';

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <a href="#" className="font-display text-xl font-bold text-navy">
              stray<span className="text-electric">web</span>design
            </a>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              Your business is serious. Your website should be too. We
              build sites you&apos;re proud to share — living, breathing
              extensions of your business that outperform your competitors.
              $100/month covers hosting, support, SEO monitoring, content
              updates, and ad-ready infrastructure.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-3 font-display text-sm font-semibold text-navy">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => {
                const href = link.href.startsWith('#') && pathname !== '/'
                  ? `/${link.href}`
                  : link.href;
                return (
                  <li key={link.href}>
                    <a
                      href={href}
                      className="text-sm text-slate-500 transition-colors hover:text-navy"
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
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
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phone}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-navy"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  {SITE.phone} <span className="text-xs text-slate-400">(text or voicemail)</span>
                </a>
              </li>
              <li>
                <a
                  href={SITE.url}
                  className="transition-colors hover:text-navy"
                >
                  {SITE.url.replace('https://', '')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row">
          <p className="text-sm text-slate-400">
            &copy; {currentYear} {SITE.name}. All rights reserved.
          </p>
          <p className="text-sm text-slate-400">
            Built with performance, accessibility, and AI in mind.
          </p>
        </div>
      </div>
    </footer>
  );
}

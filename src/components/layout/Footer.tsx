'use client';

import { SITE, NAV_LINKS } from '@/lib/constants';

export default function Footer() {
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
              Premium web design for small businesses. Fast, accessible, and
              AI-ready websites that outperform WordPress.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-3 font-display text-sm font-semibold text-navy">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
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
                  className="transition-colors hover:text-navy"
                >
                  {SITE.email}
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

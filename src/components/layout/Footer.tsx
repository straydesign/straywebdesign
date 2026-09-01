import Link from 'next/link';
import { SITE } from '@/lib/constants';
import StrayLogo from '@/components/ui/StrayLogo';

/**
 * The footer of a landing page has one job: not be a set of exits.
 *
 * The old one had an "Explore" column pointing at Work, Photography, Writing
 * and Services. All four of those routes now 301 to `/`, so every one of them
 * was a link that took somebody off the page and dropped them back at the top
 * of it. What is left is the two ways to reach Tom, and the privacy policy,
 * which has to be here.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-default bg-surface-card">
      <div className="mx-auto max-w-4xl px-5 py-12 md:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <Link
              href="/"
              className="font-mono text-lg font-bold text-text-primary"
            >
              stray<span className="text-accent">web</span>design
            </Link>
            <p className="mt-3 font-body text-sm leading-relaxed text-text-tertiary">
              I&apos;m Tom, a web designer in Erie. I put what a business sells
              online, one page per item, then host it and keep it current.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <a
              href={`tel:${SITE.phone.replace(/\D/g, '')}`}
              className="font-display text-lg font-bold text-text-primary transition-colors hover:text-accent"
            >
              {SITE.phone}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="font-body text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              {SITE.email}
            </a>
            <Link
              href="/book"
              className="font-body text-sm text-text-secondary underline underline-offset-4 transition-colors hover:text-text-primary"
            >
              Pick a time
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border-default pt-8 sm:flex-row">
          <div className="flex items-center gap-3">
            <StrayLogo color="#a1a1aa" width={32} height={16} />
            <p className="font-mono text-sm text-text-tertiary">
              &copy; {year} {SITE.name}
            </p>
          </div>
          <Link
            href="/privacy"
            className="font-mono text-xs text-text-tertiary transition-colors hover:text-text-secondary"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}

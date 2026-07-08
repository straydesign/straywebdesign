'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, SITE } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useClientEnv } from '@/lib/use-client-env';
import StrayLogo from '@/components/ui/StrayLogo';

/* ─── Helpers ─────────────────────────────────────────────── */

function resolveHref(href: string, pathname: string): string {
  if (href.startsWith('#') && pathname !== '/') {
    return `/${href}`;
  }
  return href;
}

/* ─── Scroll Progress ─── */

function DesktopScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      className="fixed top-0 right-0 left-0 z-[60] h-[3px] origin-left bg-accent"
      style={{ scaleX }}
      role="progressbar"
      aria-label="Page scroll progress"
      aria-hidden="true"
    />
  );
}

function MobileScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 right-0 left-0 z-[60] h-[3px] origin-left bg-accent"
      style={{ transform: `scaleX(${progress})` }}
      role="progressbar"
      aria-label="Page scroll progress"
      aria-hidden="true"
    />
  );
}

/* ─── Navbar ──────────────────────────────────────────────── */

const navLinkClass =
  'font-mono text-sm font-medium text-text-secondary transition-colors duration-300 hover:text-text-primary';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { mobile } = useClientEnv();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const mobileLinks = (
    <div className="flex flex-col gap-3">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={resolveHref(link.href, pathname)}
          className="font-mono text-base font-medium text-text-secondary transition-colors hover:text-text-primary"
          onClick={() => setIsOpen(false)}
        >
          {link.label}
        </Link>
      ))}
      <Link
        href={resolveHref('#contact', pathname)}
        className="mt-2 rounded-md bg-accent px-5 py-3 text-center font-body text-sm font-semibold text-white"
        onClick={() => setIsOpen(false)}
      >
        Start a project
      </Link>
    </div>
  );

  return (
    <>
      {mobile ? <MobileScrollProgress /> : <DesktopScrollProgress />}

      <nav
        className={cn(
          'fixed top-[3px] right-0 left-0 z-50 transition-all duration-300 bg-transparent',
          scrolled && 'bg-surface-page/90 backdrop-blur-sm border-b border-border-default'
        )}
        aria-label="Main navigation"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-mono text-xl font-bold text-text-primary transition-colors duration-300"
            aria-label={SITE.name}
          >
            <StrayLogo width={36} height={18} color="#2563EB" />
            <span>
              stray<span className="text-accent">web</span>design
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={resolveHref(link.href, pathname)}
                className={navLinkClass}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={resolveHref('#contact', pathname)}
              className="rounded-md bg-accent px-5 py-2.5 font-body text-sm font-semibold text-white transition-colors hover:bg-accent/90"
            >
              Start a project
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="relative z-50 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <X className="h-6 w-6 text-text-primary transition-colors duration-300" />
            ) : (
              <Menu className="h-6 w-6 text-text-primary transition-colors duration-300" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobile ? (
          <div
            className={cn(
              'absolute inset-x-0 top-full max-h-[80vh] overflow-y-auto bg-surface-card border-b border-border-default px-5 md:hidden transition-all duration-200',
              isOpen
                ? 'py-6 opacity-100 translate-y-0'
                : 'py-0 opacity-0 -translate-y-4 pointer-events-none h-0 overflow-hidden'
            )}
          >
            {mobileLinks}
          </div>
        ) : (
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-x-0 top-full max-h-[80vh] overflow-y-auto bg-surface-card border-b border-border-default px-5 py-6 md:hidden"
              >
                {mobileLinks}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </nav>
    </>
  );
}

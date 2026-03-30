'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
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

/* ─── Scroll Progress (desktop only) ─── */

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

/* ─── Desktop Dropdown ────────────────────────────────────── */

type NavLink = (typeof NAV_LINKS)[number];

function DesktopDropdown({
  link,
  pathname,
}: {
  link: NavLink;
  pathname: string;
  ghost?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const linkClass = 'font-mono text-sm font-medium text-text-secondary transition-colors duration-300 hover:text-text-primary';

  if (!('children' in link) || !link.children) {
    return (
      <Link href={resolveHref(link.href, pathname)} className={linkClass}>
        {link.label}
      </Link>
    );
  }

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpen(false);
      dropdownRef.current?.querySelector('button')?.focus();
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onKeyDown={handleKeyDown}
    >
      <button
        className={cn('flex items-center gap-1', linkClass)}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen((prev) => !prev);
          }
        }}
      >
        {link.label}
        <ChevronDown
          className={cn('h-3.5 w-3.5 transition-transform', open && 'rotate-180')}
          aria-hidden="true"
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            role="menu"
            className="absolute top-full left-0 z-50 mt-2 w-56 border border-border-default bg-surface-card py-2"
          >
            {link.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                role="menuitem"
                className="block px-4 py-2 font-mono text-sm text-text-secondary transition-colors hover:bg-surface-sunken hover:text-text-primary"
              >
                {child.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Navbar ──────────────────────────────────────────────── */

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const { mobile } = useClientEnv();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Scroll Progress Bar */}
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
            <StrayLogo
              width={36}
              height={18}
              color="#2563EB"
            />
            <span>
              stray<span className="text-accent">web</span>design
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((link) => (
              <DesktopDropdown
                key={link.href}
                link={link}
                pathname={pathname}
              />
            ))}
            <Link
              href={resolveHref('#contact', pathname)}
              className="bg-accent px-5 py-2.5 font-mono text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-accent/90"
            >
              Free Audit
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

        {/* Mobile Menu — CSS transitions on mobile, framer-motion on desktop */}
        {mobile ? (
          <div
            className={cn(
              'absolute inset-x-0 top-full max-h-[80vh] overflow-y-auto bg-surface-card border-b border-border-default px-5 md:hidden transition-all duration-200',
              isOpen ? 'py-6 opacity-100 translate-y-0' : 'py-0 opacity-0 -translate-y-4 pointer-events-none h-0 overflow-hidden'
            )}
          >
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => {
                const hasChildren = 'children' in link && link.children;
                const isExpanded = expandedMobile === link.label;

                return (
                  <div key={link.href}>
                    {hasChildren ? (
                      <>
                        <button
                          className="flex w-full items-center justify-between font-mono text-base font-medium text-text-secondary transition-colors hover:text-text-primary"
                          onClick={() =>
                            setExpandedMobile(isExpanded ? null : link.label)
                          }
                          aria-expanded={isExpanded}
                        >
                          {link.label}
                          <ChevronDown
                            className={cn(
                              'h-4 w-4 css-chevron-rotate',
                              isExpanded && 'open'
                            )}
                            aria-hidden="true"
                          />
                        </button>
                        <div className={cn('css-accordion-panel', isExpanded && 'open')}>
                          <div>
                            <div className="mt-2 flex flex-col gap-2 pl-4">
                              {link.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className="font-mono text-sm text-text-tertiary transition-colors hover:text-text-primary"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <Link
                        href={resolveHref(link.href, pathname)}
                        className="font-mono text-base font-medium text-text-secondary transition-colors hover:text-text-primary"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                );
              })}
              <Link
                href={resolveHref('#contact', pathname)}
                className="mt-2 bg-accent px-5 py-3 text-center font-mono text-sm font-medium uppercase tracking-wider text-white"
                onClick={() => setIsOpen(false)}
              >
                Get Free Audit
              </Link>
            </div>
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
                <div className="flex flex-col gap-3">
                  {NAV_LINKS.map((link) => {
                    const hasChildren = 'children' in link && link.children;
                    const isExpanded = expandedMobile === link.label;

                    return (
                      <div key={link.href}>
                        {hasChildren ? (
                          <>
                            <button
                              className="flex w-full items-center justify-between font-mono text-base font-medium text-text-secondary transition-colors hover:text-text-primary"
                              onClick={() =>
                                setExpandedMobile(isExpanded ? null : link.label)
                              }
                              aria-expanded={isExpanded}
                            >
                              {link.label}
                              <ChevronDown
                                className={cn(
                                  'h-4 w-4 transition-transform',
                                  isExpanded && 'rotate-180'
                                )}
                                aria-hidden="true"
                              />
                            </button>
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="mt-2 flex flex-col gap-2 pl-4">
                                    {link.children.map((child) => (
                                      <Link
                                        key={child.href}
                                        href={child.href}
                                        className="font-mono text-sm text-text-tertiary transition-colors hover:text-text-primary"
                                        onClick={() => setIsOpen(false)}
                                      >
                                        {child.label}
                                      </Link>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        ) : (
                          <Link
                            href={resolveHref(link.href, pathname)}
                            className="font-mono text-base font-medium text-text-secondary transition-colors hover:text-text-primary"
                            onClick={() => setIsOpen(false)}
                          >
                            {link.label}
                          </Link>
                        )}
                      </div>
                    );
                  })}
                  <Link
                    href={resolveHref('#contact', pathname)}
                    className="mt-2 bg-accent px-5 py-3 text-center font-mono text-sm font-medium uppercase tracking-wider text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Free Audit
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </nav>
    </>
  );
}

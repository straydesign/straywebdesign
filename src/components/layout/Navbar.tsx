'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { NAV_LINKS, SITE } from '@/lib/constants';
import { cn } from '@/lib/utils';
import StrayLogo from '@/components/ui/StrayLogo';

/* ─── Helpers ─────────────────────────────────────────────── */

function resolveHref(href: string, pathname: string): string {
  if (href.startsWith('#') && pathname !== '/') {
    return `/${href}`;
  }
  return href;
}

/**
 * Auto-detect whether the navbar is currently over a dark section.
 * Uses IntersectionObserver scoped to the top ~70px of the viewport
 * and queries for elements with dark Tailwind bg classes.
 * Re-runs whenever the route changes so new pages are picked up.
 */
function useOverDark(pathname: string) {
  const [overDark, setOverDark] = useState(true);
  const activeDarkRef = useRef(new Set<Element>());

  useEffect(() => {
    const activeDark = activeDarkRef.current;
    activeDark.clear();

    // Auto-find dark sections by Tailwind bg classes or explicit data attr
    const darkSections = document.querySelectorAll(
      '[data-navbar-dark], .bg-navy, .bg-slate-900, .bg-slate-950, .bg-gray-900'
    );

    // Filter out elements inside the nav itself
    const targets = Array.from(darkSections).filter(
      (el) => !el.closest('nav')
    );

    if (targets.length === 0) {
      setOverDark(false);
      return;
    }

    // Observe only the top strip of the viewport where the navbar sits
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            activeDark.add(entry.target);
          } else {
            activeDark.delete(entry.target);
          }
        }
        setOverDark(activeDark.size > 0);
      },
      { rootMargin: '0px 0px -93% 0px' }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return overDark;
}

/* ─── Desktop Dropdown ────────────────────────────────────── */

type NavLink = (typeof NAV_LINKS)[number];

function DesktopDropdown({
  link,
  pathname,
  ghost,
}: {
  link: NavLink;
  pathname: string;
  ghost: boolean;
}) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const linkClass = cn(
    'text-sm font-medium transition-colors duration-300',
    ghost ? 'text-white/80 hover:text-white' : 'text-slate-600 hover:text-navy'
  );

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
            className="absolute top-full left-0 z-50 mt-2 w-56 rounded-xl border border-slate-200/60 bg-white py-2 shadow-xl"
          >
            {link.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                role="menuitem"
                className="block px-4 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50 hover:text-navy"
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
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const overDark = useOverDark(pathname);

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
      <motion.div
        className="fixed top-0 right-0 left-0 z-[60] h-[3px] origin-left bg-electric"
        style={{ scaleX }}
        role="progressbar"
        aria-label="Page scroll progress"
        aria-hidden="true"
      />

      <nav
        className={cn(
          'fixed top-[3px] right-0 left-0 z-50 transition-all duration-300 bg-transparent',
          scrolled && !overDark && 'backdrop-blur-sm'
        )}
        aria-label="Main navigation"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              'flex items-center gap-2 font-display text-xl font-bold transition-colors duration-300',
              overDark ? 'text-white' : 'text-navy'
            )}
            aria-label={SITE.name}
          >
            <StrayLogo
              width={36}
              height={18}
              color={overDark ? '#ffffff' : '#3B82F6'}
            />
            <span
              style={{
                WebkitTextStroke: '0.5px white',
                paintOrder: 'stroke fill',
              }}
            >
              stray<span className="text-electric">web</span>design
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((link) => (
              <DesktopDropdown
                key={link.href}
                link={link}
                pathname={pathname}
                ghost={overDark}
              />
            ))}
            <Link
              href={resolveHref('#contact', pathname)}
              className="rounded-lg bg-electric px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-electric/90"
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
              <X
                className={cn(
                  'h-6 w-6 transition-colors duration-300',
                  overDark ? 'text-white' : 'text-navy'
                )}
              />
            ) : (
              <Menu
                className={cn(
                  'h-6 w-6 transition-colors duration-300',
                  overDark ? 'text-white' : 'text-navy'
                )}
              />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-x-0 top-full max-h-[80vh] overflow-y-auto bg-white/95 px-5 py-6 shadow-xl backdrop-blur-xl md:hidden"
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
                            className="flex w-full items-center justify-between text-base font-medium text-slate-600 transition-colors hover:text-navy"
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
                                      className="text-sm text-slate-500 transition-colors hover:text-navy"
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
                          className="text-base font-medium text-slate-600 transition-colors hover:text-navy"
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
                  className="mt-2 rounded-lg bg-electric px-5 py-3 text-center text-sm font-semibold text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Get Free Audit
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}

'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { NAV_LINKS, SITE } from '@/lib/constants';
import { cn } from '@/lib/utils';
import StrayLogo from '@/components/ui/StrayLogo';

function resolveHref(href: string, pathname: string): string {
  if (href.startsWith('#') && pathname !== '/') {
    return `/${href}`;
  }
  return href;
}

type NavLink = (typeof NAV_LINKS)[number];

function DesktopDropdown({ link, pathname }: { link: NavLink; pathname: string }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  if (!('children' in link) || !link.children) {
    return (
      <a
        href={resolveHref(link.href, pathname)}
        className="text-sm font-medium text-slate-600 transition-colors hover:text-navy"
      >
        {link.label}
      </a>
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
        className="flex items-center gap-1 text-sm font-medium text-slate-600 transition-colors hover:text-navy"
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
        <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', open && 'rotate-180')} aria-hidden="true" />
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
              <a
                key={child.href}
                href={child.href}
                role="menuitem"
                className="block px-4 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50 hover:text-navy"
              >
                {child.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

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
    return () => { document.body.style.overflow = ''; };
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
          'fixed top-[3px] right-0 left-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/90 shadow-sm backdrop-blur-xl'
            : 'bg-transparent'
        )}
        aria-label="Main navigation"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <a
            href="/"
            className="flex items-center gap-2 font-display text-xl font-bold text-navy"
            aria-label={SITE.name}
          >
            <StrayLogo width={36} height={18} />
            <span>stray<span className="text-electric">web</span>design</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((link) => (
              <DesktopDropdown key={link.href} link={link} pathname={pathname} />
            ))}
            <a
              href={resolveHref('#contact', pathname)}
              className="rounded-lg bg-electric px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-electric/90"
            >
              Free Audit
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="relative z-50 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <X className="h-6 w-6 text-navy" />
            ) : (
              <Menu className="h-6 w-6 text-navy" />
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
                            onClick={() => setExpandedMobile(isExpanded ? null : link.label)}
                            aria-expanded={isExpanded}
                          >
                            {link.label}
                            <ChevronDown className={cn('h-4 w-4 transition-transform', isExpanded && 'rotate-180')} aria-hidden="true" />
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
                                    <a
                                      key={child.href}
                                      href={child.href}
                                      className="text-sm text-slate-500 transition-colors hover:text-navy"
                                      onClick={() => setIsOpen(false)}
                                    >
                                      {child.label}
                                    </a>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <a
                          href={resolveHref(link.href, pathname)}
                          className="text-base font-medium text-slate-600 transition-colors hover:text-navy"
                          onClick={() => setIsOpen(false)}
                        >
                          {link.label}
                        </a>
                      )}
                    </div>
                  );
                })}
                <a
                  href={resolveHref('#contact', pathname)}
                  className="mt-2 rounded-lg bg-electric px-5 py-3 text-center text-sm font-semibold text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Get Free Audit
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}

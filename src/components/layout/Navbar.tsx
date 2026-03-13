'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, SITE } from '@/lib/constants';
import { cn } from '@/lib/utils';
import StrayLogo from '@/components/ui/StrayLogo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 transition-colors hover:text-navy"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
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
              className="absolute inset-x-0 top-full bg-white/95 px-5 py-6 shadow-xl backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col gap-4">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-base font-medium text-slate-600 transition-colors hover:text-navy"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#contact"
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

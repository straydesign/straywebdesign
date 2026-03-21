/**
 * Mobile detection utilities for performance optimization.
 * On mobile, we replace framer-motion with CSS animations + IntersectionObserver
 * to eliminate ~130KB of JS from the critical path.
 */

// Module-level cache — computed once per session
let _isMobile: boolean | null = null;

/**
 * Returns true on mobile/touch devices (< 768px).
 * SSR-safe: returns false during server render, computed once on client.
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  if (_isMobile === null) {
    _isMobile = window.innerWidth < 768;
  }
  return _isMobile;
}

/**
 * Returns true if user prefers reduced motion.
 * SSR-safe: returns false during server render.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

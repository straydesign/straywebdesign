'use client';

import { useEffect } from 'react';

/**
 * Arrow / WASD movement through everything clickable on the page.
 *
 *   ↓ S → D   next item
 *   ↑ W ← A   previous item
 *   Home/End  first / last item
 *   Enter     activates (native for a link or button)
 *
 * ONE FLAT RUN, NOT TWO LEVELS
 *   This replaced a section→card model where you pressed Enter to go into a
 *   band and Escape to come back out. On pages this size that was ceremony for
 *   its own sake, and it meant the nav had a mode you could be in without
 *   knowing it. Now every clickable thing is one stop in document order.
 *
 * IT ADDS NOTHING TO THE ACCESSIBILITY TREE — THIS IS THE POINT
 *   The earlier version put tabindex="0" on section containers, which invented
 *   tab stops that were not controls, and stamped role="region" on every band,
 *   which buried the real landmarks in a screen reader's rotor. A screen reader
 *   user already navigates better than anything we can invent — H for headings,
 *   D for landmarks, a link list — so competing with that is a regression
 *   dressed up as a feature. What is left:
 *     · no injected elements, no entry button, no live region
 *     · no role, aria-label, or aria-describedby written anywhere
 *     · tabindex="-1" only on a wrapper that is not already focusable, which
 *       makes it focusable to us and leaves the Tab order untouched
 *   Turn this component off and the accessibility tree is identical. Tab still
 *   walks the page exactly as it did. The keys are a shortcut on top, so there
 *   is nothing to discover and nothing to get trapped in.
 *
 * WCAG 2.1.4 CHARACTER KEY SHORTCUTS (LEVEL A)
 *   W/A/S/D are plain letters, and a plain-letter shortcut has to be switchable
 *   off, remappable, or active only while a component has focus. These only
 *   fire while one of our items already holds focus, which is the third option,
 *   so no toggle and no visible chrome are needed. Typing "was" into a search
 *   box never moves the page.
 *
 * FOCUS RING
 *   Brand colour, with a contrast halo added ONLY when the brand colour cannot
 *   clear 3:1 against whatever is actually behind the element (WCAG 2.2 SC
 *   2.4.13), measured from computed styles at focus time. An earlier version
 *   hardcoded a white inner line behind a prefers-color-scheme query, which
 *   never matched on a site that is dark by design and painted a white haze
 *   over everything. Do not reintroduce that.
 */

const TEXT_ENTRY = new Set(['INPUT', 'TEXTAREA', 'SELECT']);
const INTERACTIVE = 'a[href], button:not([disabled])';

/**
 * Where the run happens. Landmarks are included by name because the top bar
 * carries the cross-links between the sister sites and the footer carries the
 * contact block; on these sites the bar is <nav aria-label="Main navigation">,
 * not <header>, so a tag guess would have missed it.
 */
const SCOPE = 'header, nav, main, footer';

type Options = { root?: string };

/* ── colour helpers ───────────────────────────────────────────────────────── */

function parseRgb(v: string): [number, number, number, number] | null {
  const m = v.match(/[\d.]+/g);
  if (!m || m.length < 3) return null;
  return [+m[0], +m[1], +m[2], m.length > 3 ? +m[3] : 1];
}

function luminance(r: number, g: number, b: number) {
  const f = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function contrast(a: number, b: number) {
  const [hi, lo] = a > b ? [a, b] : [b, a];
  return (hi + 0.05) / (lo + 0.05);
}

/** The nearest actually-painted background behind an element. */
function backdropLuminance(el: HTMLElement): number {
  let node: HTMLElement | null = el;
  while (node) {
    const c = parseRgb(getComputedStyle(node).backgroundColor);
    if (c && c[3] > 0.5) return luminance(c[0], c[1], c[2]);
    node = node.parentElement;
  }
  return 1;
}

export default function SectionKeyboardNav({ root = SCOPE }: Options = {}) {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scroll: ScrollBehavior = reduced ? 'auto' : 'smooth';

    let items: HTMLElement[] = [];

    /** Rendered at all — covers a position:fixed bar, which has no offsetParent. */
    const visible = (el: HTMLElement) => el.getClientRects().length > 0;

    /**
     * One stop per clickable thing, but ringed at the card rather than at the
     * bare text link.
     *
     * Climbs outward from each control while the ancestor still contains that
     * one control, so a whole-card link lands on the card. Anything holding two
     * or more controls stays put, so a card with a title link and a CTA does
     * not swallow its neighbours. Candidates containing other candidates are
     * dropped, leaving the leaves, in document order.
     */
    function collect() {
      const roots = Array.from(document.querySelectorAll<HTMLElement>(root));
      const controls = new Set<HTMLElement>();
      for (const r of roots) {
        for (const c of Array.from(r.querySelectorAll<HTMLElement>(INTERACTIVE))) {
          if (visible(c)) controls.add(c);
        }
      }

      const out = new Set<HTMLElement>();
      for (const control of controls) {
        let best: HTMLElement = control;
        let p = control.parentElement;
        while (p && !p.matches(root) && p !== document.body) {
          if (p.querySelectorAll(INTERACTIVE).length !== 1) break;
          best = p;
          p = p.parentElement;
        }
        out.add(best);
      }

      const list = Array.from(out);
      items = list
        .filter((a) => !list.some((b) => b !== a && a.contains(b)))
        .sort((a, b) =>
          a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
        );

      items.forEach((el) => {
        el.dataset.kbdnavItem = 'true';
        // Only a wrapper we promoted needs this, and -1 keeps it out of the Tab
        // order so the native tab sequence is byte-identical to before.
        if (!el.matches(INTERACTIVE) && !el.hasAttribute('tabindex')) {
          el.setAttribute('tabindex', '-1');
        }
      });
    }

    let queued = 0;
    const observer = new MutationObserver(() => {
      if (queued) return;
      queued = requestAnimationFrame(() => {
        queued = 0;
        collect();
      });
    });

    /**
     * NOTHING IS WRITTEN TO THE DOM UNTIL THE FIRST KEYPRESS.
     *
     * Collecting on mount looked safe and was not. This component lives in the
     * layout, so its effect commits as soon as the layout hydrates — which is
     * before a streamed page subtree below it has been claimed. collect() then
     * stamped data-kbdnav-item and tabindex="-1" onto server HTML React had not
     * hydrated yet, and React reported them as attributes the client added:
     * "A tree hydrated but some attributes ... didn't match", on both sites.
     * React does not patch those up; it can throw the boundary away and client
     * render it, which drops our attributes and detaches every element in
     * `items`.
     *
     * There is no public "hydration finished" signal to wait on, and picking a
     * timer would be the same guess that broke the analytics loader when
     * lazyOnload waited for a load event that had already fired. A human
     * keypress is the real signal — it cannot arrive before hydration in any
     * timeline that matters, and it is exactly when the attributes first do any
     * work. Load-time cost is now zero: no walk, no observer, no attributes.
     *
     * Capture phase, so arming happens before onKeyDown reads `items` — Tab
     * fires keydown before the browser moves focus, so the ring is in place for
     * the very first Tab.
     */
    let armed = false;
    function arm() {
      if (armed) return;
      armed = true;
      collect();
      observer.observe(document.body, { childList: true, subtree: true });
    }

    /* ── ring ───────────────────────────────────────────────────────────── */

    let lit: HTMLElement | null = null;

    function light(el: HTMLElement) {
      if (lit && lit !== el) {
        delete lit.dataset.kbdnavOn;
        lit.style.removeProperty('--kbdnav-halo');
        lit.style.removeProperty('--kbdnav-halo-w');
      }
      lit = el;

      const ring = getComputedStyle(el).getPropertyValue('--kbdnav-ring').trim();
      const rgb = parseRgb(ring);
      if (rgb) {
        const bgLum = backdropLuminance(el);
        // Only add a halo when the brand colour cannot carry the indicator on
        // its own. On a near-black site a bright brand colour already clears
        // 3:1 and a halo just reads as a smear.
        if (contrast(luminance(rgb[0], rgb[1], rgb[2]), bgLum) < 3) {
          el.style.setProperty(
            '--kbdnav-halo',
            bgLum > 0.5 ? 'rgb(0 0 0 / 0.75)' : 'rgb(255 255 255 / 0.75)',
          );
          el.style.setProperty('--kbdnav-halo-w', '2px');
        }
      }
      // Drives the ring for our own moves. Native Tab is handled by
      // :focus-visible in the stylesheet, so both routes look the same.
      el.dataset.kbdnavOn = 'true';
    }

    function go(el: HTMLElement) {
      light(el);
      el.focus({ preventScroll: true });
      el.scrollIntoView({ behavior: scroll, block: 'center' });
    }

    /**
     * Clear the ring only when focus genuinely leaves the run.
     *
     * go() lights the target before focusing it, so the focusout fired by that
     * focus() call arrives while `lit` is already the NEW element. Clearing
     * unconditionally here wiped the ring on the very move that drew it, and
     * the highlight never appeared. relatedTarget is where focus is heading.
     */
    function onFocusOut(e: FocusEvent) {
      if (!lit) return;
      const to = e.relatedTarget as HTMLElement | null;
      if (to && to.closest('[data-kbdnav-item]')) return;
      delete lit.dataset.kbdnavOn;
      lit.style.removeProperty('--kbdnav-halo');
      lit.style.removeProperty('--kbdnav-halo-w');
      lit = null;
    }

    /* ── keys ───────────────────────────────────────────────────────────── */

    const NEXT = new Set(['ArrowDown', 'ArrowRight', 's', 'S', 'd', 'D']);
    const PREV = new Set(['ArrowUp', 'ArrowLeft', 'w', 'W', 'a', 'A']);

    function onKeyDown(e: KeyboardEvent) {
      const active = document.activeElement as HTMLElement | null;
      if (!active) return;
      if (TEXT_ENTRY.has(active.tagName) || active.isContentEditable) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      // Scoped to our own items, which is what satisfies WCAG 2.1.4 for WASD
      // and keeps arrow keys scrolling the page everywhere else.
      const at = items.indexOf(active.closest<HTMLElement>('[data-kbdnav-item]')!);
      if (at === -1) return;

      const isStep = NEXT.has(e.key) || PREV.has(e.key);
      if (!isStep && e.key !== 'Home' && e.key !== 'End') return;

      e.preventDefault();
      const i =
        e.key === 'Home'
          ? 0
          : e.key === 'End'
            ? items.length - 1
            : Math.min(Math.max(at + (NEXT.has(e.key) ? 1 : -1), 0), items.length - 1);
      go(items[i]);
    }

    function clearRing() {
      if (!lit) return;
      delete lit.dataset.kbdnavOn;
      lit.style.removeProperty('--kbdnav-halo');
      lit.style.removeProperty('--kbdnav-halo-w');
      lit = null;
    }

    document.addEventListener('keydown', arm, true);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('focusout', onFocusOut);
    return () => {
      document.removeEventListener('keydown', arm, true);
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('focusout', onFocusOut);
      observer.disconnect();
      if (queued) cancelAnimationFrame(queued);
      clearRing();
      items.forEach((el) => {
        delete el.dataset.kbdnavItem;
        if (el.getAttribute('tabindex') === '-1') el.removeAttribute('tabindex');
      });
    };
  }, [root]);

  return null;
}

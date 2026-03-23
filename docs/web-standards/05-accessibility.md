# Accessibility Standards — WCAG 2.1 AA

Non-negotiable. Every tier, every site, every component.

## Reduced Motion

Every animation must respect `prefers-reduced-motion: reduce`.

```tsx
const prefersReducedMotion = useReducedMotion();
if (prefersReducedMotion) {
  // Render static content, no animation
  return <div>{children}</div>;
}
```

### What to disable
- All scroll-triggered animations (AnimateIn, CountUp, WordReveal)
- 3D scenes (show CSS gradient fallback)
- Parallax effects (show static image)
- Horizontal scroll (show grid layout)
- Page transitions (render children directly)
- Magnetic button pull (disable mouse tracking)
- Custom cursor (hide, use system cursor)

### What to keep
- Color changes (hover states)
- Opacity transitions (if subtle, < 200ms)
- Content visibility (show everything immediately)

## Keyboard Navigation

- All interactive elements must be focusable
- Visible focus indicators (outline, ring, or custom)
- Tab order follows visual layout
- Escape key closes modals, dropdowns, chat widget
- Enter/Space activates buttons
- Arrow keys navigate within dropdown menus
- Skip-to-main-content link on every page

## Screen Readers

- Semantic HTML (`<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`)
- `aria-label` on icon-only buttons
- `aria-expanded` on toggleable elements
- `aria-hidden="true"` on decorative elements (grain overlay, cursor, 3D scene)
- `role="progressbar"` on scroll progress bar
- Images: meaningful `alt` text or `role="img"` with `aria-label`
- Live regions for dynamic content (chat messages, audit results)

## Color Contrast

- Text on light backgrounds: minimum 4.5:1 ratio (AA)
- Large text (18px+ bold, 24px+ regular): minimum 3:1 ratio
- Interactive elements: minimum 3:1 against adjacent colors
- Never rely on color alone to convey information

## Touch Targets

- Minimum 44x44px for all interactive elements
- Adequate spacing between adjacent targets
- No hover-only interactions on mobile

## Forms

- Labels associated with inputs (`htmlFor`/`id` or wrapping `<label>`)
- Error messages linked via `aria-describedby`
- Required fields marked with `aria-required`
- Autocomplete attributes on common fields (name, email, phone)

## Testing Checklist

- [ ] Tab through entire page — every interactive element reachable
- [ ] Screen reader announces all content meaningfully
- [ ] `prefers-reduced-motion` — toggle and verify all animations stop
- [ ] Color contrast passes WCAG AA (use axe or Lighthouse)
- [ ] No content invisible to screen readers that's visible on screen
- [ ] No autoplaying media
- [ ] Chat widget accessible via keyboard
- [ ] Audit tool form submittable via keyboard

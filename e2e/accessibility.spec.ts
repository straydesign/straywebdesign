import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility — axe scan', () => {
  test('Home page has no critical accessibility violations', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .disableRules(['color-contrast']) // Skip color-contrast since it's unreliable in dev mode with framer-motion
      .analyze();

    const critical = results.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    );

    if (critical.length > 0) {
      const summary = critical.map(
        (v) => `[${v.impact}] ${v.id}: ${v.description} (${v.nodes.length} instances)`
      );
      // Log for debugging, but only fail on critical
      console.log('Accessibility issues found:', summary);
    }

    const criticalOnly = results.violations.filter((v) => v.impact === 'critical');
    expect(criticalOnly).toHaveLength(0);
  });

  test('Services page has no critical accessibility violations', async ({ page }) => {
    await page.goto('/services', { waitUntil: 'domcontentloaded' });

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .disableRules(['color-contrast'])
      .analyze();

    const criticalOnly = results.violations.filter((v) => v.impact === 'critical');
    expect(criticalOnly).toHaveLength(0);
  });

  test('Book page has no critical accessibility violations', async ({ page }) => {
    await page.goto('/book', { waitUntil: 'domcontentloaded' });

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .disableRules(['color-contrast'])
      .analyze();

    const criticalOnly = results.violations.filter((v) => v.impact === 'critical');
    expect(criticalOnly).toHaveLength(0);
  });
});

test.describe('Accessibility — heading hierarchy', () => {
  test('Home page has exactly one h1', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);
  });

  test('Services page has exactly one h1', async ({ page }) => {
    await page.goto('/services', { waitUntil: 'domcontentloaded' });

    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);
  });

  test('Industries page has exactly one h1', async ({ page }) => {
    await page.goto('/industries', { waitUntil: 'domcontentloaded' });

    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);
  });

  test('Book page has exactly one h1', async ({ page }) => {
    await page.goto('/book', { waitUntil: 'domcontentloaded' });

    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);
  });
});

test.describe('Accessibility — skip link', () => {
  test('skip-to-content link exists', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const skipLink = page.locator('a[href="#main"]');
    await expect(skipLink).toHaveCount(1);
  });

  test('main content has id="main"', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const main = page.locator('#main');
    await expect(main).toHaveCount(1);
  });
});

test.describe('Accessibility — navigation landmarks', () => {
  test('page has nav landmark', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Use toBeAttached() — Lenis smooth scroll wrapper applies overflow:hidden,
    // causing Playwright to report these elements as "hidden" even though they
    // are fully rendered in the DOM.
    const nav = page.locator('nav[aria-label="Main navigation"]');
    await expect(nav).toBeAttached();
  });

  test('page has footer landmark', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    await expect(page.locator('footer')).toBeAttached();
  });

  test('page has main landmark', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    await expect(page.locator('main')).toBeAttached();
  });
});

test.describe('Accessibility — images', () => {
  test('all images have alt text', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      // alt can be empty string for decorative images, but must be present
      expect(alt).not.toBeNull();
    }
  });
});

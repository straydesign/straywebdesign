import { test, expect } from '@playwright/test';

const PAGES = [
  { path: '/', name: 'Home' },
  { path: '/services', name: 'Services' },
  { path: '/industries', name: 'Industries' },
  { path: '/resources', name: 'Resources' },
  { path: '/book', name: 'Book a Call' },
  { path: '/locations', name: 'Locations' },
];

test.describe('Smoke tests — every page loads', () => {
  // Run smoke tests serially to avoid overwhelming the dev server
  // (Three.js/R3F pages are memory-intensive)
  test.describe.configure({ mode: 'serial' });

  for (const { path, name } of PAGES) {
    test(`${name} (${path}) returns 200 and renders`, async ({ page }) => {
      const response = await page.goto(path, { waitUntil: 'domcontentloaded' });

      expect(response?.status()).toBe(200);
      await expect(page.locator('body')).toBeAttached();
    });
  }

  test('Home page has correct title', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const title = await page.title();
    expect(title).toContain('Stray Web Design');
  });

  test('Home page renders hero section', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    await expect(page.locator('main#main')).toBeAttached();
  });

  test('Services page has heading', async ({ page }) => {
    await page.goto('/services', { waitUntil: 'domcontentloaded' });

    await expect(page.locator('h1')).toBeAttached();
    const heading = await page.locator('h1').textContent();
    expect(heading?.toLowerCase()).toContain('services');
  });

  test('Industries page has heading', async ({ page }) => {
    await page.goto('/industries', { waitUntil: 'domcontentloaded' });

    await expect(page.locator('h1')).toBeAttached();
  });

  test('Resources page has heading', async ({ page }) => {
    await page.goto('/resources', { waitUntil: 'domcontentloaded' });

    await expect(page.locator('h1')).toBeAttached();
  });

  test('Book page has booking form', async ({ page }) => {
    await page.goto('/book', { waitUntil: 'domcontentloaded' });

    await expect(page.locator('form')).toBeAttached();
  });
});

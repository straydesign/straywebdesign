import { test, expect } from '@playwright/test';

const PAGES_WITH_METADATA = [
  { path: '/', expectedTitlePart: 'Stray Web Design' },
  { path: '/services', expectedTitlePart: 'Services' },
  { path: '/industries', expectedTitlePart: 'Industries' },
  { path: '/resources', expectedTitlePart: 'Resources' },
  { path: '/book', expectedTitlePart: 'Book a Call' },
];

test.describe('SEO — meta tags', () => {
  for (const { path, expectedTitlePart } of PAGES_WITH_METADATA) {
    test(`${path} has a meta title containing "${expectedTitlePart}"`, async ({ page }) => {
      await page.goto(path, { waitUntil: 'domcontentloaded' });

      const title = await page.title();
      expect(title).toContain(expectedTitlePart);
    });

    test(`${path} has a meta description`, async ({ page }) => {
      await page.goto(path, { waitUntil: 'domcontentloaded' });

      const metaDescription = page.locator('meta[name="description"]');
      await expect(metaDescription).toHaveAttribute('content', /.{20,}/);
    });
  }
});

test.describe('SEO — Open Graph tags', () => {
  test('Home page has og:title', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /Stray Web Design/);
  });

  test('Home page has og:description', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const ogDescription = page.locator('meta[property="og:description"]');
    await expect(ogDescription).toHaveAttribute('content', /.{20,}/);
  });

  test('Home page has og:url', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const ogUrl = page.locator('meta[property="og:url"]');
    await expect(ogUrl).toHaveAttribute('content', /straywebdesign/);
  });

  test('Home page has og:type', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const ogType = page.locator('meta[property="og:type"]');
    await expect(ogType).toHaveAttribute('content', /website/);
  });

  test('Book page has og:title', async ({ page }) => {
    await page.goto('/book', { waitUntil: 'domcontentloaded' });

    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /Book a Call/);
  });
});

test.describe('SEO — Twitter card tags', () => {
  test('Home page has twitter:card', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const twitterCard = page.locator('meta[name="twitter:card"]');
    await expect(twitterCard).toHaveAttribute('content', /summary/);
  });
});

test.describe('SEO — robots.txt and sitemap.xml', () => {
  test('robots.txt is accessible', async ({ request }) => {
    const response = await request.get('/robots.txt');
    expect(response.status()).toBe(200);

    const text = await response.text();
    expect(text).toContain('User-agent');
    expect(text).toContain('Allow');
    expect(text).toContain('Sitemap');
  });

  test('sitemap.xml is accessible', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    expect(response.status()).toBe(200);

    const text = await response.text();
    expect(text).toContain('urlset');
    expect(text).toContain('straywebdesign.co');
  });
});

test.describe('SEO — structured data', () => {
  test('Home page has JSON-LD structured data', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const jsonLd = page.locator('script[type="application/ld+json"]');
    const count = await jsonLd.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('JSON-LD contains ProfessionalService schema', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const scripts = page.locator('script[type="application/ld+json"]');
    const count = await scripts.count();
    let foundProfessionalService = false;

    for (let i = 0; i < count; i++) {
      const content = await scripts.nth(i).textContent();
      if (content?.includes('ProfessionalService')) {
        foundProfessionalService = true;
        const data = JSON.parse(content);
        expect(data['@type']).toBe('ProfessionalService');
        expect(data.name).toContain('Stray Web Design');
        break;
      }
    }

    expect(foundProfessionalService).toBe(true);
  });
});

test.describe('SEO — canonical URLs', () => {
  test('Home page has canonical link', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', /straywebdesign/);
  });
});

test.describe('SEO — HTML lang attribute', () => {
  test('HTML has lang="en"', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const html = page.locator('html');
    await expect(html).toHaveAttribute('lang', 'en');
  });
});

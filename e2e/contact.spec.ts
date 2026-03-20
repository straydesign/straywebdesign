import { test, expect } from '@playwright/test';

// The /book page uses Lenis smooth scroll, which wraps content in a container
// with overflow:hidden. Playwright considers elements inside as "hidden" even
// though they are fully rendered. We use toBeAttached() for presence checks
// and page.evaluate() or force options for interaction tests.

test.describe('Booking / Contact form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/book', { waitUntil: 'domcontentloaded' });
  });

  test('form is present on the page', async ({ page }) => {
    await expect(page.locator('form')).toBeAttached();
  });

  test('all required fields are present', async ({ page }) => {
    await expect(page.locator('#book-name')).toBeAttached();
    await expect(page.locator('#book-email')).toBeAttached();
  });

  test('optional fields are present', async ({ page }) => {
    await expect(page.locator('#book-phone')).toBeAttached();
    await expect(page.locator('#book-business')).toBeAttached();
    await expect(page.locator('#book-website')).toBeAttached();
    await expect(page.locator('#book-timing')).toBeAttached();
    await expect(page.locator('#book-message')).toBeAttached();
  });

  test('name field accepts input', async ({ page }) => {
    await page.locator('#book-name').scrollIntoViewIfNeeded();
    const nameInput = page.locator('#book-name');
    await nameInput.fill('John Doe', { force: true });
    await expect(nameInput).toHaveValue('John Doe');
  });

  test('email field accepts input', async ({ page }) => {
    await page.locator('#book-email').scrollIntoViewIfNeeded();
    const emailInput = page.locator('#book-email');
    await emailInput.fill('john@example.com', { force: true });
    await expect(emailInput).toHaveValue('john@example.com');
  });

  test('phone field accepts input', async ({ page }) => {
    await page.locator('#book-phone').scrollIntoViewIfNeeded();
    const phoneInput = page.locator('#book-phone');
    await phoneInput.fill('(555) 123-4567', { force: true });
    await expect(phoneInput).toHaveValue('(555) 123-4567');
  });

  test('timing dropdown has options', async ({ page }) => {
    const select = page.locator('#book-timing');
    const options = select.locator('option');

    // Default "Select a timeframe" + 4 timing options
    const count = await options.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test('message textarea accepts input', async ({ page }) => {
    await page.locator('#book-message').scrollIntoViewIfNeeded();
    const textarea = page.locator('#book-message');
    await textarea.fill('I need a website for my dental practice', { force: true });
    await expect(textarea).toHaveValue('I need a website for my dental practice');
  });

  test('submit button is present and enabled', async ({ page }) => {
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeAttached();
    await expect(submitButton).toBeEnabled();
  });

  test('HTML5 validation prevents empty required fields', async ({ page }) => {
    // Click submit without filling required fields — browser native validation
    // should prevent navigation
    await page.locator('button[type="submit"]').scrollIntoViewIfNeeded();
    await page.locator('button[type="submit"]').click({ force: true });

    // We should still be on /book (form did not submit)
    await expect(page).toHaveURL(/\/book/);
  });

  test('email field has type=email for validation', async ({ page }) => {
    const emailInput = page.locator('#book-email');
    await expect(emailInput).toHaveAttribute('type', 'email');
  });

  test('name field has required attribute', async ({ page }) => {
    const nameInput = page.locator('#book-name');
    await expect(nameInput).toHaveAttribute('required', '');
  });

  test('email field has required attribute', async ({ page }) => {
    const emailInput = page.locator('#book-email');
    await expect(emailInput).toHaveAttribute('required', '');
  });

  test('form labels are properly associated with inputs', async ({ page }) => {
    const nameLabel = page.locator('label[for="book-name"]');
    await expect(nameLabel).toBeAttached();
    const nameLabelText = await nameLabel.textContent();
    expect(nameLabelText?.toLowerCase()).toContain('name');

    const emailLabel = page.locator('label[for="book-email"]');
    await expect(emailLabel).toBeAttached();
    const emailLabelText = await emailLabel.textContent();
    expect(emailLabelText?.toLowerCase()).toContain('email');
  });
});

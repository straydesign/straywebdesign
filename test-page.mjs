import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

const errors = [];
const consoleMessages = [];

page.on('pageerror', (err) => {
  errors.push(err.message);
});

page.on('console', (msg) => {
  if (msg.type() === 'error') {
    consoleMessages.push(msg.text());
  }
});

try {
  await page.goto('http://localhost:4790/', { waitUntil: 'networkidle', timeout: 30000 });

  // Wait a bit for client-side hydration and effects
  await page.waitForTimeout(3000);

  // Check if error boundary rendered
  const errorBoundary = await page.$('text=SOMETHING WENT WRONG');

  // Get page title
  const title = await page.title();

  // Check if main content is visible
  const heroVisible = await page.isVisible('section[aria-label="Hero"]');
  const navVisible = await page.isVisible('nav[aria-label="Main navigation"]');

  console.log('=== Page Load Results ===');
  console.log('Title:', title);
  console.log('Error boundary visible:', !!errorBoundary);
  console.log('Hero visible:', heroVisible);
  console.log('Nav visible:', navVisible);

  if (errors.length > 0) {
    console.log('\n=== Page Errors ===');
    errors.forEach((e, i) => console.log(`Error ${i + 1}:`, e));
  } else {
    console.log('\nNo page errors!');
  }

  if (consoleMessages.length > 0) {
    console.log('\n=== Console Errors ===');
    consoleMessages.forEach((m, i) => console.log(`Console ${i + 1}:`, m));
  } else {
    console.log('No console errors!');
  }

  // Take a screenshot
  await page.screenshot({ path: '/tmp/stray-page-test.png', fullPage: false });
  console.log('\nScreenshot saved to /tmp/stray-page-test.png');

} catch (err) {
  console.error('Test failed:', err.message);
} finally {
  await browser.close();
}

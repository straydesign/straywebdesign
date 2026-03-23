import { chromium } from 'playwright';

const browser = await chromium.launch({
  headless: true,
  args: ['--disable-gpu', '--disable-software-rasterizer'],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });

const allErrors = [];
const allConsoleErrors = [];

page.on('pageerror', (err) => {
  // Skip WebGL errors since headless doesn't have GPU
  if (err.message.includes('WebGL')) return;
  allErrors.push(err.message);
});

page.on('console', (msg) => {
  if (msg.type() === 'error') {
    const text = msg.text();
    if (text.includes('WebGL') || text.includes('THREE.WebGLRenderer')) return;
    allConsoleErrors.push(text);
  }
});

const pages = [
  { url: '/', name: 'Homepage' },
  { url: '/services', name: 'Services' },
  { url: '/industries', name: 'Industries' },
  { url: '/resources', name: 'Resources' },
  { url: '/locations', name: 'Locations' },
];

for (const pg of pages) {
  console.log(`\n--- Testing ${pg.name} (${pg.url}) ---`);
  try {
    await page.goto(`http://localhost:4790${pg.url}`, {
      waitUntil: 'networkidle',
      timeout: 15000,
    });
    await page.waitForTimeout(2000);

    // Check error boundary
    const errorBoundary = await page.$('text=SOMETHING WENT WRONG');
    if (errorBoundary) {
      console.log(`  ERROR BOUNDARY VISIBLE on ${pg.name}`);
    } else {
      console.log(`  Page loaded OK`);
    }

    // Scroll down to trigger scroll-based components
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(1000);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);

    // Check for main content visibility
    const mainVisible = await page.isVisible('main');
    const navVisible = await page.isVisible('nav');
    console.log(`  Main visible: ${mainVisible}, Nav visible: ${navVisible}`);
  } catch (err) {
    console.log(`  NAVIGATION ERROR: ${err.message}`);
  }
}

console.log('\n=== FINAL RESULTS ===');
if (allErrors.length > 0) {
  console.log('Page Errors (non-WebGL):');
  allErrors.forEach((e, i) => console.log(`  ${i + 1}. ${e.substring(0, 200)}`));
} else {
  console.log('No page errors (excluding WebGL)!');
}

if (allConsoleErrors.length > 0) {
  console.log('Console Errors (non-WebGL):');
  allConsoleErrors.forEach((m, i) => console.log(`  ${i + 1}. ${m.substring(0, 200)}`));
} else {
  console.log('No console errors (excluding WebGL)!');
}

await browser.close();

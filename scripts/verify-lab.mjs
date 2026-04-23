import { chromium } from 'playwright';

const ROUTES = [
  '/lab',
  '/lab/particles',
  '/lab/chrome',
  '/lab/wireframe',
  '/lab/scene-swap',
  '/lab/exploded',
  '/lab/jellyfish',
];

const results = [];

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });

for (const route of ROUTES) {
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`console: ${msg.text()}`);
  });
  try {
    await page.goto(`http://localhost:4790${route}`, { waitUntil: 'networkidle', timeout: 20000 });
    await page.waitForTimeout(2500);
    const hasCanvas = await page.locator('canvas').count();
    results.push({ route, status: 'ok', hasCanvas, errors: errors.slice(0, 3) });
  } catch (e) {
    results.push({ route, status: 'fail', error: e.message, errors: errors.slice(0, 3) });
  } finally {
    await page.close();
  }
}

await browser.close();

for (const r of results) {
  console.log(`\n${r.route}`);
  console.log(`  status: ${r.status}`);
  if ('hasCanvas' in r) console.log(`  <canvas> elements: ${r.hasCanvas}`);
  if (r.error) console.log(`  error: ${r.error}`);
  if (r.errors?.length) {
    console.log(`  js errors:`);
    r.errors.forEach((e) => console.log(`    - ${e.slice(0, 200)}`));
  }
}

const anyFailed = results.some((r) => r.status === 'fail' || r.errors?.length > 0);
process.exit(anyFailed ? 1 : 0);

// One settled screenshot per formation of the process section, for reading.
//   node scripts/process-3d/poses.mjs [width] [scheme] [baseUrl] [story=process]
// Writes qa/<dir>/poses/<width>-<scheme>-<pose>.png and a contact sheet.
import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

const [widthArg = '1440', scheme = 'light', BASE = 'http://localhost:4790', STORY = 'process'] = process.argv.slice(2);
const SEL = `#${STORY}`;
const CAPTURE = STORY === 'process' ? '?capture' : `?capture=${STORY}`;
const width = Number(widthArg);
const phone = width < 820;
const vp = phone
  ? { width, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true }
  : { width, height: 900, deviceScaleFactor: 1, isMobile: false };
const OUT = new URL(`../../qa/${STORY}-3d/poses/`, import.meta.url).pathname;
await mkdir(OUT, { recursive: true });

const browser = await chromium.launch({ channel: 'chrome', args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'] });
const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, ...vp, colorScheme: scheme });
const page = await ctx.newPage();
page.on('pageerror', (e) => console.error('pageerror', e.message));
await page.goto(`${BASE}/${CAPTURE}`, { waitUntil: 'load' });
await page.waitForFunction(() => document.querySelector('#process, #setup')?.getBoundingClientRect().top > 0, null, { timeout: 20000 });
await page.addStyleTag({ content: 'nextjs-portal{display:none!important} html{scroll-behavior:auto!important}' });
const top = await page.evaluate((sel) => document.querySelector(sel).getBoundingClientRect().top + scrollY, SEL);
await page.evaluate((y) => window.scrollTo(0, y), top);
await page.waitForFunction(() => typeof window.__advance === 'function' && window.__processReady === true, null, { timeout: 20000 });
await page.waitForTimeout(2500);

const stops = await page.evaluate((sel) => {
  const line = innerHeight * (innerWidth < 900 ? 0.62 : 0.5);
  const out = [];
  document.querySelectorAll(`${sel} [data-poses]`).forEach((el) => {
    const poses = el.dataset.poses.split(',').map(Number);
    const t = el.getBoundingClientRect().top + scrollY;
    poses.forEach((pose, i) => out.push({ pose, y: t + (el.offsetHeight * (i + 1)) / (poses.length + 1) - line }));
  });
  return out;
}, SEL);

let clock = 1000; // seconds; ahead of three's own clock, so the first stepped delta is positive
const files = [];
for (const { pose, y } of stops) {
  await page.evaluate(
    async ({ y, c }) => {
      window.scrollTo(0, y);
      window.dispatchEvent(new Event('scroll'));
      for (let i = 0; i < 150; i++) window.__advance(c + i / 60);
    },
    { y, c: clock },
  );
  clock += 3;
  await page.waitForTimeout(250);
  const file = join(OUT, `${width}-${scheme}-${pose}.png`);
  await page.screenshot({ path: file });
  files.push(file);
}
await browser.close();
// Contact sheet: rows of three (desktop) or four (phone), downscaled for reading.
const per = phone ? 4 : 3;
const rows = [];
for (let r = 0; r * per < files.length; r++) {
  const row = join(OUT, `row-${r}.png`);
  execFileSync('magick', [...files.slice(r * per, r * per + per), '-resize', phone ? '390x' : '720x', '-bordercolor', '#888', '-border', '2', '+append', row]);
  rows.push(row);
}
execFileSync('magick', [...rows, '-append', join(OUT, `sheet-${width}-${scheme}.png`)]);
rows.forEach((r) => execFileSync('rm', [r]));
console.log(`poses: ${stops.map((s) => s.pose).join(',')} -> sheet-${width}-${scheme}.png`);

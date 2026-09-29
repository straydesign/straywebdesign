// Real-time frame pacing while the process section scrolls top to bottom
// (live render loop, not the capture clock). Mean fps, p95 frame time, long frames.
//   node scripts/process-3d/fps.mjs [width] [seconds] [scheme] [baseUrl] [story=process]
import { chromium } from '@playwright/test';

const [widthArg = '1440', secArg = '14', scheme = 'light', BASE = 'http://localhost:4790', STORY = 'process'] = process.argv.slice(2);
const SEL = `#${STORY}`;
const width = Number(widthArg);
const phone = width < 820;
const browser = await chromium.launch({ channel: 'chrome', headless: false, args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'] });
const ctx = await browser.newContext({
  viewport: { width, height: phone ? 844 : 900 },
  deviceScaleFactor: 2,
  isMobile: phone,
  hasTouch: phone,
  colorScheme: scheme,
});
const page = await ctx.newPage();
await page.goto(BASE, { waitUntil: 'load' });
await page.waitForFunction(() => document.querySelector('#process, #setup')?.getBoundingClientRect().top > 0, null, { timeout: 20000 });
const top = await page.evaluate((sel) => document.querySelector(sel).getBoundingClientRect().top + scrollY, SEL);
await page.evaluate((y) => window.scrollTo(0, y - innerHeight), top);
await page.waitForSelector(`${SEL} .process__canvas canvas`, { timeout: 20000 });
await page.waitForTimeout(2000);

const stats = await page.evaluate(async ({ seconds, sel }) => {
  const s = document.querySelector(sel);
  const y0 = s.getBoundingClientRect().top + scrollY - innerHeight * 0.5;
  const y1 = y0 + s.offsetHeight;
  const deltas = [];
  let last = performance.now();
  const t0 = last;
  await new Promise((done) => {
    const tick = (now) => {
      deltas.push(now - last);
      last = now;
      const u = Math.min(1, (now - t0) / (seconds * 1000));
      window.scrollTo(0, y0 + (y1 - y0) * u);
      if (u < 1) requestAnimationFrame(tick);
      else done();
    };
    requestAnimationFrame(tick);
  });
  deltas.shift();
  const sorted = [...deltas].sort((a, b) => a - b);
  const mean = deltas.reduce((a, b) => a + b, 0) / deltas.length;
  const c = s.querySelector('.process__canvas canvas');
  return {
    frames: deltas.length,
    fps: +(1000 / mean).toFixed(1),
    p95ms: +sorted[Math.floor(sorted.length * 0.95)].toFixed(1),
    maxms: +sorted[sorted.length - 1].toFixed(1),
    over20ms: deltas.filter((d) => d > 20).length,
    dpr: devicePixelRatio,
    canvas: `${c.width}x${c.height}`,
  };
}, { seconds: Number(secArg), sel: SEL });
console.log(`${STORY} ${width}px ${scheme}`, JSON.stringify(stats));
await browser.close();

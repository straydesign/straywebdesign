// Frame-stepped scroll-through of the process section as a true 60 fps video.
// The page loads with `?capture`; when the 3D stage is mounted its render loop
// is stopped and stepped here with a fixed 1/60 s clock, and the scroll is
// driven per frame, so every frame is an exact, evenly spaced sample (never
// Playwright's recordVideo, which judders at ~25 fps).
//
//   node scripts/process-3d/capture.mjs <label> [width] [scheme] [selector] [baseUrl]
//
// Writes qa/process-3d/<label>-<width>[-dark].mp4 and keeps the PNG frames in
// qa/process-3d/frames/<label>-<width>-<scheme>/ for reading.
import { chromium } from '@playwright/test';
import { mkdir, rm } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

const [label = 'take', widthArg = '1440', scheme = 'light', selector = '#process', BASE = 'http://localhost:4790'] =
  process.argv.slice(2);
const width = Number(widthArg);
const phone = width < 820;
const vp = phone
  ? { width, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true }
  : { width, height: 900, deviceScaleFactor: 1, isMobile: false };

const STORY = selector.replace('#', '');
const ROOT = new URL(`../../qa/${STORY}-3d/`, import.meta.url).pathname;
const FRAMES = join(ROOT, 'frames', `${label}-${width}-${scheme}`);
await rm(FRAMES, { recursive: true, force: true });
await mkdir(FRAMES, { recursive: true });

const FPS = 60;
const MOVE = 1.4; // seconds of travel between two beats
const HOLD = 0.8; // seconds resting on each beat

const browser = await chromium.launch({ channel: 'chrome', args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'] });
const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, ...vp, colorScheme: scheme });
const page = await ctx.newPage();
await page.goto(`${BASE}/${STORY === 'process' ? '?capture' : `?capture=${STORY}`}`, { waitUntil: 'load' });
await page.waitForFunction(() => document.querySelector('#process, #setup')?.getBoundingClientRect().top > 0, null, { timeout: 20000 });
await page.addStyleTag({ content: 'nextjs-portal{display:none!important} html{scroll-behavior:auto!important}' });

// Bring the section near so the stage mounts, then wait for its stepped clock.
const top = await page.evaluate((sel) => document.querySelector(sel).getBoundingClientRect().top + scrollY, selector);
await page.evaluate((y) => window.scrollTo(0, y - innerHeight), top);
const stepped = await page
  .waitForFunction(() => typeof window.__advance === 'function' && window.__processReady === true, null, { timeout: 15000 })
  .then(() => true)
  .catch(() => false);
await page.waitForTimeout(1500);

// Scroll stops: each beat's reading-line anchor, or (no beats) the section's run.
const stops = await page.evaluate((sel) => {
  const root = document.querySelector(sel);
  const line = innerHeight * (innerWidth < 820 ? 0.62 : 0.5);
  const beats = root.querySelectorAll('[data-poses]');
  const abs = (el) => el.getBoundingClientRect().top + scrollY;
  if (!beats.length) {
    const t = abs(root);
    return [t - innerHeight * 0.6, t + root.offsetHeight - innerHeight * 0.4];
  }
  const out = [abs(root) - innerHeight * 0.55];
  beats.forEach((el) => {
    const poses = el.dataset.poses.split(',');
    const t = abs(el);
    poses.forEach((_, i) => out.push(t + (el.offsetHeight * (i + 1)) / (poses.length + 1) - line));
  });
  out.push(abs(root) + root.offsetHeight - innerHeight * 0.35);
  return out;
}, selector);

const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const path = [];
if (stops.length === 2) {
  // A static section: one steady read-through at reading speed.
  const n = Math.round(Math.max(4, (stops[1] - stops[0]) / 380) * FPS);
  for (let f = 0; f <= n; f++) path.push(stops[0] + (stops[1] - stops[0]) * easeInOut(f / n));
} else {
  for (let i = 0; i < stops.length; i++) {
    for (let f = 0; f < HOLD * FPS; f++) path.push(stops[i]);
    if (i < stops.length - 1) {
      const n = Math.round(MOVE * FPS);
      for (let f = 1; f <= n; f++) path.push(stops[i] + (stops[i + 1] - stops[i]) * easeInOut(f / n));
    }
  }
}

let clock = 1000; // seconds; ahead of three's own clock, so the first stepped delta is positive
if (stepped) {
  await page.evaluate((y) => window.scrollTo(0, y), path[0]);
  await page.evaluate(async (c) => {
    for (let i = 0; i < 180; i++) window.__advance(c + i / 60);
  }, clock);
  clock += 3;
}

for (let f = 0; f < path.length; f++) {
  await page.evaluate(
    ({ y, t, stepped }) => {
      window.scrollTo(0, y);
      window.dispatchEvent(new Event('scroll'));
      if (stepped) window.__advance(t);
    },
    { y: path[f], t: clock + f / FPS, stepped },
  );
  await page.screenshot({ path: join(FRAMES, `${String(f).padStart(5, '0')}.png`) });
}
await browser.close();

const name = `${label}-${width}${scheme === 'dark' ? '-dark' : ''}.mp4`;
execFileSync('ffmpeg', [
  '-y', '-loglevel', 'error', '-framerate', String(FPS), '-i', join(FRAMES, '%05d.png'),
  '-vf', 'scale=trunc(iw/2)*2:trunc(ih/2)*2', '-c:v', 'libx264', '-preset', 'slow', '-crf', '18',
  '-pix_fmt', 'yuv420p', '-movflags', '+faststart', join(ROOT, name),
]);
console.log(`${name}: ${path.length} frames, ${(path.length / FPS).toFixed(1)} s, stepped=${stepped}`);

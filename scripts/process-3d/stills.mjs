// Renders the resting pose of each beat on `/?still=N` and saves light + dark
// webp stills for the reduced-motion and no-WebGL fallback.
//   node scripts/process-3d/stills.mjs [baseUrl] [story=process]
import { chromium } from '@playwright/test';
import { execFileSync } from 'node:child_process';
import { mkdir, rm } from 'node:fs/promises';

const BASE = process.argv[2] ?? 'http://localhost:4790';
const OUT = new URL('../../public/process-3d/stills/', import.meta.url).pathname;
const STORY = process.argv[3] ?? 'process';
const POSES = [0, 2, 4, 5, 8, 9, 13];
const PREFIX = 'pose';
const QUERY = STORY === 'process' ? '' : `&story=${STORY}`;
await mkdir(OUT, { recursive: true });

const browser = await chromium.launch({ channel: 'chrome', args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'] });
for (const scheme of ['light', 'dark']) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 960 }, colorScheme: scheme });
  const page = await ctx.newPage();
  for (const pose of POSES) {
    await page.goto(`${BASE}/?still=${pose}${QUERY}`, { waitUntil: 'load' });
    await page.addStyleTag({
      content:
        `nextjs-portal{display:none!important} html,body{background:transparent!important} body *{visibility:hidden!important} #${STORY}-still,#${STORY}-still *{visibility:visible!important}`,
    });
    await page.waitForFunction(() => window.__processReady === true, null, { timeout: 20000 });
    await page.waitForTimeout(1500);
    const png = `${OUT}${PREFIX}-${pose}-${scheme}.png`;
    await page.locator(`#${STORY}-still`).screenshot({ path: png, omitBackground: true });
    execFileSync('cwebp', ['-quiet', '-q', '82', '-alpha_q', '90', png, '-o', png.replace('.png', '.webp')]);
    await rm(png);
  }
  await ctx.close();
}
await browser.close();
console.log('stills written to', OUT);

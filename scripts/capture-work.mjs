import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'public', 'images', 'work');

const SHOTS = [
  { slug: 'rolling-meadows', url: 'https://rolling-meadows.vercel.app' },
  { slug: 'iron-ink', url: 'https://ironink.vercel.app' },
  { slug: 'war-horse', url: 'https://warhorse.vercel.app' },
  { slug: 'erie-carbonic', url: 'https://erie-carbonic.vercel.app' },
  { slug: 'greenline', url: 'https://greenline-rust.vercel.app' },
];

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();

for (const { slug, url } of SHOTS) {
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(2500); // let hero animations settle
    await page.screenshot({ path: path.join(OUT, `${slug}.png`) });
    console.log(`OK   ${slug}  <-  ${url}`);
  } catch (e) {
    console.log(`FAIL ${slug}  <-  ${url}  (${e.message.split('\n')[0]})`);
  }
}

await browser.close();

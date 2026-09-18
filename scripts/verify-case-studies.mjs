#!/usr/bin/env node
/**
 * Gate for the four case-study routes.
 *
 *   node scripts/verify-case-studies.mjs [baseUrl]     (default http://localhost:4790)
 *
 * Five things, each one a defect this page has actually shipped or nearly did:
 *
 *  1. BACK      — the "Back to work" link under the fixed header. The ported
 *                 CSS carried straydesign.co's 5.5rem header into a site whose
 *                 header is 3.6rem and fixed, and the link rendered a quarter
 *                 hidden.
 *  2. ANCHOR    — every rail target, scrolled to and measured. --cs-header
 *                 drives scroll-margin, so a wrong value lands section links
 *                 short with no other symptom.
 *  3. RAIL FIT  — the rail taller than the room under the header, or its first
 *                 entry tucked beneath it.
 *  4. RAIL OVER — the rail painting ON TOP of article content. It is
 *                 `position: fixed` over the whole article, and what holds the
 *                 content clear of it is `--cs-pad`. The next-study strip was
 *                 built with Tailwind's `px-8` instead and the rail ran
 *                 straight across the first card. Nothing else catches this:
 *                 every element involved is present, visible and the right
 *                 size — they are simply in the same place.
 *  5. IMAGES    — after a patient stepped scroll, because a fullPage grab does
 *                 not trigger lazy loading and an impatient one reports images
 *                 as broken that are merely not fetched yet.
 */
import { createRequire } from 'node:module';
const require = createRequire('/opt/homebrew/lib/node_modules/');
const { chromium } = require('playwright');

const BASE = process.argv[2] || 'http://localhost:4790';
const STUDIES = ['seacave', 'andys', 'bullfrog', 'presqueisle'];
const VIEWPORTS = [[390, 844], [768, 1024], [1024, 768], [1280, 800], [1440, 900], [1920, 1080]];

const HEADER_BOTTOM = () => {
  const c = [...document.querySelectorAll('header')].filter((e) => {
    const cs = getComputedStyle(e);
    if (cs.position !== 'fixed' && cs.position !== 'sticky') return false;
    const r = e.getBoundingClientRect();
    return r.width > window.innerWidth * 0.6 && r.top < 4;
  });
  return Math.max(0, ...c.map((e) => e.getBoundingClientRect().bottom));
};

const browser = await chromium.launch();
const notes = [];
let anchors = 0, imgs = 0;
let backBad = 0, anchorBad = 0, railBad = 0, overBad = 0, imgBad = 0;

for (const [w, h] of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();

  for (const slug of STUDIES) {
    const res = await page.goto(`${BASE}/work/${slug}`, { waitUntil: 'domcontentloaded', timeout: 45000 });
    if (res.status() !== 200) { notes.push(`HTTP  ${slug} ${w}x${h} :: ${res.status()}`); continue; }
    await page.waitForTimeout(700);

    const back = await page.evaluate(({ HB }) => {
      const hb = new Function(`return (${HB})()`)();
      const b = document.querySelector('.cs-back');
      return b ? { top: b.getBoundingClientRect().top, hb } : { missing: true };
    }, { HB: HEADER_BOTTOM.toString() });
    if (back.missing) { backBad++; notes.push(`BACK  ${slug} ${w}x${h} :: .cs-back missing`); }
    else if (back.top < back.hb - 0.5) {
      backBad++;
      notes.push(`BACK  ${slug} ${w}x${h} :: top ${Math.round(back.top)} under header ${Math.round(back.hb)}`);
    }

    const rail = await page.evaluate(({ HB }) => {
      const hb = new Function(`return (${HB})()`)();
      const el = document.querySelector('.cs-rail');
      if (!el || getComputedStyle(el).display === 'none') return null;
      const r = el.getBoundingClientRect();
      const first = el.querySelector('.cs-rail__item')?.getBoundingClientRect();
      return {
        room: window.innerHeight - hb, height: r.height,
        overTop: first ? hb - first.top : 0, overBottom: r.bottom - window.innerHeight,
        items: el.querySelectorAll('.cs-rail__item').length,
      };
    }, { HB: HEADER_BOTTOM.toString() });
    if (rail && (rail.height > rail.room + 0.5 || rail.overTop > 0.5 || rail.overBottom > 0.5)) {
      railBad++;
      notes.push(`RAIL  ${slug} ${w}x${h} :: ${rail.items} items, ${Math.round(rail.height)}px in ${Math.round(rail.room)}px`);
    }

    const ids = await page.evaluate(() =>
      [...document.querySelectorAll('[data-cs-section]')].map((e) => e.id).filter(Boolean));
    for (const id of ids) {
      await page.evaluate((i) => document.getElementById(i)?.scrollIntoView({ block: 'start' }), id);
      await page.waitForTimeout(150);
      const r = await page.evaluate(({ i, HB }) => {
        const hb = new Function(`return (${HB})()`)();
        const s = document.getElementById(i);
        const head = s.querySelector('h1,h2,h3') ?? s;
        return { top: head.getBoundingClientRect().top, hb };
      }, { i: id, HB: HEADER_BOTTOM.toString() });
      anchors++;
      if (r.top < r.hb - 0.5) {
        anchorBad++;
        notes.push(`ANCH  ${slug} ${w}x${h} #${id} :: ${Math.round(r.top)} under ${Math.round(r.hb)}`);
      }
    }

    // Walk the page the way a reader does, then check overlap and images.
    await page.evaluate(async () => {
      const step = Math.round(window.innerHeight * 0.5);
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 220));
      }
      window.scrollTo(0, document.documentElement.scrollHeight);
    });
    await page.waitForTimeout(2500);

    const over = await page.evaluate(() => {
      const rail = document.querySelector('.cs-rail');
      if (!rail || getComputedStyle(rail).display === 'none') return [];
      const rr = rail.getBoundingClientRect();
      const hits = [];
      // Only things that carry meaning: text and images, not their wrappers.
      for (const el of document.querySelectorAll('.cs p, .cs h1, .cs h2, .cs h3, .cs li, .cs img, .cs a')) {
        if (rail.contains(el)) continue;
        const r = el.getBoundingClientRect();
        if (r.width < 4 || r.height < 4) continue;
        if (r.bottom < 0 || r.top > window.innerHeight) continue;
        const cs = getComputedStyle(el);
        if (cs.visibility === 'hidden' || +cs.opacity < 0.05) continue;
        const ox = Math.min(rr.right, r.right) - Math.max(rr.left, r.left);
        const oy = Math.min(rr.bottom, r.bottom) - Math.max(rr.top, r.top);
        if (ox > 2 && oy > 2) {
          hits.push(`${el.tagName.toLowerCase()} "${(el.textContent || el.getAttribute('alt') || '').trim().slice(0, 28)}"`);
        }
      }
      return hits.slice(0, 3);
    });
    if (over.length) {
      overBad++;
      notes.push(`OVER  ${slug} ${w}x${h} :: rail paints over ${over.join(' · ')}`);
    }

    const im = await page.evaluate(() => {
      const bad = [];
      const all = document.querySelectorAll('img');
      for (const i of all) if (!i.complete || i.naturalWidth === 0) bad.push(i.currentSrc || i.src);
      return { total: all.length, bad };
    });
    imgs += im.total;
    imgBad += im.bad.length;
    for (const s of im.bad.slice(0, 2)) notes.push(`IMG   ${slug} ${w}x${h} :: ${decodeURIComponent(s).replace(BASE, '')}`);
  }
  await ctx.close();
}
await browser.close();

for (const n of notes.slice(0, 30)) console.log(n);
console.log(`\n${STUDIES.length} studies x ${VIEWPORTS.length} viewports · ${anchors} anchor checks · ${imgs} images`);
console.log(
  `${backBad} back-link collisions · ${anchorBad} anchors under the header · ` +
    `${railBad} rail overflow · ${overBad} rail-over-content · ${imgBad} unpainted images`,
);
const fail = backBad + anchorBad + railBad + overBad + imgBad;
process.exit(fail ? 1 : 0);

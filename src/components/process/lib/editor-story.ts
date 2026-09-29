import { Build, H, S, XS, assemble, registry, type Story, type View } from './kit';

/**
 * "Your editor" as formations of the same kit "How I build your site" uses.
 *
 * A simplified version of the editors Tom builds for clients, drawn after the
 * real one at seacave-keystatic/src/app/manage: a rail of screens that folds
 * down to icons, a product with a photo and a price, and every change saving
 * the moment it is made. Beside it, the owner's site on a phone, which follows.
 *
 *   0  intro    the editor, rail open, the site beside it
 *   1  menu     the rail folds to icons; the work gets the room
 *   2  price    a new price, Saved, and the site's price follows it
 *   3  photo    a new photo drops into the slot; the site's photo follows
 *   4  live     on the site: a green tick
 *
 * WHAT IT MAY CLAIM. Only what the editors do (checked 2026-09-29 in
 * ProductEditor.tsx and the save routes): product fields and photos save the
 * moment they change, with no Save button and a small "Saved" tag; photos
 * upload the moment they are picked and attach themselves; a save clears the
 * site's cache, so the change shows within seconds. The copy says "under a
 * minute", which that clears with room to spare.
 *
 * Every piece is named (`id`), so a piece that is in some formations and not
 * others can never take another piece's place in the pool.
 */

const REG = registry();

// The editor panel, and the phone showing the site beside it.
const PX = -0.45;
const PANEL_L = PX - 1.0;
const PANEL_R = PX + 1.0;
const PHX = 1.34;

const ROWS = ['Prices', 'Photos', 'Hours', 'Messages'];
const rowZ = (i: number) => -0.4 + i * 0.22;

/** Tile width is 0.44 m at scale 1, depth 0.3 m. */
const tileW = (w: number) => w / 0.44;
const tileD = (d: number) => d / 0.3;

type State = {
  open: boolean;
  price: 'old' | 'new';
  photo: 'old' | 'new';
  /** The price field is lit while it is being changed. */
  editing: boolean;
  saved: boolean;
  sync: boolean;
  live: boolean;
};

function editor(s: State): Build {
  const f = new Build(REG);

  // The panel and the rail.
  f.put('Plate', [PX, 0.015, 0], { id: 'panel', c: 'paper', s: [2.0, 1, 1.42] });
  const railW = s.open ? 0.6 : 0.2;
  const railX = PANEL_L + 0.03 + railW / 2;
  f.put('Plate', [railX, 0.036, 0.02], { id: 'rail', c: 'lane', s: [railW, 1, 1.3], at: 0.05 });
  const hiW = railW - 0.05;
  f.put('Tile', [railX, 0.064, rowZ(0)], { id: 'row-on', c: 'soft', s: [tileW(hiW), 0.5, tileD(0.15)], at: 0.1 });
  ROWS.forEach((name, i) => {
    f.put('Node', [PANEL_L + 0.13, 0.09, rowZ(i)], {
      id: `icon-${i}`,
      c: i === 0 ? 'accent' : 'base',
      s: [0.42, 0.4, 0.42],
      at: 0.1 + i * 0.05,
    });
    if (s.open) f.text(`row-${i}`, name, [PANEL_L + 0.22, 0.085, rowZ(i)], { size: XS, font: i === 0 ? 'strong' : 'text', at: 0.2 + i * 0.05 });
  });

  // The work area: whatever the rail gives back, it takes.
  const L = railX + railW / 2 + 0.07;
  const R = PANEL_R - 0.08;
  f.text('screen', 'Prices', [L, 0.035, -0.54], { size: H, font: 'strong', at: 0.4 });

  // The photo, with a sun on it so it reads as one.
  const photoW = 0.42;
  const photoX = L + photoW / 2;
  const photoZ = -0.1;
  f.put('Tile', [photoX, 0.055, photoZ], {
    id: s.photo === 'old' ? 'photo-a' : 'photo-b',
    c: s.photo === 'old' ? 'soft' : 'warn',
    s: [tileW(photoW), 1, tileD(0.48)],
    at: s.photo === 'old' ? 0.1 : 0.35,
  });
  f.put('Node', [photoX + 0.1, 0.095, photoZ - 0.12], { id: 'sun', c: 'paper', s: [0.36, 0.3, 0.36], at: 0.6 });

  // The fields: the item's name, and its price.
  const fL = photoX + photoW / 2 + 0.08;
  const fW = R - fL;
  const fX = fL + fW / 2;
  f.text('name-label', 'Name', [fL, 0.035, -0.43], { size: XS, ink: 'ink2', at: 0.4 });
  const name = f.put('Tile', [fX, 0.055, -0.25], { id: 'name', c: 'lane', s: [tileW(fW), 1, tileD(0.15)], at: 0.2 });
  f.text('name', 'Cold brew, 16 oz', [-fW / 2 + 0.04, 0.03, 0], { on: name, size: 0.066, at: 0.5 });
  f.text('price-label', 'Price', [fL, 0.035, -0.1], { size: XS, ink: 'ink2', at: 0.45 });
  const price = f.put('Tile', [fX, 0.055, 0.08], {
    id: 'price',
    c: s.editing ? 'soft' : 'lane',
    tint: s.editing ? 0.05 : undefined,
    s: [tileW(fW), 1, tileD(0.15)],
    at: 0.25,
  });
  f.text(`price-${s.price}`, s.price === 'old' ? '$4.50' : '$4.75', [-fW / 2 + 0.05, 0.03, 0], {
    on: price,
    size: S,
    font: 'strong',
    at: s.price === 'new' ? 0 : 0.5,
  });
  if (s.saved) {
    const chip = f.put('Plate', [fL + 0.2, 0.036, 0.3], { id: 'saved', c: 'done', s: [0.4, 1, 0.14], at: 0.3 });
    f.text('saved', 'Saved', [0, 0.02, 0], { on: chip, size: XS, font: 'strong', ink: 'onFill', anchorX: 'center', at: 0.3 });
  }

  // The site, on a phone.
  f.put('Phone', [PHX, 0.02, 0.02], { id: 'phone', c: 'device', s: [1.9, 1, 1.55], at: 0.1 });
  const screen = f.put('Plate', [PHX, 0.043, 0.02], { id: 'screen', c: 'paper', s: [0.6, 1, 1.02], at: 0.15 });
  f.text('url', 'yourbusiness.com', [0, 0.02, -0.42], { on: screen, size: 0.05, ink: 'ink2', anchorX: 'center', at: 0.5 });
  f.put('Tile', [PHX, 0.07, -0.15], {
    id: 'site-photo',
    c: s.photo === 'old' ? 'soft' : 'warn',
    tint: s.photo === 'new' ? 0.72 : undefined,
    s: [tileW(0.5), 0.4, tileD(0.34)],
    at: 0.2,
  });
  f.text('site-name', 'Cold brew, 16 oz', [-0.25, 0.02, 0.1], { on: screen, size: 0.056, font: 'strong', at: 0.55 });
  f.text(`site-price-${s.price}`, s.price === 'old' ? '$4.50' : '$4.75', [-0.25, 0.02, 0.22], {
    on: screen,
    size: XS,
    at: s.price === 'new' ? 0.8 : 0.6,
  });

  // The save reaching the site: a line drawn from the field to the phone.
  if (s.sync) f.rod([R + 0.02, 0.08], [PHX - 0.36, 0.22], 0.06, { id: 'sync', c: 'accent', at: 0.45 });

  if (s.live) {
    const node = f.put('Node', [PHX - 0.18, 0.075, 0.4], { id: 'live', c: 'done', tint: 0.4, s: [0.62, 0.5, 0.62], at: 0.2 });
    f.put('Tick', [PHX - 0.18, 0.11, 0.405], { id: 'live-tick', c: 'paper', s: [0.36, 1, 0.36], at: 0.6 });
    f.text('live', 'Live', [0.1, 0.0, 0], { on: node, size: XS, font: 'strong', at: 0.5 });
  }
  return f;
}

const BASE: State = { open: true, price: 'old', photo: 'old', editing: false, saved: false, sync: false, live: false };

const builds = [
  editor(BASE),
  editor({ ...BASE, open: false }),
  editor({ ...BASE, open: false, price: 'new', editing: true, saved: true, sync: true }),
  editor({ ...BASE, open: false, price: 'new', photo: 'new', saved: true }),
  editor({ ...BASE, open: false, price: 'new', photo: 'new', saved: true, live: true }),
];

/** High and nearly square on, so the set type reads; a small turn between beats. */
const VIEWS: View[] = [
  { az: -8, el: 50 },
  { az: 4, el: 58 },
  { az: -3, el: 60 },
  { az: 5, el: 58 },
  { az: -2, el: 56 },
];

export const EDITOR: Story = assemble(REG, builds, [false, true, true, true, true], VIEWS, false);

import { Build, H, S, XS, type Registry, type Tone } from './kit';

/**
 * Step 6 of "How I build your site", after launch: the editor as a quick panel
 * moment inside the process, then the calendar after it.
 *
 * Until 2026-09-29 the editor had its own animated section. Tom: "the editor
 * can be a quick panel on the regular animation, not a separate set of
 * animations, and it should be more detailed." So it plays here, in the same
 * kit, as five formations:
 *
 *   10  the editor opens on Hours, the site beside it on a phone
 *   11  [1] Saturday's hours change; Saved; the site's hours follow
 *   12  [2] the menu folds to icons; a new photo; the site's photo follows
 *   13  [3] a special switched on; it appears on the site
 *   14  the editor folds away: launch, the week-one check-in, day 90
 *
 * The panel is drawn after the editors Tom builds for clients (seacave-keystatic
 * /manage): a menu of screens that folds down to icons, labelled fields, and
 * every change saving the moment it is made with a small "Saved" tag. What the
 * copy may claim from it is only what those editors do (checked 2026-09-29 in
 * ProductEditor.tsx and the save routes): no Save button; photos upload when
 * picked and attach themselves; a save clears the site's cache, so the change
 * shows within seconds, which "under a minute" clears with room to spare.
 *
 * Every piece is named (`id`), so a piece in some of these formations and not
 * others never takes another piece's place in the pool. Every label is at
 * least XS, the size that reads at ~11px on a 390px phone.
 */

// ---------- geometry ----------

/** Tile is 0.44 m wide and 0.3 m deep at scale 1. */
const tw = (w: number) => w / 0.44;
const td = (d: number) => d / 0.3;

// The panel.
const PN_L = -1.57;
const PN_R = 0.73;
const PN_X = (PN_L + PN_R) / 2;
const TOP = -1.02;

// The menu down its left edge.
const MENU = ['Home', 'Hours', 'Services', 'Photos', 'Specials'] as const;
type Screen = 'Hours' | 'Photos' | 'Specials';
const menuZ = (i: number) => -0.5 + i * 0.22;
const RAIL_L = PN_L + 0.03;
const ICON_X = RAIL_L + 0.1;

// The site, on a phone beside it.
const PHX = 1.5;

type Edit = 0 | 1 | 2 | 3;

/** The editor and the site after `edit` changes. The menu folds to icons once the photos need the room. */
function editor(reg: Registry, edit: Edit): Build {
  const f = new Build(reg);
  const screen: Screen = edit >= 3 ? 'Specials' : edit === 2 ? 'Photos' : 'Hours';
  const open = edit < 2;
  const sat = edit >= 1 ? '9am – 5pm' : '9am – 3pm';

  // ---- the panel and its menu ----
  f.put('Plate', [PN_X, 0.015, -0.14], { id: 'ed-panel', c: 'paper', s: [PN_R - PN_L, 1, 1.46], at: 0 });
  const railW = open ? 0.62 : 0.2;
  const railX = RAIL_L + railW / 2;
  f.put('Plate', [railX, 0.036, -0.13], { id: 'ed-rail', c: 'lane', s: [railW, 1, 1.36], at: 0.05 });
  const active = MENU.indexOf(screen);
  f.put('Tile', [railX, 0.062, menuZ(active)], { id: 'ed-row-on', c: 'soft', s: [tw(railW - 0.05), 0.5, td(0.19)], at: 0.1 });
  MENU.forEach((name, i) => {
    f.put('Node', [ICON_X, 0.085, menuZ(i)], { id: `ed-icon-${i}`, c: i === active ? 'accent' : 'base', s: [0.4, 0.4, 0.4], at: 0.1 + i * 0.04 });
    if (open) f.text(`ed-menu-${i}`, name, [ICON_X + 0.1, 0.075, menuZ(i)], { size: XS, font: i === active ? 'strong' : 'text', at: 0.2 + i * 0.04 });
  });

  // ---- the form: whatever the menu gives back, it takes ----
  const L = railX + railW / 2 + 0.1;
  const R = PN_R - 0.08;
  const W = R - L;
  const FX = L + W / 2;
  f.text(`ed-title-${screen}`, screen, [L, 0.035, -0.64], { size: H, font: 'strong', at: 0.3 });

  if (edit >= 1) {
    const chip = f.put('Plate', [R - 0.2, 0.036, -0.64], { id: `ed-saved-${edit}`, c: 'done', s: [0.4, 1, 0.15], at: 0.62 });
    f.text(`ed-saved-${edit}`, 'Saved', [0, 0.02, 0], { on: chip, size: XS, font: 'strong', ink: 'onFill', anchorX: 'center', at: 0.8 });
  }

  /** A labelled field: the label over it, the value set inside it. */
  const field = (slot: number, z: number, label: string, value: string, lit = false, at = 0.2) => {
    f.text(`ed-label-${screen}-${slot}`, label, [L, 0.035, z], { size: XS, ink: 'ink2', at: 0.35 + slot * 0.05 });
    const t = f.put('Tile', [FX, 0.055, z + 0.16], {
      id: `ed-field-${slot}`,
      c: lit ? 'soft' : 'lane',
      tint: lit ? 0.3 : undefined,
      s: [tw(W), 1, td(0.17)],
      at: at + slot * 0.05,
    });
    f.text(`ed-value-${screen}-${slot}-${value}`, value, [-W / 2 + 0.05, 0.03, 0], { on: t, size: S, font: 'strong', at: 0.5 + slot * 0.05 });
    return t;
  };

  let from: [number, number] = [R, 0];
  let to: [number, number] = [PHX, 0];

  if (screen === 'Hours') {
    field(0, -0.44, 'Monday to Friday', '8am – 6pm');
    field(1, -0.1, 'Saturday', sat, edit === 1);
    field(2, 0.24, 'Sunday', 'Closed');
    from = [R, 0.06];
    to = [PHX - 0.36, 0.04];
  }

  if (screen === 'Photos') {
    // Three photos; the first is the new one, with a sun on it so it reads as a photo.
    const PW = (W - 0.2) / 3;
    [0, 1, 2].forEach((k) => {
      const x = L + PW / 2 + k * (PW + 0.1);
      const tone: Tone = k === 0 ? 'warn' : k === 1 ? 'soft' : 'base';
      f.put('Tile', [x, 0.055, -0.26], { id: k === 0 ? 'ed-photo-new' : `ed-photo-${k}`, c: tone, s: [tw(PW), 1, td(0.44)], at: k === 0 ? 0.35 : 0.15 + k * 0.05 });
      if (k === 0) f.put('Node', [x + PW / 2 - 0.12, 0.095, -0.4], { id: 'ed-photo-sun', c: 'paper', s: [0.36, 0.3, 0.36], at: 0.6 });
    });
    f.text('ed-photo-tag', 'New', [L + 0.04, 0.09, -0.08], { size: XS, font: 'strong', ink: 'ink', at: 0.7 });
    field(1, 0.1, 'Caption', 'The new sign out front');
    from = [R, -0.3];
    to = [PHX - 0.34, -0.4];
  }

  if (screen === 'Specials') {
    // Two specials, each a row with a switch: soup switched on, chili left off.
    ([['Soup of the day', true], ['Chili', false]] as const).forEach(([name, on], k) => {
      const z = -0.36 + k * 0.3;
      const row = f.put('Tile', [FX, 0.055, z], { id: `ed-field-${k}`, c: on ? 'soft' : 'lane', tint: on ? 0.55 : undefined, s: [tw(W), 1, td(0.22)], at: 0.2 + k * 0.05 });
      f.text(`ed-special-${k}`, name, [-W / 2 + 0.05, 0.03, 0], { on: row, size: S, font: 'strong', at: 0.5 + k * 0.05 });
      const trackX = R - 0.2;
      f.put('Plate', [trackX, 0.085, z], { id: `ed-switch-${k}`, c: on ? 'done' : 'base', tint: on ? 0.55 : undefined, s: [0.28, 1, 0.13], at: 0.3 + k * 0.05 });
      f.put('Node', [trackX + (on ? 0.07 : -0.07), 0.1, z], { id: `ed-knob-${k}`, c: 'paper', s: [0.42, 0.3, 0.42], at: 0.4 + k * 0.05 });
    });
    field(2, 0.12, 'Price', '$6');
    from = [R, -0.36];
    to = [PHX - 0.36, 0.36];
  }

  // ---- the site, on a phone ----
  site(f, edit);

  // The change reaching the site: a line from the field to what it changed.
  if (edit >= 1) f.rod(from, to, 0.11, { id: `ed-sync-${edit}`, c: 'accent', at: 0.55 });

  // ---- callouts, set above the panel and the phone ----
  const CALLOUT = ['[ Your editor ]', '[1] New Saturday hours', '[2] A new photo', '[3] A special, switched on'];
  f.text(`ed-callout-${edit}`, CALLOUT[edit], [PN_L, 0.01, TOP], { size: S, font: 'strong', ink: 'accentInk', anchorY: 'bottom', at: 0.35 });
  return f;
}

/** The owner's site on a phone, after `edit` changes. Stays put while the editor works beside it. */
function site(f: Build, edit: Edit) {
  f.put('Phone', [PHX, 0.02, 0], { id: 'ed-phone', c: 'device', s: [2.4, 1, 2.45], at: 0.1 });
  const screen = f.put('Plate', [PHX, 0.043, 0], { id: 'ed-screen', c: 'paper', s: [0.78, 1, 1.66], at: 0.15 });
  f.text('ed-site', '[ Your site ]', [PHX, 0.01, TOP], { size: S, font: 'strong', ink: 'ink2', anchorX: 'center', anchorY: 'bottom', at: 0.4 });
  f.text('ed-url', 'yourbusiness.com', [0, 0.02, -0.72], { on: screen, size: 0.072, ink: 'ink2', anchorX: 'center', at: 0.5 });

  const photoNew = edit >= 2;
  f.put('Tile', [PHX, 0.07, -0.4], { id: 'ed-site-photo', c: photoNew ? 'warn' : 'soft', tint: edit === 2 ? 0.72 : undefined, s: [tw(0.66), 0.4, td(0.42)], at: 0.2 });
  if (photoNew) f.put('Node', [PHX + 0.2, 0.095, -0.52], { id: 'ed-site-sun', c: 'paper', s: [0.3, 0.3, 0.3], at: edit === 2 ? 0.85 : 0 });

  f.text('ed-site-hours', 'Hours', [-0.33, 0.02, -0.08], { on: screen, size: XS, font: 'strong', at: 0.55 });
  const sat = edit >= 1 ? 'new' : 'old';
  f.text(`ed-site-sat-${sat}`, edit >= 1 ? 'Sat 9am – 5pm' : 'Sat 9am – 3pm', [-0.33, 0.02, 0.05], { on: screen, size: XS, at: edit === 1 ? 0.8 : 0.6 });

  if (edit >= 3) {
    const card = f.put('Tile', [PHX, 0.07, 0.36], { id: 'ed-site-special', c: 'accent', s: [tw(0.66), 0.4, td(0.26)], at: 0.8 });
    f.text('ed-site-special', 'Soup today, $6', [0, 0.03, 0], { on: card, size: XS, font: 'strong', ink: 'onFill', anchorX: 'center', at: 0.85 });
  }
}

/** The editor folds away; the site stays, and the weeks after run down beside it. */
function calendar(reg: Registry): Build {
  const f = new Build(reg);
  site(f, 3);
  const TX = -1.3;
  const ZS = [-0.6, 0.02, 0.64];
  f.rod([TX, ZS[0]], [TX, ZS[2]], 0.02, { id: 'cal-line', at: 0.1 });
  f.put('Bar', [TX, 0.03, ZS[0]], { id: 'cal-done', c: 'accent', s: [ZS[1] - ZS[0], 0.3, 0.32], r: [0, -Math.PI / 2, 0], at: 0.35 });
  const NAMES = ['Launch', 'Check-in, week 1', 'Day 90: you decide'];
  ZS.forEach((z, i) => {
    f.put('Block', [TX, 0.06, z], { id: `cal-${i}`, c: i < 2 ? 'accent' : 'base', s: [0.55, 0.55, 0.55], r: [0, Math.PI / 4, 0], at: 0.2 + i * 0.12 });
    f.text(`when-${i}`, NAMES[i], [TX + 0.17, 0.01, z], {
      size: i === 0 ? S : H,
      font: i === 0 ? 'text' : 'strong',
      ink: i === 0 ? 'ink2' : 'ink',
      at: 0.45 + i * 0.1,
    });
  });
  // The check-in itself, under the week-one marker; the decision, under day 90.
  const card = f.put('Tile', [TX + 0.75, 0.03, ZS[1] + 0.27], { id: 'cal-checkin', c: 'soft', s: [tw(1.12), 1, td(0.24)], at: 0.6 });
  f.text('checkin', 'What needs adjusting?', [-0.5, 0.03, 0], { on: card, size: S, at: 0.8 });
  f.text('decide', 'If it didn’t work, every dollar back', [TX + 0.17, 0.01, ZS[2] + 0.17], { size: XS, ink: 'ink2', at: 0.9 });
  return f;
}

/** Formations 10–14, in order. */
export function afterLaunch(reg: Registry): Build[] {
  return [editor(reg, 0), editor(reg, 1), editor(reg, 2), editor(reg, 3), calendar(reg)];
}


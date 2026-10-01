import { Build, H, S, XS, type Opts, type Registry } from './kit';

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

/**
 * Spacing, in metres. One inset, one gutter, and radii that nest: a piece set
 * inside another takes the outer radius less the gap between them.
 */
const INSET = 0.05;
const GUT = 0.1;
const GAP = 0.07;
const PANEL_RAD = 0.1;
const RAIL_RAD = PANEL_RAD - INSET;

// The panel. Its top edge is fixed; its depth follows what the screen holds.
const PN_L = -1.57;
const PN_R = 0.73;
const PN_X = (PN_L + PN_R) / 2;
const PN_T = -0.87;
/** Where the callouts are set, above the panel and the phone. */
const TOP = -1.02;

// The menu down its left edge.
const MENU = ['Home', 'Hours', 'Services', 'Photos', 'Specials'] as const;
type Screen = 'Hours' | 'Photos' | 'Specials';
const ROW = 0.19;
const RAIL_L = PN_L + INSET;
const RAIL_OPEN = 0.62;
const RAIL_SHUT = 0.2;
const ICON_X = RAIL_L + RAIL_SHUT / 2;
const menuZ = (i: number) => PN_T + INSET + INSET + ROW / 2 + i * 0.22;
/** The least depth the panel can have: the whole menu, with its inset. */
const MENU_END = menuZ(MENU.length - 1) + ROW / 2 + INSET + INSET;

const TITLE_Z = PN_T + 0.17;
const FIELD = 0.17;

// The site, on a phone beside it.
const PHX = 1.5;
const PHONE = 2.4;
/** Screen: the body less an even bezel, its corners concentric with the body's. */
const BEZEL = 0.04;
const SCREEN_W = 0.36 * PHONE - BEZEL * 2;
const SCREEN_D = 0.74 * PHONE - BEZEL * 2;
const SCREEN_RAD = 0.075 * PHONE - BEZEL;
const SCREEN_T = -SCREEN_D / 2;
/** What the site shows sits in one column, the same margin either side. */
const SITE_M = 0.05;
const SITE_W = SCREEN_W - SITE_M * 2;
const SITE_L = -SITE_W / 2;
const SITE_PHOTO_D = SITE_W / 1.5;
const SITE_PHOTO_Z = SCREEN_T + 0.245 + GAP + SITE_PHOTO_D / 2;
// Under the photo: the place's name, its hours, today's special once one is on, and a call button.
// The finished site is the payoff of the whole story, so it reads like a real one (Tom 10-01).
const SITE_NAME_Z = SITE_PHOTO_Z + SITE_PHOTO_D / 2 + 0.11;
const SITE_HOURS_Z = SITE_NAME_Z + 0.01;
const SITE_SPECIAL_D = 0.18;
const SITE_SPECIAL_Z = SITE_HOURS_Z + 0.13 + 0.1 + SITE_SPECIAL_D / 2;
const SITE_CALL_D = 0.13;
const SITE_CALL_Z = SITE_SPECIAL_Z + SITE_SPECIAL_D / 2 + 0.05 + SITE_CALL_D / 2;

type Edit = 0 | 1 | 2 | 3;

/** The editor and the site after `edit` changes. The menu folds to icons once the photos need the room. */
function editor(reg: Registry, edit: Edit): Build {
  const f = new Build(reg);
  const screen: Screen = edit >= 3 ? 'Specials' : edit === 2 ? 'Photos' : 'Hours';
  const open = edit < 2;
  const sat = edit >= 1 ? '9am – 5pm' : '9am – 3pm';

  const railW = open ? RAIL_OPEN : RAIL_SHUT;
  const railX = RAIL_L + railW / 2;
  const L = RAIL_L + railW + GUT;
  const R = PN_R - GUT;
  const W = R - L;
  const FX = L + W / 2;

  /** A labelled field: the label over it, the value set inside it. */
  const field = (slot: number, z: number, label: string, value: string, lit = false, at = 0.2) => {
    f.text(`ed-label-${screen}-${slot}`, label, [L, 0.035, z], { size: XS, ink: 'ink2', at: at + slot * 0.05 });
    const t = f.put('Tile', [FX, 0.055, z + 0.15], {
      id: `ed-field-${slot}`,
      c: lit ? 'soft' : 'lane',
      tint: lit ? 0.3 : undefined,
      s: [tw(W), 1, td(FIELD)],
      at: at + slot * 0.05,
    });
    f.text(`ed-value-${screen}-${slot}-${value}`, value, [-W / 2 + 0.05, 0.03, 0], { on: t, size: S, font: 'strong', at: 0.5 + slot * 0.05 });
    return z + 0.15 + FIELD / 2;
  };

  // ---- the form: whatever the menu gives back, it takes ----
  f.text(`ed-title-${screen}`, screen, [L, 0.035, TITLE_Z], { size: H, font: 'strong', at: 0.3 });
  if (edit >= 1) {
    const chip = f.put('Plate', [R - 0.2, 0.036, TITLE_Z], { id: `ed-saved-${edit}`, c: 'done', s: [0.4, 1, 0.15], rad: 1, at: 0.62 });
    f.text(`ed-saved-${edit}`, 'Saved', [0, 0.02, 0], { on: chip, size: XS, font: 'strong', ink: 'onFill', anchorX: 'center', at: 0.8 });
  }

  let end = 0;
  let from: [number, number] = [R, 0];
  let to: [number, number] = [PHX, 0];

  if (screen === 'Hours') {
    const z = TITLE_Z + 0.2;
    field(0, z, 'Monday to Friday', '8am – 6pm');
    field(1, z + 0.35, 'Saturday', sat, edit === 1);
    end = field(2, z + 0.7, 'Sunday', 'Closed');
    from = [R, z + 0.5];
    to = [PHX + SITE_L - 0.02, SITE_HOURS_Z + 0.13];
  }

  if (screen === 'Photos') {
    // Three photos off a real menu; the first is the new one.
    const PW = (W - GAP * 2) / 3;
    const PD = PW / 1.5;
    const z = TITLE_Z + 0.13 + PD / 2;
    (['wings', 'burger', 'pretzel'] as const).forEach((img, k) => {
      const x = L + PW / 2 + k * (PW + GAP);
      f.put('Tile', [x, 0.055, z], { id: `ed-photo-${img}`, img, c: 'photo', s: [tw(PW), 1, td(PD)], at: k === 0 ? 0.35 : 0.15 + k * 0.05 });
    });
    const tag = f.put('Plate', [L + 0.04 + 0.11, 0.086, z - PD / 2 + 0.04 + 0.055], { id: 'ed-photo-tag', c: 'accent', s: [0.22, 0.3, 0.11], rad: 1, at: 0.6 });
    f.text('ed-photo-tag', 'New', [0, 0.01, 0], { on: tag, size: XS, font: 'strong', ink: 'onFill', anchorX: 'center', at: 0.7 });
    end = field(1, z + PD / 2 + 0.14, 'Caption', 'Buffalo wings');
    from = [R, z];
    to = [PHX + SITE_L, SITE_PHOTO_Z];
  }

  if (screen === 'Specials') {
    // Two specials, each a row with a switch: soup switched on, chili left off.
    const z0 = TITLE_Z + 0.13 + 0.11;
    ([['Soup of the day', true], ['Chili', false]] as const).forEach(([name, on], k) => {
      const z = z0 + k * (0.22 + GAP - 0.01);
      const row = f.put('Tile', [FX, 0.055, z], { id: `ed-field-${k}`, c: on ? 'soft' : 'lane', tint: on ? 0.55 : undefined, s: [tw(W), 1, td(0.22)], at: 0.2 + k * 0.05 });
      f.text(`ed-special-${k}`, name, [-W / 2 + 0.05, 0.03, 0], { on: row, size: S, font: 'strong', at: 0.5 + k * 0.05 });
      const trackX = R - 0.06 - 0.14;
      f.put('Plate', [trackX, 0.085, z], { id: `ed-switch-${k}`, c: on ? 'done' : 'base', tint: on ? 0.55 : undefined, s: [0.28, 1, 0.14], rad: 1, at: 0.3 + k * 0.05 });
      f.put('Node', [trackX + (on ? 0.07 : -0.07), 0.1, z], { id: `ed-knob-${k}`, c: 'paper', s: [0.42, 0.3, 0.42], at: 0.4 + k * 0.05 });
    });
    end = field(2, z0 + 0.28 + 0.11 + 0.14, 'Price', '$6');
    from = [R, z0];
    to = [PHX + SITE_L, SITE_SPECIAL_Z];
  }

  // ---- the panel and its menu, as deep as the screen needs ----
  const bottom = Math.max(end + 0.12, MENU_END);
  f.put('Plate', [PN_X, 0.015, (PN_T + bottom) / 2], { id: 'ed-panel', c: 'paper', s: [PN_R - PN_L, 1, bottom - PN_T], rad: PANEL_RAD, at: 0 });
  f.put('Plate', [railX, 0.036, (PN_T + bottom) / 2], { id: 'ed-rail', c: 'lane', s: [railW, 1, bottom - PN_T - INSET * 2], rad: RAIL_RAD, at: 0.05 });
  const active = MENU.indexOf(screen);
  f.put('Tile', [railX, 0.062, menuZ(active)], { id: 'ed-row-on', c: 'soft', s: [tw(railW - 0.06), 0.5, td(ROW)], at: 0.1 });
  MENU.forEach((name, i) => {
    f.put('Node', [ICON_X, 0.085, menuZ(i)], { id: `ed-icon-${i}`, c: i === active ? 'accent' : 'base', s: [0.4, 0.4, 0.4], at: 0.1 + i * 0.04 });
    if (open) f.text(`ed-menu-${i}`, name, [ICON_X + 0.1, 0.075, menuZ(i)], { size: XS, font: i === active ? 'strong' : 'text', at: 0.1 + i * 0.04 });
  });

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
  f.put('Phone', [PHX, 0.03, 0], { id: 'ed-phone', c: 'device', s: [PHONE, 1.5, PHONE], at: 0.1 });
  const screen = f.put('Plate', [PHX, 0.0615, 0], { id: 'ed-screen', c: 'paper', s: [SCREEN_W, 0.3, SCREEN_D], rad: SCREEN_RAD, at: 0.15 });
  f.put('Plate', [PHX, 0.068, SCREEN_T + 0.07], { id: 'ed-island', c: 'device', s: [0.2, 0.2, 0.06], rad: 1, at: 0.2 });
  f.put('Plate', [PHX, 0.068, -SCREEN_T - 0.055], { id: 'ed-homebar', c: 'device', s: [0.26, 0.2, 0.024], rad: 1, at: 0.2 });
  f.text('ed-site', '[ Your site ]', [PHX, 0.01, TOP], { size: S, font: 'strong', ink: 'ink2', anchorX: 'center', anchorY: 'bottom', at: 0.4 });

  // The address bar, then the page under it.
  const bar = f.put('Tile', [PHX, 0.072, SCREEN_T + 0.19], { id: 'ed-urlbar', c: 'lane', s: [tw(SITE_W), 0.25, td(0.11)], rad: 1, at: 0.2 });
  f.text('ed-url', 'yourbusiness.com', [0, 0.012, 0], { on: bar, size: 0.072, ink: 'ink2', anchorX: 'center', at: 0.5 });

  // The photo the site leads with: the old one, until the new one is picked in the editor.
  const photo: Opts = { c: 'photo', s: [tw(SITE_W), 0.4, td(SITE_PHOTO_D)] };
  if (edit < 2) f.put('Tile', [PHX, 0.076, SITE_PHOTO_Z], { ...photo, id: 'ed-site-photo', img: 'burger', at: 0.2 });
  else f.put('Tile', [PHX, 0.076, SITE_PHOTO_Z], { ...photo, id: 'ed-site-photo-new', img: 'wings', at: edit === 2 ? 0.72 : 0.2 });

  f.text('ed-site-name', 'Corner Grill', [SITE_L, 0.012, SITE_NAME_Z], { on: screen, size: S, font: 'strong', at: 0.3 });
  const sat = edit >= 1 ? 'new' : 'old';
  f.text(`ed-site-sat-${sat}`, edit >= 1 ? 'Sat 9am – 5pm' : 'Sat 9am – 3pm', [SITE_L, 0.012, SITE_HOURS_Z + 0.13], { on: screen, size: XS, at: edit === 1 ? 0.8 : 0.6, late: edit === 1 });

  if (edit >= 3) {
    const card = f.put('Tile', [PHX, 0.076, SITE_SPECIAL_Z], { id: 'ed-site-special', c: 'soft', tint: 0.55, s: [tw(SITE_W), 0.4, td(SITE_SPECIAL_D)], at: 0.8 });
    f.text('ed-site-special', 'Soup today, $6', [0, 0.02, 0], { on: card, size: XS, font: 'strong', anchorX: 'center', at: 0.85 });
  }

  const call = f.put('Tile', [PHX, 0.076, SITE_CALL_Z], { id: 'ed-site-call', c: 'accent', s: [tw(SITE_W), 0.4, td(SITE_CALL_D)], at: 0.25 });
  f.text('ed-site-call', 'Call to order', [0, 0.02, 0], { on: call, size: XS, font: 'strong', ink: 'onFill', anchorX: 'center', at: 0.3 });
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


import { afterLaunch } from './after-launch';
import { Build, H, S, XS, assemble, rand, registry, type Geo, type Story, type Tone, type V3, type View } from './kit';

/**
 * Every beat of "How I build your site" is a FORMATION: where each piece of the
 * kit sits and which labels are set on it. The scene interpolates between
 * neighbouring formations as the reader scrolls. A piece missing from a
 * formation is hidden; it grows out of (or drops into) the pose it holds next
 * door, so a pin falls onto the draft and a progress bar draws out from its start.
 *
 * Pieces are drawn from per-geometry pools in order (Tile0, Tile1, ...), so the
 * same physical card is a note on the call, then a research card, then a
 * section of the page. The kit recomposes; nothing is swapped out.
 *
 *   0  intro      the kit, undecided
 *   1  call       the phone, and the questions a new customer would ask
 *   2  brief      the same notes, organised into the brief
 *   3  research   cards from the field, mixed
 *   4  research   sorted: what works, and what everyone says
 *   5  draft      the page assembles section by section; the motion goes on last
 *   6  round 1    pins: Like, Change, Use this
 *   7  round 2    a change applied, a new note
 *   8  round 3    everything applied and ticked off
 *   9  launch     on your domain; speed, phone and search checks turn green
 *  10–14 after    your editor as a quick panel: new hours, a new photo, a
 *                 special switched on, the site following each; then the
 *                 week-one check-in and day 90 (after-launch.ts)
 *
 * The kit, the builder and the types live in kit.ts.
 */

const REG = registry();

// ---------- 0 · intro: the kit, undecided ----------

function intro(): Build {
  const f = new Build(REG);
  const geos: Geo[] = ['Tile', 'Block', 'Tile', 'Node', 'Pin', 'Tile', 'Bar', 'Tick', 'Phone', 'Block', 'Tile', 'Node', 'Plate', 'Tile', 'Pin', 'Block', 'Tile', 'Bar'];
  geos.forEach((geo, i) => {
    const k = i + 5;
    const p: V3 = [-1.7 + rand(k) * 3.4, 0.5 + rand(k + 40) * 1.4, -1.0 + rand(k + 80) * 1.9];
    const r: V3 = [rand(k + 120) * 1.2 - 0.6, rand(k + 160) * Math.PI, rand(k + 200) * 1.0 - 0.5];
    const s: V3 = geo === 'Bar' ? [0.5, 1, 1] : geo === 'Tile' ? [1.3, 1, 1] : geo === 'Plate' ? [0.5, 1, 0.36] : [1, 1, 1];
    const c: Tone = geo === 'Phone' ? 'device' : i === 1 || i === 10 ? 'accent' : i === 7 ? 'done' : i === 13 ? 'soft' : 'base';
    f.put(geo, p, { r, s, c });
  });
  return f;
}

// ---------- 1, 2 · the call, then the brief ----------

const QUESTIONS = ['Who comes in?', 'What do they ask first?', 'What sells best?', 'What sets you apart?', 'What should they do next?'];
const PHONE_AT: V3 = [-1.05, 0.02, 0.02];

function phoneOnCall(f: Build, at = 0) {
  const turn = 0.1;
  f.put('Phone', PHONE_AT, { c: 'device', r: [0, turn, 0], at });
  // An even bezel, and the screen's corners concentric with the body's.
  const screen = f.put('Plate', [PHONE_AT[0], 0.041, PHONE_AT[2]], { c: 'paper', s: [0.32, 0.3, 0.7], rad: 0.055, r: [0, turn, 0], at: at + 0.1 });
  const up = (dz: number): V3 => [PHONE_AT[0] + dz * Math.sin(turn), 0.046, PHONE_AT[2] + dz * Math.cos(turn)];
  f.put('Plate', up(-0.31), { id: 'call-island', c: 'device', s: [0.09, 0.2, 0.028], rad: 1, r: [0, turn, 0], at: at + 0.15 });
  f.put('Node', [PHONE_AT[0], 0.066, PHONE_AT[2] + 0.12], { c: 'accent', s: [0.62, 0.5, 0.62], at: at + 0.25 });
  f.text('call', 'Our call', [0, 0.02, -0.14], { on: screen, font: 'strong', size: XS, anchorX: 'center', at: 0.5 });
}

function call(): Build {
  const f = new Build(REG);
  phoneOnCall(f);
  const spots: [number, number, number][] = [
    [0.36, -0.82, 0.06],
    [0.58, -0.4, -0.05],
    [0.28, 0.02, 0.04],
    [0.62, 0.44, -0.07],
    [0.32, 0.86, 0.05],
  ];
  QUESTIONS.forEach((q, i) => {
    const [x, z, turn] = spots[i];
    const t = f.put('Tile', [x, 0.03, z], { s: [2.75, 1, 1.05], r: [0, turn, 0], at: 0.15 + i * 0.16 });
    f.text(`q-${i}`, q, [-0.53, 0.03, 0], { on: t, at: 0.5 + i * 0.09 });
  });
  return f;
}

function brief(): Build {
  const f = new Build(REG);
  phoneOnCall(f);
  const sheet = f.put('Plate', [0.42, 0.015, 0.06], { c: 'paper', s: [1.62, 1, 2.36], at: 0 });
  f.text('brief', 'Your brief', [-0.68, 0.02, -0.92], { on: sheet, font: 'display', size: 0.17, at: 0.55 });
  QUESTIONS.forEach((q, i) => {
    const t = f.put('Tile', [0.42, 0.058, -0.52 + i * 0.37], { s: [3.3, 1, 1.1], at: 0.1 + i * 0.1, c: 'base' });
    f.text(`q-${i}`, q, [-0.62, 0.03, -0.045], { on: t, at: 0.5 });
    // The answer, as a line of accent under each question: it was filled in on the call.
    f.put('Bar', [0.42 - 0.62, 0.085, -0.52 + i * 0.37 + 0.075], { c: 'accent', s: [0.95 - ((i * 3) % 4) * 0.12, 0.3, 0.3], at: 0.45 + i * 0.08 });
  });
  return f;
}

// ---------- 3, 4 · research: what works, and what everyone says ----------

const WORKS = ['Prices on the page', 'Real photos', 'Hours up top', 'Call in one tap'];
// The words the research counted in the most website ads (buyer-language-local-websites.md §2).
const SAYS = ['Custom', 'Professional', 'Stunning', 'Online presence'];
const LANE_X = [-0.74, 0.74];
const laneZ = (r: number) => -0.44 + r * 0.38;

function research(sorted: boolean): Build {
  const f = new Build(REG);
  LANE_X.forEach((x, l) => {
    f.put('Plate', [x, 0.015, 0.15], { c: 'lane', s: [1.38, 1, 1.72], at: l * 0.1 });
  });
  f.text('works', 'What works', [LANE_X[0] - 0.64, 0.01, -0.88], { font: 'strong', size: H, ink: 'accentInk', anchorY: 'bottom', at: 0.3 });
  f.text('says', 'What everyone says', [LANE_X[1] - 0.64, 0.01, -0.88], { font: 'strong', size: H, ink: 'ink2', anchorY: 'bottom', at: 0.38 });
  // Mixed: the order they turn up in while I look, dealt across both lanes.
  const mixed: [boolean, number][] = [[true, 0], [false, 0], [false, 1], [true, 1], [true, 2], [false, 2], [false, 3], [true, 3]];
  mixed.forEach(([works, n], k) => {
    const text = works ? WORKS[n] : SAYS[n];
    const lane = sorted ? (works ? 0 : 1) : k % 2;
    const row = sorted ? n : Math.floor(k / 2);
    const jitter = sorted ? 0 : (rand(k + 9) - 0.5) * 0.14;
    const t = f.put('Tile', [LANE_X[lane] + (sorted ? 0 : (rand(k + 3) - 0.5) * 0.1), 0.055, laneZ(row)], {
      s: [2.8, 1, 1.0],
      r: [0, jitter, 0],
      c: sorted && works ? 'soft' : 'base',
      tint: sorted && works ? 0.62 + n * 0.05 : undefined,
      at: sorted ? (works ? n * 0.1 : 0.12 + n * 0.1) : 0.2 + k * 0.07,
    });
    f.text(`card-${works ? 'w' : 's'}${n}`, text, [-0.56, 0.03, 0], { on: t, size: 0.092, at: 0.55 });
  });
  return f;
}

// ---------- 5 – 9 · the draft, the review rounds, launch ----------

const PX = 0.2;
const SERVICE_Z = 0.16;
const PROOF_Z = 0.6;
const CONTACT_Z = 0.97;

type Round = 0 | 1 | 2 | 3;

/** The page, in the state after `round` rounds of review. */
function page(f: Build, round: Round, launched = false) {
  f.put('Plate', [PX, 0.015, 0.08], { c: 'paper', s: [1.72, 1, 2.3], at: 0 });
  const bar = f.put('Plate', [PX, 0.036, -0.93], { c: 'lane', s: [1.6, 1, 0.16], at: 0.05 });
  f.text(launched ? 'domain' : 'draft', launched ? 'yourbusiness.com' : 'First version', [0, 0.02, 0], {
    on: bar,
    size: XS,
    ink: launched ? 'ink' : 'ink2',
    font: launched ? 'strong' : 'text',
    anchorX: 'center',
    at: 0.6,
  });

  // Section by section, top to bottom.
  const hero = f.put('Tile', [PX, 0.055, -0.5], { c: 'soft', s: [3.55, 1, 2.3], at: 0.12 });
  f.text('hero', 'Hero', [-0.7, 0.03, -0.24], { on: hero, font: 'strong', size: S, at: 0.35 });
  f.put('Bar', [PX - 0.7, 0.09, -0.52], { c: 'accent', s: [0.82, 0.3, 0.4], at: 0.3 });
  f.put('Bar', [PX - 0.7, 0.09, -0.4], { c: 'accent', s: [0.56, 0.3, 0.4], at: 0.34 });

  // Round 2 applies the first "Change": three narrow cards become two wide ones.
  const services = round >= 2 ? [-0.385, 0.385].map((dx) => [dx, 1.7] as const) : [-0.52, 0, 0.52].map((dx) => [dx, 1.12] as const);
  services.forEach(([dx, w], i) => {
    const t = f.put('Tile', [PX + dx, 0.055, SERVICE_Z], { c: 'base', s: [w, 1, 1.3], at: 0.3 + i * 0.05 });
    if (i === 0) f.text('services', 'Services', [-0.22 * w + 0.05, 0.03, -0.12], { on: t, size: XS, font: 'strong', at: 0.5 });
  });

  // Round 3 applies "Use this": the proof block takes the line you pointed at.
  const proof = f.put('Tile', [PX, 0.055, PROOF_Z], { c: round >= 3 ? 'soft' : 'base', tint: round === 3 ? 0.5 : undefined, s: [3.55, 1, 0.98], at: 0.48 });
  f.text('proof', 'Proof', [-0.7, 0.03, 0], { on: proof, size: XS, font: 'strong', at: 0.6 });

  const contact = f.put('Tile', [PX, 0.055, CONTACT_Z], { c: 'base', s: [3.55, 1, 0.8], at: 0.6 });
  f.text('contact', 'Contact', [-0.7, 0.03, 0], { on: contact, size: XS, font: 'strong', at: 0.7 });
  f.put('Bar', [PX + (round >= 3 ? 0.08 : 0.3), 0.09, CONTACT_Z], { c: 'accent', s: [round >= 3 ? 0.58 : 0.38, 0.5, 0.6], at: 0.66 });

  // The motion layer goes on last, over the hero.
  f.put('Block', [PX + 0.52, 0.3, -0.52], { c: 'accent', s: [1.05, 1.05, 1.05], r: [0.5, 0.6, 0.2], at: 0.86, spin: 0.55 });
  f.put('Node', [PX + 0.2, 0.2, -0.42], { c: 'base', s: [0.5, 0.5, 0.5], r: [0.35, 0, 0.2], at: 0.92, spin: -0.4 });
  f.text('motion', '3D and motion', [0.74, 0.03, 0.24], { on: hero, size: 0.068, ink: 'accentInk', anchorX: 'right', at: 0.95, late: true });
}

const PIN_LOOK: Record<'like' | 'change' | 'use', { c: Tone; word: string; w: number }> = {
  like: { c: 'done', word: 'Like', w: 0.4 },
  change: { c: 'warn', word: 'Change', w: 0.56 },
  use: { c: 'accent', word: 'Use this', w: 0.6 },
};

/** A pin dropped on the draft, with its note floating beside the head. */
function pin(f: Build, kind: keyof typeof PIN_LOOK, x: number, z: number, n: number, at: number) {
  const look = PIN_LOOK[kind];
  f.put('Pin', [x, 0.085, z], { c: look.c, r: [0.22, 0, -0.18], at });
  const chip = f.put('Plate', [x + 0.1 + look.w / 2, 0.36, z - 0.04], { c: look.c, s: [look.w, 1, 0.17], at: Math.min(1, at + 0.12) });
  f.text(`pin-${kind}-${n}`, look.word, [0, 0.02, 0], { on: chip, size: XS, font: 'strong', ink: 'onFill', anchorX: 'center', at: 0.7 });
}

function counter(f: Build, round: 1 | 2 | 3) {
  f.text(`round-${round}`, `Round ${round} of 3`, [PX - 0.86, 0.01, -1.22], { font: 'strong', size: H, anchorY: 'bottom', at: 0.3 });
  [0, 1, 2].forEach((i) => {
    f.put('Node', [PX + 0.6 + i * 0.2, 0.03, -1.28], {
      c: i < round ? 'accent' : 'lane',
      tint: i === round - 1 ? 0.55 : undefined,
      s: [0.46, 0.5, 0.46],
      at: 0.1 + i * 0.05,
    });
  });
}

function draft(): Build {
  const f = new Build(REG);
  page(f, 0);
  return f;
}

function round1(): Build {
  const f = new Build(REG);
  page(f, 1);
  counter(f, 1);
  pin(f, 'like', PX - 0.3, -0.46, 1, 0.3);
  pin(f, 'change', PX, SERVICE_Z + 0.02, 1, 0.45);
  pin(f, 'use', PX + 0.1, PROOF_Z, 1, 0.6);
  return f;
}

function round2(): Build {
  const f = new Build(REG);
  page(f, 2);
  counter(f, 2);
  pin(f, 'like', PX - 0.3, -0.46, 1, 0);
  pin(f, 'use', PX + 0.1, PROOF_Z, 1, 0);
  pin(f, 'change', PX + 0.02, CONTACT_Z, 2, 0.6);
  return f;
}

/** Ticks down the right edge of the page, one per section that changed. */
function ticks(f: Build, from: number) {
  [SERVICE_Z, PROOF_Z, CONTACT_Z].forEach((z, i) => {
    f.put('Tick', [PX + 1.08, 0.025, z], { c: 'done', s: [1.1, 1, 1.1], at: from + i * 0.1 });
  });
}

function round3(): Build {
  const f = new Build(REG);
  page(f, 3);
  counter(f, 3);
  ticks(f, 0.5);
  return f;
}

const CHECKS = ['Speed', 'Phone', 'Search'];

function launch(): Build {
  const f = new Build(REG);
  page(f, 3, true);
  CHECKS.forEach((name, i) => {
    const z = -0.3 + i * 0.42;
    const node = f.put('Node', [-1.45, 0.06, z], { c: 'done', tint: 0.5 + i * 0.12, s: [1.05, 1, 1.05], at: 0.1 + i * 0.08 });
    f.put('Tick', [-1.45, 0.14, z + 0.01], { c: 'paper', s: [0.62, 1, 0.62], at: 0.55 + i * 0.12 });
    f.text(`check-${i}`, name, [0.2, 0, 0], { on: node, font: 'strong', size: H, at: 0.3 + i * 0.08 });
  });
  return f;
}

// ---------- assembly ----------

const builds = [intro(), call(), brief(), research(false), research(true), draft(), round1(), round2(), round3(), launch(), ...afterLaunch(REG)];

/**
 * The camera's quarter per formation: azimuth (degrees right of front) and
 * elevation (degrees above the horizon). High enough that the set labels read,
 * with a small alternating turn so the table never feels flat.
 */
const VIEWS: View[] = [
  { az: 20, el: 32 },
  { az: -6, el: 55 },
  { az: 5, el: 60 },
  { az: -4, el: 56 },
  { az: 3, el: 60 },
  { az: -8, el: 52 },
  { az: 6, el: 54 },
  { az: 2, el: 58 },
  { az: -3, el: 60 },
  { az: 5, el: 57 },
  // After launch: nearly square on and high, so the editor's fields read.
  { az: -4, el: 62 },
  { az: 3, el: 64 },
  { az: -3, el: 64 },
  { az: 3, el: 64 },
  { az: -4, el: 58 },
];

export const PROCESS: Story = assemble(
  REG,
  builds,
  [false, false, true, false, true, true, true, true, true, true, true, true, true, true, false],
  VIEWS,
);

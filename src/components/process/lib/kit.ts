import * as THREE from 'three';

/**
 * The shared kit behind every scroll-driven 3D story on the page: the piece
 * geometry, the pose and label types, and the builder a story is written with.
 * A STORY is a run of formations plus the camera's quarter for each; Scene.tsx
 * plays any story it is handed. "How I build your site" is one (formations.ts),
 * "Your editor" is another (editor-story.ts). Same pieces, same motion, same
 * light, so the two sections read as one hand.
 *
 * World: metres, Y up, ground at y = 0. Labels lie flat and read along +x, the
 * top of each line pointing away from the camera (-z).
 */

export type Geo = 'Tile' | 'Plate' | 'Bar' | 'Node' | 'Block' | 'Rod' | 'Pin' | 'Tick' | 'Phone';
export type Tone = 'base' | 'paper' | 'lane' | 'accent' | 'soft' | 'done' | 'warn' | 'device';
export type Ink = 'ink' | 'ink2' | 'onFill' | 'accentInk';
export type V3 = [number, number, number];
export type Pose = {
  p: V3;
  q: [number, number, number, number];
  s: V3;
  c: Tone;
  /** Arrival slot in [0, 1] inside the transition into this formation. */
  at: number;
  /** Arrive in the previous (or base) tone and change to `c` from this point of the transition. */
  tint?: number;
  /** Radians per second of slow turn about Y while resting (the motion layer). */
  spin?: number;
};
export type Formation = Partial<Record<string, Pose>>;
export type Piece = { id: string; geo: Geo };

export type LabelDef = {
  id: string;
  text: string;
  size: number;
  font: 'text' | 'strong' | 'display' | 'italic';
  ink: Ink;
  anchorX: 'left' | 'center' | 'right';
  anchorY: 'top' | 'middle' | 'bottom';
  maxWidth?: number;
};
export type LabelPose = {
  /** Absolute position, or an offset in the frame of the piece it rides on. */
  p: V3;
  on?: string;
  at: number;
};
export type LabelFormation = Partial<Record<string, LabelPose>>;

/** Local bounding box of each piece at scale 1, [min, max]. */
export const EXTENTS: Record<Geo, [V3, V3]> = {
  Tile: [[-0.22, -0.025, -0.15], [0.22, 0.025, 0.15]],
  Plate: [[-0.5, -0.015, -0.5], [0.5, 0.015, 0.5]],
  Bar: [[0, -0.07, -0.1], [1, 0.07, 0.1]],
  Node: [[-0.13, -0.06, -0.13], [0.13, 0.06, 0.13]],
  Block: [[-0.1, -0.1, -0.1], [0.1, 0.1, 0.1]],
  Rod: [[0, -0.016, -0.016], [1, 0.016, 0.016]],
  Pin: [[-0.075, 0, -0.075], [0.075, 0.36, 0.075]],
  Tick: [[-0.16, -0.02, -0.13], [0.18, 0.02, 0.1]],
  Phone: [[-0.18, -0.02, -0.37], [0.18, 0.02, 0.37]],
};

/** How a hidden piece collapses, per geometry: bars and rods along their length. */
export const HIDDEN_SCALE: Record<Geo, V3> = {
  Tile: [0, 0, 0],
  Plate: [0, 1, 0],
  Bar: [0, 1, 1],
  Node: [0, 0, 0],
  Block: [0, 0, 0],
  Rod: [0, 1, 1],
  Pin: [1, 1, 1],
  Tick: [0, 0, 0],
  Phone: [0, 0, 0],
};


// ---------- builders ----------

/** One story's pieces and labels, so two stories never share a pool. */
export type Registry = { geo: Map<string, Geo>; labels: Map<string, LabelDef> };
export const registry = (): Registry => ({ geo: new Map(), labels: new Map() });

const euler = new THREE.Euler();
const quatTmp = new THREE.Quaternion();
export const quat = (x = 0, y = 0, z = 0): Pose['q'] => {
  quatTmp.setFromEuler(euler.set(x, y, z));
  return [quatTmp.x, quatTmp.y, quatTmp.z, quatTmp.w];
};

export type Opts = {
  c?: Tone;
  s?: V3;
  r?: V3;
  at?: number;
  tint?: number;
  spin?: number;
  /** A stable name, so the same piece is the same object in every formation it appears in. Default: next from the pool. */
  id?: string;
};
export type TextOpts = Partial<Omit<LabelDef, 'id' | 'text'>> & { on?: string; at?: number };

export class Build {
  constructor(private readonly reg: Registry) {}

  pieces: Formation = {};
  labels: LabelFormation = {};
  private next: Partial<Record<Geo, number>> = {};

  put(geo: Geo, p: V3, o: Opts = {}): string {
    let id: string;
    if (o.id) id = `${geo}-${o.id}`;
    else {
      const n = this.next[geo] ?? 0;
      this.next[geo] = n + 1;
      id = `${geo}${n}`;
    }
    this.reg.geo.set(id, geo);
    this.pieces[id] = {
      p,
      q: o.r ? quat(...o.r) : quat(),
      s: o.s ?? [1, 1, 1],
      c: o.c ?? 'base',
      at: o.at ?? 0,
      tint: o.tint,
      spin: o.spin,
    };
    return id;
  }

  /** A connector from a to b on the ground plane, lying at height y. */
  rod(a: [number, number], b: [number, number], y: number, o: Opts = {}): string {
    const dx = b[0] - a[0];
    const dz = b[1] - a[1];
    return this.put('Rod', [a[0], y, a[1]], { ...o, s: [Math.hypot(dx, dz), 1, 1], r: [0, Math.atan2(-dz, dx), 0] });
  }

  text(id: string, text: string, p: V3, d: TextOpts = {}) {
    const { on, at, ...def } = d;
    const full: LabelDef = {
      id,
      text,
      size: S,
      font: 'text',
      ink: 'ink',
      anchorX: 'left',
      anchorY: 'middle',
      ...def,
    };
    const prev = this.reg.labels.get(id);
    if (prev && JSON.stringify(prev) !== JSON.stringify(full)) throw new Error(`label ${id} set two ways`);
    this.reg.labels.set(id, full);
    this.labels[id] = { p, on, at: at ?? 0.5 };
  }
}

/** Deterministic scatter, so every visit (and every still) shows the same intro. */
export function rand(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

// Text sizes (metres). The smallest reads at ~11px on a 390px phone.
export const H = 0.1;
export const S = 0.085;
export const XS = 0.08;

export type View = { az: number; el: number };

export type Story = {
  formations: Formation[];
  labelFormations: LabelFormation[];
  pieces: Piece[];
  labels: LabelDef[];
  /** Which arrivals lock in (a small overshoot and settle) rather than simply land. */
  locks: boolean[];
  /** The camera's quarter per formation. */
  views: View[];
  /** Whether the pieces drift loose before the story starts (the process kit does; a UI should sit still). */
  drift: boolean;
};

export function assemble(reg: Registry, builds: Build[], locks: boolean[], views: View[], drift = true): Story {
  if (locks.length !== builds.length || views.length !== builds.length) throw new Error('story: one lock and one view per formation');
  return {
    formations: builds.map((b) => b.pieces),
    labelFormations: builds.map((b) => b.labels),
    pieces: [...reg.geo.entries()].map(([id, geo]) => ({ id, geo })),
    labels: [...reg.labels.values()],
    locks,
    views,
    drift,
  };
}

/** Rough footprint of a label on the ground, for framing: [x0, z0, x1, z1] relative to its anchor. */
export function labelFootprint(def: LabelDef): [number, number, number, number] {
  const wide = def.text.length * def.size * (def.font === 'display' || def.font === 'italic' ? 0.46 : 0.56);
  const w = def.maxWidth ? Math.min(def.maxWidth, wide) : wide;
  const lines = def.maxWidth ? Math.ceil(wide / def.maxWidth) : 1;
  const h = lines * def.size * 1.25;
  const x0 = def.anchorX === 'left' ? 0 : def.anchorX === 'center' ? -w / 2 : -w;
  const z0 = def.anchorY === 'top' ? 0 : def.anchorY === 'middle' ? -h / 2 : -h;
  return [x0, z0, x0 + w, z0 + h];
}

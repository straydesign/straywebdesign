import * as THREE from 'three';
import { EXTENTS, FORMATIONS, LABELS, LABEL_FORMATIONS, PIECES, VIEWS, labelFootprint } from './formations';

/**
 * Frames each formation for the canvas it is drawn in. The camera is solved,
 * not hand-placed: every corner of every piece and the footprint of every label
 * must land inside a safe rectangle of the screen, centred in it, as close as
 * that allows. So the same story frames itself on a 1440 column and a 390 phone.
 */

/** Screen-space rectangle in NDC ([-1, 1] both ways). */
export type Safe = { x0: number; x1: number; y0: number; y1: number };

/**
 * Desktop: the canvas is full-bleed so shadows never meet a hard edge; the
 * pieces frame into its right half, clear of the copy, under the fixed header.
 */
export const SAFE_DESKTOP: Safe = { x0: 0.02, x1: 0.9, y0: -0.74, y1: 0.66 };
/** Phone: the canvas is the top half of the screen, under the header. */
export const SAFE_PHONE: Safe = { x0: -0.92, x1: 0.92, y0: -0.8, y1: 0.58 };
/** Still captures sit in their own box, clear of any copy. */
export const SAFE_STILL: Safe = { x0: -0.86, x1: 0.86, y0: -0.82, y1: 0.82 };

export type Frame = { look: THREE.Vector3; dist: number; dir: THREE.Vector3 };

const UP = new THREE.Vector3(0, 1, 0);
const m = new THREE.Matrix4();
const box = new THREE.Box3();
const at = new THREE.Vector3();
const hq = new THREE.Quaternion();
const off = new THREE.Vector3();
const geoById = new Map(PIECES.map((p) => [p.id, p.geo]));
const labelById = new Map(LABELS.map((l) => [l.id, l]));

/** World-space points that must stay in frame, per formation. Static, built once. */
const POINTS: THREE.Vector3[][] = FORMATIONS.map((f, i) => {
  const out: THREE.Vector3[] = [];
  Object.entries(f).forEach(([id, pose]) => {
    if (!pose) return;
    const [lo, hi] = EXTENTS[geoById.get(id)!];
    box.min.fromArray(lo);
    box.max.fromArray(hi);
    m.compose(at.fromArray(pose.p), hq.fromArray(pose.q), new THREE.Vector3().fromArray(pose.s));
    for (let k = 0; k < 8; k++) {
      out.push(
        new THREE.Vector3(k & 1 ? box.max.x : box.min.x, k & 2 ? box.max.y : box.min.y, k & 4 ? box.max.z : box.min.z).applyMatrix4(m),
      );
    }
  });
  Object.entries(LABEL_FORMATIONS[i]).forEach(([id, lp]) => {
    if (!lp) return;
    const def = labelById.get(id)!;
    const host = lp.on ? f[lp.on] : undefined;
    const base = new THREE.Vector3().fromArray(lp.p);
    if (host) {
      hq.fromArray(host.q);
      base.applyQuaternion(hq).add(at.fromArray(host.p));
    }
    const [x0, z0, x1, z1] = labelFootprint(def);
    const turn = host ? hq : new THREE.Quaternion();
    for (const [x, z] of [[x0, z0], [x1, z0], [x0, z1], [x1, z1]]) {
      out.push(off.set(x, 0, z).applyQuaternion(turn).add(base).clone());
    }
  });
  return out;
});

export function viewDir(az: number, el: number, out = new THREE.Vector3()) {
  const a = THREE.MathUtils.degToRad(az);
  const e = THREE.MathUtils.degToRad(el);
  return out.set(Math.sin(a) * Math.cos(e), Math.sin(e), Math.cos(a) * Math.cos(e));
}

const f = new THREE.Vector3();
const r = new THREE.Vector3();
const u = new THREE.Vector3();
const v = new THREE.Vector3();

/** Solve the camera for formation `i` on a canvas of this aspect ratio. */
export function frameFor(i: number, aspect: number, vfov: number, safe: Safe): Frame {
  const { az, el } = VIEWS[i];
  const dir = viewDir(az, el);
  f.copy(dir).negate();
  r.crossVectors(f, UP).normalize();
  u.crossVectors(r, f).normalize();
  const tanV = Math.tan(THREE.MathUtils.degToRad(vfov / 2));
  const tanH = tanV * aspect;
  const pts = POINTS[i];

  const c = new THREE.Vector3();
  pts.forEach((p) => c.add(p));
  c.divideScalar(Math.max(pts.length, 1));

  const needed = (centre: THREE.Vector3) => {
    let d = 0.5;
    for (const p of pts) {
      v.subVectors(p, centre);
      const x = v.dot(r);
      const y = v.dot(u);
      const z = v.dot(f);
      d = Math.max(d, (x > 0 ? x / (safe.x1 * tanH) : x / (safe.x0 * tanH)) - z);
      d = Math.max(d, (y > 0 ? y / (safe.y1 * tanV) : y / (safe.y0 * tanV)) - z);
    }
    return d;
  };

  let dist = needed(c);
  for (let it = 0; it < 12; it++) {
    // Centre the formation inside the safe rectangle, then pull in as close as it allows.
    let x0 = Infinity;
    let x1 = -Infinity;
    let y0 = Infinity;
    let y1 = -Infinity;
    for (const p of pts) {
      v.subVectors(p, c);
      const depth = v.dot(f) + dist;
      const x = v.dot(r) / (depth * tanH);
      const y = v.dot(u) / (depth * tanV);
      x0 = Math.min(x0, x);
      x1 = Math.max(x1, x);
      y0 = Math.min(y0, y);
      y1 = Math.max(y1, y);
    }
    c.addScaledVector(r, ((x0 + x1) / 2 - (safe.x0 + safe.x1) / 2) * tanH * dist);
    c.addScaledVector(u, ((y0 + y1) / 2 - (safe.y0 + safe.y1) / 2) * tanV * dist);
    dist = needed(c);
  }
  return { look: c, dist, dir };
}

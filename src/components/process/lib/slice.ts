import * as THREE from 'three';
import { EXTENTS, SLICE, type Geo } from './kit';

/**
 * 9-slice for the slab pieces (Tile, Plate, Bar). A story sizes these by scale,
 * and a scaled mesh stretches its corners with it: a field four tiles wide had
 * corners four times as long as they were deep, and no two pieces agreed. Here
 * the corners keep one radius in metres whatever the size. Each vertex of the
 * modelled piece belongs to one corner; resizing moves the corners apart and
 * leaves their shape alone, so normals never change.
 *
 * The mesh itself stays at scale 1. Shadows and contact shadows read the same
 * positions, so nothing else has to know.
 */
export type Sliced = {
  geometry: THREE.BufferGeometry;
  /** Size as the story's scale, corner radius in metres (clamped to fit). */
  set(sx: number, sy: number, sz: number, rad: number): void;
};

export function sliced(source: THREE.BufferGeometry, geo: Geo, imageAspect?: number): Sliced {
  const spec = SLICE[geo];
  if (!spec) throw new Error(`${geo} is not a sliced piece`);
  const geometry = source.clone();
  const position = geometry.getAttribute('position') as THREE.BufferAttribute;
  const n = position.count;
  const [lo, hi] = EXTENTS[geo];
  const c = [(lo[0] + hi[0]) / 2, (lo[1] + hi[1]) / 2, (lo[2] + hi[2]) / 2];
  const h = [(hi[0] - lo[0]) / 2, (hi[1] - lo[1]) / 2, (hi[2] - lo[2]) / 2];

  // Per vertex: which corner it belongs to, the direction from that corner's
  // centre, how far the edge bevel pulls it in from the arc, and its drop from the face.
  const sign = new Int8Array(n * 3);
  const dir = new Float32Array(n * 2);
  const inset = new Float32Array(n);
  const drop = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const x = position.getX(i) - c[0];
    const y = position.getY(i) - c[1];
    const z = position.getZ(i) - c[2];
    const sx = x < 0 ? -1 : 1;
    const sy = y < 0 ? -1 : 1;
    const sz = z < 0 ? -1 : 1;
    sign.set([sx, sy, sz], i * 3);
    const ox = x - sx * (h[0] - spec.r);
    const oz = z - sz * (h[2] - spec.r);
    const m = Math.hypot(ox, oz) || 1;
    dir.set([ox / m, oz / m], i * 2);
    inset[i] = Math.max(0, spec.r - m);
    drop[i] = Math.max(0, h[1] - Math.abs(y));
  }

  const uv = imageAspect ? new THREE.BufferAttribute(new Float32Array(n * 2), 2) : null;
  if (uv) geometry.setAttribute('uv', uv);

  const last = [NaN, NaN, NaN, NaN];
  const set = (sx: number, sy: number, sz: number, rad: number) => {
    if (last[0] === sx && last[1] === sy && last[2] === sz && last[3] === rad) return;
    last[0] = sx;
    last[1] = sy;
    last[2] = sz;
    last[3] = rad;
    const hx = h[0] * sx;
    const hy = h[1] * sy;
    const hz = h[2] * sz;
    const r = Math.max(0, Math.min(rad, hx, hz));
    const kr = Math.min(1, r / spec.r);
    const kb = Math.min(1, hy / spec.b);
    // The picture covers the top face: cropped to fit, never stretched.
    const face = hx / Math.max(hz, 1e-6);
    const cu = imageAspect ? Math.min(1, face / imageAspect) : 1;
    const cv = imageAspect ? Math.min(1, imageAspect / face) : 1;
    for (let i = 0; i < n; i++) {
      const reach = r - inset[i] * kr;
      const x = sign[i * 3] * (hx - r) + dir[i * 2] * reach;
      const z = sign[i * 3 + 2] * (hz - r) + dir[i * 2 + 1] * reach;
      const y = sign[i * 3 + 1] * (hy - drop[i] * kb);
      position.setXYZ(i, c[0] * sx + x, c[1] * sy + y, c[2] * sz + z);
      if (uv) uv.setXY(i, 0.5 + (x / Math.max(hx, 1e-6)) * 0.5 * cu, 0.5 - (z / Math.max(hz, 1e-6)) * 0.5 * cv);
    }
    position.needsUpdate = true;
    if (uv) uv.needsUpdate = true;
  };

  return { geometry, set };
}

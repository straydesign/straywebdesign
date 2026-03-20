'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/* ── Seeded PRNG (mulberry32) ─────────────────────────────────── */
function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ── Types ────────────────────────────────────────────────────── */
interface Shard {
  polygon: string;
  cx: number;
  cy: number;
  distance: number;
  fallDelay: number;
  rotation: number;
  fallY: number;
  driftX: number;
  gradientAngle: number;
  fillOpacity: number;
}

interface CrackLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  angle: number;
}

/* ── Geometry ─────────────────────────────────────────────────── */
function polar(cx: number, cy: number, r: number, angle: number): [number, number] {
  return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
}

/* ── Glass shard generator ────────────────────────────────────── */
function generateShatterData(seed: number = 42) {
  const rng = mulberry32(seed);

  // Impact point — left side of hero, near "Shatter" text
  const IX = 18;
  const IY = 44;

  // Primary radial cracks (8 lines from impact, full length)
  const NUM_PRIMARY = 8;
  const primaryAngles: number[] = [];
  for (let i = 0; i < NUM_PRIMARY; i++) {
    const base = (i / NUM_PRIMARY) * Math.PI * 2;
    primaryAngles.push(base + (rng() - 0.5) * (Math.PI / NUM_PRIMARY) * 0.4);
  }

  // Secondary radial cracks (6 shorter lines, more fragmentation near impact)
  const NUM_SECONDARY = 6;
  const secondaryAngles: { angle: number; maxRing: number }[] = [];
  for (let i = 0; i < NUM_SECONDARY; i++) {
    const base = (i / NUM_SECONDARY) * Math.PI * 2 + Math.PI / NUM_PRIMARY;
    secondaryAngles.push({
      angle: base + (rng() - 0.5) * (Math.PI / NUM_SECONDARY) * 0.3,
      maxRing: 2 + Math.floor(rng() * 2), // only extend 2-3 rings
    });
  }

  // Merge all radials, noting which are short
  const allRadials: { angle: number; maxRing: number }[] = [
    ...primaryAngles.map((a) => ({ angle: a, maxRing: Infinity })),
    ...secondaryAngles,
  ];
  allRadials.sort((a, b) => a.angle - b.angle);

  // Concentric stress rings — tighter near impact (dense fragmentation)
  const RINGS = [0, 4, 10, 18, 30, 48, 72, 110, 160];

  const shards: Shard[] = [];

  for (let r = 0; r < RINGS.length - 1; r++) {
    // Collect radials active at this ring level
    const activeRadials = allRadials.filter((rad) => rad.maxRing >= r);
    if (activeRadials.length < 2) continue;

    for (let a = 0; a < activeRadials.length; a++) {
      const a1 = activeRadials[a].angle;
      const a2 = activeRadials[(a + 1) % activeRadials.length].angle;
      const rInner = RINGS[r];
      const rOuter = RINGS[r + 1];
      const perturbScale = (rOuter - rInner) * 0.08;

      // Four corners — perturbed for irregularity
      const p1 = polar(IX, IY, rInner + rng() * perturbScale, a1);
      const p2 = polar(IX, IY, rInner + rng() * perturbScale, a2);
      const p3 = polar(IX, IY, rOuter - rng() * perturbScale, a2);
      const p4 = polar(IX, IY, rOuter - rng() * perturbScale, a1);

      const pts: [number, number][] = [p1, p2, p3, p4];

      // Near impact, split some quads into triangles (glassier shapes)
      if (r < 3 && rng() > 0.45) {
        const triangles = rng() > 0.5
          ? [[p1, p2, p3], [p1, p3, p4]]
          : [[p1, p2, p4], [p2, p3, p4]];

        for (const tri of triangles) {
          pushShard(tri as [number, number][], rng, IX, IY, shards);
        }
      } else {
        pushShard(pts, rng, IX, IY, shards);
      }
    }
  }

  // Crack lines for the flash effect
  const cracks: CrackLine[] = primaryAngles.map((angle) => ({
    x1: IX,
    y1: IY,
    x2: IX + 170 * Math.cos(angle),
    y2: IY + 170 * Math.sin(angle),
    angle,
  }));

  // Add secondary crack lines (shorter)
  for (const sec of secondaryAngles) {
    const maxR = RINGS[Math.min(sec.maxRing + 1, RINGS.length - 1)];
    cracks.push({
      x1: IX,
      y1: IY,
      x2: IX + maxR * Math.cos(sec.angle),
      y2: IY + maxR * Math.sin(sec.angle),
      angle: sec.angle,
    });
  }

  return { shards, cracks };
}

function pushShard(
  pts: [number, number][],
  rng: () => number,
  ix: number,
  iy: number,
  shards: Shard[],
) {
  const cx = pts.reduce((s, p) => s + p[0], 0) / pts.length;
  const cy = pts.reduce((s, p) => s + p[1], 0) / pts.length;
  const dist = Math.hypot(cx - ix, cy - iy);

  shards.push({
    polygon: pts.map((p) => `${p[0].toFixed(1)}% ${p[1].toFixed(1)}%`).join(', '),
    cx,
    cy,
    distance: dist,
    // Center shards fall first — staggered outward
    fallDelay: 0.02 + (dist / 160) * 0.3 + rng() * 0.08,
    rotation: (rng() - 0.5) * 100,
    fallY: 100 + rng() * 60,
    // Horizontal drift — away from impact
    driftX: (cx - ix) * (0.4 + rng() * 0.5),
    gradientAngle: rng() * 360,
    fillOpacity: 0.12 + rng() * 0.18,
  });
}

/* ── Animation phases ─────────────────────────────────────────── */
type Phase = 'forming' | 'intact' | 'cracking' | 'shattering' | 'done';

/* ── Component ────────────────────────────────────────────────── */
interface GlassShatterProps {
  /** Seconds before the shatter triggers (after page load) */
  delay?: number;
}

export default function GlassShatter({ delay = 2.0 }: GlassShatterProps) {
  const [phase, setPhase] = useState<Phase>('forming');
  const prefersReducedMotion = useReducedMotion();
  const data = useMemo(() => generateShatterData(), []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const timers = [
      setTimeout(() => setPhase('intact'), 600),
      setTimeout(() => setPhase('cracking'), delay * 1000),
      setTimeout(() => setPhase('shattering'), delay * 1000 + 200),
      setTimeout(() => setPhase('done'), (delay + 4) * 1000),
    ];

    return () => timers.forEach(clearTimeout);
  }, [delay, prefersReducedMotion]);

  if (prefersReducedMotion || phase === 'done') return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
      aria-hidden="true"
    >
      {/* ── Impact flash ── */}
      <AnimatePresence>
        {phase === 'cracking' && (
          <motion.div
            className="absolute"
            style={{
              left: '18%',
              top: '44%',
              width: 40,
              height: 40,
              background:
                'radial-gradient(circle, rgba(255,255,255,0.9), rgba(200,220,255,0.5) 40%, transparent 70%)',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 6, opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>

      {/* ── Crack lines — flash from impact point ── */}
      <AnimatePresence>
        {phase === 'cracking' && (
          <motion.svg
            className="absolute inset-0 h-full w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            {data.cracks.map((c, i) => (
              <motion.line
                key={i}
                x1={`${c.x1}%`}
                y1={`${c.y1}%`}
                x2={`${c.x2}%`}
                y2={`${c.y2}%`}
                stroke="rgba(255,255,255,0.9)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.15, delay: i * 0.008, ease: 'easeOut' }}
              />
            ))}
          </motion.svg>
        )}
      </AnimatePresence>

      {/* ── Glass shards ── */}
      {data.shards.map((shard, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{
            clipPath: `polygon(${shard.polygon})`,
            background: `linear-gradient(${shard.gradientAngle}deg, rgba(255,255,255,${shard.fillOpacity}), rgba(180,210,255,${shard.fillOpacity * 0.4}), rgba(255,255,255,${shard.fillOpacity * 0.6}))`,
            filter: 'drop-shadow(0 0 0.5px rgba(255,255,255,0.5)) drop-shadow(0 0 3px rgba(200,220,255,0.12))',
            willChange: phase === 'shattering' ? 'transform, opacity' : 'auto',
          }}
          initial={{ opacity: 0, y: 0, x: 0, rotate: 0 }}
          animate={
            phase === 'shattering'
              ? {
                  y: `${shard.fallY}vh`,
                  x: shard.driftX,
                  rotate: shard.rotation,
                  opacity: [1, 0.7, 0],
                }
              : phase === 'intact' || phase === 'cracking'
                ? { opacity: 1 }
                : { opacity: 0 }
          }
          transition={
            phase === 'shattering'
              ? {
                  delay: shard.fallDelay,
                  duration: 1.5 + (shard.distance / 160) * 0.6,
                  ease: [0.55, 0, 1, 0.2],
                }
              : {
                  duration: 0.4,
                  delay: i * 0.005,
                }
          }
        />
      ))}
    </div>
  );
}

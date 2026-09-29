/**
 * The motion vocabulary for the scene: designed curves (CSS-style cubic béziers),
 * a critically damped follower for the scroll position, and the per-piece
 * timing windows that turn one transition into a choreographed beat.
 */

/** A CSS `cubic-bezier(x1, y1, x2, y2)` as a function of t in [0, 1]. */
export function bezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  const sx = (t: number) => ((ax * t + bx) * t + cx) * t;
  const dx = (t: number) => (3 * ax * t + 2 * bx) * t + cx;
  const sy = (t: number) => ((ay * t + by) * t + cy) * t;
  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 6; i++) {
      const err = sx(t) - x;
      const d = dx(t);
      if (Math.abs(err) < 1e-5) break;
      if (Math.abs(d) < 1e-6) break;
      t -= err / d;
    }
    // Bisection fallback where Newton stalls on flat ends.
    if (Math.abs(sx(t) - x) > 1e-4) {
      let lo = 0;
      let hi = 1;
      t = x;
      for (let i = 0; i < 24; i++) {
        if (sx(t) < x) lo = t;
        else hi = t;
        t = (lo + hi) / 2;
      }
    }
    return sy(t);
  };
}

/** Travel between two resting places: a slow, weighted lift and a long settle. */
export const TRAVEL = bezier(0.62, 0, 0.22, 1);
/** Arrivals that lock into place: expo-like out with a ~2% overshoot. */
export const LOCK = bezier(0.22, 1, 0.36, 1.08);
/** Arrivals that simply appear: expo out, no overshoot. */
export const ARRIVE = bezier(0.16, 1, 0.3, 1);
/** Leaving: accelerates away, no lingering. */
export const LEAVE = bezier(0.55, 0, 0.85, 0.3);
/** A heavy body under gravity: accelerates all the way to a hard stop. */
export const FALL = bezier(0.5, 0, 0.92, 0.55);
/** The camera: the gentlest in-out, so it never leads the eye away from a piece. */
export const GLIDE = bezier(0.45, 0, 0.35, 1);

export const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
/** Progress of t through the window [start, start + dur]. */
export const within = (t: number, start: number, dur: number) => clamp01((t - start) / dur);

/**
 * Critically damped spring toward `goal` (Unity SmoothDamp). Unlike an
 * exponential damp it starts from rest, so a flick of the wheel has weight
 * instead of a jump in velocity. Returns [value, velocity].
 */
export function smoothDamp(
  current: number,
  goal: number,
  velocity: number,
  smoothTime: number,
  dt: number,
): [number, number] {
  const omega = 2 / smoothTime;
  const x = omega * dt;
  const exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
  const change = current - goal;
  const temp = (velocity + omega * change) * dt;
  const v = (velocity - omega * temp) * exp;
  let out = goal + (change + temp) * exp;
  // Never overshoot the goal.
  if (goal - current > 0 === out > goal) {
    out = goal;
    return [out, 0];
  }
  return [out, v];
}

/** Travel that locks in on arrival: the same weighted lift, a ~2% settle at the end. */
export const TRAVEL_LOCK = bezier(0.6, 0, 0.24, 1.07);

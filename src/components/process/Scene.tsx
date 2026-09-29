'use client';

import { ContactShadows, Environment, Lightformer, Text, useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, type RefObject } from 'react';
import * as THREE from 'three';
import {
  FORMATIONS,
  HIDDEN_SCALE,
  LABELS,
  LABEL_FORMATIONS,
  LOCKS,
  PIECES,
  type Geo,
  type Ink,
  type LabelDef,
  type LabelPose,
  type Pose,
  type Tone,
} from './lib/formations';
import { SAFE_DESKTOP, SAFE_PHONE, SAFE_STILL, frameFor, type Frame } from './lib/framing';
import { ARRIVE, GLIDE, LEAVE, LOCK, TRAVEL, TRAVEL_LOCK, clamp01, smoothDamp, within } from './lib/motion';

const KIT = '/process-3d/kit.glb';
useGLTF.preload(KIT);

export const VFOV = 26;
/** Below this canvas width the story frames for a phone. */
export const PHONE_MAX = 900;

const FONTS: Record<LabelDef['font'], string> = {
  text: '/process-3d/fonts/plex-500.woff',
  strong: '/process-3d/fonts/plex-600.woff',
  display: '/process-3d/fonts/instrument-400.woff',
  italic: '/process-3d/fonts/instrument-italic.woff',
};

/** Matte throughout; a little roughness spread so neighbouring pieces never read as one plastic. */
const ROUGHNESS: Record<Geo, number> = {
  Tile: 0.8,
  Plate: 0.94,
  Bar: 0.72,
  Node: 0.7,
  Block: 0.66,
  Rod: 0.6,
  Pin: 0.5,
  Tick: 0.7,
  Phone: 0.58,
};
/** Hidden pieces of these shapes arrive from just above; the rest draw out along their own axis. */
const DROPS = new Set<Geo>(['Tile', 'Node', 'Block', 'Pin', 'Tick', 'Phone']);
/** How far a piece falls on arrival, metres. Pins are dropped from higher, point first. */
const DROP_HEIGHT: Partial<Record<Geo, number>> = { Pin: 0.95 };

type Palette = Record<Tone, THREE.Color> & Record<Ink, THREE.Color> & { shadow: number; contact: number; env: number };

function readPalette(): Palette {
  const css = getComputedStyle(document.documentElement);
  const color = (name: string) => new THREE.Color(css.getPropertyValue(name).trim() || '#cccccc');
  const num = (name: string, d: number) => parseFloat(css.getPropertyValue(name)) || d;
  return {
    base: color('--p-base'),
    paper: color('--p-paper'),
    lane: color('--p-lane'),
    accent: color('--p-accent'),
    soft: color('--p-soft'),
    done: color('--p-done'),
    warn: color('--p-warn'),
    device: color('--p-device'),
    ink: color('--p-ink'),
    ink2: color('--p-ink-2'),
    onFill: color('--p-on-fill'),
    accentInk: color('--p-accent-ink'),
    shadow: num('--p-shadow', 0.12),
    contact: num('--p-contact', 0.42),
    env: num('--p-env', 0.6),
  };
}

/** The palette follows the machine's light or dark setting, the way the page does. */
function usePalette() {
  const palette = useRef<Palette | null>(null);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const update = () => (palette.current = readPalette());
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return palette;
}

type Props = {
  /** Fractional formation index the page wants to show. */
  target: RefObject<number>;
  /** Skip damping and idle motion (still captures). */
  still?: boolean;
};

type TroikaText = THREE.Mesh & { fillOpacity: number; color: THREE.Color | string | number };

const FLAT = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2);
const Y = new THREE.Vector3(0, 1, 0);

function Kit({ target, still = false }: Props) {
  const { nodes } = useGLTF(KIT) as unknown as { nodes: Record<string, THREE.Mesh> };
  const { camera, size, gl, scene } = useThree();
  const palette = usePalette();
  const shadowMat = useRef<THREE.ShadowMaterial>(null);
  const shown = useRef(target.current ?? 0);
  const velocity = useRef(0);
  const meshes = useRef<(THREE.Mesh | null)[]>([]);
  const texts = useRef<(TroikaText | null)[]>([]);
  const pieceIndex = useMemo(() => new Map(PIECES.map((p, j) => [p.id, j])), []);

  // QA: the capture scripts wait on this, so no frame is taken before the kit and type exist.
  useEffect(() => {
    const w = window as Window & { __processReady?: boolean };
    const id = window.setTimeout(() => (w.__processReady = true), 400);
    return () => {
      window.clearTimeout(id);
      w.__processReady = false;
    };
  }, []);

  // Neutral tone mapping keeps the accent blue at the hue the token names.
  useEffect(() => {
    gl.toneMapping = THREE.NeutralToneMapping;
    gl.toneMappingExposure = 1;
    gl.outputColorSpace = THREE.SRGBColorSpace;
  }, [gl]);

  const materials = useMemo(
    () =>
      PIECES.map(
        (piece, j) =>
          new THREE.MeshStandardMaterial({
            roughness: ROUGHNESS[piece.geo] + (((j * 37) % 9) - 4) * 0.008,
            metalness: 0,
          }),
      ),
    [],
  );
  // Labels are set type, not lit objects: exact ink colours, no tone mapping.
  const textMaterials = useMemo(
    () => LABELS.map(() => new THREE.MeshBasicMaterial({ toneMapped: false, transparent: true, depthWrite: false })),
    [],
  );
  useEffect(
    () => () => {
      materials.forEach((mat) => mat.dispose());
      textMaterials.forEach((mat) => mat.dispose());
    },
    [materials, textMaterials],
  );

  // The camera is solved per formation for this canvas.
  const frames = useMemo<Frame[]>(() => {
    const aspect = size.width / Math.max(size.height, 1);
    const safe = still ? SAFE_STILL : size.width < PHONE_MAX ? SAFE_PHONE : SAFE_DESKTOP;
    return FORMATIONS.map((_, i) => frameFor(i, aspect, VFOV, safe));
  }, [size.width, size.height, still]);

  const tmp = useMemo(
    () => ({
      qa: new THREE.Quaternion(),
      qb: new THREE.Quaternion(),
      qh: new THREE.Quaternion(),
      drift: new THREE.Quaternion(),
      e: new THREE.Euler(),
      ca: new THREE.Color(),
      cb: new THREE.Color(),
      look: new THREE.Vector3(),
      dir: new THREE.Vector3(),
      pa: new THREE.Vector3(),
      pb: new THREE.Vector3(),
      off: new THREE.Vector3(),
    }),
    [],
  );

  useFrame((state, delta) => {
    const pal = palette.current;
    if (!pal) return;
    scene.environmentIntensity = pal.env;
    const max = FORMATIONS.length - 1;
    const goal = Math.min(max, Math.max(0, target.current ?? 0));
    // Never negative (a stepped capture clock can start behind three's own) and never a jump.
    const dt = Math.min(Math.max(delta, 0), 0.1);
    if (still) {
      shown.current = goal;
    } else {
      // Critically damped: starts from rest, arrives without overshoot. Weight, not float.
      [shown.current, velocity.current] = smoothDamp(shown.current, goal, velocity.current, 0.5, dt);
      if (!Number.isFinite(shown.current)) [shown.current, velocity.current] = [goal, 0];
    }
    const f = shown.current;
    const i = Math.min(max - 1, Math.floor(f));
    const t = f - i;
    const A = FORMATIONS[i];
    const B = FORMATIONS[i + 1];
    const locks = LOCKS[i + 1];
    const introWeight = still ? 0 : 1 - THREE.MathUtils.smoothstep(f, 0, 0.34);
    const time = still ? 0 : state.clock.elapsedTime;

    PIECES.forEach((piece, j) => {
      const mesh = meshes.current[j];
      if (!mesh) return;
      const a = A[piece.id];
      const b = B[piece.id];
      if (!a && !b) {
        mesh.visible = false;
        return;
      }
      const hidden = HIDDEN_SCALE[piece.geo];
      const from: Pose = a ?? { ...b!, s: [b!.s[0] * hidden[0], b!.s[1] * hidden[1], b!.s[2] * hidden[2]] };
      const to: Pose = b ?? { ...a!, s: [a!.s[0] * hidden[0], a!.s[1] * hidden[1], a!.s[2] * hidden[2]] };

      // Each piece gets its own window inside the transition, by its slot in the story.
      let k: number;
      let w: number;
      let lift = 0;
      let drop = 0;
      if (!b) {
        w = within(t, a!.at * 0.12, 0.3);
        k = LEAVE(w);
        if (DROPS.has(piece.geo)) drop = k;
      } else if (!a) {
        const start = 0.12 + b.at * 0.52;
        w = within(t, start, Math.min(0.32, 1 - start));
        k = locks ? LOCK(w) : ARRIVE(w);
        if (DROPS.has(piece.geo)) drop = 1 - k;
      } else {
        const start = 0.04 + b.at * 0.34;
        w = within(t, start, Math.min(0.58, 1 - start));
        k = locks ? TRAVEL_LOCK(w) : TRAVEL(w);
        if (piece.geo !== 'Plate' && piece.geo !== 'Rod') {
          // Picked up and set down: moving pieces arc over their neighbours instead of sliding through.
          const dx = to.p[0] - from.p[0];
          const dz = to.p[2] - from.p[2];
          lift = Math.sin(Math.PI * clamp01(k)) * Math.min(0.32, Math.hypot(dx, dz) * 0.14);
        }
      }

      const s = (n: 0 | 1 | 2) => THREE.MathUtils.lerp(from.s[n], to.s[n], k);
      let sx = s(0);
      let sy = s(1);
      let sz = s(2);
      if (DROPS.has(piece.geo) && (!a || !b)) {
        // Arrive from just above at nearly full size, rather than inflating from a point.
        const g = piece.geo === 'Pin' && !a ? 1 : 0.25 + 0.75 * (1 - Math.min(1, drop));
        const full = (a ?? b)!.s;
        [sx, sy, sz] = [full[0] * g, full[1] * g, full[2] * g];
        if (drop > 0.985) {
          mesh.visible = false;
          return;
        }
      }
      // A piece collapsed along one axis still shows its cross-section; hide it outright.
      if (Math.min(sx, sy, sz) < 0.004) {
        mesh.visible = false;
        return;
      }

      mesh.visible = true;
      mesh.scale.set(sx, sy, sz);
      mesh.position.set(
        THREE.MathUtils.lerp(from.p[0], to.p[0], k),
        THREE.MathUtils.lerp(from.p[1], to.p[1], k) + lift + drop * (DROP_HEIGHT[piece.geo] ?? 0.42),
        THREE.MathUtils.lerp(from.p[2], to.p[2], k),
      );
      tmp.qa.fromArray(from.q);
      tmp.qb.fromArray(to.q);
      mesh.quaternion.slerpQuaternions(tmp.qa, tmp.qb, k);

      // The motion layer keeps turning while it rests over the hero.
      const spin = THREE.MathUtils.lerp(from.spin ?? 0, to.spin ?? 0, k);
      if (spin) {
        tmp.drift.setFromAxisAngle(Y, time * spin);
        mesh.quaternion.premultiply(tmp.drift);
        mesh.position.y += Math.sin(time * 1.1 + j) * 0.018;
      }

      // The one ambient loop before the story starts: the kit drifts while nothing is decided.
      if (introWeight > 0) {
        mesh.position.y += Math.sin(time * 0.42 + j * 1.7) * 0.05 * introWeight;
        tmp.drift.setFromEuler(tmp.e.set(0, Math.sin(time * 0.2 + j) * 0.28 * introWeight, 0));
        mesh.quaternion.premultiply(tmp.drift);
      }

      // Colour: a tinted piece arrives in its previous tone and changes on its cue.
      let cFrom: Tone = from.c;
      let colorK = within(w, 0.35, 0.65);
      if (b?.tint !== undefined) {
        cFrom = a ? a.c : 'base';
        colorK = within(t, b.tint, 0.14);
      }
      tmp.ca.copy(pal[cFrom]);
      tmp.cb.copy(pal[to.c]);
      materials[j].color.copy(tmp.ca.lerp(tmp.cb, colorK));
    });

    // Labels ride their piece (or the ground): out before the pieces move, in once they have landed.
    const LA = LABEL_FORMATIONS[i];
    const LB = LABEL_FORMATIONS[i + 1];
    LABELS.forEach((def, n) => {
      const text = texts.current[n];
      if (!text) return;
      const la = LA[def.id];
      const lb = LB[def.id];
      if (!la && !lb) {
        text.visible = false;
        return;
      }
      let op = 1;
      if (!lb) op = 1 - within(t, 0, 0.16);
      else if (!la) op = within(t, 0.46 + lb.at * 0.38, 0.14);
      const place = (lp: LabelPose, out: THREE.Vector3, q: THREE.Quaternion): boolean => {
        if (!lp.on) {
          out.fromArray(lp.p);
          q.identity();
          return true;
        }
        const host = meshes.current[pieceIndex.get(lp.on)!];
        if (!host?.visible) return false;
        q.copy(host.quaternion);
        out.fromArray(lp.p).applyQuaternion(q).add(host.position);
        return true;
      };
      let ok: boolean;
      if (la && lb) {
        const okA = place(la, tmp.pa, tmp.qa);
        const okB = place(lb, tmp.pb, tmp.qb);
        ok = okA || okB;
        const kk = la.on && la.on === lb.on ? 1 : TRAVEL(within(t, 0.04, 0.6));
        if (okA && okB) {
          text.position.lerpVectors(tmp.pa, tmp.pb, kk);
          tmp.qh.slerpQuaternions(tmp.qa, tmp.qb, kk);
        } else {
          text.position.copy(okA ? tmp.pa : tmp.pb);
          tmp.qh.copy(okA ? tmp.qa : tmp.qb);
        }
      } else {
        ok = place((la ?? lb)!, text.position, tmp.qh);
      }
      if (!ok || op <= 0.002) {
        text.visible = false;
        return;
      }
      text.visible = true;
      text.position.y += (1 - op) * 0.035;
      text.quaternion.multiplyQuaternions(tmp.qh, FLAT);
      text.fillOpacity = op;
      text.color = pal[def.ink];
    });

    // Camera: a slow turn and dolly between solved frames, horizon level throughout.
    const fa = frames[i];
    const fb = frames[i + 1];
    const kc = GLIDE(t);
    tmp.dir.lerpVectors(fa.dir, fb.dir, kc).normalize();
    tmp.look.lerpVectors(fa.look, fb.look, kc);
    const dist = THREE.MathUtils.lerp(fa.dist, fb.dist, kc);
    camera.position.copy(tmp.look).addScaledVector(tmp.dir, dist);
    camera.lookAt(tmp.look);

    if (shadowMat.current) shadowMat.current.opacity = pal.shadow;
  });

  return (
    <>
      {/* A soft studio: one broad key overhead, a cool fill, a neutral bounce off the floor. */}
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={2.2} position={[-2, 6, 3]} rotation-x={Math.PI / 2.4} scale={[10, 6, 1]} />
        <Lightformer form="rect" intensity={0.7} color="#dfe7f5" position={[6, 2, -1]} rotation-y={-Math.PI / 2} scale={[8, 4, 1]} />
        <Lightformer form="rect" intensity={0.45} color="#eeeef0" position={[0, -2, 0]} rotation-x={-Math.PI / 2} scale={[12, 12, 1]} />
      </Environment>
      <hemisphereLight args={['#ffffff', '#c4c7ce', 0.7]} />
      <directionalLight
        position={[-3.5, 7, 4.5]}
        intensity={1.6}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
        shadow-camera-near={1}
        shadow-camera-far={20}
        shadow-bias={-0.0002}
        shadow-normalBias={0.02}
      />
      <mesh rotation-x={-Math.PI / 2} position-y={-0.001} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <shadowMaterial ref={shadowMat} transparent opacity={0.12} />
      </mesh>
      {PIECES.map((piece, j) => (
        <mesh
          key={piece.id}
          ref={(mesh) => {
            meshes.current[j] = mesh;
          }}
          geometry={nodes[piece.geo].geometry}
          material={materials[j]}
          castShadow
          receiveShadow={piece.geo === 'Plate' || piece.geo === 'Tile'}
          visible={false}
        />
      ))}
      {LABELS.map((def, n) => (
        <Text
          key={def.id}
          ref={(mesh: TroikaText | null) => {
            texts.current[n] = mesh;
          }}
          font={FONTS[def.font]}
          fontSize={def.size}
          anchorX={def.anchorX}
          anchorY={def.anchorY}
          maxWidth={def.maxWidth}
          textAlign={def.anchorX === 'center' ? 'center' : 'left'}
          lineHeight={1.2}
          material={textMaterials[n]}
          raycast={() => null}
          visible={false}
          renderOrder={2}
        >
          {def.text}
        </Text>
      ))}
    </>
  );
}

/**
 * Contact shadows seat each piece on the ground. Mounted after the kit so its
 * depth pass runs after the kit has moved this frame.
 */
function Ground() {
  const palette = usePalette();
  const group = useRef<THREE.Group>(null);
  const mat = useRef<THREE.MeshBasicMaterial | null>(null);
  useFrame(() => {
    if (!mat.current && group.current) {
      group.current.traverse((o) => {
        const material = (o as THREE.Mesh).material as THREE.MeshBasicMaterial | undefined;
        if (!mat.current && material?.map) mat.current = material;
      });
    }
    if (mat.current && palette.current) mat.current.opacity = palette.current.contact;
  });
  return (
    <group ref={group}>
      <ContactShadows position={[0, 0, 0]} scale={10} resolution={1024} far={0.55} blur={1.5} opacity={0.42} color="#1b1f2a" />
    </group>
  );
}

export default function Scene(props: Props) {
  return (
    <>
      <Kit {...props} />
      <Ground />
    </>
  );
}

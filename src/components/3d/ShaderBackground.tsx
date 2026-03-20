'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { ShaderMaterial, Vector2 } from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  varying vec2 vUv;

  // Simplex-like noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;

    // Cursor influence
    vec2 mouseInfluence = (uMouse - 0.5) * 0.1;
    uv += mouseInfluence * smoothstep(0.5, 0.0, length(uv - uMouse));

    float t = uTime * 0.15;

    // Layer noise fields
    float n1 = snoise(uv * 2.0 + t);
    float n2 = snoise(uv * 3.0 - t * 0.7);
    float n3 = snoise(uv * 1.5 + vec2(t * 0.5, -t * 0.3));

    // Color palette: navy → electric blue → purple
    vec3 navy    = vec3(0.059, 0.090, 0.165);
    vec3 electric = vec3(0.231, 0.510, 0.965);
    vec3 purple  = vec3(0.545, 0.361, 0.965);
    vec3 dark    = vec3(0.020, 0.030, 0.060);

    float blend1 = smoothstep(-0.3, 0.6, n1);
    float blend2 = smoothstep(-0.2, 0.5, n2);
    float blend3 = smoothstep(-0.1, 0.4, n3);

    vec3 color = mix(dark, navy, blend1);
    color = mix(color, electric * 0.3, blend2 * 0.4);
    color = mix(color, purple * 0.2, blend3 * 0.3);

    // Subtle vignette
    float vignette = 1.0 - smoothstep(0.3, 1.0, length(uv - 0.5) * 1.2);
    color *= (0.7 + vignette * 0.3);

    gl_FragColor = vec4(color, 1.0);
  }
`;

interface ShaderBackgroundProps {
  mousePosition?: { x: number; y: number };
}

export default function ShaderBackground({ mousePosition }: ShaderBackgroundProps) {
  const materialRef = useRef<ShaderMaterial>(null);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new Vector2(0.5, 0.5) },
      uResolution: { value: new Vector2(1, 1) },
    }),
    []
  );

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    if (mousePosition) {
      materialRef.current.uniforms.uMouse.value.set(
        mousePosition.x,
        mousePosition.y
      );
    }
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]} position={[0, 0, -2]} renderOrder={-1}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
}

'use client';

import { Component, Suspense, useCallback, useRef, useState, type ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import { useReducedMotion } from 'framer-motion';
import StrayLogo3D from './StrayLogo3D';
import ShaderBackground from './ShaderBackground';

class SceneErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function SceneContent({
  mousePosition,
}: {
  mousePosition: { x: number; y: number };
}) {
  return (
    <>
      <ShaderBackground mousePosition={mousePosition} />
      <group position={[0, 0, 1]}>
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
          <StrayLogo3D />
        </Float>
      </group>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight position={[-3, -2, 4]} intensity={0.4} color="#8B5CF6" />
      <Environment preset="city" environmentIntensity={0.6} />
    </>
  );
}

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const prefersReducedMotion = useReducedMotion();

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (prefersReducedMotion || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: 1 - (e.clientY - rect.top) / rect.height,
      });
    },
    [prefersReducedMotion]
  );

  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy via-slate-900 to-navy" />
    );
  }

  const fallback = (
    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy via-slate-900 to-navy" />
  );

  return (
    <SceneErrorBoundary fallback={fallback}>
      <div
        ref={containerRef}
        className="absolute inset-0 -z-10"
        onPointerMove={handlePointerMove}
      >
        <Canvas
          gl={{ antialias: true, alpha: false }}
          camera={{ position: [0, 0, 8], fov: 45 }}
          dpr={[1, 1.5]}
        >
          <Suspense fallback={null}>
            <SceneContent mousePosition={mousePosition} />
          </Suspense>
        </Canvas>
      </div>
    </SceneErrorBoundary>
  );
}

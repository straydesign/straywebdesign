'use client';

import { Component, Suspense, useCallback, useRef, useState, type ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { useReducedMotion } from 'framer-motion';
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
    <ShaderBackground mousePosition={mousePosition} />
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

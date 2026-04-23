'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Grid } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import type { Group, Mesh } from 'three';

function WireframeBeast() {
  const group = useRef<Group>(null);
  const inner = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.elapsedTime * 0.2;
      group.current.rotation.x = Math.sin(clock.elapsedTime * 0.3) * 0.12;
    }
    if (inner.current) {
      inner.current.rotation.y = -clock.elapsedTime * 0.4;
      inner.current.rotation.z = clock.elapsedTime * 0.15;
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <torusKnotGeometry args={[1.4, 0.35, 180, 20, 2, 3]} />
        <meshBasicMaterial color="#00ccff" wireframe wireframeLinewidth={1} />
      </mesh>
      <mesh ref={inner} scale={0.65}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#ff3388" wireframe />
      </mesh>
      <mesh scale={2.6}>
        <sphereGeometry args={[1, 24, 16]} />
        <meshBasicMaterial color="#224466" wireframe transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

export default function WireframeScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0.8, 6], fov: 50 }}
      gl={{ antialias: true }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <color attach="background" args={['#030510']} />
      <fog attach="fog" args={['#030510', 5, 16]} />

      <WireframeBeast />

      <Grid
        position={[0, -2.2, 0]}
        args={[30, 30]}
        cellSize={0.6}
        cellThickness={0.6}
        cellColor="#1a3a5c"
        sectionSize={3}
        sectionThickness={1}
        sectionColor="#00ccff"
        fadeDistance={25}
        fadeStrength={1}
        infiniteGrid
      />

      <EffectComposer multisampling={0}>
        <Bloom intensity={1.4} luminanceThreshold={0.1} luminanceSmoothing={0.5} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}

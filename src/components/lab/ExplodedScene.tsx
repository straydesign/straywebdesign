'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, MeshReflectorMaterial } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import gsap from 'gsap';
import type { Group, Mesh } from 'three';

function ExplodedTower() {
  const group = useRef<Group>(null);
  const slabs = useRef<(Mesh | null)[]>([]);
  const progressRef = useRef({ t: 0 });

  useEffect(() => {
    const tween = gsap.to(progressRef.current, {
      t: 1,
      duration: 3.2,
      ease: 'power3.inOut',
      yoyo: true,
      repeat: -1,
      repeatDelay: 0.6,
    });
    return () => {
      tween.kill();
    };
  }, []);

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.elapsedTime * 0.25;
    }
    const t = progressRef.current.t;
    slabs.current.forEach((m, idx) => {
      if (!m) return;
      const baseY = (idx - 3) * 0.25;
      const spread = t * (1 + idx * 0.15);
      m.position.y = baseY + spread * (idx - 3) * 0.35;
      m.rotation.z = t * (idx % 2 === 0 ? 0.18 : -0.18);
      m.position.x = Math.sin(idx * 1.3) * t * 0.35;
    });
  });

  const slabCount = 7;
  const colors = ['#ff4488', '#ff7755', '#ffaa33', '#ffdd33', '#66ddcc', '#5599ff', '#aa77ff'];

  return (
    <group ref={group} position={[0, 0, 0]}>
      {Array.from({ length: slabCount }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            slabs.current[i] = el;
          }}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[1.8 - i * 0.05, 0.14, 1.8 - i * 0.05]} />
          <meshStandardMaterial
            color={colors[i]}
            metalness={0.7}
            roughness={0.25}
            emissive={colors[i]}
            emissiveIntensity={0.35}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function ExplodedScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      shadows
      camera={{ position: [3.5, 2, 5.5], fov: 42 }}
      gl={{ antialias: true }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <color attach="background" args={['#080410']} />
      <fog attach="fog" args={['#080410', 6, 18]} />

      <Environment preset="city" />
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
      <pointLight position={[-4, 2, 2]} color="#ff6688" intensity={30} distance={8} />

      <ExplodedTower />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.6, 0]}>
        <planeGeometry args={[30, 30]} />
        <MeshReflectorMaterial
          mirror={0.45}
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={1.2}
          color="#0a0612"
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>

      <EffectComposer multisampling={0}>
        <Bloom intensity={0.9} luminanceThreshold={0.5} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}

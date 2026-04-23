'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, MeshTransmissionMaterial, Float } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { Vector2, type Group } from 'three';

function Orb({
  position,
  scale = 1,
  color = '#ffffff',
}: {
  position: [number, number, number];
  scale?: number;
  color?: string;
}) {
  const ref = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.15;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={1.2}>
      <group ref={ref} position={position} scale={scale}>
        <mesh>
          <icosahedronGeometry args={[1, 4]} />
          <MeshTransmissionMaterial
            thickness={0.6}
            roughness={0.05}
            transmission={1}
            ior={1.45}
            chromaticAberration={0.25}
            distortion={0.25}
            distortionScale={0.4}
            temporalDistortion={0.2}
            color={color}
            backside
          />
        </mesh>
      </group>
    </Float>
  );
}

export default function ChromeScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 7], fov: 45 }}
      gl={{ antialias: true }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <color attach="background" args={['#0a0612']} />
      <fog attach="fog" args={['#0a0612', 8, 20]} />

      <Environment preset="sunset" />
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <pointLight position={[-4, 2, 3]} color="#ff4488" intensity={40} distance={10} />
      <pointLight position={[4, -2, 3]} color="#44aaff" intensity={40} distance={10} />

      <Orb position={[-2.2, 0.4, 0]} scale={1.1} color="#ffeaff" />
      <Orb position={[2.0, -0.3, -0.5]} scale={0.9} color="#e6f3ff" />
      <Orb position={[0.2, 1.2, -1.5]} scale={0.7} color="#ffffff" />
      <Orb position={[-0.8, -1.4, 0.8]} scale={0.5} color="#ffd9f5" />

      <EffectComposer multisampling={0}>
        <Bloom intensity={1.2} luminanceThreshold={0.4} mipmapBlur />
        <ChromaticAberration
          offset={new Vector2(0.0015, 0.0015)}
          blendFunction={BlendFunction.NORMAL}
          radialModulation={false}
          modulationOffset={0}
        />
      </EffectComposer>
    </Canvas>
  );
}

'use client';

import { Canvas } from '@react-three/fiber';
import { Sparkles, Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

export default function ParticleScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{ antialias: true, alpha: false }}
      style={{ position: 'absolute', inset: 0, background: '#050812' }}
    >
      <color attach="background" args={['#050812']} />
      <fog attach="fog" args={['#050812', 6, 18]} />

      <Environment preset="night" />

      <Sparkles
        count={400}
        scale={[12, 8, 8]}
        size={3}
        speed={0.25}
        opacity={0.9}
        color="#7fd4ff"
      />
      <Sparkles
        count={80}
        scale={[14, 10, 10]}
        size={8}
        speed={0.15}
        opacity={0.6}
        color="#ffffff"
      />

      <EffectComposer multisampling={0}>
        <Bloom intensity={0.9} luminanceThreshold={0.2} luminanceSmoothing={0.6} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}

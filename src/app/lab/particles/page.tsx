'use client';

import dynamic from 'next/dynamic';
import DemoShell from '@/components/lab/DemoShell';

const ParticleScene = dynamic(() => import('@/components/lab/ParticleScene'), {
  ssr: false,
});

export default function ParticlesPage() {
  return (
    <DemoShell
      title="Particle field"
      subtitle="400 GPU-instanced sparkles + 80 larger bokeh highlights, bloom post-process. Renders at 60fps on mobile."
    >
      <ParticleScene />
    </DemoShell>
  );
}

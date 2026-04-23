'use client';

import dynamic from 'next/dynamic';
import DemoShell from '@/components/lab/DemoShell';

const ExplodedScene = dynamic(() => import('@/components/lab/ExplodedScene'), {
  ssr: false,
});

export default function ExplodedPage() {
  return (
    <DemoShell
      title="Exploded tower"
      subtitle="Seven glowing metallic slabs on a GSAP ping-pong timeline. Same technique Erie Carbonic uses for the CO₂ tank — swap slabs for any pre-modeled shells."
    >
      <ExplodedScene />
    </DemoShell>
  );
}

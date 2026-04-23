'use client';

import dynamic from 'next/dynamic';
import DemoShell from '@/components/lab/DemoShell';

const WireframeScene = dynamic(() => import('@/components/lab/WireframeScene'), {
  ssr: false,
});

export default function WireframePage() {
  return (
    <DemoShell
      title="Wireframe creature"
      subtitle="Counter-rotating torus knot + icosahedron on an infinite tron grid. Swap in a Quaternius T-Rex .glb and this becomes peachweb's scene 3."
    >
      <WireframeScene />
    </DemoShell>
  );
}

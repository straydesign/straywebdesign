'use client';

import dynamic from 'next/dynamic';
import DemoShell from '@/components/lab/DemoShell';

const ChromeScene = dynamic(() => import('@/components/lab/ChromeScene'), {
  ssr: false,
});

export default function ChromePage() {
  return (
    <DemoShell
      title="Chrome orbs"
      subtitle="Four procedural glass spheres with IOR-correct refraction, under sunset HDR environment lighting. Zero downloaded assets."
    >
      <ChromeScene />
    </DemoShell>
  );
}

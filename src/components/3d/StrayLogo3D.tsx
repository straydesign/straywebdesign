'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import {
  CatmullRomCurve3,
  TubeGeometry,
  Vector3,
  type Mesh,
  type Group,
} from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';

const LOGO_SVG_PATH =
  'M39.33,12.75c13.44.07,17.56-.07,17.66.67.11.83-4.89,2.3-6.92,2.83-3.84.99-12.62,4.3-12.43,5.65.38,2.66,15.63,2.58,19.49,2.54,38-.34,82.24-4.93,82.36-4.15.05.31-10.58,3.21-25.85,5.28-14,1.9-25.43,2.23-26.7,7-.41,1.53.05,3.65,1.22,7.95.7,2.58,2.02,6.35,3.56,11.54.1.33.46,1.57.55,3.23.1,1.86-.11,4.71-.91,4.87-.78.16-1.88-2.33-2.74-4.27-4.16-9.27-6.29-13.86-7.78-15.38-3.2-3.26-7.81-3.4-17.05-3.67-.62-.02-5.85-.1-12.31,1.61-5.28,1.39-6.39,2.66-6.86,3.65-1,2.09-.26,4.91.53,7.94.48,1.82,1.03,3.64,1.35,5.5.08.45.39,1.25.34,2.34,0,.12-.15,2.7-.99,2.9-1.09.26-3.46-4.67-8.14-14.54-.17-.35-1.96-4.14-4.87-8.62-1.32-2.02-3.24-4.72-6.38-5.66-2.57-.77-3.54.08-8.17.53-2.64.26-8.48.82-11.44-2.54-2.21-2.5-1.79-6-1.7-6.64.57-4.02,3.76-6.36,5-7.26,1.62-1.18,4.72-2.96,18.74-3.33,2.6-.07,2.7-.01,10.46.03h-.02,0Z';

// SVG viewBox: 0 0 144 72 → center at (72, 36)
const SVG_CENTER_X = 72;
const SVG_CENTER_Y = 36;

function extractCurvePoints(): Vector3[] | null {
  try {
    const loader = new SVGLoader();
    const svgMarkup = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 72"><path d="${LOGO_SVG_PATH}" /></svg>`;
    const svgData = loader.parse(svgMarkup);

    if (svgData.paths.length === 0) return null;

    const path = svgData.paths[0];
    if (path.subPaths.length === 0) return null;

    // Get high-resolution points from the SVG path
    const points2D = path.subPaths[0].getPoints(200);
    if (points2D.length < 2) return null;

    // Convert to 3D points, centering and flipping Y (SVG Y is inverted vs Three.js)
    return points2D.map(
      (p) => new Vector3(p.x - SVG_CENTER_X, -(p.y - SVG_CENTER_Y), 0)
    );
  } catch {
    return null;
  }
}

export default function StrayLogo3D() {
  const groupRef = useRef<Group>(null);
  const { size } = useThree();

  // Responsive scale: shrink on smaller viewports
  const baseScale = 0.06;
  const responsiveScale =
    size.width < 600
      ? baseScale * 0.5
      : size.width < 900
        ? baseScale * 0.7
        : baseScale;

  const geometry = useMemo(() => {
    const points = extractCurvePoints();
    if (!points) return null;

    // Create a smooth curve through the path points
    const curve = new CatmullRomCurve3(points, false, 'centripetal', 0.5);

    // TubeGeometry: follows the path as a 3D tube
    // (curve, tubular segments, radius, radial segments, closed)
    return new TubeGeometry(curve, 300, 1.8, 8, false);
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.15;
    groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.05;
  });

  if (!geometry) return null;

  return (
    <group ref={groupRef} scale={responsiveScale}>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color="#3B82F6"
          metalness={0.8}
          roughness={0.15}
          envMapIntensity={1.5}
        />
      </mesh>
    </group>
  );
}

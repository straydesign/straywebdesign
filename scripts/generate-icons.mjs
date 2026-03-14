import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const OUT_DIR = path.resolve('public/images/icons');
fs.mkdirSync(OUT_DIR, { recursive: true });

const ELECTRIC = '#3B82F6';
const ELECTRIC_LIGHT = '#DBEAFE';
const WHITE = '#FFFFFF';
const SIZE = 512;
const ICON_SIZE = 200;
const CORNER = 80;

const SERVICES = [
  {
    name: 'speed',
    label: 'Enterprise Speed',
    // Zap icon
    paths: `<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>`,
  },
  {
    name: 'accessibility',
    label: 'Accessibility',
    // Accessibility icon
    paths: `<circle cx="16" cy="4" r="1"/><path d="m18 19 1-7-6 1"/><path d="m5 8 3-3 5.5 3-2.36 3.5"/><path d="M4.24 14.5a5 5 0 0 0 6.88 6"/><path d="M13.76 17.5a5 5 0 0 0-6.88-6"/>`,
  },
  {
    name: 'ai-ready',
    label: 'AI-Ready',
    // Brain icon
    paths: `<path d="M12 18V5"/><path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4"/><path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5"/><path d="M17.997 5.125a4 4 0 0 1 2.526 5.77"/><path d="M18 18a4 4 0 0 0 2-7.464"/><path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517"/><path d="M6 18a4 4 0 0 1-2-7.464"/><path d="M6.003 5.125a4 4 0 0 0-2.526 5.77"/>`,
  },
  {
    name: 'mobile',
    label: 'Mobile Experience',
    // Smartphone icon
    paths: `<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>`,
  },
  {
    name: 'ai-receptionist',
    label: 'AI Receptionist',
    // MessageSquare icon
    paths: `<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/>`,
  },
];

// Generate square service icons
for (const service of SERVICES) {
  const offset = (SIZE - ICON_SIZE) / 2;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <rect width="${SIZE}" height="${SIZE}" rx="${CORNER}" fill="${ELECTRIC_LIGHT}"/>
  <g transform="translate(${offset}, ${offset}) scale(${ICON_SIZE / 24})"
     fill="none" stroke="${ELECTRIC}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    ${service.paths}
  </g>
</svg>`;

  const svgPath = path.join(OUT_DIR, `service-${service.name}.svg`);
  fs.writeFileSync(svgPath, svg);
  console.log(`Created: ${svgPath}`);
}

// Generate logo with text
// Read the existing square logo SVG and extract the logo graphic
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="640" viewBox="0 0 512 640">
  <rect width="512" height="640" rx="0" fill="${WHITE}"/>

  <!-- Logo mark area (centered, 320x320) -->
  <g transform="translate(96, 40)">
    <!-- Rounded square background -->
    <rect width="320" height="320" rx="64" fill="${ELECTRIC}"/>

    <!-- Stylized "S" letterform for Stray -->
    <g transform="translate(80, 60)" fill="${WHITE}">
      <!-- Top bar -->
      <rect x="0" y="0" width="160" height="36" rx="18"/>
      <!-- Middle bar -->
      <rect x="0" y="82" width="160" height="36" rx="18"/>
      <!-- Bottom bar -->
      <rect x="0" y="164" width="160" height="36" rx="18"/>
      <!-- Right connector top -->
      <rect x="124" y="0" width="36" height="118" rx="18"/>
      <!-- Left connector bottom -->
      <rect x="0" y="82" width="36" height="118" rx="18"/>
    </g>
  </g>

  <!-- "stray web design" text -->
  <text x="256" y="430" text-anchor="middle"
        font-family="Outfit, system-ui, sans-serif" font-weight="700" font-size="48" fill="#0F172A"
        letter-spacing="0.5">stray web design</text>

  <!-- Tagline -->
  <text x="256" y="475" text-anchor="middle"
        font-family="Inter, system-ui, sans-serif" font-weight="400" font-size="22" fill="#94A3B8"
        letter-spacing="0.3">Enterprise-Grade Websites</text>

  <!-- Location -->
  <text x="256" y="510" text-anchor="middle"
        font-family="Inter, system-ui, sans-serif" font-weight="600" font-size="18" fill="${ELECTRIC}"
        letter-spacing="2">ERIE, PA</text>
</svg>`;

// Actually, let's use the REAL logo. Extract just the logo mark from the existing SVG
// and compose it with text below.

// Better approach: create a composite that references the existing logo
const logoWithTextSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="640" viewBox="0 0 512 640">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@700;800&amp;family=Inter:wght@400;600&amp;display=swap');
    </style>
  </defs>

  <rect width="512" height="640" fill="${WHITE}"/>

  <!-- Blue rounded square background -->
  <rect x="56" y="32" width="400" height="400" rx="72" fill="${ELECTRIC}"/>

  <!-- Stylized "S" letterform -->
  <g transform="translate(152, 102)" fill="${WHITE}">
    <rect x="0" y="0" width="208" height="42" rx="21"/>
    <rect x="0" y="100" width="208" height="42" rx="21"/>
    <rect x="0" y="200" width="208" height="42" rx="21"/>
    <rect x="166" y="0" width="42" height="142" rx="21"/>
    <rect x="0" y="100" width="42" height="142" rx="21"/>
  </g>

  <!-- Brand text -->
  <text x="256" y="500" text-anchor="middle"
        font-family="'Outfit', sans-serif" font-weight="800" font-size="46" fill="#0F172A"
        letter-spacing="0.5">stray web design</text>

  <!-- Tagline -->
  <text x="256" y="545" text-anchor="middle"
        font-family="'Inter', sans-serif" font-weight="400" font-size="20" fill="#94A3B8">Enterprise-Grade Websites</text>

  <!-- Location -->
  <text x="256" y="585" text-anchor="middle"
        font-family="'Inter', sans-serif" font-weight="600" font-size="16" fill="${ELECTRIC}"
        letter-spacing="3">ERIE, PA</text>
</svg>`;

const logoTextPath = path.join(OUT_DIR, 'logo-with-text.svg');
fs.writeFileSync(logoTextPath, logoWithTextSvg);
console.log(`Created: ${logoTextPath}`);

console.log('\n--- Done! SVG files created in public/images/icons/ ---');
console.log('To convert to PNG, run:');
console.log('  npx @svgr/cli or use sharp/puppeteer for rasterization');

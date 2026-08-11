import sharp from 'sharp';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '../public');

const W = 1200;
const H = 630;

// Dark background matching site theme
const bg = Buffer.from(
  `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#0a0f0d"/>
        <stop offset="100%" style="stop-color:#0d1a14"/>
      </linearGradient>
      <radialGradient id="glow" cx="72%" cy="50%" r="40%">
        <stop offset="0%" style="stop-color:#00D084;stop-opacity:0.18"/>
        <stop offset="100%" style="stop-color:#00D084;stop-opacity:0"/>
      </radialGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#g)"/>
    <rect width="${W}" height="${H}" fill="url(#glow)"/>
    <!-- grid lines -->
    <line x1="0" y1="1" x2="${W}" y2="1" stroke="#ffffff" stroke-opacity="0.04"/>
    <line x1="0" y1="${H - 1}" x2="${W}" y2="${H - 1}" stroke="#ffffff" stroke-opacity="0.04"/>
    <!-- brand tag -->
    <rect x="60" y="56" width="140" height="28" rx="14" fill="#00D084" fill-opacity="0.12"/>
    <text x="130" y="75" font-family="Arial, sans-serif" font-size="11" font-weight="700"
      fill="#00D084" text-anchor="middle" letter-spacing="2">BRAIN &amp; BRICKS</text>
    <!-- name -->
    <text x="60" y="170" font-family="Arial, sans-serif" font-size="62" font-weight="900"
      fill="#ffffff">Arslan Ahmad</text>
    <!-- title line -->
    <text x="60" y="222" font-family="Arial, sans-serif" font-size="22" font-weight="400"
      fill="#00D084">Principal iOS Engineer</text>
    <!-- divider -->
    <rect x="60" y="250" width="48" height="3" rx="2" fill="#00D084"/>
    <!-- descriptor -->
    <text x="60" y="300" font-family="Arial, sans-serif" font-size="16" fill="#8b9e94">
      6+ years · 12+ apps shipped · AI-first developer
    </text>
    <!-- domain -->
    <text x="60" y="${H - 44}" font-family="Arial, sans-serif" font-size="15" fill="#4a6357">
      brainandbricks.com/arslan
    </text>
  </svg>`
);

// Crop portrait to show face — take top-center 630×630 square, resize to 520×630
const portrait = await sharp(join(publicDir, 'arslan-hero.jpg'))
  .extract({ left: 200, top: 0, width: 880, height: 2282 })
  .resize(520, 630, { fit: 'cover', position: 'top' })
  .toBuffer();

// Fade mask on left edge of portrait (so it blends into bg)
const fadeMask = Buffer.from(
  `<svg width="520" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="fade" x1="0%" y1="0%" x2="30%" y2="0%">
        <stop offset="0%" style="stop-color:#000000;stop-opacity:1"/>
        <stop offset="100%" style="stop-color:#000000;stop-opacity:0"/>
      </linearGradient>
    </defs>
    <rect width="520" height="${H}" fill="url(#fade)"/>
  </svg>`
);

const portraitFaded = await sharp(portrait)
  .composite([{ input: fadeMask, blend: 'dest-out' }])
  .toBuffer();

await sharp({
  create: { width: W, height: H, channels: 4, background: { r: 10, g: 15, b: 13, alpha: 1 } },
})
  .composite([
    { input: bg },
    { input: portraitFaded, left: W - 520, top: 0, blend: 'over' },
  ])
  .jpeg({ quality: 90 })
  .toFile(join(publicDir, 'og-image.jpg'));

// Also write a copy as og-image.png (social platforms accept jpg despite .jpg extension)
await sharp(join(publicDir, 'og-image.jpg'))
  .toFile(join(publicDir, 'og-image.png'));

console.log('✓ OG image generated → public/og-image.png');

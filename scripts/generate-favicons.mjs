/**
 * Build Google-safe favicons from the rebrand TG monogram.
 * White mark on brand orange so the icon stays visible in dark search.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const SOURCE = path.join(ROOT, 'public/images-rebrand/logo.png');
const BRAND_DIR = path.join(ROOT, 'public/brand');
const ORANGE = { r: 0xf2, g: 0x41, b: 0x08, alpha: 1 };
const CONTENT_RATIO = 0.7;

function pngToIco(png, size) {
  const header = Buffer.alloc(22);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  header.writeUInt8(size >= 256 ? 0 : size, 6);
  header.writeUInt8(size >= 256 ? 0 : size, 7);
  header.writeUInt16LE(1, 10);
  header.writeUInt16LE(32, 12);
  header.writeUInt32LE(png.length, 14);
  header.writeUInt32LE(22, 18);
  return Buffer.concat([header, png]);
}

async function extractMark() {
  // logo.png is already a white TG mark with a real alpha channel.
  return sharp(SOURCE).trim().png().toBuffer();
}

async function renderIcon(mark, size) {
  const markSize = Math.round(size * CONTENT_RATIO);
  const resized = await sharp(mark)
    .resize(markSize, markSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  return sharp({
    create: { width: size, height: size, channels: 4, background: ORANGE },
  })
    .composite([{ input: resized, gravity: 'centre' }])
    .png()
    .toBuffer();
}

async function writePng(filePath, buffer) {
  await writeFile(filePath, buffer);
  const meta = await sharp(buffer).metadata();
  console.log(`${path.relative(ROOT, filePath)}  ${meta.width}x${meta.height}  ${buffer.length}b`);
}

const mark = await extractMark();
await mkdir(BRAND_DIR, { recursive: true });

const sizes = {
  48: path.join(BRAND_DIR, 'icon-48.png'),
  96: path.join(BRAND_DIR, 'icon-96.png'),
  192: path.join(BRAND_DIR, 'icon-192.png'),
  512: path.join(BRAND_DIR, 'icon-512.png'),
};

const rendered = {};
for (const [size, filePath] of Object.entries(sizes)) {
  rendered[size] = await renderIcon(mark, Number(size));
  await writePng(filePath, rendered[size]);
}

const apple = await renderIcon(mark, 180);
await writePng(path.join(BRAND_DIR, 'apple-touch-icon.png'), apple);
await writePng(path.join(ROOT, 'public/favicon-48x48.png'), rendered[48]);
await writePng(path.join(ROOT, 'public/icon.png'), rendered[96]);
await writePng(path.join(ROOT, 'public/apple-touch-icon.png'), apple);
await writePng(path.join(ROOT, 'app/icon.png'), rendered[96]);
await writePng(path.join(ROOT, 'app/apple-icon.png'), apple);

const ico = pngToIco(rendered[48], 48);
await writeFile(path.join(ROOT, 'public/favicon.ico'), ico);
console.log('public/favicon.ico  48x48  ' + ico.length + 'b');

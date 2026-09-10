// Generate PWA icon PNGs (192, 512, maskable 512) using only Node stdlib.
// Brand scene: night -> dawn vertical gradient, a soft sun disc, two layered
// mountain triangles, a small snow cap. Maskable variant pads the scene into
// the inner 60% safe zone on a solid navy background.

import { deflateSync } from 'node:zlib';
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, '..', 'public', 'icons');
mkdirSync(outDir, { recursive: true });

// --- Minimal PNG encoder (RGBA, 8-bit) ------------------------------------
const crcTable = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length, 0);
  const t = Buffer.from(type, 'ascii');
  const c = Buffer.alloc(4); c.writeUInt32BE(crc32(Buffer.concat([t, data])), 0);
  return Buffer.concat([len, t, data, c]);
}
function encodePng(width, height, rgba) {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0); ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  const rowLen = width * 4;
  const raw = Buffer.alloc((rowLen + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (rowLen + 1)] = 0; // filter type 0
    rgba.copy(raw, y * (rowLen + 1) + 1, y * rowLen, (y + 1) * rowLen);
  }
  const idat = deflateSync(raw, { level: 9 });
  return Buffer.concat([sig, chunk('IHDR', ihdr), chunk('IDAT', idat), chunk('IEND', Buffer.alloc(0))]);
}

// --- Pixel painters -------------------------------------------------------
const lerp = (a, b, t) => Math.round(a + (b - a) * t);
function setPx(px, w, x, y, r, g, b, a = 255) {
  const i = (y * w + x) * 4; px[i] = r; px[i + 1] = g; px[i + 2] = b; px[i + 3] = a;
}
function fillBg(px, w, h, r, g, b) {
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) setPx(px, w, x, y, r, g, b);
}
function fillDisc(px, w, h, cx, cy, R, r, g, b) {
  const R2 = R * R;
  for (let y = Math.max(0, Math.floor(cy - R)); y < Math.min(h, Math.ceil(cy + R)); y++)
    for (let x = Math.max(0, Math.floor(cx - R)); x < Math.min(w, Math.ceil(cx + R)); x++) {
      const dx = x - cx, dy = y - cy;
      if (dx * dx + dy * dy <= R2) setPx(px, w, x, y, r, g, b);
    }
}
function fillTri(px, w, h, ax, ay, bx, by, cx2, cy2, r, g, b) {
  const minX = Math.max(0, Math.floor(Math.min(ax, bx, cx2)));
  const maxX = Math.min(w - 1, Math.ceil(Math.max(ax, bx, cx2)));
  const minY = Math.max(0, Math.floor(Math.min(ay, by, cy2)));
  const maxY = Math.min(h - 1, Math.ceil(Math.max(ay, by, cy2)));
  const sign = (px1, py1, px2, py2, px3, py3) =>
    (px1 - px3) * (py2 - py3) - (px2 - px3) * (py1 - py3);
  for (let y = minY; y <= maxY; y++) for (let x = minX; x <= maxX; x++) {
    const d1 = sign(x, y, ax, ay, bx, by);
    const d2 = sign(x, y, bx, by, cx2, cy2);
    const d3 = sign(x, y, cx2, cy2, ax, ay);
    const hasNeg = d1 < 0 || d2 < 0 || d3 < 0;
    const hasPos = d1 > 0 || d2 > 0 || d3 > 0;
    if (!(hasNeg && hasPos)) setPx(px, w, x, y, r, g, b);
  }
}

function paint(size) {
  const px = Buffer.alloc(size * size * 4);
  // vertical gradient #10182d -> #f6b548
  const top = [0x10, 0x18, 0x2d], bot = [0xf6, 0xb5, 0x48];
  for (let y = 0; y < size; y++) {
    const t = y / (size - 1);
    const r = lerp(top[0], bot[0], t), g = lerp(top[1], bot[1], t), b = lerp(top[2], bot[2], t);
    for (let x = 0; x < size; x++) setPx(px, size, x, y, r, g, b);
  }
  // sun
  const cx = size * 0.62, cy = size * 0.40, R = size * 0.16;
  fillDisc(px, size, size, cx, cy, R, 0xfd, 0xd3, 0x9b);
  fillDisc(px, size, size, cx, cy, R * 0.78, 0xff, 0xe6, 0xbf);
  // mountain back (lighter navy)
  const baseY = Math.floor(size * 0.82);
  fillTri(px, size, size, 0, baseY, size * 0.55, size * 0.50, size, baseY, 0x20, 0x29, 0x42);
  // mountain front (deep navy)
  fillTri(px, size, size, size * 0.18, baseY, size * 0.72, size * 0.42, size + size * 0.12, baseY, 0x10, 0x18, 0x2d);
  // snow cap
  fillTri(px, size, size, size * 0.66, size * 0.46, size * 0.72, size * 0.42, size * 0.78, size * 0.46, 0xf3, 0xee, 0xe5);
  return px;
}

function paintMaskable(size) {
  const px = Buffer.alloc(size * size * 4);
  fillBg(px, size, size, 0x10, 0x18, 0x2d);
  const inner = Math.floor(size * 0.6);
  const offX = Math.floor((size - inner) / 2);
  const offY = Math.floor((size - inner) / 2);
  const small = paint(inner);
  for (let y = 0; y < inner; y++) for (let x = 0; x < inner; x++) {
    const s = (y * inner + x) * 4;
    const d = ((y + offY) * size + (x + offX)) * 4;
    px[d] = small[s]; px[d + 1] = small[s + 1]; px[d + 2] = small[s + 2]; px[d + 3] = 255;
  }
  return px;
}

for (const sz of [192, 512]) {
  writeFileSync(resolve(outDir, `icon-${sz}.png`), encodePng(sz, sz, paint(sz)));
}
writeFileSync(resolve(outDir, 'icon-512-maskable.png'), encodePng(512, 512, paintMaskable(512)));
console.log('PWA icons written to', outDir);

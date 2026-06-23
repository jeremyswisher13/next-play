/**
 * Generate the brand PNGs (run once, commit the output):
 *   npx tsx scripts/generate-images.ts
 *
 * - public/og.png         1200x630  social / iMessage link preview
 * - public/icon-192.png   192x192   PWA icon
 * - public/icon-512.png   512x512   PWA icon (also used maskable)
 * - src/app/apple-icon.png 180x180  iOS home-screen icon
 */
import { createCanvas, type SKRSContext2D } from "@napi-rs/canvas";
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const TEAL = "#0f766e";
const INK = "#0f172a";
const MUTED = "#475569";
const CANVAS_BG = "#f8fafc";

// The Next Play "pulse" mark, in a 512x512 viewbox.
const PULSE: [number, number][] = [
  [96, 272],
  [184, 272],
  [216, 192],
  [272, 336],
  [304, 256],
  [416, 256],
];

function roundRect(
  ctx: SKRSContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawPulse(
  ctx: SKRSContext2D,
  x: number,
  y: number,
  size: number,
  stroke: number,
) {
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = stroke;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  PULSE.forEach(([px, py], i) => {
    const cx = x + (px / 512) * size;
    const cy = y + (py / 512) * size;
    if (i === 0) ctx.moveTo(cx, cy);
    else ctx.lineTo(cx, cy);
  });
  ctx.stroke();
}

const FONT = "Arial, Helvetica, sans-serif";

function makeOg(): Buffer {
  const c = createCanvas(1200, 630);
  const ctx = c.getContext("2d");

  ctx.fillStyle = CANVAS_BG;
  ctx.fillRect(0, 0, 1200, 630);

  // teal footer band
  ctx.fillStyle = TEAL;
  ctx.fillRect(0, 556, 1200, 74);

  // logo tile + pulse
  ctx.fillStyle = TEAL;
  roundRect(ctx, 80, 60, 92, 92, 22);
  ctx.fill();
  drawPulse(ctx, 80, 60, 92, 9);

  // wordmark
  ctx.fillStyle = INK;
  ctx.font = `700 54px ${FONT}`;
  ctx.textBaseline = "middle";
  ctx.fillText("Next Play", 192, 108);

  // headline
  ctx.textBaseline = "alphabetic";
  ctx.font = `800 78px ${FONT}`;
  ctx.fillStyle = INK;
  ctx.fillText("Clearer injury decisions.", 80, 322);
  ctx.fillStyle = TEAL;
  ctx.fillText("Safer return to play.", 80, 412);

  // subline
  ctx.fillStyle = MUTED;
  ctx.font = `400 31px ${FONT}`;
  ctx.fillText("Bilingual sports-injury navigator   ·   Not a diagnosis", 82, 474);

  // footer
  ctx.fillStyle = "#ffffff";
  ctx.font = `600 27px ${FONT}`;
  ctx.textBaseline = "middle";
  ctx.fillText(
    "English / Español    ·    The next safest step after a sports injury",
    80,
    593,
  );

  return c.toBuffer("image/png");
}

function makeIcon(size: number, pad: number): Buffer {
  const c = createCanvas(size, size);
  const ctx = c.getContext("2d");
  ctx.fillStyle = TEAL;
  ctx.fillRect(0, 0, size, size);
  const inner = size * (1 - 2 * pad);
  drawPulse(ctx, size * pad, size * pad, inner, size * 0.06);
  return c.toBuffer("image/png");
}

const root = process.cwd();
const out: [string, Buffer][] = [
  [join(root, "public/og.png"), makeOg()],
  [join(root, "public/icon-192.png"), makeIcon(192, 0.22)],
  [join(root, "public/icon-512.png"), makeIcon(512, 0.22)],
  [join(root, "src/app/apple-icon.png"), makeIcon(180, 0.18)],
];

for (const [path, buf] of out) {
  writeFileSync(path, buf);
  console.log(`wrote ${path} (${(buf.length / 1024).toFixed(1)} KB)`);
}

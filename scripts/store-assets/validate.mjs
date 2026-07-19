import { access } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { assetDir } from "./shared.mjs";

const expected = [
  ["icon-128.png", 128, 128, true],
  ["icon-master-512.png", 512, 512, true],
  ["icon-construction.png", 1280, 800, false],
  ["screenshot-01-latest-download.png", 1280, 800, false],
  ["screenshot-02-turkish-dark.png", 1280, 800, false],
  ["screenshot-03-smart-settings.png", 1280, 800, false],
  ["screenshot-04-domain-rules.png", 1280, 800, false],
  ["screenshot-05-local-history.png", 1280, 800, false],
  ["promo-tile-small.png", 440, 280, false],
  ["promo-tile-marquee.png", 1400, 560, false],
];

const failures = [];

for (const [filename, width, height, alphaAllowed] of expected) {
  const file = path.join(assetDir, filename);
  try {
    await access(file);
    const metadata = await sharp(file).metadata();
    if (metadata.format !== "png") failures.push(`${filename}: expected PNG, received ${metadata.format}`);
    if (metadata.width !== width || metadata.height !== height) {
      failures.push(`${filename}: expected ${width}x${height}, received ${metadata.width}x${metadata.height}`);
    }
    if (!alphaAllowed && metadata.hasAlpha) failures.push(`${filename}: screenshots and promotional images must be opaque`);
  } catch (error) {
    failures.push(`${filename}: ${error instanceof Error ? error.message : "missing or unreadable"}`);
  }
}

if (failures.length > 0) {
  console.error(`Store asset validation failed:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}

console.log(`Validated ${expected.length} Chrome Web Store and icon assets.`);

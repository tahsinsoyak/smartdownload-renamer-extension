import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

export const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
export const assetDir = path.join(rootDir, "store-assets");
export const screenshotDir = path.join(rootDir, "screenshots");
export const iconSvgPath = path.join(rootDir, "public", "icon.svg");

export const colors = {
  cobalt: "#2553B8",
  blue: "#2F6BEA",
  blueLight: "#93C5FD",
  ink: "#0F1D33",
  muted: "#91A4BF",
  white: "#FFFFFF",
  gold: "#FBBF24",
  green: "#12B886",
};

export async function ensureAssetDirectory() {
  await mkdir(assetDir, { recursive: true });
}

export function background(width, height) {
  return `
    <defs>
      <linearGradient id="store-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#153A86"/>
        <stop offset="0.52" stop-color="#10295C"/>
        <stop offset="1" stop-color="#071426"/>
      </linearGradient>
      <radialGradient id="store-glow">
        <stop offset="0" stop-color="#4F8BFF" stop-opacity=".42"/>
        <stop offset="1" stop-color="#4F8BFF" stop-opacity="0"/>
      </radialGradient>
      <pattern id="store-dots" width="28" height="28" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="1" fill="#FFFFFF" opacity=".08"/>
      </pattern>
      <filter id="panel-shadow" x="-30%" y="-30%" width="160%" height="180%">
        <feDropShadow dx="0" dy="24" stdDeviation="24" flood-color="#020817" flood-opacity=".52"/>
      </filter>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#store-bg)"/>
    <circle cx="${Math.round(width * 0.12)}" cy="${Math.round(height * 0.08)}" r="${Math.round(width * 0.34)}" fill="url(#store-glow)"/>
    <rect width="${width}" height="${height}" fill="url(#store-dots)"/>
  `;
}

export function svgDocument(width, height, content) {
  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">${content}</svg>`;
}

export async function roundedImage(source, width, height, radius, fit = "cover") {
  const resized = await sharp(source)
    .resize(width, height, { fit, position: "top" })
    .png()
    .toBuffer();
  const mask = Buffer.from(svgDocument(width, height, `<rect width="${width}" height="${height}" rx="${radius}" fill="#fff"/>`));
  return sharp(resized).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
}

export async function iconBuffer(size) {
  return sharp(iconSvgPath).resize(size, size).png().toBuffer();
}

export async function writeComposite(filename, width, height, svg, overlays = []) {
  const output = path.join(assetDir, filename);
  await sharp(Buffer.from(svgDocument(width, height, svg)))
    .composite(overlays)
    .removeAlpha()
    .png({ compressionLevel: 9 })
    .toFile(output);
  return output;
}

export function storyText({ kicker, title, title2, body, body2, proof, x = 72, y = 128 }) {
  return `
    <rect x="${x}" y="${y - 34}" width="34" height="3" rx="2" fill="#76A4FF"/>
    <text x="${x + 46}" y="${y - 28}" fill="#AFC8FF" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="700" letter-spacing="1.7">${kicker}</text>
    <text x="${x}" y="${y + 42}" fill="#FFFFFF" font-family="Segoe UI, Arial, sans-serif" font-size="50" font-weight="750" letter-spacing="-2.2">${title}</text>
    <text x="${x}" y="${y + 96}" fill="#FFFFFF" font-family="Segoe UI, Arial, sans-serif" font-size="50" font-weight="750" letter-spacing="-2.2">${title2}</text>
    <text x="${x}" y="${y + 146}" fill="#C4D0E0" font-family="Segoe UI, Arial, sans-serif" font-size="18">${body}</text>
    <text x="${x}" y="${y + 176}" fill="#C4D0E0" font-family="Segoe UI, Arial, sans-serif" font-size="18">${body2}</text>
    <g transform="translate(${x} ${y + 216})">
      <rect width="${Math.max(190, proof.length * 8.2 + 48)}" height="38" rx="19" fill="#FFFFFF" fill-opacity=".1" stroke="#FFFFFF" stroke-opacity=".13"/>
      <circle cx="20" cy="19" r="9" fill="#12B886"/>
      <path d="m16 19 3 3 6-7" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="38" y="24" fill="#DDE7F5" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="650">${proof}</text>
    </g>
  `;
}

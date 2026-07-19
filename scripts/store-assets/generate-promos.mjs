import path from "node:path";
import sharp from "sharp";
import {
  assetDir,
  background,
  ensureAssetDirectory,
  iconBuffer,
  iconSvgPath,
  writeComposite,
} from "./shared.mjs";

async function generateIcons() {
  await sharp(iconSvgPath).resize(128, 128).png().toFile(path.join(assetDir, "icon-128.png"));
  await sharp(iconSvgPath).resize(512, 512).png().toFile(path.join(assetDir, "icon-master-512.png"));
}

async function generateSmallPromo() {
  const icon = await iconBuffer(60);
  const svg = `
    ${background(440, 280)}
    <text x="105" y="54" fill="#FFFFFF" font-family="Segoe UI, Arial, sans-serif" font-size="23" font-weight="750">Smart Download</text>
    <text x="105" y="80" fill="#FFFFFF" font-family="Segoe UI, Arial, sans-serif" font-size="23" font-weight="750">Renamer</text>
    <text x="30" y="126" fill="#AFC8FF" font-family="Segoe UI, Arial, sans-serif" font-size="12" font-weight="700" letter-spacing="1.5">DOWNLOADS, MADE FINDABLE</text>
    <rect x="30" y="151" width="380" height="77" rx="17" fill="#FFFFFF" fill-opacity=".96"/>
    <rect x="46" y="168" width="44" height="44" rx="11" fill="#2F6BEA"/>
    <text x="58" y="196" fill="#FFFFFF" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="750">PDF</text>
    <text x="104" y="180" fill="#64748B" font-family="Segoe UI, Arial, sans-serif" font-size="10">invoice(3).pdf</text>
    <text x="104" y="203" fill="#0F1D33" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="750">2026-07-19_Amazon_Invoice.pdf</text>
    <circle cx="392" cy="190" r="9" fill="#12B886"/>
    <path d="m388 190 3 3 6-7" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
    <text x="30" y="254" fill="#C7D3E4" font-family="Segoe UI, Arial, sans-serif" font-size="12">Clear names. Saved locations. Local by design.</text>
  `;
  await writeComposite("promo-tile-small.png", 440, 280, svg, [{ input: icon, left: 30, top: 26 }]);
}

async function generateMarquee() {
  const icon = await iconBuffer(90);
  const svg = `
    ${background(1400, 560)}
    <text x="190" y="108" fill="#FFFFFF" font-family="Segoe UI, Arial, sans-serif" font-size="39" font-weight="750">Smart Download Renamer</text>
    <text x="80" y="218" fill="#AFC8FF" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="750" letter-spacing="2.2">FROM MESSY DOWNLOAD TO FINDABLE FILE</text>
    <text x="80" y="297" fill="#FFFFFF" font-family="Segoe UI, Arial, sans-serif" font-size="54" font-weight="780" letter-spacing="-2.4">Know what it is.</text>
    <text x="80" y="356" fill="#FFFFFF" font-family="Segoe UI, Arial, sans-serif" font-size="54" font-weight="780" letter-spacing="-2.4">Know where it went.</text>
    <text x="82" y="412" fill="#C4D0E0" font-family="Segoe UI, Arial, sans-serif" font-size="20">Automatic filenames, saved locations, and private local history.</text>
    <g transform="translate(875 112)">
      <rect width="445" height="338" rx="28" fill="#F7FAFF" filter="url(#panel-shadow)"/>
      <text x="34" y="54" fill="#6B7F9D" font-family="Segoe UI, Arial, sans-serif" font-size="12" font-weight="750" letter-spacing="1.4">YOUR LATEST DOWNLOAD</text>
      <rect x="34" y="84" width="70" height="82" rx="17" fill="#2F6BEA"/>
      <text x="55" y="133" fill="#FFFFFF" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="750">PDF</text>
      <text x="128" y="108" fill="#8A9AB1" font-family="Segoe UI, Arial, sans-serif" font-size="13">invoice(3).pdf</text>
      <text x="128" y="139" fill="#0F1D33" font-family="Segoe UI, Arial, sans-serif" font-size="19" font-weight="750">2026-07-19_Amazon_Invoice.pdf</text>
      <rect x="34" y="194" width="377" height="82" rx="16" fill="#EAF2FF" stroke="#C9D9F2"/>
      <rect x="50" y="211" width="48" height="48" rx="12" fill="#D7E7FF"/>
      <path d="M62 228h9l3 4h13v12H62z" fill="none" stroke="#2F6BEA" stroke-width="2.2" stroke-linejoin="round"/>
      <text x="116" y="222" fill="#6B7F9D" font-family="Segoe UI, Arial, sans-serif" font-size="10" font-weight="750" letter-spacing="1.2">SAVED TO</text>
      <text x="116" y="247" fill="#0F1D33" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700">Downloads / Documents / Receipts</text>
      <circle cx="383" cy="310" r="12" fill="#12B886"/>
      <path d="m377 310 4 4 8-9" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
    </g>
  `;
  await writeComposite("promo-tile-marquee.png", 1400, 560, svg, [{ input: icon, left: 80, top: 54 }]);
}

async function generateConstructionGuide() {
  const icon = await iconBuffer(300);
  const svg = `
    <rect width="1280" height="800" fill="#F4F7FC"/>
    <text x="64" y="76" fill="#0F1D33" font-family="Segoe UI, Arial, sans-serif" font-size="34" font-weight="750">Smart Download Renamer icon system</text>
    <text x="64" y="108" fill="#64748B" font-family="Segoe UI, Arial, sans-serif" font-size="15">A clear file, a decisive download arrow, and two intelligent sparkles.</text>
    <rect x="64" y="158" width="460" height="500" rx="30" fill="#FFFFFF" stroke="#D8E2F0"/>
    <rect x="144" y="234" width="300" height="300" rx="76" fill="#EAF2FF"/>
    <text x="144" y="586" fill="#0F1D33" font-family="Segoe UI, Arial, sans-serif" font-size="17" font-weight="700">Master artwork · 128 × 128 viewBox</text>
    <text x="144" y="615" fill="#64748B" font-family="Segoe UI, Arial, sans-serif" font-size="14">30 px corner radius · 4 px safe inset</text>
    <g transform="translate(578 172)">
      <text x="0" y="0" fill="#2553B8" font-family="Segoe UI, Arial, sans-serif" font-size="12" font-weight="750" letter-spacing="1.5">COMPONENTS</text>
      <circle cx="16" cy="52" r="16" fill="#2563EB"/><text x="48" y="58" fill="#0F1D33" font-family="Segoe UI, Arial, sans-serif" font-size="17" font-weight="700">Cobalt foundation</text>
      <text x="48" y="82" fill="#64748B" font-family="Segoe UI, Arial, sans-serif" font-size="14">Recognition, trust, and Chrome-toolbar contrast.</text>
      <rect x="0" y="112" width="32" height="38" rx="5" fill="#FFFFFF" stroke="#C7D5E8"/><text x="48" y="138" fill="#0F1D33" font-family="Segoe UI, Arial, sans-serif" font-size="17" font-weight="700">White file sheet</text>
      <text x="48" y="162" fill="#64748B" font-family="Segoe UI, Arial, sans-serif" font-size="14">The object users are organizing.</text>
      <path d="M8 208h16v20h10L16 248-2 228H8z" fill="#2563EB"/><text x="48" y="230" fill="#0F1D33" font-family="Segoe UI, Arial, sans-serif" font-size="17" font-weight="700">Downward arrow</text>
      <text x="48" y="254" fill="#64748B" font-family="Segoe UI, Arial, sans-serif" font-size="14">Direct download meaning at 16 px and above.</text>
      <path d="m16 292 4 10 10 4-10 4-4 10-4-10-10-4 10-4z" fill="#FBBF24"/><text x="48" y="311" fill="#0F1D33" font-family="Segoe UI, Arial, sans-serif" font-size="17" font-weight="700">AI clarity sparkle</text>
      <text x="48" y="335" fill="#64748B" font-family="Segoe UI, Arial, sans-serif" font-size="14">Signals intelligent cleanup without a robot cliché.</text>
      <text x="0" y="400" fill="#2553B8" font-family="Segoe UI, Arial, sans-serif" font-size="12" font-weight="750" letter-spacing="1.5">CORE COLORS</text>
      <rect x="0" y="424" width="118" height="58" rx="14" fill="#2563EB"/><text x="14" y="458" fill="#fff" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="700">#2563EB</text>
      <rect x="130" y="424" width="118" height="58" rx="14" fill="#FFFFFF" stroke="#D8E2F0"/><text x="144" y="458" fill="#0F1D33" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="700">#FFFFFF</text>
      <rect x="260" y="424" width="118" height="58" rx="14" fill="#FBBF24"/><text x="274" y="458" fill="#5B3B00" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="700">#FBBF24</text>
    </g>
    <text x="64" y="740" fill="#64748B" font-family="Segoe UI, Arial, sans-serif" font-size="13">Keep the silhouette unchanged. Do not add text, outlines, shadows, or extra sparkles inside the Store icon.</text>
  `;
  await writeComposite("icon-construction.png", 1280, 800, svg, [{ input: icon, left: 144, top: 234 }]);
}

await ensureAssetDirectory();
await generateIcons();
await generateSmallPromo();
await generateMarquee();
await generateConstructionGuide();

console.log("Generated icon handoff and Chrome Web Store promotional assets.");

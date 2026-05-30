// Generates PNG icons from public/icon.svg at all sizes required by manifest.json
import { Resvg } from "@resvg/resvg-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const svgPath = path.join(__dirname, "../public/icon.svg");
const outDir = path.join(__dirname, "../public/icons");

const svgData = fs.readFileSync(svgPath, "utf-8");
const sizes = [16, 32, 48, 128];

for (const size of sizes) {
  const resvg = new Resvg(svgData, { fitTo: { mode: "width", value: size } });
  const png = resvg.render().asPng();
  const outPath = path.join(outDir, `icon${size}.png`);
  fs.writeFileSync(outPath, png);
  console.log(`✓ icon${size}.png (${size}×${size})`);
}

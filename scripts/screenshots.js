/**
 * Screenshots via a local HTTP server so Vite's /assets/ paths resolve correctly.
 * Run `npm run build` first, then `node scripts/screenshots.js`.
 */
import { chromium } from "playwright";
import { createServer } from "http";
import { readFileSync, existsSync } from "fs";
import path from "path";
import { extname } from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir   = path.resolve(__dirname, "../dist");
const outDir    = path.resolve(__dirname, "../screenshots");
fs.mkdirSync(outDir, { recursive: true });

// ── Tiny static file server for dist/ ───────────────────────────────────────
const MIME = { ".html":"text/html", ".js":"application/javascript",
               ".css":"text/css",  ".png":"image/png",
               ".svg":"image/svg+xml", ".json":"application/json" };

const server = createServer((req, res) => {
  const filePath = path.join(distDir, decodeURIComponent(req.url.split("?")[0]));
  if (existsSync(filePath) && !filePath.includes("..")) {
    res.writeHead(200, { "Content-Type": MIME[extname(filePath)] ?? "application/octet-stream" });
    res.end(readFileSync(filePath));
  } else {
    res.writeHead(404); res.end();
  }
});
await new Promise(r => server.listen(0, "127.0.0.1", r));
const { port } = server.address();
const base = `http://127.0.0.1:${port}`;
console.log("Serving dist/ at", base);

// ── Mock data (matches storage.ts key names) ─────────────────────────────────
const now = Date.now();
const MOCK = {
  settings: {
    enabled: true, template: "{date}_{source}_{type}.{ext}",
    dateFormat: "YYYY-MM-DD", separator: "_",
    preserveOriginalName: false, includeSource: true, includeType: true,
    includeDate: true, asciiSafeMode: true, allowTurkishCharacters: false,
    maxFilenameLength: 120, conflictStrategy: "append_number",
    skipExecutables: true, skipDescriptiveFilenames: true,
    ignoredDomains: [], ignoreKeywords: [],
  },
  domainRules: [
    { id:"1", domain:"amazon.com.tr", sourceName:"Amazon",  defaultDocumentType:"invoice",     enabled:true, createdAt:"2026-01-01T00:00:00Z" },
    { id:"2", domain:"trendyol.com",  sourceName:"Trendyol",defaultDocumentType:"receipt",     enabled:true, createdAt:"2026-01-01T00:00:00Z" },
    { id:"3", domain:"udemy.com",     sourceName:"Udemy",   defaultDocumentType:"certificate", enabled:true, createdAt:"2026-01-01T00:00:00Z" },
    { id:"4", domain:"github.com",    sourceName:"GitHub",  defaultDocumentType:"download",    enabled:true, createdAt:"2026-01-01T00:00:00Z" },
  ],
  // Storage key is "renameHistory" (see src/shared/lib/storage.ts HISTORY_KEY)
  renameHistory: [
    { id:"h1", downloadId:101, originalFilename:"invoice(3).pdf",         suggestedFilename:"2026-07-19_Amazon_Invoice.pdf", finalFilename:"2026-07-19_Amazon_Invoice.pdf", fullPath:"C:\\Users\\Taylor\\Downloads\\Documents\\Receipts\\2026-07-19_Amazon_Invoice.pdf", fileSize:253952, completedAt:new Date(now-12000).toISOString(), exists:true, sourceDomain:"amazon.com.tr",  sourceName:"Amazon",  documentType:"invoice",     fileExtension:"pdf", createdAt:new Date(now-15000).toISOString(), status:"renamed" },
    { id:"h2", downloadId:102, originalFilename:"certificate.pdf",       suggestedFilename:"2026-07-18_Udemy_Certificate.pdf", finalFilename:"2026-07-18_Udemy_Certificate.pdf", fullPath:"C:\\Users\\Taylor\\Downloads\\Courses\\2026-07-18_Udemy_Certificate.pdf", fileSize:892144, completedAt:new Date(now-93600000).toISOString(), exists:true, sourceDomain:"udemy.com", sourceName:"Udemy", documentType:"certificate", fileExtension:"pdf", createdAt:new Date(now-93605000).toISOString(), status:"renamed" },
    { id:"h3", downloadId:103, originalFilename:"stripe_backup_code.txt", suggestedFilename:"stripe_backup_code.txt", finalFilename:"stripe_backup_code.txt", fullPath:"C:\\Users\\Taylor\\Downloads\\stripe_backup_code.txt", fileSize:2048, completedAt:new Date(now-180000000).toISOString(), exists:true, sourceDomain:"stripe.com", sourceName:"Stripe", documentType:"download", fileExtension:"txt", createdAt:new Date(now-180005000).toISOString(), status:"skipped", reason:"Filename is already descriptive" },
    { id:"h4", downloadId:104, originalFilename:"giftmemory.zip",         suggestedFilename:"2026-07-16_Website_Archive.zip", finalFilename:"2026-07-16_Website_Archive.zip", fullPath:"C:\\Users\\Taylor\\Downloads\\Archives\\2026-07-16_Website_Archive.zip", fileSize:5242880, completedAt:new Date(now-270000000).toISOString(), exists:true, sourceDomain:"giftmemory.app", sourceName:"Website", documentType:"archive", fileExtension:"zip", createdAt:new Date(now-270005000).toISOString(), status:"renamed" },
  ],
};

// Adds chrome.storage onto the existing (protected) window.chrome object.
// chrome itself can't be replaced, but chrome.storage can be added as a new property.
function buildInitScript(theme) {
  return `(function () {
    const STORE = ${JSON.stringify({ ...MOCK, theme })};
    const mockLocal = {
      get(key, cb) {
        let res = {};
        if (key == null)                  res = { ...STORE };
        else if (typeof key === "string") { if (key in STORE) res = { [key]: STORE[key] }; }
        else if (Array.isArray(key))      key.forEach(k => { if (k in STORE) res[k] = STORE[k]; });
        else if (typeof key === "object") Object.keys(key).forEach(k => { res[k] = k in STORE ? STORE[k] : key[k]; });
        if (cb) cb(res);
        return Promise.resolve(res);
      },
      set(items, cb) { Object.assign(STORE, items); if (cb) cb(); return Promise.resolve(); },
      clear(cb)      { if (cb) cb(); return Promise.resolve(); },
    };
    // chrome itself is non-configurable — patch .storage onto it instead of replacing it
    try { chrome.storage = { local: mockLocal }; } catch (_) {}
    try { Object.defineProperty(chrome, "storage", { value:{ local: mockLocal }, writable:true, configurable:true }); } catch (_) {}
    // Patch runtime for openOptionsPage / sendMessage used by popup buttons
    try { chrome.runtime = { getURL: p => p, openOptionsPage: () => {}, sendMessage: () => {}, lastError: null }; } catch (_) {}
    try { chrome.downloads = { open: () => {}, show: () => {}, showDefaultFolder: () => {} }; } catch (_) {}
    ${theme === "dark" ? 'document.documentElement.classList.add("dark");' : ""}
  })();`;
}

const browser = await chromium.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

async function openPage(page, theme, viewport) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 2 });
  const p = await ctx.newPage();
  await p.addInitScript(buildInitScript(theme));
  await p.goto(`${base}/${page}`, { waitUntil: "networkidle" });
  await p.waitForTimeout(1500);
  return { p, ctx };
}

async function clickTab(p, label) {
  await p.evaluate(lbl => {
    for (const btn of document.querySelectorAll("button")) {
      if (btn.textContent?.includes(lbl)) { btn.click(); return; }
    }
  }, label);
  await p.waitForTimeout(700);
}

// ── 1. Popup — light ─────────────────────────────────────────────────────────
{ const { p, ctx } = await openPage("popup.html", "light", { width:420, height:600 });
  await p.screenshot({ path:`${outDir}/popup-light.png`, clip:{x:0,y:0,width:420,height:600} });
  console.log("✓ popup-light.png"); await ctx.close(); }

// ── 2. Popup — dark ──────────────────────────────────────────────────────────
{ const { p, ctx } = await openPage("popup.html", "dark", { width:420, height:600 });
  await p.screenshot({ path:`${outDir}/popup-dark.png`, clip:{x:0,y:0,width:420,height:600} });
  console.log("✓ popup-dark.png"); await ctx.close(); }

// ── 3. Options — General tab ──────────────────────────────────────────────────
{ const { p, ctx } = await openPage("options.html", "light", { width:1200, height:820 });
  await p.screenshot({ path:`${outDir}/options-general.png` });
  console.log("✓ options-general.png"); await ctx.close(); }

// Options — General tab, dark
{ const { p, ctx } = await openPage("options.html", "dark", { width:1200, height:820 });
  await p.screenshot({ path:`${outDir}/options-general-dark.png` });
  console.log("✓ options-general-dark.png"); await ctx.close(); }

// ── 4. Options — History tab ──────────────────────────────────────────────────
{ const { p, ctx } = await openPage("options.html", "light", { width:1200, height:820 });
  await clickTab(p, "History");
  await p.screenshot({ path:`${outDir}/options-history.png` });
  console.log("✓ options-history.png"); await ctx.close(); }

// ── 5. Options — Domains, dark ────────────────────────────────────────────────
{ const { p, ctx } = await openPage("options.html", "dark", { width:1200, height:820 });
  await clickTab(p, "Domains");
  await p.screenshot({ path:`${outDir}/options-domains-dark.png` });
  console.log("✓ options-domains-dark.png"); await ctx.close(); }

await browser.close();
server.close();
console.log("\nDone — screenshots/");

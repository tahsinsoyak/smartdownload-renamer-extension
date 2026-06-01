import { chromium } from "playwright";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "../screenshots");
fs.mkdirSync(outDir, { recursive: true });

const distDir = path.join(__dirname, "../dist");
const popupUrl  = `file:///${distDir.replace(/\\/g, "/")}/popup.html`;
const optionsUrl = `file:///${distDir.replace(/\\/g, "/")}/options.html`;

const CHROME_MOCK = `(function () {
  const settings = {
    enabled: true, template: "{date}_{source}_{type}.{ext}",
    dateFormat: "YYYY-MM-DD", separator: "_",
    preserveOriginalName: false, includeSource: true,
    includeType: true, includeDate: true, asciiSafeMode: true,
    allowTurkishCharacters: false, maxFilenameLength: 120,
    conflictStrategy: "append_number", skipExecutables: true,
    skipDescriptiveFilenames: true, ignoredDomains: [], ignoreKeywords: [],
  };
  const domainRules = [
    { id:"1", domain:"amazon.com.tr", sourceName:"Amazon", defaultDocumentType:"invoice",  enabled:true, createdAt:"2026-01-01T00:00:00Z" },
    { id:"2", domain:"trendyol.com",  sourceName:"Trendyol",defaultDocumentType:"receipt",  enabled:true, createdAt:"2026-01-01T00:00:00Z" },
    { id:"3", domain:"udemy.com",     sourceName:"Udemy",   defaultDocumentType:"certificate",enabled:true,createdAt:"2026-01-01T00:00:00Z" },
    { id:"4", domain:"github.com",    sourceName:"GitHub",  defaultDocumentType:"download",  enabled:true, createdAt:"2026-01-01T00:00:00Z" },
  ];
  const history = [
    { id:"h1", originalFilename:"invoice(3).pdf",    suggestedFilename:"2026-05-30_Amazon_Invoice.pdf",     sourceDomain:"amazon.com.tr", sourceName:"Amazon",  documentType:"invoice",     fileExtension:"pdf", createdAt:new Date(Date.now()-1*3600000).toISOString(),   status:"renamed" },
    { id:"h2", originalFilename:"stripe_backup_code.txt", suggestedFilename:"stripe_backup_code.txt",     sourceDomain:"stripe.com",    sourceName:"Stripe",  documentType:"download",    fileExtension:"txt", createdAt:new Date(Date.now()-26*3600000).toISOString(),  status:"skipped" },
    { id:"h3", originalFilename:"download.pdf",       suggestedFilename:"2026-05-29_Udemy_Certificate.pdf", sourceDomain:"udemy.com",     sourceName:"Udemy",   documentType:"certificate", fileExtension:"pdf", createdAt:new Date(Date.now()-50*3600000).toISOString(),  status:"renamed" },
    { id:"h4", originalFilename:"giftmemory.zip",     suggestedFilename:"2026-05-28_Website_Form.zip",      sourceDomain:"giftmemory.app",sourceName:"Website", documentType:"archive",     fileExtension:"zip", createdAt:new Date(Date.now()-75*3600000).toISOString(),  status:"renamed" },
  ];
  const store = {
    settings:    JSON.stringify(settings),
    domainRules: JSON.stringify(domainRules),
    history:     JSON.stringify(history),
    theme:       '"light"',
  };
  window.chrome = {
    storage: {
      local: {
        get(keys, cb) {
          const res = {};
          const ks = keys == null ? Object.keys(store)
            : Array.isArray(keys) ? keys
            : typeof keys === "object" ? Object.keys(keys) : [keys];
          ks.forEach(k => { if (store[k] != null) res[k] = JSON.parse(store[k]); });
          if (cb) cb(res);
          return Promise.resolve(res);
        },
        set(_items, cb) { if (cb) cb(); return Promise.resolve(); },
        clear(cb)       { if (cb) cb(); return Promise.resolve(); },
      }
    },
    runtime: {
      getURL: p => p,
      openOptionsPage: () => {},
      sendMessage: () => {},
      lastError: null,
    },
    downloads: { showDefaultFolder: () => {} },
  };
})();`;

const DARK_PATCH = `document.documentElement.classList.add("dark");`;

async function shot(page, file) {
  await page.waitForTimeout(1800);
  await page.screenshot({ path: path.join(outDir, file), fullPage: false });
  console.log("✓", file);
}

const browser = await chromium.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

// ── 1. Popup — light ────────────────────────────────────────────────────────
{
  const ctx = await browser.newContext({ viewport: { width: 420, height: 600 }, deviceScaleFactor: 2 });
  const p = await ctx.newPage();
  await p.addInitScript(CHROME_MOCK);
  await p.goto(popupUrl, { waitUntil: "networkidle" });
  await shot(p, "1-popup-light.png");
  await ctx.close();
}

// ── 2. Popup — dark ─────────────────────────────────────────────────────────
{
  const ctx = await browser.newContext({ viewport: { width: 420, height: 600 }, deviceScaleFactor: 2 });
  const p = await ctx.newPage();
  await p.addInitScript(CHROME_MOCK);
  await p.addInitScript(DARK_PATCH);
  await p.goto(popupUrl, { waitUntil: "networkidle" });
  await shot(p, "2-popup-dark.png");
  await ctx.close();
}

// ── 3. Options — General tab ─────────────────────────────────────────────────
{
  const ctx = await browser.newContext({ viewport: { width: 1200, height: 820 }, deviceScaleFactor: 2 });
  const p = await ctx.newPage();
  await p.addInitScript(CHROME_MOCK);
  await p.goto(optionsUrl, { waitUntil: "networkidle" });
  await shot(p, "3-options-general.png");
  await ctx.close();
}

// ── 4. Options — History tab ─────────────────────────────────────────────────
{
  const ctx = await browser.newContext({ viewport: { width: 1200, height: 820 }, deviceScaleFactor: 2 });
  const p = await ctx.newPage();
  await p.addInitScript(CHROME_MOCK);
  await p.goto(optionsUrl, { waitUntil: "networkidle" });
  await p.waitForTimeout(600);
  await p.click("button:has-text('History')");
  await shot(p, "4-options-history.png");
  await ctx.close();
}

// ── 5. Options — dark, Domains tab ──────────────────────────────────────────
{
  const ctx = await browser.newContext({ viewport: { width: 1200, height: 820 }, deviceScaleFactor: 2 });
  const p = await ctx.newPage();
  await p.addInitScript(CHROME_MOCK);
  await p.addInitScript(DARK_PATCH);
  await p.goto(optionsUrl, { waitUntil: "networkidle" });
  await p.waitForTimeout(600);
  await p.click("button:has-text('Domains')");
  await shot(p, "5-options-domains-dark.png");
  await ctx.close();
}

await browser.close();
console.log("\nAll screenshots saved to screenshots/");

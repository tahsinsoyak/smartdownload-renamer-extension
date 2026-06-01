import { chromium } from "playwright";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir    = path.join(__dirname, "../screenshots");
const distDir   = path.join(__dirname, "../dist");
const optionsUrl = "file:///" + distDir.replace(/\\/g, "/") + "/options.html";

fs.mkdirSync(outDir, { recursive: true });

const CHROME_MOCK = `(function () {
  const settings = {
    enabled:true,template:"{date}_{source}_{type}.{ext}",dateFormat:"YYYY-MM-DD",separator:"_",
    preserveOriginalName:false,includeSource:true,includeType:true,includeDate:true,asciiSafeMode:true,
    allowTurkishCharacters:false,maxFilenameLength:120,conflictStrategy:"append_number",
    skipExecutables:true,skipDescriptiveFilenames:true,ignoredDomains:[],ignoreKeywords:[],
  };
  const domainRules = [
    {id:"1",domain:"amazon.com.tr",sourceName:"Amazon",defaultDocumentType:"invoice",enabled:true,createdAt:"2026-01-01T00:00:00Z"},
    {id:"2",domain:"trendyol.com",sourceName:"Trendyol",defaultDocumentType:"receipt",enabled:true,createdAt:"2026-01-01T00:00:00Z"},
    {id:"3",domain:"udemy.com",sourceName:"Udemy",defaultDocumentType:"certificate",enabled:true,createdAt:"2026-01-01T00:00:00Z"},
    {id:"4",domain:"github.com",sourceName:"GitHub",defaultDocumentType:"download",enabled:true,createdAt:"2026-01-01T00:00:00Z"},
  ];
  const history = [
    {id:"h1",originalFilename:"invoice(3).pdf",suggestedFilename:"2026-05-30_Amazon_Invoice.pdf",sourceDomain:"amazon.com.tr",sourceName:"Amazon",documentType:"invoice",fileExtension:"pdf",createdAt:new Date(Date.now()-3600000).toISOString(),status:"renamed"},
    {id:"h2",originalFilename:"stripe_backup_code.txt",suggestedFilename:"stripe_backup_code.txt",sourceDomain:"stripe.com",sourceName:"Stripe",documentType:"download",fileExtension:"txt",createdAt:new Date(Date.now()-93600000).toISOString(),status:"skipped"},
    {id:"h3",originalFilename:"download.pdf",suggestedFilename:"2026-05-29_Udemy_Certificate.pdf",sourceDomain:"udemy.com",sourceName:"Udemy",documentType:"certificate",fileExtension:"pdf",createdAt:new Date(Date.now()-180000000).toISOString(),status:"renamed"},
    {id:"h4",originalFilename:"giftmemory.zip",suggestedFilename:"2026-05-28_Website_Form.zip",sourceDomain:"giftmemory.app",sourceName:"Website",documentType:"archive",fileExtension:"zip",createdAt:new Date(Date.now()-270000000).toISOString(),status:"renamed"},
  ];
  const store={settings:JSON.stringify(settings),domainRules:JSON.stringify(domainRules),history:JSON.stringify(history),theme:'"light"'};
  window.chrome={
    storage:{local:{
      get(keys,cb){
        const res={};
        const ks=keys==null?Object.keys(store):Array.isArray(keys)?keys:typeof keys==="object"?Object.keys(keys):[keys];
        ks.forEach(k=>{if(store[k]!=null)res[k]=JSON.parse(store[k]);});
        if(cb)cb(res);return Promise.resolve(res);
      },
      set(_,cb){if(cb)cb();return Promise.resolve();},
      clear(cb){if(cb)cb();return Promise.resolve();},
    }},
    runtime:{getURL:p=>p,openOptionsPage:()=>{},sendMessage:()=>{},lastError:null},
    downloads:{showDefaultFolder:()=>{}},
  };
})();`;

const DARK = `document.documentElement.classList.add("dark");`;

async function clickTabByLabel(page, label) {
  await page.evaluate((lbl) => {
    const btns = document.querySelectorAll("button");
    for (const btn of btns) {
      if (btn.textContent && btn.textContent.includes(lbl)) {
        btn.click();
        return;
      }
    }
  }, label);
}

const browser = await chromium.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: true,
  args: ["--no-sandbox"],
});

// ── 4. Options — History tab ─────────────────────────────────────────────────
{
  const ctx = await browser.newContext({ viewport:{ width:1200, height:820 }, deviceScaleFactor:2 });
  const p = await ctx.newPage();
  await p.addInitScript(CHROME_MOCK);
  await p.goto(optionsUrl, { waitUntil:"networkidle" });
  await p.waitForTimeout(1200);
  await clickTabByLabel(p, "History");
  await p.waitForTimeout(800);
  await p.screenshot({ path: outDir + "/4-options-history.png" });
  console.log("✓ 4-options-history.png");
  await ctx.close();
}

// ── 5. Options — Domains tab, dark ──────────────────────────────────────────
{
  const ctx = await browser.newContext({ viewport:{ width:1200, height:820 }, deviceScaleFactor:2 });
  const p = await ctx.newPage();
  await p.addInitScript(CHROME_MOCK);
  await p.addInitScript(DARK);
  await p.goto(optionsUrl, { waitUntil:"networkidle" });
  await p.waitForTimeout(1200);
  await clickTabByLabel(p, "Domains");
  await p.waitForTimeout(800);
  await p.screenshot({ path: outDir + "/5-options-domains-dark.png" });
  console.log("✓ 5-options-domains-dark.png");
  await ctx.close();
}

await browser.close();
console.log("Done.");

import { chromium } from "playwright";
import { existsSync, rmSync } from "node:fs";
import path from "node:path";

const rootDir = path.resolve(import.meta.dirname, "..");
const distDir = path.join(rootDir, "dist");
const screenshotsDir = path.join(rootDir, "screenshots");
const tempRoot = path.join(rootDir, ".tmp");
const profileDir = path.join(tempRoot, `extension-profile-${process.pid}`);

if (!existsSync(path.join(distDir, "manifest.json"))) {
  throw new Error("Build the extension before running this check.");
}

const context = await chromium.launchPersistentContext(profileDir, {
  channel: "chromium",
  headless: true,
  viewport: { width: 1200, height: 820 },
  args: [
    `--disable-extensions-except=${distDir}`,
    `--load-extension=${distDir}`,
    "--no-sandbox",
  ],
});

try {
  const worker = context.serviceWorkers()[0] ?? await context.waitForEvent("serviceworker", { timeout: 15_000 });
  const extensionId = new URL(worker.url()).host;
  const popup = await context.newPage();
  const pageErrors = [];

  popup.on("console", (message) => {
    if (message.type() === "error") pageErrors.push(message.text());
  });
  popup.on("requestfailed", (request) => pageErrors.push(`${request.url()}: ${request.failure()?.errorText}`));
  await popup.setViewportSize({ width: 440, height: 640 });

  await popup.goto(`chrome-extension://${extensionId}/popup.html`, { waitUntil: "networkidle" });
  await popup.evaluate(() => chrome.storage.local.set({ theme: "dark" }));
  await popup.reload({ waitUntil: "networkidle" });
  await popup.evaluate(() => document.fonts.ready);

  const popupMetrics = await popup.evaluate(() => ({
    width: document.body.getBoundingClientRect().width,
    height: document.body.getBoundingClientRect().height,
    theme: document.documentElement.classList.contains("dark") ? "dark" : "light",
    rootFont: getComputedStyle(document.documentElement).fontFamily,
    bodyFont: getComputedStyle(document.body).fontFamily,
    fontLoaded: document.fonts.check('14px "Plus Jakarta Sans Variable"'),
    stylesheets: [...document.styleSheets].map((sheet) => sheet.href),
  }));

  await popup.screenshot({
    path: path.join(screenshotsDir, "popup-extension-dark.png"),
    clip: { x: 0, y: 0, width: popupMetrics.width, height: popupMetrics.height },
  });

  const options = await context.newPage();
  await options.setViewportSize({ width: 1200, height: 820 });
  await options.goto(`chrome-extension://${extensionId}/options.html`, { waitUntil: "networkidle" });
  await options.evaluate(() => document.fonts.ready);
  await options.screenshot({ path: path.join(screenshotsDir, "options-extension-dark.png"), fullPage: true });

  const mobileOptions = await context.newPage();
  await mobileOptions.setViewportSize({ width: 375, height: 820 });
  await mobileOptions.goto(`chrome-extension://${extensionId}/options.html`, { waitUntil: "networkidle" });
  const mobileMetrics = await mobileOptions.evaluate(() => ({
    width: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    theme: document.documentElement.classList.contains("dark") ? "dark" : "light",
  }));
  await mobileOptions.screenshot({ path: path.join(screenshotsDir, "options-extension-mobile-dark.png"), fullPage: true });

  if (!popupMetrics.fontLoaded || popupMetrics.bodyFont !== popupMetrics.rootFont) {
    throw new Error("Bundled UI font did not load in the extension context.");
  }
  if (popupMetrics.width !== 440 || popupMetrics.theme !== "dark") {
    throw new Error("Popup dimensions or stored dark theme did not match the release UI.");
  }
  if (mobileMetrics.scrollWidth > mobileMetrics.width) {
    throw new Error("Options page has horizontal overflow on a 375px viewport.");
  }
  if (pageErrors.length > 0) {
    throw new Error(`Extension page errors: ${pageErrors.join(" | ")}`);
  }

  console.log(JSON.stringify({ extensionId, popup: popupMetrics, mobileOptions: mobileMetrics, pageErrors }, null, 2));
} finally {
  await context.close();
  const resolvedProfile = path.resolve(profileDir);
  if (resolvedProfile.startsWith(`${path.resolve(tempRoot)}${path.sep}`)) {
    rmSync(resolvedProfile, { recursive: true, force: true });
  }
}

import { chromium } from "playwright";
import { existsSync, rmSync } from "node:fs";
import path from "node:path";

const rootDir = path.resolve(import.meta.dirname, "..");
const distDir = path.join(rootDir, "dist");
const screenshotsDir = path.join(rootDir, "screenshots");
const tempRoot = path.join(rootDir, ".tmp");
const profileDir = path.join(tempRoot, `extension-profile-${process.pid}`);
const now = Date.now();
const sampleDownload = {
  id: "ui-check-download",
  downloadId: 101,
  originalFilename: "cost-per-use-extension.zip",
  suggestedFilename: "cost-per-use-extension.zip",
  finalFilename: "cost-per-use-extension.zip",
  fullPath: "C:\\Users\\Taylor\\Downloads\\cost-per-use-extension.zip",
  fileSize: 1_248_311,
  completedAt: new Date(now - 12_000).toISOString(),
  exists: true,
  sourceDomain: "release-assets.githubusercontent.com",
  sourceName: "GitHub",
  documentType: "archive",
  fileExtension: "zip",
  createdAt: new Date(now - 15_000).toISOString(),
  status: "skipped",
  reason: "Filename is already descriptive",
};

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
  popup.on("requestfailed", (request) => {
    const errorText = request.failure()?.errorText;
    if (errorText !== "net::ERR_ABORTED") {
      pageErrors.push(`${request.url()}: ${errorText}`);
    }
  });
  await popup.setViewportSize({ width: 420, height: 600 });

  await popup.goto(`chrome-extension://${extensionId}/popup.html`, { waitUntil: "networkidle" });
  await popup.evaluate(
    (record) => chrome.storage.local.set({ theme: "dark", settings: { language: "en" }, renameHistory: [record] }),
    sampleDownload,
  );
  await popup.reload({ waitUntil: "networkidle" });
  await popup.evaluate(() => document.fonts.ready);

  const popupMetrics = await popup.evaluate(() => ({
    width: document.body.getBoundingClientRect().width,
    height: document.body.getBoundingClientRect().height,
    theme: document.documentElement.classList.contains("dark") ? "dark" : "light",
    rootFont: getComputedStyle(document.documentElement).fontFamily,
    bodyFont: getComputedStyle(document.body).fontFamily,
    bodyFontLoaded: document.fonts.check('14px "Inter Variable"'),
    displayFontLoaded: document.fonts.check('600 14px "Poppins"'),
    stylesheets: [...document.styleSheets].map((sheet) => sheet.href),
  }));
  const popupNavigation = {
    settingsButtons: await popup.getByRole("button", { name: "Open settings" }).count(),
    historyButtons: await popup.getByRole("button", { name: "History" }).count(),
    support: await popup.getByRole("link", { name: "Support Smart Download Renamer on Patreon" })
      .evaluate((element) => {
        const bounds = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        const footerStyle = getComputedStyle(element.closest("footer"));
        return {
          width: bounds.width,
          borderRadius: Number.parseFloat(style.borderRadius),
          background: style.backgroundColor,
          footerBackground: footerStyle.backgroundColor,
        };
      }),
  };

  await popup.screenshot({
    path: path.join(screenshotsDir, "popup-extension-dark.png"),
    clip: { x: 0, y: 0, width: popupMetrics.width, height: popupMetrics.height },
  });

  const options = await context.newPage();
  await options.setViewportSize({ width: 1200, height: 820 });
  await options.goto(`chrome-extension://${extensionId}/options.html#general`, { waitUntil: "networkidle" });
  await options.evaluate(() => document.fonts.ready);
  await options.screenshot({ path: path.join(screenshotsDir, "options-extension-dark.png"), fullPage: true });

  await popup.evaluate(() => chrome.storage.local.set({ settings: { language: "tr" } }));
  await popup.reload({ waitUntil: "networkidle" });
  await popup.evaluate(() => document.fonts.ready);
  const turkishPopup = await popup.evaluate(() => ({
    width: document.body.getBoundingClientRect().width,
    height: document.body.getBoundingClientRect().height,
    language: document.documentElement.lang,
    hasSettings: document.querySelector('[data-testid="popup-settings-button"]') !== null,
    hasSupport: document.body.innerText.includes("Bu uzantıyı destekle"),
  }));
  const turkishNavigation = {
    settingsButtons: await popup.getByRole("button", { name: "Ayarları aç" }).count(),
    footerButtons: await popup.locator("footer button").count(),
    support: await popup.locator('footer a[href*="patreon.com"]').evaluate((element) => {
      const bounds = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      const footerStyle = getComputedStyle(element.closest("footer"));
      return {
        width: bounds.width,
        borderRadius: Number.parseFloat(style.borderRadius),
        background: style.backgroundColor,
        footerBackground: footerStyle.backgroundColor,
      };
    }),
  };
  await popup.screenshot({
    path: path.join(screenshotsDir, "popup-extension-dark-tr.png"),
    clip: { x: 0, y: 0, width: turkishPopup.width, height: turkishPopup.height },
  });

  const supportByTab = {};
  for (const tab of ["general", "template", "domains", "history", "about"]) {
    await options.goto(`chrome-extension://${extensionId}/options.html#${tab}`, { waitUntil: "networkidle" });
    await options.reload({ waitUntil: "networkidle" });
    supportByTab[tab] = await options
      .locator('footer a[href*="patreon.com"]')
      .isVisible();
  }
  const desktopSupportLinks = await options.locator('a[href*="patreon.com"]').count();
  await options.goto(`chrome-extension://${extensionId}/options.html#general`, { waitUntil: "networkidle" });
  await options.reload({ waitUntil: "networkidle" });
  const turkishOptions = await options.evaluate(() => ({
    language: document.documentElement.lang,
    hasLanguageLabel: document.body.innerText.includes("Arayüz dili"),
    hasTurkishOption: document.body.innerText.includes("Türkçe"),
  }));
  await options.screenshot({ path: path.join(screenshotsDir, "options-extension-dark-tr.png"), fullPage: true });

  const mobileOptions = await context.newPage();
  await mobileOptions.setViewportSize({ width: 375, height: 820 });
  await mobileOptions.goto(`chrome-extension://${extensionId}/options.html`, { waitUntil: "networkidle" });
  const mobileMetrics = await mobileOptions.evaluate(() => ({
    width: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    theme: document.documentElement.classList.contains("dark") ? "dark" : "light",
  }));
  await mobileOptions.screenshot({ path: path.join(screenshotsDir, "options-extension-mobile-dark-tr.png"), fullPage: true });

  if (!popupMetrics.bodyFontLoaded || !popupMetrics.displayFontLoaded || popupMetrics.bodyFont !== popupMetrics.rootFont) {
    throw new Error("Bundled UI font did not load in the extension context.");
  }
  if (
    popupMetrics.width !== 420
    || popupMetrics.height < 420
    || popupMetrics.height > 500
    || popupMetrics.theme !== "dark"
  ) {
    throw new Error("Popup dimensions or stored dark theme did not match the release UI.");
  }
  if (
    popupNavigation.settingsButtons !== 1
    || popupNavigation.historyButtons !== 0
    || popupNavigation.support.width >= popupMetrics.width
    || popupNavigation.support.width < popupMetrics.width - 32
    || popupNavigation.support.borderRadius < 12
    || popupNavigation.support.background === popupNavigation.support.footerBackground
  ) {
    throw new Error("Popup does not have a top Settings action and a calm rounded Support footer.");
  }
  if (
    turkishPopup.language !== "tr"
    || !turkishPopup.hasSettings
    || !turkishPopup.hasSupport
    || turkishNavigation.settingsButtons !== 1
    || turkishNavigation.footerButtons !== 0
    || turkishNavigation.support.width >= turkishPopup.width
    || turkishNavigation.support.borderRadius < 12
    || turkishNavigation.support.background === turkishNavigation.support.footerBackground
  ) {
    throw new Error("Turkish popup localization or navigation layout did not match the release UI.");
  }
  if (
    turkishOptions.language !== "tr"
    || !turkishOptions.hasLanguageLabel
    || !turkishOptions.hasTurkishOption
  ) {
    throw new Error("Turkish options localization did not load correctly.");
  }
  if (Object.values(supportByTab).some((visible) => !visible)) {
    throw new Error("Support footer is not visible on every options page.");
  }
  if (desktopSupportLinks !== 2) {
    throw new Error("Options page must expose Support in both the sidebar and the footer.");
  }
  if (mobileMetrics.scrollWidth > mobileMetrics.width) {
    throw new Error("Options page has horizontal overflow on a 375px viewport.");
  }
  if (pageErrors.length > 0) {
    throw new Error(`Extension page errors: ${pageErrors.join(" | ")}`);
  }

  console.log(JSON.stringify({
    extensionId,
    popup: popupMetrics,
    popupNavigation,
    turkishPopup,
    turkishNavigation,
    turkishOptions,
    supportByTab,
    desktopSupportLinks,
    mobileOptions: mobileMetrics,
    pageErrors,
  }, null, 2));
} finally {
  await context.close();
  const resolvedProfile = path.resolve(profileDir);
  if (resolvedProfile.startsWith(`${path.resolve(tempRoot)}${path.sep}`)) {
    rmSync(resolvedProfile, { recursive: true, force: true });
  }
}

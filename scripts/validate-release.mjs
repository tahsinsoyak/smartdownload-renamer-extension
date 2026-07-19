import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const requiredLocales = ["en", "tr"];
const requiredPermissions = ["downloads", "downloads.open", "storage"];
const requiredDocs = [
  "docs/privacy-policy.md",
  "docs/support.md",
  "docs/localization.md",
  "docs/chrome-web-store/README.md",
  "docs/chrome-web-store/listing.md",
  "docs/chrome-web-store/listings/en.md",
  "docs/chrome-web-store/listings/tr.md",
  "docs/chrome-web-store/privacy-practices.md",
  "docs/chrome-web-store/permission-justifications.md",
  "docs/chrome-web-store/assets.md",
  "docs/chrome-web-store/icon-guidelines.md",
  "docs/chrome-web-store/submission-checklist.md",
];

function fail(message) {
  throw new Error(message);
}

function readJson(relativePath) {
  const absolute = path.join(root, relativePath);
  if (!existsSync(absolute)) fail(`Missing ${relativePath}`);
  return JSON.parse(readFileSync(absolute, "utf8"));
}

const manifest = readJson("public/manifest.json");
if (manifest.default_locale !== "en") fail("Manifest default_locale must be en.");
if (manifest.name !== "__MSG_extName__" || manifest.description !== "__MSG_extDescription__") {
  fail("Manifest name and description must use localized messages.");
}

const permissions = [...manifest.permissions].sort();
if (JSON.stringify(permissions) !== JSON.stringify([...requiredPermissions].sort())) {
  fail(`Unexpected permissions: ${permissions.join(", ")}`);
}

for (const locale of requiredLocales) {
  const messages = readJson(`public/_locales/${locale}/messages.json`);
  for (const key of ["extName", "extDescription"]) {
    if (typeof messages[key]?.message !== "string" || messages[key].message.trim().length === 0) {
      fail(`Locale ${locale} is missing ${key}.`);
    }
  }
  if (messages.extDescription.message.length > 132) {
    fail(`Locale ${locale} extension description exceeds 132 characters.`);
  }
  if (!existsSync(path.join(root, `dist/_locales/${locale}/messages.json`))) {
    fail(`Built extension is missing locale ${locale}.`);
  }
}

for (const relativePath of requiredDocs) {
  if (!existsSync(path.join(root, relativePath))) fail(`Missing ${relativePath}`);
}

const privacyPolicy = readFileSync(path.join(root, "docs/privacy-policy.md"), "utf8");
if (!privacyPolicy.includes("Chrome Web Store User Data Policy")) {
  fail("Privacy policy is missing the Limited Use disclosure.");
}

console.log(JSON.stringify({
  manifestVersion: manifest.version,
  locales: requiredLocales,
  permissions: requiredPermissions,
  documentationFiles: requiredDocs.length,
  remoteCode: false,
}, null, 2));

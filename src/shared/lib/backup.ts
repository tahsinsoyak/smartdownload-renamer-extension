import { DEFAULT_SETTINGS } from "../constants/templates";
import { languageCodes } from "../locales/catalog";
import type { DomainRule, NamingSettings, RenameRecord } from "../types/downloads";

export type ExtensionBackup = {
  format: "smart-download-renamer-backup";
  version: 1;
  exportedAt: string;
  settings: NamingSettings;
  domainRules: DomainRule[];
  history: RenameRecord[];
  theme: "light" | "dark";
};

const object = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export function parseBackup(text: string): ExtensionBackup {
  if (text.length > 5_000_000) throw new Error("fileTooLarge");
  let value: unknown;
  try {
    value = JSON.parse(text);
  } catch {
    throw new Error("invalidBackup");
  }
  if (!object(value) || value.format !== "smart-download-renamer-backup" || value.version !== 1 ||
      !object(value.settings) || !Array.isArray(value.domainRules) || !Array.isArray(value.history) ||
      (value.theme !== "light" && value.theme !== "dark")) {
    throw new Error("invalidBackup");
  }
  const settings = value.settings;
  for (const [key, defaultValue] of Object.entries(DEFAULT_SETTINGS)) {
    if (typeof settings[key] !== typeof defaultValue) throw new Error("invalidBackup");
  }
  if (!Array.isArray(settings.ignoredDomains) || !settings.ignoredDomains.every((item) => typeof item === "string") ||
      !Array.isArray(settings.ignoreKeywords) || !settings.ignoreKeywords.every((item) => typeof item === "string") ||
      !languageCodes.includes(settings.language as (typeof languageCodes)[number]) ||
      !["YYYY-MM-DD", "DD-MM-YYYY", "YYYYMMDD"].includes(settings.dateFormat as string) ||
      !["_", "-", " "].includes(settings.separator as string) ||
      !["append_number", "uniquify"].includes(settings.conflictStrategy as string) ||
      !Number.isInteger(settings.maxFilenameLength) || (settings.maxFilenameLength as number) < 20 ||
      (settings.maxFilenameLength as number) > 255 ||
      value.domainRules.length > 1000 || value.history.length > 100) {
    throw new Error("invalidBackup");
  }
  if (!value.domainRules.every((rule) => object(rule) && typeof rule.id === "string" &&
      typeof rule.domain === "string" && typeof rule.sourceName === "string" &&
      typeof rule.enabled === "boolean" && typeof rule.createdAt === "string" &&
      (rule.defaultDocumentType === undefined || typeof rule.defaultDocumentType === "string") &&
      (rule.customTemplate === undefined || typeof rule.customTemplate === "string"))) {
    throw new Error("invalidBackup");
  }
  if (!value.history.every((record) => object(record) && typeof record.id === "string" &&
      typeof record.originalFilename === "string" && typeof record.suggestedFilename === "string" &&
      typeof record.documentType === "string" && typeof record.fileExtension === "string" &&
      typeof record.createdAt === "string" && ["renamed", "skipped", "failed"].includes(record.status as string))) {
    throw new Error("invalidBackup");
  }
  return {
    format: "smart-download-renamer-backup",
    version: 1,
    exportedAt: typeof value.exportedAt === "string" ? value.exportedAt : new Date().toISOString(),
    settings: settings as NamingSettings,
    domainRules: value.domainRules as DomainRule[],
    history: (value.history as RenameRecord[]).map(({ downloadId: _downloadId, ...record }) => record),
    theme: value.theme,
  };
}

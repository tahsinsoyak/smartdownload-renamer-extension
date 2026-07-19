import { getLanguageConfig, translate, type Language } from "../locales";
import type { RenameRecord } from "../types/downloads";

export function displayFilename(record: RenameRecord): string {
  if (record.status === "renamed") {
    return record.finalFilename || record.suggestedFilename;
  }

  return record.originalFilename;
}

export function formatFileSize(bytes?: number, language: Language = "en"): string {
  if (bytes === undefined || bytes < 0) return translate("format.sizeUnavailable", language);
  if (bytes < 1024) return `${bytes} B`;

  const units = ["KB", "MB", "GB", "TB"];
  let value = bytes / 1024;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  const digits = value >= 10 || Number.isInteger(value) ? 0 : 1;
  const locale = getLanguageConfig(language).dateLocale;
  const formatted = new Intl.NumberFormat(locale, { maximumFractionDigits: digits }).format(value);
  return `${formatted} ${units[unitIndex]}`;
}

export function formatRelativeTime(timestamp: string, language: Language = "en"): string {
  const diffMs = Math.max(0, Date.now() - new Date(timestamp).getTime());
  const minutes = Math.floor(diffMs / 60_000);
  const hours = Math.floor(diffMs / 3_600_000);
  const days = Math.floor(diffMs / 86_400_000);
  const locale = getLanguageConfig(language).dateLocale;
  const relative = new Intl.RelativeTimeFormat(locale, { numeric: "auto", style: "narrow" });

  if (minutes < 1) return relative.format(0, "minute");
  if (minutes < 60) return relative.format(-minutes, "minute");
  if (hours < 24) return relative.format(-hours, "hour");
  if (days < 7) return relative.format(-days, "day");

  return new Date(timestamp).toLocaleDateString(locale, {
    month: "short",
    day: "numeric",
  });
}

export function formatDownloadLocation(fullPath?: string, language: Language = "en"): string {
  if (!fullPath) return translate("format.downloadsFolder", language);

  const parts = fullPath.replace(/\\/g, "/").split("/").filter(Boolean);
  const folders = parts.slice(0, -1);
  const downloadsIndex = folders.findIndex((part) => part.toLowerCase() === "downloads");
  const visible = downloadsIndex >= 0 ? folders.slice(downloadsIndex) : folders.slice(-3);

  return visible.length > 0 ? visible.join(" / ") : translate("format.downloadsFolder", language);
}

export function formatDocumentType(record: RenameRecord, language: Language = "en"): string {
  const type = translate(`documentTypes.${record.documentType}`, language);
  return `${type} · ${record.fileExtension.toUpperCase()}`;
}

const reasonKeys: Record<string, string> = {
  "Extension disabled": "reasons.disabled",
  "Executable download skipped": "reasons.executable",
  "Domain ignored": "reasons.domain",
  "Ignore keyword matched": "reasons.keyword",
  "Filename already descriptive": "reasons.descriptive",
  "Filename is already descriptive": "reasons.descriptive",
  "Unknown download rename error": "reasons.unknownError",
};

export function formatReason(reason: string | undefined, language: Language = "en"): string {
  if (!reason) return translate("common.unchanged", language);
  const key = reasonKeys[reason];
  return key ? translate(key, language) : reason;
}

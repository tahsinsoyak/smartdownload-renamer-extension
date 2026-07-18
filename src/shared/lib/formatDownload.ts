import type { RenameRecord } from "../types/downloads";

export function displayFilename(record: RenameRecord): string {
  if (record.status === "renamed") {
    return record.finalFilename || record.suggestedFilename;
  }

  return record.originalFilename;
}

export function formatFileSize(bytes?: number): string {
  if (bytes === undefined || bytes < 0) return "Size unavailable";
  if (bytes < 1024) return `${bytes} B`;

  const units = ["KB", "MB", "GB", "TB"];
  let value = bytes / 1024;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  const digits = value >= 10 || Number.isInteger(value) ? 0 : 1;
  return `${value.toFixed(digits)} ${units[unitIndex]}`;
}

export function formatRelativeTime(timestamp: string): string {
  const diffMs = Math.max(0, Date.now() - new Date(timestamp).getTime());
  const minutes = Math.floor(diffMs / 60_000);
  const hours = Math.floor(diffMs / 3_600_000);
  const days = Math.floor(diffMs / 86_400_000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;

  return new Date(timestamp).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

export function formatDownloadLocation(fullPath?: string): string {
  if (!fullPath) return "Downloads folder";

  const parts = fullPath.replace(/\\/g, "/").split("/").filter(Boolean);
  const folders = parts.slice(0, -1);
  const downloadsIndex = folders.findIndex((part) => part.toLowerCase() === "downloads");
  const visible = downloadsIndex >= 0 ? folders.slice(downloadsIndex) : folders.slice(-3);

  return visible.length > 0 ? visible.join(" / ") : "Downloads folder";
}

export function formatDocumentType(record: RenameRecord): string {
  const type = record.documentType.replace(/_/g, " ");
  return `${type.charAt(0).toUpperCase()}${type.slice(1)} · ${record.fileExtension.toUpperCase()}`;
}

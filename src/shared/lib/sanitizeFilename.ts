import type { NamingSettings } from "../types/downloads";

const TURKISH_CHAR_MAP: Record<string, string> = {
  ç: "c",
  Ç: "C",
  ğ: "g",
  Ğ: "G",
  ı: "i",
  İ: "I",
  ö: "o",
  Ö: "O",
  ş: "s",
  Ş: "S",
  ü: "u",
  Ü: "U"
};

export function splitFilename(filename: string): { base: string; ext: string } {
  const clean = filename.split(/[\\/]/).pop() || filename;
  const index = clean.lastIndexOf(".");
  if (index <= 0 || index === clean.length - 1) return { base: clean, ext: "" };
  return { base: clean.slice(0, index), ext: clean.slice(index + 1).toLowerCase() };
}

export function sanitizeToken(value: string, settings: Pick<NamingSettings, "asciiSafeMode" | "allowTurkishCharacters">): string {
  let next = value.trim();
  if (settings.asciiSafeMode || !settings.allowTurkishCharacters) {
    next = next.replace(/[çÇğĞıİöÖşŞüÜ]/g, (char) => TURKISH_CHAR_MAP[char] ?? char);
    next = next.normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
  }
  next = next
    .replace(/[<>:"\\|?*\u0000-\u001F]/g, " ")
    .replace(/[\u{1F300}-\u{1FAFF}]/gu, "")
    .replace(/\s+/g, "_")
    .replace(/_+/g, "_")
    .replace(/_+\./g, ".")
    .replace(/^[._-]+|[._-]+$/g, "");
  return next || "Download";
}

export function sanitizeFilename(name: string, settings: Pick<NamingSettings, "asciiSafeMode" | "allowTurkishCharacters" | "maxFilenameLength">): string {
  const normalizedPath = name
    .split("/")
    .map((part) => sanitizeToken(part, settings))
    .filter(Boolean)
    .join("/");

  if (normalizedPath.length <= settings.maxFilenameLength) return normalizedPath;

  const lastSlash = normalizedPath.lastIndexOf("/");
  const folder = lastSlash >= 0 ? normalizedPath.slice(0, lastSlash + 1) : "";
  const file = lastSlash >= 0 ? normalizedPath.slice(lastSlash + 1) : normalizedPath;
  const { base, ext } = splitFilename(file);
  const extension = ext ? `.${ext}` : "";
  const available = Math.max(20, settings.maxFilenameLength - folder.length - extension.length);
  return `${folder}${base.slice(0, available).replace(/[._-]+$/g, "")}${extension}`;
}

export function ensureExtension(filename: string, extension: string): string {
  const cleanExt = extension.replace(/^\./, "").toLowerCase();
  if (!cleanExt) return filename;
  const current = splitFilename(filename).ext;
  if (current === cleanExt) return filename;
  return `${filename.replace(/\.+$/g, "")}.${cleanExt}`;
}

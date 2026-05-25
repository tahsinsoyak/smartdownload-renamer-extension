import {
  ARCHIVE_EXTENSIONS,
  DOCUMENT_EXTENSIONS,
  DOCUMENT_TYPE_KEYWORDS,
  EXECUTABLE_EXTENSIONS,
  IMAGE_EXTENSIONS,
  PRESENTATION_EXTENSIONS,
  SPREADSHEET_EXTENSIONS
} from "../constants/documentTypes";
import type { DocumentType, DomainRule } from "../types/downloads";
import { matchDomainRule } from "./domainRules";
import { splitFilename } from "./sanitizeFilename";

export type ClassificationInput = {
  filename: string;
  url?: string;
  finalUrl?: string;
  mime?: string;
  extension?: string;
  sourceDomain?: string;
  domainRules?: DomainRule[];
};

function haystack(input: ClassificationInput): string {
  return [input.filename, input.url, input.finalUrl, input.mime].filter(Boolean).join(" ").toLowerCase();
}

export function isExecutableExtension(extension: string): boolean {
  return EXECUTABLE_EXTENSIONS.includes(extension.replace(/^\./, "").toLowerCase());
}

export function classifyDocument(input: ClassificationInput): DocumentType {
  const ext = (input.extension || splitFilename(input.filename).ext).toLowerCase();
  const rule = input.sourceDomain ? matchDomainRule(input.sourceDomain, input.domainRules ?? []) : undefined;
  const text = haystack(input)
    .replace(/[ğ]/g, "g")
    .replace(/[ü]/g, "u")
    .replace(/[ş]/g, "s")
    .replace(/[ı]/g, "i")
    .replace(/[ö]/g, "o")
    .replace(/[ç]/g, "c");

  const priority: DocumentType[] = [
    "bank_receipt",
    "invoice",
    "receipt",
    "certificate",
    "transcript",
    "ticket",
    "contract",
    "statement",
    "presentation",
    "report",
    "form",
    "download"
  ];

  for (const type of priority) {
    if (DOCUMENT_TYPE_KEYWORDS[type].some((keyword) => text.includes(keyword.toLowerCase()))) return type;
  }

  if (rule?.defaultDocumentType) return rule.defaultDocumentType;
  if (IMAGE_EXTENSIONS.includes(ext) || input.mime?.startsWith("image/")) return "image";
  if (ARCHIVE_EXTENSIONS.includes(ext)) return "archive";
  if (PRESENTATION_EXTENSIONS.includes(ext)) return "presentation";
  if (SPREADSHEET_EXTENSIONS.includes(ext)) return "document";
  if (DOCUMENT_EXTENSIONS.includes(ext)) return "document";
  if (isExecutableExtension(ext)) return "download";
  return "download";
}

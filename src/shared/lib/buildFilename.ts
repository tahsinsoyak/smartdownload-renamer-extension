import { DOCUMENT_TYPE_LABELS, GENERIC_BASENAMES } from "../constants/documentTypes";
import { DEFAULT_TEMPLATE } from "../constants/templates";
import type { FilenameSuggestion, FilenameSuggestionInput, NamingSettings } from "../types/downloads";
import { classifyDocument, isExecutableExtension } from "./classifyDocument";
import { detectSource } from "./detectSource";
import { formatDate } from "./formatDate";
import { matchDomainRule } from "./domainRules";
import { ensureExtension, sanitizeFilename, sanitizeToken, splitFilename } from "./sanitizeFilename";

export function isGenericFilename(filename: string): boolean {
  const { base } = splitFilename(filename);
  const normalized = base.toLowerCase().replace(/\(\d+\)$/g, "").replace(/[_\-\s]+/g, "");
  if (/^\d{4,}$/.test(normalized)) return true;
  return GENERIC_BASENAMES.some((generic) => normalized === generic.replace(/[_\-\s]+/g, ""));
}

export function isAlreadyDescriptive(filename: string, sourceName?: string): boolean {
  const { base } = splitFilename(filename);
  const normalized = base.toLowerCase();
  const hasDate = /\b(20\d{2}[-_.]?\d{2}[-_.]?\d{2}|\d{2}[-_.]\d{2}[-_.]20\d{2})\b/.test(normalized);
  const hasSource = sourceName ? normalized.includes(sourceName.toLowerCase()) : false;
  const meaningfulWords = normalized.split(/[_\-\s.()]+/).filter((part) => part.length >= 4 && !GENERIC_BASENAMES.includes(part));
  return !isGenericFilename(filename) && (hasDate || hasSource || (base.length >= 18 && meaningfulWords.length >= 2));
}

export function applyTemplate(template: string, variables: Record<string, string>): string {
  return template.replace(/\{(date|source|type|original|ext)\}/g, (_, key: string) => variables[key] ?? "");
}

export function avoidDuplicateFilename(filename: string, existingFilenames: string[]): string {
  if (!existingFilenames.includes(filename)) return filename;
  const { base, ext } = splitFilename(filename);
  const suffix = ext ? `.${ext}` : "";
  let count = 2;
  let candidate = `${base}_${count}${suffix}`;
  while (existingFilenames.includes(candidate)) {
    count += 1;
    candidate = `${base}_${count}${suffix}`;
  }
  return candidate;
}

function extensionFromInput(input: FilenameSuggestionInput): string {
  return (input.fileExtension || splitFilename(input.originalFilename).ext || "download").replace(/^\./, "").toLowerCase();
}

function shouldSkip(input: FilenameSuggestionInput, sourceDomain?: string, sourceName?: string, extension?: string): string | undefined {
  if (!input.settings.enabled) return "Extension disabled";
  if (extension && input.settings.skipExecutables && isExecutableExtension(extension)) return "Executable download skipped";
  if (sourceDomain && input.settings.ignoredDomains.some((domain) => sourceDomain.endsWith(domain.toLowerCase()))) return "Domain ignored";
  const lower = input.originalFilename.toLowerCase();
  if (input.settings.ignoreKeywords.some((keyword) => lower.includes(keyword.toLowerCase()))) return "Ignore keyword matched";
  if (input.settings.skipDescriptiveFilenames && isAlreadyDescriptive(input.originalFilename, sourceName)) return "Filename already descriptive";
  return undefined;
}

export function buildFilename(input: FilenameSuggestionInput): FilenameSuggestion {
  const extension = extensionFromInput(input);
  const source = detectSource({ url: input.url, finalUrl: input.finalUrl, referrer: input.referrer, domainRules: input.domainRules });
  const skipReason = shouldSkip(input, source.sourceDomain, source.sourceName, extension);
  const documentType = classifyDocument({
    filename: input.originalFilename,
    url: input.url,
    finalUrl: input.finalUrl,
    mime: input.mime,
    extension,
    sourceDomain: source.sourceDomain,
    domainRules: input.domainRules
  });

  if (skipReason) {
    return {
      shouldRename: false,
      filename: input.originalFilename,
      originalFilename: input.originalFilename,
      sourceDomain: source.sourceDomain,
      sourceName: source.sourceName,
      documentType,
      fileExtension: extension,
      reason: skipReason
    };
  }

  const rule = source.sourceDomain ? matchDomainRule(source.sourceDomain, input.domainRules) : undefined;
  const { base } = splitFilename(input.originalFilename);
  const settings: NamingSettings = input.settings;
  const variables = {
    date: settings.includeDate ? formatDate(input.startTime, settings.dateFormat) : "",
    source: settings.includeSource ? source.sourceName : "",
    type: settings.includeType ? DOCUMENT_TYPE_LABELS[documentType] : "",
    original: settings.preserveOriginalName ? base : sanitizeToken(base, settings),
    ext: extension
  };

  const template = rule?.customTemplate || settings.template || DEFAULT_TEMPLATE;
  const raw = applyTemplate(template, variables).replace(/_{2,}/g, "_").replace(/--+/g, "-");
  const normalized = sanitizeFilename(raw, settings).replace(/[_-]+\./g, ".");
  const filename = ensureExtension(normalized, extension);

  return {
    shouldRename: filename !== input.originalFilename,
    filename,
    originalFilename: input.originalFilename,
    sourceDomain: source.sourceDomain,
    sourceName: source.sourceName,
    documentType,
    fileExtension: extension
  };
}

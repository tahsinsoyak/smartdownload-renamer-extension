import type { NamingSettings } from "../types/downloads";

export const DEFAULT_TEMPLATE = "{date}_{source}_{type}.{ext}";

export const TEMPLATE_PRESETS = [
  "{date}_{source}_{type}.{ext}",
  "{source}_{date}_{type}.{ext}",
  "{type}_{source}_{date}.{ext}",
  "{date}/{source}_{type}.{ext}",
  "{source}/{date}_{type}.{ext}",
  "{date}_{source}_{type}_{original}.{ext}"
];

export const DEFAULT_SETTINGS: NamingSettings = {
  enabled: true,
  template: DEFAULT_TEMPLATE,
  dateFormat: "YYYY-MM-DD",
  separator: "_",
  preserveOriginalName: false,
  includeSource: true,
  includeType: true,
  includeDate: true,
  asciiSafeMode: false,
  allowTurkishCharacters: true,
  maxFilenameLength: 120,
  conflictStrategy: "append_number",
  skipExecutables: true,
  skipDescriptiveFilenames: true,
  ignoredDomains: [],
  ignoreKeywords: []
};

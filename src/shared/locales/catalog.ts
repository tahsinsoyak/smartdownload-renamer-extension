export const languageCodes = ["en", "tr"] as const;

export type Language = (typeof languageCodes)[number];

export type LanguageConfig = {
  code: Language;
  nativeName: string;
  englishName: string;
  dateLocale: string;
  chromeLocale: string;
  direction: "ltr" | "rtl";
};

export const languages: readonly LanguageConfig[] = [
  { code: "en", nativeName: "English", englishName: "English", dateLocale: "en-US", chromeLocale: "en", direction: "ltr" },
  { code: "tr", nativeName: "Türkçe", englishName: "Turkish", dateLocale: "tr-TR", chromeLocale: "tr", direction: "ltr" },
];

export function resolveLanguage(locale?: string | null): Language {
  if (!locale) return "en";
  const normalized = locale.replace("_", "-").toLowerCase();
  return normalized === "tr" || normalized.startsWith("tr-") ? "tr" : "en";
}

export function detectLanguage(): Language {
  if (typeof chrome !== "undefined" && chrome.i18n?.getUILanguage) {
    return resolveLanguage(chrome.i18n.getUILanguage());
  }
  if (typeof navigator !== "undefined") return resolveLanguage(navigator.language);
  return "en";
}

export function getLanguageConfig(language: Language): LanguageConfig {
  return languages.find((item) => item.code === language) ?? languages[0];
}

export function applyDocumentLanguage(language: Language): void {
  if (typeof document === "undefined") return;
  const config = getLanguageConfig(language);
  document.documentElement.lang = language;
  document.documentElement.dir = config.direction;
}

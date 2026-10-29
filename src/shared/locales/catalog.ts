export const languageCodes = ["en", "tr", "es", "de", "fr", "pt-BR"] as const;

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
  { code: "es", nativeName: "Español", englishName: "Spanish", dateLocale: "es-ES", chromeLocale: "es", direction: "ltr" },
  { code: "de", nativeName: "Deutsch", englishName: "German", dateLocale: "de-DE", chromeLocale: "de", direction: "ltr" },
  { code: "fr", nativeName: "Français", englishName: "French", dateLocale: "fr-FR", chromeLocale: "fr", direction: "ltr" },
  { code: "pt-BR", nativeName: "Português (Brasil)", englishName: "Brazilian Portuguese", dateLocale: "pt-BR", chromeLocale: "pt_BR", direction: "ltr" },
];

export function resolveLanguage(locale?: string | null): Language {
  if (!locale) return "en";
  const normalized = locale.replace("_", "-").toLowerCase();
  const base = normalized.split("-")[0];
  if (base === "pt") return "pt-BR";
  return languageCodes.find((code) => code === base) ?? "en";
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

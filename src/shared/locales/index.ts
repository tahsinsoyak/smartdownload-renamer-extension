import { en } from "./en";
import { tr } from "./tr";
import { es } from "./es";
import { de } from "./de";
import { fr } from "./fr";
import { ptBR } from "./ptBR";
import type { LocaleMessages } from "./createLocale";
import type { Language } from "./catalog";

export {
  applyDocumentLanguage,
  detectLanguage,
  getLanguageConfig,
  languageCodes,
  languages,
  resolveLanguage,
} from "./catalog";
export type { Language, LanguageConfig } from "./catalog";

const translations: Record<Language, LocaleMessages> = { en, tr, es, de, fr, "pt-BR": ptBR };

function resolveKey(messages: LocaleMessages, path: readonly string[]): unknown {
  let value: unknown = messages;
  for (const segment of path) {
    if (!value || typeof value !== "object" || !(segment in value)) return undefined;
    value = (value as Record<string, unknown>)[segment];
  }
  return value;
}

export function translate(
  key: string,
  language: Language = "en",
  values: Record<string, string | number> = {},
): string {
  const path = key.split(".");
  const localized = resolveKey(translations[language], path);
  const fallback = resolveKey(en, path);
  const message = typeof localized === "string"
    ? localized
    : typeof fallback === "string"
      ? fallback
      : key;

  return message.replace(/\{(\w+)\}/g, (match, name: string) => (
    Object.hasOwn(values, name) ? String(values[name]) : match
  ));
}

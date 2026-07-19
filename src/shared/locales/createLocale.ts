import { en } from "./en";

export type LocaleMessages = typeof en;

type DeepPartial<T> = {
  [Key in keyof T]?: T[Key] extends Record<string, unknown> ? DeepPartial<T[Key]> : T[Key];
};

function mergeMessages<T extends Record<string, unknown>>(base: T, override: DeepPartial<T>): T {
  const merged = { ...base } as Record<string, unknown>;

  for (const [key, value] of Object.entries(override)) {
    const baseValue = merged[key];
    if (
      value
      && typeof value === "object"
      && !Array.isArray(value)
      && baseValue
      && typeof baseValue === "object"
      && !Array.isArray(baseValue)
    ) {
      merged[key] = mergeMessages(
        baseValue as Record<string, unknown>,
        value as DeepPartial<Record<string, unknown>>,
      );
    } else if (value !== undefined) {
      merged[key] = value;
    }
  }

  return merged as T;
}

export function createLocale(override: DeepPartial<LocaleMessages>): LocaleMessages {
  return mergeMessages(en, override);
}

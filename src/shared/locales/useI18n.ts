import { useCallback } from "react";
import { useSettingsStore } from "../store/useSettingsStore";
import { detectLanguage, translate } from ".";

export function useI18n() {
  const language = useSettingsStore((state) => state.settings?.language ?? detectLanguage());
  const t = useCallback(
    (key: string, values?: Record<string, string | number>) => translate(key, language, values),
    [language],
  );

  return { language, t };
}

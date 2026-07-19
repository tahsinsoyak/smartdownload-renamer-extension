import { Languages } from "lucide-react";
import { Card } from "../../shared/components/Card";
import { Select } from "../../shared/components/Select";
import { languages, type Language } from "../../shared/locales";
import { useI18n } from "../../shared/locales/useI18n";

type LanguageSettingsProps = {
  value: Language;
  onChange: (language: Language) => void;
};

export function LanguageSettings({ value, onChange }: LanguageSettingsProps) {
  const { t } = useI18n();

  return (
    <Card className="p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
            <Languages size={17} aria-hidden="true" />
          </span>
          <div>
            <h3 className="text-[14px] font-bold text-ink dark:text-white">{t("general.language")}</h3>
            <p className="mt-1 text-[12px] leading-5 text-muted-dark dark:text-slate-400">{t("general.languageDescription")}</p>
            <p className="mt-1 text-[10.5px] text-slate-400 dark:text-slate-500">{t("general.languageHelp")}</p>
          </div>
        </div>
        <Select
          className="w-full sm:w-48"
          value={value}
          onChange={(event) => onChange(event.target.value as Language)}
          aria-label={t("general.language")}
        >
          {languages.map((language) => (
            <option key={language.code} value={language.code}>{language.nativeName}</option>
          ))}
        </Select>
      </div>
    </Card>
  );
}

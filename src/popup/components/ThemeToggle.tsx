import { Moon, Sun } from "lucide-react";
import { useI18n } from "../../shared/locales/useI18n";

export function ThemeToggle({ theme, onToggle, inverted = false }: { theme: "light" | "dark"; onToggle: () => void; inverted?: boolean }) {
  const { t } = useI18n();
  const Icon = theme === "dark" ? Sun : Moon;
  return (
    <button
      className={`flex cursor-pointer items-center justify-center rounded-xl transition-colors ${inverted ? "h-8 w-8 text-blue-100 hover:bg-white/10 hover:text-white" : "h-9 w-9 text-muted hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-lift dark:hover:text-blue-300"}`}
      onClick={onToggle}
      aria-label={t("accessibility.toggleTheme")}
      title={theme === "dark" ? t("accessibility.useLightTheme") : t("accessibility.useDarkTheme")}
    >
      <Icon size={17} />
    </button>
  );
}

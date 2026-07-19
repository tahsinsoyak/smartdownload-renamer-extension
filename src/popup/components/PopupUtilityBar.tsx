import { Settings2 } from "lucide-react";
import { useI18n } from "../../shared/locales/useI18n";

type PopupUtilityBarProps = {
  onOpenSettings: () => void;
};

export function PopupUtilityBar({ onOpenSettings }: PopupUtilityBarProps) {
  const { t } = useI18n();
  return (
    <nav
      className="flex items-center justify-end border-b border-[#dbe3f0] bg-white/80 px-3 py-1.5 dark:border-lift dark:bg-[#0a1729]/85"
      aria-label={t("accessibility.popupActions")}
    >
      <button
        className="flex min-h-7 cursor-pointer items-center gap-1.5 rounded-lg px-2.5 text-[11px] font-semibold text-slate-500 transition-colors hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-400 dark:hover:bg-lift dark:hover:text-blue-300"
        onClick={onOpenSettings}
        aria-label={t("actions.openSettings")}
      >
        <Settings2 size={14} aria-hidden="true" /> {t("actions.settings")}
      </button>
    </nav>
  );
}

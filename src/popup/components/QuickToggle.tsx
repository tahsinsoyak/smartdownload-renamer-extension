import { useI18n } from "../../shared/locales/useI18n";

export function QuickToggle({ enabled, onChange }: { enabled: boolean; onChange: (enabled: boolean) => void }) {
  const { t } = useI18n();
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={t("accessibility.enableRenaming")}
      onClick={() => onChange(!enabled)}
      className="flex h-9 min-w-[64px] cursor-pointer items-center gap-1.5 rounded-full bg-white px-1.5 pr-2 text-blue-800 shadow-sm transition-colors hover:bg-blue-50 dark:bg-blue-100"
    >
      <span className={`h-[22px] w-[22px] rounded-full shadow-sm transition-colors ${enabled ? "bg-emerald-500" : "bg-slate-400"}`} />
      <span className="font-display text-[10px] font-bold tracking-wider">{enabled ? t("common.on") : t("common.off")}</span>
    </button>
  );
}

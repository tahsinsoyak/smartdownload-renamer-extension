import { HardDrive, type LucideIcon } from "lucide-react";
import { useI18n } from "../../shared/locales/useI18n";

type OptionsPageHeaderProps = {
  title: string;
  description: string;
  Icon: LucideIcon;
};

export function OptionsPageHeader({ title, description, Icon }: OptionsPageHeaderProps) {
  const { t } = useI18n();
  return (
    <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex items-start gap-3.5">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-blue-600 text-white shadow-[0_8px_20px_rgba(37,99,235,0.18)] dark:bg-blue-500 dark:text-night">
          <Icon size={19} />
        </span>
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-blue-700 dark:text-blue-300">{t("navigation.pageEyebrow")}</p>
          <h2 className="mt-1 text-xl font-bold tracking-[-0.025em] text-ink dark:text-white">{title}</h2>
          <p className="mt-1 max-w-xl text-[13px] leading-5 text-muted-dark dark:text-slate-400">{description}</p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2 rounded-xl border border-[#d5dfed] bg-white/80 px-3 py-2 text-[11px] font-semibold text-slate-600 shadow-sm dark:border-[#263854] dark:bg-panel/80 dark:text-slate-300">
        <HardDrive size={14} className="text-blue-600 dark:text-blue-300" />
        {t("navigation.savedLocally")}
      </div>
    </div>
  );
}

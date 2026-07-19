import { Heart } from "lucide-react";
import { SUPPORT_URL } from "../../shared/constants/links";
import { useI18n } from "../../shared/locales/useI18n";

export function PopupFooter() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-[#dbe3f0] bg-white px-3 py-2 dark:border-lift dark:bg-[#0a1729]">
      <a
        className="flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 text-[12px] font-bold text-rose-600 shadow-[0_3px_10px_rgba(244,63,94,0.08)] transition-colors hover:border-rose-300 hover:bg-rose-100 hover:text-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 dark:border-rose-900/50 dark:bg-rose-950/25 dark:text-rose-300 dark:hover:border-rose-800 dark:hover:bg-rose-950/45 dark:hover:text-rose-200"
        href={SUPPORT_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("accessibility.supportPatreon")}
      >
        <Heart size={15} aria-hidden="true" /> {t("actions.supportExtension")}
      </a>
    </footer>
  );
}

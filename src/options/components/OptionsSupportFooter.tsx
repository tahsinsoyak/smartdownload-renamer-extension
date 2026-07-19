import { Heart } from "lucide-react";
import { SUPPORT_URL } from "../../shared/constants/links";

export function OptionsSupportFooter() {
  return (
    <footer className="border-t border-[#d7e0ee] bg-white/85 backdrop-blur-sm dark:border-[#263854] dark:bg-[#0a1729]/90">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center sm:justify-between md:px-6">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-rose-50 text-rose-500 dark:bg-rose-950/40 dark:text-rose-300">
            <Heart size={17} aria-hidden="true" />
          </span>
          <div>
            <p className="text-[13px] font-semibold text-ink dark:text-white">Enjoying Smart Download Renamer?</p>
            <p className="mt-0.5 text-[11.5px] text-slate-500 dark:text-slate-400">Support its continued development and keep it free.</p>
          </div>
        </div>
        <a
          href={SUPPORT_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Support Smart Download Renamer on Patreon"
          className="inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#ff424d] px-4 text-[12px] font-bold text-white shadow-[0_6px_16px_rgba(255,66,77,0.2)] transition-colors hover:bg-[#e93543] active:bg-[#ce2f3c] dark:bg-[#f04452] dark:hover:bg-[#ff5965]"
        >
          <Heart size={14} aria-hidden="true" /> Support on Patreon
        </a>
      </div>
    </footer>
  );
}

import { Heart, SlidersHorizontal } from "lucide-react";
import { SUPPORT_URL } from "../../shared/constants/links";

type PopupFooterProps = {
  onOpenSettings: () => void;
};

export function PopupFooter({ onOpenSettings }: PopupFooterProps) {
  return (
    <footer className="border-t border-[#dbe3f0] bg-white dark:border-lift dark:bg-[#0a1729]">
      <div className="flex items-center justify-end px-4 py-2">
        <button
          className="flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold text-slate-500 transition-colors hover:bg-blue-50 hover:text-blue-700 dark:text-slate-400 dark:hover:bg-lift dark:hover:text-blue-300"
          onClick={onOpenSettings}
        >
          <SlidersHorizontal size={14} aria-hidden="true" /> Settings
        </button>
      </div>
      <a
        className="flex min-h-11 cursor-pointer items-center justify-center gap-2 bg-[#ff424d] px-4 py-3 text-[12px] font-bold text-white transition-colors hover:bg-[#e93543] active:bg-[#ce2f3c] dark:bg-[#f04452] dark:hover:bg-[#ff5965]"
        href={SUPPORT_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Support Smart Download Renamer on Patreon"
      >
        <Heart size={15} aria-hidden="true" /> Support Smart Download Renamer
      </a>
    </footer>
  );
}

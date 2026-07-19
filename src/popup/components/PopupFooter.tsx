import { Heart, History, SlidersHorizontal } from "lucide-react";
import { SUPPORT_URL } from "../../shared/constants/links";

type PopupFooterProps = {
  onOpenSettings: () => void;
  onOpenHistory: () => void;
};

export function PopupFooter({ onOpenSettings, onOpenHistory }: PopupFooterProps) {
  return (
    <footer className="grid grid-cols-3 items-center border-t border-[#dbe3f0] bg-white px-4 py-3 text-[11px] dark:border-lift dark:bg-[#0a1729]">
      <button className="flex cursor-pointer items-center gap-1.5 text-slate-500 transition-colors hover:text-blue-700 dark:text-slate-400 dark:hover:text-blue-300" onClick={onOpenSettings}>
        <SlidersHorizontal size={14} aria-hidden="true" /> Settings
      </button>
      <a className="flex cursor-pointer items-center justify-center gap-1 font-bold text-rose-500 transition-colors hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300" href={SUPPORT_URL} target="_blank" rel="noopener noreferrer" aria-label="Support Smart Download Renamer on Patreon">
        <Heart size={14} aria-hidden="true" /> Support
      </a>
      <button className="flex cursor-pointer items-center justify-end gap-1.5 text-slate-500 transition-colors hover:text-blue-700 dark:text-slate-400 dark:hover:text-blue-300" onClick={onOpenHistory}>
        <History size={14} aria-hidden="true" /> History
      </button>
    </footer>
  );
}

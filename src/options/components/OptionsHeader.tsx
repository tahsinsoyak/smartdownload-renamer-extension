import { Check, Moon, Save, Sun } from "lucide-react";
import { LogoIcon } from "../../shared/components/LogoIcon";

type OptionsHeaderProps = {
  theme: "light" | "dark";
  saved: boolean;
  onThemeToggle: () => void;
  onSave: () => void;
};

export function OptionsHeader({ theme, saved, onThemeToggle, onSave }: OptionsHeaderProps) {
  const ThemeIcon = theme === "dark" ? Sun : Moon;

  return (
    <header className="sticky top-0 z-20 border-b border-blue-800/70 bg-[#1f4ba8] text-white shadow-[0_8px_26px_rgba(20,49,105,0.16)] dark:border-[#24427a] dark:bg-[#10295c]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <LogoIcon size={38} inverted />
          <div className="min-w-0">
            <h1 className="max-w-[150px] truncate text-[14px] font-bold tracking-[-0.02em] sm:max-w-none sm:text-[15px]">Smart Download Renamer</h1>
            <p className="mt-0.5 hidden text-[11px] font-medium text-blue-100 sm:block">Downloads, made findable.</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="grid h-10 w-10 cursor-pointer place-items-center rounded-xl text-blue-100 transition-colors hover:bg-white/10 hover:text-white"
            onClick={onThemeToggle}
            aria-label={theme === "dark" ? "Use light theme" : "Use dark theme"}
            title={theme === "dark" ? "Use light theme" : "Use dark theme"}
          >
            <ThemeIcon size={17} />
          </button>
          <button
            className="flex h-10 cursor-pointer items-center gap-2 whitespace-nowrap rounded-xl bg-white px-3 text-[12px] font-bold !text-blue-800 shadow-sm transition-colors hover:bg-blue-50 sm:px-4 dark:bg-white dark:!text-blue-800 dark:hover:bg-blue-50"
            onClick={onSave}
            style={{ color: "#1e40af" }}
          >
            {saved ? <Check size={14} strokeWidth={2.5} /> : <Save size={14} />}
            {saved ? "Saved" : <><span className="sm:hidden">Save</span><span className="hidden sm:inline">Save changes</span></>}
          </button>
        </div>
      </div>
    </header>
  );
}

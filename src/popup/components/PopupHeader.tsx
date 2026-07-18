import { LogoIcon } from "../../shared/components/LogoIcon";
import { COPY } from "../../shared/constants/copy";
import { QuickToggle } from "./QuickToggle";
import { ThemeToggle } from "./ThemeToggle";

type PopupHeaderProps = {
  enabled: boolean;
  theme: "light" | "dark";
  onEnabledChange: (enabled: boolean) => void;
  onThemeToggle: () => void;
};

export function PopupHeader({ enabled, theme, onEnabledChange, onThemeToggle }: PopupHeaderProps) {
  return (
    <header className="border-b border-blue-800/50 bg-[#1f4ba8] px-5 py-[18px] text-white shadow-[0_8px_24px_rgba(23,55,112,0.14)] dark:border-[#24427a] dark:bg-[#10295c]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <LogoIcon size={40} inverted />
          <div className="min-w-0">
            <h1 className="filename-line text-[15px] font-bold tracking-[-0.02em]">{COPY.appName}</h1>
            <p className="filename-line mt-1 text-[11.5px] font-medium text-blue-100">Downloads, made findable.</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <ThemeToggle theme={theme} onToggle={onThemeToggle} inverted />
          <QuickToggle enabled={enabled} onChange={onEnabledChange} />
        </div>
      </div>
    </header>
  );
}

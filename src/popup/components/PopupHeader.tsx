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
    <header className="bg-[#1f4ba8] px-4 py-4 text-white dark:bg-[#10295c]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <LogoIcon size={38} inverted />
          <div className="min-w-0">
            <h1 className="filename-line text-[15px] font-semibold tracking-[-0.02em]">{COPY.appName}</h1>
            <p className="filename-line mt-0.5 text-[11.5px] text-blue-100">Downloads, made findable.</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle theme={theme} onToggle={onThemeToggle} inverted />
          <QuickToggle enabled={enabled} onChange={onEnabledChange} />
        </div>
      </div>
    </header>
  );
}

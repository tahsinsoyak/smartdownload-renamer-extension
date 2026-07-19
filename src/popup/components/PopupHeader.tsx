import { LogoIcon } from "../../shared/components/LogoIcon";
import { useI18n } from "../../shared/locales/useI18n";
import { PopupSettingsButton } from "./PopupSettingsButton";
import { QuickToggle } from "./QuickToggle";
import { ThemeToggle } from "./ThemeToggle";

type PopupHeaderProps = {
  enabled: boolean;
  theme: "light" | "dark";
  onOpenSettings: () => void;
  onEnabledChange: (enabled: boolean) => void;
  onThemeToggle: () => void;
};

export function PopupHeader({ enabled, theme, onOpenSettings, onEnabledChange, onThemeToggle }: PopupHeaderProps) {
  const { t } = useI18n();
  return (
    <header className="bg-[#1f4ba8] px-3.5 py-4 text-white dark:bg-[#10295c]">
      <div className="flex items-center justify-between gap-2.5">
        <div className="flex min-w-0 items-center gap-2.5">
          <LogoIcon size={36} inverted />
          <div className="min-w-0">
            <h1 className="filename-line text-[14px] font-semibold tracking-[-0.025em]">{t("common.appName")}</h1>
            <p className="filename-line mt-0.5 text-[11.5px] text-blue-100">{t("common.tagline")}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <div className="flex items-center rounded-xl border border-white/15 bg-white/[0.07] p-0.5 shadow-sm">
            <ThemeToggle theme={theme} onToggle={onThemeToggle} inverted />
            <span className="h-4 w-px bg-white/15" aria-hidden="true" />
            <PopupSettingsButton onClick={onOpenSettings} />
          </div>
          <QuickToggle enabled={enabled} onChange={onEnabledChange} />
        </div>
      </div>
    </header>
  );
}

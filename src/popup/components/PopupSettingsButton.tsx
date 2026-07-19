import { Settings2 } from "lucide-react";
import { useI18n } from "../../shared/locales/useI18n";

export function PopupSettingsButton({ onClick }: { onClick: () => void }) {
  const { t } = useI18n();

  return (
    <button
      type="button"
      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[10px] text-blue-100 transition-colors duration-200 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
      onClick={onClick}
      data-testid="popup-settings-button"
      aria-label={t("actions.openSettings")}
      title={t("actions.settings")}
    >
      <Settings2 size={17} strokeWidth={2} aria-hidden="true" />
    </button>
  );
}

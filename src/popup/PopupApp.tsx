import { useEffect } from "react";
import { useSettingsStore } from "../shared/store/useSettingsStore";
import type { RenameRecord } from "../shared/types/downloads";
import { LatestDownloadCard } from "./components/LatestDownloadCard";
import { NamingPreview } from "./components/NamingPreview";
import { PopupFooter } from "./components/PopupFooter";
import { PopupHeader } from "./components/PopupHeader";
import { RecentRenames } from "./components/RecentRenames";

export function PopupApp() {
  const { settings, domainRules, history, theme, load, updateSettings, setTheme } = useSettingsStore();

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  if (!settings) {
    return <div className="h-[340px] w-[420px] bg-bg-subtle dark:bg-night" />;
  }

  const latest = history[0];
  const heightClass = !latest
    ? "min-h-[340px]"
    : history.length > 1
      ? "min-h-[600px]"
      : "min-h-[440px]";
  const openSettings = () => chrome.runtime.openOptionsPage();
  const openHistory = () => {
    const url = chrome.runtime.getURL("options.html#history");
    if (chrome.tabs?.create) {
      void chrome.tabs.create({ url });
    } else {
      void chrome.runtime.openOptionsPage();
    }
  };
  const openFile = (record: RenameRecord) => {
    if (record.downloadId !== undefined) {
      void chrome.runtime.sendMessage({ type: "OPEN_FILE", downloadId: record.downloadId });
    }
  };
  const showInFolder = (record: RenameRecord) => {
    void chrome.runtime.sendMessage({ type: "SHOW_IN_FOLDER", downloadId: record.downloadId });
  };

  return (
    <div className={`flex w-[420px] flex-col overflow-hidden bg-bg-subtle dark:bg-night ${heightClass}`}>
      <PopupHeader
        enabled={settings.enabled}
        theme={theme}
        onEnabledChange={(enabled) => updateSettings({ ...settings, enabled })}
        onThemeToggle={() => setTheme(theme === "dark" ? "light" : "dark")}
      />

      <main className="flex-1 space-y-2.5 px-3 py-3">
        {latest ? (
          <LatestDownloadCard record={latest} onOpenFile={openFile} onShowInFolder={showInFolder} />
        ) : (
          <NamingPreview settings={settings} domainRules={domainRules} />
        )}
        <RecentRenames records={history.slice(1)} onViewAll={openHistory} />
      </main>

      <PopupFooter onOpenSettings={openSettings} onOpenHistory={openHistory} />
    </div>
  );
}

import { FolderOpen, Heart, Settings, Sparkles, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { Button } from "../shared/components/Button";
import { LogoIcon } from "../shared/components/LogoIcon";
import { COPY } from "../shared/constants/copy";
import { useSettingsStore } from "../shared/store/useSettingsStore";
import { NamingPreview } from "./components/NamingPreview";
import { QuickToggle } from "./components/QuickToggle";
import { RecentRenames } from "./components/RecentRenames";
import { StatusCard } from "./components/StatusCard";
import { ThemeToggle } from "./components/ThemeToggle";

export function PopupApp() {
  const { settings, domainRules, history, theme, load, updateSettings, clearHistory, setTheme } = useSettingsStore();

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  if (!settings) {
    return <div className="h-[560px] w-[420px]" />;
  }

  return (
    <div className="w-[420px] min-h-[560px] bg-bg-subtle dark:bg-night">
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LogoIcon size={32} />
            <div>
              <h1 className="text-sm font-semibold text-ink dark:text-white">{COPY.appName}</h1>
              <p className="text-[11px] text-muted-dark dark:text-muted">{COPY.tagline}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <ThemeToggle theme={theme} onToggle={() => setTheme(theme === "dark" ? "light" : "dark")} />
            <QuickToggle enabled={settings.enabled} onChange={(enabled) => updateSettings({ ...settings, enabled })} />
          </div>
        </div>
      </div>

      <div className="space-y-2.5 px-4 pb-4">
        <StatusCard enabled={settings.enabled} template={settings.template} />
        <NamingPreview settings={settings} domainRules={domainRules} />
        <RecentRenames records={history} />

        <div className="flex items-center gap-2 pt-1">
          <Button variant="secondary" className="h-9 flex-1 text-xs" onClick={() => chrome.runtime.openOptionsPage()}>
            <Settings size={13} /> Settings
          </Button>
          <Button variant="secondary" className="h-9 flex-1 text-xs" onClick={() => chrome.runtime.sendMessage({ type: "OPEN_DOWNLOADS" })}>
            <FolderOpen size={13} /> Folder
          </Button>
          <Button variant="ghost" className="h-9 flex-1 text-xs" onClick={clearHistory}>
            <Trash2 size={13} /> Clear
          </Button>
        </div>

        <p className="flex items-center justify-center gap-1.5 py-1 text-[11px] text-muted">
          <Sparkles size={11} /> Free, private, no backend.
          <span className="text-[#d4d0cc] dark:text-lift">·</span>
          <a
            href="https://www.patreon.com/tahsinsoyak"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-0.5 text-muted transition-colors hover:text-rose-500 dark:hover:text-rose-400"
          >
            <Heart size={10} /> Support
          </a>
        </p>
      </div>
    </div>
  );
}

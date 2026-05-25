import { Download, FolderOpen, LockKeyhole, Settings, Sparkles, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { Button } from "../shared/components/Button";
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
    return <div className="h-[560px] w-[420px] app-texture p-4" />;
  }

  return (
    <main className="app-texture w-[420px] min-h-[560px] text-slate-950 dark:text-white">
      <div className="bg-white px-5 py-4 shadow-sm dark:bg-slate-950">
        <header className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3">
            <div className="brand-mark h-10 w-10 shrink-0 rounded-xl">
              <Download className="relative z-10" size={20} />
            </div>
            <div className="min-w-0">
              <h1 className="text-[16px] font-bold leading-tight text-slate-950 dark:text-white">{COPY.appName}</h1>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{COPY.tagline}</p>
              <p className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                <LockKeyhole size={12} /> Local only
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle theme={theme} onToggle={() => setTheme(theme === "dark" ? "light" : "dark")} />
            <QuickToggle enabled={settings.enabled} onChange={(enabled) => updateSettings({ ...settings, enabled })} />
          </div>
        </header>
      </div>

      <div className="space-y-2.5 p-3">
        <StatusCard enabled={settings.enabled} template={settings.template} />
        <NamingPreview settings={settings} domainRules={domainRules} />
        <RecentRenames records={history} />
        <div className="grid grid-cols-3 gap-2">
          <Button variant="ghost" className="h-11 gap-1 px-2 text-xs" onClick={() => chrome.runtime.openOptionsPage()}>
            <Settings size={15} /> Settings
          </Button>
          <Button variant="ghost" className="h-11 gap-1 px-2 text-xs" onClick={() => chrome.runtime.sendMessage({ type: "OPEN_DOWNLOADS" })}>
            <FolderOpen size={15} /> Folder
          </Button>
          <Button variant="ghost" className="h-11 gap-1 px-2 text-xs" onClick={clearHistory}>
            <Trash2 size={15} /> Clear
          </Button>
        </div>
        <p className="flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <Sparkles size={13} /> Free, private, no backend.
        </p>
      </div>
    </main>
  );
}

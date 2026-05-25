import { Download, LockKeyhole, Moon, Save, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../shared/components/Button";
import { Card } from "../shared/components/Card";
import { Select } from "../shared/components/Select";
import { Switch } from "../shared/components/Switch";
import { COPY } from "../shared/constants/copy";
import { buildFilename } from "../shared/lib/buildFilename";
import { useSettingsStore } from "../shared/store/useSettingsStore";
import { CategoryRules } from "./components/CategoryRules";
import { DataControls } from "./components/DataControls";
import { DomainRules } from "./components/DomainRules";
import { NamingTemplateSettings } from "./components/NamingTemplateSettings";
import { PrivacyInfo } from "./components/PrivacyInfo";
import { RecentHistory } from "./components/RecentHistory";

export function OptionsApp() {
  const { settings, domainRules, history, theme, load, updateSettings, updateDomainRules, clearHistory, clearAll, setTheme } = useSettingsStore();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  if (!settings) return <main className="app-texture min-h-screen" />;

  const preview = buildFilename({
    originalFilename: "invoice(3).pdf",
    url: "https://www.amazon.com.tr/order/invoice",
    startTime: "2026-05-26T10:00:00.000Z",
    settings: { ...settings, skipDescriptiveFilenames: false },
    domainRules
  });

  const saveSettings = async (next = settings) => {
    await updateSettings(next);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1200);
  };

  return (
    <main className="app-texture min-h-screen text-slate-950 dark:text-white">
      <div className="border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="brand-mark h-11 w-11 rounded-xl">
              <Download className="relative z-10" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold">{COPY.appName}</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">{COPY.alternativeTagline}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme">
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </Button>
            <Button onClick={() => saveSettings()}>
              <Save size={16} /> {saved ? "Saved" : "Save"}
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-5 px-5 py-6">
        <Card className="overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="border-b border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 lg:border-b-0 lg:border-r">
              <p className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-bold uppercase text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300">
                <LockKeyhole size={13} /> Private rename engine
              </p>
              <h2 className="mt-4 max-w-lg text-3xl font-bold leading-tight tracking-tight">Clean names before files hit Downloads.</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300">No account, no backend, no analytics. The extension uses Chrome download metadata and local rules to suggest searchable filenames.</p>
              <div className="mt-6 grid grid-cols-3 gap-2">
                {["Local", "Fast", "Free"].map((item) => (
                  <div key={item} className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center text-xs font-bold uppercase text-slate-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-4 p-6 md:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
                <div className="flex items-center justify-between">
                  <p className="font-bold">Enable smart renaming</p>
                  <Switch checked={settings.enabled} onChange={(enabled) => saveSettings({ ...settings, enabled })} label="Enable smart renaming" />
                </div>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{settings.enabled ? COPY.autoOn : COPY.autoOff}</p>
              </div>
              <label className="space-y-1.5 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
                <span className="text-sm font-bold">Conflict handling</span>
                <Select value={settings.conflictStrategy} onChange={(event) => saveSettings({ ...settings, conflictStrategy: event.target.value as "append_number" | "uniquify" })}>
                  <option value="append_number">Append number style</option>
                  <option value="uniquify">Chrome uniquify</option>
                </Select>
              </label>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
                <div className="flex items-center justify-between">
                  <p className="font-bold">Skip executable files</p>
                  <Switch checked={settings.skipExecutables} onChange={(skipExecutables) => saveSettings({ ...settings, skipExecutables })} label="Skip executable files" />
                </div>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Prevents risky downloads from being renamed aggressively.</p>
              </div>
              <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 shadow-[inset_3px_0_0_#2563eb] dark:border-blue-800 dark:bg-blue-950">
                <p className="text-sm font-bold text-blue-800 dark:text-blue-100">Preview</p>
                <p className="filename-line mt-2 font-mono text-sm text-blue-700 dark:text-blue-200">invoice(3).pdf</p>
                <p className="filename-line mt-1 font-mono text-sm font-semibold text-blue-950 dark:text-white" title={preview.filename}>{preview.filename}</p>
              </div>
            </div>
          </div>
        </Card>

        <NamingTemplateSettings settings={settings} onChange={saveSettings} />
        <DomainRules rules={domainRules} onChange={updateDomainRules} />
        <CategoryRules />
        <RecentHistory history={history} onClear={clearHistory} />
        <PrivacyInfo />
        <DataControls onClearAll={clearAll} />

        <Card className="p-5">
          <h2 className="text-lg font-bold">About</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Version 0.1.0. Single purpose: automatically suggest cleaner filenames for downloads. Chrome Web Store support and GitHub links can be added when the listing is ready.</p>
        </Card>
      </div>
    </main>
  );
}

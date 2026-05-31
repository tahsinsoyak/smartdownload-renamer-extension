import { Clock, Code2, Globe, Heart, Moon, Save, Settings2, Shield, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../shared/components/Button";
import { LogoIcon } from "../shared/components/LogoIcon";
import { useSettingsStore } from "../shared/store/useSettingsStore";
import { AboutTab } from "./components/AboutTab";
import { DomainRules } from "./components/DomainRules";
import { GeneralTab } from "./components/GeneralTab";
import { NamingTemplateSettings } from "./components/NamingTemplateSettings";
import { RecentHistory } from "./components/RecentHistory";

type Tab = "general" | "template" | "domains" | "history" | "about";

const NAV: { id: Tab; label: string; Icon: React.ElementType }[] = [
  { id: "general",  label: "General",  Icon: Settings2 },
  { id: "template", label: "Template", Icon: Code2 },
  { id: "domains",  label: "Domains",  Icon: Globe },
  { id: "history",  label: "History",  Icon: Clock },
  { id: "about",    label: "About",    Icon: Shield },
];

const PATREON_URL = "https://www.patreon.com/tahsinsoyak";

export function OptionsApp() {
  const {
    settings, domainRules, history, theme,
    load, updateSettings, updateDomainRules, clearHistory, clearAll, setTheme,
  } = useSettingsStore();

  const [tab, setTab]     = useState<Tab>("general");
  const [saved, setSaved] = useState(false);

  useEffect(() => { load(); }, [load]);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  if (!settings) return <div className="min-h-screen bg-bg-subtle dark:bg-night" />;

  const saveSettings = async (next = settings) => {
    await updateSettings(next);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1200);
  };

  return (
    <div className="min-h-screen bg-bg-subtle dark:bg-night">

      {/* ── Sticky header ── */}
      <header className="sticky top-0 z-20 border-b border-[#e5e5e5] bg-white/95 backdrop-blur dark:border-lift dark:bg-night/95">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-3 md:px-6">
          <div className="flex items-center gap-2.5">
            <LogoIcon size={30} />
            <div>
              <h1 className="text-sm font-semibold tracking-tight text-ink dark:text-white">
                Smart Download Renamer
              </h1>
              <p className="hidden text-[11px] text-muted-dark dark:text-muted sm:block">Settings</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-[#f5f5f4] hover:text-ink dark:hover:bg-panel dark:hover:text-white"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <Button onClick={() => saveSettings()}>
              <Save size={13} />
              {saved ? "Saved" : "Save"}
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-5 md:px-6 md:py-6">

        {/* ── Mobile: horizontal scrollable tab bar ── */}
        <div className="mb-5 -mx-4 flex overflow-x-auto border-b border-[#e5e5e5] px-4 dark:border-lift md:hidden">
          {NAV.map(({ id, label, Icon }) => {
            const isActive = tab === id;
            const badge = id === "history" && history.length > 0 ? history.length : null;
            return (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`flex shrink-0 items-center gap-1.5 border-b-2 px-3 pb-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-accent text-accent-dark dark:border-teal-400 dark:text-teal-400"
                    : "border-transparent text-muted-dark hover:text-ink dark:text-muted dark:hover:text-white"
                }`}
              >
                <Icon size={13} />
                {label}
                {badge !== null && (
                  <span className="rounded-full bg-[#e8e6e4] px-1.5 py-px text-[10px] font-semibold tabular-nums text-muted-dark dark:bg-lift dark:text-muted">
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ── Desktop: sidebar + content ── */}
        <div className="md:flex md:gap-6">

          {/* Sidebar (desktop only) */}
          <nav className="hidden md:block md:w-40 md:shrink-0">
            <div
              className="sticky flex flex-col gap-1"
              style={{ top: "72px", height: "calc(100vh - 96px)" }}
            >
              {/* Nav items */}
              <div className="flex-1 space-y-0.5">
                {NAV.map(({ id, label, Icon }) => {
                  const isActive = tab === id;
                  const badge = id === "history" && history.length > 0 ? history.length : null;
                  return (
                    <button
                      key={id}
                      onClick={() => setTab(id)}
                      className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                        isActive
                          ? "bg-accent-soft font-semibold text-accent-dark dark:bg-[#022c22] dark:text-teal-300"
                          : "font-medium text-muted-dark hover:bg-[#f0f0ee] hover:text-ink dark:text-muted dark:hover:bg-lift dark:hover:text-white"
                      }`}
                    >
                      <Icon size={15} className="flex-shrink-0" />
                      <span className="flex-1">{label}</span>
                      {badge !== null && (
                        <span className={`rounded-full px-1.5 py-px text-[10px] font-semibold tabular-nums ${
                          isActive
                            ? "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-400"
                            : "bg-[#e8e6e4] text-muted-dark dark:bg-lift dark:text-muted"
                        }`}>
                          {badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Patreon — pinned to bottom */}
              <div className="border-t border-[#e8e6e4] pt-2 dark:border-lift">
                <a
                  href={PATREON_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-dark transition-colors hover:bg-rose-50 hover:text-rose-600 dark:text-muted dark:hover:bg-rose-950/30 dark:hover:text-rose-400"
                >
                  <Heart size={14} className="flex-shrink-0 text-rose-400" />
                  Support
                </a>
              </div>
            </div>
          </nav>

          {/* Content pane */}
          <main className="min-w-0 flex-1">
            {tab === "general"  && <GeneralTab settings={settings} domainRules={domainRules} history={history} onChange={saveSettings} />}
            {tab === "template" && <NamingTemplateSettings settings={settings} onChange={saveSettings} />}
            {tab === "domains"  && <DomainRules rules={domainRules} onChange={updateDomainRules} />}
            {tab === "history"  && <RecentHistory history={history} onClear={clearHistory} />}
            {tab === "about"    && <AboutTab onClearAll={clearAll} />}
          </main>

        </div>
      </div>
    </div>
  );
}

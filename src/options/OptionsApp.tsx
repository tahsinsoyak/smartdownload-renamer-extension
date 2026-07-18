import { Clock, Code2, Globe, Heart, Moon, Save, Settings2, Shield, Sun } from "lucide-react";
import { useEffect, useState } from "react";
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

  const [tab, setTab] = useState<Tab>(() => {
    const requested = window.location.hash.slice(1) as Tab;
    return NAV.some((item) => item.id === requested) ? requested : "general";
  });
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

  const selectTab = (nextTab: Tab) => {
    setTab(nextTab);
    window.history.replaceState(null, "", `#${nextTab}`);
  };

  return (
    <div className="min-h-screen bg-bg-subtle text-ink dark:bg-night dark:text-white">

      {/* ── Sticky header ── */}
      <header className="sticky top-0 z-20 border-b border-blue-800 bg-[#1f4ba8] text-white shadow-[0_8px_24px_rgba(23,55,112,0.16)] dark:border-[#23417a] dark:bg-[#10295c]">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 md:px-6">
          <div className="flex items-center gap-2.5">
            <LogoIcon size={34} inverted />
            <div>
              <h1 className="text-sm font-bold tracking-tight text-white">
                Smart Download Renamer
              </h1>
              <p className="hidden text-[10.5px] text-blue-100 sm:block">Downloads, made findable.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-blue-100 transition-colors hover:bg-white/10 hover:text-white"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <button className="flex h-9 cursor-pointer items-center gap-1.5 rounded-lg bg-white px-3.5 text-xs font-bold text-blue-800 shadow-sm transition-colors hover:bg-blue-50" onClick={() => saveSettings()}>
              <Save size={13} />
              {saved ? "Saved" : "Save"}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-5 md:px-6 md:py-7">

        {/* ── Mobile: horizontal scrollable tab bar ── */}
        <div className="-mx-4 mb-5 flex overflow-x-auto border-b border-[#d7e0ee] px-4 dark:border-lift md:hidden">
          {NAV.map(({ id, label, Icon }) => {
            const isActive = tab === id;
            const badge = id === "history" && history.length > 0 ? history.length : null;
            return (
              <button
                key={id}
                onClick={() => selectTab(id)}
                className={`flex shrink-0 items-center gap-1.5 border-b-2 px-3 pb-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-blue-600 text-blue-700 dark:border-blue-400 dark:text-blue-300"
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
                          onClick={() => selectTab(id)}
                      className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                        isActive
                          ? "bg-blue-600 font-bold text-white shadow-sm dark:bg-blue-500 dark:text-night"
                          : "font-semibold text-muted-dark hover:bg-blue-50 hover:text-blue-700 dark:text-muted dark:hover:bg-lift dark:hover:text-blue-300"
                      }`}
                    >
                      <Icon size={15} className="flex-shrink-0" />
                      <span className="flex-1">{label}</span>
                      {badge !== null && (
                        <span className={`rounded-full px-1.5 py-px text-[10px] font-semibold tabular-nums ${
                          isActive
                            ? "bg-white/20 text-white dark:bg-night/20 dark:text-night"
                            : "bg-slate-200 text-slate-600 dark:bg-lift dark:text-muted"
                        }`}>
                          {badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Patreon — pinned to bottom */}
              <div className="border-t border-[#d7e0ee] pt-2 dark:border-lift">
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

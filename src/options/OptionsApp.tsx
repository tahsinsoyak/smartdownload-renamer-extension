import { useEffect, useState } from "react";
import { useSettingsStore } from "../shared/store/useSettingsStore";
import { AboutTab } from "./components/AboutTab";
import { DomainRules } from "./components/DomainRules";
import { GeneralTab } from "./components/GeneralTab";
import { NamingTemplateSettings } from "./components/NamingTemplateSettings";
import { OptionsHeader } from "./components/OptionsHeader";
import { OptionsNavigation } from "./components/OptionsNavigation";
import { OptionsPageHeader } from "./components/OptionsPageHeader";
import { RecentHistory } from "./components/RecentHistory";
import { getNavigationItem, OPTIONS_NAVIGATION, type OptionsTab } from "./navigation";

export function OptionsApp() {
  const {
    settings,
    domainRules,
    history,
    theme,
    load,
    updateSettings,
    updateDomainRules,
    clearHistory,
    clearAll,
    setTheme,
  } = useSettingsStore();

  const [tab, setTab] = useState<OptionsTab>(() => {
    const requested = window.location.hash.slice(1) as OptionsTab;
    return OPTIONS_NAVIGATION.some((item) => item.id === requested) ? requested : "general";
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  if (!settings) {
    return <div className="min-h-screen bg-bg-subtle dark:bg-night" />;
  }

  const showSavedState = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1400);
  };

  const saveSettings = async (next = settings) => {
    await updateSettings(next);
    showSavedState();
  };

  const selectTab = (nextTab: OptionsTab) => {
    setTab(nextTab);
    window.history.replaceState(null, "", `#${nextTab}`);
  };

  const page = getNavigationItem(tab);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#edf3ff_0px,#f3f6fb_280px)] text-ink dark:bg-[linear-gradient(180deg,#0b1b33_0px,#07111f_320px)] dark:text-white">
      <OptionsHeader
        theme={theme}
        saved={saved}
        onThemeToggle={() => setTheme(theme === "dark" ? "light" : "dark")}
        onSave={() => saveSettings()}
      />

      <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-8">
        <div className="md:flex md:gap-7">
          <OptionsNavigation activeTab={tab} historyCount={history.length} onSelect={selectTab} />

          <main className="min-w-0 flex-1">
            <OptionsPageHeader title={page.label} description={page.description} Icon={page.Icon} />
            {tab === "general" && (
              <GeneralTab settings={settings} domainRules={domainRules} history={history} onChange={saveSettings} />
            )}
            {tab === "template" && <NamingTemplateSettings settings={settings} onChange={saveSettings} />}
            {tab === "domains" && <DomainRules rules={domainRules} onChange={updateDomainRules} />}
            {tab === "history" && <RecentHistory history={history} onClear={clearHistory} />}
            {tab === "about" && <AboutTab onClearAll={clearAll} />}
          </main>
        </div>
      </div>
    </div>
  );
}

import { create } from "zustand";
import type { DomainRule, NamingSettings, RenameRecord } from "../types/downloads";
import {
  clearAllData,
  clearHistory,
  getDomainRules,
  getHistory,
  getSettings,
  getTheme,
  saveDomainRules,
  saveSettings,
  saveTheme
} from "../lib/storage";
import { applyDocumentLanguage } from "../locales/catalog";
import type { ExtensionBackup } from "../lib/backup";
import { saveBackup } from "../lib/storage";

type SettingsStore = {
  loading: boolean;
  settings: NamingSettings | null;
  domainRules: DomainRule[];
  history: RenameRecord[];
  theme: "light" | "dark";
  load: () => Promise<void>;
  updateSettings: (settings: NamingSettings) => Promise<void>;
  updateDomainRules: (rules: DomainRule[]) => Promise<void>;
  clearHistory: () => Promise<void>;
  clearAll: () => Promise<void>;
  setTheme: (theme: "light" | "dark") => Promise<void>;
  restoreBackup: (backup: ExtensionBackup) => Promise<void>;
};

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  loading: true,
  settings: null,
  domainRules: [],
  history: [],
  theme: "light",
  load: async () => {
    const [settings, domainRules, history, theme] = await Promise.all([getSettings(), getDomainRules(), getHistory(), getTheme()]);
    applyDocumentLanguage(settings.language);
    set({ settings, domainRules, history, theme, loading: false });
  },
  updateSettings: async (settings) => {
    await saveSettings(settings);
    applyDocumentLanguage(settings.language);
    set({ settings });
  },
  updateDomainRules: async (domainRules) => {
    await saveDomainRules(domainRules);
    set({ domainRules });
  },
  clearHistory: async () => {
    await clearHistory();
    set({ history: [] });
  },
  clearAll: async () => {
    await clearAllData();
    await get().load();
  },
  setTheme: async (theme) => {
    await saveTheme(theme);
    set({ theme });
  },
  restoreBackup: async (backup) => {
    await saveBackup(backup);
    await get().load();
  },
}));

import { DEFAULT_DOMAIN_RULES } from "../constants/defaultRules";
import { DEFAULT_SETTINGS } from "../constants/templates";
import type { DomainRule, NamingSettings, RenameRecord } from "../types/downloads";
import { getSystemTheme } from "./theme";

const SETTINGS_KEY = "settings";
const DOMAIN_RULES_KEY = "domainRules";
const HISTORY_KEY = "renameHistory";
const THEME_KEY = "theme";
const HISTORY_LIMIT = 100;

type LocalData = {
  [SETTINGS_KEY]: NamingSettings;
  [DOMAIN_RULES_KEY]: DomainRule[];
  [HISTORY_KEY]: RenameRecord[];
  [THEME_KEY]: "light" | "dark";
};

const hasChromeStorage = () => typeof chrome !== "undefined" && Boolean(chrome.storage?.local);

function getLocal<T extends keyof LocalData>(key: T): Promise<Partial<Pick<LocalData, T>>> {
  if (!hasChromeStorage()) return Promise.resolve({});
  return chrome.storage.local.get(key) as Promise<Partial<Pick<LocalData, T>>>;
}

function setLocal(data: Partial<LocalData>): Promise<void> {
  if (!hasChromeStorage()) return Promise.resolve();
  return chrome.storage.local.set(data);
}

export async function getSettings(): Promise<NamingSettings> {
  const data = await getLocal(SETTINGS_KEY);
  return { ...DEFAULT_SETTINGS, ...(data.settings ?? {}) };
}

export async function saveSettings(settings: NamingSettings): Promise<void> {
  await setLocal({ settings });
}

export async function getDomainRules(): Promise<DomainRule[]> {
  const data = await getLocal(DOMAIN_RULES_KEY);
  return data.domainRules ?? DEFAULT_DOMAIN_RULES;
}

export async function saveDomainRules(domainRules: DomainRule[]): Promise<void> {
  await setLocal({ domainRules });
}

export async function getHistory(): Promise<RenameRecord[]> {
  const data = await getLocal(HISTORY_KEY);
  return data.renameHistory ?? [];
}

export async function addHistoryRecord(record: RenameRecord): Promise<void> {
  const current = await getHistory();
  const withoutExisting = current.filter((item) => item.id !== record.id);
  await setLocal({ renameHistory: [record, ...withoutExisting].slice(0, HISTORY_LIMIT) });
}

export async function updateHistoryRecord(
  downloadId: number,
  updates: Partial<RenameRecord>
): Promise<void> {
  const current = await getHistory();
  const next = current.map((item) =>
    item.downloadId === downloadId ? { ...item, ...updates } : item
  );

  if (next.some((item, index) => item !== current[index])) {
    await setLocal({ renameHistory: next });
  }
}

export async function clearHistory(): Promise<void> {
  await setLocal({ renameHistory: [] });
}

export async function getTheme(): Promise<"light" | "dark"> {
  const data = await getLocal(THEME_KEY);
  return data.theme ?? getSystemTheme();
}

export async function saveTheme(theme: "light" | "dark"): Promise<void> {
  await setLocal({ theme });
}

export async function clearAllData(): Promise<void> {
  if (!hasChromeStorage()) return;
  await chrome.storage.local.clear();
}

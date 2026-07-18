export type AppTheme = "light" | "dark";

export function getSystemTheme(): AppTheme {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export async function applyStoredTheme(): Promise<AppTheme> {
  let theme = getSystemTheme();

  if (typeof chrome !== "undefined" && chrome.storage?.local) {
    const stored = await chrome.storage.local.get("theme") as { theme?: AppTheme };
    theme = stored.theme ?? theme;
  }

  document.documentElement.classList.toggle("dark", theme === "dark");
  return theme;
}

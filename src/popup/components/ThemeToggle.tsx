import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ theme, onToggle, inverted = false }: { theme: "light" | "dark"; onToggle: () => void; inverted?: boolean }) {
  const Icon = theme === "dark" ? Sun : Moon;
  return (
    <button
      className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl transition-colors ${inverted ? "text-blue-100 hover:bg-white/10 hover:text-white" : "text-muted hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-lift dark:hover:text-blue-300"}`}
      onClick={onToggle}
      aria-label="Toggle theme"
      title={theme === "dark" ? "Use light theme" : "Use dark theme"}
    >
      <Icon size={17} />
    </button>
  );
}

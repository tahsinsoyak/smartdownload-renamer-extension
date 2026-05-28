import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ theme, onToggle }: { theme: "light" | "dark"; onToggle: () => void }) {
  const Icon = theme === "dark" ? Sun : Moon;
  return (
    <button
      className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:text-ink hover:bg-[#f5f5f4] dark:text-muted dark:hover:text-white dark:hover:bg-panel"
      onClick={onToggle}
      aria-label="Toggle theme"
    >
      <Icon size={15} />
    </button>
  );
}

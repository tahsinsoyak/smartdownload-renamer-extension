import { Moon, Sun } from "lucide-react";
import { Button } from "../../shared/components/Button";

export function ThemeToggle({ theme, onToggle }: { theme: "light" | "dark"; onToggle: () => void }) {
  const Icon = theme === "dark" ? Sun : Moon;
  return (
    <Button variant="ghost" className="h-9 w-9 p-0" onClick={onToggle} aria-label="Toggle theme">
      <Icon size={16} />
    </Button>
  );
}

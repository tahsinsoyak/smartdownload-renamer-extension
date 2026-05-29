import { ShieldAlert, Trash2 } from "lucide-react";
import { Button } from "../../shared/components/Button";
import { Card } from "../../shared/components/Card";

export function DataControls({ onClearAll }: { onClearAll: () => void }) {
  return (
    <Card className="p-5">
      <h2 className="flex items-center gap-2 text-base font-semibold text-ink dark:text-white">
        <ShieldAlert size={16} className="text-rose-500" /> Data controls
      </h2>
      <p className="mt-2 text-sm text-muted-dark dark:text-muted">Clear local settings, domain rules, theme preference, and recent rename history from this browser.</p>
      <Button className="mt-4" variant="danger" onClick={onClearAll}>
        <Trash2 size={15} /> Clear all local data
      </Button>
    </Card>
  );
}

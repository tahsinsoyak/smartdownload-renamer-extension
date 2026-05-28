import { FileText } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg px-4 py-6 text-center">
      <FileText size={18} className="text-muted" />
      <div>
        <p className="text-sm font-medium text-muted-dark dark:text-muted">No renames yet</p>
        <p className="text-xs text-muted">Your next download appears here.</p>
      </div>
    </div>
  );
}

import { FileCheck2 } from "lucide-react";

export function EmptyState() {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-3 text-center dark:border-slate-700 dark:bg-slate-950">
      <FileCheck2 className="mx-auto text-slate-400" size={18} />
      <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">No renames yet</p>
      <p className="text-xs text-slate-500 dark:text-slate-400">Your next download appears here.</p>
    </div>
  );
}

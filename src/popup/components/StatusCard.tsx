import { CheckCircle2, PauseCircle } from "lucide-react";

export function StatusCard({ enabled, template }: { enabled: boolean; template: string }) {
  return (
    <div className="rounded-xl bg-surface shadow-card dark:bg-panel">
      <div className="flex items-center gap-3 px-4 py-3.5">
        <div className={`rounded-full p-1 ${enabled ? "text-teal-500 dark:text-teal-400" : "text-muted-dark dark:text-muted"}`}>
          {enabled ? <CheckCircle2 size={16} /> : <PauseCircle size={16} />}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-ink dark:text-white">
            {enabled ? "Auto-renaming is on" : "Auto-renaming is off"}
          </p>
          <p className="filename-line mt-0.5 font-mono text-[11px] text-muted-dark dark:text-muted">
            {template.replace(".{ext}", "")}
          </p>
        </div>
      </div>
    </div>
  );
}

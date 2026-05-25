import { CheckCircle2 } from "lucide-react";
import { Card } from "../../shared/components/Card";
import { COPY } from "../../shared/constants/copy";

export function StatusCard({ enabled, template }: { enabled: boolean; template: string }) {
  return (
    <Card className="p-3">
      <div className="flex items-center gap-3">
        <div className={`rounded-xl p-2 ${enabled ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"}`}>
          <CheckCircle2 size={18} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-slate-950 dark:text-white">{enabled ? COPY.autoOn : COPY.autoOff}</p>
          <p className="filename-line mt-1 rounded-md bg-slate-100 px-2 py-1 font-mono text-[11px] text-slate-500 dark:bg-slate-950 dark:text-slate-300">{template.replace(".{ext}", "")}</p>
        </div>
      </div>
    </Card>
  );
}

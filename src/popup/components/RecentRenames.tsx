import { Badge } from "../../shared/components/Badge";
import { Card } from "../../shared/components/Card";
import type { RenameRecord } from "../../shared/types/downloads";
import { EmptyState } from "./EmptyState";

export function RecentRenames({ records }: { records: RenameRecord[] }) {
  return (
    <Card className="p-3">
      <h2 className="mb-2 text-sm font-bold text-slate-950 dark:text-white">Recent renames</h2>
      {records.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-2">
          {records.slice(0, 5).map((record) => (
            <div key={record.id} className="animate-rise rounded-xl border border-slate-200 bg-slate-50 p-3 transition hover:border-blue-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-blue-800">
              <div className="flex items-center justify-between gap-2">
                <p className="filename-line text-xs text-slate-500 dark:text-slate-400">{record.originalFilename}</p>
                <Badge>{record.documentType.replace("_", " ")}</Badge>
              </div>
              <p className="filename-line mt-1 text-sm font-semibold text-slate-950 dark:text-white">{record.suggestedFilename}</p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{record.sourceDomain || record.sourceName || record.status}</p>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

import { Globe } from "lucide-react";
import type { RenameRecord } from "../../shared/types/downloads";
import { EmptyState } from "./EmptyState";

function StatusDot({ status }: { status: RenameRecord["status"] }) {
  const cls = {
    renamed: "bg-emerald-500",
    skipped: "bg-stone-400 dark:bg-stone-600",
    failed: "bg-rose-500",
  }[status];
  return <span className={`mt-[5px] h-2 w-2 flex-shrink-0 rounded-full ${cls}`} />;
}

export function RecentRenames({ records }: { records: RenameRecord[] }) {
  const renamed = records.filter((r) => r.status === "renamed").length;
  const skipped = records.filter((r) => r.status === "skipped").length;

  return (
    <div className="rounded-xl bg-surface shadow-card dark:bg-panel">
      <div className="px-4 py-3.5">
        <div className="mb-2.5 flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-dark dark:text-muted">Recent</p>
          {records.length > 0 && (
            <div className="flex items-center gap-2.5 text-[11px] text-muted-dark dark:text-muted">
              {renamed > 0 && (
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {renamed}
                </span>
              )}
              {skipped > 0 && (
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-stone-400" />
                  {skipped}
                </span>
              )}
            </div>
          )}
        </div>

        {records.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="divide-y divide-[#f5f5f4] dark:divide-lift">
            {records.slice(0, 4).map((record) => (
              <div
                key={record.id}
                className="animate-rise flex items-start gap-2.5 py-2.5 first:pt-0 last:pb-0"
              >
                <StatusDot status={record.status} />
                <div className="min-w-0 flex-1">
                  <p className="filename-line text-sm font-medium text-ink dark:text-white">
                    {record.status === "renamed" ? record.suggestedFilename : record.originalFilename}
                  </p>
                  {record.status === "renamed" && (
                    <p className="filename-line mt-px text-xs text-muted-dark dark:text-muted">
                      ← {record.originalFilename}
                    </p>
                  )}
                  {(record.sourceDomain || record.sourceName) && (
                    <p className="mt-0.5 flex items-center gap-1 text-[11px] text-muted">
                      <Globe size={9} className="flex-shrink-0" />
                      <span className="filename-line">{record.sourceDomain || record.sourceName}</span>
                    </p>
                  )}
                </div>
                <span
                  className={`mt-0.5 flex-shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium ${
                    record.status === "renamed"
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                      : record.status === "failed"
                        ? "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400"
                        : "bg-stone-100 text-stone-500 dark:bg-stone-800/60 dark:text-stone-400"
                  }`}
                >
                  {record.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

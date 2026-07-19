import { ArrowRight } from "lucide-react";
import { displayFilename, formatRelativeTime } from "../../shared/lib/formatDownload";
import type { RenameRecord } from "../../shared/types/downloads";

type RecentRenamesProps = {
  records: RenameRecord[];
  onViewAll: () => void;
};

const statusColors = {
  renamed: "bg-blue-600 dark:bg-blue-400",
  skipped: "bg-slate-400 dark:bg-slate-500",
  failed: "bg-rose-500",
};

export function RecentRenames({ records, onViewAll }: RecentRenamesProps) {
  if (records.length === 0) return null;

  return (
    <section className="rounded-xl border border-[#ccd9ee] bg-white px-4 pb-2 pt-3.5 shadow-card dark:border-lift dark:bg-panel">
      <div className="flex items-center justify-between pb-2.5">
        <div className="flex items-center gap-2">
          <h2 className="text-[12.5px] font-semibold text-ink dark:text-white">Recent activity</h2>
          <span className="grid min-w-[20px] place-items-center rounded-full bg-accent-soft px-1.5 py-0.5 text-[9.5px] font-semibold text-blue-700 dark:bg-[#172c52] dark:text-blue-300">
            {records.length}
          </span>
        </div>
        <button className="cursor-pointer text-[11px] font-semibold text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-200" onClick={onViewAll}>
          View all
        </button>
      </div>

      <div className="divide-y divide-[#dbe3f0] dark:divide-lift">
        {records.slice(0, 1).map((record) => (
          <div key={record.id} className="grid min-h-[52px] animate-rise grid-cols-[7px_minmax(0,1fr)_14px] items-center gap-2.5">
            <span className={`h-2 w-2 rounded-full ${statusColors[record.status]}`} aria-label={record.status} />
            <div className="min-w-0">
              <p className="font-display filename-line text-[12px] font-semibold text-ink dark:text-white" title={displayFilename(record)}>
                {displayFilename(record)}
              </p>
              <p className="filename-line mt-0.5 text-[10.5px] text-slate-500 dark:text-slate-400">
                {record.status === "renamed" ? record.originalFilename : record.reason || "Unchanged"}
                <span className="mx-1.5 text-slate-300 dark:text-slate-600">·</span>
                {formatRelativeTime(record.completedAt || record.createdAt)}
              </p>
            </div>
            <ArrowRight size={14} className="text-slate-400" aria-hidden="true" />
          </div>
        ))}
      </div>
    </section>
  );
}

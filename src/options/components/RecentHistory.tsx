import { Clock, Download, Globe, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "../../shared/components/Button";
import { Card } from "../../shared/components/Card";
import { Input } from "../../shared/components/Input";
import type { RenameRecord } from "../../shared/types/downloads";

function StatusDot({ status }: { status: RenameRecord["status"] }) {
  const cls = {
    renamed: "bg-emerald-500",
    skipped: "bg-stone-400 dark:bg-stone-600",
    failed: "bg-rose-500",
  }[status];
  return <span className={`mt-1 h-2 w-2 flex-shrink-0 rounded-full ${cls}`} />;
}

function StatusBadge({ status }: { status: RenameRecord["status"] }) {
  const cls = {
    renamed: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400",
    skipped: "bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-400",
    failed: "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400",
  }[status];
  return (
    <span className={`flex-shrink-0 self-start rounded px-1.5 py-0.5 text-[10px] font-medium ${cls}`}>
      {status}
    </span>
  );
}

function RelativeTime({ createdAt }: { createdAt: string }) {
  const diffMs = Date.now() - new Date(createdAt).getTime();
  const mins = Math.floor(diffMs / 60_000);
  const hours = Math.floor(diffMs / 3_600_000);
  const days = Math.floor(diffMs / 86_400_000);

  let label: string;
  if (mins < 2) label = "Just now";
  else if (mins < 60) label = `${mins}m ago`;
  else if (hours < 24) label = `${hours}h ago`;
  else if (days === 1) label = "Yesterday";
  else if (days < 7) label = `${days}d ago`;
  else label = new Date(createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" });

  return <span>{label}</span>;
}

export function RecentHistory({ history, onClear }: { history: RenameRecord[]; onClear: () => void }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () => history.filter((r) => JSON.stringify(r).toLowerCase().includes(query.toLowerCase())),
    [history, query]
  );

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(history, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "smart-download-renamer-history.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const renamedCount = history.filter((r) => r.status === "renamed").length;
  const skippedCount = history.filter((r) => r.status === "skipped").length;

  return (
    <Card className="p-5">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-ink dark:text-white">History</h2>
          {history.length > 0 && (
            <div className="mt-1.5 flex items-center gap-3 text-xs text-muted-dark dark:text-muted">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {renamedCount} renamed
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-stone-400" />
                {skippedCount} skipped
              </span>
            </div>
          )}
        </div>
        {history.length > 0 && (
          <div className="flex gap-2">
            <Button variant="secondary" onClick={exportJson}>
              <Download size={13} /> Export
            </Button>
            <Button variant="ghost" className="hover:text-rose-600 dark:hover:text-rose-400" onClick={onClear}>
              <Trash2 size={13} /> Clear
            </Button>
          </div>
        )}
      </div>

      {/* Search */}
      {history.length > 0 && (
        <div className="relative mt-4">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={13} />
          <Input
            className="pl-9 text-sm"
            placeholder="Filter by filename, source, status…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      )}

      {/* List */}
      <div className="mt-3">
        {history.length === 0 ? (
          <div className="flex flex-col items-center py-12 text-center">
            <Clock size={28} className="mb-3 text-muted opacity-40" />
            <p className="text-sm font-medium text-muted-dark dark:text-muted">No downloads yet</p>
            <p className="mt-1 text-xs text-muted opacity-70">Files will appear here as they are downloaded</p>
          </div>
        ) : filtered.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-dark dark:text-muted">
            No results for &ldquo;{query}&rdquo;
          </p>
        ) : (
          <div className="divide-y divide-[#f0f0ee] dark:divide-lift">
            {filtered.slice(0, 20).map((item) => (
              <div key={item.id} className="flex items-start gap-3 py-2.5 first:pt-0 last:pb-0">
                <StatusDot status={item.status} />
                <div className="min-w-0 flex-1 space-y-0.5">
                  <p className="filename-line text-sm font-medium text-ink dark:text-white">
                    {item.status === "renamed" ? item.suggestedFilename : item.originalFilename}
                  </p>
                  {item.status === "renamed" && (
                    <p className="filename-line text-xs text-muted-dark dark:text-muted">
                      ← {item.originalFilename}
                    </p>
                  )}
                  <div className="flex items-center gap-1.5 text-[11px] text-muted">
                    {(item.sourceDomain || item.sourceName) && (
                      <>
                        <Globe size={10} className="flex-shrink-0" />
                        <span className="filename-line max-w-[160px]">{item.sourceDomain || item.sourceName}</span>
                        <span className="text-[#d4d0cc] dark:text-lift">·</span>
                      </>
                    )}
                    <RelativeTime createdAt={item.createdAt} />
                  </div>
                </div>
                <StatusBadge status={item.status} />
              </div>
            ))}
          </div>
        )}
        {filtered.length > 20 && (
          <p className="mt-2 text-center text-xs text-muted">
            Showing 20 of {filtered.length} — export JSON to see all
          </p>
        )}
      </div>
    </Card>
  );
}

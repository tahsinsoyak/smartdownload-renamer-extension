import { Download, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "../../shared/components/Button";
import { Card } from "../../shared/components/Card";
import { Input } from "../../shared/components/Input";
import type { RenameRecord } from "../../shared/types/downloads";

export function RecentHistory({ history, onClear }: { history: RenameRecord[]; onClear: () => void }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => history.filter((item) => JSON.stringify(item).toLowerCase().includes(query.toLowerCase())), [history, query]);

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(history, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "smart-download-renamer-history.json";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold">Recent history</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Stored locally in Chrome storage.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={exportJson}>
            <Download size={16} /> Export JSON
          </Button>
          <Button variant="ghost" onClick={onClear}>
            <Trash2 size={16} /> Clear
          </Button>
        </div>
      </div>
      <div className="relative mt-5">
        <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
        <Input className="pl-9" placeholder="Search history" value={query} onChange={(event) => setQuery(event.target.value)} />
      </div>
      <div className="mt-4 space-y-2">
        {filtered.slice(0, 20).map((item) => (
          <div key={item.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-950">
            <p className="filename-line text-sm font-bold">{item.suggestedFilename}</p>
            <p className="filename-line mt-1 text-xs text-slate-500 dark:text-slate-400">{item.originalFilename} • {item.sourceDomain || item.sourceName || "Unknown source"} • {item.status}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

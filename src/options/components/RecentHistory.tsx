import { Clock, Download, ExternalLink, FolderOpen, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "../../shared/components/Button";
import { Card } from "../../shared/components/Card";
import { Input } from "../../shared/components/Input";
import {
  displayFilename,
  formatDownloadLocation,
  formatFileSize,
  formatRelativeTime,
} from "../../shared/lib/formatDownload";
import { useI18n } from "../../shared/locales/useI18n";
import type { RenameRecord } from "../../shared/types/downloads";

const statusStyles = {
  renamed: "bg-blue-50 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300",
  skipped: "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300",
  failed: "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300",
};

export function RecentHistory({ history, onClear }: { history: RenameRecord[]; onClear: () => void }) {
  const { language, t } = useI18n();
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () => history.filter((record) => JSON.stringify(record).toLowerCase().includes(query.toLowerCase())),
    [history, query],
  );
  const renamedCount = history.filter((record) => record.status === "renamed").length;
  const skippedCount = history.filter((record) => record.status === "skipped").length;

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(history, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "smart-download-renamer-history.json";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const openFile = (record: RenameRecord) => {
    if (record.downloadId !== undefined) {
      void chrome.runtime.sendMessage({ type: "OPEN_FILE", downloadId: record.downloadId });
    }
  };

  const showInFolder = (record: RenameRecord) => {
    void chrome.runtime.sendMessage({ type: "SHOW_IN_FOLDER", downloadId: record.downloadId });
  };

  return (
    <Card className="overflow-hidden">
      <div className="border-b border-border-light bg-gradient-to-r from-blue-50 to-white p-5 dark:border-lift dark:from-[#172c52] dark:to-panel">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-ink dark:text-white">{t("history.title")}</h2>
            <p className="mt-1 text-xs text-muted-dark dark:text-muted">{t("history.description")}</p>
            {history.length > 0 && (
              <div className="mt-3 flex items-center gap-4 text-[11px] font-semibold text-muted-dark dark:text-muted">
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-600" />{t("history.renamedCount", { count: renamedCount })}</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-amber-500" />{t("history.skippedCount", { count: skippedCount })}</span>
              </div>
            )}
          </div>
          {history.length > 0 && (
            <div className="flex gap-2">
              <Button variant="secondary" onClick={exportJson}><Download size={13} /> {t("actions.export")}</Button>
              <Button variant="ghost" className="hover:text-rose-600 dark:hover:text-rose-400" onClick={onClear}><Trash2 size={13} /> {t("actions.clear")}</Button>
            </div>
          )}
        </div>

        {history.length > 0 && (
          <div className="relative mt-4">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <Input className="bg-white pl-9 dark:bg-[#0d1a2e]" placeholder={t("history.filterPlaceholder")} value={query} onChange={(event) => setQuery(event.target.value)} aria-label={t("accessibility.filterHistory")} />
          </div>
        )}
      </div>

      <div className="p-4">
        {history.length === 0 ? (
          <div className="flex flex-col items-center py-12 text-center">
            <span className="mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-500 dark:bg-[#172c52] dark:text-blue-300"><Clock size={22} /></span>
            <p className="text-sm font-bold text-ink dark:text-white">{t("history.emptyTitle")}</p>
            <p className="mt-1 max-w-xs text-xs leading-5 text-muted-dark dark:text-muted">{t("history.emptyDescription")}</p>
          </div>
        ) : filtered.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-dark dark:text-muted">{t("history.noResults", { query })}</p>
        ) : (
          <div className="space-y-2.5">
            {filtered.slice(0, 20).map((record) => {
              const canOpen = record.downloadId !== undefined && record.exists !== false && Boolean(record.completedAt);
              const filename = displayFilename(record);
              return (
                <article key={record.id} className="group rounded-xl border border-[#d7e0ee] bg-white p-3.5 transition-colors hover:border-blue-300 hover:bg-blue-50/30 dark:border-lift dark:bg-[#0d1a2e] dark:hover:border-blue-700 dark:hover:bg-[#12213a]">
                  <div className="flex items-start gap-3">
                    <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${record.status === "renamed" ? "bg-blue-600" : record.status === "failed" ? "bg-rose-500" : "bg-amber-500"}`} />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="filename-line text-sm font-bold text-ink dark:text-white" title={filename}>{filename}</h3>
                          {record.status === "renamed" && <p className="filename-line mt-0.5 text-xs text-muted-dark dark:text-muted" title={record.originalFilename}>{t("popup.was")} {record.originalFilename}</p>}
                        </div>
                        <span className={`shrink-0 rounded-full px-2 py-1 text-[9px] font-bold ${statusStyles[record.status]}`}>{t(record.status === "failed" ? "statuses.failedShort" : `statuses.${record.status}`)}</span>
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10.5px] text-slate-500 dark:text-slate-400">
                        <span>{record.sourceDomain || record.sourceName || t("common.unknownSource")}</span>
                        <span>{formatFileSize(record.fileSize, language)}</span>
                        <span>{formatRelativeTime(record.completedAt || record.createdAt, language)}</span>
                      </div>

                      <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-[#f3f6fc] px-2.5 py-2 dark:bg-[#111f35]">
                        <span className="flex min-w-0 items-center gap-1.5 text-[10.5px] font-semibold text-slate-600 dark:text-slate-300" title={record.fullPath}>
                          <FolderOpen size={12} className="shrink-0 text-blue-600 dark:text-blue-300" />
                          <span className="filename-line">{formatDownloadLocation(record.fullPath, language)}</span>
                        </span>
                        <span className="flex shrink-0 items-center gap-1">
                          <button className="grid h-7 w-7 cursor-pointer place-items-center rounded-md text-slate-500 transition-colors hover:bg-white hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-35 dark:hover:bg-lift dark:hover:text-blue-300" onClick={() => openFile(record)} disabled={!canOpen} aria-label={t("accessibility.openNamedFile", { name: filename })} title={t("actions.openFile")}><ExternalLink size={13} /></button>
                          <button className="grid h-7 w-7 cursor-pointer place-items-center rounded-md text-slate-500 transition-colors hover:bg-white hover:text-blue-700 dark:hover:bg-lift dark:hover:text-blue-300" onClick={() => showInFolder(record)} aria-label={t("accessibility.showNamedFile", { name: filename })} title={t("actions.showInFolder")}><FolderOpen size={13} /></button>
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {filtered.length > 20 && <p className="mt-3 text-center text-xs text-muted">{t("history.showing", { count: filtered.length })}</p>}
      </div>
    </Card>
  );
}

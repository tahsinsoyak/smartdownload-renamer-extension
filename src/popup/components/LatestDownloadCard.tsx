import { Check, ExternalLink, FolderOpen, Globe2 } from "lucide-react";
import { Button } from "../../shared/components/Button";
import {
  displayFilename,
  formatDocumentType,
  formatDownloadLocation,
  formatFileSize,
  formatRelativeTime,
} from "../../shared/lib/formatDownload";
import type { RenameRecord } from "../../shared/types/downloads";

type LatestDownloadCardProps = {
  record: RenameRecord;
  onOpenFile: (record: RenameRecord) => void;
  onShowInFolder: (record: RenameRecord) => void;
};

const statusStyles = {
  renamed: "bg-blue-50 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300",
  skipped: "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300",
  failed: "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300",
};

const statusLabels = {
  renamed: "Renamed",
  skipped: "Kept original",
  failed: "Needs attention",
};

export function LatestDownloadCard({ record, onOpenFile, onShowInFolder }: LatestDownloadCardProps) {
  const canOpen = record.downloadId !== undefined && record.exists !== false && Boolean(record.completedAt);
  const filename = displayFilename(record);
  const extension = record.fileExtension.toUpperCase().slice(0, 4) || "FILE";

  return (
    <section className="rounded-xl border border-[#ccd9ee] bg-white p-4 shadow-card dark:border-lift dark:bg-panel">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
            Your latest download
          </p>
          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold ${statusStyles[record.status]}`}>
            {record.status === "renamed" && <Check size={11} strokeWidth={3} aria-hidden="true" />}
            {statusLabels[record.status]}
          </span>
        </div>
        <time className="shrink-0 text-[10.5px] text-slate-500 dark:text-slate-400">
          {formatRelativeTime(record.completedAt || record.createdAt)}
        </time>
      </div>

      <div className="my-3.5 flex min-w-0 items-center gap-3">
        <div className="relative grid h-12 w-11 shrink-0 place-items-center overflow-hidden rounded-lg bg-blue-600 text-[10px] font-bold tracking-wide text-white dark:bg-blue-500 dark:text-night">
          {extension}
          <span className="absolute right-0 top-0 h-3 w-3 bg-blue-300 [clip-path:polygon(100%_0,100%_100%,0_0)] dark:bg-blue-200" />
        </div>
        <div className="min-w-0">
          <h2 className="filename-line text-[15px] font-semibold tracking-[-0.02em] text-ink dark:text-white" title={filename}>
            {filename}
          </h2>
          {record.status === "renamed" && (
            <p className="filename-line mt-0.5 text-[11.5px] text-slate-500 dark:text-slate-400" title={record.originalFilename}>
              <span className="mr-1 text-slate-400">was</span>{record.originalFilename}
            </p>
          )}
          {record.reason && record.status !== "renamed" && (
            <p className="filename-line mt-0.5 text-[11.5px] text-slate-500 dark:text-slate-400" title={record.reason}>
              {record.reason}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2.5 rounded-lg border border-[#cfdaec] bg-[#f2f6ff] px-3 py-2.5 dark:border-lift dark:bg-[#0d1a2e]">
        <span className="grid h-[30px] w-[30px] shrink-0 place-items-center rounded-md bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-300">
          <FolderOpen size={15} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-[9.5px] font-bold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">Saved to</p>
          <p className="font-display filename-line mt-0.5 text-[12px] font-semibold text-ink dark:text-white" title={record.fullPath}>
            {formatDownloadLocation(record.fullPath)}
          </p>
        </div>
      </div>

      <div className="mt-2.5 grid grid-cols-2 gap-2">
        <Button size="compact" className="h-10 text-[12.5px]" onClick={() => onOpenFile(record)} disabled={!canOpen} title={canOpen ? "Open the downloaded file" : "Available for newly completed downloads"}>
          <ExternalLink size={14} aria-hidden="true" /> Open file
        </Button>
        <Button size="compact" className="h-10 text-[12.5px]" variant="secondary" onClick={() => onShowInFolder(record)}>
          <FolderOpen size={14} aria-hidden="true" /> Show in folder
        </Button>
      </div>

      <dl className="mt-3 grid grid-cols-[1.25fr_.65fr_1fr] border-t border-[#dbe3f0] pt-2.5 dark:border-lift">
        <div className="min-w-0 border-r border-[#dbe3f0] pr-2 dark:border-lift">
          <dt className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400"><Globe2 size={11} aria-hidden="true" /> Source</dt>
          <dd className="font-display filename-line mt-0.5 text-[11px] font-semibold text-ink dark:text-white">{record.sourceDomain || record.sourceName || "Unknown"}</dd>
        </div>
        <div className="min-w-0 border-r border-[#dbe3f0] px-2 dark:border-lift">
          <dt className="text-[10px] text-slate-500 dark:text-slate-400">Size</dt>
          <dd className="font-display filename-line mt-0.5 text-[11px] font-semibold text-ink dark:text-white">{formatFileSize(record.fileSize)}</dd>
        </div>
        <div className="min-w-0 pl-2">
          <dt className="text-[10px] text-slate-500 dark:text-slate-400">Type</dt>
          <dd className="font-display filename-line mt-0.5 text-[11px] font-semibold text-ink dark:text-white">{formatDocumentType(record)}</dd>
        </div>
      </dl>
    </section>
  );
}

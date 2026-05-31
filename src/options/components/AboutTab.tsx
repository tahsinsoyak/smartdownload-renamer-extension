import { Heart, LockKeyhole, ShieldAlert, Trash2 } from "lucide-react";
import { Button } from "../../shared/components/Button";
import { Card } from "../../shared/components/Card";
import { COPY } from "../../shared/constants/copy";
import { DOCUMENT_TYPE_KEYWORDS } from "../../shared/constants/documentTypes";

const PATREON_URL = "https://www.patreon.com/tahsinsoyak";

export function AboutTab({ onClearAll }: { onClearAll: () => void }) {
  return (
    <div className="space-y-3">
      {/* Support */}
      <Card className="overflow-hidden">
        <div className="flex items-center justify-between gap-4 bg-gradient-to-r from-[#ff424d]/5 via-transparent to-transparent p-5">
          <div>
            <h2 className="flex items-center gap-2 text-sm font-semibold text-ink dark:text-white">
              <Heart size={14} className="text-rose-500" />
              Support this extension
            </h2>
            <p className="mt-1 text-sm text-muted-dark dark:text-muted">
              Built and maintained for free. If it saves you time, a small contribution keeps it going.
            </p>
          </div>
          <a
            href={PATREON_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-2 rounded-lg bg-[#ff424d] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90 active:opacity-80"
          >
            <Heart size={13} />
            Patreon
          </a>
        </div>
      </Card>

      {/* Privacy */}
      <Card className="p-5">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-ink dark:text-white">
          <LockKeyhole size={14} className="text-teal-500" />
          Privacy
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-dark dark:text-muted">{COPY.privacy}</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <div className="rounded-lg bg-[#fafafa] p-4 dark:bg-[#141414]">
            <p className="text-xs font-semibold text-ink dark:text-white">Permissions used</p>
            <p className="mt-2 text-xs leading-5 text-muted-dark dark:text-muted">
              <span className="font-medium text-ink dark:text-white">downloads</span> — detects new downloads
              and suggests filenames.
              <br />
              <span className="font-medium text-ink dark:text-white">storage</span> — saves rules and history
              locally.
            </p>
          </div>
          <div className="rounded-lg bg-[#fafafa] p-4 dark:bg-[#141414]">
            <p className="text-xs font-semibold text-ink dark:text-white">Not collected</p>
            <p className="mt-2 text-xs leading-5 text-muted-dark dark:text-muted">
              File contents · cookies · accounts · browsing history · analytics · ads · backend calls.
            </p>
          </div>
        </div>
      </Card>

      {/* Data controls */}
      <Card className="p-5">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-ink dark:text-white">
          <ShieldAlert size={14} className="text-rose-500" />
          Data controls
        </h2>
        <p className="mt-2 text-sm text-muted-dark dark:text-muted">
          Clears all local settings, domain rules, theme, and rename history from this browser. Cannot be
          undone.
        </p>
        <Button className="mt-4" variant="danger" onClick={onClearAll}>
          <Trash2 size={14} /> Clear all local data
        </Button>
      </Card>

      {/* Keyword rules — informational only */}
      <Card className="p-5">
        <h2 className="text-sm font-semibold text-ink dark:text-white">Document type keywords</h2>
        <p className="mt-1 text-xs text-muted-dark dark:text-muted">
          Read-only keyword rules used to classify downloaded files by type.
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {Object.entries(DOCUMENT_TYPE_KEYWORDS)
            .filter(([, kw]) => kw.length > 0)
            .map(([type, kw]) => (
              <div key={type} className="rounded-lg bg-[#fafafa] p-3 dark:bg-[#141414]">
                <p className="text-xs font-semibold capitalize text-ink dark:text-white">
                  {type.replace("_", " ")}
                </p>
                <p className="mt-1 text-[11px] leading-5 text-muted-dark dark:text-muted">{kw.join(", ")}</p>
              </div>
            ))}
        </div>
      </Card>

      <p className="px-1 text-[11px] text-muted">Version 0.1.0 · Free, local-only, no backend.</p>
    </div>
  );
}

import { ArrowRight } from "lucide-react";
import { buildFilename } from "../../shared/lib/buildFilename";
import type { DomainRule, NamingSettings } from "../../shared/types/downloads";

export function NamingPreview({ settings, domainRules }: { settings: NamingSettings; domainRules: DomainRule[] }) {
  const preview = buildFilename({
    originalFilename: "document.pdf",
    url: "https://example.com/files/document.pdf",
    startTime: new Date().toISOString(),
    settings: { ...settings, skipDescriptiveFilenames: false },
    domainRules
  });

  return (
    <div className="rounded-xl bg-surface shadow-card dark:bg-panel">
      <div className="px-4 py-3.5">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-dark dark:text-muted">Preview</p>
        <div className="flex items-center gap-3 rounded-lg bg-[#fafafa] px-3 py-2.5 dark:bg-[#141414]">
          <span className="filename-line font-mono text-sm text-muted-dark dark:text-muted">document.pdf</span>
          <ArrowRight size={14} className="shrink-0 text-muted-dark dark:text-muted" />
          <span className="filename-line font-mono text-sm font-medium text-ink dark:text-white">{preview.filename}</span>
        </div>
      </div>
    </div>
  );
}

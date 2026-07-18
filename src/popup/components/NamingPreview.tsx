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
    <div className="rounded-2xl border border-[#cbd8eb] bg-white p-[18px] shadow-card dark:border-[#263854] dark:bg-panel">
      <div>
        <p className="text-[15px] font-bold text-ink dark:text-white">Ready for your next download</p>
        <p className="mt-1.5 text-[12px] leading-5 text-slate-500 dark:text-slate-400">New downloads will be renamed automatically and shown here with their saved location.</p>
        <p className="mb-2.5 mt-5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Example</p>
        <div className="flex items-center gap-3 rounded-xl border border-[#d8e1f0] bg-[#f2f6ff] px-3.5 py-3.5 dark:border-[#263854] dark:bg-[#091629]">
          <span className="filename-line font-mono text-[12px] text-muted-dark dark:text-muted">document.pdf</span>
          <ArrowRight size={14} className="shrink-0 text-blue-500" />
          <span className="filename-line font-mono text-[12px] font-semibold text-ink dark:text-white">{preview.filename}</span>
        </div>
      </div>
    </div>
  );
}

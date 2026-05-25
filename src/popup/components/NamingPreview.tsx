import { FileText } from "lucide-react";
import { Card } from "../../shared/components/Card";
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
    <Card className="p-3">
      <div className="mb-2.5 flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-950 dark:text-white">Naming preview</h2>
        <span className="rounded-lg bg-blue-50 p-1.5 text-blue-600 dark:bg-blue-950 dark:text-blue-300">
          <FileText size={16} />
        </span>
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="grid grid-cols-[64px_1fr] items-center gap-3 bg-white px-3 py-2.5 dark:bg-slate-950">
          <p className="text-[10px] font-bold uppercase text-slate-400">Before</p>
          <p className="filename-line font-mono text-sm text-slate-700 dark:text-slate-300" title="document.pdf">document.pdf</p>
        </div>
        <div className="grid grid-cols-[64px_1fr] items-center gap-3 border-t border-blue-100 bg-blue-50 px-3 py-2.5 shadow-[inset_3px_0_0_#2563eb] dark:border-blue-900 dark:bg-blue-950">
          <p className="text-[10px] font-bold uppercase text-blue-500 dark:text-blue-300">After</p>
          <p className="filename-line font-mono text-sm font-semibold text-blue-950 dark:text-blue-100" title={preview.filename}>{preview.filename}</p>
        </div>
      </div>
    </Card>
  );
}

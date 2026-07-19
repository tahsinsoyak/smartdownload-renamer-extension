import { ArrowRight } from "lucide-react";
import { buildFilename } from "../../shared/lib/buildFilename";
import type { DomainRule, NamingSettings } from "../../shared/types/downloads";
import { useI18n } from "../../shared/locales/useI18n";

export function NamingPreview({ settings, domainRules }: { settings: NamingSettings; domainRules: DomainRule[] }) {
  const { t } = useI18n();
  const preview = buildFilename({
    originalFilename: "document.pdf",
    url: "https://example.com/files/document.pdf",
    startTime: new Date().toISOString(),
    settings: { ...settings, skipDescriptiveFilenames: false },
    domainRules
  });

  return (
    <div className="rounded-xl border border-[#ccd9ee] bg-white p-4 shadow-card dark:border-lift dark:bg-panel">
      <div>
        <p className="text-[15px] font-semibold text-ink dark:text-white">{t("popup.readyTitle")}</p>
        <p className="mt-1 text-[12px] leading-relaxed text-slate-500 dark:text-slate-400">{t("popup.readyDescription")}</p>
        <p className="mb-2 mt-4 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">{t("popup.example")}</p>
        <div className="flex items-center gap-3 rounded-lg border border-[#d8e1f0] bg-[#f2f6ff] px-3 py-3 dark:border-lift dark:bg-[#0d1a2e]">
          <span className="filename-line font-mono text-sm text-muted-dark dark:text-muted">document.pdf</span>
          <ArrowRight size={14} className="shrink-0 text-blue-500" />
          <span className="filename-line font-mono text-sm font-medium text-ink dark:text-white">{preview.filename}</span>
        </div>
      </div>
    </div>
  );
}

import { ArrowRight, FileCheck2, FileText, ShieldCheck, Sparkles, WandSparkles } from "lucide-react";
import { Card } from "../../shared/components/Card";
import { Select } from "../../shared/components/Select";
import { Switch } from "../../shared/components/Switch";
import { COPY } from "../../shared/constants/copy";
import { buildFilename } from "../../shared/lib/buildFilename";
import type { DomainRule, NamingSettings, RenameRecord } from "../../shared/types/downloads";

type Props = {
  settings: NamingSettings;
  domainRules: DomainRule[];
  history: RenameRecord[];
  onChange: (settings: NamingSettings) => void;
};

export function GeneralTab({ settings, domainRules, history, onChange }: Props) {
  const preview = buildFilename({
    originalFilename: "invoice(3).pdf",
    url: "https://www.amazon.com.tr/order/invoice",
    startTime: "2026-05-26T10:00:00.000Z",
    settings: { ...settings, skipDescriptiveFilenames: false },
    domainRules,
  });

  const renamedCount = history.filter((record) => record.status === "renamed").length;
  const skippedCount = history.filter((record) => record.status === "skipped").length;

  return (
    <div className="space-y-5">
      <Card className="overflow-hidden border-blue-200 dark:border-[#294978]">
        <div className="relative overflow-hidden bg-[linear-gradient(120deg,#eff6ff_0%,#ffffff_68%)] p-5 dark:bg-[linear-gradient(120deg,#142c50_0%,#0e1b2f_70%)] sm:p-6">
          <div className="absolute -right-12 -top-16 h-40 w-40 rounded-full bg-blue-100/70 blur-2xl dark:bg-blue-500/10" />
          <div className="relative">
            <div className="flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-blue-600 text-white shadow-[0_10px_24px_rgba(37,99,235,0.22)] dark:bg-blue-500 dark:text-night">
                <WandSparkles size={21} aria-hidden="true" />
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-bold tracking-[-0.02em] text-ink dark:text-white">Smart renaming</h3>
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.08em] ${settings.enabled ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300" : "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300"}`}>
                    {settings.enabled ? "Active" : "Paused"}
                  </span>
                </div>
              </div>
            </div>
            <Switch
              checked={settings.enabled}
              onChange={(enabled) => onChange({ ...settings, enabled })}
              label="Enable smart renaming"
            />
            </div>
            <p className="mt-3 max-w-2xl text-[13px] leading-5 text-muted-dark sm:pl-16 dark:text-slate-400">
              {settings.enabled ? COPY.autoOn : COPY.autoOff}. New filenames are prepared automatically when downloads begin.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid gap-5 sm:grid-cols-2">
        <Card className="p-5 sm:p-6">
          <div className="flex items-start gap-3.5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600 dark:bg-[#172c52] dark:text-blue-300">
              <FileCheck2 size={17} aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="text-[14px] font-bold text-ink dark:text-white">Filename conflicts</h3>
              <p className="mt-1 text-[12px] leading-5 text-muted-dark dark:text-slate-400">Choose what happens when a filename already exists.</p>
              <label className="mt-4 block">
                <span className="sr-only">Conflict handling</span>
                <Select
                  value={settings.conflictStrategy}
                  onChange={(event) => onChange({ ...settings, conflictStrategy: event.target.value as NamingSettings["conflictStrategy"] })}
                >
                  <option value="append_number">Append a number</option>
                  <option value="uniquify">Let Chrome uniquify</option>
                </Select>
              </label>
            </div>
          </div>
        </Card>

        <Card className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-300">
                <ShieldCheck size={17} aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-[14px] font-bold text-ink dark:text-white">Protect applications</h3>
                <p className="mt-1 text-[12px] leading-5 text-muted-dark dark:text-slate-400">Leave .exe, .dmg, and .pkg files untouched.</p>
              </div>
            </div>
            <Switch
              checked={settings.skipExecutables}
              onChange={(skipExecutables) => onChange({ ...settings, skipExecutables })}
              label="Skip executable files"
            />
          </div>
        </Card>
      </div>

      <Card className="p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3.5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-300">
              <Sparkles size={17} aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-[14px] font-bold text-ink dark:text-white">Live filename preview</h3>
              <p className="mt-1 text-[12px] text-muted-dark dark:text-slate-400">See the exact result before your next download.</p>
            </div>
          </div>
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-700 dark:bg-[#172c52] dark:text-blue-300">Updates instantly</span>
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl border border-[#d5dfef] bg-[#f6f8fc] dark:border-[#263854] dark:bg-[#091629]">
          <PreviewRow label="Before" filename="invoice(3).pdf" />
          <PreviewRow label="After" filename={preview.filename} after />
        </div>
      </Card>

      {history.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { label: "Renamed", value: renamedCount, color: "text-blue-700 dark:text-blue-300" },
            { label: "Kept original", value: skippedCount, color: "text-amber-600 dark:text-amber-300" },
            { label: "Total handled", value: history.length, color: "text-ink dark:text-white" },
          ].map(({ label, value, color }) => (
            <Card key={label} className="flex items-center gap-3.5 p-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-500 dark:bg-[#172842] dark:text-slate-300">
                <FileText size={17} />
              </span>
              <div>
                <p className={`text-xl font-extrabold tabular-nums ${color}`}>{value}</p>
                <p className="mt-0.5 text-[11px] font-semibold text-muted-dark dark:text-slate-400">{label}</p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function PreviewRow({ label, filename, after = false }: { label: string; filename: string; after?: boolean }) {
  return (
    <div className={`grid min-w-0 grid-cols-[88px_minmax(0,1fr)] items-center gap-3 px-4 py-3.5 ${after ? "border-t border-[#d5dfef] bg-blue-50/60 dark:border-[#263854] dark:bg-[#102342]" : ""}`}>
      <span className={`flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.1em] ${after ? "text-blue-700 dark:text-blue-300" : "text-slate-500 dark:text-slate-400"}`}>
        {label}
        {after && <ArrowRight size={12} />}
      </span>
      <p className={`filename-line font-mono text-[13px] ${after ? "font-bold text-blue-700 dark:text-blue-300" : "font-medium text-slate-600 dark:text-slate-300"}`} title={filename}>
        {filename}
      </p>
    </div>
  );
}

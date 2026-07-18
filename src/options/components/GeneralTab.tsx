import { ArrowRight, FileCheck2, ShieldCheck, WandSparkles } from "lucide-react";
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
    <div className="space-y-4">
      <Card className="overflow-hidden">
        <div className="flex items-center justify-between gap-4 border-l-4 border-blue-600 bg-gradient-to-r from-blue-50 to-white p-5 dark:from-[#172c52] dark:to-panel">
          <div className="flex min-w-0 items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-600 text-white shadow-sm dark:bg-blue-400 dark:text-night">
              <WandSparkles size={18} aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-bold text-ink dark:text-white">Smart renaming</h2>
              <p className="mt-1 text-sm text-muted-dark dark:text-muted">
                {settings.enabled ? COPY.autoOn : COPY.autoOff}. Every file stays on this device.
              </p>
            </div>
          </div>
          <Switch checked={settings.enabled} onChange={(enabled) => onChange({ ...settings, enabled })} label="Enable smart renaming" />
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="p-5">
          <label className="block space-y-2.5">
            <span className="flex items-center gap-2 text-sm font-bold text-ink dark:text-white">
              <FileCheck2 size={15} className="text-blue-600 dark:text-blue-300" aria-hidden="true" /> Conflict handling
            </span>
            <Select value={settings.conflictStrategy} onChange={(event) => onChange({ ...settings, conflictStrategy: event.target.value as NamingSettings["conflictStrategy"] })}>
              <option value="append_number">Append a number</option>
              <option value="uniquify">Let Chrome uniquify</option>
            </Select>
            <span className="block text-xs leading-5 text-muted-dark dark:text-muted">Controls what happens when the same filename already exists.</span>
          </label>
        </Card>

        <Card className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="flex items-center gap-2 text-sm font-bold text-ink dark:text-white">
                <ShieldCheck size={15} className="text-blue-600 dark:text-blue-300" aria-hidden="true" /> Skip executables
              </p>
              <p className="mt-2 text-xs leading-5 text-muted-dark dark:text-muted">Leaves .exe, .dmg, and .pkg files untouched for safer defaults.</p>
            </div>
            <Switch checked={settings.skipExecutables} onChange={(skipExecutables) => onChange({ ...settings, skipExecutables })} label="Skip executables" />
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="text-sm font-bold text-ink dark:text-white">Live filename preview</h2>
            <p className="mt-1 text-xs text-muted-dark dark:text-muted">See the result before your next download.</p>
          </div>
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-700 dark:bg-[#172c52] dark:text-blue-300">Updates instantly</span>
        </div>
        <div className="mt-4 grid gap-2 rounded-xl border border-[#d5dfef] bg-[#f3f6fc] p-4 dark:border-lift dark:bg-[#0d1a2e]">
          <div className="flex min-w-0 items-center gap-3">
            <span className="w-12 shrink-0 text-[9px] font-bold uppercase tracking-wider text-slate-500">Before</span>
            <p className="filename-line font-mono text-sm text-slate-600 dark:text-slate-300">invoice(3).pdf</p>
          </div>
          <div className="flex min-w-0 items-center gap-3 border-t border-[#d5dfef] pt-2 dark:border-lift">
            <span className="flex w-12 shrink-0 items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">After <ArrowRight size={10} /></span>
            <p className="filename-line font-mono text-sm font-bold text-blue-700 dark:text-blue-300" title={preview.filename}>{preview.filename}</p>
          </div>
        </div>
      </Card>

      {history.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Renamed", value: renamedCount, color: "text-blue-700 dark:text-blue-300" },
            { label: "Kept original", value: skippedCount, color: "text-amber-600 dark:text-amber-300" },
            { label: "Total handled", value: history.length, color: "text-ink dark:text-white" },
          ].map(({ label, value, color }) => (
            <Card key={label} className="p-4 text-center">
              <p className={`text-2xl font-extrabold tabular-nums ${color}`}>{value}</p>
              <p className="mt-1 text-[11px] font-semibold text-muted-dark dark:text-muted">{label}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

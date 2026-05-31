import { ArrowRight } from "lucide-react";
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
  onChange: (s: NamingSettings) => void;
};

export function GeneralTab({ settings, domainRules, history, onChange }: Props) {
  const preview = buildFilename({
    originalFilename: "invoice(3).pdf",
    url: "https://www.amazon.com.tr/order/invoice",
    startTime: "2026-05-26T10:00:00.000Z",
    settings: { ...settings, skipDescriptiveFilenames: false },
    domainRules,
  });

  const renamedCount = history.filter((r) => r.status === "renamed").length;
  const skippedCount = history.filter((r) => r.status === "skipped").length;

  return (
    <div className="space-y-3">
      {/* Master toggle */}
      <Card className="p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-ink dark:text-white">Smart renaming</p>
            <p className="mt-0.5 text-sm text-muted-dark dark:text-muted">
              {settings.enabled ? COPY.autoOn : COPY.autoOff}
            </p>
          </div>
          <Switch
            checked={settings.enabled}
            onChange={(enabled) => onChange({ ...settings, enabled })}
            label="Enable smart renaming"
          />
        </div>
      </Card>

      {/* Behaviour settings */}
      <div className="grid gap-3 sm:grid-cols-2">
        <Card className="p-4">
          <label className="block space-y-2">
            <p className="text-sm font-medium text-ink dark:text-white">Conflict handling</p>
            <Select
              value={settings.conflictStrategy}
              onChange={(e) =>
                onChange({ ...settings, conflictStrategy: e.target.value as NamingSettings["conflictStrategy"] })
              }
            >
              <option value="append_number">Append number</option>
              <option value="uniquify">Chrome uniquify</option>
            </Select>
            <p className="text-xs text-muted-dark dark:text-muted">
              What happens when a filename already exists in the folder.
            </p>
          </label>
        </Card>

        <Card className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-ink dark:text-white">Skip executables</p>
              <p className="mt-0.5 text-xs text-muted-dark dark:text-muted">
                Leaves .exe, .dmg, and .pkg files untouched.
              </p>
            </div>
            <Switch
              checked={settings.skipExecutables}
              onChange={(skipExecutables) => onChange({ ...settings, skipExecutables })}
              label="Skip executables"
            />
          </div>
        </Card>
      </div>

      {/* Preview */}
      <Card className="p-5">
        <p className="text-sm font-semibold text-ink dark:text-white">Live preview</p>
        <p className="mt-0.5 text-xs text-muted-dark dark:text-muted">
          How your current template handles a sample file.
        </p>
        <div className="mt-4 space-y-2 rounded-lg bg-[#fafafa] p-4 dark:bg-[#141414]">
          <div className="flex items-center gap-2">
            <span className="rounded bg-stone-100 px-1.5 py-0.5 font-mono text-xs text-muted-dark dark:bg-stone-800 dark:text-muted">
              before
            </span>
            <p className="filename-line font-mono text-sm text-ink dark:text-white">invoice(3).pdf</p>
          </div>
          <div className="flex items-center gap-2">
            <ArrowRight size={12} className="ml-0.5 flex-shrink-0 text-teal-500" />
            <p
              className="filename-line font-mono text-sm font-medium text-teal-600 dark:text-teal-400"
              title={preview.filename}
            >
              {preview.filename}
            </p>
          </div>
        </div>
      </Card>

      {/* Stats */}
      {history.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Renamed", value: renamedCount, color: "text-emerald-600 dark:text-emerald-400" },
            { label: "Skipped", value: skippedCount, color: "text-stone-500 dark:text-stone-400" },
            { label: "Total", value: history.length, color: "text-ink dark:text-white" },
          ].map(({ label, value, color }) => (
            <Card key={label} className="p-4 text-center">
              <p className={`text-2xl font-bold tabular-nums ${color}`}>{value}</p>
              <p className="mt-1 text-xs text-muted-dark dark:text-muted">{label}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

import { Select } from "../../shared/components/Select";
import { Input } from "../../shared/components/Input";
import { Card } from "../../shared/components/Card";
import { Switch } from "../../shared/components/Switch";
import { TEMPLATE_PRESETS } from "../../shared/constants/templates";
import type { NamingSettings } from "../../shared/types/downloads";

export function NamingTemplateSettings({ settings, onChange }: { settings: NamingSettings; onChange: (settings: NamingSettings) => void }) {
  return (
    <Card className="p-5">
      <h2 className="text-lg font-bold">Filename template</h2>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Choose a readable naming pattern or write your own with date, source, type, original, and ext variables.</p>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="space-y-1.5">
          <span className="text-sm font-bold">Default template</span>
          <Select value={settings.template} onChange={(event) => onChange({ ...settings, template: event.target.value })}>
            {TEMPLATE_PRESETS.map((template) => (
              <option key={template} value={template}>
                {template}
              </option>
            ))}
          </Select>
        </label>
        <label className="space-y-1.5">
          <span className="text-sm font-bold">Custom template</span>
          <Input value={settings.template} onChange={(event) => onChange({ ...settings, template: event.target.value })} />
        </label>
        <label className="space-y-1.5">
          <span className="text-sm font-bold">Date format</span>
          <Select value={settings.dateFormat} onChange={(event) => onChange({ ...settings, dateFormat: event.target.value as NamingSettings["dateFormat"] })}>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            <option value="DD-MM-YYYY">DD-MM-YYYY</option>
            <option value="YYYYMMDD">YYYYMMDD</option>
          </Select>
        </label>
        <label className="space-y-1.5">
          <span className="text-sm font-bold">Max filename length</span>
          <Input type="number" min={60} max={180} value={settings.maxFilenameLength} onChange={(event) => onChange({ ...settings, maxFilenameLength: Number(event.target.value) })} />
        </label>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <Toggle label="Preserve original" checked={settings.preserveOriginalName} onChange={(value) => onChange({ ...settings, preserveOriginalName: value })} />
        <Toggle label="ASCII-safe mode" checked={settings.asciiSafeMode} onChange={(value) => onChange({ ...settings, asciiSafeMode: value })} />
        <Toggle label="Allow Turkish characters" checked={settings.allowTurkishCharacters} onChange={(value) => onChange({ ...settings, allowTurkishCharacters: value })} />
      </div>
    </Card>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-950">
      <span className="text-sm font-semibold">{label}</span>
      <Switch checked={checked} onChange={onChange} label={label} />
    </div>
  );
}

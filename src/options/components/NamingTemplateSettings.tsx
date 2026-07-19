import { Braces, CalendarDays, Ruler } from "lucide-react";
import { Card } from "../../shared/components/Card";
import { Input } from "../../shared/components/Input";
import { Select } from "../../shared/components/Select";
import { Switch } from "../../shared/components/Switch";
import { TEMPLATE_PRESETS } from "../../shared/constants/templates";
import { useI18n } from "../../shared/locales/useI18n";
import type { NamingSettings } from "../../shared/types/downloads";

export function NamingTemplateSettings({ settings, onChange }: { settings: NamingSettings; onChange: (settings: NamingSettings) => void }) {
  const { t } = useI18n();
  return (
    <div className="space-y-4">
      <Card className="overflow-hidden">
        <div className="flex items-start gap-3 border-b border-border-light bg-gradient-to-r from-blue-50 to-white p-5 dark:border-lift dark:from-[#172c52] dark:to-panel">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-600 text-white dark:bg-blue-400 dark:text-night"><Braces size={18} /></span>
          <div>
            <h2 className="text-base font-bold text-ink dark:text-white">{t("template.title")}</h2>
            <p className="mt-1 text-sm text-muted-dark dark:text-muted">{t("template.description")}</p>
          </div>
        </div>

        <div className="grid gap-4 p-5 md:grid-cols-2">
          <Field label={t("template.preset")} icon={<Braces size={13} />}>
            <Select value={settings.template} onChange={(event) => onChange({ ...settings, template: event.target.value })}>
              {TEMPLATE_PRESETS.map((template) => <option key={template} value={template}>{template}</option>)}
            </Select>
          </Field>
          <Field label={t("template.custom")} icon={<Braces size={13} />}>
            <Input className="font-mono" value={settings.template} onChange={(event) => onChange({ ...settings, template: event.target.value })} />
          </Field>
          <Field label={t("template.dateFormat")} icon={<CalendarDays size={13} />}>
            <Select value={settings.dateFormat} onChange={(event) => onChange({ ...settings, dateFormat: event.target.value as NamingSettings["dateFormat"] })}>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              <option value="DD-MM-YYYY">DD-MM-YYYY</option>
              <option value="YYYYMMDD">YYYYMMDD</option>
            </Select>
          </Field>
          <Field label={t("template.maxLength")} icon={<Ruler size={13} />}>
            <Input type="number" min={60} max={180} value={settings.maxFilenameLength} onChange={(event) => onChange({ ...settings, maxFilenameLength: Number(event.target.value) })} />
          </Field>
        </div>
      </Card>

      <Card className="p-5">
        <h2 className="text-sm font-bold text-ink dark:text-white">{t("template.characterHandling")}</h2>
        <p className="mt-1 text-xs text-muted-dark dark:text-muted">{t("template.characterDescription")}</p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <Toggle label={t("template.preserveOriginal")} description={t("template.preserveDescription")} checked={settings.preserveOriginalName} onChange={(value) => onChange({ ...settings, preserveOriginalName: value })} />
          <Toggle label={t("template.asciiSafe")} description={t("template.asciiDescription")} checked={settings.asciiSafeMode} onChange={(value) => onChange({ ...settings, asciiSafeMode: value })} />
          <Toggle label={t("template.turkishCharacters")} description={t("template.turkishDescription")} checked={settings.allowTurkishCharacters} onChange={(value) => onChange({ ...settings, allowTurkishCharacters: value })} />
        </div>
      </Card>
    </div>
  );
}

function Field({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return <label className="space-y-1.5"><span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600 dark:text-slate-300">{icon}{label}</span>{children}</label>;
}

function Toggle({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <div className="rounded-xl border border-[#d7e0ee] bg-[#f8faff] p-3.5 dark:border-lift dark:bg-[#0d1a2e]">
      <div className="flex items-center justify-between gap-2"><span className="text-xs font-bold text-ink dark:text-white">{label}</span><Switch checked={checked} onChange={onChange} label={label} /></div>
      <p className="mt-2 text-[10.5px] leading-4 text-muted-dark dark:text-muted">{description}</p>
    </div>
  );
}

import { Globe2, Plus, Trash2 } from "lucide-react";
import { Button } from "../../shared/components/Button";
import { Card } from "../../shared/components/Card";
import { Input } from "../../shared/components/Input";
import { Select } from "../../shared/components/Select";
import { Switch } from "../../shared/components/Switch";
import { DOCUMENT_TYPE_LABELS } from "../../shared/constants/documentTypes";
import type { DocumentType, DomainRule } from "../../shared/types/downloads";

export function DomainRules({ rules, onChange }: { rules: DomainRule[]; onChange: (rules: DomainRule[]) => void }) {
  const updateRule = (id: string, updates: Partial<DomainRule>) => {
    onChange(rules.map((rule) => rule.id === id ? { ...rule, ...updates } : rule));
  };

  const addRule = () => {
    onChange([{ id: crypto.randomUUID(), domain: "", sourceName: "", defaultDocumentType: "download", enabled: true, createdAt: new Date().toISOString() }, ...rules]);
  };

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-light bg-gradient-to-r from-blue-50 to-white p-5 dark:border-lift dark:from-[#172c52] dark:to-panel">
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-600 text-white dark:bg-blue-400 dark:text-night"><Globe2 size={18} /></span>
          <div>
            <h2 className="text-base font-bold text-ink dark:text-white">Website rules</h2>
            <p className="mt-1 text-sm text-muted-dark dark:text-muted">Give familiar websites readable source names and preferred document types.</p>
          </div>
        </div>
        <Button onClick={addRule} className="shrink-0"><Plus size={15} /> Add rule</Button>
      </div>

      <div className="space-y-3 p-4">
        {rules.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#cbd6e5] py-10 text-center dark:border-lift">
            <p className="text-sm font-bold text-ink dark:text-white">No website rules</p>
            <p className="mt-1 text-xs text-muted-dark dark:text-muted">Add a rule to customize filenames for a specific site.</p>
          </div>
        ) : rules.map((rule) => (
          <article key={rule.id} className="rounded-xl border border-[#d7e0ee] bg-[#f8faff] p-4 dark:border-lift dark:bg-[#0d1a2e]">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2">
                <span className={`h-2 w-2 shrink-0 rounded-full ${rule.enabled ? "bg-blue-600" : "bg-slate-400"}`} />
                <p className="filename-line text-xs font-bold text-ink dark:text-white">{rule.domain || "New website rule"}</p>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={rule.enabled} onChange={(enabled) => updateRule(rule.id, { enabled })} label={`${rule.enabled ? "Disable" : "Enable"} ${rule.domain || "website"} rule`} />
                <button className="grid h-8 w-8 cursor-pointer place-items-center rounded-lg text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950 dark:hover:text-rose-300" onClick={() => onChange(rules.filter((item) => item.id !== rule.id))} aria-label={`Delete ${rule.domain || "website"} rule`}><Trash2 size={14} /></button>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <label className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">Website domain</span>
                <Input placeholder="example.com" value={rule.domain} onChange={(event) => updateRule(rule.id, { domain: event.target.value })} />
              </label>
              <label className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">Name in filename</span>
                <Input placeholder="Example" value={rule.sourceName} onChange={(event) => updateRule(rule.id, { sourceName: event.target.value })} />
              </label>
              <label className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">Default file type</span>
                <Select value={rule.defaultDocumentType ?? "download"} onChange={(event) => updateRule(rule.id, { defaultDocumentType: event.target.value as DocumentType })}>
                  {Object.entries(DOCUMENT_TYPE_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </Select>
              </label>
            </div>
          </article>
        ))}
      </div>
    </Card>
  );
}

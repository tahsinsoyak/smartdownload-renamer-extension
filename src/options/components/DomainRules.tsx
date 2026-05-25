import { Plus, Trash2 } from "lucide-react";
import { Button } from "../../shared/components/Button";
import { Card } from "../../shared/components/Card";
import { Input } from "../../shared/components/Input";
import { Select } from "../../shared/components/Select";
import type { DocumentType, DomainRule } from "../../shared/types/downloads";
import { DOCUMENT_TYPE_LABELS } from "../../shared/constants/documentTypes";

export function DomainRules({ rules, onChange }: { rules: DomainRule[]; onChange: (rules: DomainRule[]) => void }) {
  const addRule = () =>
    onChange([
      {
        id: crypto.randomUUID(),
        domain: "",
        sourceName: "",
        defaultDocumentType: "download",
        enabled: true,
        createdAt: new Date().toISOString()
      },
      ...rules
    ]);

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold">Domain rules</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Map websites to source names and default document types.</p>
        </div>
        <Button onClick={addRule}>
          <Plus size={16} /> Add rule
        </Button>
      </div>
      <div className="mt-5 space-y-3">
        {rules.map((rule) => (
          <div key={rule.id} className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-950 md:grid-cols-[1fr_1fr_1fr_auto]">
            <Input placeholder="domain.com" value={rule.domain} onChange={(event) => onChange(rules.map((item) => (item.id === rule.id ? { ...item, domain: event.target.value } : item)))} />
            <Input placeholder="Source name" value={rule.sourceName} onChange={(event) => onChange(rules.map((item) => (item.id === rule.id ? { ...item, sourceName: event.target.value } : item)))} />
            <Select value={rule.defaultDocumentType ?? "download"} onChange={(event) => onChange(rules.map((item) => (item.id === rule.id ? { ...item, defaultDocumentType: event.target.value as DocumentType } : item)))}>
              {Object.entries(DOCUMENT_TYPE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
            <Button variant="ghost" className="px-3" onClick={() => onChange(rules.filter((item) => item.id !== rule.id))} aria-label="Delete rule">
              <Trash2 size={16} />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}

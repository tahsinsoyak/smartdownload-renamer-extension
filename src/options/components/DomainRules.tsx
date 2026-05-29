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
          <h2 className="text-base font-semibold text-ink dark:text-white">Domain rules</h2>
          <p className="mt-1 text-sm text-muted-dark dark:text-muted">Map websites to source names and default document types.</p>
        </div>
        <Button onClick={addRule} className="shrink-0">
          <Plus size={15} /> Add rule
        </Button>
      </div>
      {rules.length > 0 && (
        <div className="mt-5 space-y-2">
          {rules.map((rule) => (
            <div key={rule.id} className="flex flex-wrap items-center gap-2 rounded-lg bg-[#fafafa] p-3 dark:bg-[#141414] md:flex-nowrap">
              <Input placeholder="domain.com" value={rule.domain} onChange={(event) => onChange(rules.map((item) => (item.id === rule.id ? { ...item, domain: event.target.value } : item)))} />
              <Input placeholder="Source name" value={rule.sourceName} onChange={(event) => onChange(rules.map((item) => (item.id === rule.id ? { ...item, sourceName: event.target.value } : item)))} />
              <Select value={rule.defaultDocumentType ?? "download"} onChange={(event) => onChange(rules.map((item) => (item.id === rule.id ? { ...item, defaultDocumentType: event.target.value as DocumentType } : item)))}>
                {Object.entries(DOCUMENT_TYPE_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </Select>
              <button
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950 dark:hover:text-rose-400"
                onClick={() => onChange(rules.filter((item) => item.id !== rule.id))}
                aria-label="Delete rule"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

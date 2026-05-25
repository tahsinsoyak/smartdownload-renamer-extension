import { Card } from "../../shared/components/Card";
import { DOCUMENT_TYPE_KEYWORDS } from "../../shared/constants/documentTypes";

export function CategoryRules() {
  return (
    <Card className="p-5">
      <h2 className="text-lg font-bold">Document type rules</h2>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">The MVP uses local keyword rules. Editing keyword lists can be added without changing the privacy model.</p>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {Object.entries(DOCUMENT_TYPE_KEYWORDS)
          .filter(([, keywords]) => keywords.length > 0)
          .map(([type, keywords]) => (
            <div key={type} className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-950">
              <p className="text-sm font-bold capitalize">{type.replace("_", " ")}</p>
              <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">{keywords.join(", ")}</p>
            </div>
          ))}
      </div>
    </Card>
  );
}

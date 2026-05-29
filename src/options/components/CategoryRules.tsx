import { Card } from "../../shared/components/Card";
import { DOCUMENT_TYPE_KEYWORDS } from "../../shared/constants/documentTypes";

export function CategoryRules() {
  return (
    <Card className="p-5">
      <h2 className="text-base font-semibold text-ink dark:text-white">Document type rules</h2>
      <p className="mt-1 text-sm text-muted-dark dark:text-muted">The MVP uses local keyword rules. Editing keyword lists can be added without changing the privacy model.</p>
      <div className="mt-5 grid gap-2 md:grid-cols-2">
        {Object.entries(DOCUMENT_TYPE_KEYWORDS)
          .filter(([, keywords]) => keywords.length > 0)
          .map(([type, keywords]) => (
            <div key={type} className="rounded-lg bg-[#fafafa] p-3 dark:bg-[#141414]">
              <p className="text-sm font-medium text-ink dark:text-white capitalize">{type.replace("_", " ")}</p>
              <p className="mt-1 text-xs leading-5 text-muted-dark dark:text-muted">{keywords.join(", ")}</p>
            </div>
          ))}
      </div>
    </Card>
  );
}

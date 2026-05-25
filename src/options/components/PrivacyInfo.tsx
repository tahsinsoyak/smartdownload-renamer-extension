import { LockKeyhole } from "lucide-react";
import { Card } from "../../shared/components/Card";
import { COPY } from "../../shared/constants/copy";

export function PrivacyInfo() {
  return (
    <Card className="p-5">
      <h2 className="flex items-center gap-2 text-lg font-bold">
        <LockKeyhole size={18} /> Privacy
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{COPY.privacy}</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-950">
          <p className="text-sm font-bold">Permissions</p>
          <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">downloads detects downloads and suggests filenames. storage saves local settings, rules, and recent history.</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-950">
          <p className="text-sm font-bold">Not collected</p>
          <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">No file contents, cookies, accounts, browsing history, analytics, ads, or backend calls.</p>
        </div>
      </div>
    </Card>
  );
}

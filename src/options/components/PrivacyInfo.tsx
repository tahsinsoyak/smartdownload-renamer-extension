import { LockKeyhole } from "lucide-react";
import { Card } from "../../shared/components/Card";
import { COPY } from "../../shared/constants/copy";

export function PrivacyInfo() {
  return (
    <Card className="p-5">
      <h2 className="flex items-center gap-2 text-base font-semibold text-ink dark:text-white">
        <LockKeyhole size={16} className="text-teal-500" /> Privacy
      </h2>
      <p className="mt-2 text-sm leading-6 text-muted-dark dark:text-muted">{COPY.privacy}</p>
      <div className="mt-4 grid gap-2 md:grid-cols-2">
        <div className="rounded-lg bg-[#fafafa] p-4 dark:bg-[#141414]">
          <p className="text-sm font-medium text-ink dark:text-white">Permissions</p>
          <p className="mt-1 text-xs leading-5 text-muted-dark dark:text-muted">downloads detects downloads and suggests filenames. storage saves local settings, rules, and recent history.</p>
        </div>
        <div className="rounded-lg bg-[#fafafa] p-4 dark:bg-[#141414]">
          <p className="text-sm font-medium text-ink dark:text-white">Not collected</p>
          <p className="mt-1 text-xs leading-5 text-muted-dark dark:text-muted">No file contents, cookies, accounts, browsing history, analytics, ads, or backend calls.</p>
        </div>
      </div>
    </Card>
  );
}

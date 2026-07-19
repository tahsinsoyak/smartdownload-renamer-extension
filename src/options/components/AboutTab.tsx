import { LockKeyhole, ShieldAlert, Trash2 } from "lucide-react";
import { Button } from "../../shared/components/Button";
import { Card } from "../../shared/components/Card";
import { DOCUMENT_TYPE_KEYWORDS } from "../../shared/constants/documentTypes";
import { useI18n } from "../../shared/locales/useI18n";

export function AboutTab({ onClearAll }: { onClearAll: () => void }) {
  const { t } = useI18n();

  return (
    <div className="space-y-3">
      <Card className="p-5">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-ink dark:text-white">
          <LockKeyhole size={14} className="text-blue-600 dark:text-blue-300" />
          {t("about.privacy")}
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-dark dark:text-muted">{t("about.privacyDescription")}</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <div className="rounded-xl border border-[#d7e0ee] bg-[#f8faff] p-4 dark:border-lift dark:bg-[#0d1a2e]">
            <p className="text-xs font-semibold text-ink dark:text-white">{t("about.permissionsUsed")}</p>
            <p className="mt-2 text-xs leading-5 text-muted-dark dark:text-muted">
              <span className="font-medium text-ink dark:text-white">downloads</span> — {t("about.downloadsPermission")}
              <br />
              <span className="font-medium text-ink dark:text-white">downloads.open</span> — {t("about.openPermission")}
              <br />
              <span className="font-medium text-ink dark:text-white">storage</span> — {t("about.storagePermission")}
            </p>
          </div>
          <div className="rounded-xl border border-[#d7e0ee] bg-[#f8faff] p-4 dark:border-lift dark:bg-[#0d1a2e]">
            <p className="text-xs font-semibold text-ink dark:text-white">{t("about.notCollected")}</p>
            <p className="mt-2 text-xs leading-5 text-muted-dark dark:text-muted">{t("about.notCollectedList")}</p>
          </div>
        </div>
      </Card>

      <Card className="p-5">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-ink dark:text-white">
          <ShieldAlert size={14} className="text-rose-500" />
          {t("about.dataControls")}
        </h2>
        <p className="mt-2 text-sm text-muted-dark dark:text-muted">{t("about.dataDescription")}</p>
        <Button className="mt-4" variant="danger" onClick={onClearAll}>
          <Trash2 size={14} /> {t("actions.clearAllData")}
        </Button>
      </Card>

      <Card className="p-5">
        <h2 className="text-sm font-semibold text-ink dark:text-white">{t("about.keywordTitle")}</h2>
        <p className="mt-1 text-xs text-muted-dark dark:text-muted">{t("about.keywordDescription")}</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {Object.entries(DOCUMENT_TYPE_KEYWORDS)
            .filter(([, keywords]) => keywords.length > 0)
            .map(([type, keywords]) => (
              <div key={type} className="rounded-lg border border-[#d7e0ee] bg-[#f8faff] p-3 dark:border-lift dark:bg-[#0d1a2e]">
                <p className="text-xs font-semibold capitalize text-ink dark:text-white">{t(`documentTypes.${type}`)}</p>
                <p className="mt-1 text-[11px] leading-5 text-muted-dark dark:text-muted">{keywords.join(", ")}</p>
              </div>
            ))}
        </div>
      </Card>

      <p className="px-1 text-[11px] text-muted">{t("about.version")}</p>
    </div>
  );
}

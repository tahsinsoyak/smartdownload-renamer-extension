import { Download, LockKeyhole, ShieldAlert, Trash2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "../../shared/components/Button";
import { Card } from "../../shared/components/Card";
import { DOCUMENT_TYPE_KEYWORDS } from "../../shared/constants/documentTypes";
import { useI18n } from "../../shared/locales/useI18n";
import { parseBackup, type ExtensionBackup } from "../../shared/lib/backup";

export function AboutTab({ onClearAll, backup, onRestore }: {
  onClearAll: () => Promise<void>;
  backup: ExtensionBackup;
  onRestore: (backup: ExtensionBackup) => Promise<void>;
}) {
  const { t } = useI18n();
  const fileInput = useRef<HTMLInputElement>(null);
  const [notice, setNotice] = useState("");
  const [confirmClear, setConfirmClear] = useState(false);

  const exportBackup = () => {
    const url = URL.createObjectURL(new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `smart-download-renamer-backup-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const importBackup = async (file?: File) => {
    if (!file) return;
    try {
      if (file.size > 5_000_000) throw new Error("fileTooLarge");
      await onRestore(parseBackup(await file.text()));
      setNotice(t("about.importSuccess"));
    } catch {
      setNotice(t("about.importError"));
    } finally {
      if (fileInput.current) fileInput.current.value = "";
    }
  };

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
        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="secondary" onClick={exportBackup}><Download size={14} /> {t("about.exportBackup")}</Button>
          <Button variant="secondary" onClick={() => fileInput.current?.click()}><Upload size={14} /> {t("about.importBackup")}</Button>
          <Button variant="danger" onClick={async () => {
            if (!confirmClear) { setConfirmClear(true); return; }
            try {
              await onClearAll();
              setConfirmClear(false);
              setNotice(t("about.cleared"));
            } catch {
              setNotice(t("about.clearError"));
            }
          }}><Trash2 size={14} /> {confirmClear ? t("about.confirmClear") : t("actions.clearAllData")}</Button>
        </div>
        <input ref={fileInput} className="sr-only" type="file" accept=".json,application/json" onChange={(event) => void importBackup(event.target.files?.[0])} aria-label={t("about.importBackup")} />
        <p className="mt-2 text-xs text-muted-dark dark:text-muted">{t("about.backupDescription")}</p>
        {notice && <p role="status" className="mt-3 text-sm font-medium text-ink dark:text-white">{notice}</p>}
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

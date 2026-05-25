import { buildFilename } from "../shared/lib/buildFilename";
import { addHistoryRecord, getDomainRules, getSettings } from "../shared/lib/storage";
import type { RenameRecord } from "../shared/types/downloads";

function downloadFilename(item: chrome.downloads.DownloadItem): string {
  if (item.filename) return item.filename.split(/[\\/]/).pop() || item.filename;
  return item.url.split("/").pop()?.split("?")[0] || "download";
}

function downloadExtension(item: chrome.downloads.DownloadItem): string | undefined {
  const name = downloadFilename(item);
  const dot = name.lastIndexOf(".");
  return dot > 0 ? name.slice(dot + 1).toLowerCase() : undefined;
}

async function recordSuggestion(
  item: chrome.downloads.DownloadItem,
  suggestion: ReturnType<typeof buildFilename>,
  status: RenameRecord["status"],
  reason?: string
) {
  await addHistoryRecord({
    id: `${item.id}-${Date.now()}`,
    originalFilename: suggestion.originalFilename,
    suggestedFilename: suggestion.filename,
    finalFilename: status === "renamed" ? suggestion.filename : undefined,
    sourceDomain: suggestion.sourceDomain,
    sourceName: suggestion.sourceName,
    documentType: suggestion.documentType,
    fileExtension: suggestion.fileExtension,
    mime: item.mime,
    url: item.url,
    createdAt: new Date().toISOString(),
    status,
    reason
  });
}

export function registerDownloadsListener() {
  chrome.downloads.onDeterminingFilename.addListener((item, suggest) => {
    (async () => {
      const settings = await getSettings();
      const domainRules = await getDomainRules();
      const originalFilename = downloadFilename(item);
      const suggestion = buildFilename({
        originalFilename,
        url: item.url,
        finalUrl: item.finalUrl,
        referrer: item.referrer,
        mime: item.mime,
        fileExtension: downloadExtension(item),
        startTime: item.startTime || new Date().toISOString(),
        settings,
        domainRules
      });

      if (!suggestion.shouldRename) {
        await recordSuggestion(item, suggestion, "skipped", suggestion.reason);
        suggest();
        return;
      }

      await recordSuggestion(item, suggestion, "renamed");
      suggest({
        filename: suggestion.filename,
        conflictAction: "uniquify"
      });
    })().catch(async (error: unknown) => {
      const message = error instanceof Error ? error.message : "Unknown download rename error";
      await addHistoryRecord({
        id: `${item.id}-${Date.now()}`,
        originalFilename: downloadFilename(item),
        suggestedFilename: downloadFilename(item),
        documentType: "download",
        fileExtension: downloadExtension(item) ?? "",
        mime: item.mime,
        url: item.url,
        createdAt: new Date().toISOString(),
        status: "failed",
        reason: message
      });
      suggest();
    });

    return true;
  });
}

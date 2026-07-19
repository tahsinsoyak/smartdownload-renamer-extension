import { describe, expect, it } from "vitest";
import { formatDocumentType, formatDownloadLocation, formatFileSize } from "../src/shared/lib/formatDownload";
import { resolveLanguage, translate } from "../src/shared/locales";
import type { RenameRecord } from "../src/shared/types/downloads";

const record: RenameRecord = {
  id: "locale-test",
  originalFilename: "invoice.pdf",
  suggestedFilename: "2026-07-19_Amazon_Invoice.pdf",
  documentType: "invoice",
  fileExtension: "pdf",
  createdAt: "2026-07-19T10:00:00.000Z",
  status: "renamed",
};

describe("localization", () => {
  it("resolves supported browser locales with English fallback", () => {
    expect(resolveLanguage("tr-TR")).toBe("tr");
    expect(resolveLanguage("en-GB")).toBe("en");
    expect(resolveLanguage("de-DE")).toBe("en");
  });

  it("translates Turkish interface copy and placeholders", () => {
    expect(translate("actions.settings", "tr")).toBe("Ayarlar");
    expect(translate("history.renamedCount", "tr", { count: 3 })).toBe("3 yeniden adlandırıldı");
  });

  it("falls back safely when a translation key is unknown", () => {
    expect(translate("missing.key", "tr")).toBe("missing.key");
  });

  it("localizes details without changing stored download values", () => {
    expect(formatDocumentType(record, "en")).toBe("Invoice · PDF");
    expect(formatDocumentType(record, "tr")).toBe("Fatura · PDF");
    expect(formatFileSize(1.5 * 1024 * 1024, "tr")).toBe("1,5 MB");
    expect(formatDownloadLocation(undefined, "tr")).toBe("İndirilenler klasörü");
  });
});

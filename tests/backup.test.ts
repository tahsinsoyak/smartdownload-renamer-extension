import { describe, expect, it } from "vitest";
import { DEFAULT_SETTINGS } from "../src/shared/constants/templates";
import { parseBackup } from "../src/shared/lib/backup";

const validBackup = {
  format: "smart-download-renamer-backup",
  version: 1,
  exportedAt: "2026-10-25T00:00:00.000Z",
  settings: DEFAULT_SETTINGS,
  domainRules: [],
  history: [{
    id: "record-1",
    downloadId: 42,
    originalFilename: "invoice.pdf",
    suggestedFilename: "2026_Amazon_Invoice.pdf",
    documentType: "invoice",
    fileExtension: "pdf",
    createdAt: "2026-10-25T00:00:00.000Z",
    status: "renamed",
  }],
  theme: "dark",
};

describe("backup import", () => {
  it("accepts a valid backup and removes stale Chrome download IDs", () => {
    const parsed = parseBackup(JSON.stringify(validBackup));
    expect(parsed.history[0].downloadId).toBeUndefined();
    expect(parsed.settings).toEqual(DEFAULT_SETTINGS);
  });

  it("rejects unrelated JSON and malformed settings", () => {
    expect(() => parseBackup("[]")).toThrow("invalidBackup");
    expect(() => parseBackup(JSON.stringify({ ...validBackup, settings: { ...DEFAULT_SETTINGS, enabled: "yes" } }))).toThrow("invalidBackup");
  });

  it("rejects oversized backups", () => {
    expect(() => parseBackup("x".repeat(5_000_001))).toThrow("fileTooLarge");
  });
});

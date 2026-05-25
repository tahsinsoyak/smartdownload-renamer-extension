import { describe, expect, it } from "vitest";
import { ensureExtension, sanitizeFilename, splitFilename } from "../src/shared/lib/sanitizeFilename";

const settings = { asciiSafeMode: false, allowTurkishCharacters: true, maxFilenameLength: 120 };

describe("sanitizeFilename", () => {
  it("removes unsafe filename characters", () => {
    expect(sanitizeFilename('2026-05-26_Bank:Receipt?.pdf', settings)).toBe("2026-05-26_Bank_Receipt.pdf");
  });

  it("preserves or normalizes Turkish characters depending on settings", () => {
    expect(sanitizeFilename("sözleşme.pdf", settings)).toBe("sözleşme.pdf");
    expect(sanitizeFilename("sözleşme.pdf", { ...settings, asciiSafeMode: true })).toBe("sozlesme.pdf");
  });

  it("truncates very long filenames while keeping extension", () => {
    const result = sanitizeFilename(`${"A".repeat(180)}.pdf`, { ...settings, maxFilenameLength: 60 });
    expect(result.length).toBeLessThanOrEqual(60);
    expect(result.endsWith(".pdf")).toBe(true);
  });

  it("preserves the extension", () => {
    expect(ensureExtension("report", "pdf")).toBe("report.pdf");
    expect(splitFilename("invoice(3).pdf")).toEqual({ base: "invoice(3)", ext: "pdf" });
  });
});

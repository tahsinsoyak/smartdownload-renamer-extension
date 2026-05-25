import { describe, expect, it } from "vitest";
import { DEFAULT_SETTINGS } from "../src/shared/constants/templates";
import { avoidDuplicateFilename, buildFilename, isAlreadyDescriptive, isGenericFilename } from "../src/shared/lib/buildFilename";

const settings = { ...DEFAULT_SETTINGS, skipDescriptiveFilenames: false };
const startTime = "2026-05-26T10:00:00.000Z";

describe("buildFilename", () => {
  it("renames generic files using date, source, type, and extension", () => {
    expect(
      buildFilename({
        originalFilename: "document.pdf",
        url: "https://www.trendyol.com/orders",
        startTime,
        settings,
        domainRules: []
      }).filename
    ).toBe("2026-05-26_Trendyol_Invoice.pdf");
  });

  it("handles key MVP examples", () => {
    expect(buildFilename({ originalFilename: "invoice(3).pdf", url: "https://www.amazon.com.tr/invoice", startTime, settings, domainRules: [] }).filename).toBe("2026-05-26_Amazon_Invoice.pdf");
    expect(buildFilename({ originalFilename: "download.pdf", url: "https://coursera.org/learn/course/certificate", startTime, settings, domainRules: [] }).filename).toBe("2026-05-26_Coursera_Certificate.pdf");
    expect(buildFilename({ originalFilename: "certificate.pdf", url: "https://bootcamp.example.com/download", startTime, settings, domainRules: [] }).filename).toBe("2026-05-26_Bootcamp_Certificate.pdf");
    expect(buildFilename({ originalFilename: "download.pdf", url: "https://github.com/user/repo/releases", startTime, settings, domainRules: [] }).filename).toBe("2026-05-26_GitHub_Download.pdf");
  });

  it("skips already descriptive and dangerous files when configured", () => {
    expect(isGenericFilename("download.pdf")).toBe(true);
    expect(isAlreadyDescriptive("2026-05-26_Trendyol_Invoice.pdf", "Trendyol")).toBe(true);
    expect(
      buildFilename({
        originalFilename: "setup.exe",
        url: "https://example.com/setup.exe",
        startTime,
        settings: DEFAULT_SETTINGS,
        domainRules: []
      }).shouldRename
    ).toBe(false);
  });

  it("supports duplicate filename handling helper", () => {
    expect(avoidDuplicateFilename("2026-05-26_Trendyol_Invoice.pdf", ["2026-05-26_Trendyol_Invoice.pdf"])).toBe("2026-05-26_Trendyol_Invoice_2.pdf");
  });
});

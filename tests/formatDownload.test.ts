import { describe, expect, it } from "vitest";
import { formatDownloadLocation, formatFileSize } from "../src/shared/lib/formatDownload";

describe("formatDownloadLocation", () => {
  it("shows the path from the Downloads folder without the filename", () => {
    expect(formatDownloadLocation("C:\\Users\\Taylor\\Downloads\\Documents\\Receipts\\invoice.pdf"))
      .toBe("Downloads / Documents / Receipts");
  });

  it("falls back to a short path when there is no Downloads segment", () => {
    expect(formatDownloadLocation("/home/taylor/files/reports/report.pdf"))
      .toBe("taylor / files / reports");
  });

  it("provides a useful fallback for older history entries", () => {
    expect(formatDownloadLocation()).toBe("Downloads folder");
  });
});

describe("formatFileSize", () => {
  it("formats common byte values", () => {
    expect(formatFileSize(248 * 1024)).toBe("248 KB");
    expect(formatFileSize(1.5 * 1024 * 1024)).toBe("1.5 MB");
  });
});

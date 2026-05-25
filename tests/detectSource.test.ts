import { describe, expect, it } from "vitest";
import { detectSource } from "../src/shared/lib/detectSource";
import { matchDomainRule } from "../src/shared/lib/domainRules";

describe("detectSource", () => {
  it("detects known commerce and developer sources", () => {
    expect(detectSource({ url: "https://www.trendyol.com/orders/invoice" }).sourceName).toBe("Trendyol");
    expect(detectSource({ url: "https://github.com/user/repo/releases" }).sourceName).toBe("GitHub");
    expect(detectSource({ url: "https://drive.google.com/file/d/1" }).sourceName).toBe("GoogleDrive");
  });

  it("uses custom domain rules", () => {
    const rule = matchDomainRule("billing.example.com", [
      { id: "1", domain: "example.com", sourceName: "Example", defaultDocumentType: "invoice", enabled: true, createdAt: "2026-05-26T00:00:00.000Z" }
    ]);
    expect(rule?.sourceName).toBe("Example");
  });
});

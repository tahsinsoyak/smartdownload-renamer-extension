import { describe, expect, it } from "vitest";
import { detectSource } from "../src/shared/lib/detectSource";
import { matchDomainRule } from "../src/shared/lib/domainRules";

describe("detectSource", () => {
  it("detects known commerce and developer sources", () => {
    expect(detectSource({ url: "https://www.trendyol.com/orders/invoice" }).sourceName).toBe("Trendyol");
    expect(detectSource({ url: "https://github.com/user/repo/releases" }).sourceName).toBe("GitHub");
    expect(detectSource({ url: "https://drive.google.com/file/d/1" }).sourceName).toBe("Google Drive");
  });

  it("uses custom domain rules", () => {
    const rule = matchDomainRule("billing.example.com", [
      { id: "1", domain: "example.com", sourceName: "Example", defaultDocumentType: "invoice", enabled: true, createdAt: "2026-05-26T00:00:00.000Z" }
    ]);
    expect(rule?.sourceName).toBe("Example");
  });

  it("recognizes common sites and specific subdomains", () => {
    expect(detectSource({ url: "https://docs.google.com/document/d/123" }).sourceName).toBe("Google Docs");
    expect(detectSource({ url: "https://www.hepsiburada.com/orders" }).sourceName).toBe("Hepsiburada");
    expect(detectSource({ url: "https://teams.microsoft.com/download" }).sourceName).toBe("Microsoft Teams");
    expect(detectSource({ url: "https://www.amazon.co.uk/orders" }).sourceName).toBe("Amazon");
  });

  it("names unlisted sites from their registrable domain", () => {
    expect(detectSource({ url: "https://files.my-store.co.uk/report.pdf" }).sourceName).toBe("My Store");
    expect(detectSource({ url: "https://downloads.example.com.tr/file.zip" }).sourceName).toBe("Example");
    expect(detectSource({ url: "https://assets.research-lab.edu/notes.pdf" }).sourceName).toBe("Research Lab");
  });

  it("uses the referring site when a generic host serves the file", () => {
    expect(detectSource({
      finalUrl: "https://bucket.s3.amazonaws.com/report.pdf",
      url: "https://bucket.s3.amazonaws.com/report.pdf",
      referrer: "https://www.etsy.com/orders",
    }).sourceName).toBe("Etsy");
  });

  it("only matches rule domain boundaries and respects disabled overrides", () => {
    const rules = [{ id: "custom", domain: "amazon.com", sourceName: "My Shop", enabled: true, createdAt: "2026-05-26T00:00:00.000Z" }];
    expect(detectSource({ url: "https://amazon.com.evil.example/download", domainRules: rules }).sourceName).toBe("Evil");
    expect(detectSource({ url: "https://orders.amazon.com/download", domainRules: rules }).sourceName).toBe("My Shop");
    expect(matchDomainRule("amazon.com", [{ ...rules[0], enabled: false }])).toBeUndefined();
  });
});

import { describe, expect, it } from "vitest";
import { classifyDocument, isExecutableExtension } from "../src/shared/lib/classifyDocument";

describe("classifyDocument", () => {
  it("classifies keyword based document types", () => {
    expect(classifyDocument({ filename: "invoice.pdf", url: "https://trendyol.com" })).toBe("invoice");
    expect(classifyDocument({ filename: "sertifika.pdf", url: "https://bootcamp.example.com" })).toBe("certificate");
    expect(classifyDocument({ filename: "receipt.pdf", url: "https://bank.example.com/transaction" })).toBe("bank_receipt");
    expect(classifyDocument({ filename: "document.pdf", url: "https://university.edu/student/transcript" })).toBe("transcript");
  });

  it("detects dangerous executable extensions", () => {
    expect(isExecutableExtension("exe")).toBe(true);
    expect(isExecutableExtension(".ps1")).toBe(true);
    expect(isExecutableExtension("pdf")).toBe(false);
  });
});

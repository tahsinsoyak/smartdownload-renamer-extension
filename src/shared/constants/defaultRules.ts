import type { DomainRule } from "../types/downloads";

export const DEFAULT_DOMAIN_RULES: DomainRule[] = [
  { id: "trendyol", domain: "trendyol.com", sourceName: "Trendyol", defaultDocumentType: "invoice", enabled: true, createdAt: "2026-05-26T00:00:00.000Z" },
  { id: "amazon-tr", domain: "amazon.com.tr", sourceName: "Amazon", defaultDocumentType: "receipt", enabled: true, createdAt: "2026-05-26T00:00:00.000Z" },
  { id: "amazon", domain: "amazon.com", sourceName: "Amazon", defaultDocumentType: "receipt", enabled: true, createdAt: "2026-05-26T00:00:00.000Z" },
  { id: "github", domain: "github.com", sourceName: "GitHub", enabled: true, createdAt: "2026-05-26T00:00:00.000Z" },
  { id: "linkedin", domain: "linkedin.com", sourceName: "LinkedIn", enabled: true, createdAt: "2026-05-26T00:00:00.000Z" },
  { id: "google-drive", domain: "drive.google.com", sourceName: "Google Drive", enabled: true, createdAt: "2026-05-26T00:00:00.000Z" },
  { id: "udemy", domain: "udemy.com", sourceName: "Udemy", defaultDocumentType: "certificate", enabled: true, createdAt: "2026-05-26T00:00:00.000Z" },
  { id: "coursera", domain: "coursera.org", sourceName: "Coursera", defaultDocumentType: "certificate", enabled: true, createdAt: "2026-05-26T00:00:00.000Z" },
  { id: "medium", domain: "medium.com", sourceName: "Medium", defaultDocumentType: "document", enabled: true, createdAt: "2026-05-26T00:00:00.000Z" }
];

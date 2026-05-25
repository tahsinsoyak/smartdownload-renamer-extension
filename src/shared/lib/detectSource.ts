import { getDomainFromUrls, matchDomainRule, normalizeDomain } from "./domainRules";
import type { DomainRule } from "../types/downloads";

const BRAND_CASE: Record<string, string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
  google: "Google",
  googleusercontent: "Google",
  coursera: "Coursera",
  udemy: "Udemy",
  trendyol: "Trendyol",
  amazon: "Amazon",
  medium: "Medium"
};

export type SourceDetectionInput = {
  url?: string;
  finalUrl?: string;
  referrer?: string;
  domainRules?: DomainRule[];
};

export function detectSource(input: SourceDetectionInput): { sourceName: string; sourceDomain?: string } {
  const sourceDomain = getDomainFromUrls(input.finalUrl, input.url, input.referrer);
  const rule = matchDomainRule(sourceDomain, input.domainRules ?? []);
  if (rule) return { sourceName: rule.sourceName, sourceDomain };

  const normalized = normalizeDomain(sourceDomain);
  if (!normalized) return { sourceName: "Website" };

  if (normalized.endsWith(".edu")) return { sourceName: "University", sourceDomain: normalized };
  if (normalized.includes("bank") || normalized.includes("banka")) return { sourceName: "Bank", sourceDomain: normalized };
  if (normalized.includes("bootcamp")) return { sourceName: "Bootcamp", sourceDomain: normalized };

  const parts = normalized.split(".").filter(Boolean);
  const candidate = parts.length > 2 ? parts[parts.length - 3] : parts[0];
  const base = candidate || "Website";
  return {
    sourceName: BRAND_CASE[base] ?? base.replace(/(^|-)(\w)/g, (_, p1: string, p2: string) => `${p1}${p2.toUpperCase()}`),
    sourceDomain: normalized
  };
}

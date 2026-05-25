import type { DomainRule } from "../types/downloads";
import { DEFAULT_DOMAIN_RULES } from "../constants/defaultRules";

export function normalizeDomain(value?: string): string {
  if (!value) return "";
  const raw = value.trim().toLowerCase();
  try {
    const parsed = raw.includes("://") ? new URL(raw) : new URL(`https://${raw}`);
    return parsed.hostname.replace(/^www\./, "");
  } catch {
    return raw.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0] ?? raw;
  }
}

export function getDomainFromUrls(...urls: Array<string | undefined>): string {
  for (const url of urls) {
    const domain = normalizeDomain(url);
    if (domain) return domain;
  }
  return "";
}

export function matchDomainRule(domain: string, rules: DomainRule[] = []): DomainRule | undefined {
  const normalized = normalizeDomain(domain);
  const allRules = [...rules, ...DEFAULT_DOMAIN_RULES].filter((rule) => rule.enabled);
  return allRules.find((rule) => {
    const ruleDomain = normalizeDomain(rule.domain);
    return normalized === ruleDomain || normalized.endsWith(`.${ruleDomain}`) || normalized.includes(ruleDomain);
  });
}

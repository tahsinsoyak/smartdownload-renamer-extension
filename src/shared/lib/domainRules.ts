import type { DomainRule } from "../types/downloads";
import { DEFAULT_DOMAIN_RULES } from "../constants/defaultRules";

export function normalizeDomain(value?: string): string {
  if (!value) return "";
  const raw = value.trim().toLowerCase().replace(/^\*\./, "");
  try {
    const parsed = raw.includes("://") ? new URL(raw) : new URL(`https://${raw}`);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return "";
    return parsed.hostname.replace(/^www\./, "").replace(/\.$/, "");
  } catch {
    return "";
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
  if (!normalized) return undefined;
  const matches = (rule: DomainRule) => {
    const ruleDomain = normalizeDomain(rule.domain);
    return Boolean(ruleDomain) && (normalized === ruleDomain || normalized.endsWith(`.${ruleDomain}`));
  };
  const specificFirst = (items: DomainRule[]) => items.filter((rule) => rule.enabled && matches(rule))
    .sort((a, b) => normalizeDomain(b.domain).length - normalizeDomain(a.domain).length)[0];
  const custom = specificFirst(rules);
  if (custom) return custom;
  const overridden = new Set(rules.map((rule) => normalizeDomain(rule.domain)));
  return specificFirst(DEFAULT_DOMAIN_RULES.filter((rule) => !overridden.has(normalizeDomain(rule.domain))));
}

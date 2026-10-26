import { KNOWN_SITES } from "../constants/knownSites";
import type { DomainRule } from "../types/downloads";
import { matchDomainRule, normalizeDomain } from "./domainRules";

const DELIVERY_HOSTS = [
  "amazonaws.com", "cloudfront.net", "storage.googleapis.com", "googleapis.com", "googleusercontent.com",
  "blob.core.windows.net", "azureedge.net", "cloudflare-ipfs.com",
];
const TWO_LEVEL_SUFFIXES = new Set(["ac", "co", "com", "edu", "gov", "net", "org"]);

export type SourceDetectionInput = {
  url?: string;
  finalUrl?: string;
  referrer?: string;
  domainRules?: DomainRule[];
};

const domainMatches = (domain: string, suffix: string) =>
  domain === suffix || domain.endsWith(`.${suffix}`);

function knownSiteName(domain: string): string | undefined {
  const matches = KNOWN_SITES.flatMap(([name, domains]) =>
    domains.filter((candidate) => domainMatches(domain, candidate)).map((candidate) => ({ name, length: candidate.length })));
  return matches.sort((a, b) => b.length - a.length)[0]?.name;
}

function sourceDomain(input: SourceDetectionInput): string {
  const finalDomain = normalizeDomain(input.finalUrl);
  const originalDomain = normalizeDomain(input.url);
  const referrerDomain = normalizeDomain(input.referrer);
  const isDeliveryHost = (domain: string) => DELIVERY_HOSTS.some((host) => domainMatches(domain, host));
  if (finalDomain && !isDeliveryHost(finalDomain)) return finalDomain;
  if (originalDomain && !isDeliveryHost(originalDomain)) return originalDomain;
  if (referrerDomain) return referrerDomain;
  return finalDomain || originalDomain;
}

function genericSiteName(domain: string): string {
  const parts = domain.split(".").filter(Boolean);
  if (parts.length === 0) return "Website";
  if (parts.length === 1) return titleCase(parts[0]);
  const hasCountrySuffix = parts.length >= 3 && parts[parts.length - 1].length === 2 &&
    TWO_LEVEL_SUFFIXES.has(parts[parts.length - 2]);
  const label = parts[parts.length - (hasCountrySuffix ? 3 : 2)];
  return titleCase(label || "Website");
}

function titleCase(value: string): string {
  return value.replace(/[-_]+/g, " ").replace(/\b[a-z]/g, (letter) => letter.toUpperCase());
}

export function detectSource(input: SourceDetectionInput): { sourceName: string; sourceDomain?: string } {
  const domain = sourceDomain(input);
  if (!domain) return { sourceName: "Website" };
  const rule = matchDomainRule(domain, input.domainRules ?? []);
  if (rule) return { sourceName: rule.sourceName, sourceDomain: domain };
  const name = knownSiteName(domain) ??
    (domain.split(".").some((part) => part === "bootcamp") ? "Bootcamp" : genericSiteName(domain));
  return { sourceName: name, sourceDomain: domain };
}

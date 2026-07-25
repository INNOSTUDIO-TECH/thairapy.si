/**
 * Consent + analytics helpers (Google Consent Mode v2).
 *
 * Tags load on every page but with consent defaulted to "denied"; nothing
 * is tracked until the visitor accepts via the cookie banner.
 */

export const CONSENT_COOKIE = "thairapy_consent";
export const CONSENT_VERSION = 1;

export type ConsentChoice = {
  v: number;
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
export const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
export const ADS_CONVERSION_LABEL =
  process.env.NEXT_PUBLIC_ADS_CONVERSION_LABEL;

export const hasAnalyticsConfigured = Boolean(GA_ID || GTM_ID || ADS_ID);

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export function readConsent(): ConsentChoice | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${CONSENT_COOKIE}=`));
  if (!match) return null;
  try {
    const parsed = JSON.parse(
      decodeURIComponent(match.split("=").slice(1).join("="))
    ) as ConsentChoice;
    if (parsed.v !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeConsent(choice: Omit<ConsentChoice, "v" | "necessary">) {
  const value: ConsentChoice = {
    v: CONSENT_VERSION,
    necessary: true,
    ...choice,
  };
  const maxAge = 60 * 60 * 24 * 180; // 180 days
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(
    JSON.stringify(value)
  )}; path=/; max-age=${maxAge}; SameSite=Lax`;
  applyConsent(value);
  return value;
}

/** Push the granted/denied state to Google Consent Mode. */
export function applyConsent(choice: ConsentChoice) {
  if (typeof window === "undefined" || typeof window.gtag !== "function")
    return;
  window.gtag("consent", "update", {
    analytics_storage: choice.analytics ? "granted" : "denied",
    ad_storage: choice.marketing ? "granted" : "denied",
    ad_user_data: choice.marketing ? "granted" : "denied",
    ad_personalization: choice.marketing ? "granted" : "denied",
  });
}

/** Generic event — used for the Google Ads conversion actions. */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...params });
}

/** Fire a Google Ads conversion (e.g. on call / form submit). */
export function trackConversion(action: string) {
  trackEvent("conversion_action", { conversion_action: action });
  if (
    typeof window !== "undefined" &&
    typeof window.gtag === "function" &&
    ADS_ID &&
    ADS_CONVERSION_LABEL
  ) {
    window.gtag("event", "conversion", {
      send_to: `${ADS_ID}/${ADS_CONVERSION_LABEL}`,
    });
  }
}

"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Cookie } from "lucide-react";
import {
  applyConsent,
  hasAnalyticsConfigured,
  readConsent,
  writeConsent,
} from "@/lib/analytics";
import { Button } from "./Button";

export const OPEN_CONSENT_EVENT = "thairapy:open-consent";

export function CookieConsent() {
  const t = useTranslations("cookie");
  const [open, setOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);

  useEffect(() => {
    const stored = readConsent();
    if (stored) applyConsent(stored);
    // Client-only: the banner depends on a cookie unavailable during SSR.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    else setOpen(true);
    const reopen = () => {
      const current = readConsent();
      setAnalytics(current?.analytics ?? true);
      setMarketing(current?.marketing ?? true);
      setShowSettings(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  if (!open) return null;

  function decide(a: boolean, m: boolean) {
    writeConsent({ analytics: a, marketing: m });
    setOpen(false);
    setShowSettings(false);
  }

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={t("title")}
      className="border-ink/12 bg-canvas/95 fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-2xl rounded-3xl border p-6 shadow-2xl backdrop-blur sm:inset-x-auto sm:right-5 sm:bottom-5"
    >
      <div className="flex items-start gap-4">
        <Cookie className="text-brass mt-0.5 h-5 w-5 shrink-0" aria-hidden />
        <div className="flex-1">
          <h2 className="font-display text-ink text-xl">{t("title")}</h2>
          <p className="text-muted mt-1.5 text-sm leading-relaxed">
            {t("description")}
          </p>

          {showSettings && (
            <div className="mt-5 space-y-3">
              <ConsentRow
                label={t("necessary")}
                desc={t("necessaryDesc")}
                checked
                disabled
              />
              {hasAnalyticsConfigured && (
                <>
                  <ConsentRow
                    label={t("analytics")}
                    desc={t("analyticsDesc")}
                    checked={analytics}
                    onChange={setAnalytics}
                  />
                  <ConsentRow
                    label={t("marketing")}
                    desc={t("marketingDesc")}
                    checked={marketing}
                    onChange={setMarketing}
                  />
                </>
              )}
            </div>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-3">
            {!showSettings ? (
              <>
                <Button
                  size="md"
                  className="flex-1 sm:flex-none"
                  onClick={() => decide(true, true)}
                >
                  {t("accept")}
                </Button>
                <Button
                  size="md"
                  variant="outline"
                  className="flex-1 sm:flex-none"
                  onClick={() => decide(false, false)}
                >
                  {t("reject")}
                </Button>
                {hasAnalyticsConfigured && (
                  <button
                    type="button"
                    onClick={() => setShowSettings(true)}
                    className="link-line link-line--quiet text-muted hover:text-ink text-sm"
                  >
                    {t("settings")}
                  </button>
                )}
              </>
            ) : (
              <>
                <Button
                  size="md"
                  className="flex-1 sm:flex-none"
                  onClick={() => decide(analytics, marketing)}
                >
                  {t("save")}
                </Button>
                <Button
                  size="md"
                  variant="outline"
                  className="flex-1 sm:flex-none"
                  onClick={() => decide(true, true)}
                >
                  {t("accept")}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ConsentRow({
  label,
  desc,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  desc: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <label className="border-ink/10 bg-stone/60 flex cursor-pointer items-start gap-3 rounded-xl border p-3">
      <input
        type="checkbox"
        className="accent-brass mt-1 h-4 w-4"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <span>
        <span className="text-ink block text-sm font-semibold">{label}</span>
        <span className="text-muted block text-xs">{desc}</span>
      </span>
    </label>
  );
}

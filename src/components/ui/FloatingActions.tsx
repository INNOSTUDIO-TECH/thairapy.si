"use client";

import { useTranslations } from "next-intl";
import { ArrowUp, Cookie } from "lucide-react";
import { OPEN_CONSENT_EVENT } from "@/components/ui/CookieConsent";

/**
 * Two always-visible utility buttons anchored bottom-right:
 * reopen the cookie settings, and jump back to the top of the page.
 */
export function FloatingActions() {
  const nav = useTranslations("nav");
  const cookie = useTranslations("cookie");

  const openCookies = () => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const buttonClass =
    "border-ink/15 bg-canvas/90 text-ink hover:bg-ink hover:text-canvas flex h-11 w-11 items-center justify-center rounded-full border shadow-lg backdrop-blur transition-colors duration-300";

  return (
    <div className="fixed right-5 bottom-5 z-30 flex gap-3 print:hidden">
      <button
        type="button"
        onClick={openCookies}
        aria-label={cookie("settings")}
        className={buttonClass}
      >
        <Cookie className="h-5 w-5" aria-hidden />
      </button>
      <a
        href="#top"
        onClick={(e) => {
          e.preventDefault();
          scrollToTop();
        }}
        aria-label={nav("backToTop")}
        className={buttonClass}
      >
        <ArrowUp className="h-5 w-5" aria-hidden />
      </a>
    </div>
  );
}

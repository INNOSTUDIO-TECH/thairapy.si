"use client";

import { Phone, Mail, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/lib/site-config";
import { trackConversion } from "@/lib/analytics";

/**
 * Call / Email presented as refined channel rows. Each click fires a Google
 * Ads conversion event (no-op until conversion IDs are configured).
 */
export function ContactButtons() {
  const t = useTranslations("contact");

  const channels = [
    {
      key: "call",
      icon: Phone,
      label: t("callLabel"),
      value: siteConfig.phone.displayIntl,
      href: `tel:${siteConfig.phone.e164}`,
      external: false,
    },
    {
      key: "email",
      icon: Mail,
      label: t("emailLabel"),
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
      external: false,
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      {channels.map(({ key, icon: Icon, label, value, href, external }) => (
        <a
          key={key}
          href={href}
          onClick={() => trackConversion(key)}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className="group border-ink/12 hover:border-brass/40 hover:bg-stone/60 flex items-center gap-4 rounded-2xl border px-5 py-4 transition-colors duration-300"
        >
          <span className="border-ink/15 text-ink group-hover:border-brass group-hover:bg-brass group-hover:text-noir flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-300">
            <Icon className="h-4 w-4" aria-hidden />
          </span>
          <span className="flex-1">
            <span className="text-muted block text-[0.68rem] font-semibold tracking-[0.2em] uppercase">
              {label}
            </span>
            <span className="font-display text-ink group-hover:text-brass text-lg transition-colors">
              {value}
            </span>
          </span>
          <ArrowUpRight className="text-muted group-hover:text-brass h-4 w-4 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      ))}
    </div>
  );
}

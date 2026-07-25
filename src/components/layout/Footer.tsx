"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { MapPin, Phone, Mail } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { navSections, siteConfig } from "@/lib/site-config";
import { OPEN_CONSENT_EVENT } from "@/components/ui/CookieConsent";
import { InstagramIcon, FacebookIcon } from "@/components/ui/SocialIcons";

export function Footer() {
  const t = useTranslations();
  const nav = useTranslations("nav");
  const year = new Date().getFullYear();
  const a = siteConfig.address;

  return (
    <footer className="bg-canvas text-muted">
      <div className="mx-auto grid max-w-[78rem] gap-12 px-6 py-20 sm:px-8 lg:grid-cols-4 lg:px-12">
        <div className="lg:col-span-1">
          <Image
            src="/logo.svg"
            alt={siteConfig.name}
            width={200}
            height={197}
            unoptimized
            className="h-auto w-44"
          />
          <p className="text-muted mt-5 max-w-xs leading-relaxed">
            {t("footer.tagline")}
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="border-ink/15 text-ink hover:border-brass hover:bg-brass hover:text-noir flex h-10 w-10 items-center justify-center rounded-full border transition-colors"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="border-ink/15 text-ink hover:border-brass hover:bg-brass hover:text-noir flex h-10 w-10 items-center justify-center rounded-full border transition-colors"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="eyebrow text-brass">{t("footer.quickLinks")}</h3>
          <ul className="mt-5 space-y-3">
            {navSections.map((section) => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  className="text-muted hover:text-ink transition-colors"
                >
                  {nav(section)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow text-brass">{t("footer.contactTitle")}</h3>
          <ul className="mt-5 space-y-4">
            <li className="flex items-start gap-3">
              <MapPin className="text-brass mt-1 h-4 w-4 shrink-0" />
              <span>
                {a.street}
                <br />
                {a.postalCode} {a.city}
              </span>
            </li>
            <li>
              <a
                href={`tel:${siteConfig.phone.e164}`}
                className="hover:text-ink flex items-center gap-3 transition-colors"
              >
                <Phone className="text-brass h-4 w-4 shrink-0" />
                {siteConfig.phone.displayIntl}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover:text-ink flex items-center gap-3 transition-colors"
              >
                <Mail className="text-brass h-4 w-4 shrink-0" />
                {siteConfig.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow text-brass">{t("footer.legalTitle")}</h3>
          <ul className="mt-5 space-y-3">
            <li>
              <Link
                href="/privacy"
                className="text-muted hover:text-ink transition-colors"
              >
                {t("footer.privacy")}
              </Link>
            </li>
            <li>
              <Link
                href="/cookies"
                className="text-muted hover:text-ink transition-colors"
              >
                {t("footer.cookies")}
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={() =>
                  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))
                }
                className="text-muted hover:text-ink transition-colors"
              >
                {t("cookie.settings")}
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-ink/10 border-t">
        <div className="text-muted mx-auto flex max-w-[78rem] flex-col items-center justify-between gap-2 px-6 py-7 text-xs sm:flex-row sm:px-8 lg:px-12">
          <p>
            © {year} {siteConfig.legalName}. {t("footer.rights")}
          </p>
          <p>
            {siteConfig.address.street}, {siteConfig.address.city}
          </p>
        </div>
      </div>
    </footer>
  );
}

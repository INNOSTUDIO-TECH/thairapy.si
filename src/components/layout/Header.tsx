"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X, Phone, MapPin, Mail } from "lucide-react";
import Image from "next/image";
import { navSections, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/cn";
import { InstagramIcon, FacebookIcon } from "@/components/ui/SocialIcons";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close the drawer on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const { phone, address, email, social } = siteConfig;
  const addressLine = `${address.street}, ${address.postalCode} ${address.city}`;
  const close = () => setMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Utility bar — contact details + socials. Collapses on scroll so the
          main bar can act as a compact sticky header. Desktop only. */}
      <div
        className={cn(
          "bg-brass text-ivory hidden overflow-hidden transition-all duration-500 lg:block",
          scrolled ? "lg:max-h-0 lg:opacity-0" : "lg:max-h-12 lg:opacity-100"
        )}
      >
        <div className="mx-auto flex h-10 max-w-[78rem] items-center px-6 text-[0.78rem] sm:px-8 lg:px-12">
          <div className="flex flex-1 items-center">
            <a
              href={`tel:${phone.e164}`}
              className="hover:text-noir flex items-center gap-2 transition-colors"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden />
              {phone.displayIntl}
            </a>
          </div>
          <div className="flex items-center gap-7">
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(addressLine)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-noir flex items-center gap-2 transition-colors"
            >
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              {addressLine}
            </a>
            <a
              href={`mailto:${email}`}
              className="hover:text-noir flex items-center gap-2 transition-colors"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden />
              {email}
            </a>
          </div>
          <div className="flex flex-1 items-center justify-end gap-3">
            <a
              href={social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-noir transition-colors"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-noir transition-colors"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Main bar — logo + circle menu trigger */}
      <div
        className={cn(
          "border-b transition-all duration-500",
          scrolled
            ? "border-ink/10 bg-canvas/90 backdrop-blur-md"
            : "border-ink/5 bg-canvas"
        )}
      >
        <div className="mx-auto flex h-20 max-w-[78rem] items-center justify-between px-6 sm:px-8 lg:px-12">
          <a href="#top" aria-label="Thairapy Massage" className="shrink-0">
            <Image
              src="/logo.svg"
              alt={siteConfig.name}
              width={66}
              height={65}
              priority
              unoptimized
              className="h-16 w-auto"
            />
          </a>

          <div className="flex items-center gap-4 sm:gap-5">
            <LanguageSwitcher className="hidden sm:flex" />

            <a
              href="#contact"
              className="bg-brass text-noir hover:bg-ink hover:text-canvas hidden rounded-full px-6 py-3 text-[0.7rem] font-semibold tracking-[0.14em] uppercase transition-all duration-300 sm:inline-block"
            >
              {t("book")}
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={t("openMenu")}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              className="border-ink/20 text-ink hover:bg-ink hover:text-canvas flex h-12 w-12 items-center justify-center rounded-full border transition-colors duration-300"
            >
              <Menu className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div
        onClick={close}
        aria-hidden
        className={cn(
          "bg-noir/50 fixed inset-0 z-40 backdrop-blur-sm transition-opacity duration-500",
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      {/* Slide-in drawer */}
      <aside
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label={t("menu")}
        className={cn(
          "bg-canvas fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col overflow-hidden rounded-l-3xl shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          menuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="border-ink/10 flex items-center justify-between border-b px-8 py-6">
          <span className="eyebrow text-brass">{t("menu")}</span>
          <button
            type="button"
            onClick={close}
            aria-label={t("closeMenu")}
            className="border-ink/20 text-ink hover:bg-ink hover:text-canvas flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <nav
          className="flex flex-1 flex-col overflow-y-auto px-8 py-6"
          aria-label="Primary"
        >
          {navSections.map((section, i) => (
            <a
              key={section}
              href={`#${section}`}
              onClick={close}
              style={{
                transitionDelay: menuOpen ? `${140 + i * 45}ms` : "0ms",
              }}
              className={cn(
                "border-ink/8 font-display text-ink hover:text-brass border-b py-4 text-2xl transition-all duration-500",
                menuOpen
                  ? "translate-x-0 opacity-100"
                  : "translate-x-6 opacity-0"
              )}
            >
              {t(section)}
            </a>
          ))}
        </nav>

        {/* Contact + socials + language + booking */}
        <div className="border-ink/10 border-t px-8 py-6">
          <div className="text-muted flex flex-col gap-3 text-sm">
            <a
              href={`tel:${phone.e164}`}
              className="hover:text-ink flex items-center gap-2.5 transition-colors"
            >
              <Phone className="text-brass h-4 w-4" aria-hidden />
              {phone.displayIntl}
            </a>
            <a
              href={`mailto:${email}`}
              className="hover:text-ink flex items-center gap-2.5 transition-colors"
            >
              <Mail className="text-brass h-4 w-4" aria-hidden />
              {email}
            </a>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(addressLine)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink flex items-center gap-2.5 transition-colors"
            >
              <MapPin className="text-brass h-4 w-4" aria-hidden />
              {addressLine}
            </a>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <LanguageSwitcher />
            <div className="text-ink/70 flex items-center gap-4">
              <a
                href={social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-brass transition-colors"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-brass transition-colors"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          <a
            href="#contact"
            onClick={close}
            className="bg-brass text-noir hover:bg-ink hover:text-canvas mt-6 block rounded-full px-5 py-4 text-center text-[0.7rem] font-semibold tracking-[0.14em] uppercase transition-all duration-300"
          >
            {t("book")}
          </a>
        </div>
      </aside>
    </header>
  );
}

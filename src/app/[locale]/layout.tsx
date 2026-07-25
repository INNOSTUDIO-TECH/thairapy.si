import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, Hanken_Grotesk } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { siteConfig, navSections } from "@/lib/site-config";
import {
  buildLocalBusinessJsonLd,
  buildSiteNavigationJsonLd,
} from "@/lib/structured-data";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@/components/analytics/Analytics";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { FloatingActions } from "@/components/ui/FloatingActions";
import "../globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const languages: Record<string, string> = {
    sl: siteConfig.url,
    de: `${siteConfig.url}/de`,
    "x-default": siteConfig.url,
  };
  const canonical = locale === routing.defaultLocale ? "/" : `/${locale}`;

  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: t("title"), template: t("titleTemplate") },
    description: t("description"),
    applicationName: siteConfig.name,
    alternates: { canonical, languages },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: locale === "de" ? "de_DE" : "sl_SI",
      title: t("title"),
      description: t("description"),
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Enable static rendering.
  setRequestLocale(locale);
  const messages = await getMessages();
  const jsonLd = buildLocalBusinessJsonLd(locale as Locale, messages as never);

  // Section anchors, so this one-pager can surface as jump-to sitelinks.
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const navBase =
    locale === routing.defaultLocale
      ? siteConfig.url
      : `${siteConfig.url}/${locale}`;
  const navJsonLd = buildSiteNavigationJsonLd(
    navSections.map((section) => ({
      name: tNav(section),
      url: `${navBase}/#${section}`,
    }))
  );

  return (
    <html
      lang={locale}
      className={`${cormorant.variable} ${hanken.variable} h-full`}
    >
      <body className="flex min-h-full flex-col overflow-x-clip">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(navJsonLd) }}
        />
        <Analytics />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieConsent />
          <FloatingActions />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

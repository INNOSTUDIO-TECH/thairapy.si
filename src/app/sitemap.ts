import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site-config";

const PATHS = ["", "/privacy", "/cookies"];

function urlFor(locale: string, path: string) {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${siteConfig.url}${prefix}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((path) => ({
    url: urlFor(routing.defaultLocale, path),
    lastModified: new Date(),
    changeFrequency: path === "" ? "monthly" : "yearly",
    priority: path === "" ? 1 : 0.5,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, urlFor(locale, path)])
      ),
    },
  }));
}

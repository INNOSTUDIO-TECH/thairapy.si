import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site-config";

/**
 * Date the page content last actually changed. Bump this by hand when copy,
 * services or prices change — deriving it from `new Date()` would claim every
 * page changed on every deploy, which search engines learn to ignore.
 */
const PATHS = [
  { path: "", lastModified: "2026-08-04" },
  { path: "/privacy", lastModified: "2026-08-04" },
  { path: "/cookies", lastModified: "2026-08-04" },
];

function urlFor(locale: string, path: string) {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${siteConfig.url}${prefix}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map(({ path, lastModified }) => ({
    url: urlFor(routing.defaultLocale, path),
    lastModified,
    changeFrequency: path === "" ? "monthly" : "yearly",
    priority: path === "" ? 1 : 0.5,
    alternates: {
      languages: {
        ...Object.fromEntries(
          routing.locales.map((locale) => [locale, urlFor(locale, path)])
        ),
        // Mirrors the x-default in generateMetadata: unmatched locales get `sl`.
        "x-default": urlFor(routing.defaultLocale, path),
      },
    },
  }));
}

import type { Locale } from "@/i18n/routing";
import { services, siteConfig } from "./site-config";

type Messages = {
  services: { items: Record<string, { name: string; description: string }> };
};

/**
 * Builds the LocalBusiness (DaySpa) JSON-LD graph from the single
 * source of truth in site-config, localized service names included.
 */
export function buildLocalBusinessJsonLd(locale: Locale, messages: Messages) {
  const a = siteConfig.address;

  const openingHoursSpecification = siteConfig.openingHours.flatMap((block) =>
    block.shifts.map((shift) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: block.days,
      opens: shift[0],
      closes: shift[1],
    }))
  );

  const offerCatalog = {
    "@type": "OfferCatalog",
    name: locale === "de" ? "Massagen" : "Masaže",
    itemListElement: services.map((service) => {
      const item = messages.services.items[service.id];
      const lowest = Math.min(...service.variants.map((v) => v.price));
      return {
        "@type": "Offer",
        priceCurrency: siteConfig.currency,
        price: lowest,
        itemOffered: {
          "@type": "Service",
          name: item?.name ?? service.id,
          description: item?.description,
        },
      };
    }),
  };

  return {
    "@context": "https://schema.org",
    "@type": ["HealthAndBeautyBusiness", "DaySpa"],
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    image: `${siteConfig.url}/opengraph-image`,
    logo: `${siteConfig.url}/logo.png`,
    telephone: siteConfig.phone.e164,
    email: siteConfig.email,
    priceRange: siteConfig.priceRange,
    currenciesAccepted: siteConfig.currency,
    address: {
      "@type": "PostalAddress",
      streetAddress: a.street,
      postalCode: a.postalCode,
      addressLocality: a.city,
      addressCountry: a.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: a.geo.lat,
      longitude: a.geo.lng,
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${a.geo.lat},${a.geo.lng}`,
    openingHoursSpecification,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.rating.value,
      reviewCount: siteConfig.rating.count,
    },
    hasOfferCatalog: offerCatalog,
    sameAs: [siteConfig.social.instagram, siteConfig.social.facebook],
  };
}

/**
 * Describes the in-page section navigation so search engines can understand
 * the structure of this one-pager (and may surface the sections as jump-to
 * sitelinks). `items` are the localized {name, url} pairs for each anchor.
 */
export function buildSiteNavigationJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${siteConfig.url}/#nav`,
    name: siteConfig.name,
    itemListElement: items.map((item, i) => ({
      "@type": "SiteNavigationElement",
      position: i + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

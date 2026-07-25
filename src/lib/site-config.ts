/**
 * Single source of truth for all business data.
 * Consumed by UI components, metadata, and JSON-LD structured data
 * so the marketing copy and search-engine data can never drift apart.
 */

export const siteConfig = {
  name: "Thairapy Massage",
  legalName: "THAIRAPY MASSAGE, Mihael Paluc s.p.",
  // Production URL — override per-environment via NEXT_PUBLIC_SITE_URL.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://thairapy.si",
  tagline: "Relax · Recharge · Rejuvenate",

  phone: {
    // E.164 for tel: / wa.me links
    e164: "+38670645602",
    display: "070 645 602",
    displayIntl: "+386 70 645 602",
  },
  // TODO: confirm real inbox with the owner.
  email: "massagethairapy@gmail.com",

  address: {
    street: "Partizanska cesta 44",
    postalCode: "9250",
    city: "Gornja Radgona",
    country: "Slovenija",
    countryCode: "SI",
    // TODO: confirm the exact map pin with the owner.
    geo: { lat: 46.6717, lng: 16.0089 },
  },

  social: {
    instagram: "https://instagram.com/thai_rapy",
    instagramHandle: "@thai_rapy",
    // TODO: replace with the real Facebook page URL.
    facebook: "https://www.facebook.com/profile.php?id=61588645051635#",
  },

  rating: { value: 5.0, count: 4 },

  // Mon–Fri split shift, weekend single shift; also by appointment.
  // Days use schema.org day names; hours are 24h "HH:MM".
  openingHours: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      shifts: [
        ["10:00", "13:00"],
        ["15:00", "18:00"],
      ],
    },
    {
      days: ["Saturday", "Sunday"],
      shifts: [["10:00", "16:00"]],
    },
  ],

  priceRange: "€€",
  currency: "EUR",
} as const;

/**
 * Services. Names & descriptions are translated (keyed by `id` in messages
 * under `services.items.<id>`); durations and prices live here as the
 * canonical source. `duration` is in minutes.
 */
export type ServiceVariant = { duration: number; price: number };

export type ServiceCategory = "signature" | "rituals" | "express";

export type Service = {
  id: string;
  category: ServiceCategory;
  variants: ServiceVariant[];
};

// Order in which menu categories are presented.
export const serviceCategories: ServiceCategory[] = [
  "signature",
  "rituals",
  "express",
];

export const services: Service[] = [
  {
    id: "thai",
    category: "signature",
    variants: [
      { duration: 60, price: 45 },
      { duration: 90, price: 70 },
    ],
  },
  {
    id: "aromaOil",
    category: "signature",
    variants: [
      { duration: 60, price: 50 },
      { duration: 90, price: 70 },
    ],
  },
  {
    id: "combination",
    category: "signature",
    variants: [
      { duration: 60, price: 55 },
      { duration: 90, price: 80 },
    ],
  },
  {
    id: "hotOil",
    category: "signature",
    variants: [
      { duration: 60, price: 55 },
      { duration: 90, price: 80 },
    ],
  },
  {
    id: "aloeVera",
    category: "rituals",
    variants: [
      { duration: 60, price: 65 },
      { duration: 90, price: 85 },
    ],
  },
  {
    id: "bodyTreatment",
    category: "rituals",
    variants: [
      { duration: 60, price: 65 },
      { duration: 90, price: 85 },
    ],
  },
  {
    id: "headBackShoulders",
    category: "express",
    variants: [{ duration: 45, price: 40 }],
  },
  {
    id: "foot",
    category: "express",
    variants: [{ duration: 50, price: 40 }],
  },
];

export const navSections = [
  "about",
  "services",
  "hours",
  "gallery",
  "reviews",
  "contact",
] as const;

export type NavSection = (typeof navSections)[number];

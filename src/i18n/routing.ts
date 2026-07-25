import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Slovenian is the primary market; German for Austrian/German visitors.
  locales: ["sl", "de"],
  defaultLocale: "sl",
  // Default locale (sl) has no prefix ("/"), German lives under "/de".
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];

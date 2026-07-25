import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

// Countries whose visitors should default to German.
const GERMAN_SPEAKING = new Set(["DE", "AT", "CH", "LI"]);

function countryToLocale(country: string | null): "sl" | "de" {
  if (country && GERMAN_SPEAKING.has(country.toUpperCase())) return "de";
  return "sl";
}

export default function proxy(request: NextRequest) {
  // Respect an explicit user choice (set by the language switcher) above all.
  const hasLocaleCookie = request.cookies.has("NEXT_LOCALE");

  if (!hasLocaleCookie) {
    // First-time visitor: bias next-intl's language negotiation by IP country.
    // On Vercel this header is populated automatically at the edge.
    const country = request.headers.get("x-vercel-ip-country");
    const preferred = countryToLocale(country);

    const headers = new Headers(request.headers);
    headers.set("accept-language", preferred);

    const biasedRequest = new NextRequest(request.url, {
      headers,
      // Page navigations are GET; detection only needs the URL + headers.
      method: request.method,
    });

    return intlMiddleware(biasedRequest);
  }

  return intlMiddleware(request);
}

export const config = {
  // Root + localized paths + everything except API, Next internals, metadata
  // routes (icon/og/sitemap/etc.), and any path containing a dot (static files).
  matcher: [
    "/",
    "/(sl|de)/:path*",
    "/((?!api|_next|_vercel|icon|apple-icon|opengraph-image|twitter-image|manifest|sitemap|robots|.*\\..*).*)",
  ],
};

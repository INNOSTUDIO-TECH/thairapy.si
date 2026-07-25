# Thairapy Massage — Website

Presentational, bilingual (Slovenian + German) marketing site for **Thairapy
Massage** in Gornja Radgona, Slovenia. Built with Next.js 16 (App Router) and
designed for SEO and Google Ads from day one.

## Tech stack

- **Next.js 16** (App Router, Turbopack, React 19) · TypeScript (strict)
- **Tailwind CSS v4** with a custom spa palette (olive / beige / gold)
- **next-intl** for i18n with IP-country-based locale detection
- **react-hook-form + zod** contact form, delivered via **Resend**
- **Google Consent Mode v2** + cookie banner, GA4 / GTM / Google Ads ready
- pnpm · ESLint · Prettier · Husky + lint-staged

## Getting started

```bash
pnpm install
cp .env.example .env.local   # fill in what you have; all keys are optional
pnpm dev                     # http://localhost:3000
```

Other scripts: `pnpm build`, `pnpm start`, `pnpm lint`, `pnpm typecheck`,
`pnpm format`.

## Internationalization

- Locales: **`sl` (default, no URL prefix)** and **`de` (`/de`)**.
- First-time visitors are routed by IP country (`x-vercel-ip-country`, provided
  automatically on Vercel): `DE/AT/CH/LI` → German, everyone else → Slovenian.
- A manual switch (header / footer) persists the choice in the `NEXT_LOCALE`
  cookie, which always wins over IP detection.
- Detection logic: `src/proxy.ts` (Next.js 16's renamed middleware). All copy
  lives in `src/messages/{sl,de}.json`.

## Editing content

Almost everything is data-driven from two places:

- **`src/lib/site-config.ts`** — phone, email, address, geo, opening hours,
  socials, rating, and the **services + prices** list. This single source also
  feeds the SEO structured data, so the site and Google never disagree.
- **`src/messages/sl.json` / `de.json`** — all visible text, service
  descriptions, testimonials, and legal pages.

## SEO

- Per-locale metadata, canonical URLs, and `hreflang` (`sl` / `de` /
  `x-default`) via `generateMetadata` in `src/app/[locale]/layout.tsx`.
- `LocalBusiness` (DaySpa) JSON-LD with hours, geo, price range, rating, and a
  localized service catalog — `src/lib/structured-data.ts`.
- `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, generated OG image and
  app icon (`src/app/*`).

## Analytics & Google Ads (Consent Mode v2)

Tracking is **off until the visitor consents** and stays off entirely if no IDs
are configured. Set these in `.env.local` to enable:

| Variable                           | Purpose                            |
| ---------------------------------- | ---------------------------------- |
| `NEXT_PUBLIC_GA_ID`                | GA4 measurement ID (`G-…`)         |
| `NEXT_PUBLIC_GTM_ID`               | Google Tag Manager (`GTM-…`, opt.) |
| `NEXT_PUBLIC_GOOGLE_ADS_ID`        | Google Ads ID (`AW-…`)             |
| `NEXT_PUBLIC_ADS_CONVERSION_LABEL` | Conversion label for Ads           |

Conversion events fire on **Call**, **WhatsApp**, **Email**, and **contact-form
submit** (`src/lib/analytics.ts`). The cookie banner manages Consent Mode and
can be reopened from the footer.

## Contact form

`POST /api/contact` validates with zod, blocks spam via a honeypot + basic rate
limit, and emails through Resend. Configure:

- `RESEND_API_KEY` — from [resend.com](https://resend.com)
- `CONTACT_EMAIL` — inbox that receives submissions
- `CONTACT_FROM` — a verified sender, e.g. `Thairapy <noreply@thairapy.si>`

Without a key the form still succeeds in the UI and logs the submission
server-side (so it never silently breaks during development).

## Deployment (Vercel)

1. Import the repo into Vercel.
2. Add the env vars from `.env.example` (set `NEXT_PUBLIC_SITE_URL` to the final
   domain).
3. Deploy. IP-country detection works automatically on Vercel's edge.

## ⚠️ Before going live — replace placeholders

- **Real photos**: studio interior + treatments. Drop them in `public/` and
  swap the placeholder blocks in `Hero.tsx` and `Gallery.tsx` for `next/image`.
- **Logo**: `Logo.tsx` is a typographic stand-in; replace with the lotus logo.
- **Business email** and **Facebook URL** in `site-config.ts` (placeholders).
- **Testimonials** in the message files are examples — replace with real Google
  reviews (with permission).
- **Map pin** coordinates in `site-config.ts` — confirm the exact location.

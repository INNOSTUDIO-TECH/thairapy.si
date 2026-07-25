"use client";

import Script from "next/script";
import { GA_ID, GTM_ID, ADS_ID } from "@/lib/analytics";

/**
 * Loads Google tags with Consent Mode v2 defaults set to "denied".
 * The cookie banner flips these to "granted" via applyConsent().
 * Renders nothing if no measurement IDs are configured.
 */
export function Analytics() {
  if (!GA_ID && !GTM_ID && !ADS_ID) return null;

  return (
    <>
      {/* Consent defaults must run before any Google tag. Plain inline script
          so it executes during initial HTML parse, ahead of the async tags. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied',
              wait_for_update: 500
            });
            gtag('set', 'url_passthrough', true);
          `,
        }}
      />

      {GTM_ID && (
        <Script id="gtm" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
      )}

      {(GA_ID || ADS_ID) && (
        <>
          <Script
            id="gtag-src"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID ?? ADS_ID}`}
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              gtag('js', new Date());
              ${GA_ID ? `gtag('config', '${GA_ID}', { anonymize_ip: true });` : ""}
              ${ADS_ID ? `gtag('config', '${ADS_ID}');` : ""}
            `}
          </Script>
        </>
      )}
    </>
  );
}

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Star } from "lucide-react";
import { Container } from "@/components/ui/Section";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      id="top"
      className="text-ivory bg-noir relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* Background photograph + legibility scrims. */}
      <div aria-hidden className="absolute inset-0">
        <Image
          src="/photos/a4c07714-6da4-4891-9076-c4619dcc0058.JPG"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_7%]"
        />
        {/* overall darkening to unify the frame and seat the type */}
        <div className="bg-noir/40 absolute inset-0" />
        {/* darken the left column and base, where the type sits, while the
            airy right side of the photograph shows through */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(9,11,7,0.85)_0%,rgba(9,11,7,0.5)_38%,transparent_68%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(9,11,7,0.82)_0%,transparent_46%)]" />
        {/* film grain */}
        <div className="noise absolute inset-0 opacity-[0.05] mix-blend-overlay" />
      </div>

      <Container className="relative flex flex-1 flex-col">
        {/* Top rail: label opposite the client rating */}
        <div className="flex items-start justify-between pt-40 sm:pt-48">
          <div
            className="rise flex items-center gap-3"
            style={{ animationDelay: "80ms" }}
          >
            <span className="bg-brass-soft h-px w-10" />
            <span className="eyebrow text-brass-soft">{t("eyebrow")}</span>
          </div>

          <div
            className="rise border-ivory/15 hidden items-center gap-2.5 rounded-full border bg-white/[0.04] px-4 py-2 backdrop-blur-sm sm:flex"
            style={{ animationDelay: "180ms" }}
          >
            <span className="flex gap-0.5" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="fill-brass-soft text-brass-soft h-3 w-3"
                />
              ))}
            </span>
            <span className="text-ivory-dim text-sm">
              <span className="text-ivory font-semibold">
                {siteConfig.rating.value.toFixed(1)}
              </span>{" "}
              · {t("ratingLabel")}
            </span>
          </div>
        </div>

        {/* Headline anchored to the base of the frame */}
        <div className="mt-auto pb-16 sm:pb-20 lg:pb-24">
          <h1 className="font-display text-[clamp(3.2rem,11vw,8.5rem)] leading-[0.9] tracking-[-0.01em]">
            <span className="rise block" style={{ animationDelay: "240ms" }}>
              {t("headlineLead")}
            </span>
            <span className="rise block" style={{ animationDelay: "360ms" }}>
              <em className="text-brass-soft font-[440] italic">
                {t("headlineAccent")}
              </em>
              <span className="text-brass-soft/60">.</span>
            </span>
          </h1>

          <p
            className="rise text-ivory-dim mt-8 max-w-md text-lg leading-relaxed"
            style={{ animationDelay: "660ms" }}
          >
            {t("subtitle")}
          </p>

          <div
            className="rise mt-10 flex flex-wrap items-center gap-x-8 gap-y-5"
            style={{ animationDelay: "760ms" }}
          >
            <a
              href="#contact"
              className="bg-brass text-noir hover:bg-brass-soft rounded-full px-8 py-4 text-xs font-semibold tracking-[0.14em] uppercase transition-colors duration-300"
            >
              {t("ctaPrimary")}
            </a>
            <a
              href="#services"
              className="link-line text-ivory text-sm font-medium tracking-wide"
            >
              {t("ctaSecondary")}
            </a>

            {/* Rating, inline, for the narrow layout where the top chip is hidden */}
            <span className="text-ivory-dim flex items-center gap-2 text-sm sm:hidden">
              <span className="flex gap-0.5" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="fill-brass-soft text-brass-soft h-3 w-3"
                  />
                ))}
              </span>
              <span className="text-ivory font-semibold">
                {siteConfig.rating.value.toFixed(1)}
              </span>
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}

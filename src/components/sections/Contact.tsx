import { useTranslations } from "next-intl";
import { MapPin, Clock, ArrowUpRight } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { siteConfig } from "@/lib/site-config";
import { ContactButtons } from "./ContactButtons";
import { ContactForm } from "./ContactForm";

export function Contact() {
  const t = useTranslations("contact");
  const days = useTranslations("hours.days");
  const hoursT = useTranslations("hours");
  const a = siteConfig.address;
  const fullAddress = `${a.street}, ${a.postalCode} ${a.city}, ${a.country}`;
  const mapEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(
    fullAddress
  )}&z=15&output=embed`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    fullAddress
  )}`;

  return (
    <Section id="contact" className="bg-stone-deep">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: channels + location details */}
          <div>
            <ContactButtons />

            <div className="mt-8 grid gap-8">
              <div>
                <div className="text-brass flex items-center gap-2">
                  <MapPin className="h-4 w-4" aria-hidden />
                  <span className="eyebrow">{t("addressLabel")}</span>
                </div>
                <div className="mt-2 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
                  <p className="text-ink leading-relaxed">
                    {a.street}
                    <br />
                    {a.postalCode} {a.city}
                  </p>
                  <a
                    href={directions}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-line text-ink text-sm font-medium"
                  >
                    {t("directions")}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <div>
                <div className="text-brass flex items-center gap-2">
                  <Clock className="h-4 w-4" aria-hidden />
                  <span className="eyebrow">{t("hoursLabel")}</span>
                </div>
                <div className="mt-2 space-y-2 leading-relaxed">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6">
                    <span className="text-ink">
                      {days("monday")}–{days("friday")}
                    </span>
                    <span className="text-muted">
                      10:00–13:00 · 15:00–18:00
                    </span>
                  </div>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6">
                    <span className="text-ink">
                      {days("saturday")}–{days("sunday")}
                    </span>
                    <span className="text-muted">10:00–16:00</span>
                  </div>
                  <p className="text-muted">{hoursT("byAppointment")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <ContactForm />
        </div>

        {/* Location map — full-width banner across both columns */}
        <div className="border-ink/12 mt-12 overflow-hidden rounded-2xl border">
          <iframe
            title={t("mapTitle")}
            src={mapEmbed}
            width="100%"
            height="420"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block w-full grayscale-[35%]"
          />
        </div>
      </Container>
    </Section>
  );
}

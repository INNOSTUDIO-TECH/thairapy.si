import { useTranslations } from "next-intl";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { services, serviceCategories } from "@/lib/site-config";

export function Services() {
  const t = useTranslations("services");

  return (
    <Section id="services" className="bg-stone">
      <Container>
        {/* Header */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="bg-brass h-px w-8" />
            <span className="eyebrow text-brass">{t("eyebrow")}</span>
          </div>
          <h2 className="text-ink mt-5 text-[clamp(2.2rem,5vw,3.6rem)]">
            {t("title")}
          </h2>
          <p className="text-muted mt-5 text-lg leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* The menu, grouped by category */}
        <div className="mt-16">
          {serviceCategories.map((category) => {
            const items = services.filter((s) => s.category === category);
            return (
              <div key={category} className="mt-16 first:mt-0">
                <div className="mb-3 flex items-center gap-5">
                  <span className="eyebrow text-brass">
                    {t(`categories.${category}`)}
                  </span>
                  <span className="bg-ink/10 h-px flex-1" />
                </div>

                <ul>
                  {items.map((service, i) => (
                    <Reveal
                      as="li"
                      key={service.id}
                      delay={i * 70}
                      className="border-ink/10 border-b py-7"
                    >
                      <div className="flex items-baseline gap-4">
                        <h3 className="font-display text-ink text-2xl leading-none sm:text-[1.7rem]">
                          {t(`items.${service.id}.name`)}
                        </h3>
                        <span className="leader text-ink/25" />
                        <div className="flex shrink-0 items-baseline gap-6">
                          {service.variants.map((v) => (
                            <span
                              key={v.duration}
                              className="text-right whitespace-nowrap"
                            >
                              <span className="text-muted mr-2 text-sm tracking-wide">
                                {v.duration} {t("min")}
                              </span>
                              <span className="font-display text-brass text-3xl font-medium sm:text-4xl">
                                {v.price} €
                              </span>
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-muted mt-2.5 max-w-xl text-sm leading-relaxed">
                        {t(`items.${service.id}.description`)}
                      </p>
                    </Reveal>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <p className="text-muted mt-12 text-sm">{t("note")}</p>
        <p className="text-muted/80 mt-2 text-xs">{t("taxNote")}</p>
      </Container>
    </Section>
  );
}

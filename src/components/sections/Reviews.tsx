import { useTranslations } from "next-intl";
import { Star } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/lib/site-config";

type ReviewItem = { name: string; text: string };

export function Reviews() {
  const t = useTranslations("reviews");
  const items = t.raw("items") as ReviewItem[];

  return (
    <Section id="reviews" className="bg-canvas">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle", {
            rating: siteConfig.rating.value.toFixed(1),
          })}
        />

        <div className="border-ink/10 mt-16 grid gap-px border-y md:grid-cols-3">
          {items.map((item, i) => (
            <Reveal
              as="article"
              key={i}
              delay={i * 110}
              className="bg-canvas md:[&:not(:first-child)]:border-ink/10 py-10 md:px-9 md:first:pl-0 md:last:pr-0 md:[&:not(:first-child)]:border-l"
            >
              <span className="font-display text-brass/60 text-5xl leading-none">
                &ldquo;
              </span>
              <p className="font-display text-ink-2 -mt-3 text-xl leading-relaxed italic">
                {item.text}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex gap-0.5" aria-hidden>
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className="fill-brass text-brass h-3.5 w-3.5"
                    />
                  ))}
                </div>
                <span className="eyebrow text-ink">{item.name}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

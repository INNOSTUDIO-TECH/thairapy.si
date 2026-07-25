import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const featureKeys = ["authentic", "personal", "calm"] as const;

export function About() {
  const t = useTranslations("about");

  return (
    <Section id="about" className="bg-canvas">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="bg-brass h-px w-8" />
              <span className="eyebrow text-brass">{t("eyebrow")}</span>
            </div>
            <h2 className="text-ink mt-6 text-[clamp(2rem,4vw,3.1rem)]">
              {t("title")}
            </h2>
            <div className="relative mt-8 aspect-[4/5] overflow-hidden sm:max-w-sm lg:max-w-none">
              <Image
                src="/photos/432fdeef-6028-43de-a292-3d0c50112287.JPG"
                alt="Terapevtka izvaja tradicionalno tajsko masažo z raztezanjem"
                fill
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 24rem, 100vw"
                className="object-cover"
              />
              <span className="border-ivory/15 pointer-events-none absolute inset-3 border" />
            </div>
          </div>

          <div className="flex flex-col lg:col-span-7">
            <p className="font-display text-ink-2 text-2xl leading-snug sm:text-[1.7rem]">
              {t("lead")}
            </p>
            <div className="text-muted mt-7 space-y-5 text-lg leading-relaxed">
              <p>{t("p1")}</p>
              <p>{t("p2")}</p>
            </div>

            {/* Principles — stacked vertically beside the image, divided by
                hairlines. Pushed to the column base on desktop. */}
            <div className="mt-12 flex flex-col lg:mt-auto">
              <div className="mb-10 flex items-center gap-3">
                <span className="bg-brass h-px w-8" />
                <span className="eyebrow text-brass">
                  {t("featuresEyebrow")}
                </span>
              </div>

              {featureKeys.map((key, i) => (
                <Reveal
                  key={key}
                  delay={i * 110}
                  className="border-ink/10 flex items-baseline gap-5 border-t py-6 first:border-t-0 last:border-b"
                >
                  <span className="font-display text-brass w-8 shrink-0 text-xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-ink text-xl">
                      {t(`features.${key}.title`)}
                    </h3>
                    <p className="text-muted mt-2 leading-relaxed">
                      {t(`features.${key}.text`)}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

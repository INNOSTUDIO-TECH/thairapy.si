import { ArrowLeft } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Section";
import { siteConfig } from "@/lib/site-config";

type Section = { heading: string; body: string };

/** Shared renderer for the privacy & cookie policy pages. */
export async function LegalPage({
  locale,
  ns,
}: {
  locale: string;
  ns: "privacy" | "cookies";
}) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: `legal.${ns}` });
  const tl = await getTranslations({ locale, namespace: "legal" });

  const a = siteConfig.address;
  const values = {
    legalName: siteConfig.legalName,
    address: `${a.street}, ${a.postalCode} ${a.city}`,
    email: siteConfig.email,
  };

  const sections = t.raw("sections") as Section[];

  return (
    <article className="bg-canvas pt-32 pb-24">
      <Container className="max-w-3xl">
        <Link href="/" className="link-line text-ink text-sm font-medium">
          <ArrowLeft className="h-4 w-4" />
          {tl("backHome")}
        </Link>

        <h1 className="text-ink mt-8 text-[clamp(2rem,4vw,3rem)]">
          {t("title")}
        </h1>
        <p className="text-muted mt-5 text-lg leading-relaxed">
          {t("intro", values)}
        </p>

        <div className="mt-12 space-y-9">
          {sections.map((_, i) => (
            <section key={i}>
              <h2 className="font-display text-ink text-xl">
                {t(`sections.${i}.heading`)}
              </h2>
              <p className="text-muted mt-2.5 leading-relaxed">
                {t(`sections.${i}.body`, values)}
              </p>
            </section>
          ))}
        </div>
      </Container>
    </article>
  );
}

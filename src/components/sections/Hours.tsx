import { useTranslations } from "next-intl";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/cn";
import { OpenStatus } from "./OpenStatus";

const WEEK = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

const SCHEMA_DAY: Record<string, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

function shiftsFor(dayKey: string): string[][] {
  const schemaDay = SCHEMA_DAY[dayKey];
  const block = siteConfig.openingHours.find((b) =>
    b.days.includes(schemaDay as never)
  );
  return block ? block.shifts.map((s) => [...s]) : [];
}

export function Hours() {
  const t = useTranslations("hours");
  const days = useTranslations("hours.days");

  return (
    <Section id="hours" className="bg-canvas">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow={t("eyebrow")}
              title={t("title")}
              subtitle={t("subtitle")}
            />
            <div className="mt-8">
              <OpenStatus />
            </div>
          </div>

          <div className="lg:col-span-7">
            <ul>
              {WEEK.map((dayKey) => {
                const shifts = shiftsFor(dayKey);
                const closed = shifts.length === 0;
                return (
                  <li
                    key={dayKey}
                    className="border-ink/12 flex items-baseline justify-between gap-4 border-b py-5 first:border-t"
                  >
                    <span className="font-display text-ink text-xl">
                      {days(dayKey)}
                    </span>
                    <span className="leader text-ink/25" />
                    <span
                      className={cn(
                        "shrink-0 text-right tabular-nums",
                        closed
                          ? "text-muted/70 text-sm tracking-wide uppercase"
                          : "text-ink-2"
                      )}
                    >
                      {closed
                        ? t("closedLabel")
                        : shifts.map(([o, c]) => `${o} – ${c}`).join("  ·  ")}
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className="text-muted mt-6 text-sm">{t("byAppointment")}</p>
          </div>
        </div>
      </Container>
    </Section>
  );
}

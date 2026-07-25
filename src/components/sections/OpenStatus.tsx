"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/cn";

const DAY_INDEX: Record<string, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

/** Current weekday + minutes-since-midnight in the studio's timezone. */
function nowInLjubljana() {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Ljubljana",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = fmt.formatToParts(new Date());
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "Monday";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
  return { day: DAY_INDEX[weekday] ?? 1, minutes: hour * 60 + minute };
}

function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function isOpenNow() {
  const { day, minutes } = nowInLjubljana();
  for (const block of siteConfig.openingHours) {
    const days = block.days.map((d) => DAY_INDEX[d]);
    if (!days.includes(day)) continue;
    for (const [open, close] of block.shifts) {
      if (minutes >= toMinutes(open) && minutes < toMinutes(close)) return true;
    }
  }
  return false;
}

export function OpenStatus() {
  const t = useTranslations("hours");
  // Avoid hydration mismatch: compute after mount.
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    // Client-only: computed after mount to avoid SSR/hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(isOpenNow());
    const id = setInterval(() => setOpen(isOpenNow()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (open === null) return null;

  return (
    <span className="text-ink inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.18em] uppercase">
      <span
        className={cn(
          "relative flex h-2 w-2 items-center justify-center",
          open ? "text-brass" : "text-muted"
        )}
        aria-hidden
      >
        {open && (
          <span className="bg-brass absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" />
        )}
        <span className="relative h-2 w-2 rounded-full bg-current" />
      </span>
      {open ? t("openNow") : t("closedNow")}
    </span>
  );
}

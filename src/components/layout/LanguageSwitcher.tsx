"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";
import { Globe } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/cn";

/**
 * Switches locale via next-intl's router, which persists the choice in the
 * NEXT_LOCALE cookie so the IP-based default no longer overrides it.
 */
export function LanguageSwitcher({
  className,
  tone = "default",
}: {
  className?: string;
  tone?: "default" | "light";
}) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: (typeof routing.locales)[number]) {
    if (next === locale) return;
    // pathname here excludes the locale prefix; replace keeps the same page.
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div
      className={cn("flex items-center gap-1", className)}
      aria-label="Language"
    >
      <Globe className="text-brass mr-1 h-4 w-4" aria-hidden />
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => switchTo(loc)}
          disabled={isPending}
          aria-current={loc === locale ? "true" : undefined}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide uppercase transition-colors",
            loc === locale
              ? tone === "light"
                ? "bg-ivory text-noir"
                : "bg-ink text-canvas"
              : tone === "light"
                ? "text-ivory/70 hover:bg-ivory/10"
                : "text-ink/55 hover:bg-ink/10"
          )}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}

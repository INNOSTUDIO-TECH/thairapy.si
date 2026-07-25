import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[78rem] px-6 sm:px-8 lg:px-12",
        className
      )}
    >
      {children}
    </div>
  );
}

export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-24 sm:py-32", className)}>
      {children}
    </section>
  );
}

/**
 * Editorial section header: a wide-tracked eyebrow over a large display title,
 * with an optional standfirst. Left-aligned by default — premium reads calmer
 * ragged-left than centered.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "dark",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "dark" | "light"; // text tone: dark = on light bg
  className?: string;
}) {
  const isLight = tone === "light";
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "flex items-center gap-3",
            align === "center" && "justify-center"
          )}
        >
          <span className="bg-brass h-px w-8" />
          <span
            className={cn(
              "eyebrow",
              isLight ? "text-brass-soft" : "text-brass"
            )}
          >
            {eyebrow}
          </span>
        </div>
      )}
      <h2
        className={cn(
          "mt-5 text-[clamp(2rem,4.5vw,3.4rem)]",
          isLight ? "text-ivory" : "text-ink"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed",
            isLight ? "text-ivory-dim" : "text-muted"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

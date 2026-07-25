import { cn } from "@/lib/cn";

/**
 * Typographic wordmark: a refined Cormorant Garamond "Thairapy" with a wide-tracked
 * "MASSAGE" beneath. Swap for the real lotus logo asset when supplied.
 */
export function Logo({
  className,
  tone = "default",
}: {
  className?: string;
  tone?: "default" | "light";
}) {
  return (
    <span
      className={cn(
        "flex flex-col leading-none select-none",
        tone === "light" ? "text-ivory" : "text-ink",
        className
      )}
    >
      <span className="font-display text-[1.45rem] font-medium tracking-[0.02em]">
        Thairapy
      </span>
      <span
        className={cn(
          "mt-1 text-[0.55rem] font-semibold tracking-[0.5em]",
          tone === "light" ? "text-brass-soft" : "text-brass"
        )}
      >
        MASSAGE
      </span>
    </span>
  );
}

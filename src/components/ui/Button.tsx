import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "onDark";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-full font-sans font-semibold uppercase tracking-[0.14em] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-55 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  // Ink → brass on hover reads as quiet luxury.
  primary: "bg-ink text-canvas hover:bg-brass hover:text-noir",
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink/[0.04]",
  onDark: "bg-ivory text-noir hover:bg-brass hover:text-noir",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-[0.7rem]",
  lg: "px-8 py-4 text-xs",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: CommonProps & ComponentProps<"button">) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: CommonProps & ComponentProps<"a">) {
  return (
    <a
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}

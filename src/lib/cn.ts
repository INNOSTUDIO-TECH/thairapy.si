/** Tiny className combiner — filters falsy values and joins with spaces. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

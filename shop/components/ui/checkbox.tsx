"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "@/lib/utils";

type Variant = "light" | "dark";

type Props = Omit<
  React.ComponentProps<typeof CheckboxPrimitive.Root>,
  "className"
> & {
  className?: string;
  variant?: Variant;
};

const root: Record<Variant, string> = {
  light: cn(
    "flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-[var(--border)] bg-white",
    "data-[state=checked]:border-[var(--olive-deep)] data-[state=checked]:bg-[var(--olive-deep)] data-[state=checked]:text-white",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper)]",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ),
  dark: cn(
    "flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-white/25 bg-black/40",
    "data-[state=checked]:border-[var(--admin-accent)] data-[state=checked]:bg-[var(--admin-accent)] data-[state=checked]:text-black",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--admin-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--admin-surface)]",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ),
};

const CheckIcon = () => (
  <svg
    className="h-3 w-3"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={3}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export function Checkbox({
  className,
  variant = "light",
  ...props
}: Props) {
  return (
    <CheckboxPrimitive.Root className={cn(root[variant], className)} {...props}>
      <CheckboxPrimitive.Indicator className="text-current">
        <CheckIcon />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

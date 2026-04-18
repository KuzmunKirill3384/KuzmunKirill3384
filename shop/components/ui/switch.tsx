"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

type Variant = "light" | "dark";

type Props = Omit<
  React.ComponentProps<typeof SwitchPrimitive.Root>,
  "className"
> & {
  id?: string;
  className?: string;
  variant?: Variant;
};

const track: Record<Variant, string> = {
  light: cn(
    "inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full border border-[var(--border)] bg-[var(--paper-muted)] transition-colors duration-200 ease-out",
    "data-[state=checked]:border-[var(--olive-deep)] data-[state=checked]:bg-[var(--olive-deep)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper)]",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ),
  dark: cn(
    "inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full border border-white/20 bg-white/10 transition-colors duration-200 ease-out",
    "data-[state=checked]:border-[var(--admin-accent)] data-[state=checked]:bg-[var(--admin-accent)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--admin-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--admin-surface)]",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ),
};

const thumb: Record<Variant, string> = {
  light:
    "pointer-events-none block h-5 w-5 translate-x-0.5 rounded-full bg-white shadow-sm ring-0 transition-transform duration-200 ease-out will-change-transform data-[state=checked]:translate-x-[18px]",
  dark: "pointer-events-none block h-5 w-5 translate-x-0.5 rounded-full bg-white shadow-sm transition-transform duration-200 ease-out will-change-transform data-[state=checked]:translate-x-[18px]",
};

export function Switch({ id, className, variant = "dark", ...props }: Props) {
  return (
    <SwitchPrimitive.Root
      id={id}
      className={cn(track[variant], className)}
      {...props}
    >
      <SwitchPrimitive.Thumb className={thumb[variant]} />
    </SwitchPrimitive.Root>
  );
}

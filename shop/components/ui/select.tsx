"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "@/lib/utils";

export const SELECT_SENTINEL_ALL = "__filter_all__";

const Chevron = () => (
  <SelectPrimitive.Icon aria-hidden>
    <svg
      className="h-4 w-4 shrink-0 opacity-50"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </SelectPrimitive.Icon>
);

export type UiSelectOption = { value: string; label: string };

type Variant = "light" | "dark";

type Props = {
  id?: string;
  value: string;
  onValueChange: (value: string) => void;
  options: UiSelectOption[];
  placeholder?: string;
  disabled?: boolean;
  variant?: Variant;
  "aria-busy"?: boolean;
};

const triggerVariants: Record<
  Variant,
  string
> = {
  light: cn(
    "flex h-11 w-full min-w-0 items-center justify-between gap-2 border border-[var(--border)] bg-white px-3 text-left text-[13px] text-[var(--ink)] outline-none transition-[border-color,box-shadow] duration-200 ease-out",
    "focus-visible:ring-2 focus-visible:ring-[var(--ring-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper)]",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
    "data-[placeholder]:text-[var(--muted)]",
  ),
  dark: cn(
    "flex h-11 w-full min-w-0 items-center justify-between gap-2 border border-[var(--admin-border)] bg-black/50 px-3 text-left text-sm text-white outline-none transition-[border-color,box-shadow] duration-200 ease-out",
    "focus-visible:ring-2 focus-visible:ring-[var(--admin-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--admin-surface)]",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
    "data-[placeholder]:text-white/45",
  ),
};

const contentVariants: Record<Variant, string> = {
  light:
    "z-[100] max-h-[min(320px,70vh)] overflow-hidden border border-[var(--border)] bg-white shadow-lg",
  dark: "z-[100] max-h-[min(320px,70vh)] overflow-hidden border border-[var(--admin-border)] bg-[#171717] shadow-lg",
};

const itemVariants: Record<Variant, string> = {
  light:
    "relative flex cursor-pointer select-none items-center py-2.5 pl-3 pr-8 text-[13px] text-[var(--ink)] outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[highlighted]:bg-[var(--paper-muted)] data-[state=checked]:font-medium",
  dark:
    "relative flex cursor-pointer select-none items-center py-2.5 pl-3 pr-8 text-sm text-white outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[highlighted]:bg-white/10 data-[state=checked]:font-medium",
};

function toRadixValue(v: string) {
  return v === "" ? SELECT_SENTINEL_ALL : v;
}

function fromRadixValue(v: string) {
  return v === SELECT_SENTINEL_ALL ? "" : v;
}

export function Select({
  id,
  value,
  onValueChange,
  options,
  placeholder = "Выберите",
  disabled,
  variant = "light",
  "aria-busy": ariaBusy,
}: Props) {
  return (
    <SelectPrimitive.Root
      value={toRadixValue(value)}
      onValueChange={(v) => onValueChange(fromRadixValue(v))}
      disabled={disabled}
    >
      <SelectPrimitive.Trigger
        id={id}
        aria-busy={ariaBusy}
        className={triggerVariants[variant]}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <Chevron />
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={4}
          className={contentVariants[variant]}
        >
          <SelectPrimitive.Viewport className="p-1">
            {options.map((opt) => {
              const rv = toRadixValue(opt.value);
              return (
                <SelectPrimitive.Item
                  key={rv}
                  value={rv}
                  className={itemVariants[variant]}
                >
                  <SelectPrimitive.ItemText>{opt.label}</SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              );
            })}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}

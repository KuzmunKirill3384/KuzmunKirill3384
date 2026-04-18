"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import {
  catalogQueryFromUrlSearchParams,
  CLOTHING_INT_SIZES,
  mergeCatalogQuery,
  toCatalogHref,
} from "@/lib/catalog-filters";

type Props = {
  /** Размеры, реально встречающиеся в текущем facet pool */
  availableSizes: string[];
};

export function CatalogSizeChips({ availableSizes }: Props) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? "";
  const currentSize = searchParams.get("size") ?? "";

  const chips = useMemo(() => {
    const avail = new Set(availableSizes.map((s) => s.trim().toUpperCase()));
    return CLOTHING_INT_SIZES.filter((s) => avail.has(s));
  }, [availableSizes]);

  if (category !== "clothing" || chips.length === 0) return null;

  return (
    <div className="space-y-2">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
        Размер (быстрый выбор)
      </p>
      <div className="flex flex-wrap gap-2">
        {chips.map((s) => {
          const base = catalogQueryFromUrlSearchParams(searchParams);
          const active = currentSize.toUpperCase() === s;
          const href = toCatalogHref(
            mergeCatalogQuery(base, { size: active ? null : s }),
          );
          return (
            <Link
              key={s}
              href={href}
              scroll={false}
              className={`inline-flex min-h-9 min-w-[2.5rem] items-center justify-center border px-2.5 text-[12px] font-medium tabular-nums transition-colors ${
                active
                  ? "border-[var(--ink)] bg-[var(--ink)] text-white"
                  : "border-[var(--border)] text-[var(--ink)] hover:border-[var(--olive-deep)]"
              }`}
            >
              {s}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

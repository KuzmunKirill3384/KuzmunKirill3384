"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useTransition } from "react";
import { CatalogSizeChips } from "@/components/catalog-size-chips";
import { ColorSwatches } from "@/components/catalog/color-swatches";
import { Field } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { Select } from "@/components/ui/select";
import { categoryLabel, seasonLabelRu } from "@/lib/format";
import { STYLE_LABEL } from "@/lib/catalog-filters";
import type { FilterPanelUi } from "@/lib/catalog-filters";
import type { ProductCategory, ProductSeason, ProductStyle } from "@/lib/types";

export const CATALOG_QUERY_KEYS = [
  "category",
  "brand",
  "size",
  "season",
  "q",
  "priceMin",
  "priceMax",
  "color",
  "material",
  "tag",
  "page",
  "sale",
  "bestseller",
  "pick",
  "novelty",
  "sort",
] as const;

function AccordionSection({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details
      className="group border-b border-[var(--border)] pb-4 last:border-b-0"
      open={defaultOpen}
    >
      <summary className="flex cursor-pointer items-center justify-between py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)] transition-colors hover:text-[var(--ink)]">
        {title}
        <span
          aria-hidden="true"
          className="text-[var(--muted)] transition-transform group-open:rotate-180"
        >
          ▾
        </span>
      </summary>
      <div className="space-y-4 pt-3">{children}</div>
    </details>
  );
}

const URL_KEYS = CATALOG_QUERY_KEYS;

type Props = {
  brands: string[];
  categoryOptions: ProductCategory[];
  sizes: string[];
  seasons: ProductSeason[];
  colors: string[];
  materials: string[];
  tags: ProductStyle[];
  ui: FilterPanelUi;
};

export function CatalogFilterControls({
  brands,
  categoryOptions,
  sizes,
  seasons,
  colors,
  materials,
  tags,
  ui,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  const current = useMemo(() => {
    const o: Record<string, string> = {};
    URL_KEYS.forEach((k) => {
      const v = searchParams.get(k);
      if (v) o[k] = v;
    });
    return o;
  }, [searchParams]);

  const push = useCallback(
    (patch: Partial<Record<(typeof URL_KEYS)[number], string | null>>) => {
      const p = new URLSearchParams(searchParams.toString());
      (Object.keys(patch) as (typeof URL_KEYS)[number][]).forEach((key) => {
        if (!(key in patch)) return;
        const v = patch[key];
        if (v === null || v === undefined || v === "") p.delete(key);
        else p.set(key, v);
      });
      if (Object.keys(patch).some((k) => k !== "page")) {
        p.delete("page");
      }
      const qs = p.toString();
      startTransition(() => {
        router.push(qs ? `/catalog?${qs}` : "/catalog");
      });
    },
    [router, searchParams],
  );

  const brandOptions = useMemo(
    () => [
      { value: "", label: "Все бренды" },
      ...brands.map((b) => ({ value: b, label: b })),
    ],
    [brands],
  );

  const categorySelectOptions = useMemo(
    () => [
      { value: "", label: "Любой тип" },
      ...categoryOptions.map((c) => ({
        value: c,
        label: categoryLabel[c] ?? c,
      })),
    ],
    [categoryOptions],
  );

  const sizeOptions = useMemo(
    () => [
      { value: "", label: "Любой размер" },
      ...sizes.map((s) => ({ value: s, label: s })),
    ],
    [sizes],
  );

  const seasonOptions = useMemo(
    () => [
      { value: "", label: "Любой сезон" },
      ...seasons.map((s) => ({
        value: s,
        label: seasonLabelRu(s),
      })),
    ],
    [seasons],
  );

  const colorOptions = useMemo(
    () => [
      { value: "", label: "Все цвета" },
      ...colors.map((c) => ({ value: c, label: c })),
    ],
    [colors],
  );

  const materialOptions = useMemo(
    () => [
      { value: "", label: "Любой материал" },
      ...materials.map((m) => ({ value: m, label: m })),
    ],
    [materials],
  );

  const tagOptions = useMemo(
    () => [
      { value: "", label: "Любой стиль" },
      ...tags.map((t) => ({ value: t, label: STYLE_LABEL[t] ?? t })),
    ],
    [tags],
  );

  const category = searchParams.get("category") ?? "";
  const showColor = colors.length > 0;

  const flagRow = (
    <AccordionSection title="Подборки">
      <div className="space-y-3">
        <label className="flex cursor-pointer items-center gap-3 text-sm text-[var(--ink)]">
          <Checkbox
            checked={current.sale === "1"}
            onCheckedChange={(c) =>
              push({ sale: c === true ? "1" : null })
            }
            disabled={pending}
            variant="light"
          />
          <span>Со скидкой</span>
        </label>
        <label className="flex cursor-pointer items-center gap-3 text-sm text-[var(--ink)]">
          <Checkbox
            checked={current.bestseller === "1"}
            onCheckedChange={(c) =>
              push({ bestseller: c === true ? "1" : null })
            }
            disabled={pending}
            variant="light"
          />
          <span>Хит продаж</span>
        </label>
        <label className="flex cursor-pointer items-center gap-3 text-sm text-[var(--ink)]">
          <Checkbox
            checked={current.pick === "1"}
            onCheckedChange={(c) =>
              push({ pick: c === true ? "1" : null })
            }
            disabled={pending}
            variant="light"
          />
          <span>Наш выбор</span>
        </label>
        <label className="flex cursor-pointer items-center gap-3 text-sm text-[var(--ink)]">
          <Checkbox
            checked={current.novelty === "1"}
            onCheckedChange={(c) =>
              push({ novelty: c === true ? "1" : null })
            }
            disabled={pending}
            variant="light"
          />
          <span>Новинка</span>
        </label>
      </div>
    </AccordionSection>
  );

  return (
    <div
      className={`space-y-3 ${pending ? "pointer-events-none opacity-60" : ""}`}
      aria-busy={pending || undefined}
    >
      <AccordionSection title="Каталог">
        <Field id="filter-brand" label="Бренд">
          <Select
            id="filter-brand"
            value={current.brand ?? ""}
            onValueChange={(v) => {
              push({
                brand: v || null,
                category: null,
                size: null,
                season: null,
                color: null,
                material: null,
              });
            }}
            options={brandOptions}
            placeholder="Все бренды"
            disabled={pending}
            variant="light"
            aria-busy={pending}
          />
        </Field>

        <Field id="filter-category" label="Тип товара">
          <Select
            id="filter-category"
            value={current.category ?? ""}
            onValueChange={(v) => {
              push({
                category: v || null,
                size: null,
                season: null,
                color: null,
                material: null,
              });
            }}
            options={categorySelectOptions}
            placeholder="Любой тип"
            disabled={pending || categoryOptions.length === 0}
            variant="light"
            aria-busy={pending}
          />
        </Field>

        {current.brand && categoryOptions.length === 0 ? (
          <p className="text-[11px] text-[var(--muted)]">
            Нет товаров этого бренда в каталоге.
          </p>
        ) : null}
      </AccordionSection>

      {showColor ? (
        <AccordionSection title="Цвет">
          <ColorSwatches
            colors={colors}
            selected={current.color ?? undefined}
            onSelect={(value) => push({ color: value })}
            disabled={pending}
          />
          <Field id="filter-color" label="Другой оттенок">
            <Select
              id="filter-color"
              value={current.color ?? ""}
              onValueChange={(v) => push({ color: v || null })}
              options={colorOptions}
              placeholder="Все цвета"
              disabled={pending}
              variant="light"
              aria-busy={pending}
            />
          </Field>
        </AccordionSection>
      ) : null}

      <AccordionSection title={ui.sizeLabel}>
        {ui.sizeHint && category === "clothing" ? (
          <p className="text-[11px] leading-relaxed text-[var(--muted)]">
            {ui.sizeHint}
          </p>
        ) : null}

        {category === "clothing" ? (
          <CatalogSizeChips availableSizes={sizes} />
        ) : null}

        <Field id="filter-size" label="Все размеры">
          <Select
            id="filter-size"
            value={current.size ?? ""}
            onValueChange={(v) => push({ size: v || null })}
            options={sizeOptions}
            placeholder="Любой размер"
            disabled={pending}
            variant="light"
            aria-busy={pending}
          />
        </Field>
      </AccordionSection>

      {ui.showSeason && seasons.length > 0 && (
        <AccordionSection title={ui.seasonLabel} defaultOpen={false}>
          <Field id="filter-season" label="Сезон">
            <Select
              id="filter-season"
              value={current.season ?? ""}
              onValueChange={(v) => push({ season: v || null })}
              options={seasonOptions}
              placeholder="Любой сезон"
              disabled={pending}
              variant="light"
              aria-busy={pending}
            />
          </Field>
        </AccordionSection>
      )}

      {(materials.length > 0 || tags.length > 0) && (
        <AccordionSection title="Материал и стиль" defaultOpen={false}>
          {materials.length > 0 ? (
            <Field id="filter-material" label="Материал">
              <Select
                id="filter-material"
                value={current.material ?? ""}
                onValueChange={(v) => push({ material: v || null })}
                options={materialOptions}
                placeholder="Любой материал"
                disabled={pending}
                variant="light"
                aria-busy={pending}
              />
            </Field>
          ) : null}
          {tags.length > 0 ? (
            <Field id="filter-tag" label="Стиль">
              <Select
                id="filter-tag"
                value={current.tag ?? ""}
                onValueChange={(v) => push({ tag: v || null })}
                options={tagOptions}
                placeholder="Любой стиль"
                disabled={pending}
                variant="light"
                aria-busy={pending}
              />
            </Field>
          ) : null}
        </AccordionSection>
      )}

      <AccordionSection title="Цена, ₽">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field id="filter-pmin" label="От, ₽">
            <input
              key={`pmin-${current.priceMin ?? ""}`}
              id="filter-pmin"
              type="number"
              min={0}
              step={500}
              defaultValue={current.priceMin ?? ""}
              placeholder="—"
              className="h-11 w-full border border-[var(--border)] bg-white px-3 text-sm text-[var(--ink)] outline-none transition-[border-color,box-shadow] duration-200 focus:border-[var(--olive-deep)] focus:ring-2 focus:ring-[var(--ring-focus)] focus:ring-offset-2"
              onBlur={(e) => {
                const v = e.target.value.trim();
                push({ priceMin: v || null });
              }}
            />
          </Field>
          <Field id="filter-pmax" label="До, ₽">
            <input
              key={`pmax-${current.priceMax ?? ""}`}
              id="filter-pmax"
              type="number"
              min={0}
              step={500}
              defaultValue={current.priceMax ?? ""}
              placeholder="—"
              className="h-11 w-full border border-[var(--border)] bg-white px-3 text-sm text-[var(--ink)] outline-none transition-[border-color,box-shadow] duration-200 focus:border-[var(--olive-deep)] focus:ring-2 focus:ring-[var(--ring-focus)] focus:ring-offset-2"
              onBlur={(e) => {
                const v = e.target.value.trim();
                push({ priceMax: v || null });
              }}
            />
          </Field>
        </div>
      </AccordionSection>

      {flagRow}
    </div>
  );
}

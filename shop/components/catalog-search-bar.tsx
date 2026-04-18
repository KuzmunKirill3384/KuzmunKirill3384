"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export function CatalogSearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  const qParam = searchParams.get("q") ?? "";
  const [value, setValue] = useState(qParam);

  useEffect(() => {
    setValue(qParam);
  }, [qParam]);

  function apply(next: string) {
    const p = new URLSearchParams(searchParams.toString());
    const t = next.trim();
    if (t) p.set("q", t.slice(0, 200));
    else p.delete("q");
    p.delete("page");
    const qs = p.toString();
    startTransition(() => {
      router.push(qs ? `/catalog?${qs}` : "/catalog");
    });
  }

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        apply(value);
      }}
      className={`flex flex-col gap-2 sm:flex-row sm:items-center ${pending ? "opacity-70" : ""}`}
    >
      <label htmlFor="catalog-q" className="sr-only">
        Поиск по каталогу
      </label>
      <input
        id="catalog-q"
        name="q"
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Название, бренд, описание…"
        autoComplete="off"
        className="min-h-11 w-full border border-[var(--border)] bg-white px-4 text-sm text-[var(--ink)] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[var(--muted)] focus:border-[var(--olive-deep)] focus:ring-2 focus:ring-[var(--ring-focus)] focus:ring-offset-2 focus:ring-offset-[var(--paper)]"
        disabled={pending}
        aria-busy={pending || undefined}
      />
      <div className="flex shrink-0 gap-2">
        <button
          type="submit"
          className="min-h-11 border border-[var(--ink)] bg-[var(--ink)] px-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-transparent hover:text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-focus)] focus-visible:ring-offset-2"
          disabled={pending}
        >
          Найти
        </button>
        {qParam ? (
          <button
            type="button"
            className="min-h-11 border border-[var(--border)] px-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)] transition-colors hover:border-[var(--ink)] hover:text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-focus)] focus-visible:ring-offset-2"
            disabled={pending}
            onClick={() => {
              setValue("");
              apply("");
            }}
          >
            Сбросить
          </button>
        ) : null}
      </div>
    </form>
  );
}

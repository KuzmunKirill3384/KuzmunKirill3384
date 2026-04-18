import Link from "next/link";
import {
  CATALOG_PAGE_SIZE,
  mergeCatalogQuery,
  toCatalogHref,
  type CatalogQuery,
} from "@/lib/catalog-filters";

type Props = {
  baseQuery: CatalogQuery;
  page: number;
  totalPages: number;
  total: number;
};

export function CatalogPagination({
  baseQuery,
  page,
  totalPages,
  total,
}: Props) {
  if (total === 0) return null;

  const from = (page - 1) * CATALOG_PAGE_SIZE + 1;
  const to = Math.min(page * CATALOG_PAGE_SIZE, total);

  const hrefFor = (p: number) =>
    toCatalogHref(
      mergeCatalogQuery(baseQuery, {
        page: p <= 1 ? null : String(p),
      }),
    );

  const window = 2;
  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= page - window && i <= page + window)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== -1) {
      pages.push(-1);
    }
  }

  return (
    <nav
      className="mt-10 flex flex-col gap-4 border-t border-[var(--border)] pt-8 md:flex-row md:items-center md:justify-between"
      aria-label="Страницы каталога"
    >
      <p className="text-center text-[13px] text-[var(--muted)] md:text-left">
        Показано{" "}
        <span className="tabular-nums text-[var(--ink)]">
          {from}–{to}
        </span>{" "}
        из{" "}
        <span className="tabular-nums text-[var(--ink)]">{total}</span>
      </p>

      {totalPages <= 1 ? null : (
        <div className="flex flex-wrap items-center justify-center gap-2 md:justify-end">
          <Link
            href={hrefFor(page - 1)}
            aria-disabled={page <= 1}
            className={`inline-flex min-h-12 min-w-[5.5rem] items-center justify-center border px-4 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors ${
              page <= 1
                ? "pointer-events-none border-[var(--border)] text-[var(--muted)] opacity-50"
                : "border-[var(--ink)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white"
            }`}
          >
            Назад
          </Link>

          <ul className="flex max-w-[min(100%,22rem)] flex-wrap justify-center gap-1 sm:max-w-none">
            {pages.map((p, idx) =>
              p === -1 ? (
                <li
                  key={`e-${idx}`}
                  className="flex min-h-12 min-w-8 items-center justify-center text-[var(--muted)]"
                  aria-hidden
                >
                  …
                </li>
              ) : (
                <li key={p}>
                  <Link
                    href={hrefFor(p)}
                    className={`inline-flex min-h-12 min-w-12 items-center justify-center border text-[12px] font-semibold tabular-nums transition-colors ${
                      p === page
                        ? "border-[var(--ink)] bg-[var(--ink)] text-white"
                        : "border-[var(--border)] text-[var(--ink)] hover:border-[var(--ink)]"
                    }`}
                    aria-current={p === page ? "page" : undefined}
                  >
                    {p}
                  </Link>
                </li>
              ),
            )}
          </ul>

          <Link
            href={hrefFor(page + 1)}
            aria-disabled={page >= totalPages}
            className={`inline-flex min-h-12 min-w-[5.5rem] items-center justify-center border px-4 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors ${
              page >= totalPages
                ? "pointer-events-none border-[var(--border)] text-[var(--muted)] opacity-50"
                : "border-[var(--ink)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white"
            }`}
          >
            Далее
          </Link>
        </div>
      )}
    </nav>
  );
}

import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatRub } from "@/lib/format";
import { productGalleryUrlsDisplay } from "@/lib/product-images";
import { WishlistHeart } from "@/components/product-card/wishlist-heart";
import { ProductCardMedia } from "@/components/product-card/product-card-media";

type Props = { product: Product; density?: "comfortable" | "compact" };

export function ProductCard({ product, density = "comfortable" }: Props) {
  const gallery = productGalleryUrlsDisplay(product);
  const cover = gallery[0] ?? product.imageUrl;
  const hover = gallery[1] ?? cover;
  const sale =
    product.previousPriceRub != null &&
    product.previousPriceRub > product.priceRub;
  const discount = sale
    ? Math.max(
        1,
        Math.round(
          ((product.previousPriceRub! - product.priceRub) /
            product.previousPriceRub!) *
            100,
        ),
      )
    : 0;

  const sizesToShow = product.sizes.slice(0, density === "compact" ? 4 : 6);

  return (
    <article className="product-card-lift group relative flex flex-col border border-[var(--border)] bg-white shadow-sm transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-32px_rgba(0,0,0,0.18)]">
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-[3/4] overflow-hidden bg-[var(--paper-muted)]"
        aria-label={`${product.brand} — ${product.name}`}
      >
        <ProductCardMedia cover={cover} hover={hover} alt={product.name} />

        <div className="pointer-events-none absolute inset-x-0 top-0 flex flex-wrap gap-2 p-3">
          {product.isNew && (
            <span className="bg-[var(--ink)] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
              New
            </span>
          )}
          {sale && (
            <span className="bg-[var(--accent)] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
              −{discount}%
            </span>
          )}
          {product.isOurPick && !sale && (
            <span className="border border-white/80 bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--ink)]">
              Наш выбор
            </span>
          )}
        </div>
      </Link>

      <div className="pointer-events-none absolute right-3 top-3 z-10">
        <WishlistHeart slug={product.slug} />
      </div>

      <div
        className={`flex flex-1 flex-col gap-3 ${
          density === "compact" ? "p-3" : "p-5"
        }`}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
          {product.brand}
        </p>
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-[family-name:var(--font-display)] text-lg font-medium leading-snug tracking-[0.02em] text-[var(--ink)] transition-colors group-hover:text-[var(--accent)]">
            {product.name}
          </h3>
        </Link>
        <p className="text-[10px] tabular-nums tracking-[0.08em] text-[var(--muted)]/70">
          Арт. {product.slug}
        </p>

        {sizesToShow.length > 0 && (
          <ul className="flex flex-wrap gap-1.5" aria-label="Доступные размеры">
            {sizesToShow.map((s) => (
              <li
                key={s}
                className="min-w-8 rounded-sm border border-[var(--border)] px-1.5 py-0.5 text-center text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--ink)]/80"
              >
                {s}
              </li>
            ))}
            {product.sizes.length > sizesToShow.length && (
              <li className="text-[10px] uppercase tracking-[0.1em] text-[var(--muted)]">
                +{product.sizes.length - sizesToShow.length}
              </li>
            )}
          </ul>
        )}

        <div className="mt-auto flex flex-wrap items-baseline gap-2 border-t border-[var(--border)] pt-4">
          {sale && (
            <span className="text-sm text-[var(--muted)] line-through">
              {formatRub(product.previousPriceRub!)}
            </span>
          )}
          <span className="text-[13px] font-semibold tabular-nums text-[var(--ink)] min-[400px]:text-base">
            {formatRub(product.priceRub)}
          </span>
        </div>
      </div>
    </article>
  );
}

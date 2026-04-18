"use client";

import Image from "next/image";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import {
  cartTotalRub,
  getServerCartSnapshot,
  readCart,
  removeLine,
  setLineQty,
  subscribeCart,
} from "@/components/cart/cart-storage";
import type { CartLine } from "@/components/cart/cart-storage";
import { formatRub } from "@/lib/format";
import { cn } from "@/lib/utils";
import { isPlaceholderUrl } from "@/lib/product-images";

function CartLineRow({ line }: { line: CartLine }) {
  return (
    <li className="flex gap-4 border-b border-[var(--border)] py-6 last:border-0">
      <div className="relative h-28 w-20 shrink-0 overflow-hidden border border-[var(--border)] bg-[var(--paper-muted)]">
        {line.imageUrl && !isPlaceholderUrl(line.imageUrl) ? (
          <Image
            src={line.imageUrl}
            alt=""
            fill
            className="object-cover"
            sizes="80px"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[10px] text-[var(--muted)]">
            Фото
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <Link
          href={`/product/${line.slug}`}
          className="font-medium text-[var(--ink)] hover:underline"
        >
          {line.name}
        </Link>
        <p className="mt-1 text-xs text-[var(--muted)]">
          {line.brand} · {line.size}
        </p>
        <p className="mt-2 text-sm tabular-nums text-[var(--ink)]">
          {formatRub(line.priceRub)}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 border border-[var(--border)]">
            <button
              type="button"
              className="min-h-10 min-w-10 text-lg leading-none text-[var(--ink)] transition-colors hover:bg-[var(--paper-muted)]"
              aria-label="Уменьшить количество"
              onClick={() => setLineQty(line.lineId, line.qty - 1)}
            >
              −
            </button>
            <span className="min-w-[2rem] text-center text-sm tabular-nums">
              {line.qty}
            </span>
            <button
              type="button"
              className="min-h-10 min-w-10 text-lg leading-none text-[var(--ink)] transition-colors hover:bg-[var(--paper-muted)]"
              aria-label="Увеличить количество"
              onClick={() => setLineQty(line.lineId, line.qty + 1)}
            >
              +
            </button>
          </div>
          <button
            type="button"
            className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)] underline-offset-2 hover:text-[var(--ink)] hover:underline"
            onClick={() => removeLine(line.lineId)}
          >
            Удалить
          </button>
        </div>
      </div>
      <div className="shrink-0 text-right">
        <p className="text-sm font-medium tabular-nums text-[var(--ink)]">
          {formatRub(line.priceRub * line.qty)}
        </p>
      </div>
    </li>
  );
}

export function CartPageClient() {
  const state = useSyncExternalStore(
    subscribeCart,
    readCart,
    getServerCartSnapshot,
  );
  const empty = state.lines.length === 0;
  const total = cartTotalRub(state);

  return (
    <div>
      {empty ? (
        <div className="border border-[var(--border)] bg-white p-10 text-center shadow-sm">
          <p className="text-sm text-[var(--muted)]">В корзине пока пусто.</p>
          <Link
            href="/catalog"
            className={cn(
              "mt-6 inline-flex min-h-12 items-center justify-center border border-[var(--ink)] bg-[var(--ink)] px-8 text-[12px] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-transparent hover:text-[var(--ink)]",
            )}
          >
            В каталог
          </Link>
        </div>
      ) : (
        <>
          <ul>
            {state.lines.map((line) => (
              <CartLineRow key={line.lineId} line={line} />
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-6 border-t border-[var(--border)] pt-8 md:flex-row md:items-end md:justify-between">
            <p className="font-[family-name:var(--font-display)] text-2xl tabular-nums text-[var(--ink)]">
              Итого: {formatRub(total)}
            </p>
            <Link
              href="/checkout"
              className="inline-flex min-h-12 items-center justify-center border border-[var(--ink)] bg-[var(--ink)] px-10 text-[12px] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-transparent hover:text-[var(--ink)]"
            >
              Оформить заказ
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

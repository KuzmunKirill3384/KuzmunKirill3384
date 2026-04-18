"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import {
  readWishlistSlugs,
  WISHLIST_CHANGE_EVENT,
} from "@/components/account/wishlist-storage";

function subscribe(onChange: () => void) {
  const onStorage = () => onChange();
  const onCustom = () => onChange();
  window.addEventListener("storage", onStorage);
  window.addEventListener(WISHLIST_CHANGE_EVENT, onCustom);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(WISHLIST_CHANGE_EVENT, onCustom);
  };
}

export function WishlistPanel() {
  const slugs = useSyncExternalStore(
    subscribe,
    readWishlistSlugs,
    () => [],
  );

  if (slugs.length === 0) {
    return (
      <p className="text-sm text-[var(--muted)]">
        Добавляйте товары в избранное с карточки в каталоге — список хранится в
        браузере (демо).
      </p>
    );
  }

  return (
    <ul className="space-y-2 text-sm">
      {slugs.map((slug) => (
        <li key={slug}>
          <Link
            href={`/product/${slug}`}
            className="text-[var(--ink)] underline-offset-2 hover:underline"
          >
            {slug.replace(/-/g, " · ")}
          </Link>
        </li>
      ))}
    </ul>
  );
}

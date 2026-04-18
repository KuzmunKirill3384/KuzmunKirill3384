"use client";

import { useSyncExternalStore } from "react";
import {
  dispatchWishlistChange,
  readWishlistSlugs,
  WISHLIST_CHANGE_EVENT,
  WISHLIST_KEY,
} from "@/components/account/wishlist-storage";

type Props = { slug: string };

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

export function AddToWishlistButton({ slug }: Props) {
  const on = useSyncExternalStore(
    subscribe,
    () => readWishlistSlugs().includes(slug),
    () => false,
  );

  function toggle() {
    try {
      const raw = localStorage.getItem(WISHLIST_KEY);
      let list: string[] = raw ? (JSON.parse(raw) as string[]) : [];
      if (!Array.isArray(list)) list = [];
      if (list.includes(slug)) {
        list = list.filter((s) => s !== slug);
      } else {
        list = [...list, slug];
      }
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
      dispatchWishlistChange();
    } catch {
      /* ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={`border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors ${
        on
          ? "border-[var(--olive-deep)] bg-[var(--olive-soft)] text-[var(--olive-deep)]"
          : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--ink)] hover:text-[var(--ink)]"
      }`}
      aria-pressed={on}
    >
      {on ? "В избранном" : "В избранное"}
    </button>
  );
}

export const WISHLIST_KEY = "atrium_wishlist_slugs";

export const WISHLIST_CHANGE_EVENT = "atrium-wishlist-change";

const EMPTY_SLUGS: string[] = [];

let cachedRaw: string | null | undefined;
let cachedList: string[] = EMPTY_SLUGS;

function parseRaw(raw: string | null): string[] {
  if (raw === cachedRaw) {
    return cachedList;
  }
  cachedRaw = raw;
  if (!raw) {
    cachedList = EMPTY_SLUGS;
    return cachedList;
  }
  try {
    const parsed = JSON.parse(raw) as unknown;
    const list = Array.isArray(parsed)
      ? parsed.filter((x): x is string => typeof x === "string")
      : [];
    cachedList = list.length === 0 ? EMPTY_SLUGS : list;
    return cachedList;
  } catch {
    cachedList = EMPTY_SLUGS;
    return cachedList;
  }
}

export function readWishlistSlugs(): string[] {
  if (typeof window === "undefined") {
    return EMPTY_SLUGS;
  }
  try {
    return parseRaw(localStorage.getItem(WISHLIST_KEY));
  } catch {
    cachedRaw = undefined;
    cachedList = EMPTY_SLUGS;
    return EMPTY_SLUGS;
  }
}

export function dispatchWishlistChange(): void {
  if (typeof window === "undefined") return;
  cachedRaw = undefined;
  window.dispatchEvent(new Event(WISHLIST_CHANGE_EVENT));
}

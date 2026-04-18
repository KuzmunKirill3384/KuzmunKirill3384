export const CART_KEY = "atrium_cart_v1";

export const CART_CHANGE_EVENT = "atrium-cart-change";

export type CartLine = {
  lineId: string;
  slug: string;
  size: string;
  qty: number;
  name: string;
  brand: string;
  priceRub: number;
  imageUrl?: string;
};

export type CartState = {
  readonly lines: readonly CartLine[];
};

const EMPTY_LINES: readonly CartLine[] = [];
const EMPTY_CART: CartState = { lines: EMPTY_LINES };

let cachedRaw: string | null | undefined;
let cachedState: CartState = EMPTY_CART;

function isCartLine(x: unknown): x is CartLine {
  if (typeof x !== "object" || x === null) return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.lineId === "string" &&
    typeof o.slug === "string" &&
    typeof o.size === "string" &&
    typeof o.qty === "number" &&
    Number.isFinite(o.qty) &&
    o.qty > 0 &&
    typeof o.name === "string" &&
    typeof o.brand === "string" &&
    typeof o.priceRub === "number" &&
    Number.isFinite(o.priceRub) &&
    o.priceRub >= 0 &&
    (o.imageUrl === undefined || typeof o.imageUrl === "string")
  );
}

function normalizeLines(parsed: unknown): readonly CartLine[] {
  if (typeof parsed !== "object" || parsed === null) return EMPTY_LINES;
  const lines = (parsed as { lines?: unknown }).lines;
  if (!Array.isArray(lines)) return EMPTY_LINES;
  const out: CartLine[] = [];
  for (const item of lines) {
    if (!isCartLine(item)) continue;
    out.push({ ...item });
  }
  return out.length === 0 ? EMPTY_LINES : out;
}

export function readCart(): CartState {
  if (typeof window === "undefined") {
    return EMPTY_CART;
  }
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (raw === cachedRaw) {
      return cachedState;
    }
    cachedRaw = raw;
    if (!raw) {
      cachedState = EMPTY_CART;
      return cachedState;
    }
    const parsed = JSON.parse(raw) as unknown;
    const lines = normalizeLines(parsed);
    if (lines.length === 0) {
      cachedState = EMPTY_CART;
      return cachedState;
    }
    cachedState = { lines };
    return cachedState;
  } catch {
    cachedRaw = undefined;
    cachedState = EMPTY_CART;
    return EMPTY_CART;
  }
}

function persist(nextLines: readonly CartLine[]): void {
  if (typeof window === "undefined") return;
  const payload =
    nextLines.length === 0 ? "{}" : JSON.stringify({ lines: [...nextLines] });
  if (nextLines.length === 0) {
    localStorage.removeItem(CART_KEY);
  } else {
    localStorage.setItem(CART_KEY, payload);
  }
  cachedRaw = undefined;
  window.dispatchEvent(new Event(CART_CHANGE_EVENT));
}

export function makeLineId(slug: string, size: string): string {
  return `${slug}::${size}`;
}

export function addOrMergeLine(input: {
  slug: string;
  size: string;
  name: string;
  brand: string;
  priceRub: number;
  imageUrl?: string;
  qty?: number;
}): void {
  const addQty = Math.max(1, Math.floor(input.qty ?? 1));
  const lineId = makeLineId(input.slug, input.size);
  const current = readCart();
  const idx = current.lines.findIndex((l) => l.lineId === lineId);
  let next: CartLine[];
  if (idx >= 0) {
    next = current.lines.map((l, i) =>
      i === idx ? { ...l, qty: l.qty + addQty } : { ...l },
    );
  } else {
    next = [
      ...current.lines.map((l) => ({ ...l })),
      {
        lineId,
        slug: input.slug,
        size: input.size,
        qty: addQty,
        name: input.name,
        brand: input.brand,
        priceRub: input.priceRub,
        imageUrl: input.imageUrl,
      },
    ];
  }
  persist(next);
}

export function setLineQty(lineId: string, qty: number): void {
  const q = Math.floor(qty);
  if (q <= 0) {
    removeLine(lineId);
    return;
  }
  const current = readCart();
  const next = current.lines
    .map((l) => (l.lineId === lineId ? { ...l, qty: q } : { ...l }))
    .filter((l) => l.qty > 0);
  persist(next);
}

export function removeLine(lineId: string): void {
  const current = readCart();
  const next = current.lines.filter((l) => l.lineId !== lineId);
  persist(next);
}

export function clearCart(): void {
  persist([]);
}

export function subscribeCart(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }
  const handler = () => onStoreChange();
  window.addEventListener(CART_CHANGE_EVENT, handler);
  return () => window.removeEventListener(CART_CHANGE_EVENT, handler);
}

export function getServerCartSnapshot(): CartState {
  return EMPTY_CART;
}

export function cartTotalQty(state: CartState): number {
  return state.lines.reduce((s, l) => s + l.qty, 0);
}

export function cartTotalRub(state: CartState): number {
  return state.lines.reduce((s, l) => s + l.priceRub * l.qty, 0);
}

import type { Product, ProductCategory } from "@/lib/types";

const COMPLEMENT: Record<ProductCategory, ProductCategory[]> = {
  clothing: ["footwear", "accessories"],
  footwear: ["clothing", "accessories"],
  accessories: ["clothing", "footwear"],
  premium: ["accessories", "footwear"],
  outlet: ["accessories", "footwear"],
};

export function buildCompleteLook(
  product: Product,
  all: Product[],
): Product[] {
  const cats = COMPLEMENT[product.category] ?? [];
  const look: Product[] = [];
  const usedCats = new Set<ProductCategory>();

  for (const cat of cats) {
    if (usedCats.has(cat)) continue;
    const sameBrand = all.find(
      (p) =>
        p.id !== product.id &&
        p.category === cat &&
        p.brand === product.brand &&
        !look.some((l) => l.id === p.id),
    );
    const pick =
      sameBrand ??
      all.find(
        (p) =>
          p.id !== product.id &&
          p.category === cat &&
          !look.some((l) => l.id === p.id),
      );
    if (pick) {
      look.push(pick);
      usedCats.add(cat);
    }
    if (look.length >= 3) break;
  }
  return look;
}

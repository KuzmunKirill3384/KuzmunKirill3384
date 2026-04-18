import type { ProductSeason } from "@/lib/types";

export function formatRub(n: number): string {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(n);
}

export const categoryLabel: Record<string, string> = {
  clothing: "Одежда",
  footwear: "Обувь",
  accessories: "Аксессуары",
  premium: "Premium",
  outlet: "Outlet",
};

export function seasonLabelRu(s: ProductSeason): string {
  const labels: Record<ProductSeason, string> = {
    ss26: "SS 2026",
    fw25: "FW 2025/26",
    all: "Всесезонно",
  };
  return labels[s] ?? s;
}

import type { MetadataRoute } from "next";

const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LENINGRADEC — мультибрендовый магазин",
    short_name: "LENINGRADEC",
    description:
      "Курируемая селекция итальянских и европейских премиальных марок — одежда, обувь, аксессуары.",
    start_url: "/?source=pwa",
    scope: "/",
    display: "standalone",
    display_override: ["standalone", "minimal-ui", "browser"],
    background_color: "#f5f3ee",
    theme_color: "#1c1f1c",
    lang: "ru",
    dir: "ltr",
    orientation: "portrait-primary",
    categories: ["shopping", "lifestyle", "fashion"],
    prefer_related_applications: false,
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-192-maskable.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
    shortcuts: [
      {
        name: "Каталог",
        short_name: "Каталог",
        description: "Новые поступления и бестселлеры",
        url: "/catalog?source=pwa-shortcut",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "Корзина",
        short_name: "Корзина",
        description: "Завершить заказ",
        url: "/cart?source=pwa-shortcut",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "Личный кабинет",
        short_name: "Профиль",
        description: "Заказы и избранное",
        url: "/account?source=pwa-shortcut",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }],
      },
    ],
    screenshots: [
      {
        src: "/screenshots/home-wide.png",
        sizes: "1280x720",
        type: "image/png",
        form_factor: "wide",
        label: "Главная LENINGRADEC",
      },
      {
        src: "/screenshots/home-narrow.png",
        sizes: "720x1280",
        type: "image/png",
        form_factor: "narrow",
        label: "LENINGRADEC на смартфоне",
      },
    ],
    ...(base ? { id: `${base}/` } : { id: "/" }),
  };
}

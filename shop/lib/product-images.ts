import type { Product, ProductCategory } from "@/lib/types";
import { brandGlyph, brandVariant, hashString } from "@/lib/brand-visual";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function initials(brand: string, name: string): string {
  const raw = `${brand.slice(0, 2)}${name.slice(0, 1)}`
    .toUpperCase()
    .replace(/[^A-ZА-ЯЁ0-9]/gi, "");
  return raw.slice(0, 4) || "AT";
}

type Palette = {
  bgA: string;
  bgB: string;
  bgC: string;
  stroke: string;
  strokeSoft: string;
  accent: string;
};

const PALETTES: readonly Palette[] = [
  {
    bgA: "#f5f3ee",
    bgB: "#ebe7df",
    bgC: "#9a9e8a",
    stroke: "#4a4f3d",
    strokeSoft: "#9a9e8a",
    accent: "#1b1d16",
  },
  {
    bgA: "#efeae1",
    bgB: "#d8cfc0",
    bgC: "#8a7d64",
    stroke: "#362d20",
    strokeSoft: "#8a7d64",
    accent: "#1f1810",
  },
  {
    bgA: "#eceef2",
    bgB: "#c9cfd9",
    bgC: "#6e7a90",
    stroke: "#2a3140",
    strokeSoft: "#6e7a90",
    accent: "#141923",
  },
  {
    bgA: "#f2e8e4",
    bgB: "#e0c9bf",
    bgC: "#a8736a",
    stroke: "#5e2e2a",
    strokeSoft: "#a8736a",
    accent: "#2a120f",
  },
  {
    bgA: "#e8eee6",
    bgB: "#c7d3c0",
    bgC: "#7a9178",
    stroke: "#34483a",
    strokeSoft: "#7a9178",
    accent: "#121d14",
  },
  {
    bgA: "#ededed",
    bgB: "#d2d2d2",
    bgC: "#888888",
    stroke: "#2c2c2c",
    strokeSoft: "#888888",
    accent: "#0c0c0c",
  },
];

function paletteFor(brand: string): Palette {
  return PALETTES[brandVariant(brand)]!;
}

function categoryArt(
  category: ProductCategory,
  slug: string,
  frameIndex: number,
  palette: Palette,
): string {
  const h = hashString(`${slug}-${frameIndex}`);
  const v = h % 4;
  const { stroke, strokeSoft } = palette;

  switch (category) {
    case "footwear": {
      const paths = [
        `<path d="M180 760 L280 380 L520 380 L620 760 L580 820 L220 820 Z" fill="none" stroke="${stroke}" stroke-width="2.5" opacity="0.42"/>
         <path d="M240 760 Q400 640 560 760" fill="none" stroke="${strokeSoft}" stroke-width="1.5" opacity="0.35"/>`,
        `<ellipse cx="400" cy="680" rx="200" ry="72" fill="none" stroke="${stroke}" stroke-width="2.5" opacity="0.38"/>
         <path d="M220 680 L400 420 L580 680" fill="none" stroke="${strokeSoft}" stroke-width="2" opacity="0.32"/>`,
        `<path d="M260 800 L340 400 L460 400 L540 800" fill="none" stroke="${stroke}" stroke-width="2.5" opacity="0.4"/>
         <line x1="320" y1="620" x2="480" y2="620" stroke="${strokeSoft}" stroke-width="1.5" opacity="0.35"/>`,
        `<path d="M200 760 Q230 420 360 380 L520 360 Q620 440 620 760 Z" fill="none" stroke="${stroke}" stroke-width="2.5" opacity="0.4"/>
         <path d="M260 500 L560 500" stroke="${strokeSoft}" stroke-width="1.2" opacity="0.3" stroke-dasharray="4 6"/>`,
      ];
      return paths[v]!;
    }
    case "clothing": {
      const paths = [
        `<path d="M280 320 L400 260 L520 320 L500 780 L300 780 Z" fill="none" stroke="${stroke}" stroke-width="2.5" opacity="0.4"/>
         <path d="M340 320 Q400 280 460 320" fill="none" stroke="${strokeSoft}" stroke-width="1.5" opacity="0.35"/>`,
        `<path d="M250 360 L400 300 L550 360 L530 800 L270 800 Z" fill="none" stroke="${stroke}" stroke-width="2" opacity="0.38"/>
         <line x1="400" y1="300" x2="400" y2="240" stroke="${strokeSoft}" stroke-width="2" opacity="0.4"/>`,
        `<rect x="300" y="340" width="200" height="420" rx="8" fill="none" stroke="${stroke}" stroke-width="2" opacity="0.36"/>
         <path d="M320 340 L400 280 L480 340" fill="none" stroke="${strokeSoft}" stroke-width="1.5" opacity="0.38"/>`,
        `<path d="M280 320 L400 260 L520 320 L560 480 L520 800 L280 800 L240 480 Z" fill="none" stroke="${stroke}" stroke-width="2" opacity="0.38"/>
         <path d="M340 320 Q400 370 460 320" fill="none" stroke="${strokeSoft}" stroke-width="1.5" opacity="0.4"/>
         <line x1="400" y1="480" x2="400" y2="800" stroke="${strokeSoft}" stroke-width="1" opacity="0.25"/>`,
      ];
      return paths[v]!;
    }
    case "accessories": {
      const paths = [
        `<circle cx="400" cy="420" r="120" fill="none" stroke="${stroke}" stroke-width="2.5" opacity="0.4"/>
         <rect x="360" y="540" width="80" height="220" rx="12" fill="none" stroke="${strokeSoft}" stroke-width="2" opacity="0.35"/>`,
        `<ellipse cx="400" cy="500" rx="180" ry="100" fill="none" stroke="${stroke}" stroke-width="2" opacity="0.38"/>
         <path d="M220 500 L580 500" stroke="${strokeSoft}" stroke-width="1.5" opacity="0.4"/>`,
        `<circle cx="400" cy="480" r="90" fill="none" stroke="${stroke}" stroke-width="2.5" opacity="0.42"/>
         <path d="M310 480 L490 480 M400 390 L400 570" stroke="${strokeSoft}" stroke-width="1.5" opacity="0.35"/>`,
        `<rect x="280" y="360" width="240" height="280" rx="20" fill="none" stroke="${stroke}" stroke-width="2" opacity="0.4"/>
         <path d="M320 360 Q400 280 480 360" fill="none" stroke="${strokeSoft}" stroke-width="1.5" opacity="0.38"/>
         <line x1="320" y1="500" x2="480" y2="500" stroke="${strokeSoft}" stroke-width="1" opacity="0.3"/>`,
      ];
      return paths[v]!;
    }
    case "premium": {
      const paths = [
        `<rect x="200" y="280" width="400" height="520" fill="none" stroke="${stroke}" stroke-width="2" opacity="0.35"/>
         <path d="M200 280 L400 200 L600 280" fill="none" stroke="${strokeSoft}" stroke-width="1.5" opacity="0.4"/>
         <circle cx="400" cy="540" r="8" fill="${stroke}" opacity="0.25"/>`,
        `<path d="M220 760 L400 260 L580 760" fill="none" stroke="${stroke}" stroke-width="2" opacity="0.32"/>
         <rect x="260" y="400" width="280" height="320" fill="none" stroke="${strokeSoft}" stroke-width="1.5" opacity="0.3"/>`,
        `<circle cx="400" cy="520" r="200" fill="none" stroke="${stroke}" stroke-width="1.5" opacity="0.28"/>
         <rect x="320" y="360" width="160" height="320" fill="none" stroke="${strokeSoft}" stroke-width="2" opacity="0.32"/>`,
        `<path d="M250 260 Q400 200 550 260 L580 800 L220 800 Z" fill="none" stroke="${stroke}" stroke-width="2" opacity="0.35"/>
         <circle cx="400" cy="540" r="2.5" fill="${stroke}" opacity="0.35"/>
         <circle cx="400" cy="620" r="2.5" fill="${stroke}" opacity="0.35"/>
         <circle cx="400" cy="700" r="2.5" fill="${stroke}" opacity="0.35"/>`,
      ];
      return paths[v]!;
    }
    case "outlet": {
      const paths = [
        `<rect x="220" y="340" width="360" height="440" fill="none" stroke="${stroke}" stroke-width="2.5" stroke-dasharray="10 8" opacity="0.45"/>
         <path d="M260 380 L540 720 M540 380 L260 720" stroke="${strokeSoft}" stroke-width="1.2" opacity="0.25"/>`,
        `<polygon points="400,300 620,780 180,780" fill="none" stroke="${stroke}" stroke-width="2" opacity="0.38"/>
         <text x="400" y="640" text-anchor="middle" font-size="22" fill="${stroke}" opacity="0.22" font-family="system-ui,sans-serif">%</text>`,
        `<path d="M200 400 H600 M200 600 H600 M200 800 H600" stroke="${strokeSoft}" stroke-width="1.5" opacity="0.3"/>
         <rect x="280" y="440" width="240" height="300" rx="4" fill="none" stroke="${stroke}" stroke-width="2" opacity="0.36"/>`,
        `<path d="M220 420 C220 360 260 340 320 340 L480 340 C540 340 580 360 580 420 L580 740 L220 740 Z" fill="none" stroke="${stroke}" stroke-width="2" opacity="0.4"/>
         <text x="400" y="600" text-anchor="middle" font-size="28" fill="${stroke}" opacity="0.25" font-family="system-ui,sans-serif">SALE</text>`,
      ];
      return paths[v]!;
    }
    default:
      return "";
  }
}

export function isPlaceholderUrl(url: string): boolean {
  const t = url.trim();
  return t.startsWith("placeholder:") || t === "";
}

function buildSvgDataUrl(
  product: Pick<Product, "brand" | "name" | "category" | "slug">,
  frameIndex: number,
): string {
  const palette = paletteFor(product.brand);
  const ini = escapeXml(initials(product.brand, product.name));
  const glyph = escapeXml(brandGlyph(product.brand));
  const art = categoryArt(product.category, product.slug, frameIndex, palette);
  const seed = hashString(product.slug);
  const g1 = (seed % 40) / 100;
  const g2 = 0.55 + ((seed >> 8) % 30) / 100;
  const patternRotate = (seed >> 12) % 180;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1067" viewBox="0 0 800 1067"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${palette.bgA}"/><stop offset="${50 + (frameIndex % 3) * 5}%" stop-color="${palette.bgB}"/><stop offset="100%" stop-color="${palette.bgC}" stop-opacity="${g2}"/></linearGradient><pattern id="pat" width="44" height="44" patternUnits="userSpaceOnUse" patternTransform="rotate(${patternRotate})"><path d="M0 22 L44 22" stroke="${palette.strokeSoft}" stroke-width="0.6" opacity="0.18"/></pattern><filter id="soft"><feGaussianBlur stdDeviation="2"/></filter></defs><rect width="100%" height="100%" fill="url(#bg)"/><rect width="100%" height="100%" fill="url(#pat)"/><g opacity="0.9">${art}</g><g opacity="0.85"><text x="50%" y="44%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui,Georgia,serif" font-size="86" fill="${palette.accent}" opacity="0.16">${glyph}</text><text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui,Georgia,serif" font-size="42" fill="${palette.stroke}" font-weight="600" opacity="${0.9 - g1 * 0.3}">${ini}</text></g></svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export function resolveImageUrl(
  url: string,
  product: Pick<Product, "brand" | "name" | "category" | "slug">,
  frameIndex = 0,
): string {
  const t = url.trim();
  if (!t || isPlaceholderUrl(t)) {
    return buildSvgDataUrl(product, frameIndex);
  }
  return t;
}

export function productGalleryUrls(product: Product): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const u of [product.imageUrl, ...(product.imageUrls ?? [])]) {
    const s = u.trim();
    if (!s || seen.has(s)) continue;
    seen.add(s);
    out.push(s);
  }
  return out;
}

export function productCoverUrl(product: Product): string {
  const raw = productGalleryUrls(product)[0] ?? product.imageUrl;
  return resolveImageUrl(raw, product, 0);
}

export function productGalleryUrlsDisplay(product: Product): string[] {
  return productGalleryUrls(product).map((u, i) =>
    resolveImageUrl(u, product, i),
  );
}

export type HeroKind = "boutique" | "premium";

export function heroIllustration(brand: string, kind: HeroKind): string {
  const palette = paletteFor(brand || "atrium");
  const glyph = escapeXml(brandGlyph(brand || "atrium"));
  const ini = escapeXml(
    brand
      ? brand
          .split(/\s+/)
          .map((p) => p[0])
          .join("")
          .slice(0, 3)
          .toUpperCase()
      : "ATR",
  );
  const seed = hashString(`${brand}-${kind}`);
  const angle = (seed >> 4) % 30;

  const frame =
    kind === "premium"
      ? `<rect x="180" y="200" width="1240" height="760" fill="none" stroke="${palette.stroke}" stroke-width="1.5" opacity="0.25"/>
         <path d="M180 580 L1420 580" stroke="${palette.strokeSoft}" stroke-width="0.8" opacity="0.25"/>
         <circle cx="800" cy="580" r="280" fill="none" stroke="${palette.stroke}" stroke-width="1" opacity="0.2"/>
         <circle cx="800" cy="580" r="160" fill="none" stroke="${palette.strokeSoft}" stroke-width="1" opacity="0.3"/>`
      : `<path d="M60 900 C 280 680 520 640 800 640 C 1080 640 1320 680 1540 900" fill="none" stroke="${palette.stroke}" stroke-width="1.5" opacity="0.3"/>
         <path d="M120 1000 L1480 1000" stroke="${palette.strokeSoft}" stroke-width="0.8" opacity="0.3"/>
         <rect x="440" y="340" width="720" height="500" fill="none" stroke="${palette.stroke}" stroke-width="1.2" opacity="0.22"/>
         <path d="M440 340 L800 200 L1160 340" fill="none" stroke="${palette.strokeSoft}" stroke-width="1" opacity="0.3"/>`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1200" viewBox="0 0 1600 1200"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${palette.bgA}"/><stop offset="55%" stop-color="${palette.bgB}"/><stop offset="100%" stop-color="${palette.bgC}" stop-opacity="0.85"/></linearGradient><pattern id="pat" width="80" height="80" patternUnits="userSpaceOnUse" patternTransform="rotate(${angle})"><path d="M0 40 L80 40" stroke="${palette.strokeSoft}" stroke-width="0.6" opacity="0.16"/></pattern></defs><rect width="100%" height="100%" fill="url(#bg)"/><rect width="100%" height="100%" fill="url(#pat)"/>${frame}<g><text x="800" y="520" text-anchor="middle" font-family="Georgia,serif" font-size="220" fill="${palette.accent}" opacity="0.12">${glyph}</text><text x="800" y="720" text-anchor="middle" font-family="Georgia,serif" font-size="72" fill="${palette.stroke}" font-weight="600" letter-spacing="8">${ini}</text><text x="800" y="790" text-anchor="middle" font-family="system-ui,sans-serif" font-size="18" fill="${palette.accent}" letter-spacing="6" opacity="0.5">${kind === "premium" ? "PREMIUM SELECTION" : "BOUTIQUE"}</text></g></svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

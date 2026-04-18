import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  cacheOnNavigation: true,
  reloadOnOnline: true,
  register: false,
  disable: process.env.NODE_ENV === "development",
  scope: "/",
  swUrl: "/sw.js",
  globPublicPatterns: [
    "icons/**/*",
    "fonts/**/*",
    "hero-boutique.svg",
    "manifest.webmanifest",
    "llms.txt",
    "humans.txt",
  ],
});

const baseConfig: NextConfig = {
  turbopack: {},
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },
  images: {
    deviceSizes: [320, 480, 640, 750, 828, 1080, 1200, 1600, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 600],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    formats: ["image/webp"],
  },
  async headers() {
    return [
      {
        source: "/sw.js",
        headers: [
          { key: "Service-Worker-Allowed", value: "/" },
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          { key: "Content-Type", value: "application/javascript; charset=utf-8" },
        ],
      },
      {
        source: "/manifest.webmanifest",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, must-revalidate" },
          { key: "Content-Type", value: "application/manifest+json; charset=utf-8" },
        ],
      },
      {
        source: "/offline",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
        ],
      },
    ];
  },
};

export default withSerwist(baseConfig);

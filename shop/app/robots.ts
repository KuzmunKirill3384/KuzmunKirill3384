import type { MetadataRoute } from "next";

const defaultBase = "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? defaultBase;
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}

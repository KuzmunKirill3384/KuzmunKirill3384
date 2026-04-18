import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ATTRIBUTION_COOKIE } from "@/lib/attribution-constants";

const MAX_AGE = 180 * 24 * 60 * 60;

export function proxy(request: NextRequest) {
  const res = NextResponse.next();
  if (request.cookies.get(ATTRIBUTION_COOKIE)?.value) {
    return res;
  }
  const url = request.nextUrl;
  const utm_source = url.searchParams.get("utm_source");
  const utm_medium = url.searchParams.get("utm_medium");
  const utm_campaign = url.searchParams.get("utm_campaign");
  const ref = url.searchParams.get("ref") ?? url.searchParams.get("referrer");
  const gclid = url.searchParams.get("gclid");
  if (!utm_source && !utm_medium && !utm_campaign && !ref && !gclid) {
    return res;
  }
  const payload = {
    ts: Date.now(),
    utm_source: utm_source ?? undefined,
    utm_medium: utm_medium ?? undefined,
    utm_campaign: utm_campaign ?? undefined,
    ref: ref ?? undefined,
    gclid: gclid ?? undefined,
    path: url.pathname,
  };
  res.cookies.set(ATTRIBUTION_COOKIE, JSON.stringify(payload), {
    path: "/",
    maxAge: MAX_AGE,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

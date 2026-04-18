import { NextResponse } from "next/server";
import { BUYER_SESSION_COOKIE } from "@/lib/buyer-auth";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(BUYER_SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return res;
}

import { NextResponse } from "next/server";
import {
  BUYER_SESSION_COOKIE,
  BUYER_SESSION_MAX_AGE,
  createBuyerSessionCookieValue,
} from "@/lib/buyer-auth";
import {
  getDemoBuyerEmail,
  getDemoBuyerPassword,
} from "@/lib/demo-config";

export async function POST(request: Request) {
  let email = "";
  let password = "";
  try {
    const j = (await request.json()) as { email?: string; password?: string };
    email = typeof j.email === "string" ? j.email.trim() : "";
    password = typeof j.password === "string" ? j.password : "";
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const expectedEmail = getDemoBuyerEmail().toLowerCase();
  const expectedPassword = getDemoBuyerPassword();
  if (
    email.toLowerCase() !== expectedEmail ||
    password !== expectedPassword
  ) {
    return NextResponse.json({ error: "Неверный email или пароль" }, { status: 401 });
  }
  let token: string;
  try {
    token = createBuyerSessionCookieValue(email);
  } catch {
    return NextResponse.json(
      {
        error:
          "Сервер не настроен: задайте ADMIN_SESSION_SECRET или BUYER_SESSION_SECRET (не короче 16 символов) в переменных окружения.",
      },
      { status: 503 },
    );
  }
  const res = NextResponse.json({ ok: true, email });
  res.cookies.set(BUYER_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: BUYER_SESSION_MAX_AGE,
  });
  return res;
}

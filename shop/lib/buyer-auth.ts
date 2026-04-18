import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE = "buyer_session";
const MAX_AGE_SEC = 60 * 60 * 24 * 14;

const DEV_FALLBACK_SECRET = "dev-buyer-secret-min-16-chars";

/** Секрет из env или dev-заглушка; для прод без env — null (сессии проверить нельзя). */
function getSecretForVerification(): string | null {
  const s = process.env.BUYER_SESSION_SECRET ?? process.env.ADMIN_SESSION_SECRET;
  if (s && s.length >= 16) return s;
  if (process.env.NODE_ENV === "development") return DEV_FALLBACK_SECRET;
  return null;
}

/** Секрет для выпуска cookie: в production обязателен настроенный env. */
function getSecretForSigning(): string {
  const s = process.env.BUYER_SESSION_SECRET ?? process.env.ADMIN_SESSION_SECRET;
  if (s && s.length >= 16) return s;
  if (process.env.NODE_ENV === "development") return DEV_FALLBACK_SECRET;
  throw new Error(
    "BUYER_SESSION_SECRET or ADMIN_SESSION_SECRET must be set (min 16 chars)",
  );
}

function signPayload(ts: number, email: string): string {
  const payload = `${ts}:${email}`;
  const secret = getSecretForSigning();
  const hmac = createHmac("sha256", secret)
    .update(payload)
    .digest("hex");
  return Buffer.from(`${payload}:${hmac}`, "utf8").toString("base64url");
}

export function verifyBuyerToken(token: string | undefined): string | null {
  if (!token) return null;
  const secret = getSecretForVerification();
  if (!secret) return null;
  try {
    const raw = Buffer.from(token, "base64url").toString("utf8");
    const parts = raw.split(":");
    if (parts.length !== 3) return null;
    const tsStr = parts[0];
    const email = parts[1];
    const sig = parts[2];
    const ts = Number(tsStr);
    if (!Number.isFinite(ts) || !email) return null;
    const age = Date.now() - ts;
    if (age < 0 || age > MAX_AGE_SEC * 1000) return null;
    const expected = createHmac("sha256", secret)
      .update(`${tsStr}:${email}`)
      .digest("hex");
    if (sig.length !== expected.length) return null;
    if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
    return email;
  } catch {
    return null;
  }
}

export async function getBuyerEmail(): Promise<string | null> {
  const jar = await cookies();
  return verifyBuyerToken(jar.get(COOKIE)?.value);
}

export function createBuyerSessionCookieValue(email: string): string {
  return signPayload(Date.now(), email);
}

export { COOKIE as BUYER_SESSION_COOKIE, MAX_AGE_SEC as BUYER_SESSION_MAX_AGE };

/** Публичные подсказки для демо (страница /site). Реальные секреты — только в env. */

export const DEMO_BUYER_EMAIL_DEFAULT = "demo@atrium.store";
export const DEMO_BUYER_PASSWORD_DEFAULT = "buyer";

export function getDemoBuyerEmail(): string {
  return process.env.DEMO_BUYER_EMAIL?.trim() || DEMO_BUYER_EMAIL_DEFAULT;
}

export function getDemoBuyerPassword(): string {
  return process.env.DEMO_BUYER_PASSWORD?.trim() || DEMO_BUYER_PASSWORD_DEFAULT;
}

export function getAdminPasswordHint(): string {
  return process.env.ADMIN_PASSWORD?.trim() || "admin";
}

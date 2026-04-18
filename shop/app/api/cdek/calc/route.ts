import { NextResponse } from "next/server";
import type { CdekCalcRequest, CdekCalcResponse } from "@/lib/cdek-types";

export async function POST(request: Request) {
  let body: Partial<CdekCalcRequest>;
  try {
    body = (await request.json()) as Partial<CdekCalcRequest>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const cityCode = Number(body.cityCode);
  const goodsSumKop = Number(body.goodsSumKop);
  if (!Number.isFinite(cityCode) || cityCode <= 0) {
    return NextResponse.json({ error: "cityCode required" }, { status: 400 });
  }
  const sumRub = Number.isFinite(goodsSumKop) ? Math.max(0, goodsSumKop) / 100 : 0;
  const base = 350 + Math.min(1200, Math.round(sumRub * 0.02));
  const spread = cityCode % 3;
  const res: CdekCalcResponse = {
    tariffCode: "demo-economy",
    priceRub: base + spread * 50,
    daysMin: 2 + (spread % 2),
    daysMax: 5 + spread,
    currency: "RUB",
  };
  return NextResponse.json(res);
}

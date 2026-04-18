import { NextResponse } from "next/server";
import type { CdekPvz } from "@/lib/cdek-types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city")?.trim() || "Санкт-Петербург";
  const list: CdekPvz[] = [
    {
      code: "SPB-1",
      name: "ПВЗ Невский (демо)",
      address: `${city}, Невский пр., 100`,
      workTime: "10:00–21:00",
    },
    {
      code: "SPB-2",
      name: "ПВЗ Лиговский (демо)",
      address: `${city}, Лиговский пр., 50`,
      workTime: "09:00–20:00",
    },
    {
      code: "SPB-3",
      name: "ПВЗ Московский (демо)",
      address: `${city}, Московский пр., 150`,
      workTime: "10:00–22:00",
    },
  ];
  return NextResponse.json({ pvz: list });
}

import { NextResponse } from "next/server";
import type { CdekCity } from "@/lib/cdek-types";

const CITIES: CdekCity[] = [
  { code: 137, name: "Москва", region: "Москва" },
  { code: 270, name: "Санкт-Петербург", region: "Ленинградская область" },
  { code: 435, name: "Казань", region: "Татарстан" },
  { code: 298, name: "Екатеринбург", region: "Свердловская область" },
  { code: 63, name: "Новосибирск", region: "Новосибирская область" },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim().toLowerCase() ?? "";
  const list = q
    ? CITIES.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.region.toLowerCase().includes(q),
      )
    : CITIES;
  return NextResponse.json({ cities: list });
}

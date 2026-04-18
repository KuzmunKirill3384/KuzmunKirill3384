"use client";

import { useEffect, useState } from "react";
import type { CdekCalcResponse, CdekCity, CdekPvz } from "@/lib/cdek-types";
import { formatRub } from "@/lib/format";

export function CdekDeliveryWidget() {
  const [cities, setCities] = useState<CdekCity[]>([]);
  const [cityCode, setCityCode] = useState(270);
  const [sumRub, setSumRub] = useState(25000);
  const [calc, setCalc] = useState<CdekCalcResponse | null>(null);
  const [pvz, setPvz] = useState<CdekPvz[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    void fetch("/api/cdek/cities")
      .then((r) => r.json() as Promise<{ cities: CdekCity[] }>)
      .then((d) => setCities(d.cities ?? []))
      .catch(() => setCities([]));
  }, []);

  async function runCalc() {
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch("/api/cdek/calc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cityCode,
          goodsSumKop: Math.round(sumRub * 100),
        }),
      });
      if (!res.ok) {
        const e = (await res.json()) as { error?: string };
        throw new Error(e.error ?? "Ошибка");
      }
      const data = (await res.json()) as CdekCalcResponse;
      setCalc(data);
      const cityName =
        cities.find((c) => c.code === cityCode)?.name ?? "Город";
      const pvzRes = await fetch(
        `/api/cdek/pvz?city=${encodeURIComponent(cityName)}`,
      );
      const pvzJson = (await pvzRes.json()) as { pvz?: CdekPvz[] };
      setPvz(pvzJson.pvz ?? []);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Ошибка");
      setCalc(null);
      setPvz([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-10 border border-[var(--border)] bg-[var(--paper-muted)] p-6 md:p-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
        Демо-расчёт доставки (СДЭК-подобный mock)
      </p>
      <p className="mt-2 text-xs text-[var(--muted)]">
        Без API-ключей; ответы статичны и упрощены для презентации.
      </p>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end">
        <div>
          <label htmlFor="cdek-city" className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
            Город
          </label>
          <select
            id="cdek-city"
            value={cityCode}
            onChange={(e) => setCityCode(Number(e.target.value))}
            className="mt-2 block min-h-11 w-full min-w-[200px] border border-[var(--border)] bg-white px-3 text-sm text-[var(--ink)]"
          >
            {cities.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="cdek-sum" className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
            Сумма заказа, ₽
          </label>
          <input
            id="cdek-sum"
            type="number"
            min={1000}
            step={500}
            value={sumRub}
            onChange={(e) => setSumRub(Number(e.target.value))}
            className="mt-2 block min-h-11 w-full min-w-[140px] border border-[var(--border)] bg-white px-3 text-sm tabular-nums"
          />
        </div>
        <button
          type="button"
          onClick={() => void runCalc()}
          disabled={loading}
          className="min-h-11 border border-[var(--ink)] bg-[var(--ink)] px-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-white hover:bg-transparent hover:text-[var(--ink)] disabled:opacity-50"
        >
          {loading ? "…" : "Рассчитать"}
        </button>
      </div>
      {err ? (
        <p className="mt-4 text-sm text-red-700" role="alert">
          {err}
        </p>
      ) : null}
      {calc ? (
        <div className="mt-6 border-t border-[var(--border)] pt-6">
          <p className="text-sm text-[var(--ink)]">
            Тариф {calc.tariffCode}:{" "}
            <strong className="tabular-nums">{formatRub(calc.priceRub)}</strong>{" "}
            · {calc.daysMin}–{calc.daysMax} раб. дней
          </p>
          {pvz.length > 0 ? (
            <ul className="mt-4 space-y-3 text-sm text-[var(--muted)]">
              {pvz.map((p) => (
                <li key={p.code} className="border-b border-[var(--border)] pb-3 last:border-0">
                  <span className="font-medium text-[var(--ink)]">{p.name}</span>
                  <br />
                  {p.address}
                  <br />
                  <span className="text-xs">{p.workTime}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

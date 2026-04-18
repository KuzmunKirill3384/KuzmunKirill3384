"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

type Props = {
  newCount: number;
  favBrands: string[];
};

const STORAGE_KEY = "atrium_visitor_name";

function subscribeName(cb: () => void) {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
}

function getNameSnapshot(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function getServerSnapshot(): string | null {
  return null;
}

export function PersonalWelcome({ newCount, favBrands }: Props) {
  const name = useSyncExternalStore(subscribeName, getNameSnapshot, getServerSnapshot);

  if (!name) return null;

  const firstName = name.split(/\s+/)[0];

  return (
    <section className="animate-fade-up border-b border-[var(--border)] bg-[var(--paper-muted)]">
      <div className="mx-auto max-w-[1400px] px-5 py-6 md:py-8">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <p className="font-[family-name:var(--font-display)] text-xl text-[var(--ink)] md:text-2xl">
            Привет, {firstName}
          </p>
          <p className="text-sm text-[var(--muted)]">
            {newCount > 0 ? (
              <>
                Для тебя{" "}
                <Link href="/catalog?novelty=1" className="font-semibold text-[var(--ink)] underline-offset-4 hover:underline">
                  {newCount} {newCount === 1 ? "новая позиция" : newCount < 5 ? "новые позиции" : "новых позиций"}
                </Link>
              </>
            ) : (
              "Рады видеть снова"
            )}
            {favBrands.length > 0 && (
              <> от {favBrands.slice(0, 3).join(", ")}</>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}

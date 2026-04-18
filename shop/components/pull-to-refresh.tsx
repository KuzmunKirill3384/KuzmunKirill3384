"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

type Props = { children: React.ReactNode };

const THRESHOLD = 72;

export function PullToRefresh({ children }: Props) {
  const router = useRouter();
  const [pull, setPull] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const startY = useRef(0);
  const active = useRef(false);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (reduced.current) return;
    if (window.scrollY > 2) return;
    startY.current = e.touches[0]?.clientY ?? 0;
    active.current = true;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!active.current || refreshing) return;
    if (window.scrollY > 2) {
      active.current = false;
      setPull(0);
      return;
    }
    const y = e.touches[0]?.clientY ?? 0;
    const d = Math.max(0, y - startY.current);
    if (d > 0) setPull(Math.min(d * 0.45, 96));
  }, [refreshing]);

  const end = useCallback(() => {
    if (!active.current) return;
    active.current = false;
    if (pull >= THRESHOLD && !refreshing) {
      setRefreshing(true);
      setPull(0);
      router.refresh();
      window.setTimeout(() => setRefreshing(false), 600);
    } else {
      setPull(0);
    }
  }, [pull, refreshing, router]);

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={end}
      onTouchCancel={end}
      className="relative min-h-0"
    >
      {pull > 8 ? (
        <div
          className="pointer-events-none fixed left-0 right-0 top-0 z-[25] flex justify-center pt-[env(safe-area-inset-top,0px)]"
          style={{ opacity: Math.min(1, pull / 64) }}
          aria-hidden
        >
          <span className="rounded-full border border-[var(--border)] bg-[var(--paper)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
            {refreshing ? "…" : "Отпустите для обновления"}
          </span>
        </div>
      ) : null}
      {children}
    </div>
  );
}

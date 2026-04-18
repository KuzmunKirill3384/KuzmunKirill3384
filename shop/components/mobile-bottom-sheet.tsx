"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
};

export function MobileBottomSheet({
  open,
  onOpenChange,
  title,
  children,
}: Props) {
  const [dragY, setDragY] = useState(0);
  const startY = useRef(0);
  const dragging = useRef(false);
  const dragYRef = useRef(0);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      reducedMotionRef.current = mq.matches;
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const finishDrag = useCallback(() => {
    dragging.current = false;
    const y = dragYRef.current;
    dragYRef.current = 0;
    setDragY(0);
    if (!reducedMotionRef.current && y > 96) {
      onOpenChange(false);
    }
  }, [onOpenChange]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotionRef.current) return;
    dragging.current = true;
    startY.current = e.clientY;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current || reducedMotionRef.current) return;
    const dy = Math.max(0, e.clientY - startY.current);
    dragYRef.current = dy;
    setDragY(dy);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    if (!dragging.current) return;
    finishDrag();
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[100] bg-black/45" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          style={dragY ? { transform: `translateY(${dragY}px)` } : undefined}
          className={cn(
            "fixed inset-x-0 bottom-0 z-[101] flex max-h-[85dvh] flex-col rounded-t-2xl border border-[var(--border)] bg-[var(--paper)] pb-[env(safe-area-inset-bottom,0px)] shadow-[0_-8px_40px_rgba(0,0,0,0.12)] outline-none",
          )}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div
            className="flex shrink-0 touch-none flex-col items-center pt-3 pb-2"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={finishDrag}
            style={{ touchAction: "none" }}
          >
            <div
              className="h-1.5 w-12 rounded-full bg-[var(--border)]"
              aria-hidden
            />
            <span className="sr-only">Перетащите вниз, чтобы закрыть</span>
          </div>
          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-[var(--border)] px-5 pb-3">
            <DialogPrimitive.Title className="font-[family-name:var(--font-display)] text-lg text-[var(--ink)]">
              {title}
            </DialogPrimitive.Title>
            <DialogPrimitive.Close className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-sm border border-[var(--border)] px-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ink)] transition-colors hover:border-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-focus)] focus-visible:ring-offset-2">
              Закрыть
            </DialogPrimitive.Close>
          </div>
          <div
            className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-5 pb-6 pt-2 [touch-action:pan-y]"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {children}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

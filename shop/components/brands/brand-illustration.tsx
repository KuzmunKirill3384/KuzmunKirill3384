import type { ReactNode } from "react";
import {
  brandGlyph,
  brandInitials,
  brandVariant,
} from "@/lib/brand-visual";

function PatternBase({ children }: { children: ReactNode }) {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 400 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {children}
    </svg>
  );
}

function Pattern0() {
  return (
    <PatternBase>
      <circle
        cx="200"
        cy="120"
        r="88"
        stroke="var(--olive-muted)"
        strokeWidth="1"
        opacity="0.45"
      />
      <circle
        cx="200"
        cy="120"
        r="58"
        stroke="var(--olive-deep)"
        strokeWidth="1.5"
        opacity="0.35"
      />
      <circle
        cx="200"
        cy="120"
        r="28"
        fill="var(--olive-soft)"
        opacity="0.9"
      />
    </PatternBase>
  );
}

function Pattern1() {
  return (
    <PatternBase>
      {Array.from({ length: 14 }, (_, i) => (
        <line
          key={i}
          x1={-40 + i * 32}
          y1="280"
          x2={80 + i * 32}
          y2="-40"
          stroke="var(--olive-muted)"
          strokeWidth="1"
          opacity="0.2"
        />
      ))}
      <rect
        x="120"
        y="60"
        width="160"
        height="120"
        stroke="var(--olive-deep)"
        strokeWidth="1.5"
        opacity="0.25"
      />
    </PatternBase>
  );
}

function Pattern2() {
  return (
    <PatternBase>
      <path
        d="M40 200 V40 H200"
        stroke="var(--olive-deep)"
        strokeWidth="1.5"
        opacity="0.3"
      />
      <path
        d="M360 40 V200 H200"
        stroke="var(--olive-deep)"
        strokeWidth="1.5"
        opacity="0.3"
      />
      <circle cx="200" cy="120" r="4" fill="var(--olive)" opacity="0.5" />
      <path
        d="M200 72 L228 120 L200 168 L172 120 Z"
        stroke="var(--olive-muted)"
        strokeWidth="1"
        fill="var(--olive-soft)"
        opacity="0.85"
      />
    </PatternBase>
  );
}

function Pattern3() {
  const dots = Array.from({ length: 8 * 12 }, (_, i) => {
    const row = Math.floor(i / 12);
    const col = i % 12;
    return (
      <circle
        key={i}
        cx={40 + col * 28}
        cy={36 + row * 26}
        r="2.5"
        fill="var(--olive-muted)"
        opacity={0.12 + ((row + col) % 3) * 0.08}
      />
    );
  });
  return (
    <PatternBase>
      {dots}
      <ellipse
        cx="200"
        cy="120"
        rx="100"
        ry="56"
        stroke="var(--olive-deep)"
        strokeWidth="1"
        opacity="0.22"
      />
    </PatternBase>
  );
}

function Pattern4() {
  return (
    <PatternBase>
      <path
        d="M0 120 Q100 40 200 120 T400 120"
        stroke="var(--olive-deep)"
        strokeWidth="1.25"
        opacity="0.28"
      />
      <path
        d="M0 140 Q100 220 200 140 T400 140"
        stroke="var(--olive-muted)"
        strokeWidth="1"
        opacity="0.22"
      />
      <path
        d="M200 48 C260 48 300 88 300 120 C300 168 240 200 200 200 C160 200 100 168 100 120 C100 72 140 48 200 48"
        stroke="var(--olive)"
        strokeWidth="1"
        fill="none"
        opacity="0.2"
      />
    </PatternBase>
  );
}

function Pattern5() {
  return (
    <PatternBase>
      <rect
        x="72"
        y="48"
        width="256"
        height="144"
        rx="4"
        stroke="var(--border)"
        strokeWidth="1"
        opacity="0.6"
      />
      <line
        x1="200"
        y1="48"
        x2="200"
        y2="192"
        stroke="var(--olive-muted)"
        strokeWidth="1"
        opacity="0.25"
        strokeDasharray="4 6"
      />
      <line
        x1="72"
        y1="120"
        x2="328"
        y2="120"
        stroke="var(--olive-muted)"
        strokeWidth="1"
        opacity="0.2"
        strokeDasharray="4 6"
      />
      <circle cx="200" cy="120" r="36" stroke="var(--olive-deep)" strokeWidth="1.2" opacity="0.35" />
    </PatternBase>
  );
}

const PATTERNS = [Pattern0, Pattern1, Pattern2, Pattern3, Pattern4, Pattern5];

export function BrandIllustration({ name }: { name: string }) {
  const v = brandVariant(name);
  const initials = brandInitials(name);
  const glyph = brandGlyph(name);
  const Pattern = PATTERNS[v] ?? Pattern0;

  return (
    <div className="relative aspect-[5/3] w-full overflow-hidden bg-[var(--paper-muted)]">
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-[var(--olive-soft)] opacity-90" />
      <Pattern />
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="font-[family-name:var(--font-display)] text-[2.75rem] font-medium leading-none tracking-[0.08em] text-[var(--ink)] drop-shadow-[0_1px_0_rgba(255,255,255,0.8)] md:text-[3.25rem]"
          style={{ fontFeatureSettings: '"salt" 1' }}
        >
          {initials}
        </span>
      </div>
      <span
        className="absolute bottom-3 right-4 text-lg leading-none text-[var(--olive-deep)] opacity-80"
        aria-hidden
      >
        {glyph}
      </span>
    </div>
  );
}

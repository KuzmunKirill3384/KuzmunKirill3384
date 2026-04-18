"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    </svg>
  );
}

function GridIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25A2.25 2.25 0 0113.5 8.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25v-2.25z"
      />
    </svg>
  );
}

function TagIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 6h.008v.008H6V6z"
      />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
      />
    </svg>
  );
}

const items = [
  { href: "/", label: "Главная", Icon: HomeIcon, match: (p: string) => p === "/" },
  {
    href: "/catalog",
    label: "Каталог",
    Icon: GridIcon,
    match: (p: string) => p.startsWith("/catalog"),
  },
  {
    href: "/brands",
    label: "Бренды",
    Icon: TagIcon,
    match: (p: string) => p.startsWith("/brands"),
  },
  {
    href: "/account",
    label: "Кабинет",
    Icon: UserIcon,
    match: (p: string) => p.startsWith("/account"),
  },
] as const;

export function MobileTabBar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Нижняя навигация"
      className="fixed bottom-0 left-0 right-0 z-30 border-t border-[var(--border)] bg-[var(--paper)]/95 pb-[env(safe-area-inset-bottom,0px)] pt-1 shadow-[0_-2px_20px_rgba(0,0,0,0.06)] backdrop-blur-sm md:hidden"
    >
      <ul className="mx-auto flex h-14 max-w-lg items-stretch justify-between px-1">
        {items.map(({ href, label, Icon, match }) => {
          const active = match(pathname);
          return (
            <li key={href} className="flex min-w-0 flex-1 justify-center">
              <Link
                href={href}
                className={cn(
                  "flex min-h-11 min-w-[3.25rem] flex-col items-center justify-center gap-0.5 rounded-md px-2 text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors",
                  active
                    ? "text-[var(--ink)]"
                    : "text-[var(--muted)] hover:text-[var(--ink)]",
                )}
              >
                <Icon
                  className={cn("h-5 w-5", active ? "text-[var(--ink)]" : "")}
                />
                <span className="truncate">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutAccountButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function logout() {
    setPending(true);
    try {
      await fetch("/api/account/logout", { method: "POST" });
      router.push("/account/login");
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={() => void logout()}
      disabled={pending}
      className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)] underline-offset-4 transition-colors hover:text-[var(--ink)] disabled:opacity-50"
    >
      {pending ? "Выход…" : "Выйти"}
    </button>
  );
}

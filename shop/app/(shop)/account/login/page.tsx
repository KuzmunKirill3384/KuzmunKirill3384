"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AccountLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const res = await fetch("/api/account/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Ошибка входа");
        return;
      }
      router.push("/account");
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-5 py-16 md:py-24">
      <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[var(--muted)]">
        Вход
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[var(--ink)] md:text-4xl">
        Личный кабинет
      </h1>
      <p className="mt-3 text-sm text-[var(--muted)]">
        Демо-доступ: логин и пароль указаны на странице{" "}
        <Link href="/site#demo-access" className="text-[var(--olive-deep)] underline-offset-2 hover:underline">
          Как устроен сайт
        </Link>
        .
      </p>
      <form onSubmit={submit} className="mt-10 space-y-5 border border-[var(--border)] bg-white p-8 shadow-sm">
        <div>
          <label htmlFor="acc-email" className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
            Email
          </label>
          <input
            id="acc-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-2 w-full border border-[var(--border)] bg-[var(--paper)] px-4 py-3 text-sm outline-none transition-[border-color,box-shadow] duration-200 focus:border-[var(--olive-deep)] focus:ring-2 focus:ring-[var(--ring-focus)] focus:ring-offset-2"
          />
        </div>
        <div>
          <label htmlFor="acc-pass" className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
            Пароль
          </label>
          <input
            id="acc-pass"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-2 w-full border border-[var(--border)] bg-[var(--paper)] px-4 py-3 text-sm outline-none transition-[border-color,box-shadow] duration-200 focus:border-[var(--olive-deep)] focus:ring-2 focus:ring-[var(--ring-focus)] focus:ring-offset-2"
          />
        </div>
        {error ? (
          <p className="text-sm text-red-700" role="alert">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={pending}
          className="w-full min-h-12 border border-[var(--ink)] bg-[var(--ink)] text-[12px] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-transparent hover:text-[var(--ink)] disabled:opacity-50"
        >
          {pending ? "Вход…" : "Войти"}
        </button>
      </form>
      <p className="mt-8 text-center text-sm text-[var(--muted)]">
        <Link href="/" className="text-[var(--ink)] underline-offset-2 hover:underline">
          На главную
        </Link>
      </p>
    </div>
  );
}

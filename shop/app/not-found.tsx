import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 py-20">
      <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[var(--muted)]">
        404
      </p>
      <h1 className="mt-4 max-w-lg text-center font-[family-name:var(--font-display)] text-3xl text-[var(--ink)] md:text-4xl">
        Страница не найдена
      </h1>
      <p className="mt-4 max-w-md text-center text-sm leading-relaxed text-[var(--muted)]">
        Проверьте адрес или перейдите в каталог — возможно, товар снят с витрины
        или ссылка устарела.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="inline-flex min-h-12 items-center justify-center border border-[var(--ink)] bg-[var(--ink)] px-8 text-[12px] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-transparent hover:text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-focus)] focus-visible:ring-offset-2"
        >
          На главную
        </Link>
        <Link
          href="/catalog"
          className="inline-flex min-h-12 items-center justify-center border border-[var(--border)] px-8 text-[12px] font-semibold uppercase tracking-[0.2em] text-[var(--ink)] transition-colors hover:border-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-focus)] focus-visible:ring-offset-2"
        >
          Каталог
        </Link>
        <Link
          href="/site"
          className="inline-flex min-h-12 items-center justify-center border border-transparent px-6 text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)] transition-colors hover:text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-focus)] focus-visible:ring-offset-2"
        >
          О сайте
        </Link>
      </div>
    </div>
  );
}

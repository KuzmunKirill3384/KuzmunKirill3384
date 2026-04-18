export default function CatalogLoading() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 py-12 md:py-16">
      <div className="mb-10 h-10 max-w-md animate-pulse rounded bg-[var(--border)]/60" />
      <div className="mb-10 flex flex-wrap gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-11 w-24 animate-pulse rounded bg-[var(--border)]/50"
          />
        ))}
      </div>
      <div className="grid gap-10 md:grid-cols-[260px_1fr] md:gap-12">
        <aside className="h-80 animate-pulse rounded border border-[var(--border)] bg-white/50" />
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col border border-[var(--border)] bg-white"
            >
              <div className="aspect-[3/4] animate-pulse bg-[var(--paper-muted)]" />
              <div className="space-y-3 p-5">
                <div className="h-3 w-1/3 animate-pulse rounded bg-[var(--border)]/70" />
                <div className="h-5 w-4/5 animate-pulse rounded bg-[var(--border)]/50" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-[var(--border)]/40" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

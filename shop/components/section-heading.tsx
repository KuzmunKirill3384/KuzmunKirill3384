type Props = {
  tag: string;
  title: string;
  subtitle?: string;
};

export function SectionHeading({ tag, title, subtitle }: Props) {
  return (
    <div className="animate-fade-up mb-10 flex flex-col gap-2 border-b border-[var(--border)] pb-8 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[var(--accent)]">
          {tag}
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-medium tracking-[0.04em] text-[var(--ink)] md:text-4xl">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="max-w-md text-sm leading-relaxed text-[var(--muted)]">
          {subtitle}
        </p>
      )}
    </div>
  );
}

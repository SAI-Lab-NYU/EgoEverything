type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description
}: SectionHeaderProps) {
  return (
    <div className="grid gap-4 border-t border-ink/15 pt-5 lg:grid-cols-[minmax(0,0.99fr)_minmax(0,0.88fr)]">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
        {eyebrow}
      </p>
      <div className="lg:col-start-1">
        <h2 className="-ml-1 font-display text-3xl font-semibold leading-tight text-ink sm:text-5xl">
          {title}
        </h2>
        <p className="mt-4 text-base leading-7 text-muted">
          {description}
        </p>
      </div>
    </div>
  );
}

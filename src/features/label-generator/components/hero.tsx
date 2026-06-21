type HeroProps = {
  eyebrow: string;
  title: string;
  body: string;
};

export function Hero({ eyebrow, title, body }: HeroProps) {
  return (
    <section className="grid max-w-4xl gap-4">
      <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--accent)]">
        {eyebrow}
      </p>
      <h1 className="max-w-5xl text-5xl font-semibold leading-[0.94] md:text-7xl">{title}</h1>
      <p className="max-w-3xl text-lg leading-8 text-[var(--muted)] md:text-xl">{body}</p>
    </section>
  );
}

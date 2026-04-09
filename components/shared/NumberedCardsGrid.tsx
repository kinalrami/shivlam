"use client";

type CardItem = {
  num: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  tag?: string;
};

type Props = {
  items: readonly CardItem[];
  className?: string;
  /** Enables About page scroll-reveal behavior (data attrs). */
  reveal?: boolean;
};

export function NumberedCardsGrid({ items, className, reveal = false }: Props) {
  return (
    <div className={className ?? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"}>
      {items.map((v, i) => (
        <article
          key={`${v.num}-${v.title}`}
          {...(reveal
            ? {
                "data-about-reveal": true,
                "data-arbim-cursor": true,
                "data-about-delay": String(Math.min(i + 1, 6)),
              }
            : {})}
          className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl transition-[border-color,transform] duration-[350ms] after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:origin-left after:scale-x-0 after:bg-sl-saffron after:transition-transform after:duration-[400ms] after:ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:after:scale-x-100 hover:-translate-y-1 hover:border-sl-saffron/28"
        >
          <span className="mb-4 block text-2xl opacity-90" aria-hidden>
            {v.icon}
          </span>
          <div
            className="mb-4 font-sans text-5xl font-extrabold leading-none tracking-[-0.05em] text-sl-saffron/[0.12]"
            aria-hidden
          >
            {v.num}
          </div>
          <h3 className="mb-2.5 font-sans text-[17px] font-bold text-white">{v.title}</h3>
          <p className="text-[13px] leading-relaxed text-white/50">{v.desc}</p>
          {v.tag && (
            <span className="mt-5 inline-flex rounded-sm border border-orange-400/25 px-2 py-1 font-mono text-[10px] tracking-[0.14em] text-orange-400 uppercase">
              {v.tag}
            </span>
          )}
        </article>
      ))}
    </div>
  );
}


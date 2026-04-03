"use client";

import { SectionIntro } from "@/components/shared/section-chrome";

const CLIENT_CARDS = [
  {
    tag: "[ VERIFIED PARTNER ]",
    client: "TechNexus Solutions",
    quote:
      "Shivlam didn't just build an app; they engineered a scalable ecosystem. Their expertise in Complex Architecture transformed our delivery pipeline.",
    metric: "+140% Performance Increase",
  },
  {
    tag: "[ SYSTEM INTEGRATED ]",
    client: "UrbanBuild AR",
    quote:
      "The integration of AR and BIM data was flawless. Shivlam's ability to overlay complex dreams onto clean code is unmatched in the industry.",
    metric: "40% Reduction in On-site Errors",
  },
  {
    tag: "[ NODE ACTIVE ]",
    client: "Global Retail Dynamics",
    quote:
      "From Full-Stack Web Dev to a complete Brand Reboot, the speed of execution was incredible. They ship faster than any team we've worked with.",
    metric: "2M+ Active Users Onboarded",
  },
] as const;

export default function Feedback() {
  return (
    <section
      id="clients"
      aria-labelledby="network-feedback-heading"
      className="relative scroll-mt-24 px-5 sm:px-8 lg:px-12 pb-12 md:pb-20"
    >
      <SectionIntro
        id="network-feedback-heading"
        eyebrow="Our clients"
        lead="Our Client's are Celebrating Success with Sharing Joy."
      />

      <div className="grid gap-5 lg:grid-cols-3">
        {CLIENT_CARDS.map((card) => (
          <article
            key={card.client}
            className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/3 px-6 py-7 backdrop-blur-2xl transition-[transform,box-shadow,border-color] duration-200 will-change-transform hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_18px_70px_rgba(0,0,0,0.55)] group-hover:border-white/20"
          >
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              style={{
                boxShadow:
                  "0 0 0 2px color-mix(in srgb, var(--sl-saffron) 95%, transparent), 0 0 38px color-mix(in srgb, var(--sl-saffron) 45%, transparent), 0 0 130px color-mix(in srgb, var(--sl-saffron) 22%, transparent)",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-60 mask-[radial-gradient(70%_50%_at_50%_0%,black,transparent)]"
              aria-hidden
            >
              <div className="absolute -left-16 top-0 h-48 w-48 rounded-full bg-sl-cyan/[0.07] blur-2xl" />
            </div>

            <div className="relative flex items-start justify-between gap-3">
              <p className="inline-flex max-w-[85%] rounded border border-sl-cyan/30 bg-sl-cyan/5 px-2 py-1 font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-sl-cyan">
                {card.tag}
              </p>
            </div>

            <h3 className="relative mt-5 font-sans text-lg font-bold leading-snug tracking-tight text-white sm:text-xl">
              {card.client}
            </h3>
            <p className="relative mt-4 flex-1 border-l-2 border-sl-saffron/80 pl-3 font-mono text-[11px] leading-[1.75] text-gray-300 sm:text-xs">
              &ldquo;{card.quote}&rdquo;
            </p>

            <div className="relative mt-6 flex items-center gap-2 font-mono text-[11px] font-medium tracking-wide text-sl-saffron sm:text-xs">
              <span className="text-[8px] text-sl-text opacity-80" aria-hidden>
                ▶
              </span>
              {card.metric}
            </div>

            <div
              className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              style={{
                boxShadow:
                  "0 0 0 2px color-mix(in srgb, var(--sl-saffron) 85%, transparent), 0 0 48px color-mix(in srgb, var(--sl-saffron) 18%, transparent)",
              }}
              aria-hidden
            />
          </article>
        ))}
      </div>
    </section>
  );
}

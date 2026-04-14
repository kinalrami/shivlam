"use client";

import { SectionIntro } from "@/components/shared/section-chrome";
import type { GameDevContent, GameDevSpecCard } from "./content";

type Props = {
  content: GameDevContent["specialisations"];
};

function toneStyles(tone: GameDevSpecCard["cardTone"]) {
  switch (tone) {
    case "unity":
      return {
        cardBg: "bg-white/[0.02] border-white/10 hover:border-[rgba(170,170,255,.35)]",
        topBar: "bg-linear-to-r from-[#AAAAFF] to-[#1DCFCF] opacity-60",
        glow: "bg-[radial-gradient(55%_55%_at_25%_20%,rgba(170,170,255,.22),transparent_70%)]",
        tag: "bg-[rgba(170,170,255,.12)] text-[rgba(170,170,255,.85)] border-[rgba(170,170,255,.22)]",
      };
    case "ar":
      return {
        cardBg: "bg-white/[0.02] border-white/10 hover:border-[rgba(255,107,107,.35)]",
        topBar: "bg-linear-to-r from-[#FF6B6B] to-[#FF9933] opacity-60",
        glow: "bg-[radial-gradient(55%_55%_at_25%_20%,rgba(255,107,107,.20),transparent_70%)]",
        tag: "bg-[rgba(255,107,107,.12)] text-[rgba(255,107,107,.85)] border-[rgba(255,107,107,.22)]",
      };
    case "vp":
      return {
        cardBg: "bg-white/[0.02] border-white/10 hover:border-[rgba(192,132,252,.35)]",
        topBar: "bg-linear-to-r from-[#C084FC] to-[#1DCFCF] opacity-60",
        glow: "bg-[radial-gradient(55%_55%_at_25%_20%,rgba(192,132,252,.22),transparent_70%)]",
        tag: "bg-[rgba(192,132,252,.12)] text-[rgba(192,132,252,.85)] border-[rgba(192,132,252,.22)]",
      };
    case "design":
    default:
      return {
        cardBg: "bg-white/[0.02] border-white/10 hover:border-orange-400/30",
        topBar: "bg-linear-to-r from-[#FF9933] to-[#1DCFCF] opacity-60",
        glow: "bg-[radial-gradient(55%_55%_at_25%_20%,rgba(255,153,51,.20),transparent_70%)]",
        tag: "bg-[rgba(255,153,51,.10)] text-[rgba(255,153,51,.85)] border-[rgba(255,153,51,.22)]",
      };
  }
}

export function Specialisations({ content }: Props) {
  return (
    <section id={content.sectionId} className="bg-[#060606] scroll-mt-14">
      <div className="mx-auto max-w-325 px-5 pb-12 md:px-12 md:pb-20">
        <SectionIntro
          id={content.headingId}
          eyebrow={content.eyebrow}
          eyebrowStyle="dash"
          title={
            <>
              {content.title.before}
              <span className="text-sl-saffron">{content.title.highlight}</span>
              {content.title.after ?? null}
            </>
          }
          lead={content.lead}
        />

        <div className="grid gap-6 md:grid-cols-2">
          {content.cards.map((card) => {
            const s = toneStyles(card.cardTone);
            const external = card.href.startsWith("http");
            return (
              <a
                key={card.title}
                href={card.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                className={[
                  "group relative overflow-hidden rounded-xl border p-9 transition-[transform,box-shadow,border-color] duration-300",
                  "hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,.35)]",
                  s.cardBg,
                ].join(" ")}
              >
                <div className={["pointer-events-none absolute inset-x-0 top-0 h-[3px] opacity-0 transition-opacity duration-300 group-hover:opacity-100", s.topBar].join(" ")} />
                <div
                  className={["pointer-events-none absolute inset-0 opacity-70 mask-[radial-gradient(60%_55%_at_50%_35%,black,transparent)]", s.glow].join(" ")}
                  aria-hidden
                />

                <div>
                  <span className={["inline-flex rounded-[3px] border px-[10px] py-1 font-mono text-[8px] tracking-[0.18em] uppercase", s.tag].join(" ")}>
                    {card.tag}
                  </span>
                </div>

                <div className="mt-5 font-sans text-[22px] font-bold leading-[1.2] text-white">
                  {card.title}
                </div>
                <p className="mt-3 text-[14px] leading-[1.68] text-white/48">
                  {card.desc}
                </p>

                <div className="mt-6 flex flex-wrap gap-1.5">
                  {card.pills.map((p) => (
                    <span
                      key={p}
                      className="rounded-[3px] border border-white/10 bg-white/[0.05] px-2 py-[3px] font-mono text-[8px] tracking-[0.08em] text-white/45 uppercase"
                    >
                      {p}
                    </span>
                  ))}
                </div>

                <div className="mt-5 inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.12em] text-orange-400 uppercase transition-opacity duration-200 group-hover:opacity-70">
                  {card.ctaLabel}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}


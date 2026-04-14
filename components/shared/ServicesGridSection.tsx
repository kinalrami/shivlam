"use client";

import Image from "next/image";
import { SectionIntro } from "@/components/shared/section-chrome";
import { FileText, Layers, ZoomIn, Share2, Smartphone, Star } from "lucide-react";

export type ServicesGridAccent = "orange" | "cyan" | "green" | "purple" | "blue";

export type ServicesGridIcon =
  | { kind: "image"; src: string }
  | { kind: "key"; key: string };

export type ServicesGridCard = {
  key: string;
  featured?: boolean;
  tag: string;
  title: string;
  desc: string;
  pills: readonly string[];
  accent: ServicesGridAccent;
  icon: ServicesGridIcon;
};

export type ServicesGridSectionContent = {
  sectionId: string;
  headingId: string;
  eyebrow: string;
  title: { before: string; highlight: string; after?: string };
  lead: string;
  cards: readonly ServicesGridCard[];
};

function accentClasses(accent: ServicesGridAccent) {
  const hover = "hover:border-orange-400/30";
  const tagHover = "group-hover:border-orange-400/25 group-hover:text-orange-400/80";
  const pillHover = "group-hover:border-orange-400/20 group-hover:bg-orange-400/[0.08] group-hover:text-orange-400/80";
  switch (accent) {
    case "cyan":
      return {
        border: "border-cyan-300/20",
        dot: "bg-[rgba(29,207,207,.80)]",
        hover,
        tagHover,
        pillHover,
      };
    case "green":
      return {
        border: "border-[rgba(34,197,94,.22)]",
        dot: "bg-[rgba(34,197,94,.80)]",
        hover,
        tagHover,
        pillHover,
      };
    case "purple":
      return {
        border: "border-[rgba(192,132,252,.22)]",
        dot: "bg-[rgba(192,132,252,.80)]",
        hover,
        tagHover,
        pillHover,
      };
    case "blue":
      return {
        border: "border-[rgba(96,165,250,.22)]",
        dot: "bg-[rgba(96,165,250,.80)]",
        hover,
        tagHover,
        pillHover,
      };
    default:
      return {
        border: "border-orange-400/20",
        dot: "bg-orange-400/80",
        hover,
        tagHover,
        pillHover,
      };
  }
}

function LucideIcon({ iconKey, className }: { iconKey: string; className: string }) {
  switch (iconKey) {
    case "seo":
      return (
        <ZoomIn className={className} aria-hidden />
      );
    case "aso":
      return (
        <Smartphone className={className} aria-hidden />
      );
    case "social":
      return (
        <Share2 className={className} aria-hidden />
      );
    case "ads":
      return (
        <Layers className={className} aria-hidden />
      );
    case "content":
      return (
        <FileText className={className} aria-hidden />
      );
    case "influencer":
      return (
        <Star className={className} aria-hidden />
      );
    default:
      return (
        <Layers className={className} aria-hidden />
      );
  }
}

export function ServicesGridSection({ content }: { content: ServicesGridSectionContent }) {
  return (
    <section id={content.sectionId} className="bg-[#060606] scroll-mt-14">
      <div className="mx-auto max-w-325 px-5 pb-12 md:px-12">
        <SectionIntro
          id={content.headingId}
          eyebrow={content.eyebrow}
          eyebrowStyle="dash"
          title={
            <>
              {content.title.before}<br />
              <span className="text-sl-saffron">{content.title.highlight}</span>
              <br />{content.title.after ?? null}
            </>
          }
          lead={content.lead}
          fullWidth
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.cards.map((card) => {
            const a = accentClasses(card.accent);
            return (
              <article
                key={card.key}
                className={[
                  "group relative overflow-hidden rounded-xl border border-white/6 bg-white/[0.02] p-6 transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_55px_rgb(0_0_0/0.45)]",
                  a.hover,
                  card.featured ? "lg:col-span-2" : "",
                ].join(" ")}
              >
                <div
                  className="pointer-events-none absolute left-0 right-0 top-0 h-[2px] bg-orange-400/70 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  aria-hidden
                />

                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className={["inline-flex size-12 items-center justify-center rounded-xl border", a.border].join(" ")}>
                    {card.icon.kind === "image" ? (
                      <Image src={card.icon.src} alt="" width={24} height={24} />
                    ) : (
                      <LucideIcon
                        iconKey={card.icon.key}
                        className={[
                          "size-6",
                          card.accent === "cyan"
                            ? "text-[rgba(29,207,207,.95)]"
                            : card.accent === "green"
                              ? "text-[rgba(34,197,94,.92)]"
                              : card.accent === "purple"
                                ? "text-[rgba(192,132,252,.92)]"
                                : card.accent === "blue"
                                  ? "text-[rgba(96,165,250,.92)]"
                                  : "text-orange-400",
                        ].join(" ")}
                      />
                    )}
                  </div>
                  <span
                    className={[
                      "rounded-sm border border-white/10 bg-white/[0.03] px-2 py-1 font-mono text-[9px] tracking-[0.15em] text-white/35 uppercase transition-colors duration-200",
                      a.tagHover,
                    ].join(" ")}
                  >
                    {card.tag}
                  </span>
                </div>

                <h3 className="font-sans text-lg font-bold tracking-tight text-white">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed font-light text-white/45">{card.desc}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {card.pills.map((p) => (
                    <span
                      key={p}
                      className={[
                        "rounded-sm border border-white/10 bg-white/[0.03] px-2 py-1 font-mono text-[9px] tracking-[0.08em] text-white/40 uppercase transition-colors duration-200",
                        a.pillHover,
                      ].join(" ")}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}


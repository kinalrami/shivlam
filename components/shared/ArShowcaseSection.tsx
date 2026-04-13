"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { SectionIntro } from "@/components/shared/section-chrome";

function CtaLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  const internal = href.startsWith("/");
  if (internal) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

function pillClass(v: "cyan" | "orange" | "green" | "muted" | "purple"): string {
  switch (v) {
    case "cyan":
      return "border-[rgba(84,197,248,.22)] bg-[rgba(84,197,248,.1)] text-[rgba(84,197,248,.9)]";
    case "green":
      return "border-[rgba(61,220,132,.25)] bg-[rgba(61,220,132,.1)] text-[rgba(61,220,132,.9)]";
    case "purple":
      return "border-[rgba(192,132,252,.22)] bg-[rgba(192,132,252,.1)] text-[rgba(192,132,252,.85)]";
    case "muted":
      return "border-white/[0.12] bg-white/[0.06] text-white/55";
    default:
      return "border-[rgba(255,153,51,.22)] bg-[rgba(255,153,51,.1)] text-[rgba(255,153,51,.9)]";
  }
}

export type ArShowcaseFeatureItem = {
  key: string;
  title: string;
  desc: string;
  icon: ReactNode;
  iconWrapClass: string;
};

export type ArShowcaseCompareCard = {
  variant: "green" | "orange";
  tag: string;
  title: string;
  desc: string;
};

export type ArShowcaseSectionProps = {
  sectionId: string;
  headingId: string;
  eyebrow: string;
  titleLines: readonly (readonly { text: string; emphasis?: boolean }[])[];
  description: string;
  /** Canvas + badges (or any visual) */
  visual: ReactNode;
  /** `start` = visual first column (left in LTR) */
  visualPosition: "start" | "end";
  /** e.g. platform chips + code block (Flutter only) */
  afterIntro?: ReactNode;
  features: readonly ArShowcaseFeatureItem[];
  /** visionOS-style 2×2 cards (optional; use with empty `features` if needed) */
  cardGrid?: readonly { tag: string; title: string; desc: string }[];
  compare?: { eyebrow: string; cards: readonly ArShowcaseCompareCard[] };
  pills: readonly { label: string; variant: "cyan" | "orange" | "green" | "muted" | "purple" }[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  /** SectionIntro extra classes (lead/title tweaks) */
  introClassName?: string;
};

/**
 * Shared two-column AR marketing layout (visual + copy). Used by Flutter AR Foundation and Android ARCore sections.
 */
export function ArShowcaseSection({
  sectionId,
  headingId,
  eyebrow,
  titleLines,
  description,
  visual,
  visualPosition,
  afterIntro,
  features,
  cardGrid,
  compare,
  pills,
  primaryCta,
  secondaryCta,
  introClassName = "mb-6 [&_p]:text-sm [&_p]:leading-[1.72]",
}: ArShowcaseSectionProps) {
  const titleNode = (
    <>
      {titleLines.map((line, i) => (
        <span key={i} className="block">
          {line.map((part, j) => (
            <span key={j} className={part.emphasis ? "text-sl-saffron" : undefined}>
              {part.text}
            </span>
          ))}
        </span>
      ))}
    </>
  );

  const textColumn = (
    <div>
      <SectionIntro
        id={headingId}
        eyebrow={eyebrow}
        eyebrowStyle="dash"
        fullWidth
        title={titleNode}
        lead={description}
        className={introClassName}
      />

      {afterIntro}

      {features.length > 0 ? (
        <ul className="mb-6 flex flex-col gap-3">
          {features.map((f) => (
            <li
              key={f.key}
              className="flex gap-3.5 rounded-lg border border-white/[0.07] bg-white/[0.04] p-3.5 transition-[border-color] duration-300 hover:border-white/20"
            >
              <div
                className={`flex size-9 shrink-0 items-center justify-center rounded-lg border ${f.iconWrapClass}`}
              >
                {f.icon}
              </div>
              <div>
                <p className="mb-1 font-sans text-sm font-semibold text-white">{f.title}</p>
                <p className="text-xs leading-[1.58] text-white/[0.38]">{f.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : null}

      {cardGrid != null && cardGrid.length > 0 ? (
        <div className="mb-6 grid gap-3 sm:grid-cols-2">
          {cardGrid.map((card, ci) => (
            <div
              key={`${card.title}-${ci}`}
              className="rounded-lg border border-white/[0.09] bg-white/[0.04] p-4 transition-[border-color] duration-300 hover:border-[rgba(192,132,252,.35)]"
            >
              <p className="mb-1.5 font-mono text-[8px] tracking-[0.12em] text-[rgba(192,132,252,.8)] uppercase">
                {card.tag}
              </p>
              <p className="mb-1 font-sans text-[13px] font-bold text-white">{card.title}</p>
              <p className="text-[11px] leading-relaxed text-white/45">{card.desc}</p>
            </div>
          ))}
        </div>
      ) : null}

      {compare != null ? (
        <>
          <p className="mb-2.5 font-mono text-[8px] tracking-[0.15em] text-white/40 uppercase">
            {compare.eyebrow}
          </p>
          <div className="mb-6 grid gap-3 sm:grid-cols-2">
            {compare.cards.map((card) => (
              <div
                key={card.title}
                className={[
                  "rounded-lg border p-4",
                  card.variant === "green"
                    ? "border-[rgba(61,220,132,.2)] bg-[rgba(61,220,132,.06)]"
                    : "border-[rgba(255,153,51,.2)] bg-[rgba(255,153,51,.06)]",
                ].join(" ")}
              >
                <p
                  className={[
                    "mb-1.5 font-mono text-[8px] tracking-[0.12em] uppercase",
                    card.variant === "green" ? "text-[rgba(61,220,132,.8)]" : "text-[rgba(255,153,51,.8)]",
                  ].join(" ")}
                >
                  {card.tag}
                </p>
                <p className="mb-1 font-sans text-[13px] font-bold text-white">{card.title}</p>
                <p className="text-[11px] leading-relaxed text-white/45">{card.desc}</p>
              </div>
            ))}
          </div>
        </>
      ) : null}

      <div className="mb-7 flex flex-wrap gap-2">
        {pills.map((p) => (
          <span
            key={p.label}
            className={`rounded px-2.5 py-1 font-mono text-[8px] tracking-[0.09em] uppercase ${pillClass(p.variant)}`}
          >
            {p.label}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <CtaLink
          href={primaryCta.href}
          className="inline-flex items-center gap-2 rounded-[5px] bg-sl-saffron px-8 py-3.5 font-sans text-xs font-semibold tracking-[0.07em] text-white uppercase shadow-[0_0_24px_rgba(255,153,51,.28)] transition-colors hover:bg-[#E68A1F]"
        >
          {primaryCta.label}
        </CtaLink>
        <CtaLink
          href={secondaryCta.href}
          className="inline-flex items-center gap-2 rounded-[5px] border border-white/25 bg-transparent px-8 py-3.5 font-sans text-xs font-semibold tracking-[0.07em] text-white/80 uppercase transition-all hover:border-sl-saffron hover:bg-[rgba(255,153,51,.06)] hover:text-sl-saffron"
        >
          {secondaryCta.label}
        </CtaLink>
      </div>
    </div>
  );

  const visualColumn = <div>{visual}</div>;

  return (
    <section
      id={sectionId}
      aria-labelledby={headingId}
      className="relative scroll-mt-14 overflow-hidden bg-[#060606] pb-12 md:pb-20"
    >

      <div className="relative mx-auto grid max-w-325 items-center gap-12 px-5 md:grid-cols-2 md:gap-[72px] md:px-12">
        {visualPosition === "start" ? (
          <>
            {visualColumn}
            {textColumn}
          </>
        ) : (
          <>
            {textColumn}
            {visualColumn}
          </>
        )}
      </div>
    </section>
  );
}

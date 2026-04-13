"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { SectionIntro } from "@/components/shared/section-chrome";
import type { MidCtaTitleSegment, SpatialMidCtaContent } from "@/components/shared/arShowcaseTypes";

type Props = { content: SpatialMidCtaContent };

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

function segmentClass(tone: MidCtaTitleSegment["tone"] | undefined): string | undefined {
  switch (tone) {
    case "green":
      return "text-[#3DDC84]";
    case "saffron":
      return "text-sl-saffron";
    default:
      return undefined;
  }
}

/**
 * Shared mid-page CTA (stats + dual buttons) for Android / iPhone spatial marketing flows.
 */
export function SpatialMidCta({ content: c }: Props) {
  return (
    <section
      id={c.sectionId}
      aria-labelledby={c.headingId}
      className="relative scroll-mt-14 overflow-hidden bg-[#060606] pb-12 md:pb-20"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,153,51,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,153,51,.04) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
        aria-hidden
      />

      <div className="relative z-[2] mx-auto max-w-[760px] px-5 md:px-12">
        <SectionIntro
          id={c.headingId}
          eyebrow={c.eyebrow}
          eyebrowStyle="dash"
          align="center"
          title={
            <>
              {c.titleLines.map((line, li) => (
                <span key={li} className="block">
                  {line.segments.map((seg, si) => (
                    <span key={si} className={segmentClass(seg.tone)}>
                      {seg.text}
                    </span>
                  ))}
                </span>
              ))}
            </>
          }
          lead={c.lead}
          className="mb-10 [&_h3]:text-white [&_p]:max-w-[540px] [&_p]:text-[15px] [&_p]:leading-[1.7] [&_p]:text-white/50"
        />

        <div className="mb-10 flex flex-wrap justify-center gap-14 md:gap-16">
          {c.stats.map((s) => (
            <div key={s.label} className="text-center">
              <span className="mb-1.5 block font-sans text-[34px] font-bold leading-none text-sl-saffron">
                {s.value}
              </span>
              <span className="font-mono text-[8px] tracking-[0.15em] text-white/30 uppercase">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <CtaLink
            href={c.primaryCta.href}
            className="inline-flex items-center gap-2 rounded-[5px] bg-sl-saffron px-8 py-3.5 font-sans text-xs font-semibold tracking-[0.07em] text-white uppercase shadow-[0_0_24px_rgba(255,153,51,.28)] transition-colors hover:bg-[#E68A1F]"
          >
            {c.primaryCta.label}
          </CtaLink>
          <CtaLink
            href={c.secondaryCta.href}
            className="inline-flex items-center gap-2 rounded-[5px] border border-white/25 bg-transparent px-8 py-3.5 font-sans text-xs font-semibold tracking-[0.07em] text-white/80 uppercase transition-all hover:border-sl-saffron hover:bg-[rgba(255,153,51,.06)] hover:text-sl-saffron"
          >
            {c.secondaryCta.label}
          </CtaLink>
        </div>
      </div>
    </section>
  );
}

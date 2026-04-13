"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { SectionIntro } from "@/components/shared/section-chrome";
import type { FlutterOneCodebaseCtaContent } from "./content";

type Props = {
  content: FlutterOneCodebaseCtaContent;
};

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

export function FlutterOneCodebaseCta({ content: c }: Props) {
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
              {c.titleLine1}
              <br />
              <span className="text-sl-saffron">{c.titleHighlight}</span>
            </>
          }
          lead={c.lead}
          className="mb-10 [&_p]:max-w-[540px] [&_p]:text-[15px] [&_p]:leading-[1.7] [&_p]:text-white/50"
        />

        <div className="mx-auto mb-10 flex max-w-[480px] items-center justify-center gap-4">
          <div className="min-w-0 flex-1 rounded-lg border border-[rgba(84,197,248,.25)] bg-[rgba(84,197,248,.1)] px-3.5 py-3.5 text-center font-mono text-[9px] tracking-[0.1em] text-[rgba(84,197,248,.9)] uppercase">
            <div className="mb-1 text-[11px] font-semibold">DART / FLUTTER</div>
            <div className="text-[8px] opacity-70">One Codebase</div>
          </div>
          <span className="shrink-0 font-mono text-sm text-[rgba(255,153,51,.5)]" aria-hidden>
            →
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="rounded-lg border border-white/10 bg-white/[0.06] px-2.5 py-2.5 text-center font-mono text-[9px] font-semibold text-white/75 uppercase">
              <div>iOS + ARKit</div>
              <div className="mt-0.5 text-[7px] text-white/45">App Store</div>
            </div>
            <div className="rounded-lg border border-[rgba(61,220,132,.25)] bg-[rgba(61,220,132,.1)] px-2.5 py-2.5 text-center font-mono text-[9px] font-semibold text-[rgba(61,220,132,.9)] uppercase">
              <div>Android + ARCore</div>
              <div className="mt-0.5 text-[7px] opacity-60">Play Store</div>
            </div>
          </div>
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-12">
          {c.stats.map((s) => (
            <div key={s.label} className="text-center">
              <span className="mb-1.5 block font-sans text-[32px] font-bold leading-none text-sl-saffron">
                {s.value}
              </span>
              <span className="font-mono text-[8px] tracking-[0.15em] text-white/40 uppercase">
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

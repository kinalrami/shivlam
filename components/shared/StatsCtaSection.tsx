"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { SectionIntro } from "@/components/shared/section-chrome";

export type StatsCtaItem = { value: string; label: string };
export type StatsCtaLink = { label: string; href: string };

type CommonProps = {
  sectionId?: string;
  headingId?: string;
  stats: readonly StatsCtaItem[];
  primaryCta: StatsCtaLink;
  secondaryCta: StatsCtaLink;
};

type SectionIntroVariant = CommonProps & {
  introVariant: "sectionIntro";
  eyebrow: string;
  title: ReactNode;
  lead: string | null;
  introClassName?: string;
};

type SimpleVariant = CommonProps & {
  introVariant: "simple";
  eyebrow: string;
  title: ReactNode;
  lead: string | null;
  eyebrowClassName?: string;
  titleClassName?: string;
  leadClassName?: string;
};

type Props = (SectionIntroVariant | SimpleVariant) & {
  sectionClassName?: string;
  containerClassName?: string;
  statsWrapClassName?: string;
  statCardClassName?: string;
  statValueClassName?: string;
  statLabelClassName?: string;
  buttonsWrapClassName?: string;
  primaryBtnClassName?: string;
  secondaryBtnClassName?: string;
};

function LinkOrAnchor({
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
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={className}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

export function StatsCtaSection(props: Props) {
  const outerClassName = props.sectionClassName ?? "bg-[#060606]";
  const innerClassName = props.containerClassName ?? "mx-auto max-w-325 px-5 py-18 text-center md:px-12 md:py-24";

  const statsWrapClassName = props.statsWrapClassName ?? "mt-8 flex flex-wrap justify-center gap-4";
  const statCardClassName =
    props.statCardClassName ?? "rounded-xl border border-white/6 bg-white/[0.02] px-6 py-4 text-center";
  const statValueClassName = props.statValueClassName ?? "font-sans text-2xl font-bold tracking-tight text-orange-400";
  const statLabelClassName =
    props.statLabelClassName ?? "mt-1 font-mono text-[10px] tracking-[0.15em] text-white/35 uppercase";

  const buttonsWrapClassName = props.buttonsWrapClassName ?? "mt-9 flex flex-wrap justify-center gap-3";
  const primaryBtnClassName =
    props.primaryBtnClassName ??
    "inline-flex items-center justify-center rounded-md border border-orange-400 bg-orange-400 px-8 py-3.5 text-[13px] font-semibold tracking-[0.07em] text-white uppercase shadow-[0_0_24px_rgb(245_138_11/0.35)] transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_44px_rgb(245_138_11/0.55)]";
  const secondaryBtnClassName =
    props.secondaryBtnClassName ??
    "inline-flex items-center justify-center rounded-md border-[1.5px] border-white/15 bg-transparent px-8 py-3.5 text-[13px] font-medium tracking-[0.07em] text-white/65 uppercase transition-[border-color,color,transform] duration-200 hover:-translate-y-0.5 hover:border-orange-400/60 hover:text-orange-400";

  return (
    <section
      id={props.sectionId}
      aria-labelledby={props.headingId}
      className={outerClassName}
    >
      <div className={innerClassName}>
        {props.introVariant === "sectionIntro" ? (
          <SectionIntro
            id={props.headingId ?? ""}
            eyebrow={props.eyebrow}
            eyebrowStyle="dash"
            align="center"
            title={props.title}
            lead={props.lead}
            className={
              props.introClassName ??
              "mb-10 [&_h3]:text-white [&_p]:max-w-[540px] [&_p]:text-[15px] [&_p]:leading-[1.7] [&_p]:text-white/50"
            }
          />
        ) : (
          <>
            <div className="mb-4 inline-flex items-center justify-center gap-2">
              <span className="h-0.5 w-5 bg-sl-saffron" aria-hidden />
              <span className={props.eyebrowClassName ?? "font-label text-xs font-medium uppercase text-sl-saffron"}>
                {props.eyebrow}
              </span>
            </div>
            <div className={props.titleClassName ?? "font-sans text-[clamp(1.8rem,4vw,2.75rem)] font-extrabold leading-tight tracking-tight text-white"}>
              {props.title}
            </div>
            {props.lead ? (
              <p className={props.leadClassName ?? "mx-auto mt-4 max-w-xl text-sm leading-relaxed font-light text-white/45 md:text-base"}>
                {props.lead}
              </p>
            ) : null}
          </>
        )}

        <div className={statsWrapClassName}>
          {props.stats.map((s) => (
            <div key={`${s.value}-${s.label}`} className={statCardClassName}>
              <span className={statValueClassName}>{s.value}</span>
              <span className={statLabelClassName}>{s.label}</span>
            </div>
          ))}
        </div>

        <div className={buttonsWrapClassName}>
          <LinkOrAnchor href={props.primaryCta.href} className={primaryBtnClassName}>
            {props.primaryCta.label}
          </LinkOrAnchor>
          <LinkOrAnchor href={props.secondaryCta.href} className={secondaryBtnClassName}>
            {props.secondaryCta.label}
          </LinkOrAnchor>
        </div>
      </div>
    </section>
  );
}


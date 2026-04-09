"use client";

import type { ReactNode, RefObject } from "react";
import { MapPin, Phone } from "lucide-react";
import { ArbimReveal } from "@/components/views/ar-bim/Motion";

export type MidBannerCtaReveal = "arbim" | "about";

function AboutReveal({
  stepIndex,
  children,
}: {
  stepIndex: number;
  children: ReactNode;
}) {
  return (
    <div
      data-about-reveal
      {...(stepIndex > 0 ? { "data-about-delay": String(stepIndex) } : {})}
    >
      {children}
    </div>
  );
}

export type MidBannerCtaProps = {
  sectionId: string;
  /** Passed to section when set (e.g. cta-heading for aria-labelledby) */
  ariaLabelledBy?: string;
  canvasRef?: RefObject<HTMLCanvasElement | null>;
  canvasId?: string;
  reveal: MidBannerCtaReveal;
  badge: string;
  title: ReactNode;
  showPhoneIcon?: boolean;
  /** Icon between divider lines when `showPhoneIcon` is true. */
  centerIcon?: "phone" | "mapPin";
  /** Merged onto the default heading classes (e.g. serif display). */
  headingClassName?: string;
  body: ReactNode;
  actions: ReactNode;
  sectionClassName?: string;
};

export function MidBannerCta({
  sectionId,
  ariaLabelledBy,
  canvasRef,
  canvasId,
  reveal,
  badge,
  title,
  showPhoneIcon = false,
  centerIcon = "phone",
  headingClassName = "",
  body,
  actions,
  sectionClassName = "",
}: MidBannerCtaProps) {
  const baseSection =
    "relative scroll-mt-14 overflow-hidden bg-[#060606] py-12";
  const inner = "relative z-5 mx-auto max-w-200 px-5 text-center md:px-12";

  const headingBase =
    "mb-4 text-2xl leading-tight font-bold text-white md:mb-4.5 md:text-5xl";
  const headingClass = [headingBase, headingClassName].filter(Boolean).join(" ");

  const phoneRow = (
    <div className="mb-9 flex items-center justify-center gap-4">
      <span className="h-px max-w-30 flex-1 bg-linear-to-r from-transparent to-orange-400/30" />
      <span className="flex size-8 items-center justify-center rounded-full border border-orange-400/30">
        {centerIcon === "mapPin" ? (
          <MapPin className="size-3.5 stroke-orange-400 stroke-2" aria-hidden />
        ) : (
          <Phone className="size-3.5 stroke-orange-400 stroke-2" aria-hidden />
        )}
      </span>
      <span className="h-px max-w-30 flex-1 bg-linear-to-l from-transparent to-orange-400/30" />
    </div>
  );

  if (reveal === "arbim") {
    return (
      <section
        id={sectionId}
        className={`${baseSection} ${sectionClassName}`.trim()}
        {...(ariaLabelledBy ? { "aria-labelledby": ariaLabelledBy } : {})}
      >
        {canvasRef ? (
          <canvas
            id={canvasId}
            className="absolute inset-0 z-0 h-full w-full"
            ref={canvasRef}
          />
        ) : null}
        <div className={inner}>
          <ArbimReveal delayStep={1}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-sm border border-orange-400/30 bg-orange-400/6 px-3.5 py-1.5 font-mono text-[9px] tracking-[0.22em] text-orange-400 uppercase">
              <span
                className="size-1.5 rounded-full bg-orange-400 animate-[arbim-landing-bpulse_1.8s_ease-in-out_infinite]"
                aria-hidden
              />
              {badge}
            </div>
          </ArbimReveal>

          <ArbimReveal delayStep={2}>
            <h2 className={headingClass}>
              {title}
            </h2>
          </ArbimReveal>

          {showPhoneIcon ? (
            <ArbimReveal delayStep={3}>{phoneRow}</ArbimReveal>
          ) : null}

          <ArbimReveal delayStep={3}>
            <div className="mb-9 text-[15px] leading-[1.75] text-white/45 md:mb-9">
              {body}
            </div>
          </ArbimReveal>

          <ArbimReveal
            delayStep={4}
            className="flex flex-wrap items-center justify-center gap-3.5"
          >
            {actions}
          </ArbimReveal>
        </div>
      </section>
    );
  }

  const s0 = 0;
  const s1 = 1;
  const sPhone = 2;
  const sBody = showPhoneIcon ? 3 : 2;
  const sActions = showPhoneIcon ? 4 : 3;

  return (
    <section
      id={sectionId}
      className={`${baseSection} ${sectionClassName}`.trim()}
      {...(ariaLabelledBy ? { "aria-labelledby": ariaLabelledBy } : {})}
    >
      {canvasRef ? (
        <canvas
          id={canvasId}
          className="absolute inset-0 z-0 h-full w-full"
          ref={canvasRef}
        />
      ) : null}
      <div className={inner}>
        <AboutReveal stepIndex={s0}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-sm border border-orange-400/30 bg-orange-400/6 px-3.5 py-1.5 font-mono text-[9px] tracking-[0.22em] text-orange-400 uppercase">
            <span
              className="size-1.5 rounded-full bg-orange-400 animate-[arbim-landing-bpulse_1.8s_ease-in-out_infinite]"
              aria-hidden
            />
            {badge}
          </div>
        </AboutReveal>

        <AboutReveal stepIndex={s1}>
          <h2
            {...(ariaLabelledBy ? { id: ariaLabelledBy } : {})}
            className={headingClass}
          >
            {title}
          </h2>
        </AboutReveal>

        {showPhoneIcon ? (
          <AboutReveal stepIndex={sPhone}>{phoneRow}</AboutReveal>
        ) : null}

        <AboutReveal stepIndex={sBody}>
          <div className="mb-9 text-[15px] leading-[1.75] text-white/45 md:mb-9">
            {body}
          </div>
        </AboutReveal>

        <AboutReveal stepIndex={sActions}>
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            {actions}
          </div>
        </AboutReveal>
      </div>
    </section>
  );
}

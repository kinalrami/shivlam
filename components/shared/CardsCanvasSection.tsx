"use client";

import type { RefObject, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { ArbimReveal } from "@/components/views/ar-bim/Motion";
import { SectionIntro } from "@/components/shared/section-chrome";

export type CardsCanvasSectionCard = {
  title: string;
  body: string;
  tag: string;
  icon?: LucideIcon;
};

type Props = {
  id: string;
  headingId: string;
  eyebrow: string;
  title: ReactNode;
  lead: string;
  cards: readonly CardsCanvasSectionCard[];

  canvasId: string;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  canvasClassName?: string;

  footerLeft?: ReactNode;
  footerRight?: ReactNode;

  /** Optional overlay rendered above the canvas (e.g., HUD chips). */
  canvasOverlay?: ReactNode;
};

/** Shared "cards-left / canvas-right" section (used by multiple services). */
export function CardsCanvasSection({
  id,
  headingId,
  eyebrow,
  title,
  lead,
  cards,
  canvasId,
  canvasRef,
  canvasClassName,
  footerLeft,
  footerRight,
  canvasOverlay,
}: Props) {
  return (
    <section id={id} className="scroll-mt-14 overflow-hidden bg-[#060606] py-12 md:py-20">
      <div className="mx-auto max-w-325 px-5 md:px-12">
        <ArbimReveal delayStep={1}>
          <SectionIntro
            id={headingId}
            eyebrow={eyebrow}
            eyebrowStyle="dash"
            title={title}
            lead={lead}
          />
        </ArbimReveal>

        <div className="mt-12 grid items-center gap-16 lg:grid-cols-2 lg:gap-18">
          <div className="flex flex-col gap-4">
            {cards.map((card, i) => {
              const Icon = card.icon;
              return (
                <ArbimReveal key={`${card.title}-${i}`} delayStep={i + 2}>
                  <div
                    data-arbim-cursor
                    className="flex gap-5 rounded-[10px] border border-white/10 bg-linear-to-b from-[#0a0f18]/95 to-[#060606] px-6 py-6 shadow-[0_18px_60px_rgb(0_0_0/0.35)] transition-[border-color,transform,box-shadow] hover:translate-x-1 hover:border-orange-400/30 hover:shadow-[0_18px_70px_rgb(0_0_0/0.45)]"
                  >
                    <div className="flex size-11.5 shrink-0 items-center justify-center rounded-[10px] border border-white/10 bg-white/3">
                      {Icon ? (
                        <Icon className="size-5 stroke-orange-400 stroke-[1.8]" aria-hidden />
                      ) : (
                        <span className="size-5" aria-hidden />
                      )}
                    </div>
                    <div>
                      <div className="mb-1.5 font-sans text-base font-bold text-sl-text">
                        {card.title}
                      </div>
                      <p className="text-[13px] leading-[1.7] text-sl-muted">{card.body}</p>
                      <span className="mt-2.5 inline-block rounded-sm border border-orange-400/25 bg-orange-400/6 px-1.5 py-0.5 font-mono text-[8px] tracking-[0.14em] text-orange-400 uppercase">
                        {card.tag}
                      </span>
                    </div>
                  </div>
                </ArbimReveal>
              );
            })}
          </div>

          <ArbimReveal delayStep={2} className="relative h-120 min-h-80">
            <canvas
              id={canvasId}
              ref={canvasRef}
              className={[
                "h-full w-full rounded-xl border border-[#1b3055]/60",
                canvasClassName,
              ]
                .filter(Boolean)
                .join(" ")}
            />
            {canvasOverlay}
            {(footerLeft || footerRight) && (
              <div className="absolute bottom-2 left-4 right-4 flex items-center justify-between gap-3 px-4 py-3 font-mono text-[8px] tracking-[0.16em] uppercase">
                <span className="text-cyan-400/90">{footerLeft}</span>
                <span className="text-orange-400/95">{footerRight}</span>
              </div>
            )}
          </ArbimReveal>
        </div>
      </div>
    </section>
  );
}


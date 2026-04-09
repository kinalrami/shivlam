"use client";

import type { RefObject } from "react";
import { Activity, Home, LayoutGrid } from "lucide-react";
import { ArbimReveal } from "@/components/views/ar-bim/Motion";
import { SectionIntro } from "@/components/shared/section-chrome";

type Props = {
  floorCvRef: RefObject<HTMLCanvasElement | null>;
};

const icons = [Home, Activity, LayoutGrid] as const;

const cards = [
  {
    title: "Sustainable retrofitting",
    body: "Reconstructing old structures to integrate modern, green energy systems. LiDAR-accurate models enable precise retrofit planning — from HVAC routes to solar panel load calculations.",
    tag: "GREEN ENERGY · RETROFIT",
  },
  {
    title: "Analytical modeling",
    body: "High-level simulation of airflow, cooling, and structural integrity. Feed your reconstructed models directly into CFD and FEA pipelines for engineering-grade analysis.",
    tag: "CFD · FEA · SIMULATION",
  },
  {
    title: "Floor plan automation",
    body: "Generating precise 2D/3D layouts directly from iPad LiDAR feeds. Room boundaries, wall thicknesses, and MEP routes auto-classified and exported in minutes.",
    tag: "AUTO-CLASSIFY · DXF · PDF",
  },
] as const;

/** Cards + canvas chrome match `ar-bim/Spec.tsx` (same classes / layout patterns). */
export default function Analytics({ floorCvRef }: Props) {
  return (
    <section
      id="recon-analytics"
      className="scroll-mt-14 overflow-hidden bg-[#060606] py-12 md:py-20"
    >
      <div className="mx-auto max-w-325 px-5 md:px-12">
        <ArbimReveal delayStep={1}>
          <SectionIntro
            id="recon-analytics-heading"
            eyebrow="Analytical specialisation"
            eyebrowStyle="dash"
            title={
              <>
                Deep Analytics. <span className="text-sl-saffron">Sustainable Solutions.</span>
              </>
            }
            lead="Specialised workflows for retrofit planning, simulation handoff, and automated plan generation — grounded in dense spatial truth."
          />
        </ArbimReveal>

        <div className="mt-12 grid items-center gap-16 lg:grid-cols-2 lg:gap-18">
          <div className="flex flex-col gap-4">
            {cards.map((card, i) => {
              const Icon = icons[i] ?? Home;
              return (
                <ArbimReveal key={card.title} delayStep={i + 2}>
                  <div
                    data-arbim-cursor
                    className="flex gap-5 rounded-[10px] border border-white/10 bg-linear-to-b from-[#0a0f18]/95 to-[#060606] px-6 py-6 shadow-[0_18px_60px_rgb(0_0_0/0.35)] transition-[border-color,transform,box-shadow] hover:translate-x-1 hover:border-orange-400/30 hover:shadow-[0_18px_70px_rgb(0_0_0/0.45)]"
                  >
                    <div className="flex size-11.5 shrink-0 items-center justify-center rounded-[10px] border border-white/10 bg-white/3">
                      <Icon className="size-5 stroke-orange-400 stroke-[1.8]" aria-hidden />
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
              id="recon-fp-cv"
              ref={floorCvRef}
              className="h-full w-full rounded-xl border border-[#1b3055]/60"
            />
            <div className="absolute bottom-2 left-4 right-4 flex items-center justify-between gap-3 px-4 py-3 font-mono text-[8px] tracking-[0.16em] uppercase">
              <span className="text-cyan-400/90">Floor_plan: GF_BLOCK_A</span>
              <span className="flex items-center gap-1.5 text-orange-400/95">
                <span className="size-1 shrink-0 rounded-full bg-orange-400" aria-hidden />
                Hover room for data →
              </span>
            </div>
          </ArbimReveal>
        </div>
      </div>
    </section>
  );
}

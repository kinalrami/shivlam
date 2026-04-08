"use client";

import type { RefObject } from "react";
import { Box, CircleAlert, Smartphone } from "lucide-react";
import { ArbimReveal } from "./Motion";
import { SectionIntro } from "@/components/shared/section-chrome";

type Props = {
  specCvRef: RefObject<HTMLCanvasElement | null>;
};

const icons = [Box, CircleAlert, Smartphone] as const;

export default function Spec({ specCvRef }: Props) {
  const overlay = [
    { value: "±2cm", label: "Spatial Accuracy" },
    { value: "60fps", label: "AR Render Rate" },
    { value: "IFC·RVT", label: "BIM Standards" },
  ] as const;

  const cards = [
    {
      title: "3D Reconstruction",
      body: "High-fidelity modeling for sustainable retrofitting. LiDAR-captured point clouds converted into precise BIM deliverables — IFC, RVT, and NWD ready.",
      tag: "LIDAR · POINT CLOUD",
    },
    {
      title: "AR VR Solution",
      body: "Interactive walkthroughs and immersive stakeholder validation. From design review to construction sign-off — fully spatial, fully real.",
      tag: "AR · VR · UNITY",
    },
    {
      title: "LiDAR Device Support",
      body: "Native integration with Swift and Unity for zero-latency iOS performance. Full support for iPhone Pro and iPad Pro LiDAR sensors.",
      tag: "SWIFT · XCODE · ARKIT",
    },
  ] as const;

  return (
    <section
      id="arbim-spec"
      className="scroll-mt-14 overflow-hidden bg-[#060606] py-12 md:py-20"
    >
      <div className="mx-auto max-w-325 px-5 md:px-12">
        <ArbimReveal delayStep={1}>
          <SectionIntro
            id="arbim-spec-heading"
            eyebrow="Specialisation"
            eyebrowStyle="dash"
            title={
              <>
                Advanced <span className="text-sl-saffron">AR VR Solutions</span>
              </>
            }
            lead="High-fidelity 3D reconstruction, immersive walkthroughs, and LiDAR-ready device support — shipped with field-first performance."
          />
        </ArbimReveal>

        <div className="grid items-center gap-16 md:grid-cols-2 md:gap-18">
          <ArbimReveal delayStep={3} className="relative h-120">
            <canvas
              id="arbim-spec-cv"
              ref={specCvRef}
              className="h-full w-full rounded-xl border border-[#1b3055]/60"
            />
            <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-3 rounded-lg border border-orange-400/20 bg-black/92 px-4 py-3.5">
              {overlay.map((o) => (
                <div key={o.label}>
                  <div className="font-sans text-lg font-extrabold leading-none text-orange-400">
                    {o.value}
                  </div>
                  <div className="mt-0.5 font-mono text-[8px] leading-none tracking-[0.12em] text-white/35 uppercase">
                    {o.label}
                  </div>
                </div>
              ))}
            </div>
          </ArbimReveal>

          <div className="flex flex-col gap-4">
            {cards.map((card, i) => {
              const Icon = icons[i] ?? Box;
              return (
                <ArbimReveal key={card.title} delayStep={i + 3}>
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
                      <p className="text-[13px] leading-[1.7] text-sl-muted">
                        {card.body}
                      </p>
                      <span className="mt-2.5 inline-block rounded-sm border border-orange-400/25 bg-orange-400/6 px-1.5 py-0.5 font-mono text-[8px] tracking-[0.14em] text-orange-400 uppercase">
                        {card.tag}
                      </span>
                    </div>
                  </div>
                </ArbimReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

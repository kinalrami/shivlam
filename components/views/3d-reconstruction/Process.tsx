"use client";

import type { RefObject } from "react";
import { ArbimReveal } from "@/components/views/ar-bim/Motion";
import { SectionIntro } from "@/components/shared/section-chrome";
import { RECON_PROCESS_TECH } from "./constants";

type Props = {
  processCvRef: RefObject<HTMLCanvasElement | null>;
};

const steps = [
  {
    n: "01",
    title: "Rapid field scanning",
    body: "Swift-native capture workflows on iPhone and iPad Pro — millimeter-class geometry with ARKit-class tracking for repeatable site coverage.",
    tags: ["SWIFT", "ARKIT", "LIDAR"] as const,
  },
  {
    n: "02",
    title: "Point cloud processing",
    body: "Registration, noise rejection, and mesh extraction that preserves edges inspectors care about — not smoothed toy surfaces.",
    tags: ["PCL", "MESHING", "TOPOLOGY"] as const,
  },
  {
    n: "03",
    title: "Legacy-to-BIM conversion",
    body: "Topology cleanup and classification so your data lands in IFC, Revit, or Navisworks with predictable layers and deliverable naming.",
    tags: ["IFC", "RVT", "NWD"] as const,
  },
] as const;

export default function Process({ processCvRef }: Props) {
  return (
    <section
      id="recon-process"
      className="scroll-mt-14 overflow-hidden bg-[#060606] py-12 md:py-20"
    >
      <div className="mx-auto max-w-325 px-5 md:px-12">
        <ArbimReveal delayStep={1}>
          <SectionIntro
            id="recon-process-heading"
            eyebrow="LIDAR-powered precision"
            eyebrowStyle="dash"
            title={
              <>
                From iPad Pro to{" "}
                <span className="text-sl-saffron">production-ready models.</span>
              </>
            }
            lead="A three-stage pipeline from on-site capture through cleaned geometry to BIM-grade exports — with QA checkpoints your team can sign off."
          />
        </ArbimReveal>

        <div className="mt-12 grid items-stretch gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <div
              className="absolute top-8 bottom-8 left-[19px] w-px bg-orange-400/35"
              aria-hidden
            />
            <div className="flex flex-col gap-8">
              {steps.map((s, i) => (
                <ArbimReveal key={s.n} delayStep={i + 2}>
                  <div data-arbim-cursor className="relative flex gap-5 pl-15">
                    <div className="absolute left-0 top-1 flex size-10 items-center justify-center rounded-full border-2 border-orange-400/45 bg-[#060606] font-mono text-[11px] font-semibold tracking-widest text-orange-400">
                      {s.n}
                    </div>
                    <div className="pt-2">
                      <h3 className="font-sans text-lg font-bold text-sl-text">{s.title}</h3>
                      <p className="mt-2 text-[13px] leading-[1.75] text-sl-muted">{s.body}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {s.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-sm border border-orange-400/25 bg-orange-400/6 px-2.5 py-0.5 font-mono text-[8px] tracking-[0.14em] text-orange-400 uppercase"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </ArbimReveal>
              ))}
            </div>
          </div>

          <ArbimReveal delayStep={2} className="relative flex min-h-80 flex-col">
            <div className="relative min-h-80 flex-1 overflow-hidden rounded-xl border border-[#1b3055]/50 bg-[#040b14] shadow-[0_20px_60px_rgb(10_22_40/0.12)]">
              <canvas
                id="recon-proc-cv"
                ref={processCvRef}
                className="h-full min-h-80 w-full"
              />
              <div className="absolute inset-x-0 bottom-0 grid grid-cols-3 gap-px border-t border-white/10 bg-black/88 px-1 py-3 backdrop-blur-sm">
                {[
                  { v: "±2mm", l: "ACCURACY" },
                  { v: "2.4M", l: "POINTS/SCAN" },
                  { v: "IFC", l: "OUTPUT FORMAT" },
                ].map((m) => (
                  <div key={m.l} className="border-r border-white/10 px-3 text-center last:border-r-0">
                    <div className="font-sans text-lg font-extrabold text-orange-400">{m.v}</div>
                    <div className="mt-0.5 font-mono text-[8px] tracking-[0.12em] text-white/40 uppercase">
                      {m.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ArbimReveal>
        </div>

        <ArbimReveal delayStep={4} className="mt-12 flex flex-wrap gap-2.5">
          {RECON_PROCESS_TECH.map((tpl) => (
            <span
              key={tpl}
              data-arbim-cursor
              className="inline-flex cursor-default items-center gap-2 rounded-md border border-white/10 bg-white/3 px-4 py-2.5 font-mono text-[11px] tracking-widest text-white/70 transition-[border-color,color,background,transform] hover:-translate-y-0.5 hover:border-orange-400/50 hover:bg-orange-400/5 hover:text-orange-400"
            >
              <span className="size-1.5 rounded-full bg-orange-400/70" aria-hidden />
              {tpl}
            </span>
          ))}
        </ArbimReveal>
      </div>
    </section>
  );
}

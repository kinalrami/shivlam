"use client";

import { useEffect, useRef } from "react";
import { ArbimReveal } from "@/components/views/ar-bim/Motion";
import { SectionIntro } from "@/components/shared/section-chrome";
import { attachArVrCaseCanvas } from "@/components/views/ar-vr-solution/useCasesCanvas";
import { ARVR_USE_CASES } from "@/components/views/ar-vr-solution/constants";

export default function UseCases() {
  const cv0 = useRef<HTMLCanvasElement>(null);
  const cv1 = useRef<HTMLCanvasElement>(null);
  const cv2 = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c0 = cv0.current;
    const c1 = cv1.current;
    const c2 = cv2.current;
    if (!c0 || !c1 || !c2) return;
    const d0 = attachArVrCaseCanvas(c0, "walk");
    const d1 = attachArVrCaseCanvas(c1, "clash");
    const d2 = attachArVrCaseCanvas(c2, "train");
    return () => {
      d0?.();
      d1?.();
      d2?.();
    };
  }, []);

  return (
    <section id="arvr-cases" className="scroll-mt-14 overflow-hidden bg-[#060606] py-12 md:py-20">
      <div className="mx-auto max-w-325 px-5 md:px-12">
        <ArbimReveal delayStep={1}>
          <SectionIntro
            id="arvr-cases-heading"
            eyebrow="Specialisation use cases"
            eyebrowStyle="dash"
            title={
              <>
                From 3D Reconstruction
                <br />
                to <span className="text-sl-saffron">Digital Twins.</span>
              </>
            }
            lead="Three production-ready workflows — each designed for fast stakeholder alignment, precise spatial QA, and operational training at scale."
          />
        </ArbimReveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {ARVR_USE_CASES.map((c, idx) => {
            const ref = idx === 0 ? cv0 : idx === 1 ? cv1 : cv2;
            return (
              <ArbimReveal key={c.title} delayStep={idx + 2}>
                <div className="group relative h-[260px] overflow-hidden rounded-[10px] border border-white/10 bg-linear-to-b from-[#0a0f18]/95 to-[#060606] shadow-[0_18px_60px_rgb(0_0_0/0.35)] transition-[border-color,transform,box-shadow] hover:translate-x-1 hover:border-orange-400/30 hover:shadow-[0_18px_70px_rgb(0_0_0/0.45)]">
                  <canvas
                    ref={ref}
                    data-type={c.type}
                    className="absolute inset-0 h-full w-full opacity-20"
                  />
                  <div
                    className="pointer-events-none absolute inset-0"
                    aria-hidden
                  />
                  <div className="relative p-5 flex flex-col justify-end h-full">
                    <div className="mb-3 w-fit inline-flex rounded-sm border border-orange-400/25 bg-orange-400/6 px-2 py-1 font-mono text-[8px] tracking-[0.22em] text-orange-400 uppercase">
                      {c.tag}
                    </div>
                    <div className="font-sans text-[16px] font-extrabold tracking-tight text-white">
                      {c.title}
                    </div>
                    <p className="mt-2 text-[12px] leading-[1.65] text-white/50">{c.desc}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {c.pills.map((p) => (
                        <span
                          key={p}
                          className="rounded-sm border border-cyan-300/15 bg-cyan-300/[0.06] px-2 py-1 font-mono text-[8px] tracking-[0.18em] text-cyan-100/70 uppercase"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ArbimReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}


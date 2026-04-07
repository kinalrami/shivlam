"use client";

import type { RefObject } from "react";
import { ARBIM_STACK_PILLS } from "./constants";
import { ArbimReveal } from "./Motion";

type Props = {
  stackCvRef: RefObject<HTMLCanvasElement | null>;
};

export default function Stack({ stackCvRef }: Props) {
  const points = [
    {
      value: "10+",
      text: "Years of Corporate Leadership — deep domain expertise across enterprise-grade technology.",
    },
    {
      value: "3+",
      text: "Years of Focused Innovation at Shivlam — building scalable systems for the real world.",
    },
    {
      value: "50+",
      text: "Projects Successfully Shipped — from AR mobile apps to enterprise web platforms.",
    },
  ] as const;

  return (
    <section id="arbim-stack" className="scroll-mt-14 bg-[#060606] py-12 md:py-20">
      <div className="mx-auto max-w-325 px-5 md:px-12">
        <ArbimReveal delayStep={1}>
          <div className="mb-3.5 flex items-center gap-2 font-mono text-[9px] tracking-[0.22em] text-orange-400 uppercase">
            <span className="h-0.5 w-5 bg-orange-400" aria-hidden />
            TECHNICAL STACK & EXPERIENCE
          </div>
        </ArbimReveal>

        <ArbimReveal delayStep={2}>
          <h2 className="mb-12 font-sans text-[clamp(1.5rem,3.2vw,2.75rem)] leading-tight font-extrabold tracking-[-0.025em] md:mb-13">
            <span className="text-white">
              Scalable Tech Services <br />
              <span className="text-orange-400">for Bharat</span>
            </span>
          </h2>
        </ArbimReveal>

        <div className="grid items-start gap-16 md:grid-cols-2 md:gap-18">
          <ArbimReveal delayStep={3}>
            <div className="flex flex-col">
              {points.map((p) => (
                <div
                  key={p.text}
                  className="flex items-center gap-4 border-b border-white/5 py-5 last:border-b-0"
                >
                  <div className="min-w-20 font-sans text-[32px] leading-none font-extrabold text-orange-400">
                    {p.value}
                  </div>
                  <p className="text-sm leading-snug text-white/55">{p.text}</p>
                </div>
              ))}
            </div>
          </ArbimReveal>

          <div>
            <ArbimReveal delayStep={3}>
              <div className="mb-6 mt-2 font-sans text-[17px] font-bold text-white">
                Our Core Technology Stack
              </div>
            </ArbimReveal>
            <ArbimReveal delayStep={3}>
              <div className="mb-9 flex flex-wrap gap-2.5">
                {ARBIM_STACK_PILLS.map((pill) => (
                  <span
                    key={pill}
                    data-arbim-cursor
                    className="cursor-default rounded-md border border-white/10 bg-white/3 px-5 py-2.5 font-mono text-[11px] tracking-widest text-white/70 transition-[border-color,color,background,transform] hover:-translate-y-0.5 hover:border-orange-400/50 hover:bg-orange-400/5 hover:text-orange-400"
                  >
                    <span className="mr-1.5 inline-block size-1.5 rounded-full bg-orange-400/70" />
                    {pill}
                  </span>
                ))}
              </div>
            </ArbimReveal>
            <canvas
              id="arbim-stack-cv"
              ref={stackCvRef}
              className="block h-65 w-full rounded-[10px] border border-[#1b3055]/55 bg-[#0d1d38]/90"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

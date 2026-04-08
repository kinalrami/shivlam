"use client";

import Image from "next/image";
import { CircleCheckBig, MoveRight, TrendingUp } from "lucide-react";
import { ArbimReveal } from "./Motion";
import { SectionIntro } from "@/components/shared/section-chrome";

export default function Product() {
  const results = [
    {
      title: "Detect clashes",
      body: "Validate every layer before a brick is laid. AR clash detection eliminates costly on-site surprises.",
    },
    {
      title: "Reduce rework",
      body: "Proven to cut on-site rework by up to 40% by surfacing deviations before they escalate.",
    },
  ] as const;

  const chips = [
    "Δ CLASH DETECTED · MEP/STRUCT",
    "◎ ROOM SCAN 98.2% COMPLETE",
    "✓ IFC MODEL ANCHORED",
  ] as const;

  return (
    <section
      id="arbim-product"
      className="scroll-mt-14 overflow-hidden bg-[#060606] py-12 md:py-20"
    >
      <div className="mx-auto max-w-325 px-5 md:px-12">
        <ArbimReveal delayStep={1}>
          <SectionIntro
            id="arbim-product-heading"
            eyebrow="Product integration"
            eyebrowStyle="dash"
            title={
              <>
                DeltaARBIM:
                <br />
                <span className="text-sl-saffron">One of the Best Products We Built.</span>
              </>
            }
            lead="An AI-powered BIM viewer that overlays live 3D building models — including structure, walls, and MEP pipes — directly onto real construction sites through your device camera."
          />
        </ArbimReveal>

        <div className="grid items-center gap-16 md:grid-cols-2 md:gap-18">
          <div>
            <ArbimReveal delayStep={3}>
              <div className="mb-5 inline-flex items-center gap-2 rounded-sm border border-orange-400/35 bg-orange-400/6 px-3 py-1 font-mono text-[8.5px] tracking-[0.18em] text-orange-400 uppercase">
                <span
                  className="size-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_#22c55e] animate-[arbim-landing-bpulse_1.4s_ease-in-out_infinite]"
                  aria-hidden
                />
                LIVE NOW · deltaarbim.tech
              </div>
            </ArbimReveal>

            <ArbimReveal delayStep={4}>
              <div className="mb-8 flex flex-col">
                {results.map((r) => (
                  <div
                    key={r.title}
                    data-arbim-cursor
                    className="flex items-start gap-3.5 border-b border-[#1b3055]/35 py-4 last:border-b-0"
                  >
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-orange-400/20 bg-orange-400/10">
                      {r.title === "Detect clashes" ? (
                        <CircleCheckBig
                          className="size-4 stroke-orange-400 stroke-2 text-transparent"
                          aria-hidden
                        />
                      ) : (
                        <TrendingUp className="size-4 stroke-orange-400 stroke-2" aria-hidden />
                      )}
                    </div>
                    <div>
                      <div className="mb-0.5 font-sans text-sm font-bold text-sl-text">
                        {r.title}
                      </div>
                      <p className="text-xs leading-snug text-sl-muted">{r.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ArbimReveal>

            <ArbimReveal delayStep={5}>
              <a
                data-arbim-cursor
                href="https://deltaarbim.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-md border border-[#1b3055]/55 px-5 py-2.5 font-mono text-[10px] tracking-[0.16em] text-sl-text uppercase transition-all duration-300 hover:border-orange-400 hover:text-orange-400 hover:shadow-[0_0_16px_rgb(245_138_11/0.15)]"
              >
                explore deltaarbim.tech <MoveRight />
              </a>
            </ArbimReveal>
          </div>

          <ArbimReveal delayStep={3} className="relative min-w-0">
            <div className="relative w-full min-w-0 overflow-hidden rounded-xl border border-[#1b3055]/60 bg-[#060606] shadow-[0_16px_52px_rgb(0_0_0/0.35)] ring-1 ring-cyan-400/10">
              <div className="relative aspect-16/10 w-full min-h-65 overflow-hidden bg-[#040e1e] max-md:min-h-70">
                <Image
                  src="/delta-full.jpeg"
                  alt="DeltaARBIM product preview"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={false}
                />

                <div className="pointer-events-none absolute bottom-3 left-3">
                  <div className="flex items-center gap-2 rounded-full border border-[#1b3055]/45 bg-[#0a0f18]/92 px-3 py-1 font-mono text-[8px] tracking-[0.14em] text-sl-muted uppercase">
                    <Image
                      src="/delta-logo.png"
                      alt=""
                      width={72}
                      height={20}
                      className="h-4.5 w-auto opacity-75"
                      unoptimized
                    />
                    built by Shivlam
                  </div>
                </div>
              </div>
            </div>
          </ArbimReveal>

          {/* <div className="pointer-events-none absolute -top-4 -right-4 z-10 hidden flex-col items-end gap-2 md:flex">
              {chips.map((c, i) => (
                <div
                  key={c}
                  className="font-mono text-[8px] tracking-widest whitespace-nowrap rounded-md border border-orange-400/30 bg-[#0d1d38]/90 px-3 py-1.5 text-orange-400 shadow-[0_4px_14px_rgb(0_0_0/0.3)]"
                  style={{
                    animation: `arbim-landing-chip-float 3s ease-in-out infinite`,
                    animationDelay: `${i * 0.9}s`,
                  }}
                >
                  {c}
                </div>
              ))}
            </div> */}

          {/* <div className="pointer-events-none absolute -bottom-3.5 left-0 right-0 z-10 flex justify-center px-2">
              <div className="flex items-center gap-2 rounded-full border border-[#1b3055]/45 bg-[#0a0f18]/95 px-3.5 py-1 font-mono text-[8px] tracking-[0.14em] text-sl-muted uppercase">
                <Image
                  src="/delta-logo.png"
                  alt=""
                  width={72}
                  height={20}
                  className="h-4.5 w-auto opacity-70"
                  unoptimized
                />
                built by Shivlam
              </div>
            </div> */}
        </div>
      </div>
    </section>
  );
}

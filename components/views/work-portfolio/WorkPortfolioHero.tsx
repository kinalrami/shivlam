"use client";

import { useEffect, useRef } from "react";
import { MoveRight } from "lucide-react";
import { attachHeroBgParticles } from "@/components/views/ar-bim/landingCanvas";
import { WORK_PORTFOLIO_HERO } from "@/lib/work-portfolio/hero";
import { WorkPortfolioHeroCanvas } from "@/components/views/work-portfolio/WorkPortfolioHeroCanvas";

export function WorkPortfolioHero() {
  const heroBgRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = heroBgRef.current;
    if (!c) return;
    return attachHeroBgParticles(c);
  }, []);

  const h = WORK_PORTFOLIO_HERO;

  return (
    <section
      className="relative overflow-hidden bg-[#060606] scroll-mt-14"
      aria-labelledby="work-portfolio-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(color-mix(in srgb, var(--sl-cyan) 16%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--sl-line) 55%, transparent) 1px, transparent 1px)`,
          backgroundSize: "58px 58px",
        }}
        aria-hidden
      />
      <canvas ref={heroBgRef} className="absolute inset-0 z-1 h-full w-full" aria-hidden />

      <div className="relative z-10 mx-auto grid w-full min-w-0 max-w-325 grid-cols-1 items-center gap-10 px-5 pt-[clamp(4.5rem,10vh,6.5rem)] pb-16 md:grid-cols-2 md:gap-14 md:px-12 lg:gap-16">
        <div className="min-w-0 max-w-full">
          <p className="mb-6 inline-flex max-w-full items-center gap-2 rounded-sm border border-orange-400/35 bg-orange-400/[0.07] px-3 py-1.5 font-mono text-[9px] tracking-[0.2em] text-orange-400 uppercase">
            <span
              className="size-1.5 shrink-0 rounded-full bg-orange-400 shadow-[0_0_8px_var(--orange-400)] animate-[arbim-landing-bpulse_1.6s_ease-in-out_infinite] motion-reduce:animate-none"
              aria-hidden
            />
            {h.chip}
          </p>

          <h1
            id="work-portfolio-hero-heading"
            className="mb-5 max-w-full font-sans text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] font-extrabold tracking-[-0.035em] text-white"
          >
            {h.titleBefore}
            <br />
            <span className="text-orange-400">{h.titleHighlight}</span>
            <br />
            {h.titleAfter}
          </h1>

          <p className="mb-9 max-w-xl text-[15px] leading-[1.72] font-light text-white/48">{h.description}</p>

          <div className="mb-12 flex flex-wrap gap-8 md:gap-10">
            {h.stats.map((s) => (
              <div key={s.label}>
                <span className="font-sans text-[32px] font-bold leading-none text-orange-400">
                  {s.value}
                </span>
                <span className="mt-1.5 block font-mono text-[8px] tracking-[0.15em] text-white/30 uppercase">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3.5">
            <a
              href={h.primaryCta.href}
              target="_blank"
              rel="noreferrer"
              className="relative inline-flex items-center gap-2 overflow-hidden rounded-md border border-orange-400 bg-orange-400 px-8 py-3.5 text-[13px] font-semibold tracking-[0.07em] text-white uppercase shadow-[0_0_24px_rgb(245_138_11/0.35)] transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_44px_rgb(245_138_11/0.55)]"
            >
              {h.primaryCta.label} <MoveRight className="size-4" aria-hidden />
            </a>
            <a
              href={h.secondaryCta.href}
              className="inline-block rounded-md border-[1.5px] border-white/20 bg-transparent px-8 py-3.5 text-[13px] font-medium tracking-[0.07em] text-white/60 uppercase transition-[border-color,color,transform] duration-200 hover:-translate-y-0.5 hover:border-orange-400/60 hover:text-orange-400"
            >
              {h.secondaryCta.label}
            </a>
          </div>
        </div>

        <div className="relative flex min-w-0 w-full items-center justify-center">
          <WorkPortfolioHeroCanvas />
        </div>
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[12] h-px w-full bg-[color-mix(in_srgb,var(--sl-cyan)_16%,transparent)]"
        aria-hidden
      />
    </section>
  );
}

"use client";

import { MoveRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { GameDevContent } from "./content";
import { attachGameHeroCanvas } from "./gameHeroCanvas";

type Props = {
  content: GameDevContent["hero"];
};

export function Hero({ content }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [chipLive, setChipLive] = useState("● GAME RUNNING");
  const [chipFps, setChipFps] = useState("60 FPS · UNITY");

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    return attachGameHeroCanvas(c, (v) => {
      setChipLive(v.live);
      setChipFps(v.fps);
    });
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#060606] scroll-mt-14"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(color-mix(in srgb, var(--sl-cyan) 16%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--sl-line) 55%, transparent) 1px, transparent 1px)`,
          backgroundSize: "58px 58px",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid w-full max-w-325 grid-cols-1 items-center gap-14 px-5 pt-[clamp(4.5rem,10vh,6.5rem)] pb-16 md:grid-cols-2 md:gap-16 md:px-12">
        <div className="min-w-0">
          <div className="mb-6 inline-flex max-w-full items-center gap-2 overflow-x-auto rounded-sm border border-orange-400/35 bg-orange-400/[0.07] px-3 py-1.5 font-mono text-[9px] tracking-[0.22em] text-orange-400 uppercase [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <span
              className="size-1.5 shrink-0 rounded-full bg-orange-400 animate-[arbim-landing-bpulse_1.6s_ease-in-out_infinite]"
              aria-hidden
            />
            <span className="whitespace-nowrap">{content.tagline}</span>
          </div>

          <h1 className="mb-5 max-w-full break-words font-sans text-[clamp(1.9rem,4.6vw,4rem)] leading-[0.96] font-extrabold tracking-[-0.035em] text-white">
            {content.titleBefore}{" "}
            <span className="text-orange-400">{content.titleHighlight}</span>{" "}
            {content.titleAfter}
          </h1>

          <p className="mb-9 max-w-full text-[15px] leading-[1.78] font-light text-white/48 sm:max-w-115">
            {content.description}
          </p>

          <div className="mb-12 flex flex-wrap items-center gap-3.5">
            <a
              href={content.primaryCta.href}
              target={content.primaryCta.href.startsWith("http") ? "_blank" : undefined}
              rel={content.primaryCta.href.startsWith("http") ? "noreferrer" : undefined}
              className="inline-flex items-center gap-2 overflow-hidden rounded-md border border-orange-400 bg-orange-400 px-8 py-3.5 text-[13px] font-semibold tracking-[0.07em] text-white uppercase shadow-[0_0_24px_rgb(245_138_11/0.35)] transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_44px_rgb(245_138_11/0.55)]"
            >
              {content.primaryCta.label} <MoveRight className="size-4" aria-hidden />
            </a>
            <a
              href={content.secondaryCta.href}
              className="inline-flex items-center justify-center rounded-md border-[1.5px] border-white/20 bg-transparent px-8 py-3.5 text-[13px] font-medium tracking-[0.07em] text-white/60 uppercase transition-[border-color,color,transform] duration-200 hover:-translate-y-0.5 hover:border-orange-400/60 hover:text-orange-400"
            >
              {content.secondaryCta.label}
            </a>
          </div>

          <div className="flex flex-wrap gap-5">
            {content.meta.map((m) => (
              <span
                key={m}
                className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.14em] text-white/25 uppercase"
              >
                <span className="size-1 shrink-0 rounded-full bg-orange-400/65" aria-hidden />
                {m}
              </span>
            ))}
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="relative w-full max-w-[560px]">
            <div
              className="pointer-events-none absolute right-5 top-[-12px] z-10 whitespace-nowrap rounded-[4px] border border-orange-400/25 bg-[rgba(10,27,51,0.92)] px-[10px] py-[5px] font-mono text-[8px] tracking-[0.14em] text-white/70 uppercase"
              aria-hidden
            >
              {chipLive}
            </div>
            <div
              className="pointer-events-none absolute bottom-[40px] left-[-50px] z-10 whitespace-nowrap rounded-[4px] border border-orange-400/25 bg-[rgba(10,27,51,0.92)] px-[10px] py-[5px] font-mono text-[8px] tracking-[0.14em] text-white/70 uppercase"
              aria-hidden
            >
              {chipFps}
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#04081a] shadow-[0_40px_90px_rgb(0_0_0/0.55)]">
              <canvas ref={canvasRef} className="block h-[400px] w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


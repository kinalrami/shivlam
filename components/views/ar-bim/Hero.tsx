"use client";

import type { RefObject } from "react";
import { MoveRight } from "lucide-react";

type Props = {
  heroBgRef: RefObject<HTMLCanvasElement | null>;
  heroArRef: RefObject<HTMLCanvasElement | null>;
};

export default function Hero({ heroBgRef, heroArRef }: Props) {
  return (
    <section
      id="arbim-hero"
      className="relative flex min-h-screen scroll-mt-14 items-center overflow-hidden bg-[#060606]"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(color-mix(in srgb, var(--sl-cyan) 16%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--sl-line) 55%, transparent) 1px, transparent 1px)`,
          backgroundSize: "58px 58px",
        }}
        aria-hidden
      />
      <canvas
        id="arbim-hero-canvas"
        ref={heroBgRef}
        className="absolute inset-0 z-[1] h-full w-full"
      />
      <div className="relative z-10 mx-auto grid max-w-[1200px] items-center gap-16 px-5 pt-[clamp(4.5rem,10vh,6.5rem)] pb-16 md:grid-cols-2 md:gap-16 md:px-12">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-sm border border-orange-400/35 bg-orange-400/[0.07] px-3 py-1.5 font-mono text-[9px] tracking-[0.22em] text-orange-400 uppercase">
            <span
              className="size-1.5 rounded-full bg-orange-400 shadow-[0_0_8px_var(--orange-400)] animate-[arbim-landing-bpulse_1.6s_ease-in-out_infinite]"
              aria-hidden
            />
            AR BIM LIDAR CONSTRUCTION TECH
          </div>
          <h1 className="mb-5 font-sans text-[clamp(2.25rem,4.5vw,4rem)] leading-[0.96] font-extrabold tracking-[-0.035em] text-white">
            Engineering the <span className="text-orange-400">future of </span>AR BIM
            Development.
          </h1>
          <p className="mb-9 max-w-[460px] text-[15px] leading-[1.78] font-light text-white/48">
            Digitizing physical sites into actionable IFC and Revit data with iOS LiDAR
            precision.
          </p>
          <div className="mb-12 flex flex-wrap items-center gap-3.5">
            <a
              data-arbim-cursor
              href="#arbim-spec"
              className="relative flex items-center gap-2 rounded-md overflow-hidden border border-orange-400 bg-orange-400 px-8 py-3.5 text-[13px] font-semibold tracking-[0.07em] text-white uppercase shadow-[0_0_24px_rgb(245_138_11/0.35)] transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_44px_rgb(245_138_11/0.55)]"
            >
              View Our Specialisation <MoveRight/>
            </a>
            <a
              data-arbim-cursor
              href="#arbim-product"
              className="inline-block rounded-md border-[1.5px] border-white/20 bg-transparent px-8 py-3.5 text-[13px] font-medium tracking-[0.07em] text-white/60 uppercase transition-[border-color,color,transform] duration-200 hover:-translate-y-0.5 hover:border-orange-400/60 hover:text-orange-400"
            >
              Deltaarbim live
            </a>
          </div>
          <div className="flex flex-wrap gap-5">
            {[
              "iOS LiDAR Precision",
              "IFC · Revit Support",
              "Real-Time AR Overlay",
              "Unity · Swift",
            ].map((m) => (
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
          <div className="relative h-[min(460px,55vh)] w-full overflow-hidden rounded-xl border border-orange-400/18 shadow-[0_20px_60px_rgb(0_0_0/0.45)]">
            <canvas id="arbim-hero-ar" ref={heroArRef} className="block h-full w-full" />
            <CornerBracket position="tl" />
            <CornerBracket position="tr" />
            <CornerBracket position="bl" />
            <CornerBracket position="br" />
            <div className="absolute bottom-3.5 left-3.5 z-10 flex items-center gap-1.5 rounded-sm border border-orange-400/28 bg-black/70 px-2.5 py-1 font-mono text-[8px] tracking-[0.14em] text-orange-400 uppercase">
              <span
                className="size-1.5 rounded-full bg-emerald-500 shadow-[0_0_7px_#22c55e] animate-[arbim-landing-bpulse_1.2s_ease-in-out_infinite]"
                aria-hidden
              />
              AR BIM LIVE SIMULATION
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CornerBracket({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const base = "pointer-events-none absolute size-3.5 border-orange-400/50";
  const pos =
    position === "tl"
      ? "top-2.5 left-2.5 border-t-[1.5px] border-l-[1.5px]"
      : position === "tr"
        ? "top-2.5 right-2.5 border-t-[1.5px] border-r-[1.5px]"
        : position === "bl"
          ? "bottom-2.5 left-2.5 border-b-[1.5px] border-l-[1.5px]"
          : "right-2.5 bottom-2.5 border-r-[1.5px] border-b-[1.5px]";
  return <span className={`${base} ${pos}`} aria-hidden />;
}

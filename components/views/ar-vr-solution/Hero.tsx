"use client";

import type { RefObject } from "react";
import { MoveRight } from "lucide-react";

type Props = {
  heroBgRef: RefObject<HTMLCanvasElement | null>;
  heroLidarRef: RefObject<HTMLCanvasElement | null>;
};

/** Mirrors the 3D Reconstruction hero layout/visuals. */
export default function Hero({ heroBgRef, heroLidarRef }: Props) {
  return (
    <section
      id="arvr-hero"
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
        id="arvr-hero-cv"
        ref={heroBgRef}
        className="absolute inset-0 z-1 h-full w-full"
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid max-w-325 items-center gap-16 px-5 pt-[clamp(4.5rem,10vh,6.5rem)] pb-16 md:grid-cols-2 md:gap-16 md:px-12">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-sm border border-orange-400/35 bg-orange-400/[0.07] px-3 py-1.5 font-mono text-[9px] tracking-[0.22em] text-orange-400 uppercase">
            <span
              className="size-1.5 rounded-full bg-orange-400 shadow-[0_0_8px_var(--orange-400)] animate-[arbim-landing-bpulse_1.6s_ease-in-out_infinite]"
              aria-hidden
            />
            UNITY • ARKIT • SWIFT • REALITYKIT
          </div>

          <h1 className="mb-5 font-sans text-[clamp(2.25rem,4.5vw,4rem)] leading-[0.96] font-extrabold tracking-[-0.035em] text-white">
            Advanced
            <br />
            <span className="text-orange-400">AR VR Solutions</span>
            <br />
            for Enterprise.
          </h1>

          <p className="mb-9 max-w-115 text-[15px] leading-[1.78] font-light text-white/48">
            We engineer high-performance immersive ecosystems that bridge the gap between legacy
            stability and next-gen agility. Utilizing iOS and Unity, we build complex simulations
            and digital twins that move industries forward.
          </p>

          <div className="mb-12 flex flex-wrap items-center gap-3.5">
            <a
              data-arbim-cursor
              href="#arvr-capabilities"
              className="relative flex items-center gap-2 rounded-md overflow-hidden border border-orange-400 bg-orange-400 px-8 py-3.5 text-[13px] font-semibold tracking-[0.07em] text-white uppercase shadow-[0_0_24px_rgb(245_138_11/0.35)] transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_44px_rgb(245_138_11/0.55)]"
            >
              Activate your vision <MoveRight className="size-4" />
            </a>
            <a
              data-arbim-cursor
              href="#arvr-capabilities"
              className="inline-block rounded-md border-[1.5px] border-white/20 bg-transparent px-8 py-3.5 text-[13px] font-medium tracking-[0.07em] text-white/60 uppercase transition-[border-color,color,transform] duration-200 hover:-translate-y-0.5 hover:border-orange-400/60 hover:text-orange-400"
            >
              See tech core
            </a>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {["Unity Engine", "iOS Native ARKit", "Digital Twins", "Real-Time Analytics"].map((m) => (
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
          <div className="relative h-[min(480px,56vh)] w-full overflow-visible rounded-xl border border-orange-400/18 bg-[#040b14]/90 shadow-[0_24px_70px_rgb(0_0_0/0.45)]">
            {/* Clip ONLY the canvas; allow HUD chips to hang outside the card like the HTML reference. */}
            <div className="absolute inset-0 overflow-hidden rounded-xl">
              <canvas id="arvr-hero-ar" ref={heroLidarRef} className="block h-full w-full" />
            </div>

            <CornerBracket position="tl" />
            <CornerBracket position="tr" />
            <CornerBracket position="bl" />
            <CornerBracket position="br" />

            <HudChip className="-right-15 top-6">
              ◈ LATENCY: 14ms
            </HudChip>
            <HudChip className="-right-16 top-[54%] -translate-y-1/2">
              ◈ SYNC_STATUS: ACTIVE
            </HudChip>
            <HudChip className="-left-16 bottom-[120px]">
              ◈ ANCHOR_POINTS: 3
            </HudChip>
            <HudChip className="bottom-7 left-[23%] -translate-x-1/2 translate-y-1/2">
              <span
                className="inline-block size-1.5 rounded-full bg-emerald-300/80 shadow-[0_0_10px_rgb(16_185_129/0.35)]"
                aria-hidden
              />
              AR ENVIRONMENT ACTIVE • UNITY
            </HudChip>
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
          : "right-2.5 bottom-2.5 border-b-[1.5px] border-r-[1.5px]";
  return <span className={`${base} ${pos}`} aria-hidden />;
}

function HudChip({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <div
      className={[
        "pointer-events-none absolute inline-flex items-center gap-2 rounded",
        "bg-[#071422]/70 backdrop-blur-[2px]",
        "px-3 py-2 font-mono text-[9px] leading-none uppercase",
        "border border-orange-400/50 text-orange-400",
        "ring-1 ring-white/5",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}


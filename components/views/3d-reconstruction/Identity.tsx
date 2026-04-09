"use client";

import Link from "next/link";
import { useCallback, useLayoutEffect, useRef } from "react";
import { MoveRight } from "lucide-react";
import { ArbimReveal } from "@/components/views/ar-bim/Motion";

const SEAL_TICK_N = 72;

function IdentitySealBadge() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const paintTicks = useCallback(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    const { width, height } = wrap.getBoundingClientRect();
    const cssW = Math.max(1, width);
    const cssH = Math.max(1, height);

    canvas.width = Math.floor(cssW * dpr);
    canvas.height = Math.floor(cssH * dpr);
    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${cssH}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);

    const cx = cssW / 2;
    const cy = cssH / 2;
    const edgeInset = 2;
    const rOut = Math.min(cssW, cssH) / 2 - edgeInset;

    for (let i = 0; i < SEAL_TICK_N; i++) {
      const ang = -Math.PI / 2 + (i / SEAL_TICK_N) * Math.PI * 2;
      const isMajor = i % (SEAL_TICK_N / 4) === 0;
      const rIn = rOut - (isMajor ? Math.max(12, rOut * 0.13) : Math.max(6, rOut * 0.065));
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(ang) * rOut, cy + Math.sin(ang) * rOut);
      ctx.lineTo(cx + Math.cos(ang) * rIn, cy + Math.sin(ang) * rIn);
      ctx.strokeStyle = isMajor ? "rgb(251 146 60)" : "rgba(255,255,255,0.38)";
      ctx.lineWidth = isMajor ? 2 : 1;
      ctx.lineCap = "round";
      ctx.stroke();
    }
  }, []);

  useLayoutEffect(() => {
    paintTicks();
    const wrap = wrapRef.current;
    if (!wrap) return;
    const ro = new ResizeObserver(() => paintTicks());
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [paintTicks]);

  return (
    <div
      ref={wrapRef}
      className="relative flex size-[min(100%,280px)] aspect-square items-center justify-center rounded-full bg-[#071422]/60 p-8 shadow-[0_0_60px_rgb(0_0_0/0.35)]"
      role="img"
      aria-label="10+ years corporate experience. Shivlam, Bharat."
    >
      <div
        className="pointer-events-none absolute inset-[10%] rounded-full border border-orange-400/18"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-[16%] rounded-full border border-white/8" aria-hidden />
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-[1] size-full"
        aria-hidden
      />
      <div className="relative z-10 text-center">
        <div className="font-sans text-[clamp(2.5rem,6vw,3.5rem)] font-extrabold leading-none text-orange-400">
          10+
        </div>
        <div className="mt-3 font-mono text-[9px] leading-snug tracking-[0.18em] text-white/50 uppercase">
          Years corporate experience
        </div>
        <div className="mx-auto mt-4 h-px w-12 max-w-[85%] bg-orange-400/45" aria-hidden />
        <div className="mt-4 font-mono text-[8px] tracking-[0.22em] text-orange-400/90 uppercase">
          Shivlam · Bharat
        </div>
      </div>
    </div>
  );
}

const stats = [
  { value: "3+", label: "Years at Shivlam" },
  { value: "50+", label: "Projects shipped" },
  { value: "5+", label: "Countries" },
] as const;

export default function Identity() {
  return (
    <section
      id="recon-identity"
      className="relative scroll-mt-14 overflow-hidden bg-[#060606] py-12 md:py-20"
    >
      <div className="relative z-10 mx-auto max-w-325 px-5 md:px-12">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <ArbimReveal delayStep={1}>
              <div className="mb-5 flex items-center gap-2">
                <span className="h-px w-8 bg-orange-400" aria-hidden />
                <span className="font-mono text-[10px] font-medium tracking-[0.22em] text-orange-400 uppercase">
                  Global identity
                </span>
              </div>
            </ArbimReveal>
            <ArbimReveal delayStep={2}>
              <h2 className="font-sans text-[clamp(1.85rem,3.5vw,2.85rem)] leading-[1.08] font-extrabold tracking-tight text-white">
                Built in Bharat,
                <br />
                <span className="text-orange-400">Delivered Globally.</span>
              </h2>
            </ArbimReveal>
            <ArbimReveal delayStep={3}>
              <p className="mt-6 max-w-prose text-[15px] leading-[1.78] text-white/55">
                Proudly engineered in Bharat, delivering complex development solutions that move
                industries forward. Our team combines 10+ years of corporate leadership with 3+
                years of focused Shivlam innovation — building 3D reconstruction tools that rival
                global benchmarks.
              </p>
            </ArbimReveal>
            <ArbimReveal delayStep={4}>
              <blockquote
                className="mt-8 rounded-r-lg border-l-[3px] border-sl-saffron bg-sl-saffron/[0.06] py-4 pr-5 pl-5"
              >
                <p className="font-sans text-[17px] font-semibold leading-snug text-sl-text italic">
                  “We bridge the gap between physical reality and high-fidelity digital models — one LiDAR scan at a time.”
                </p>
              </blockquote>
            </ArbimReveal>
            <ArbimReveal delayStep={5} className="mt-10 flex flex-wrap gap-3.5">
              <Link
                data-arbim-cursor
                href="/contact-us"
                className="inline-flex items-center gap-2 rounded-md border border-orange-400 bg-orange-400 px-7 py-3.5 text-[13px] font-semibold tracking-[0.06em] text-white uppercase shadow-[0_0_24px_rgb(245_138_11/0.35)] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgb(245_138_11/0.5)]"
              >
                Start a project <MoveRight className="size-4" />
              </Link>
              <Link
                data-arbim-cursor
                href="/"
                className="inline-flex items-center rounded-md border-[1.5px] border-white/28 bg-transparent px-7 py-3.5 text-[13px] font-semibold tracking-[0.06em] text-white/80 uppercase transition-[border-color,color,transform] hover:-translate-y-0.5 hover:border-white/45 hover:text-white"
              >
                Shivlam.com
              </Link>
            </ArbimReveal>
          </div>

          <div className="relative flex flex-col items-center gap-8">
            <ArbimReveal delayStep={2} className="relative">
              <IdentitySealBadge />
            </ArbimReveal>

            <ArbimReveal delayStep={3} className="grid w-full max-w-sm grid-cols-1 gap-3 sm:grid-cols-3 lg:max-w-none">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4 text-center shadow-[inset_0_1px_0_0_rgb(255_255_255/0.06)] backdrop-blur-sm sm:text-left"
                >
                  <div className="font-sans text-2xl font-extrabold text-orange-400">{s.value}</div>
                  <div className="mt-1 font-mono text-[8px] leading-snug tracking-[0.12em] text-white/40 uppercase">
                    {s.label}
                  </div>
                </div>
              ))}
            </ArbimReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { WebHeroContent } from "./content";

type Props = {
  content: WebHeroContent;
};

function useHeroBrowserCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  setUrl: (v: string) => void,
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const urls = ["shivlam.com", "plinth.it", "ecovancedef.com", "smpgservice.com"];
    let urlIdx = 0;

    const ORANGE = "#FF9933";
    const CYAN = "#1DCFCF";

    let raf = 0;
    let frame = 0;
    let buildPct = 0;
    let timer: number | null = null;
    const buildStages = [
      "Parsing HTML...",
      "Compiling CSS...",
      "Bundling JS...",
      "Optimising Assets...",
      "Deploying...",
      "✓ Live!",
    ];

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const r = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const cssW = Math.max(1, Math.floor(r.width));
      const cssH = 280;

      canvas.width = Math.floor(cssW * dpr);
      canvas.height = Math.floor(cssH * dpr);
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const roundRect = (x: number, y: number, w: number, h: number, r: number) => {
      const rr = Math.min(r, w / 2, h / 2);
      ctx.beginPath();
      ctx.moveTo(x + rr, y);
      ctx.arcTo(x + w, y, x + w, y + h, rr);
      ctx.arcTo(x + w, y + h, x, y + h, rr);
      ctx.arcTo(x, y + h, x, y, rr);
      ctx.arcTo(x, y, x + w, y, rr);
      ctx.closePath();
    };

    const drawBrowserUI = (w: number, h: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#0f0f1e";
      ctx.fillRect(0, 0, w, h);

      // Wireframe nav
      ctx.fillStyle = "rgba(16,43,77,.6)";
      ctx.fillRect(10, 10, w - 20, 28);
      ctx.fillStyle = ORANGE;
      ctx.fillRect(14, 18, 50, 12);
      ctx.fillStyle = "rgba(255,255,255,.15)";
      [100, 135, 170, 210].forEach((x) => ctx.fillRect(x, 21, 28, 6));
      ctx.fillStyle = ORANGE;
      ctx.fillRect(w - 60, 16, 48, 16);

      // Hero block
      ctx.fillStyle = "rgba(10,27,51,.8)";
      ctx.fillRect(10, 44, w - 20, 70);

      const lineW = Math.min(100, (buildPct / 100) * (w - 80));
      ctx.fillStyle = "rgba(255,255,255,.7)";
      ctx.fillRect(20, 52, lineW * 0.6, 10);
      ctx.fillStyle = ORANGE;
      ctx.fillRect(20, 66, lineW * 0.8, 8);
      ctx.fillStyle = "rgba(255,255,255,.35)";
      ctx.fillRect(20, 78, lineW * 0.5, 6);
      ctx.fillRect(20, 88, lineW * 0.4, 6);

      if (buildPct > 40) {
        ctx.fillStyle = ORANGE;
        ctx.fillRect(20, 100, Math.min(60, ((buildPct - 40) / 60) * 60), 14);
      }

      // Cards row
      const cardY = 124;
      const cw = (w - 40) / 3;
      [0, 1, 2].forEach((i) => {
        const cx = 10 + i * (cw + 4);
        ctx.fillStyle = ["#1a2744", "#0d2240", "#162035"][i]!;
        roundRect(cx, cardY, cw, 52, 4);
        ctx.fill();
        ctx.strokeStyle = "rgba(255,153,51,.2)";
        ctx.lineWidth = 1;
        roundRect(cx, cardY, cw, 52, 4);
        ctx.stroke();
        if (buildPct > 30 + i * 20) {
          ctx.fillStyle = ORANGE;
          ctx.fillRect(cx + 8, cardY + 10, 12, 12);
          ctx.fillStyle = "rgba(255,255,255,.5)";
          ctx.fillRect(cx + 8, cardY + 26, cw - 30, 5);
          ctx.fillStyle = "rgba(255,255,255,.25)";
          ctx.fillRect(cx + 8, cardY + 34, cw - 40, 4);
          ctx.fillRect(cx + 8, cardY + 41, cw - 50, 4);
        }
      });

      // Scan line while building
      if (buildPct < 100) {
        const scanY = 10 + (buildPct / 100) * (h - 20);
        const g = ctx.createLinearGradient(0, scanY, w, scanY);
        g.addColorStop(0, "transparent");
        g.addColorStop(0.5, "rgba(29,207,207,.4)");
        g.addColorStop(1, "transparent");
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, scanY);
        ctx.lineTo(w, scanY);
        ctx.stroke();
      }

      // Progress bar area
      const padX = 12;
      const padBottom = 0;
      const barH = 26;
      const barY = h - barH - padBottom;

      ctx.fillStyle = "rgba(16,43,77,.8)";
      ctx.fillRect(0, barY, w, barH);
      const progW = (buildPct / 100) * (w - (padX * 2 + 60));
      ctx.fillStyle = ORANGE;
      // Keep visible gap between stage text and bar.
      ctx.fillRect(padX, barY + barH - 9, progW, 4);
      ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
      ctx.fillStyle = "rgba(255,153,51,.8)";
      ctx.textAlign = "left";
      const stageIdx = Math.min(5, Math.floor((buildPct / 100) * 5));
      ctx.fillText(buildStages[stageIdx] ?? "✓ Live!", padX, barY + 12);
      ctx.fillStyle = "rgba(255,255,255,.3)";
      ctx.textAlign = "right";
      ctx.fillText(`${Math.round(buildPct)}%`, w - padX, barY + 12);

      // Pulse dots when complete
      if (buildPct >= 100) {
        const t = frame * 0.008;
        [0.25, 0.5, 0.75].forEach((xr, i) => {
          const px = xr * w;
          const alpha = 0.3 + 0.3 * Math.sin(t * 2 + i * 2);
          ctx.beginPath();
          ctx.arc(px, h - 40, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(29,207,207,${alpha})`;
          ctx.fill();
        });
      }

      // Subtle cyan glow in top-right
      ctx.fillStyle = "rgba(29,207,207,.04)";
      ctx.beginPath();
      ctx.arc(w - 40, 20, 50, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = CYAN;
      ctx.globalAlpha = 0.08;
      ctx.beginPath();
      ctx.arc(w * 0.2, h * 0.3, 120, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    };

    const animate = () => {
      const w = canvas.offsetWidth;
      const h = 280;

      buildPct = Math.min(100, buildPct + 0.4);
      if (buildPct >= 100 && timer == null) {
        timer = window.setTimeout(() => {
          buildPct = 0;
          timer = null;
          urlIdx = (urlIdx + 1) % urls.length;
          setUrl(urls[urlIdx] ?? "shivlam.com");
        }, 1800);
      }

      drawBrowserUI(w, h);
      frame++;
      raf = window.requestAnimationFrame(animate);
    };

    setUrl(urls[urlIdx] ?? "shivlam.com");
    resize();
    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas.parentElement ?? canvas);
    window.addEventListener("resize", resize);
    raf = window.requestAnimationFrame(animate);

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      if (timer != null) window.clearTimeout(timer);
      window.removeEventListener("resize", resize);
      ro.disconnect();
    };
  }, [canvasRef, setUrl]);
}

export function Hero({ content }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [url, setUrl] = useState("shivlam.com");
  useHeroBrowserCanvas(canvasRef, setUrl);

  const chips = useMemo(
    () => ({
      top: content.rightBadges.topRight,
      bottom: content.rightBadges.bottomLeft,
    }),
    [content.rightBadges.bottomLeft, content.rightBadges.topRight],
  );

  return (
    <section id="hero" className="relative min-h-[calc(100vh-56px)] bg-[#060606] scroll-mt-14">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage: `linear-gradient(color-mix(in srgb, var(--sl-cyan) 16%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--sl-line) 55%, transparent) 1px, transparent 1px)`,
          backgroundSize: "58px 58px",
        }}
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-325 grid-cols-1 items-center gap-12 px-5 pt-[clamp(5rem,10vh,7rem)] pb-18 md:px-12 lg:grid-cols-2 lg:gap-16">
        <div className="min-w-0">
          <div className="mb-6 inline-flex max-w-full min-w-0 items-center gap-2 overflow-x-auto rounded-sm border border-orange-400/35 bg-orange-400/[0.07] py-1.5 pl-2.5 pr-3 font-mono text-[9px] tracking-[0.2em] text-orange-400 uppercase [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <span
              className="size-1.5 shrink-0 rounded-full bg-orange-400 shadow-[0_0_8px_rgb(245_138_11/0.55)] animate-[arbim-landing-bpulse_1.6s_ease-in-out_infinite]"
              aria-hidden
            />
            <span className="whitespace-nowrap text-white/65">{content.tagline}</span>
          </div>

          <h1 className="font-sans text-[clamp(2.1rem,4.6vw,4rem)] font-extrabold leading-[0.96] tracking-[-0.035em] text-white">
            {content.titleLines.line1}
            <br />
            <span className="text-orange-400">{content.titleLines.highlight}</span>
            <br />
            {content.titleLines.line3}
          </h1>

          <p className="mt-5 max-w-2xl text-[15px] leading-[1.78] font-light text-white/50">
            {content.description}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3.5">
            <a
              href={content.primaryCta.href}
              target={content.primaryCta.href.startsWith("http") ? "_blank" : undefined}
              rel={content.primaryCta.href.startsWith("http") ? "noreferrer" : undefined}
              className="inline-flex items-center justify-center rounded-md border border-orange-400 bg-orange-400 px-8 py-3.5 text-[13px] font-semibold tracking-[0.07em] text-white uppercase shadow-[0_0_24px_rgb(245_138_11/0.35)] transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_44px_rgb(245_138_11/0.55)]"
            >
              {content.primaryCta.label}
            </a>
            <a
              href={content.secondaryCta.href}
              className="inline-flex items-center justify-center rounded-md border-[1.5px] border-white/15 bg-transparent px-8 py-3.5 text-[13px] font-medium tracking-[0.07em] text-white/65 uppercase transition-[border-color,color,transform] duration-200 hover:-translate-y-0.5 hover:border-orange-400/60 hover:text-orange-400"
            >
              {content.secondaryCta.label}
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-5">
            {content.tags.map((t) => (
              <span
                key={t}
                className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.14em] text-white/25 uppercase"
              >
                <span className="size-1 shrink-0 rounded-full bg-orange-400/65" aria-hidden />
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="relative flex min-w-0 items-center justify-center">
          <div className="relative w-full max-w-[460px]">
            <div className="hero-float-chip pointer-events-none absolute -top-3 -right-10 z-10 bg-[rgba(10,27,51,0.92)] border-[rgba(255,153,51,0.3)] text-[rgba(255,255,255,0.7)] px-[10px] py-[5px] rounded-[4px] font-mono text-[7px] tracking-[0.1em] uppercase">
              {chips.top}
            </div>
            <div className="hero-float-chip pointer-events-none absolute bottom-8 -left-14 z-10 hidden bg-[rgba(10,27,51,0.92)] border-[rgba(255,153,51,0.3)] text-[rgba(255,255,255,0.7)] px-[10px] py-[5px] rounded-[4px] font-mono text-[7px] tracking-[0.1em] uppercase md:block">
              {chips.bottom}
            </div>

            <div className="overflow-hidden rounded-xl border border-orange-400/25 bg-[#1a1a2e] shadow-[0_0_60px_rgba(255,153,51,0.10),0_0_120px_rgba(16,43,77,0.40)]">
              <div className="flex items-center gap-2 border-b border-white/5 bg-[#252540] px-3.5 py-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-[#ff5f57]" aria-hidden />
                  <span className="size-2.5 rounded-full bg-[#febc2e]" aria-hidden />
                  <span className="size-2.5 rounded-full bg-[#2aca44]" aria-hidden />
                </div>
                <div className="mx-3 flex flex-1 items-center gap-2 rounded-md bg-white/[0.06] px-3 py-1.5 font-mono text-[10px] tracking-[0.06em] text-white/40">
                  <span className="size-1.5 shrink-0 rounded-full bg-emerald-400" aria-hidden />
                  <span className="truncate">{url}</span>
                </div>
              </div>
              <div className="relative min-h-[280px] bg-[#0f0f1e]">
                <canvas ref={canvasRef} className="block h-[280px] w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


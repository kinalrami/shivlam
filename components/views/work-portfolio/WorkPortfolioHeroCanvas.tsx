"use client";

import { useEffect, useRef } from "react";

const H = 280;

/** Four animated category panels — matches work portfolio HTML hero canvas */
export function WorkPortfolioHeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const maybeCtx = canvas.getContext("2d");
    if (!maybeCtx) return;
    const ctx: CanvasRenderingContext2D = maybeCtx;
    const dpr = window.devicePixelRatio || 1;
    let t = 0;
    let raf = 0;

    const panels = [
      { x: 0.04, y: 0.06, w: 0.46, h: 0.42, color: "#54C5F8", label: "iPhone · AR · BIM", icon: "iOS", phase: 0 },
      { x: 0.52, y: 0.06, w: 0.44, h: 0.42, color: "#AAAAFF", label: "Game Development", icon: "🎮", phase: 0.7 },
      { x: 0.04, y: 0.54, w: 0.46, h: 0.4, color: "#22c55e", label: "Web Design & Dev", icon: "⬡", phase: 1.4 },
      { x: 0.52, y: 0.54, w: 0.44, h: 0.4, color: "#FF9933", label: "Brand Building", icon: "↑", phase: 2.1 },
    ];

    let sel = 0;

    function rr(
      x: number,
      y: number,
      w: number,
      h: number,
      r: number,
    ) {
      const rnd = ctx as CanvasRenderingContext2D & { roundRect?: typeof ctx.roundRect };
      if (typeof rnd.roundRect === "function") {
        rnd.roundRect(x, y, w, h, r);
      } else {
        ctx.rect(x, y, w, h);
      }
    }

    function resize() {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rct = parent.getBoundingClientRect();
      canvas.width = rct.width * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${rct.width}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    function draw() {
      const W = canvas.offsetWidth;
      ctx.fillStyle = "#080818";
      ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(255,153,51,.05)";
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 36) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += 36) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      panels.forEach((p, i) => {
        const px = p.x * W;
        const py = (p.y + Math.sin(t * 0.04 + p.phase) * 0.014) * H;
        const pw = p.w * W;
        const ph = p.h * H;
        const isActive = sel === i;
        ctx.fillStyle = p.color + (isActive ? "22" : "12");
        ctx.beginPath();
        rr(px, py, pw, ph, 7);
        ctx.fill();
        ctx.strokeStyle = p.color + (isActive ? "88" : "33");
        ctx.lineWidth = isActive ? 1.5 : 1;
        ctx.beginPath();
        rr(px, py, pw, ph, 7);
        ctx.stroke();
        if (isActive) {
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          rr(px - 2, py - 2, pw + 4, ph + 4, 9);
          ctx.stroke();
        }
        ctx.fillStyle = p.color + (isActive ? "33" : "18");
        ctx.beginPath();
        rr(px + 5, py + 5, pw - 10, ph * 0.35, 4);
        ctx.fill();
        ctx.font = `${isActive ? 14 : 12}px ui-sans-serif, system-ui`;
        ctx.fillStyle = p.color;
        ctx.textAlign = "left";
        ctx.fillText(p.icon, px + 10, py + ph * 0.28);
        ctx.font = `${isActive ? 8 : 7}px ui-monospace, monospace`;
        ctx.fillStyle = p.color + (isActive ? "cc" : "77");
        ctx.fillText(p.label, px + 8, py + ph * 0.6);
        ctx.fillStyle = p.color + (isActive ? "44" : "22");
        ctx.fillRect(px + 8, py + ph * 0.68, pw * 0.55, 4);
        ctx.fillStyle = "rgba(255,255,255,.07)";
        ctx.fillRect(px + 8, py + ph * 0.78, pw * 0.38, 3);
      });

      if (t % 180 === 0) sel = (sel + 1) % panels.length;
      t++;
      raf = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="w-full max-w-full overflow-hidden rounded-[10px] border border-orange-400/20 bg-[#080818]">
      <canvas ref={ref} className="block h-[280px] w-full" aria-hidden />
    </div>
  );
}

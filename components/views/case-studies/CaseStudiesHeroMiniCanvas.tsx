"use client";

import { useEffect, useRef } from "react";

const H = 100;

type Variant = "ios" | "game" | "web";

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const rr = ctx as CanvasRenderingContext2D & { roundRect?: typeof ctx.roundRect };
  if (typeof rr.roundRect === "function") {
    rr.roundRect(x, y, w, h, r);
  } else {
    ctx.rect(x, y, w, h);
  }
}

export function CaseStudiesHeroMiniCanvas({ variant }: { variant: Variant }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const maybeCtx = canvas.getContext("2d");
    if (!maybeCtx) return;
    const ctx = maybeCtx;
    const dpr = window.devicePixelRatio || 1;
    let t = 0;
    let raf = 0;

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

    function drawIos() {
      const W = canvas.offsetWidth;
      ctx.fillStyle = "#0a1020";
      ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(84,197,248,.06)";
      ctx.lineWidth = 0.6;
      for (let x = 0; x < W; x += 14) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += 10) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }
      const px = W / 2;
      const py = H / 2;
      const ph = 72;
      const pw = 36;
      ctx.fillStyle = "rgba(84,197,248,.12)";
      ctx.beginPath();
      roundRect(ctx, px - pw / 2, py - ph / 2, pw, ph, 7);
      ctx.fill();
      ctx.beginPath();
      roundRect(ctx, px - pw / 2, py - ph / 2, pw, ph, 7);
      ctx.strokeStyle = "rgba(84,197,248,.5)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = "rgba(84,197,248,.25)";
      ctx.fillRect(px - pw / 2 + 3, py - ph / 2 + 10, pw - 6, ph * 0.35);
      [0.52, 0.62, 0.72, 0.82].forEach((yf, i) => {
        ctx.fillStyle = i % 2 ? "rgba(29,207,207,.2)" : "rgba(84,197,248,.15)";
        ctx.fillRect(
          px - pw / 2 + 4,
          py - ph / 2 + ph * yf,
          (pw - 10) * (0.45 + i * 0.1 + Math.sin(t * 0.05 + i) * 0.08),
          4,
        );
      });
      ctx.fillStyle = "rgba(0,0,0,.7)";
      ctx.beginPath();
      roundRect(ctx, px - 9, py - ph / 2 + 2, 18, 4, 2);
      ctx.fill();
    }

    function drawGame() {
      const W = canvas.offsetWidth;
      ctx.fillStyle = "#08080f";
      ctx.fillRect(0, 0, W, H);
      for (let i = 0; i < 15; i++) {
        const sx = (i * 79 + t * 0.3) % W;
        const sy = (i * 53) % H;
        ctx.fillStyle = "rgba(255,255,255,.18)";
        ctx.fillRect(sx, sy, 1, 1);
      }
      const g = ctx.createRadialGradient(W / 2, H * 0.4, 0, W / 2, H * 0.4, W * 0.5);
      g.addColorStop(0, "rgba(170,170,255,.12)");
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "rgba(170,170,255,.85)";
      ctx.beginPath();
      ctx.moveTo(W / 2, H * 0.78);
      ctx.lineTo(W / 2 - 7, H * 0.9);
      ctx.lineTo(W / 2, H * 0.85);
      ctx.lineTo(W / 2 + 7, H * 0.9);
      ctx.closePath();
      ctx.fill();
      [0.2, 0.5, 0.8].forEach((x, i) => {
        const ey = H * (0.2 + Math.sin(t * 0.05 + i) * 0.06);
        ctx.fillStyle = "rgba(255,107,107,.85)";
        ctx.beginPath();
        ctx.moveTo(x * W, ey - 5);
        ctx.lineTo(x * W - 4, ey + 4);
        ctx.lineTo(x * W + 4, ey + 4);
        ctx.closePath();
        ctx.fill();
      });
      ctx.fillStyle = "rgba(29,207,207,.9)";
      ctx.fillRect(W / 2 - 1, H * 0.78 - (t % 40) - 3, 2, 6);
    }

    function drawWeb() {
      const W = canvas.offsetWidth;
      ctx.fillStyle = "#0a1020";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "rgba(16,43,77,.7)";
      ctx.fillRect(4, 4, W - 8, 13);
      ctx.fillStyle = "rgba(34,197,94,.4)";
      ctx.fillRect(8, 7, 22, 7);
      ctx.fillStyle = "rgba(34,197,94,.18)";
      ctx.fillRect(4, 20, W - 8, 28);
      ctx.fillStyle = "rgba(34,197,94,.35)";
      ctx.fillRect(8, 24, (W - 16) * 0.5, 6);
      ctx.fillStyle = "rgba(255,255,255,.1)";
      ctx.fillRect(8, 33, (W - 16) * 0.38, 4);
      ctx.fillRect(8, 40, (W - 16) * 0.3, 4);
      const cw = (W - 14) / 3;
      [0, 1, 2].forEach((i) => {
        ctx.fillStyle = "rgba(255,255,255,.03)";
        ctx.fillRect(4 + i * (cw + 3), 54, cw, 38);
        ctx.fillStyle = "rgba(34,197,94,.2)";
        ctx.fillRect(7 + i * (cw + 3), 57, 8, 8);
        ctx.fillStyle = "rgba(255,255,255,.1)";
        ctx.fillRect(7 + i * (cw + 3), 68, cw - 8, 3);
        ctx.fillRect(7 + i * (cw + 3), 74, cw - 14, 3);
      });
      const sl = (t * 0.3) % H;
      ctx.fillStyle = "rgba(34,197,94,.12)";
      ctx.fillRect(0, sl, W, 1.5);
    }

    function frame() {
      if (variant === "ios") drawIos();
      else if (variant === "game") drawGame();
      else drawWeb();
      t++;
      raf = requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(frame);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, [variant]);

  return <canvas ref={ref} className="block h-full w-full" aria-hidden />;
}

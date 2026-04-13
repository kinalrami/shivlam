"use client";

import { useEffect, useRef } from "react";

const FL = "#54C5F8";
const G = "#3DDC84";

function fillRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  const rr = ctx as CanvasRenderingContext2D & {
    roundRect?: (x: number, y: number, w: number, h: number, r: number) => void;
  };
  if (typeof rr.roundRect === "function") {
    rr.roundRect(x, y, w, h, r);
  } else {
    ctx.rect(x, y, w, h);
  }
  ctx.fill();
}

/**
 * Split-screen AR demo (ARKit vs ARCore) for Flutter AR Foundation sections.
 * Context/canvas refs are captured as narrowed locals so nested handlers stay type-safe.
 */
export function ArFoundationCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const canvas: HTMLCanvasElement = el;
    const maybeCtx = canvas.getContext("2d");
    if (!maybeCtx) return;

    const ctx: CanvasRenderingContext2D = maybeCtx;

    const dpr = window.devicePixelRatio || 1;
    let t = 0;
    let raf = 0;

    function resize() {
      const parent = canvas.parentElement;
      if (!parent) return;
      const r = parent.getBoundingClientRect();
      canvas.width = r.width * dpr;
      canvas.height = 400 * dpr;
      canvas.style.width = `${r.width}px`;
      canvas.style.height = "400px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    function drawARObject(
      ox: number,
      oy: number,
      color: string,
      sz: number,
      label: string,
      time: number,
    ) {
      ctx.fillStyle = "rgba(0,0,0,.2)";
      ctx.beginPath();
      ctx.ellipse(ox, oy + sz * 0.9 + 3, sz * 0.38, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = `${color}22`;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(ox, oy - sz * 0.5);
      ctx.lineTo(ox + sz * 0.65, oy - sz * 0.1);
      ctx.lineTo(ox, oy + sz * 0.28);
      ctx.lineTo(ox - sz * 0.65, oy - sz * 0.1);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = `${color}14`;
      ctx.beginPath();
      ctx.moveTo(ox + sz * 0.65, oy - sz * 0.1);
      ctx.lineTo(ox + sz * 0.65, oy + sz * 0.38);
      ctx.lineTo(ox, oy + sz * 0.76);
      ctx.lineTo(ox, oy + sz * 0.28);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.font = "6px ui-monospace, JetBrains Mono, monospace";
      ctx.fillStyle = `${color}cc`;
      ctx.textAlign = "center";
      ctx.fillText(label, ox, oy - sz * 0.55);
      const p = 0.25 + 0.25 * Math.sin(time * 0.08);
      ctx.strokeStyle = color;
      ctx.lineWidth = 0.8;
      ctx.globalAlpha = p;
      ctx.beginPath();
      ctx.arc(ox, oy, sz + 7 + p * 5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    function drawGrid(startX: number, endX: number, color: string, H: number) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 0.8;
      const vx = (startX + endX) / 2;
      const vy = H * 0.22;
      for (let i = 0; i <= 8; i++) {
        const bx = startX + i * ((endX - startX) / 8);
        ctx.beginPath();
        ctx.moveTo(bx, H * 0.9);
        ctx.lineTo(vx + (bx - vx) * 0.08, vy);
        ctx.stroke();
      }
      for (let j = 0; j <= 6; j++) {
        const p = j / 6;
        const y = H * 0.22 + p * (H * 0.68);
        const lx = vx - (vx - startX) * (1 - p * 0.92);
        const rx = vx + (endX - vx) * (1 - p * 0.92);
        ctx.beginPath();
        ctx.moveTo(lx, y);
        ctx.lineTo(rx, y);
        ctx.stroke();
      }
    }

    function draw() {
      const W = canvas.offsetWidth;
      const H = 400;
      ctx.fillStyle = "#0a0f1a";
      ctx.fillRect(0, 0, W, H);

      const mid = W / 2;
      ctx.strokeStyle = "rgba(255,153,51,.2)";
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(mid, 0);
      ctx.lineTo(mid, H);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.font = "7px ui-monospace, JetBrains Mono, monospace";
      ctx.fillStyle = "rgba(255,153,51,.5)";
      ctx.textAlign = "center";
      ctx.fillText("SAME DART CODE", mid, H / 2);

      const lig = ctx.createRadialGradient(W * 0.25, H * 0.4, 0, W * 0.25, H * 0.4, W * 0.3);
      lig.addColorStop(0, "rgba(20,35,60,.5)");
      lig.addColorStop(1, "transparent");
      ctx.fillStyle = lig;
      ctx.fillRect(0, 0, mid, H);

      const rig = ctx.createRadialGradient(W * 0.75, H * 0.4, 0, W * 0.75, H * 0.4, W * 0.3);
      rig.addColorStop(0, "rgba(15,50,30,.5)");
      rig.addColorStop(1, "transparent");
      ctx.fillStyle = rig;
      ctx.fillRect(mid, 0, mid, H);

      drawGrid(0, mid, "rgba(84,197,248,.14)", H);
      drawGrid(mid, W, "rgba(61,220,132,.14)", H);

      const scanY = H * 0.18 + ((t * 0.6) % (H * 0.73));
      [FL, G].forEach((col, i) => {
        const sx = i === 0 ? 0 : mid;
        const sw = mid;
        const sg = ctx.createLinearGradient(0, scanY - 2, 0, scanY + 2);
        sg.addColorStop(0, "transparent");
        sg.addColorStop(0.5, `${col}44`);
        sg.addColorStop(1, "transparent");
        ctx.fillStyle = sg;
        ctx.fillRect(sx, scanY - 2, sw, 4);
        for (let p = 0; p < 40; p++) {
          const px = sx + ((p * 97 + 23) % sw);
          const py = (p * 71 + 17) % H;
          if (py < scanY) {
            ctx.fillStyle = `${col}22`;
            ctx.fillRect(px - 1, py - 1, 2, 2);
          }
        }
      });

      const bob = Math.sin(t * 0.05) * 0.015;
      drawARObject(W * 0.28, H * 0.45 + bob * H, FL, 22, "3D_MODEL", t);
      drawARObject(W * 0.72, H * 0.45 + bob * H, G, 22, "3D_MODEL", t);
      drawARObject(W * 0.2, H * 0.62 + Math.sin(t * 0.05 + 1.2) * 0.015 * H, FL, 16, "ANCHOR_01", t);
      drawARObject(W * 0.8, H * 0.62 + Math.sin(t * 0.05 + 1.2) * 0.015 * H, G, 16, "ANCHOR_01", t);

      for (const [lbl, col, lx] of [
        ["iOS · ARKit 6", FL, W * 0.25],
        ["Android · ARCore", G, W * 0.75],
      ] as const) {
        ctx.fillStyle = "rgba(0,0,0,.5)";
        fillRoundRect(ctx, lx - 55, 8, 110, 20, 4);
        ctx.font = "7px ui-monospace, JetBrains Mono, monospace";
        ctx.fillStyle = col;
        ctx.textAlign = "center";
        ctx.fillText(lbl, lx, 21);
      }

      const hrPulse = 0.4 + 0.4 * Math.sin(t * 0.12);
      ctx.fillStyle = `rgba(255,153,51,${hrPulse})`;
      ctx.beginPath();
      ctx.arc(mid, H - 20, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = "7px ui-monospace, JetBrains Mono, monospace";
      ctx.fillStyle = "rgba(255,153,51,.6)";
      ctx.textAlign = "center";
      ctx.fillText("🔥 HOT RELOAD", mid, H - 6);

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

  return <canvas ref={ref} className="block h-[400px] w-full" aria-hidden />;
}

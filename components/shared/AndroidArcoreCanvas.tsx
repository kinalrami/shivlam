"use client";

import { useEffect, useRef } from "react";

const G = "#3DDC84";
const O = "#FF9933";
const C = "#1DCFCF";

type ArObj = { x: number; y: number; label: string; color: string; phase: number };

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

function strokeRoundRect(
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
  ctx.stroke();
}

/** ARCore-style preview canvas for Android AR marketing sections */
export function AndroidArcoreCanvas() {
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

    const objects: ArObj[] = [
      { x: 0.32, y: 0.45, label: "PRODUCT_3D", color: G, phase: 0 },
      { x: 0.68, y: 0.4, label: "INFO_PANEL", color: O, phase: 1.5 },
      { x: 0.5, y: 0.6, label: "WAYPOINT", color: C, phase: 3.0 },
    ];

    const geo = { lat: 23.0225, lng: 72.5714 };

    function resize() {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rct = parent.getBoundingClientRect();
      canvas.width = rct.width * dpr;
      canvas.height = 400 * dpr;
      canvas.style.width = `${rct.width}px`;
      canvas.style.height = "400px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    function draw() {
      const W = canvas.offsetWidth;
      const H = 400;

      ctx.fillStyle = "#0d1117";
      ctx.fillRect(0, 0, W, H);

      const rg = ctx.createRadialGradient(W * 0.5, H * 0.4, 0, W * 0.5, H * 0.4, W * 0.65);
      rg.addColorStop(0, "rgba(30,60,35,.4)");
      rg.addColorStop(1, "transparent");
      ctx.fillStyle = rg;
      ctx.fillRect(0, 0, W, H);

      ctx.strokeStyle = "rgba(61,220,132,.14)";
      ctx.lineWidth = 1;
      const vx = W * 0.5;
      const vy = H * 0.22;
      for (let i = 0; i <= 12; i++) {
        const bx = W * (i / 12);
        ctx.beginPath();
        ctx.moveTo(bx, H * 0.92);
        ctx.lineTo(vx + (bx - vx) * 0.06, vy);
        ctx.stroke();
      }
      for (let j = 0; j <= 8; j++) {
        const p = j / 8;
        const y = H * 0.22 + p * (H * 0.7);
        const lx = W * 0.5 - W * 0.5 * (1 - p * 0.93);
        const rx = W * 0.5 + W * 0.5 * (1 - p * 0.93);
        ctx.beginPath();
        ctx.moveTo(lx, y);
        ctx.lineTo(rx, y);
        ctx.stroke();
      }

      const scanY = H * 0.18 + ((t * 0.6) % (H * 0.75));
      const sg = ctx.createLinearGradient(0, scanY - 2, 0, scanY + 2);
      sg.addColorStop(0, "transparent");
      sg.addColorStop(0.5, "rgba(61,220,132,.4)");
      sg.addColorStop(1, "transparent");
      ctx.fillStyle = sg;
      ctx.fillRect(0, scanY - 2, W, 4);

      for (let i = 0; i < 90; i++) {
        const px = (i * 113 + 37) % W;
        const py = (i * 79 + 13) % H;
        if (py < scanY) {
          ctx.fillStyle = `rgba(61,220,132,${0.08 + 0.12 * Math.sin(t * 0.02 + i)})`;
          ctx.fillRect(px - 1, py - 1, 2, 2);
        }
      }

      objects.forEach((obj, i) => {
        const ox = obj.x * W;
        const oy = (obj.y + Math.sin(t * 0.05 + obj.phase) * 0.015) * H;
        const sz = 22;
        ctx.fillStyle = "rgba(0,0,0,.25)";
        ctx.beginPath();
        ctx.ellipse(ox, oy + sz * 0.9 + 3, sz * 0.4, 5, 0, 0, Math.PI * 2);
        ctx.fill();

        const cw = 90;
        const ch = 36;
        ctx.fillStyle = "rgba(20,30,20,.75)";
        fillRoundRect(ctx, ox - cw / 2, oy - ch - sz, cw, ch, 6);
        ctx.strokeStyle = `${obj.color}88`;
        ctx.lineWidth = 1;
        strokeRoundRect(ctx, ox - cw / 2, oy - ch - sz, cw, ch, 6);

        ctx.font = "7px ui-monospace, JetBrains Mono, monospace";
        ctx.fillStyle = obj.color;
        ctx.textAlign = "center";
        ctx.fillText(obj.label, ox, oy - ch - sz + 14);
        ctx.fillStyle = "rgba(255,255,255,.3)";
        ctx.fillText(
          obj.color === G ? "AR_READY" : obj.color === O ? "DETECTED" : "ACTIVE",
          ox,
          oy - ch - sz + 26,
        );

        ctx.strokeStyle = `${obj.color}55`;
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 4]);
        ctx.beginPath();
        ctx.moveTo(ox, oy - sz);
        ctx.lineTo(ox, oy + sz * 0.9);
        ctx.stroke();
        ctx.setLineDash([]);

        const gp = 0.3 + 0.4 * Math.abs(Math.sin(t * 0.06 + i));
        const rgb =
          obj.color === G
            ? "61,220,132"
            : obj.color === O
              ? "255,153,51"
              : "29,207,207";
        ctx.strokeStyle = `rgba(${rgb},${gp})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(ox, oy + sz * 0.7, 12 + gp * 5, 0, Math.PI * 2);
        ctx.stroke();
      });

      ctx.fillStyle = "rgba(0,0,0,.55)";
      fillRoundRect(ctx, 8, 8, W - 16, 22, 5);
      ctx.font = "7px ui-monospace, JetBrains Mono, monospace";
      ctx.fillStyle = "rgba(61,220,132,.8)";
      ctx.textAlign = "left";
      ctx.fillText("ARCore 1.42 · TRACKING · PLANES: 2 · DEPTH: ACTIVE", 14, 21);

      ctx.fillStyle = "rgba(0,0,0,.5)";
      fillRoundRect(ctx, 8, H - 52, W - 16, 44, 5);
      ctx.font = "7px ui-monospace, JetBrains Mono, monospace";
      ctx.fillStyle = "rgba(61,220,132,.7)";
      ctx.textAlign = "left";
      ctx.fillText("GEOSPATIAL API · ACTIVE", 14, H - 36);
      ctx.fillStyle = "rgba(255,255,255,.4)";
      ctx.fillText(
        `LAT: ${geo.lat.toFixed(4)}  LNG: ${geo.lng.toFixed(4)}  ALT: 53m`,
        14,
        H - 22,
      );
      ctx.fillText(
        `HEADING: ${Math.round(180 + Math.sin(t * 0.01) * 30)}°  ACCURACY: ±0.3m`,
        14,
        H - 10,
      );

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

"use client";

import { useEffect, useRef } from "react";

const O = "#FF9933";
const C = "#1DCFCF";
const P = "#C084FC";

type WinDef = {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  float: number;
  phase: number;
  accent: string;
};

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

/** visionOS spatial UI preview for iPhone marketing sections */
export function IphoneVisionOsCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const canvas: HTMLCanvasElement = el;
    const maybeCtx = canvas.getContext("2d");
    if (!maybeCtx) return;

    const ctx: CanvasRenderingContext2D = maybeCtx;

    const H = 380;
    const dpr = window.devicePixelRatio || 1;
    let t = 0;
    let raf = 0;

    const wins: WinDef[] = [
      { x: 0.5, y: 0.22, w: 0.62, h: 0.18, label: "APP · SPATIAL WINDOW", float: 0.012, phase: 0, accent: P },
      { x: 0.25, y: 0.55, w: 0.36, h: 0.16, label: "CONTENT VIEW", float: 0.015, phase: 1.4, accent: O },
      { x: 0.74, y: 0.58, w: 0.32, h: 0.15, label: "3D VOLUME", float: 0.01, phase: 2.8, accent: C },
    ];

    const hand: [number, number][] = [
      [0.72, 0.72],
      [0.74, 0.67],
      [0.76, 0.61],
      [0.77, 0.57],
      [0.78, 0.54],
      [0.76, 0.7],
      [0.78, 0.63],
      [0.79, 0.57],
      [0.8, 0.54],
      [0.8, 0.71],
      [0.82, 0.64],
      [0.83, 0.58],
      [0.84, 0.55],
      [0.84, 0.72],
      [0.86, 0.66],
      [0.87, 0.6],
      [0.88, 0.57],
      [0.87, 0.74],
      [0.89, 0.68],
      [0.9, 0.64],
      [0.91, 0.61],
    ];

    const handConn: [number, number][] = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [5, 6],
      [6, 7],
      [7, 8],
      [9, 10],
      [10, 11],
      [11, 12],
      [13, 14],
      [14, 15],
      [15, 16],
      [17, 18],
      [18, 19],
      [19, 20],
      [0, 5],
      [5, 9],
      [9, 13],
      [13, 17],
      [0, 17],
    ];

    let gazeX = 0.5;
    let gazeY = 0.38;
    let gtX = 0.5;
    let gtY = 0.38;
    let gazeT = 0;

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

      ctx.fillStyle = "#1a1814";
      ctx.fillRect(0, 0, W, H);
      const rg = ctx.createRadialGradient(W * 0.5, H * 0.38, 0, W * 0.5, H * 0.4, W * 0.72);
      rg.addColorStop(0, "rgba(255,153,51,.07)");
      rg.addColorStop(1, "transparent");
      ctx.fillStyle = rg;
      ctx.fillRect(0, 0, W, H);

      for (let x = 0; x < W; x += 18) {
        for (let y = 0; y < H; y += 18) {
          ctx.fillStyle = "rgba(255,255,255,.06)";
          ctx.beginPath();
          ctx.arc(x, y, 0.75, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      gazeT++;
      if (gazeT > 90) {
        gtX = 0.15 + Math.random() * 0.7;
        gtY = 0.1 + Math.random() * 0.7;
        gazeT = 0;
      }
      gazeX += (gtX - gazeX) * 0.04;
      gazeY += (gtY - gazeY) * 0.04;
      const gx = gazeX * W;
      const gy = gazeY * H;

      [22, 14, 6].forEach((r, i) => {
        ctx.strokeStyle = `rgba(192,132,252,${0.12 - 0.03 * i})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(gx, gy, r, 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.fillStyle = `${P}99`;
      ctx.beginPath();
      ctx.arc(gx, gy, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = "6px ui-monospace, JetBrains Mono, monospace";
      ctx.fillStyle = `${P}88`;
      ctx.textAlign = "left";
      ctx.fillText("EYE_GAZE", gx + 10, gy - 6);

      wins.forEach((win) => {
        const wx = win.x * W;
        const wy = (win.y + Math.sin(t * 0.03 + win.phase) * win.float) * H;
        const ww = win.w * W;
        const wh = win.h * H;

        ctx.fillStyle = "rgba(12,12,12,.88)";
        fillRoundRect(ctx, wx - ww / 2, wy - wh / 2, ww, wh, 10);
        ctx.strokeStyle = `${win.accent}55`;
        ctx.lineWidth = 1;
        strokeRoundRect(ctx, wx - ww / 2, wy - wh / 2, ww, wh, 10);

        ctx.fillStyle = `${win.accent}22`;
        ctx.beginPath();
        ctx.rect(wx - ww / 2, wy - wh / 2, ww, 16);
        ctx.fill();

        ctx.font = "7px ui-monospace, JetBrains Mono, monospace";
        ctx.fillStyle = `${win.accent}cc`;
        ctx.textAlign = "left";
        ctx.fillText(win.label, wx - ww / 2 + 8, wy - wh / 2 + 11);

        for (let l = 0; l < 2; l++) {
          ctx.fillStyle = `rgba(255,255,255,${0.08 + l * 0.03})`;
          ctx.fillRect(
            wx - ww / 2 + 8,
            wy - wh / 2 + 22 + l * 10,
            ww * (0.4 + l * 0.15 + Math.sin(t * 0.03 + l) * 0.05),
            6,
          );
        }
      });

      ctx.strokeStyle = "rgba(255,153,51,.5)";
      ctx.lineWidth = 1;
      handConn.forEach(([a, b]) => {
        const wave = Math.sin(t * 0.04 + a * 0.3) * 0.012;
        ctx.beginPath();
        ctx.moveTo(hand[a][0] * W, (hand[a][1] + wave) * H);
        ctx.lineTo(hand[b][0] * W, (hand[b][1] + wave) * H);
        ctx.stroke();
      });
      hand.forEach((p, i) => {
        const wave = Math.sin(t * 0.04 + i * 0.3) * 0.012;
        ctx.fillStyle = i === 0 ? O : "rgba(255,153,51,.6)";
        ctx.beginPath();
        ctx.arc(p[0] * W, (p[1] + wave) * H, i === 0 ? 3 : 2, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.font = "6px ui-monospace, JetBrains Mono, monospace";
      ctx.fillStyle = "rgba(255,153,51,.6)";
      ctx.textAlign = "left";
      ctx.fillText("HAND_TRACKING · PINCH", hand[4][0] * W + 4, (hand[4][1] - 0.02) * H);

      const aw = wins[0].x * W;
      const ah = (wins[0].y + 0.12) * H;
      for (let r = 1; r <= 3; r++) {
        const rp = ((t * 0.015 + r * 0.33) % 1);
        ctx.strokeStyle = `rgba(192,132,252,${0.25 * (1 - rp)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(aw, ah, 20 + rp * 40, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.fillStyle = "rgba(0,0,0,.45)";
      ctx.fillRect(0, H - 24, W, 24);
      ctx.font = "7px ui-monospace, JetBrains Mono, monospace";
      ctx.fillStyle = "rgba(255,255,255,.38)";
      ctx.textAlign = "left";
      ctx.fillText(
        "visionOS 2 · RealityKit · EYE_TRACK: ON · HAND_TRACK: ON · SPATIAL AUDIO: ON",
        10,
        H - 9,
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

  return <canvas ref={ref} className="block h-[380px] w-full" aria-hidden />;
}

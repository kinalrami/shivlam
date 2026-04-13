"use client";

import { useEffect, useRef } from "react";

const O = "#FF9933";
const C = "#1DCFCF";
const G = "#22c55e";

type ArObj = {
  x: number;
  y: number;
  label: string;
  color: string;
  floatAmp: number;
  phase: number;
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

/** ARKit / LiDAR-style preview for iPhone AR/VR marketing sections */
export function IphoneArVrCanvas() {
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

    const objects: ArObj[] = [
      { x: 0.3, y: 0.42, label: "AR_OBJECT_01", color: O, floatAmp: 0.018, phase: 0 },
      { x: 0.68, y: 0.38, label: "AR_OBJECT_02", color: C, floatAmp: 0.015, phase: 1.2 },
      { x: 0.5, y: 0.58, label: "AR_ANCHOR_03", color: G, floatAmp: 0.012, phase: 2.4 },
    ];

    const anchors = [{ x: 0.22, y: 0.65 }, { x: 0.5, y: 0.7 }, { x: 0.76, y: 0.63 }];

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

      ctx.fillStyle = "#161820";
      ctx.fillRect(0, 0, W, H);
      const rg = ctx.createRadialGradient(W * 0.4, H * 0.35, 0, W * 0.4, H * 0.35, W * 0.6);
      rg.addColorStop(0, "rgba(50,40,25,.45)");
      rg.addColorStop(1, "transparent");
      ctx.fillStyle = rg;
      ctx.fillRect(0, 0, W, H);

      ctx.strokeStyle = "rgba(255,153,51,.12)";
      ctx.lineWidth = 1;
      const vx = W * 0.5;
      const vy = H * 0.25;
      for (let i = 0; i <= 10; i++) {
        const bx = W * (i / 10);
        ctx.beginPath();
        ctx.moveTo(bx, H * 0.9);
        ctx.lineTo(vx + (bx - vx) * 0.08, vy);
        ctx.stroke();
      }
      for (let j = 0; j <= 7; j++) {
        const prog = j / 7;
        const y = H * 0.25 + prog * (H * 0.65);
        const lx = W * 0.5 - W * 0.5 * (1 - prog * 0.92);
        const rx = W * 0.5 + W * 0.5 * (1 - prog * 0.92);
        ctx.beginPath();
        ctx.moveTo(lx, y);
        ctx.lineTo(rx, y);
        ctx.stroke();
      }

      const scanY = H * 0.2 + ((t * 0.8) % (H * 0.7));
      const sg = ctx.createLinearGradient(0, scanY - 2, 0, scanY + 2);
      sg.addColorStop(0, "transparent");
      sg.addColorStop(0.5, "rgba(29,207,207,.35)");
      sg.addColorStop(1, "transparent");
      ctx.fillStyle = sg;
      ctx.fillRect(0, scanY - 2, W, 4);

      for (let i = 0; i < 80; i++) {
        const px = (i * 127 + 17) % W;
        const py = (i * 83 + 11) % H;
        if (py < scanY) {
          ctx.fillStyle = `rgba(29,207,207,${0.1 + 0.15 * Math.sin(t * 0.02 + i)})`;
          ctx.fillRect(px - 1, py - 1, 2, 2);
        }
      }

      objects.forEach((obj, i) => {
        const ox = obj.x * W;
        const oy = (obj.y + Math.sin(t * 0.05 + obj.phase) * obj.floatAmp) * H;
        const s2 = 24;

        ctx.fillStyle = "rgba(0,0,0,.2)";
        ctx.beginPath();
        ctx.ellipse(ox, oy + s2 * 0.8 + 4, s2 * 0.45, 6, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `${obj.color}28`;
        ctx.strokeStyle = obj.color;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(ox, oy - s2 * 0.5);
        ctx.lineTo(ox + s2 * 0.7, oy - s2 * 0.12);
        ctx.lineTo(ox, oy + s2 * 0.25);
        ctx.lineTo(ox - s2 * 0.7, oy - s2 * 0.12);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = `${obj.color}18`;
        ctx.beginPath();
        ctx.moveTo(ox + s2 * 0.7, oy - s2 * 0.12);
        ctx.lineTo(ox + s2 * 0.7, oy + s2 * 0.4);
        ctx.lineTo(ox, oy + s2 * 0.78);
        ctx.lineTo(ox, oy + s2 * 0.25);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.font = "7px ui-monospace, JetBrains Mono, monospace";
        ctx.fillStyle = `${obj.color}cc`;
        ctx.textAlign = "left";
        ctx.fillText(obj.label, ox + s2 * 0.8, oy - s2 * 0.15);

        const pulse = 0.3 + 0.3 * Math.sin(t * 0.07 + i);
        ctx.strokeStyle = `rgba(${obj.color === O ? "255,153,51" : obj.color === C ? "29,207,207" : "34,197,94"},${pulse})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(ox, oy, s2 + 8 + pulse * 4, 0, Math.PI * 2);
        ctx.stroke();
      });

      anchors.forEach((a, i) => {
        const ax = a.x * W;
        const ay = a.y * H;
        const ap = 0.3 + 0.4 * Math.abs(Math.sin(t * 0.06 + i));
        ctx.strokeStyle = `rgba(255,153,51,${ap})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(ax - 10, ay);
        ctx.lineTo(ax + 10, ay);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(ax, ay - 10);
        ctx.lineTo(ax, ay + 10);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(ax, ay, 5 + ap * 3, 0, Math.PI * 2);
        ctx.stroke();
        ctx.font = "6px ui-monospace, JetBrains Mono, monospace";
        ctx.fillStyle = "rgba(255,153,51,.5)";
        ctx.textAlign = "left";
        ctx.fillText(`ANCHOR_0${i + 1}`, ax + 8, ay + 3);
      });

      ctx.fillStyle = "rgba(0,0,0,.5)";
      fillRoundRect(ctx, 10, 10, W - 20, 20, 4);
      ctx.font = "7px ui-monospace, JetBrains Mono, monospace";
      ctx.fillStyle = "rgba(255,153,51,.75)";
      ctx.textAlign = "left";
      ctx.fillText(
        `ARKit 6 · LiDAR ACTIVE · PLANES: 3 · ANCHORS: ${anchors.length}`,
        16,
        23,
      );

      ctx.fillStyle = "rgba(0,0,0,.4)";
      fillRoundRect(ctx, W - 72, H - 26, 62, 18, 3);
      ctx.font = "7px ui-monospace, JetBrains Mono, monospace";
      ctx.fillStyle = G;
      ctx.textAlign = "right";
      ctx.fillText("60fps ●", W - 10, H - 14);

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

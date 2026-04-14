"use client";

import type { GamePortfolioCanvasType } from "@/components/shared/portfolioGridTypes";

function hex8(hex: string, tail: string) {
  return hex.startsWith("#") && hex.length === 7 ? `${hex}${tail}` : hex;
}

function roundRectStroke(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

export function attachGamePortfolioCardCanvas(
  canvas: HTMLCanvasElement,
  opts: { gameType: GamePortfolioCanvasType; color1: string; color2: string },
): () => void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  const type = opts.gameType;
  const color1 = opts.color1;
  const color2 = opts.color2;

  let raf = 0;
  let t = 0;
  let destroyed = false;
  const cssH = 140;

  const resize = () => {
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const parent = canvas.parentElement;
    const rawW = parent?.getBoundingClientRect().width ?? canvas.offsetWidth;
    const cssW = Math.max(1, Math.floor(rawW || 1));
    canvas.width = Math.floor(cssW * dpr);
    canvas.height = Math.floor(cssH * dpr);
    canvas.style.height = `${cssH}px`;
    canvas.style.width = "100%";
    canvas.style.maxWidth = "100%";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const draw = () => {
    if (destroyed) return;
    const W = canvas.offsetWidth || 1;
    const H = cssH;

    ctx.fillStyle = "#08081a";
    ctx.fillRect(0, 0, W, H);

    for (let i = 0; i < 25; i++) {
      const sx = ((i * 137 + t * 0.5) % W) as number;
      const sy = ((i * 97) % H) as number;
      ctx.fillStyle = "rgba(255,255,255,.2)";
      ctx.fillRect(sx, sy, 1, 1);
    }

    if (type === "shooter") {
      const grad = ctx.createRadialGradient(W * 0.5, H * 0.3, 0, W * 0.5, H * 0.3, W * 0.5);
      grad.addColorStop(0, hex8(color1, "22"));
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = color1;
      ctx.beginPath();
      ctx.moveTo(W * 0.5, H * 0.75);
      ctx.lineTo(W * 0.42, H * 0.88);
      ctx.lineTo(W * 0.5, H * 0.82);
      ctx.lineTo(W * 0.58, H * 0.88);
      ctx.closePath();
      ctx.fill();

      [0.25, 0.5, 0.75].forEach((x, i) => {
        const ey = H * (0.15 + Math.sin(t * 0.06 + i) * 0.08);
        ctx.fillStyle = color2;
        ctx.beginPath();
        ctx.moveTo(x * W, ey - 8);
        ctx.lineTo(x * W - 6, ey + 6);
        ctx.lineTo(x * W + 6, ey + 6);
        ctx.closePath();
        ctx.fill();
      });

      ctx.fillStyle = hex8(color2, "cc");
      ctx.fillRect(W * 0.5 - 1, H * 0.75 - (t % 50) - 10, 2, 10);
    } else if (type === "ar") {
      ctx.strokeStyle = hex8(color1, "44");
      ctx.lineWidth = 1;
      for (let gx = 0; gx < W; gx += 20) {
        for (let gy = 0; gy < H; gy += 20) {
          ctx.beginPath();
          ctx.moveTo(gx, gy);
          ctx.lineTo(gx + 20, gy);
          ctx.moveTo(gx, gy);
          ctx.lineTo(gx, gy + 20);
          ctx.stroke();
        }
      }
      const cx = W * 0.5;
      const cy = H * 0.45;
      const s = 22;
      ctx.fillStyle = hex8(color1, "33");
      ctx.beginPath();
      ctx.moveTo(cx, cy - s * 0.5);
      ctx.lineTo(cx + s * 0.7, cy - s * 0.1);
      ctx.lineTo(cx, cy + s * 0.3);
      ctx.lineTo(cx - s * 0.7, cy - s * 0.1);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = color1;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      const ap = 0.3 + 0.3 * Math.sin(t * 0.1);
      ctx.strokeStyle = `rgba(255,107,107,${ap})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy + s * 0.7, 8 + ap * 4, 0, Math.PI * 2);
      ctx.stroke();
    } else if (type === "puzzle") {
      const cols = 4;
      const rows = 3;
      const cw = W / cols;
      const ch = H / rows;
      const colors2 = [color1, color2, "rgba(34,197,94,.7)", "rgba(255,255,255,.3)"];
      for (let r = 0; r < rows; r++) {
        for (let cc = 0; cc < cols; cc++) {
          const ci = (r * cols + cc + Math.floor(t / 120)) % colors2.length;
          const c = colors2[ci] ?? color1;
          ctx.fillStyle = `${c}55`;
          ctx.fillRect(cc * cw + 2, r * ch + 2, cw - 4, ch - 4);
          ctx.strokeStyle = c;
          ctx.lineWidth = 1;
          ctx.strokeRect(cc * cw + 2, r * ch + 2, cw - 4, ch - 4);
        }
      }
    } else if (type === "runner") {
      const rx = ((t * 2) % (W + 50)) - 30;
      const gy2 = H * 0.7;
      ctx.fillStyle = hex8(color1, "33");
      ctx.fillRect(0, gy2, W, H - gy2);
      ctx.strokeStyle = color1;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, gy2);
      ctx.lineTo(W, gy2);
      ctx.stroke();

      [0.3, 0.6, 0.9].forEach((ox) => {
        const obx = ((ox * W - t * 2 + W * 3) % (W * 1.5)) - W * 0.25;
        ctx.fillStyle = hex8(color2, "88");
        ctx.fillRect(obx, gy2 - 24, 14, 24);
      });

      ctx.fillStyle = color1;
      const runY = gy2 - 18 + Math.abs(Math.sin(t * 0.12)) * -16;
      ctx.beginPath();
      ctx.arc(rx, runY - 10, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(rx, runY - 4);
      ctx.lineTo(rx, runY + 10);
      ctx.lineTo(rx - 5 + Math.sin(t * 0.2) * 5, runY + 20);
      ctx.moveTo(rx, runY + 10);
      ctx.lineTo(rx + 5 - Math.sin(t * 0.2) * 5, runY + 20);
      ctx.moveTo(rx, runY);
      ctx.lineTo(rx - 8, runY + 6);
      ctx.lineTo(rx + 8, runY + 6);
      ctx.strokeStyle = color1;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    } else if (type === "spatial") {
      [
        [0.3, 0.3, 0.45, 0.3],
        [0.7, 0.5, 0.35, 0.25],
      ].forEach(([x, y, w, h], i) => {
        const wy = (y + Math.sin(t * 0.04 + i) * 0.06) * H;
        const wx = x * W;
        const ww = w * W;
        const hh = h * H;
        const x0 = wx - ww / 2;
        const y0 = wy - hh / 2;
        ctx.fillStyle = "rgba(192,132,252,.1)";
        ctx.beginPath();
        if (typeof ctx.roundRect === "function") {
          ctx.roundRect(x0, y0, ww, hh, 5);
        } else {
          roundRectStroke(ctx, x0, y0, ww, hh, 5);
        }
        ctx.fill();
        ctx.strokeStyle = hex8(color1, "66");
        ctx.lineWidth = 1;
        ctx.stroke();
      });
      const gx = W * 0.5 + Math.sin(t * 0.05) * W * 0.2;
      const gy2 = H * 0.4 + Math.cos(t * 0.04) * H * 0.15;
      ctx.strokeStyle = hex8(color1, "44");
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(gx, gy2, 12, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = hex8(color1, "88");
      ctx.beginPath();
      ctx.arc(gx, gy2, 3, 0, Math.PI * 2);
      ctx.fill();
    } else {
      const grad2 = ctx.createLinearGradient(0, 0, W, H);
      grad2.addColorStop(0, hex8(color1, "22"));
      grad2.addColorStop(1, hex8(color2, "22"));
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, W, H);

      ctx.font = "48px ui-serif, Georgia, serif";
      ctx.fillStyle = hex8(color1, "55");
      ctx.textAlign = "center";
      ctx.fillText("?", W * 0.5, H * 0.65);

      const prog = (t % 200) / 200;
      ctx.strokeStyle = hex8(color1, "88");
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.arc(W * 0.5, H * 0.5, 28, -Math.PI / 2, -Math.PI / 2 + prog * Math.PI * 2);
      ctx.stroke();
    }

    t++;
    raf = requestAnimationFrame(draw);
  };

  const ro = new ResizeObserver(() => resize());
  ro.observe(canvas.parentElement ?? canvas);
  resize();
  draw();

  return () => {
    destroyed = true;
    cancelAnimationFrame(raf);
    ro.disconnect();
  };
}

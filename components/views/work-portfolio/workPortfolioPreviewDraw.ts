import type { PreviewKind } from "@/lib/work-portfolio/types";

function hx(color: string, alphaHex: string) {
  return color + alphaHex;
}

/** Card preview canvas — ports HTML `.pc` draw logic (160px height) */
export function drawPortfolioPreview(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  t: number,
  type: PreviewKind,
  c1: string,
  c2: string,
) {
  function grid() {
    ctx.strokeStyle = "rgba(255,153,51,.04)";
    ctx.lineWidth = 0.8;
    for (let x = 0; x < W; x += 28) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = 0; y < H; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }
  }

  ctx.fillStyle = "#0a1020";
  ctx.fillRect(0, 0, W, H);
  grid();

  if (type === "ios") {
    const px = W / 2;
    const py = H / 2;
    const ph = 100;
    const pw = 52;
    ctx.fillStyle = hx(c1, "18");
    ctx.beginPath();
    roundRectPath(ctx, px - pw / 2, py - ph / 2, pw, ph, 10);
    ctx.fill();
    ctx.strokeStyle = hx(c1, "55");
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.fillStyle = hx(c1, "33");
    ctx.fillRect(px - pw / 2 + 4, py - ph / 2 + 14, pw - 8, ph * 0.38);
    ctx.fillStyle = "rgba(0,0,0,.5)";
    ctx.beginPath();
    roundRectPath(ctx, px - 12, py - ph / 2 + 3, 24, 5, 3);
    ctx.fill();
    [0.58, 0.68, 0.78, 0.88].forEach((yf, i) => {
      ctx.fillStyle = i % 2 ? hx(c2, "33") : hx(c1, "22");
      ctx.fillRect(
        px - pw / 2 + 6,
        py - ph / 2 + ph * yf,
        (pw - 12) * (0.5 + i * 0.12 + Math.sin(t * 0.04 + i) * 0.07),
        5,
      );
    });
    ctx.fillStyle = hx(c1, "44");
    ctx.beginPath();
    roundRectPath(ctx, px - 12, py + ph / 2 - 10, 24, 4, 2);
    ctx.fill();
  } else if (type === "arbim") {
    const bx = W * 0.1;
    const by = H * 0.08;
    const bw = W * 0.8;
    const bh = H * 0.78;
    ctx.strokeStyle = hx(c1, "44");
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(bx, by + bh);
    ctx.lineTo(bx, by);
    ctx.lineTo(bx + bw, by);
    ctx.lineTo(bx + bw, by + bh);
    ctx.stroke();
    for (let f = 0; f <= 4; f++) {
      const fy = by + f * (bh / 4);
      ctx.strokeStyle = f === 0 ? hx(c1, "77") : hx(c1, "25");
      ctx.lineWidth = f === 0 ? 1.2 : 0.8;
      ctx.beginPath();
      ctx.moveTo(bx, fy);
      ctx.lineTo(bx + bw, fy);
      ctx.stroke();
    }
    for (let f = 0; f < 4; f++)
      for (let w = 0; w < 3; w++) {
        const wx = bx + 14 + w * ((bw - 28) / 2.5);
        const wy = by + f * (bh / 4) + 6;
        ctx.fillStyle = hx(c1, "18");
        ctx.fillRect(wx, wy, (bw - 28) / 3 - 4, bh / 4 - 12);
        ctx.strokeStyle = hx(c1, "33");
        ctx.lineWidth = 0.7;
        ctx.strokeRect(wx, wy, (bw - 28) / 3 - 4, bh / 4 - 12);
      }
    const sl = by + ((t * 0.5) % bh);
    ctx.fillStyle = hx(c2, "33");
    ctx.fillRect(bx, sl, bw, 2);
    for (let i = 0; i < 25; i++) {
      const px = bx + (i * 53) % bw;
      const py2 = by + (i * 37) % bh;
      if (py2 < sl) {
        ctx.fillStyle = hx(c2, "55");
        ctx.fillRect(px - 1, py2 - 1, 2, 2);
      }
    }
    ctx.font = "6px ui-monospace, monospace";
    ctx.fillStyle = hx(c1, "66");
    ctx.textAlign = "center";
    ctx.fillText("LiDAR · IFC · BIM", W / 2, H - 6);
  } else if (type === "game-shoot") {
    for (let i = 0; i < 25; i++) {
      const sx = ((i * 97 + t * 0.4) % W);
      const sy = (i * 71) % H;
      ctx.fillStyle = "rgba(255,255,255,.22)";
      ctx.fillRect(sx, sy, 1, 1);
    }
    const g = ctx.createRadialGradient(W / 2, H * 0.4, 0, W / 2, H * 0.4, W * 0.45);
    g.addColorStop(0, hx(c1, "18"));
    g.addColorStop(1, "transparent");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = hx(c1, "cc");
    ctx.beginPath();
    ctx.moveTo(W / 2, H * 0.78);
    ctx.lineTo(W / 2 - 10, H * 0.93);
    ctx.lineTo(W / 2, H * 0.87);
    ctx.lineTo(W / 2 + 10, H * 0.93);
    ctx.closePath();
    ctx.fill();
    [0.22, 0.5, 0.78].forEach((x, i) => {
      const ey = H * (0.18 + Math.sin(t * 0.06 + i) * 0.06);
      ctx.fillStyle = hx(c2, "cc");
      ctx.beginPath();
      ctx.moveTo(x * W, ey - 8);
      ctx.lineTo(x * W - 6, ey + 6);
      ctx.lineTo(x * W + 6, ey + 6);
      ctx.closePath();
      ctx.fill();
    });
    ctx.fillStyle = c2;
    ctx.fillRect(W / 2 - 1, H * 0.78 - (t % 55) - 5, 2, 9);
  } else if (type === "game-ar") {
    ctx.strokeStyle = hx(c1, "22");
    ctx.lineWidth = 0.8;
    const vx = W / 2;
    const vy = H * 0.28;
    for (let i = 0; i <= 9; i++) {
      const bx = W * (i / 9);
      ctx.beginPath();
      ctx.moveTo(bx, H * 0.9);
      ctx.lineTo(vx + (bx - vx) * 0.08, vy);
      ctx.stroke();
    }
    for (let j = 0; j <= 5; j++) {
      const p = j / 5;
      const y = H * 0.28 + p * (H * 0.62);
      const lx = W / 2 - (W / 2) * (1 - p * 0.9);
      const rx = W / 2 + (W / 2) * (1 - p * 0.9);
      ctx.beginPath();
      ctx.moveTo(lx, y);
      ctx.lineTo(rx, y);
      ctx.stroke();
    }
    const ox = W / 2;
    const oy = H * 0.45 + Math.sin(t * 0.06) * 0.012 * H;
    const sz = 22;
    ctx.fillStyle = hx(c1, "22");
    ctx.strokeStyle = c1;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(ox, oy - sz * 0.5);
    ctx.lineTo(ox + sz * 0.7, oy - sz * 0.1);
    ctx.lineTo(ox, oy + sz * 0.28);
    ctx.lineTo(ox - sz * 0.7, oy - sz * 0.1);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    const sl = H * 0.2 + ((t * 0.4) % (H * 0.65));
    ctx.fillStyle = hx(c1, "22");
    ctx.fillRect(0, sl, W, 2);
  } else if (type === "game-puzzle") {
    const cs = [c1, c2, "#22c55e", "#ffffff"];
    for (let r = 0; r < 3; r++)
      for (let cc = 0; cc < 4; cc++) {
        const ci = (r * 4 + cc + Math.floor(t / 90)) % cs.length;
        const fill = cs[ci].startsWith("#") ? cs[ci] + "55" : "rgba(255,255,255,.12)";
        ctx.fillStyle = fill;
        ctx.fillRect(cc * (W / 4) + 2, r * (H / 3) + 2, W / 4 - 4, H / 3 - 4);
        ctx.strokeStyle = cs[ci].startsWith("#") ? cs[ci] : "rgba(255,255,255,.3)";
        ctx.lineWidth = 1;
        ctx.strokeRect(cc * (W / 4) + 2, r * (H / 3) + 2, W / 4 - 4, H / 3 - 4);
      }
  } else if (type === "game-runner") {
    const gy = H * 0.68;
    ctx.fillStyle = hx(c1, "22");
    ctx.fillRect(0, gy, W, H - gy);
    ctx.strokeStyle = c1;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, gy);
    ctx.lineTo(W, gy);
    ctx.stroke();
    [0.3, 0.65].forEach((ox) => {
      const obx = ((ox * W - t * 1.4 + W * 2) % (W * 1.5)) - W * 0.3;
      ctx.fillStyle = hx(c2, "88");
      ctx.fillRect(obx, gy - 20, 12, 20);
    });
    const rx = W * 0.28;
    const runY = gy - 15 + Math.abs(Math.sin(t * 0.12)) * -13;
    ctx.fillStyle = c1;
    ctx.beginPath();
    ctx.arc(rx, runY - 7, 5, 0, Math.PI * 2);
    ctx.fill();
  } else if (type === "web") {
    ctx.fillStyle = "rgba(16,43,77,.6)";
    ctx.fillRect(6, 6, W - 12, 18);
    ctx.fillStyle = hx(c1, "55");
    ctx.fillRect(10, 10, 36, 10);
    ctx.fillStyle = "rgba(255,255,255,.1)";
    [60, 90, 118].forEach((x) => ctx.fillRect(x, 10, 22, 10));
    ctx.fillStyle = hx(c1, "22");
    ctx.fillRect(6, 30, W - 12, 44);
    ctx.fillStyle = hx(c1, "55");
    ctx.fillRect(10, 36, (W - 22) * 0.55, 8);
    ctx.fillStyle = "rgba(255,255,255,.18)";
    ctx.fillRect(10, 47, (W - 22) * 0.4, 5);
    ctx.fillRect(10, 55, (W - 22) * 0.32, 5);
    ctx.fillStyle = c1;
    ctx.fillRect(10, 64, 34, 12);
    const cw = (W - 24) / 3;
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = "rgba(255,255,255,.03)";
      ctx.beginPath();
      roundRectPath(ctx, 6 + i * (cw + 4), 84, cw, 52, 3);
      ctx.fill();
      ctx.strokeStyle = hx(c1, "1a");
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = hx(c1, "2a");
      ctx.fillRect(10 + i * (cw + 4), 88, 12, 12);
      ctx.fillStyle = "rgba(255,255,255,.12)";
      ctx.fillRect(10 + i * (cw + 4), 104, cw - 16, 4);
      ctx.fillRect(10 + i * (cw + 4), 112, cw - 24, 3);
    }
    const sl = (t * 0.4) % H;
    ctx.fillStyle = hx(c1, "18");
    ctx.fillRect(0, sl, W, 2);
  } else if (type === "uiux") {
    ctx.fillStyle = "rgba(244,239,230,.06)";
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "rgba(16,43,77,.15)";
    ctx.fillRect(0, 0, 14, H);
    ctx.fillRect(0, 0, W, 14);
    [
      [0.1, 0.1, 0.38, 0.84],
      [0.54, 0.1, 0.38, 0.84],
    ].forEach(([x, y, w, h], fi) => {
      const fx = x * W;
      const fy = y * H;
      const fw = w * W;
      const fh = h * H;
      ctx.strokeStyle = hx(c1, "44");
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 3]);
      ctx.strokeRect(fx, fy, fw, fh);
      ctx.setLineDash([]);
      ctx.fillStyle = hx(c2, "22");
      ctx.fillRect(fx + 4, fy + 4, fw - 8, fh * 0.3);
      [0.4, 0.52, 0.64, 0.74].forEach((yf) => {
        ctx.fillStyle = "rgba(255,255,255,.06)";
        ctx.fillRect(fx + 4, fy + fh * yf, fw * 0.68, 5);
      });
      if (Math.floor(t / 120) % 2 === fi) {
        ctx.strokeStyle = c1;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(fx - 2, fy - 2, fw + 4, fh + 4);
      }
    });
  } else if (type === "seo") {
    const cx = 10;
    const cy = 22;
    const cw = W - 20;
    const ch = H - 38;
    ctx.strokeStyle = "rgba(255,255,255,.05)";
    ctx.lineWidth = 0.7;
    for (let y = 0; y < 5; y++) {
      const ly = cy + y * (ch / 4);
      ctx.beginPath();
      ctx.moveTo(cx, ly);
      ctx.lineTo(cx + cw, ly);
      ctx.stroke();
    }
    const pts = 24;
    ctx.strokeStyle = c1;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let i = 0; i < pts; i++) {
      const px = cx + i * (cw / pts);
      const rank = 82 - (82 - 3) * Math.pow(i / (pts - 1), 0.6) + Math.sin(i * 0.9) * 2;
      const py = cy + (rank / 100) * ch;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx, cy + ch);
    for (let i = 0; i < pts; i++) {
      const px = cx + i * (cw / pts);
      const rank = 82 - (82 - 3) * Math.pow(i / (pts - 1), 0.6) + Math.sin(i * 0.9) * 2;
      ctx.lineTo(px, cy + (rank / 100) * ch);
    }
    ctx.lineTo(cx + cw, cy + ch);
    ctx.closePath();
    ctx.fillStyle = hx(c1, "12");
    ctx.fill();
    ctx.fillStyle = hx(c1, "22");
    ctx.beginPath();
    roundRectPath(ctx, cx + cw - 30, cy + ch - 18, 30, 16, 4);
    ctx.fill();
    ctx.font = "8px ui-monospace, monospace";
    ctx.fillStyle = c1;
    ctx.textAlign = "center";
    ctx.fillText(
      "#" + Math.round(3 + Math.abs(Math.sin(t * 0.025)) * 2),
      cx + cw - 15,
      cy + ch - 7,
    );
    ctx.font = "6px ui-monospace, monospace";
    ctx.fillStyle = "rgba(255,255,255,.18)";
    ctx.textAlign = "left";
    ctx.fillText("GOOGLE RANK", cx, cy + ch + 14);
  }
}

function roundRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const c = ctx as CanvasRenderingContext2D & {
    roundRect?: (x: number, y: number, w: number, h: number, r: number) => void;
  };
  if (typeof c.roundRect === "function") c.roundRect(x, y, w, h, r);
  else ctx.rect(x, y, w, h);
}

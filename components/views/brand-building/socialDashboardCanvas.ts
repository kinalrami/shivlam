"use client";

type Cleanup = () => void;

function roundRectPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

export function attachSocialDashboardCanvas(canvas: HTMLCanvasElement): Cleanup {
  const ctx0 = canvas.getContext("2d");
  if (!ctx0) return () => {};
  const ctx: CanvasRenderingContext2D = ctx0;

  const ORANGE = "#FF9933";
  const CYAN = "#1DCFCF";
  const GREEN = "#22c55e";

  let raf = 0;
  let t = 0;
  let destroyed = false;

  const metrics = [
    { label: "IMPRESSIONS", target: 142_800, color: CYAN, unit: "K" as const },
    { label: "REACH", target: 89_200, color: ORANGE, unit: "K" as const },
    { label: "ENGAGEMENT", target: 8.4, color: GREEN, unit: "%" as const },
    { label: "FOLLOWERS", target: 12_400, color: "#C084FC", unit: "" as const },
  ];

  const weeklyData = [12, 18, 14, 22, 35, 28, 42];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const resize = () => {
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const parent = canvas.parentElement;
    const rawW = parent?.getBoundingClientRect().width ?? canvas.offsetWidth;
    const cssW = Math.max(1, Math.floor(rawW || 1));
    const cssH = 320;
    canvas.width = Math.floor(cssW * dpr);
    canvas.height = Math.floor(cssH * dpr);
    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${cssH}px`;
    canvas.style.maxWidth = "100%";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const draw = () => {
    if (destroyed) return;
    const W = canvas.offsetWidth || 1;
    const H = 320;

    ctx.fillStyle = "#1a1a2e";
    ctx.fillRect(0, 0, W, H);

    // Header
    ctx.fillStyle = "rgba(255,255,255,.04)";
    ctx.fillRect(0, 0, W, 36);
    ctx.font = "8px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
    ctx.fillStyle = "rgba(255,255,255,.5)";
    ctx.textAlign = "left";
    ctx.fillText("SOCIAL MEDIA DASHBOARD · LIVE", 10, 14);
    ctx.fillStyle = "rgba(255,255,255,.25)";
    ctx.textAlign = "right";
    ctx.fillText(new Date().toLocaleTimeString(), W - 10, 14);

    // Platform chips
    (["IG", "LI", "YT", "X"] as const).forEach((p, i) => {
      const px = 10 + i * 48;
      const colors = [ORANGE, CYAN, "#FF0000", "rgba(255,255,255,.6)"];
      const pcolor = colors[i] ?? ORANGE;
      ctx.fillStyle = `${pcolor}22`;
      roundRectPath(ctx, px, 20, 40, 12, 3);
      ctx.fill();
      ctx.font = "7px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
      ctx.fillStyle = pcolor;
      ctx.textAlign = "center";
      ctx.fillText(p, px + 20, 29);
    });

    const prog = Math.min(1, t / 300);

    // Metrics row
    metrics.forEach((m, i) => {
      const mx = 10 + i * (W / 4);
      const my = 44;
      const mw = W / 4 - 8;
      const mh = 52;
      ctx.fillStyle = "rgba(255,255,255,.03)";
      roundRectPath(ctx, mx, my, mw, mh, 4);
      ctx.fill();
      ctx.strokeStyle = `${m.color}33`;
      ctx.lineWidth = 1;
      roundRectPath(ctx, mx, my, mw, mh, 4);
      ctx.stroke();

      const val = m.target * prog;
      const dispVal =
        m.unit === "%"
          ? `${val.toFixed(1)}%`
          : m.unit === "K"
            ? `${(val / 1000).toFixed(1)}K`
            : val >= 10_000
              ? `${(val / 1000).toFixed(1)}K`
              : `${Math.round(val)}`;

      ctx.font = "8px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
      ctx.fillStyle = `${m.color}99`;
      ctx.textAlign = "left";
      ctx.fillText(m.label.slice(0, 10), mx + 6, my + 14);
      ctx.font = "bold 14px ui-serif, Georgia, serif";
      ctx.fillStyle = m.color;
      ctx.fillText(dispVal, mx + 6, my + 34);

      ctx.strokeStyle = `${m.color}66`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let d = 0; d < 5; d++) {
        const sx = mx + 4 + (d * (mw - 8)) / 4;
        const sy = my + mh - 4 - (Math.sin(t * 0.06 + i + d * 0.8) * 0.5 + 0.5) * 10;
        if (d === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      }
      ctx.stroke();
    });

    // Weekly bars
    const barY = 105;
    const barH = H - barY - 30;
    ctx.font = "7px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
    ctx.fillStyle = "rgba(255,255,255,.3)";
    ctx.textAlign = "left";
    ctx.fillText("WEEKLY ENGAGEMENT RATE", 10, barY - 6);
    const maxVal = Math.max(...weeklyData);
    weeklyData.forEach((v, i) => {
      const slot = (W - 20) / 7;
      const bx = 10 + i * slot + 2;
      const bw = slot - 6;
      const bh = (v / maxVal) * barH * Math.min(1, prog + 0.3);
      ctx.fillStyle = "rgba(255,153,51,.12)";
      ctx.fillRect(bx, barY + barH - bh, bw, bh);
      const highlightColor = [CYAN, ORANGE, CYAN, ORANGE, GREEN, ORANGE, GREEN][i] ?? ORANGE;
      ctx.fillStyle = `${highlightColor}cc`;
      ctx.fillRect(bx, barY + barH - bh, bw, Math.min(4, bh));
      ctx.font = "6px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
      ctx.fillStyle = "rgba(255,255,255,.25)";
      ctx.textAlign = "center";
      ctx.fillText(days[i] ?? "", bx + bw / 2, H - 8);
      if (bh > 10) {
        ctx.fillStyle = "rgba(255,255,255,.4)";
        ctx.fillText(`${v}%`, bx + bw / 2, barY + barH - bh - 4);
      }
    });

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


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

export function attachAdsDashboardCanvas(canvas: HTMLCanvasElement): Cleanup {
  const ctx0 = canvas.getContext("2d");
  if (!ctx0) return () => {};
  const ctx: CanvasRenderingContext2D = ctx0;

  const ORANGE = "#FF9933";
  const CYAN = "#1DCFCF";
  const GREEN = "#22c55e";

  let raf = 0;
  let t = 0;
  let destroyed = false;

  const campaigns = [
    { name: "Brand Search", status: "ACTIVE", impressions: 24_800, clicks: 1840, ctr: 7.4, cpc: 0.82, color: GREEN },
    { name: "Competitor KW", status: "ACTIVE", impressions: 18_200, clicks: 960, ctr: 5.3, cpc: 1.24, color: ORANGE },
    { name: "Display Brand", status: "ACTIVE", impressions: 142_000, clicks: 2100, ctr: 1.5, cpc: 0.44, color: CYAN },
    { name: "Perf. Max", status: "LEARNING", impressions: 8400, clicks: 420, ctr: 5.0, cpc: 1.62, color: "#C084FC" },
  ] as const;

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
    ctx.fillText("GOOGLE ADS MANAGER · CAMPAIGN VIEW", 10, 14);
    ctx.fillStyle = GREEN;
    ctx.textAlign = "right";
    ctx.fillText("● CAMPAIGNS RUNNING", W - 10, 14);

    const prog = Math.min(1, t / 240);
    const totalSpend = (campaigns.reduce((s, c) => s + c.clicks * c.cpc, 0) * prog).toFixed(0);
    const totalClicks = Math.round(campaigns.reduce((s, c) => s + c.clicks, 0) * prog);
    const avgCtr = (campaigns.reduce((s, c) => s + c.ctr, 0) / campaigns.length).toFixed(1);

    [`$${totalSpend} spent`, `${totalClicks} clicks`, `${avgCtr}% avg CTR`].forEach((v, i) => {
      const sx = 10 + i * (W / 3);
      ctx.fillStyle = "rgba(255,255,255,.03)";
      roundRectPath(ctx, sx, 22, W / 3 - 8, 12, 2);
      ctx.fill();
      ctx.font = "7px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
      ctx.fillStyle = [ORANGE, CYAN, GREEN][i] ?? ORANGE;
      ctx.textAlign = "center";
      ctx.fillText(v, sx + W / 6 - 4, 30);
    });

    // Column headers
    const headers = ["CAMPAIGN", "IMPR.", "CLICKS", "CTR", "CPC"];
    const colW = [W * 0.36, W * 0.16, W * 0.14, W * 0.14, W * 0.12];
    let colX = 8;
    headers.forEach((h, i) => {
      ctx.font = "7px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
      ctx.fillStyle = "rgba(255,255,255,.25)";
      ctx.textAlign = "left";
      ctx.fillText(h, colX + 2, 52);
      colX += colW[i] ?? 0;
    });
    ctx.strokeStyle = "rgba(255,255,255,.06)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(8, 55);
    ctx.lineTo(W - 8, 55);
    ctx.stroke();

    campaigns.forEach((c, i) => {
      const ry = 60 + i * 52;
      if (ry + 44 > H - 24) return;

      ctx.fillStyle = i % 2 === 0 ? "rgba(255,255,255,.02)" : "transparent";
      ctx.fillRect(8, ry, W - 16, 48);

      const statusColor = c.status === "ACTIVE" ? GREEN : ORANGE;
      ctx.fillStyle = statusColor;
      ctx.beginPath();
      ctx.arc(14, ry + 12, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = "9px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif";
      ctx.fillStyle = c.color;
      ctx.textAlign = "left";
      ctx.fillText(c.name, 22, ry + 14);
      ctx.font = "7px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
      ctx.fillStyle = "rgba(255,255,255,.25)";
      ctx.fillText(c.status, 22, ry + 26);

      const vals = [
        `${((c.impressions * prog) / 1000).toFixed(1)}k`,
        `${Math.round(c.clicks * prog)}`,
        `${c.ctr}%`,
        `$${c.cpc}`,
      ];

      colX = 8 + colW[0];
      vals.forEach((v, j) => {
        ctx.font = "9px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
        ctx.fillStyle = `${c.color}cc`;
        ctx.textAlign = "left";
        ctx.fillText(v, colX + 4, ry + 14);
        colX += colW[j + 1] ?? 0;
      });

      const barW = (c.ctr / 10) * (W - 20) * Math.min(1, prog + 0.2);
      ctx.fillStyle = `${c.color}22`;
      ctx.fillRect(8, ry + 32, W - 16, 8);
      ctx.fillStyle = `${c.color}88`;
      ctx.fillRect(8, ry + 32, barW, 8);

      ctx.strokeStyle = "rgba(255,255,255,.04)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(8, ry + 44);
      ctx.lineTo(W - 8, ry + 44);
      ctx.stroke();
    });

    // Footer
    ctx.fillStyle = "rgba(0,0,0,.3)";
    ctx.fillRect(0, H - 24, W, 24);
    ctx.font = "7px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
    ctx.fillStyle = "rgba(255,255,255,.3)";
    ctx.textAlign = "left";
    ctx.fillText("DAILY BUDGET: $150 · ROAS: 3.8x · QS AVG: 8.2/10", 10, H - 9);

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


"use client";

type Cleanup = () => void;

const ORANGE = "#FF9933";
const CYAN = "#1DCFCF";
const GREEN = "#22c55e";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function attachSeoCanvas(canvas: HTMLCanvasElement): Cleanup {
  const ctx0 = canvas.getContext("2d");
  if (!ctx0) return () => {};
  const ctx: CanvasRenderingContext2D = ctx0;

  let raf = 0;
  let t = 0;
  let destroyed = false;

  const keywords = [
    { kw: "brand building ahmedabad", pos: 42, target: 3, color: ORANGE },
    { kw: "digital marketing services", pos: 67, target: 8, color: CYAN },
    { kw: "seo company india", pos: 31, target: 2, color: GREEN },
    { kw: "brand strategy consultant", pos: 88, target: 12, color: "#C084FC" },
    { kw: "social media marketing", pos: 55, target: 5, color: "#60A5FA" },
    { kw: "google ads management", pos: 73, target: 9, color: "#FB923C" },
  ] as const;

  const histories = keywords.map((k) => {
    const arr: number[] = [];
    for (let i = 0; i < 60; i++) {
      const prog = i / 59;
      arr.push(k.pos - (k.pos - k.target) * Math.pow(prog, 0.7) + Math.sin(i * 0.8) * 2);
    }
    return arr;
  });

  const resize = () => {
    const dpr = clamp(window.devicePixelRatio || 1, 1, 2);
    const parent = canvas.parentElement;
    const rawW = parent?.getBoundingClientRect().width ?? canvas.offsetWidth;
    const cssW = Math.max(1, Math.floor(rawW || 1));
    const cssH = 400;
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
    const H = 400;

    ctx.fillStyle = "#080818";
    ctx.fillRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = "rgba(255,153,51,.05)";
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = 0; y < H; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    // Title
    ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
    ctx.fillStyle = "rgba(255,153,51,.7)";
    ctx.textAlign = "left";
    ctx.fillText("KEYWORD RANKING TRACKER · GOOGLE SEARCH", 12, 22);

    const chartX = 12;
    const chartY = 40;
    const chartW = W - 24;
    const chartH = H - 80;

    // Y axis labels (Google positions)
    const labels = ["#1", "#5", "#10", "#20", "#50", "#100"] as const;
    labels.forEach((lbl, i) => {
      const y = chartY + i * (chartH / 5);
      ctx.fillStyle = "rgba(255,255,255,.15)";
      ctx.textAlign = "right";
      ctx.font = "9px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
      ctx.fillText(lbl, chartX + 28, y + 4);
      ctx.strokeStyle = "rgba(255,255,255,.04)";
      ctx.beginPath();
      ctx.moveTo(chartX + 32, y);
      ctx.lineTo(chartX + chartW, y);
      ctx.stroke();
    });

    // Draw each keyword line
    const visiblePts = Math.min(60, Math.floor(t / 2) + 1);
    keywords.forEach((kw, ki) => {
      const hist = histories[ki];
      ctx.strokeStyle = kw.color;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      hist.slice(0, visiblePts).forEach((pos, i) => {
        const px = chartX + 32 + i * ((chartW - 32) / 59);
        const py = chartY + (pos / 100) * chartH;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();

      // Current position dot
      const curPos = hist[Math.min(visiblePts - 1, hist.length - 1)];
      const dotX = chartX + 32 + (visiblePts - 1) * ((chartW - 32) / 59);
      const dotY = chartY + (curPos / 100) * chartH;
      ctx.fillStyle = kw.color;
      ctx.beginPath();
      ctx.arc(dotX, dotY, 3.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // Legend table
    const legX = chartX + 32;
    const legY = H - 32;
    keywords.forEach((kw, i) => {
      const lx = legX + i * (chartW / keywords.length);
      ctx.fillStyle = kw.color;
      ctx.beginPath();
      ctx.arc(lx + 6, legY, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = "9px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
      ctx.fillStyle = "rgba(255,255,255,.4)";
      ctx.textAlign = "left";
      const curPos = histories[i][Math.min(visiblePts - 1, histories[i].length - 1)];
      ctx.fillText(`#${Math.round(curPos)}`, lx + 12, legY + 4);
    });

    // Scanning line
    if (visiblePts < 60) {
      const scanX = chartX + 32 + (visiblePts - 1) * ((chartW - 32) / 59);
      ctx.strokeStyle = "rgba(255,153,51,.3)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(scanX, chartY);
      ctx.lineTo(scanX, chartY + chartH);
      ctx.stroke();
      ctx.setLineDash([]);
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


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

export function attachAsoCanvas(canvas: HTMLCanvasElement): Cleanup {
  const ctx0 = canvas.getContext("2d");
  if (!ctx0) return () => {};
  const ctx: CanvasRenderingContext2D = ctx0;

  const ORANGE = "#FF9933";
  const NAVY = "#102B4D";
  const WHITE = "#ffffff";

  const apps = [
    { name: "Your App", rank: 1, rating: 4.8, color: ORANGE, own: true },
    { name: "Competitor A", rank: 2, rating: 4.2, color: "rgba(16,43,77,.30)", own: false },
    { name: "Competitor B", rank: 3, rating: 4.0, color: "rgba(16,43,77,.30)", own: false },
    { name: "Competitor C", rank: 4, rating: 3.9, color: "rgba(16,43,77,.30)", own: false },
    { name: "Competitor D", rank: 5, rating: 3.7, color: "rgba(16,43,77,.30)", own: false },
  ] as const;

  const totalFrames = 600;
  let raf = 0;
  let t = 0;
  let destroyed = false;

  const resize = () => {
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
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

    ctx.fillStyle = "#0d1117";
    ctx.fillRect(0, 0, W, H);

    // Header
    ctx.fillStyle = "rgba(255,255,255,.03)";
    ctx.fillRect(0, 0, W, 50);
    ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
    ctx.fillStyle = "rgba(255,255,255,.75)";
    ctx.textAlign = "left";
    ctx.fillText("App Store · Search Results", 12, 20);
    ctx.font = "8px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
    ctx.fillStyle = "rgba(255,255,255,.42)";
    ctx.fillText(`"brand building app" · ${apps.length} results`, 12, 36);

    // Search bar
    ctx.fillStyle = "rgba(255,255,255,.06)";
    roundRectPath(ctx, 12, 56, W - 24, 28, 6);
    ctx.fill();
    ctx.font = "9px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
    ctx.fillStyle = "rgba(255,255,255,.55)";
    ctx.textAlign = "left";
    ctx.fillText("🔍  brand building app", 22, 73);

    const prog = Math.min(1, t / totalFrames);
    const curRank = Math.max(1, Math.round(4 - (4 - 1) * Math.pow(prog, 0.6)));

    const sortedApps = [...apps];
    sortedApps.sort((a, b) => {
      const ar = a.own ? curRank : a.rank + (a.rank >= curRank ? 1 : 0);
      const br = b.own ? curRank : b.rank + (b.rank >= curRank ? 1 : 0);
      return ar - br;
    });

    sortedApps.forEach((app, i) => {
      const ay = 95 + i * 54;
      if (ay + 44 > H - 20) return;

      if (app.own) {
        ctx.fillStyle = "rgba(255,153,51,.08)";
        roundRectPath(ctx, 8, ay - 4, W - 16, 48, 6);
        ctx.fill();
        ctx.strokeStyle = "rgba(255,153,51,.3)";
        ctx.lineWidth = 1;
        roundRectPath(ctx, 8, ay - 4, W - 16, 48, 6);
        ctx.stroke();
      }

      // Icon
      const iconColor = app.own ? ORANGE : "rgba(255,255,255,.12)";
      ctx.fillStyle = iconColor;
      roundRectPath(ctx, 16, ay, 36, 36, 8);
      ctx.fill();
      if (app.own) {
        ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.fillText("S", 34, ay + 22);
      }

      // Name
      ctx.font = `${app.own ? "600 " : ""}11px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif`;
      ctx.fillStyle = app.own ? WHITE : "rgba(255,255,255,.60)";
      ctx.textAlign = "left";
      ctx.fillText(app.name, 60, ay + 14);

      // Stars
      ctx.font = "9px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif";
      ctx.fillStyle = app.own ? ORANGE : "rgba(255,255,255,.32)";
      const stars = "★".repeat(Math.max(1, Math.min(5, Math.round(app.rating))));
      ctx.fillText(`${stars}  ${app.rating}`, 60, ay + 30);

      // Rank badge
      const rankNum = app.own ? curRank : i + 1;
      ctx.fillStyle = app.own ? ORANGE : "rgba(255,255,255,.08)";
      roundRectPath(ctx, W - 52, ay + 8, 36, 22, 4);
      ctx.fill();
      ctx.font = "8px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
      ctx.fillStyle = app.own ? "#fff" : "rgba(255,255,255,.55)";
      ctx.textAlign = "center";
      ctx.fillText(`#${rankNum}`, W - 34, ay + 22);

      if (i < sortedApps.length - 1) {
        ctx.strokeStyle = "rgba(255,255,255,.06)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(16, ay + 44);
        ctx.lineTo(W - 16, ay + 44);
        ctx.stroke();
      }
    });

    // Progress bar
    ctx.fillStyle = "rgba(255,255,255,.04)";
    ctx.fillRect(0, H - 20, W, 20);
    ctx.fillStyle = ORANGE;
    ctx.fillRect(0, H - 20, W * prog, 20);
    ctx.font = "8px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
    ctx.fillStyle = "rgba(255,255,255,.55)";
    ctx.textAlign = "center";
    ctx.fillText(`ASO OPTIMISATION PROGRESS · ${Math.round(prog * 100)}%`, W / 2, H - 7);

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


export function attachStrategyFunnelCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  const CYAN = "#1DCFCF";
  const ORANGE = "#FF9933";
  const GREEN = "#22c55e";
  const NAVY = "#102b4d";

  const stages = [
    { label: "AWARENESS", sublabel: "They find your content", w: 0.9, color: CYAN, count: "100,000" },
    { label: "INTEREST", sublabel: "They research your brand", w: 0.72, color: ORANGE, count: "32,000" },
    { label: "CONSIDERATION", sublabel: "They compare you to others", w: 0.54, color: "#C084FC", count: "8,400" },
    { label: "INTENT", sublabel: "They look for your service", w: 0.36, color: GREEN, count: "2,100" },
    { label: "CONVERSION", sublabel: "They contact / buy", w: 0.22, color: ORANGE, count: "420" },
  ] as const;

  const roundRectPath = (x: number, y: number, w: number, h: number, r: number) => {
    const rr = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.arcTo(x + w, y, x + w, y + h, rr);
    ctx.arcTo(x + w, y + h, x, y + h, rr);
    ctx.arcTo(x, y + h, x, y, rr);
    ctx.arcTo(x, y, x + w, y, rr);
    ctx.closePath();
  };

  let raf = 0;
  let t = 0;
  let destroyed = false;

  const resize = () => {
    const parent = canvas.parentElement;
    if (!parent) return;
    const r = parent.getBoundingClientRect();
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const cssW = Math.max(1, Math.floor(r.width));
    const cssH = 360;
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
    const H = 360;

    // Paper background (inside canvas only)
    ctx.fillStyle = "#0d1117";
    ctx.fillRect(0, 0, W, H);

    // Light grid (inside canvas only)
    ctx.strokeStyle = "rgba(61,220,132,.14)";
    ctx.lineWidth = 0.5;
    for (let x = 0; x < W; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = 0; y < H; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    const prog = Math.min(1, t / 180);
    const topY = 16;
    const totalH = H - topY - 28;
    const stageH = totalH / stages.length;

    stages.forEach((st, i) => {
      const sw = st.w * W * prog;
      const sx = (W - sw) / 2;
      const sy = topY + i * stageH;
      const sh = stageH - 4;

      ctx.fillStyle = `${st.color}18`;
      roundRectPath(sx, sy, sw, sh, 4);
      ctx.fill();
      ctx.strokeStyle = `${st.color}66`;
      ctx.lineWidth = 1.2;
      roundRectPath(sx, sy, sw, sh, 4);
      ctx.stroke();

      const pulse = 0.4 + 0.3 * Math.sin(t * 0.08 + i);
      ctx.strokeStyle = st.color;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = pulse;
      roundRectPath(sx, sy, sw, sh, 4);
      ctx.stroke();
      ctx.globalAlpha = 1;

      ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
      ctx.fillStyle = "rgba(255,255,255,.70)";
      ctx.textAlign = "left";
      ctx.fillText(st.label, sx + 8, sy + 15);
      ctx.font = "8px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif";
      ctx.fillStyle = "rgba(255,255,255,.35)";
      ctx.fillText(st.sublabel, sx + 8, sy + 28);

      ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
      ctx.fillStyle = st.color;
      ctx.textAlign = "right";
      if (sw > 60) ctx.fillText(st.count, sx + sw - 8, sy + 15);

      if (i < stages.length - 1) {
        const ax = W / 2;
        const ay = sy + sh + 2;
        ctx.fillStyle = `${st.color}55`;
        ctx.beginPath();
        ctx.moveTo(ax - 6, ay);
        ctx.lineTo(ax + 6, ay);
        ctx.lineTo(ax, ay + 4);
        ctx.closePath();
        ctx.fill();
      }
    });

    ctx.font = "9px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
    ctx.fillStyle = "rgba(255,255,255,.22)";
    ctx.textAlign = "center";
    ctx.fillText("BRAND CONVERSION FUNNEL · SHIVLAM", W / 2, H - 8);

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


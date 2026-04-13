"use client";

export function attachWebDesignCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let raf = 0;
  let t = 0;

  const ORANGE = "#FF9933";
  const CYAN = "#1DCFCF";

  const elements = [
    { x: 0.1, y: 0.08, w: 0.8, h: 0.12, label: "HEADER / NAV", color: ORANGE, delay: 0 },
    { x: 0.1, y: 0.23, w: 0.45, h: 0.22, label: "HERO TEXT", color: CYAN, delay: 10 },
    { x: 0.58, y: 0.23, w: 0.32, h: 0.22, label: "HERO IMAGE", color: ORANGE, delay: 20 },
    { x: 0.1, y: 0.48, w: 0.23, h: 0.16, label: "CARD 01", color: CYAN, delay: 30 },
    { x: 0.36, y: 0.48, w: 0.23, h: 0.16, label: "CARD 02", color: CYAN, delay: 40 },
    { x: 0.62, y: 0.48, w: 0.28, h: 0.16, label: "CARD 03", color: CYAN, delay: 50 },
    { x: 0.1, y: 0.68, w: 0.8, h: 0.1, label: "CTA SECTION", color: ORANGE, delay: 60 },
    { x: 0.1, y: 0.82, w: 0.8, h: 0.08, label: "FOOTER", color: "rgba(255,255,255,.3)", delay: 70 },
  ] as const;

  const resize = () => {
    const parent = canvas.parentElement;
    if (!parent) return;
    const r = parent.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const cssW = Math.max(1, Math.floor(r.width));
    const cssH = 340;
    canvas.width = Math.floor(cssW * dpr);
    canvas.height = Math.floor(cssH * dpr);
    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${cssH}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const roundRect = (x: number, y: number, w: number, h: number, r: number) => {
    const rr = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.arcTo(x + w, y, x + w, y + h, rr);
    ctx.arcTo(x + w, y + h, x, y + h, rr);
    ctx.arcTo(x, y + h, x, y, rr);
    ctx.arcTo(x, y, x + w, y, rr);
    ctx.closePath();
  };

  const draw = () => {
    const w = canvas.offsetWidth;
    const h = 340;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#0a1a2e";
    ctx.fillRect(0, 0, w, h);

    // Figma grid dots
    for (let x = 0; x < w; x += 20) {
      for (let y = 0; y < h; y += 20) {
        ctx.fillStyle = "rgba(255,255,255,.04)";
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Rulers
    ctx.fillStyle = "rgba(255,255,255,.04)";
    ctx.fillRect(0, 0, 18, h);
    ctx.fillRect(0, 0, w, 18);
    ctx.font = "9px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
    ctx.fillStyle = "rgba(255,255,255,.2)";
    for (let i = 0; i < h; i += 40) {
      ctx.textAlign = "right";
      ctx.fillText(String(i), 16, i + 24);
    }
    for (let i = 0; i < w; i += 60) {
      ctx.textAlign = "center";
      ctx.fillText(String(i), i + 18, 14);
    }

    const ox = 22;
    const oy = 22;
    const pw = w - ox;
    const ph = h - oy;

    elements.forEach((el, idx) => {
      const progress = Math.min(1, Math.max(0, (t - el.delay) / 30));
      if (progress <= 0) return;
      const ex = ox + el.x * pw;
      const ey = oy + el.y * ph;
      const ew = el.w * pw * progress;
      const eh = el.h * ph;

      ctx.globalAlpha = progress;
      ctx.fillStyle = `${el.color}18`;
      roundRect(ex, ey, ew, eh, 3);
      ctx.fill();
      ctx.strokeStyle = `${el.color}66`;
      ctx.lineWidth = 1;
      roundRect(ex, ey, ew, eh, 3);
      ctx.stroke();
      ctx.globalAlpha = 1;

      if (progress > 0.6) {
        ctx.globalAlpha = progress;
        ctx.font = "9px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
        ctx.fillStyle = "rgba(255,255,255,.4)";
        ctx.textAlign = "left";
        ctx.fillText(el.label, ex + 8, ey + eh / 2 + 4);
        ctx.globalAlpha = 1;
      }

      if (progress >= 1 && Math.floor(t / 80) % elements.length === idx) {
        const handles: Array<[number, number]> = [
          [ex, ey],
          [ex + ew, ey],
          [ex, ey + eh],
          [ex + ew, ey + eh],
        ];
        ctx.strokeStyle = el.color as string;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(ex - 2, ey - 2, ew + 4, eh + 4);
        handles.forEach(([hx, hy]) => {
          ctx.fillStyle = "#fff";
          ctx.fillRect(hx - 3, hy - 3, 6, 6);
          ctx.strokeStyle = el.color as string;
          ctx.lineWidth = 1;
          ctx.strokeRect(hx - 3, hy - 3, 6, 6);
        });
      }
    });

    const ci = Math.floor(t / 40) % elements.length;
    const cel = elements[ci];
    if (cel) {
      const curX = ox + cel.x * pw + cel.w * pw * 0.72;
      const curY = oy + cel.y * ph + (cel.h * ph) / 2;
      ctx.fillStyle = "rgba(255,255,255,.75)";
      ctx.beginPath();
      ctx.moveTo(curX, curY);
      ctx.lineTo(curX + 8, curY + 12);
      ctx.lineTo(curX + 4, curY + 12);
      ctx.lineTo(curX + 6, curY + 16);
      ctx.lineTo(curX + 4, curY + 16);
      ctx.lineTo(curX + 2, curY + 12);
      ctx.lineTo(curX - 2, curY + 12);
      ctx.closePath();
      ctx.fill();
    }

    t += 1;
    raf = window.requestAnimationFrame(draw);
  };

  resize();
  const ro = new ResizeObserver(() => resize());
  ro.observe(canvas.parentElement ?? canvas);
  window.addEventListener("resize", resize);
  raf = window.requestAnimationFrame(draw);

  return () => {
    if (raf) window.cancelAnimationFrame(raf);
    window.removeEventListener("resize", resize);
    ro.disconnect();
  };
}


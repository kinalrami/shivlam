"use client";

export function attachWebTechCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let raf = 0;
  let t = 0;

  const ORANGE = "#FF9933";
  const CYAN = "#1DCFCF";
  const GREEN = "#22c55e";
  const BLUE = "#54a6ff";

  // Keep enough space so the last row isn't clipped in a 320px canvas.
  const layers = [
    { label: "FRONTEND", y: 40, items: ["React / Next.js", "Vue / Nuxt", "Tailwind CSS"], color: CYAN },
    { label: "CMS / ECOM", y: 116, items: ["WordPress", "Shopify", "Magento"], color: ORANGE },
    { label: "BACKEND", y: 192, items: ["Laravel", "PHP 8", "REST API"], color: BLUE },
    { label: "DATABASE", y: 268, items: ["MySQL", "PostgreSQL", "Redis"], color: GREEN },
  ] as const;

  const resize = () => {
    const parent = canvas.parentElement;
    if (!parent) return;
    const r = parent.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const cssW = Math.max(1, Math.floor(r.width));
    const cssH = 320;
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
    const h = 320;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#0a1b33";
    ctx.fillRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = "rgba(255,153,51,.04)";
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    layers.forEach((layer, li) => {
      const lx = 28;
      const lw = w - 56;
      const ly = layer.y;

      ctx.fillStyle = "rgba(255,255,255,.03)";
      roundRect(lx, ly - 18, lw, 52, 6);
      ctx.fill();
      ctx.strokeStyle = `${layer.color}33`;
      ctx.lineWidth = 1;
      roundRect(lx, ly - 18, lw, 52, 6);
      ctx.stroke();

      ctx.font = "700 10px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
      ctx.fillStyle = layer.color;
      ctx.textAlign = "left";
      ctx.fillText(layer.label, lx + 10, ly);

      const iw = (lw - 24) / layer.items.length;
      layer.items.forEach((item, i) => {
        const ix = lx + 12 + i * iw;
        const iy = ly + 10;
        const ipw = iw - 12;
        const pulse = Math.sin(t * 0.03 + li + i * 1.4);
        ctx.fillStyle = `${layer.color}18`;
        roundRect(ix, iy, ipw, 20, 5);
        ctx.fill();
        ctx.strokeStyle = `${layer.color}${pulse > 0.4 ? "55" : "22"}`;
        ctx.lineWidth = 1;
        roundRect(ix, iy, ipw, 20, 5);
        ctx.stroke();
        ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
        ctx.fillStyle = "rgba(255,255,255,.65)";
        ctx.textAlign = "center";
        ctx.fillText(item, ix + ipw / 2, iy + 14);
      });

      if (li < layers.length - 1) {
        const nextY = layers[li + 1].y;
        const midY = (ly + 34 + nextY - 18) / 2;
        [0.33, 0.5, 0.67].forEach((xr, di) => {
          const dx = lx + lw * xr;
          const alpha = 0.12 + 0.22 * Math.abs(Math.sin(t * 0.04 + di + li));
          ctx.strokeStyle = `rgba(255,153,51,${alpha})`;
          ctx.lineWidth = 1;
          ctx.setLineDash([3, 4]);
          ctx.beginPath();
          ctx.moveTo(dx, ly + 34);
          ctx.lineTo(dx, nextY - 18);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.fillStyle = `rgba(255,153,51,${alpha * 2})`;
          ctx.beginPath();
          ctx.arc(dx, midY, 2, 0, Math.PI * 2);
          ctx.fill();
        });
      }
    });

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


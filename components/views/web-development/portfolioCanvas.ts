export type WebPortCardVariant = {
  label: string;
  accentColor: string; // hex like #FF9933
};

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

function hexToRgba(hex: string, a: number) {
  const h = hex.replace("#", "").trim();
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const r = Number.parseInt(full.slice(0, 2), 16);
  const g = Number.parseInt(full.slice(2, 4), 16);
  const b = Number.parseInt(full.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

/** Matches the HTML `drawPortCard()` preview canvas style. */
export function attachWebPortCardCanvas(canvas: HTMLCanvasElement, variant: WebPortCardVariant): Cleanup {
  const ctx0 = canvas.getContext("2d");
  if (!ctx0) return () => {};
  const ctx: CanvasRenderingContext2D = ctx0;

  let raf = 0;
  let t = 0;
  let cancelled = false;

  function resize() {
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const cssW = Math.max(1, canvas.offsetWidth || 1);
    const cssH = Math.max(1, canvas.offsetHeight || 1);
    canvas.width = Math.floor(cssW * dpr);
    canvas.height = Math.floor(cssH * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function draw() {
    if (cancelled) return;
    const w = canvas.offsetWidth || 1;
    const h = canvas.offsetHeight || 160;
    const accent = variant.accentColor;

    ctx.fillStyle = "#0a1b33";
    ctx.fillRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = "rgba(255,153,51,0.04)";
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Website wireframe bars
    ctx.fillStyle = "rgba(16,43,77,0.7)";
    ctx.fillRect(8, 8, w - 16, 14); // nav

    ctx.fillStyle = hexToRgba(accent, 0.2);
    ctx.fillRect(8, 28, w - 16, 40); // hero

    ctx.fillStyle = hexToRgba(accent, 0.4);
    ctx.fillRect(12, 34, (w - 24) * 0.6, 8);

    ctx.fillStyle = "rgba(255,255,255,0.1)";
    ctx.fillRect(12, 46, (w - 24) * 0.4, 6);

    // CTA button
    ctx.fillStyle = accent;
    ctx.fillRect(12, 57, 36, 10);

    // Cards
    const cw = (w - 28) / 3;
    for (let i = 0; i < 3; i++) {
      const x = 8 + i * (cw + 4);
      const y = 74;
      ctx.fillStyle = "rgba(255,255,255,0.04)";
      roundRectPath(ctx, x, y, cw, 36, 3);
      ctx.fill();

      ctx.strokeStyle = hexToRgba(accent, 0.13);
      ctx.lineWidth = 1;
      roundRectPath(ctx, x, y, cw, 36, 3);
      ctx.stroke();

      ctx.fillStyle = hexToRgba(accent, 0.27);
      ctx.fillRect(12 + i * (cw + 4), 78, 12, 10);

      ctx.fillStyle = "rgba(255,255,255,0.2)";
      ctx.fillRect(12 + i * (cw + 4), 92, cw - 14, 4);
      ctx.fillRect(12 + i * (cw + 4), 99, cw - 22, 3);
    }

    // Scan line
    const sl = ((t * 0.5) % h + h) % h;
    const g = ctx.createLinearGradient(0, sl, 0, sl + 3);
    g.addColorStop(0, "transparent");
    g.addColorStop(0.5, hexToRgba(accent, 0.13));
    g.addColorStop(1, "transparent");
    ctx.fillStyle = g;
    ctx.fillRect(0, sl, w, 3);

    // Label
    ctx.font =
      "700 7px ui-monospace, 'JetBrains Mono', SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace";
    ctx.fillStyle = hexToRgba(accent, 0.6);
    ctx.textAlign = "right";
    ctx.fillText(variant.label, w - 10, h - 8);

    t += 1;
    raf = requestAnimationFrame(draw);
  }

  const onResize = () => resize();
  window.addEventListener("resize", onResize);
  resize();
  draw();

  return () => {
    cancelled = true;
    window.removeEventListener("resize", onResize);
    cancelAnimationFrame(raf);
  };
}


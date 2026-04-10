type Cleanup = () => void;

/** Ported from `shivlam-iphone-dev.html` (`#port-cv`). */
export function attachPortfolioCanvas(canvas: HTMLCanvasElement): Cleanup {
  const ctx0 = canvas.getContext("2d");
  if (!ctx0) return () => {};
  const ctx: CanvasRenderingContext2D = ctx0;

  let raf = 0;
  let t = 0;

  function resize() {
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const cssW = Math.max(1, canvas.offsetWidth || 1);
    const cssH = Math.max(1, canvas.offsetHeight || 1);
    canvas.width = Math.floor(cssW * dpr);
    canvas.height = Math.floor(cssH * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function draw() {
    t += 0.009;
    const W = canvas.offsetWidth || 1;
    const H = canvas.offsetHeight || 1;

    ctx.clearRect(0, 0, W, H);
    // Match other canvases (e.g. `whyCanvas.ts`): dark base + subtle grid.
    ctx.fillStyle = "#040e1e";
    ctx.fillRect(0, 0, W, H);

    for (let i = 0; i < W; i += 36) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, H);
      ctx.strokeStyle = "rgba(16,43,77,0.2)";
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
    for (let j = 0; j < H; j += 36) {
      ctx.beginPath();
      ctx.moveTo(0, j);
      ctx.lineTo(W, j);
      ctx.strokeStyle = "rgba(16,43,77,0.2)";
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    const icons = [
      { e: "📱", lbl: "Mobile" },
      { e: "🏗", lbl: "AR BIM" },
      { e: "🎮", lbl: "Games" },
      { e: "🌐", lbl: "Web" },
      { e: "📊", lbl: "Analytics" },
      { e: "🛒", lbl: "eCommerce" },
    ] as const;

    icons.forEach((ic, i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const ix = W * 0.15 + col * (W * 0.28);
      const iy = H * 0.18 + row * (H * 0.42);
      const pulse = 0.85 + 0.1 * Math.sin(t * 0.8 + i * 0.7);

      ctx.fillStyle = "rgba(255,255,255,0.06)";
      ctx.beginPath();
      if (typeof (ctx as unknown as { roundRect?: Function }).roundRect === "function") {
        (ctx as unknown as { roundRect: Function }).roundRect(ix - 28, iy - 28, 56, 56, 10);
      }
      else ctx.rect(ix - 28, iy - 28, 56, 56);
      ctx.fill();

      ctx.strokeStyle = `rgba(245,138,11,${0.18 + 0.1 * Math.sin(t + i)})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.font = `${22 * pulse}px ui-sans-serif, system-ui, sans-serif`;
      ctx.textAlign = "center";
      // Match HTML: keep icons subtle (same family as card fill tone).
      ctx.fillStyle = "rgba(255,255,255,0.38)";
      ctx.fillText(ic.e, ix, iy + 8);

      // Draw labels with a scaled transform so they remain small
      // even when browsers clamp/alias very small font sizes.
      ctx.save();
      ctx.translate(ix, iy + 33);
      ctx.scale(0.6, 0.6);
      ctx.textAlign = "center";
      ctx.fillStyle = "rgba(255,255,255,0.35)";
      ctx.font = "22px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
      ctx.fillText(ic.lbl, 0, 0);
      ctx.restore();
    });

    for (let i = 0; i < icons.length - 1; i++) {
      const col1 = i % 3;
      const row1 = Math.floor(i / 3);
      const col2 = (i + 1) % 3;
      const row2 = Math.floor((i + 1) / 3);
      const ax = W * 0.15 + col1 * (W * 0.28);
      const ay = H * 0.18 + row1 * (H * 0.42);
      const bx = W * 0.15 + col2 * (W * 0.28);
      const by = H * 0.18 + row2 * (H * 0.42);
      const prog = (((t * 0.4 + i * 0.2) % 1) + 1) % 1;
      const px = ax + (bx - ax) * prog;
      const py = ay + (by - ay) * prog;

      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(bx, by);
      ctx.strokeStyle = "rgba(245,138,11,0.12)";
      ctx.lineWidth = 0.8;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(px, py, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(245,138,11,0.6)";
      ctx.fill();
    }

    ctx.textAlign = "left";
    raf = requestAnimationFrame(draw);
  }

  const onResize = () => resize();
  window.addEventListener("resize", onResize);
  resize();
  draw();

  return () => {
    window.removeEventListener("resize", onResize);
    cancelAnimationFrame(raf);
  };
}


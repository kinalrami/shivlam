type Cleanup = () => void;

/** Ported from `shivlam-iphone-dev.html` (`#why-cv`). */
export function attachWhyCanvas(canvas: HTMLCanvasElement): Cleanup {
  const ctx0 = canvas.getContext("2d");
  if (!ctx0) return () => {};
  const ctx: CanvasRenderingContext2D = ctx0;

  let raf = 0;
  let t = 0;

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function draw() {
    t += 0.01;
    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

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

    const cx = W / 2;
    const cy = H / 2 - 20;
    const layers = [
      { label: "UI Layer", color: "rgba(245,138,11,", y: 0 },
      { label: "Logic Layer", color: "rgba(16,93,180,", y: 38 },
      { label: "Data Layer", color: "rgba(29,207,207,", y: 76 },
      { label: "iOS API", color: "rgba(245,138,11,", y: 114 },
    ] as const;
    const tilt = 0.3 + 0.08 * Math.sin(t * 0.4);
    const rot = t * 0.08;

    // Reduce perceived "zoom" vs HTML by scaling the illustration only.
    const s = 0.99;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(s, s);

    layers.forEach((l, i) => {
      const alpha = 0.55 + 0.15 * Math.sin(t * 0.6 + i * 0.8);
      const yOff = l.y - Math.sin(t * 0.3 + i) * 0.5;
      const zOff = Math.cos(t * 0.3 + i) * 0.5;
      const W2 = 110;

      // These mirror the HTML math; kept to preserve the look.
      void {
        x: (-W2 / 2) * Math.cos(rot) - zOff * Math.sin(rot),
        y: -yOff + (-W2 / 2) * tilt,
      };

      const px = (i - 1.5) * 6;
      const py = (i - 1.5) * 12;
      const rw = 130 - i * 6;
      const rh = 22;

      ctx.save();
      ctx.translate(px, py);
      ctx.scale(1, 0.5);
      ctx.rotate(0.52);
      ctx.beginPath();
      ctx.rect(-rw / 2, -rh / 2, rw, rh);
      ctx.fillStyle = `${l.color}${alpha})`;
      ctx.fill();
      ctx.strokeStyle = `${l.color}0.5)`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      ctx.fillStyle = `rgba(255,255,255,${alpha * 0.7})`;
      ctx.font = "8px var(--font-space-mono), ui-monospace, monospace";
      ctx.textAlign = "center";
      ctx.fillText(l.label, px, py + 8);
    });
    ctx.textAlign = "left";

    for (let i = 0; i < 22; i++) {
      const ang = (i / 22) * Math.PI * 2 + t * 0.12;
      const r = W * 0.32;
      const px2 = Math.cos(ang) * r;
      const py2 = Math.sin(ang) * r * 0.4 - 20;
      const pulse = 0.15 + 0.5 * Math.sin(t * 1.5 + i * 0.4);
      ctx.beginPath();
      ctx.arc(px2, py2, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245,138,11,${pulse})`;
      ctx.fill();
    }

    ctx.restore();
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


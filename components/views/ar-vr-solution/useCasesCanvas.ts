type CaseCvType = "walk" | "clash" | "train";

/** Use-cases card background canvas (ported from provided HTML script). */
export function attachArVrCaseCanvas(canvas: HTMLCanvasElement, type: CaseCvType) {
  const ctx0 = canvas.getContext("2d");
  if (!ctx0) return () => {};
  const x: CanvasRenderingContext2D = ctx0;

  let raf = 0;
  let t = Math.random() * 40;
  let dpr = 1;
  let ro: ResizeObserver | null = null;

  function resize() {
    dpr = Math.max(1, Math.floor((window.devicePixelRatio || 1) * 100) / 100);
    const cssW = Math.max(1, canvas.offsetWidth);
    const cssH = Math.max(1, canvas.offsetHeight);
    canvas.width = Math.floor(cssW * dpr);
    canvas.height = Math.floor(cssH * dpr);
    x.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function draw() {
    t += 0.009;
    const W = canvas.width / dpr;
    const H = canvas.height / dpr;

    x.clearRect(0, 0, W, H);
    // Slightly brighter base to match the HTML's lighter cards.
    x.fillStyle = "#071422";
    x.fillRect(0, 0, W, H);

    for (let i = 0; i < W; i += 30) {
      x.beginPath();
      x.moveTo(i + 0.5, 0);
      x.lineTo(i + 0.5, H);
      x.strokeStyle = "rgba(16,43,77,0.16)";
      x.lineWidth = 0.5;
      x.stroke();
    }
    for (let j = 0; j < H; j += 30) {
      x.beginPath();
      x.moveTo(0, j + 0.5);
      x.lineTo(W, j + 0.5);
      x.strokeStyle = "rgba(16,43,77,0.16)";
      x.lineWidth = 0.5;
      x.stroke();
    }

    if (type === "walk") {
      const pts = [
        [W * 0.1, H * 0.5],
        [W * 0.3, H * 0.3],
        [W * 0.5, H * 0.6],
        [W * 0.7, H * 0.3],
        [W * 0.9, H * 0.5],
      ] as const;
      x.beginPath();
      pts.forEach((p, i) => (i === 0 ? x.moveTo(p[0], p[1]) : x.lineTo(p[0], p[1])));
      x.strokeStyle = "rgba(255,153,51,0.35)";
      x.lineWidth = 1.5;
      x.stroke();
      pts.forEach((p, i) => {
        const pulse = 0.4 + 0.5 * Math.sin(t * 1.5 + i * 0.8);
        x.beginPath();
        x.arc(p[0], p[1], 4 + pulse * 3, 0, Math.PI * 2);
        x.fillStyle = `rgba(255,153,51,${pulse * 0.24})`;
        x.fill();
        x.beginPath();
        x.arc(p[0], p[1], 4, 0, Math.PI * 2);
        x.fillStyle = `rgba(255,153,51,${0.55 + pulse * 0.25})`;
        x.fill();
      });
    } else if (type === "clash") {
      x.beginPath();
      x.moveTo(W * 0.1, H * 0.35);
      x.lineTo(W * 0.9, H * 0.35);
      x.strokeStyle = "rgba(255,153,51,0.55)";
      x.lineWidth = 3;
      x.stroke();

      x.beginPath();
      x.moveTo(W * 0.5, H * 0.1);
      x.lineTo(W * 0.5, H * 0.9);
      x.strokeStyle = "rgba(29,207,207,0.45)";
      x.lineWidth = 2.5;
      x.stroke();

      const cr = 8 + 4 * Math.sin(t * 3);
      x.beginPath();
      x.arc(W * 0.5, H * 0.35, cr, 0, Math.PI * 2);
      x.strokeStyle = `rgba(220,60,60,${0.6 + 0.3 * Math.sin(t * 3)})`;
      x.lineWidth = 2;
      x.stroke();
      x.beginPath();
      x.arc(W * 0.5, H * 0.35, cr * 1.8, 0, Math.PI * 2);
      x.strokeStyle = "rgba(220,60,60,0.2)";
      x.lineWidth = 1.5;
      x.stroke();
    } else {
      const cx = W / 2;
      const cy = H / 2;
      [0, 1, 2].forEach((i) => {
        const r = 28 + i * 18;
        const angle = t * (i % 2 === 0 ? 1 : -1) * 0.5 + i * 1.2;
        x.beginPath();
        x.arc(cx, cy, r, 0, Math.PI * 2);
        x.strokeStyle = `rgba(255,153,51,${0.2 + i * 0.08})`;
        x.lineWidth = 0.8;
        x.stroke();
        for (let j = 0; j < 8; j++) {
          const a = angle + (j / 8) * Math.PI * 2;
          x.beginPath();
          x.moveTo(cx + Math.cos(a) * (r - 4), cy + Math.sin(a) * (r - 4));
          x.lineTo(cx + Math.cos(a) * (r + 5), cy + Math.sin(a) * (r + 5));
          x.strokeStyle = `rgba(255,153,51,${0.3 + i * 0.1})`;
          x.lineWidth = 1.5;
          x.stroke();
        }
      });
    }

    raf = requestAnimationFrame(draw);
  }

  resize();
  draw();

  if (typeof ResizeObserver !== "undefined") {
    ro = new ResizeObserver(() => resize());
    ro.observe(canvas);
  } else {
    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }

  return () => {
    ro?.disconnect();
    cancelAnimationFrame(raf);
  };
}


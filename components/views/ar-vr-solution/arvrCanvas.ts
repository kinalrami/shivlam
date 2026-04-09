/** AR/VR hero canvas (matches provided HTML mock). */
export function attachArVrHero3d(canvas: HTMLCanvasElement) {
  const ctx0 = canvas.getContext("2d");
  if (!ctx0) return () => {};
  const x: CanvasRenderingContext2D = ctx0;

  let raf = 0;
  let t = 0;
  const tR = { v: 0 };
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

  function proj(px: number, py: number, pz: number) {
    const rY = tR.v * 0.08;
    const co = Math.cos(rY);
    const si = Math.sin(rY);
    const rx = px * co - pz * si;
    const rz = px * si + pz * co;
    const W = canvas.width / dpr;
    const H = canvas.height / dpr;
    const fov = 480;
    const d = fov / (fov + rz + 350);
    return { x: W / 2 + rx * d * 2.2, y: H / 2 - py * d * 2.2 + 20 };
  }

  function pipe(pts: Array<{ x: number; y: number }>, col: string, lw = 2) {
    x.beginPath();
    pts.forEach((p, i) => (i === 0 ? x.moveTo(p.x, p.y) : x.lineTo(p.x, p.y)));
    x.strokeStyle = col;
    x.lineWidth = lw;
    x.stroke();

    x.beginPath();
    pts.forEach((p, i) => (i === 0 ? x.moveTo(p.x, p.y) : x.lineTo(p.x, p.y)));
    x.strokeStyle = col.replace(/[\d.]+\)$/, "0.14)");
    x.lineWidth = lw * 4;
    x.stroke();
  }

  function box(ox: number, oy: number, oz: number, bw: number, bh: number, bd: number, col: string, lw = 0.9) {
    const v = [
      proj(ox - bw / 2, oy, oz - bd / 2),
      proj(ox + bw / 2, oy, oz - bd / 2),
      proj(ox + bw / 2, oy, oz + bd / 2),
      proj(ox - bw / 2, oy, oz + bd / 2),
      proj(ox - bw / 2, oy + bh, oz - bd / 2),
      proj(ox + bw / 2, oy + bh, oz - bd / 2),
      proj(ox + bw / 2, oy + bh, oz + bd / 2),
      proj(ox - bw / 2, oy + bh, oz + bd / 2),
    ];
    (
      [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 0],
        [4, 5],
        [5, 6],
        [6, 7],
        [7, 4],
        [0, 4],
        [1, 5],
        [2, 6],
        [3, 7],
      ] as const
    ).forEach(([a, b]) => {
      x.beginPath();
      x.moveTo(v[a].x, v[a].y);
      x.lineTo(v[b].x, v[b].y);
      x.strokeStyle = col;
      x.lineWidth = lw;
      x.stroke();
    });
  }

  function draw() {
    t += 0.008;
    tR.v = t;

    const W = canvas.width / dpr;
    const H = canvas.height / dpr;
    x.clearRect(0, 0, W, H);

    const bg = x.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.65);
    bg.addColorStop(0, "rgba(16,43,77,0.45)");
    bg.addColorStop(1, "rgba(4,8,16,0.98)");
    x.fillStyle = bg;
    x.fillRect(0, 0, W, H);

    for (let i = 0; i < W; i += 38) {
      x.beginPath();
      x.moveTo(i + 0.5, 0);
      x.lineTo(i + 0.5, H);
      x.strokeStyle = "rgba(16,43,77,0.18)";
      x.lineWidth = 0.5;
      x.stroke();
    }
    for (let j = 0; j < H; j += 38) {
      x.beginPath();
      x.moveTo(0, j + 0.5);
      x.lineTo(W, j + 0.5);
      x.strokeStyle = "rgba(16,43,77,0.18)";
      x.lineWidth = 0.5;
      x.stroke();
    }

    // main plant structure
    box(0, 0, 0, 140, 100, 100, "rgba(16,43,77,0.9)", 1.2);
    box(-90, 0, 10, 60, 60, 60, "rgba(16,43,77,0.7)", 0.9);
    box(90, 0, 10, 50, 80, 50, "rgba(16,43,77,0.65)", 0.85);
    box(0, 100, 0, 80, 40, 60, "rgba(16,43,77,0.5)", 0.75);

    // pipes in orange — industrial cooling
    pipe([proj(-70, 50, 0), proj(-70, 50, -50), proj(90, 50, -50), proj(90, 50, 0)], "rgba(255,153,51,0.85)", 2.2);
    pipe([proj(0, 80, 0), proj(0, 80, 60), proj(-90, 80, 60)], "rgba(255,153,51,0.6)", 1.8);
    pipe([proj(70, 30, 0), proj(70, 30, 50), proj(-70, 30, 50), proj(-70, 30, 0)], "rgba(29,207,207,0.6)", 1.5);

    // AR anchor pulse effects
    [proj(-70, 50, -50), proj(90, 50, -50), proj(0, 80, 60)].forEach((p, i) => {
      const pulse = 5 + 4 * Math.sin(t * 2 + i * 1.2);
      x.beginPath();
      x.arc(p.x, p.y, pulse, 0, Math.PI * 2);
      x.strokeStyle = `rgba(255,153,51,${0.4 + 0.3 * Math.sin(t * 2 + i)})`;
      x.lineWidth = 1.5;
      x.stroke();
      x.beginPath();
      x.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
      x.fillStyle = "rgba(255,153,51,0.9)";
      x.fill();
    });

    // floating data
    const dataItems: Array<[string, { x: number; y: number }]> = [
      ["TEMP_IN: 24°C", proj(-70, 50, -50)],
      ["FLOW: 12L/s", proj(90, 50, -50)],
      ["PRESSURE: 2.4bar", proj(0, 80, 60)],
    ];
    dataItems.forEach(([label, p]) => {
      x.fillStyle = "rgba(29,207,207,0.65)";
      x.font = '7px ui-monospace, "JetBrains Mono", Menlo, Monaco, Consolas, monospace';
      x.textAlign = "center";
      x.textBaseline = "alphabetic";
      x.fillText(label, p.x, p.y - 12);
    });
    x.textAlign = "left";

    // ground
    for (let i = -5; i <= 5; i++) {
      const a = proj(i * 40, 0, -210);
      const b = proj(i * 40, 0, 210);
      x.beginPath();
      x.moveTo(a.x, a.y);
      x.lineTo(b.x, b.y);
      x.strokeStyle = "rgba(16,43,77,0.45)";
      x.lineWidth = 0.5;
      x.stroke();

      const c2 = proj(-210, 0, i * 40);
      const d2 = proj(210, 0, i * 40);
      x.beginPath();
      x.moveTo(c2.x, c2.y);
      x.lineTo(d2.x, d2.y);
      x.strokeStyle = "rgba(16,43,77,0.45)";
      x.lineWidth = 0.5;
      x.stroke();
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

/** Secondary tech-core canvas (reuses the hero renderer for now). */
export function attachArVrTechCoreCanvas(canvas: HTMLCanvasElement) {
  const ctx0 = canvas.getContext("2d");
  if (!ctx0) return () => {};
  const x: CanvasRenderingContext2D = ctx0;

  let raf = 0;
  let t = 0;
  const tR = { v: 0 };
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

  function proj(px: number, py: number, pz: number) {
    const rY = tR.v * 0.1;
    const co = Math.cos(rY);
    const si = Math.sin(rY);
    const rx = px * co - pz * si;
    const rz = px * si + pz * co;
    const W = canvas.width / dpr;
    const H = canvas.height / dpr;
    const fov = 480;
    const d = fov / (fov + rz + 320);
    return { x: W / 2 + rx * d * 2.2, y: H / 2 - py * d * 2.2 + 20 };
  }

  function box(
    ox: number,
    oy: number,
    oz: number,
    bw: number,
    bh: number,
    bd: number,
    col: string,
    lw = 0.9,
  ) {
    const v = [
      proj(ox - bw / 2, oy, oz - bd / 2),
      proj(ox + bw / 2, oy, oz - bd / 2),
      proj(ox + bw / 2, oy, oz + bd / 2),
      proj(ox - bw / 2, oy, oz + bd / 2),
      proj(ox - bw / 2, oy + bh, oz - bd / 2),
      proj(ox + bw / 2, oy + bh, oz - bd / 2),
      proj(ox + bw / 2, oy + bh, oz + bd / 2),
      proj(ox - bw / 2, oy + bh, oz + bd / 2),
    ];
    (
      [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 0],
        [4, 5],
        [5, 6],
        [6, 7],
        [7, 4],
        [0, 4],
        [1, 5],
        [2, 6],
        [3, 7],
      ] as const
    ).forEach(([a, b]) => {
      x.beginPath();
      x.moveTo(v[a].x, v[a].y);
      x.lineTo(v[b].x, v[b].y);
      x.strokeStyle = col;
      x.lineWidth = lw;
      x.stroke();
    });
  }

  function draw() {
    t += 0.009;
    tR.v = t;

    const W = canvas.width / dpr;
    const H = canvas.height / dpr;
    x.clearRect(0, 0, W, H);

    const bg = x.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.6);
    bg.addColorStop(0, "rgba(16,43,77,0.4)");
    bg.addColorStop(1, "rgba(4,8,16,0.98)");
    x.fillStyle = bg;
    x.fillRect(0, 0, W, H);

    for (let i = 0; i < W; i += 36) {
      x.beginPath();
      x.moveTo(i + 0.5, 0);
      x.lineTo(i + 0.5, H);
      x.strokeStyle = "rgba(16,43,77,0.2)";
      x.lineWidth = 0.5;
      x.stroke();
    }
    for (let j = 0; j < H; j += 36) {
      x.beginPath();
      x.moveTo(0, j + 0.5);
      x.lineTo(W, j + 0.5);
      x.strokeStyle = "rgba(16,43,77,0.2)";
      x.lineWidth = 0.5;
      x.stroke();
    }

    box(0, 0, 0, 100, 170, 80, "rgba(16,43,77,0.9)", 1);
    box(-85, 0, -6, 52, 100, 50, "rgba(16,43,77,0.7)", 0.85);
    box(82, 0, -6, 44, 68, 42, "rgba(16,43,77,0.55)", 0.75);

    const m = [proj(-50, 55, 0), proj(0, 55, 0), proj(0, 55, 38), proj(50, 55, 38)];
    x.beginPath();
    m.forEach((p, i) => (i === 0 ? x.moveTo(p.x, p.y) : x.lineTo(p.x, p.y)));
    x.strokeStyle = "rgba(255,153,51,0.8)";
    x.lineWidth = 2.2;
    x.stroke();
    x.beginPath();
    m.forEach((p, i) => (i === 0 ? x.moveTo(p.x, p.y) : x.lineTo(p.x, p.y)));
    x.strokeStyle = "rgba(255,153,51,0.14)";
    x.lineWidth = 8;
    x.stroke();

    const sY = Math.sin(t * 0.5) * 65 + 65;
    const sp = [proj(-180, sY, -180), proj(180, sY, -180), proj(180, sY, 180), proj(-180, sY, 180)];
    x.beginPath();
    sp.forEach((p, i) => (i === 0 ? x.moveTo(p.x, p.y) : x.lineTo(p.x, p.y)));
    x.closePath();
    x.fillStyle = "rgba(29,207,207,0.04)";
    x.fill();
    x.strokeStyle = "rgba(29,207,207,0.5)";
    x.lineWidth = 0.9;
    x.stroke();

    for (let i = 0; i < 55; i++) {
      const ang = (i / 55) * Math.PI * 2 + t * 0.1;
      const r = 35 + (i % 5) * 22;
      const pp = proj(Math.cos(ang) * r, (i % 6) * 28, Math.sin(ang) * r);
      const pulse = 0.18 + 0.65 * Math.sin(t * 1.4 + i * 0.4);
      x.beginPath();
      x.arc(pp.x, pp.y, 1.2, 0, Math.PI * 2);
      x.fillStyle = `rgba(255,153,51,${pulse})`;
      x.fill();
    }

    for (let i = -5; i <= 5; i++) {
      const a = proj(i * 38, 0, -190);
      const b = proj(i * 38, 0, 190);
      x.beginPath();
      x.moveTo(a.x, a.y);
      x.lineTo(b.x, b.y);
      x.strokeStyle = "rgba(16,43,77,0.45)";
      x.lineWidth = 0.5;
      x.stroke();

      const cc = proj(-190, 0, i * 38);
      const d2 = proj(190, 0, i * 38);
      x.beginPath();
      x.moveTo(cc.x, cc.y);
      x.lineTo(d2.x, d2.y);
      x.strokeStyle = "rgba(16,43,77,0.45)";
      x.lineWidth = 0.5;
      x.stroke();
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


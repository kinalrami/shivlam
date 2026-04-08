import { ARBIM_STACK_GRAPH_LABELS } from "./constants";

/** Shared 2D projection + canvas loops for AR BIM landing (client-only). */

export function makeProj(
  W: number,
  H: number,
  fov: number,
  dist0: number,
  tRef: { v: number },
) {
  return function proj(px: number, py: number, pz: number) {
    const rY = tRef.v * 0.1;
    const co = Math.cos(rY);
    const si = Math.sin(rY);
    const rx = px * co - pz * si;
    const rz = px * si + pz * co;
    const d = fov / (fov + rz + dist0);
    return { x: W / 2 + rx * d * 2.4, y: H / 2 - py * d * 2.4 + 16 };
  };
}

export function attachHeroBgParticles(canvas: HTMLCanvasElement) {
  const ctx0 = canvas.getContext("2d");
  if (!ctx0) return () => {};
  const ctx: CanvasRenderingContext2D = ctx0;

  let raf = 0;
  let W = 0;
  let H = 0;
  type Pt = { x: number; y: number; vx: number; vy: number; r: number; op: number };
  let pts: Pt[] = [];

  function resize() {
    W = (canvas.width = canvas.offsetWidth);
    H = (canvas.height = canvas.offsetHeight);
    pts = Array.from({ length: 48 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: Math.random() * 1.4 + 0.4,
      op: Math.random() * 0.22 + 0.04,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach((p, i) => {
      pts.slice(i + 1).forEach((q) => {
        const d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < 100) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(255,153,51,${(1 - d / 100) * 0.04})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,153,51,${p.op})`;
      ctx.fill();
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    });
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

function box(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  tRef: { v: number },
  ox: number,
  oy: number,
  oz: number,
  bw: number,
  bh: number,
  bd: number,
  col: string,
  lw?: number,
) {
  const proj = makeProj(W, H, 520, 360, tRef);
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
  const edges: [number, number][] = [
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
  ];
  edges.forEach(([a, b]) => {
    ctx.beginPath();
    ctx.moveTo(v[a]!.x, v[a]!.y);
    ctx.lineTo(v[b]!.x, v[b]!.y);
    ctx.strokeStyle = col;
    ctx.lineWidth = lw ?? 0.9;
    ctx.stroke();
  });
  for (let i = 1; i < 5; i++) {
    const yy = oy + (bh * i) / 5;
    const proj2 = makeProj(W, H, 520, 360, tRef);
    const fp = [
      proj2(ox - bw / 2, yy, oz - bd / 2),
      proj2(ox + bw / 2, yy, oz - bd / 2),
      proj2(ox + bw / 2, yy, oz + bd / 2),
      proj2(ox - bw / 2, yy, oz + bd / 2),
    ];
    ctx.beginPath();
    fp.forEach((p, i2) => (i2 === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
    ctx.closePath();
    ctx.strokeStyle = col.replace(/[\d.]+\)$/, "0.1)");
    ctx.lineWidth = 0.4;
    ctx.stroke();
  }
}

export function attachHeroArCanvas(canvas: HTMLCanvasElement) {
  const ctx0 = canvas.getContext("2d");
  if (!ctx0) return () => {};
  const ctx: CanvasRenderingContext2D = ctx0;

  let raf = 0;
  let t = 0;
  const tRef = { v: 0 };

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function draw() {
    t += 0.008;
    tRef.v = t;
    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    const bg = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.65);
    bg.addColorStop(0, "rgba(16,43,77,0.45)");
    bg.addColorStop(1, "rgba(4,8,16,0.98)");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < W; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, H);
      ctx.strokeStyle = "rgba(16,43,77,0.2)";
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
    for (let j = 0; j < H; j += 40) {
      ctx.beginPath();
      ctx.moveTo(0, j);
      ctx.lineTo(W, j);
      ctx.strokeStyle = "rgba(16,43,77,0.2)";
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
    box(ctx, W, H, tRef, 0, 0, 0, 110, 190, 85, "rgba(16,43,77,0.95)", 1.1);
    box(ctx, W, H, tRef, -96, 0, -8, 58, 105, 55, "rgba(16,43,77,0.75)", 0.85);
    box(ctx, W, H, tRef, 90, 0, -8, 48, 74, 46, "rgba(16,43,77,0.6)", 0.75);
    const proj = makeProj(W, H, 520, 360, tRef);
    const m = [proj(-52, 58, 0), proj(0, 58, 0), proj(0, 58, 42), proj(52, 58, 42)];
    ctx.beginPath();
    m.forEach((p, i2) => (i2 === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
    ctx.strokeStyle = "rgba(255,153,51,0.85)";
    ctx.lineWidth = 2.4;
    ctx.stroke();
    ctx.beginPath();
    m.forEach((p, i2) => (i2 === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
    ctx.strokeStyle = "rgba(255,153,51,0.14)";
    ctx.lineWidth = 9;
    ctx.stroke();
    const sY = Math.sin(t * 0.5) * 65 + 70;
    const sp = [proj(-188, sY, -188), proj(188, sY, -188), proj(188, sY, 188), proj(-188, sY, 188)];
    ctx.beginPath();
    sp.forEach((p, i2) => (i2 === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
    ctx.closePath();
    ctx.fillStyle = "rgba(255,153,51,0.03)";
    ctx.fill();
    ctx.strokeStyle = "rgba(255,153,51,0.52)";
    ctx.lineWidth = 0.9;
    ctx.stroke();
    for (let i = 0; i < 55; i++) {
      const ang = (i / 55) * Math.PI * 2 + t * 0.1;
      const r = 36 + (i % 5) * 22;
      const pp = proj(Math.cos(ang) * r, (i % 6) * 30, Math.sin(ang) * r);
      const pulse = 0.18 + 0.65 * Math.sin(t * 1.4 + i * 0.4);
      ctx.beginPath();
      ctx.arc(pp.x, pp.y, 1.3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,153,51,${pulse})`;
      ctx.fill();
    }
    const cm = proj(0, 58, 0);
    const cr2 = 7 + 3 * Math.sin(t * 3);
    ctx.beginPath();
    ctx.arc(cm.x, cm.y, cr2, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(220,60,60,${0.5 + 0.3 * Math.sin(t * 3)})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cm.x, cm.y, cr2 * 2, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(220,60,60,0.15)";
    ctx.lineWidth = 1;
    ctx.stroke();
    for (let i = -5; i <= 5; i++) {
      const a2 = proj(i * 40, 0, -200);
      const b = proj(i * 40, 0, 200);
      ctx.beginPath();
      ctx.moveTo(a2.x, a2.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = "rgba(16,43,77,0.5)";
      ctx.lineWidth = 0.5;
      ctx.stroke();
      const cc = proj(-200, 0, i * 40);
      const d = proj(200, 0, i * 40);
      ctx.beginPath();
      ctx.moveTo(cc.x, cc.y);
      ctx.lineTo(d.x, d.y);
      ctx.strokeStyle = "rgba(16,43,77,0.5)";
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
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

export function attachProductCanvas(canvas: HTMLCanvasElement, monoFontStack: string) {
  const ctx0 = canvas.getContext("2d");
  if (!ctx0) return () => {};
  const ctx: CanvasRenderingContext2D = ctx0;

  let raf = 0;
  let t = 0;

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = 360;
  }

  function draw() {
    t += 0.01;
    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#040e1e";
    ctx.fillRect(0, 0, W, H);
    const cx = W / 2;
    const base = H * 0.7;
    for (let i = 0; i <= 14; i++) {
      const fx = (i / 14 - 0.5) * 520;
      ctx.beginPath();
      ctx.moveTo(cx + fx * 0.6, base - 200);
      ctx.lineTo(cx + fx * 1.9, base + 60);
      ctx.strokeStyle = "rgba(16,43,77,0.4)";
      ctx.lineWidth = 0.6;
      ctx.stroke();
    }
    for (let i = 0; i <= 9; i++) {
      const t2 = i / 9;
      const y2 = base - 200 + t2 * 260;
      const sp = 0.6 + t2 * 1.3;
      ctx.beginPath();
      ctx.moveTo(cx - 220 * sp, y2);
      ctx.lineTo(cx + 220 * sp, y2);
      ctx.strokeStyle = "rgba(16,43,77,0.3)";
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
    function wall(pts2: [number, number][], col: string) {
      ctx.beginPath();
      pts2.forEach((p, i) => (i === 0 ? ctx.moveTo(p[0], p[1]) : ctx.lineTo(p[0], p[1])));
      ctx.closePath();
      ctx.strokeStyle = col;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = col.replace(/[\d.]+\)$/, "0.04)");
      ctx.fill();
    }
    wall(
      [
        [16, 80],
        [cx - 20, base - 60],
        [cx - 20, base + 16],
        [16, H - 24],
      ],
      "rgba(16,43,77,0.65)",
    );
    wall(
      [
        [W - 16, 80],
        [cx + 20, base - 60],
        [cx + 20, base + 16],
        [W - 16, H - 24],
      ],
      "rgba(16,43,77,0.5)",
    );
    wall(
      [
        [cx - 20, base - 60],
        [cx + 20, base - 60],
        [cx + 20, base - 190],
        [cx - 20, base - 190],
      ],
      "rgba(16,43,77,0.4)",
    );
    ctx.beginPath();
    ctx.moveTo(22, 118);
    ctx.lineTo(cx - 12, base - 145);
    ctx.lineTo(cx - 12, base - 42);
    ctx.strokeStyle = "rgba(255,153,51,0.85)";
    ctx.lineWidth = 2.2;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(22, 118);
    ctx.lineTo(cx - 12, base - 145);
    ctx.lineTo(cx - 12, base - 42);
    ctx.strokeStyle = "rgba(255,153,51,0.15)";
    ctx.lineWidth = 8;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(22, 152);
    ctx.lineTo(W - 22, 152);
    ctx.strokeStyle = "rgba(255,153,51,0.35)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    const sy = 44 + ((t * 28) % (H - 58));
    const gr = ctx.createLinearGradient(0, 0, W, 0);
    gr.addColorStop(0, "transparent");
    gr.addColorStop(0.5, "rgba(255,153,51,0.65)");
    gr.addColorStop(1, "transparent");
    ctx.beginPath();
    ctx.moveTo(0, sy);
    ctx.lineTo(W, sy);
    ctx.strokeStyle = gr;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    for (let i = 0; i < 40; i++) {
      const px2 = 22 + ((i * 53) % (W - 44));
      const py2 = 90 + ((i * 31) % (H - 110));
      const pulse = 0.15 + 0.6 * Math.max(0, Math.sin(t * 1.8 + i * 0.35));
      ctx.beginPath();
      ctx.arc(px2, py2, 1.4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,153,51,${pulse * 0.6})`;
      ctx.fill();
    }
    const cmx = cx - 12;
    const cmy = base - 88;
    const cr2 = 5 + 2 * Math.sin(t * 3);
    ctx.beginPath();
    ctx.arc(cmx, cmy, cr2, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(220,60,60,${0.5 + 0.3 * Math.sin(t * 3)})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cmx, cmy, cr2 * 2.2, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(220,60,60,0.15)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.font = `8px ${monoFontStack}`;
    ctx.fillStyle = "rgba(255,153,51,0.65)";
    ctx.fillText("BIM LIVE", 16, H - 14);
    ctx.fillStyle = "rgba(220,60,60,0.7)";
    ctx.fillText("CLASH DETECTED", W - 118, H - 14);
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

export function attachMidCtaParticles(canvas: HTMLCanvasElement) {
  const ctx0 = canvas.getContext("2d");
  if (!ctx0) return () => {};
  const ctx: CanvasRenderingContext2D = ctx0;

  let raf = 0;
  let W = 0;
  let H = 0;
  type Pt = { x: number; y: number; vx: number; vy: number; r: number; op: number };
  let pts: Pt[] = [];

  function resize() {
    W = (canvas.width = canvas.offsetWidth);
    H = (canvas.height = canvas.offsetHeight);
    pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: Math.random() * 1.5 + 0.5,
      op: Math.random() * 0.18 + 0.04,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach((p, i) => {
      pts.slice(i + 1).forEach((q) => {
        const d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < 100) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(255,153,51,${(1 - d / 100) * 0.06})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,153,51,${p.op})`;
      ctx.fill();
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    });
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

type SpecProjFn = (px: number, py: number, pz: number) => { x: number; y: number };

function box2(
  ctx: CanvasRenderingContext2D,
  proj: SpecProjFn,
  ox: number,
  oy: number,
  oz: number,
  bw: number,
  bh: number,
  bd: number,
  col: string,
  lw?: number,
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
  const edges: [number, number][] = [
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
  ];
  edges.forEach(([a, b]) => {
    ctx.beginPath();
    ctx.moveTo(v[a]!.x, v[a]!.y);
    ctx.lineTo(v[b]!.x, v[b]!.y);
    ctx.strokeStyle = col;
    ctx.lineWidth = lw ?? 0.8;
    ctx.stroke();
  });
}

export function attachSpecCanvas(canvas: HTMLCanvasElement) {
  const ctx0 = canvas.getContext("2d");
  if (!ctx0) return () => {};
  const ctx: CanvasRenderingContext2D = ctx0;

  let raf = 0;
  let t = 0;
  const tRef = { v: 0 };

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function draw() {
    t += 0.009;
    tRef.v = t;
    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    const bg = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.6);
    bg.addColorStop(0, "rgba(16,43,77,0.4)");
    bg.addColorStop(1, "rgba(4,8,16,0.97)");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < W; i += 38) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, H);
      ctx.strokeStyle = "rgba(16,43,77,0.22)";
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
    for (let j = 0; j < H; j += 38) {
      ctx.beginPath();
      ctx.moveTo(0, j);
      ctx.lineTo(W, j);
      ctx.strokeStyle = "rgba(16,43,77,0.22)";
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
    const projBase = makeProj(W, H, 480, 320, tRef);
    /** Keep main tower centroid (0, bh/2, 0) near canvas center; accounts for rotation. */
    const anchor = projBase(0, 85, 0);
    const reserveBottom = Math.min(100, H * 0.22);
    const targetX = W / 2;
    const targetY = (H - reserveBottom) / 2;
    const panX = targetX - anchor.x;
    const panY = targetY - anchor.y;
    const proj: SpecProjFn = (px, py, pz) => {
      const p = projBase(px, py, pz);
      return { x: p.x + panX, y: p.y + panY };
    };
    box2(ctx, proj, 0, 0, 0, 95, 170, 75, "rgba(16,43,77,0.9)", 1);
    box2(ctx, proj, -80, 0, -6, 50, 95, 48, "rgba(16,43,77,0.7)", 0.8);
    box2(ctx, proj, 78, 0, -6, 42, 65, 40, "rgba(16,43,77,0.55)", 0.7);
    for (let i = 0; i < 180; i++) {
      const ang = (i / 180) * Math.PI * 2;
      const layer = Math.floor(i / 60);
      const ry2 = layer * 55 + 22;
      const r = layer === 0 ? 52 : layer === 1 ? 75 : 30;
      const px2 =
        Math.cos(ang + t * 0.08) * r + (layer === 1 ? -80 : layer === 2 ? 78 : 0);
      const py2 = ry2;
      const pz2 = Math.sin(ang + t * 0.08) * r * (layer === 1 ? 0.8 : 1);
      const pp = proj(px2, py2, pz2);
      const pulse = 0.15 + 0.55 * Math.sin(t * 1.6 + i * 0.2);
      const sz = 0.8 + 0.6 * (i % 3) * 0.5;
      ctx.beginPath();
      ctx.arc(pp.x, pp.y, sz, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,153,51,${pulse})`;
      ctx.fill();
    }
    for (let i = 0; i < 60; i++) {
      const ang = (i / 60) * Math.PI * 2 + t * 0.06;
      const r = 40 + (i % 4) * 28;
      const py2 = (i % 8) * 22;
      const pp = proj(Math.cos(ang) * r, py2, Math.sin(ang) * r);
      const pulse = 0.1 + 0.45 * Math.sin(t + i * 0.3);
      ctx.beginPath();
      ctx.arc(pp.x, pp.y, 1.1, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(16,93,180,${pulse * 0.8})`;
      ctx.fill();
    }
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

type StackNode = { lbl: string; x: number; y: number };

export function attachStackCanvas(canvas: HTMLCanvasElement, monoFontStack: string) {
  const ctx0 = canvas.getContext("2d");
  if (!ctx0) return () => {};
  const ctx: CanvasRenderingContext2D = ctx0;

  let raf = 0;
  let t = 0;
  let W = 0;
  let H = 0;

  /** Normalized positions — aligned with `ARBIM_STACK_GRAPH_LABELS` / stack entries order. */
  const stackNodeLayout: [number, number][] = [
    [0.22, 0.66],
    [0.12, 0.38],
    [0.31, 0.2],
    [0.43, 0.45],
    [0.55, 0.72],
    [0.71, 0.5],
    [0.87, 0.66],
    [0.54, 0.28],
    [0.8, 0.22],
  ];
  const nodes: StackNode[] = ARBIM_STACK_GRAPH_LABELS.map((lbl, i) => {
    const xy = stackNodeLayout[i] ?? [0.5, 0.5];
    return { lbl, x: xy[0], y: xy[1] };
  });
  const edges: [number, number][] = [
    [1, 2],
    [2, 3],
    [0, 1],
    [0, 2],
    [4, 5],
    [5, 6],
    [4, 7],
    [6, 7],
    [4, 8],
    [6, 8],
    [1, 4],
  ];

  function resize() {
    W = (canvas.width = canvas.offsetWidth);
    H = 260;
    canvas.height = H;
  }

  function draw() {
    t += 0.01;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "rgba(10,27,51,0.6)";
    ctx.fillRect(0, 0, W, H);
    edges.forEach(([a, b], idx) => {
      const na = { x: nodes[a]!.x * W, y: nodes[a]!.y * H };
      const nb = { x: nodes[b]!.x * W, y: nodes[b]!.y * H };
      ctx.beginPath();
      ctx.moveTo(na.x, na.y);
      ctx.lineTo(nb.x, nb.y);
      ctx.strokeStyle = "rgba(16,43,77,0.5)";
      ctx.lineWidth = 1;
      ctx.stroke();
      const progress = (((t * 0.6 + idx * 0.18) % 1) + 1) % 1;
      const px2 = na.x + (nb.x - na.x) * progress;
      const py2 = na.y + (nb.y - na.y) * progress;
      ctx.beginPath();
      ctx.arc(px2, py2, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,153,51,0.75)";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(px2, py2, 5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,153,51,0.18)";
      ctx.fill();
    });
    nodes.forEach((n, i) => {
      const nx = n.x * W;
      const ny = n.y * H;
      const pulse = 0.7 + 0.3 * Math.sin(t * 1.2 + i * 0.7);
      ctx.beginPath();
      ctx.arc(nx, ny, 5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,153,51,${pulse})`;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(nx, ny, 9, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,153,51,${pulse * 0.2})`;
      ctx.fill();
      ctx.font = `8px ${monoFontStack}`;
      ctx.fillStyle = "rgba(255,255,255,0.45)";
      ctx.textAlign = "center";
      ctx.fillText(n.lbl, nx, ny - 13);
    });
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


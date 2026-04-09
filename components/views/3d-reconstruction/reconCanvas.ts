import { RECON_FLOOR_ROOMS_DATA, RECON_STACK_GRAPH_LABELS } from "./constants";
import { makeProj } from "@/components/views/ar-bim/landingCanvas";

function wireframeBox(
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
}

type ProjFn = (px: number, py: number, pz: number) => { x: number; y: number };

/** Same wireframe box as `wireframeBox`, but uses a shared projection (e.g. panned to center). */
function wireframeBoxWithProj(
  ctx: CanvasRenderingContext2D,
  proj: ProjFn,
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
    ctx.lineWidth = lw ?? 0.9;
    ctx.stroke();
  });
}

/** LIDAR-style hero: blueprint HUD + scan beam (matches HTML mock). */
export function attachReconHeroLidar(canvas: HTMLCanvasElement) {
  const ctx0 = canvas.getContext("2d");
  if (!ctx0) return () => {};
  const ctx: CanvasRenderingContext2D = ctx0;

  let raf = 0;
  let t = 0;
  const tRef = { v: 0 };
  let dpr = 1;
  let ro: ResizeObserver | null = null;

  // From HTML reference (normalized coords).
  const ROOMS: Array<{ x: number; y: number; w: number; h: number; label: string }> = [
    { x: 0.08, y: 0.15, w: 0.38, h: 0.35, label: "Living Room" },
    { x: 0.08, y: 0.55, w: 0.18, h: 0.3, label: "Bedroom" },
    { x: 0.28, y: 0.55, w: 0.18, h: 0.3, label: "Kitchen" },
    { x: 0.5, y: 0.15, w: 0.22, h: 0.7, label: "Hall" },
    { x: 0.75, y: 0.15, w: 0.2, h: 0.35, label: "Office" },
    { x: 0.75, y: 0.55, w: 0.2, h: 0.3, label: "Bath" },
  ];

  function resize() {
    dpr = Math.max(1, Math.floor((window.devicePixelRatio || 1) * 100) / 100);
    const cssW = Math.max(1, canvas.offsetWidth);
    const cssH = Math.max(1, canvas.offsetHeight);
    canvas.width = Math.floor(cssW * dpr);
    canvas.height = Math.floor(cssH * dpr);
    // Ensure drawing units are CSS pixels.
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function draw() {
    // Match HTML reference timing.
    t += 0.008;
    tRef.v = t;

    // Work in CSS pixels (we setTransform in resize()).
    const W = canvas.width / dpr;
    const H = canvas.height / dpr;

    ctx.clearRect(0, 0, W, H);

    // Background.
    ctx.fillStyle = "#040e1e";
    ctx.fillRect(0, 0, W, H);

    // Subtle grid.
    const grid = 36;
    ctx.strokeStyle = "rgba(16,43,77,0.22)";
    ctx.lineWidth = 0.5;
    for (let i = 0; i < W; i += grid) {
      ctx.beginPath();
      ctx.moveTo(i + 0.5, 0);
      ctx.lineTo(i + 0.5, H);
      ctx.stroke();
    }
    for (let j = 0; j < H; j += grid) {
      ctx.beginPath();
      ctx.moveTo(0, j + 0.5);
      ctx.lineTo(W, j + 0.5);
      ctx.stroke();
    }

    // Scan beam position.
    const scanX = ((t * 40) % W + W) % W;

    // Draw rooms (reveal left-of-scan).
    ROOMS.forEach((r) => {
      const rx2 = r.x * W;
      const ry2 = r.y * H;
      const rw = r.w * W;
      const rh = r.h * H;

      const revealed = Math.max(0, Math.min(1, (scanX - rx2) / rw));

      // Dim outline always.
      ctx.strokeStyle = "rgba(29,207,207,0.25)";
      ctx.lineWidth = 0.8;
      ctx.strokeRect(rx2, ry2, rw, rh);

      // Revealed fill.
      if (revealed > 0) {
        ctx.fillStyle = "rgba(29,207,207,0.06)";
        ctx.fillRect(rx2, ry2, rw * revealed, rh);

        // Bright outline on revealed part.
        ctx.strokeStyle = `rgba(29,207,207,${0.55 * revealed})`;
        ctx.lineWidth = 1.2;
        ctx.strokeRect(rx2, ry2, rw, rh);
      }

      // Room label.
      ctx.fillStyle = `rgba(255,153,51,${Math.min(1, revealed * 2) * 0.7})`;
      ctx.font = '7px ui-monospace, "JetBrains Mono", Menlo, Monaco, Consolas, monospace';
      ctx.textAlign = "center";
      ctx.textBaseline = "alphabetic";
      ctx.fillText(r.label, rx2 + rw / 2, ry2 + rh / 2 + 3);
    });
    ctx.textAlign = "left";

    // Point cloud dots scattered (deterministic).
    for (let i = 0; i < 220; i++) {
      const px2 = (i * 137.5) % W;
      const py2 = (i * 89.3) % H;
      if (px2 < scanX) {
        const pulse = 0.15 + 0.45 * Math.sin(t * 1.6 + i * 0.3);
        ctx.beginPath();
        ctx.arc(px2, py2, 1.1, 0, Math.PI * 2);
        const isOrange = i % 5 === 0;
        ctx.fillStyle = isOrange
          ? `rgba(255,153,51,${pulse * 0.8})`
          : `rgba(29,207,207,${pulse * 0.6})`;
        ctx.fill();
      }
    }

    // SCAN BEAM.
    const beamGrad = ctx.createLinearGradient(scanX - 3, 0, scanX + 3, 0);
    beamGrad.addColorStop(0, "transparent");
    beamGrad.addColorStop(0.3, "rgba(29,207,207,0.6)");
    beamGrad.addColorStop(0.5, "rgba(29,207,207,0.95)");
    beamGrad.addColorStop(0.7, "rgba(29,207,207,0.6)");
    beamGrad.addColorStop(1, "transparent");
    ctx.fillStyle = beamGrad;
    ctx.fillRect(scanX - 3, 0, 6, H);
    // Beam glow.
    ctx.fillStyle = "rgba(29,207,207,0.06)";
    ctx.fillRect(scanX - 20, 0, 40, H);

    // Scan progress label (bottom).
    const prog = Math.round((scanX / W) * 100);
    ctx.fillStyle = "rgba(29,207,207,0.7)";
    ctx.font = '9px ui-monospace, "JetBrains Mono", Menlo, Monaco, Consolas, monospace';
    ctx.textBaseline = "alphabetic";
    ctx.fillText(`SCAN: ${prog}%`, 12, H - 14);

    ctx.fillStyle = "rgba(255,153,51,0.65)";
    ctx.fillText(`MESH_POINTS: ${(prog * 24000).toLocaleString()}`, W - 170, H - 14);

    raf = requestAnimationFrame(draw);
  }

  resize();
  draw();

  // Prefer ResizeObserver over window resize (canvas is often responsive inside layouts).
  if (typeof ResizeObserver !== "undefined") {
    ro = new ResizeObserver(() => resize());
    ro.observe(canvas);
  } else {
    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    // Preserve cleanup behavior if ResizeObserver is not supported.
    const prev = (() => {
      const cleanup = () => window.removeEventListener("resize", onResize);
      return cleanup;
    })();
    return () => {
      prev();
      cancelAnimationFrame(raf);
    };
  }

  return () => {
    ro?.disconnect();
    cancelAnimationFrame(raf);
  };
}

function i2hash(a: number, b: number) {
  // Stable pseudo-random toggle for subtle variation (no RNG calls per frame).
  const x = Math.floor((a * 997 + b * 991) * 1000);
  return (x % 2 + 2) % 2 === 0;
}

/** Building shells + MEP routes + sweeping reconstruction plane. */
export function attachProcessCanvas(canvas: HTMLCanvasElement) {
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
    const bg = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.55);
    bg.addColorStop(0, "rgba(14,48,72,0.35)");
    bg.addColorStop(1, "rgba(4,8,16,0.96)");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    const projBase = makeProj(W, H, 500, 340, tRef);
    /** Center the scene on the main tower mid-height (same idea as ar-bim `attachSpecCanvas`). */
    const anchor = projBase(0, 80, 0);
    const reserveBottom = Math.min(80, H * 0.2);
    const targetX = W / 2;
    const targetY = (H - reserveBottom) / 2;
    const panX = targetX - anchor.x;
    const panY = targetY - anchor.y;
    const proj: ProjFn = (px, py, pz) => {
      const p = projBase(px, py, pz);
      return { x: p.x + panX, y: p.y + panY };
    };

    wireframeBoxWithProj(ctx, proj, 0, 0, 0, 100, 160, 72, "rgba(24,80,110,0.88)", 1);
    wireframeBoxWithProj(ctx, proj, -72, 8, -6, 48, 88, 40, "rgba(24,80,110,0.55)", 0.75);

    const mepA = proj(-40, 40, -20);
    const mepB = proj(48, 120, 28);
    ctx.beginPath();
    ctx.moveTo(mepA.x, mepA.y);
    ctx.lineTo(mepB.x, mepB.y);
    ctx.strokeStyle = "rgba(255,153,51,0.7)";
    ctx.lineWidth = 1.8;
    ctx.stroke();
    const mepA2 = proj(32, 35, 22);
    const mepB2 = proj(-55, 95, -18);
    ctx.beginPath();
    ctx.moveTo(mepA2.x, mepA2.y);
    ctx.lineTo(mepB2.x, mepB2.y);
    ctx.strokeStyle = "rgba(56,189,248,0.55)";
    ctx.lineWidth = 1.4;
    ctx.stroke();

    const planeY = 22 + ((t * 32) % 130);
    const q = [
      proj(-115, planeY, -95),
      proj(115, planeY, -95),
      proj(115, planeY, 95),
      proj(-115, planeY, 95),
    ];
    ctx.beginPath();
    q.forEach((p, i2) => (i2 === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
    ctx.closePath();
    ctx.fillStyle = "rgba(255,153,51,0.05)";
    ctx.fill();
    ctx.strokeStyle = "rgba(255,153,51,0.4)";
    ctx.lineWidth = 0.9;
    ctx.stroke();

    for (let i = 0; i < 55; i++) {
      const ang = (i / 55) * Math.PI * 2 + t * 0.09;
      const r = 28 + (i % 4) * 20;
      const p = proj(Math.cos(ang) * r, (i % 5) * 28, Math.sin(ang) * r);
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${0.08 + 0.2 * Math.sin(t + i)})`;
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

type Room = { x: number; y: number; w: number; h: number; name: string; detail: string };

const FLOOR_ROOM_DATA_BY_ID = new Map<string, Readonly<Record<string, string>>>(
  RECON_FLOOR_ROOMS_DATA.map((r) => [r.id, r.data]),
);

/** Uniform gap between zones (horizontal + vertical), normalized — widened for clearer separation. */
const FLOOR_GUTTER = 0.02;

const XL = 0.052;
const XR = 0.948;
const Y_TOP = 0.065;
const Y_BOT = 0.918;
/** Corridor column (structural split). */
// Slightly narrower corridor to reduce the visual gap between the two vertical walls.
const X_COR_L = 0.40;
const X_COR_R = 0.58;
const Y_SPLIT = 0.45;
const Y_MID_R = 0.49;

const G = FLOOR_GUTTER;
const L_IN = XL + G;
const L_R = X_COR_L - G;
const W_LEFT = L_R - L_IN;
const w102 = (W_LEFT - G) / 2;
const x103 = L_IN + w102 + G;

const CORR_L = X_COR_L + G;
const CORR_R = X_COR_R - G;

const R_IN = X_COR_R + G;
const R_R = XR - G;
const W_RIGHT = R_R - R_IN;

const y101T = Y_TOP + G;
const y101B = Y_SPLIT - G / 2;
const y23T = Y_SPLIT + G / 2;
const y23B = Y_BOT - G;

const y104T = Y_TOP + G;
const y104B = Y_MID_R - G / 2;
const y105T = Y_MID_R + G / 2;
const y105B = Y_BOT - G;

/** Corridor interior height — for stair/fire-exit Y without stacking on the room name. */
const CORR_VERT = y23B - y101T;

const FLOOR_ROOMS: Room[] = [
  { x: L_IN, y: y101T, w: W_LEFT, h: y101B - y101T, name: "Room_101", detail: "Window zone · natural light" },
  { x: L_IN, y: y23T, w: w102, h: y23B - y23T, name: "Room_102", detail: "Door to corridor · side room" },
  { x: x103, y: y23T, w: w102, h: y23B - y23T, name: "Room_103", detail: "Side room · scan-ready" },
  {
    x: CORR_L,
    y: y101T,
    w: CORR_R - CORR_L,
    h: y23B - y101T,
    name: "Corridor",
    detail: "Primary circulation · stairs · fire exit access",
  },
  { x: R_IN, y: y104T, w: W_RIGHT, h: y104B - y104T, name: "Room_104", detail: "Window · upper wing" },
  { x: R_IN, y: y105T, w: W_RIGHT, h: y105B - y105T, name: "Room_105", detail: "Door from corridor · lower wing" },
];

function floorRectEdges(nx: number, ny: number, nw: number, nh: number): [number, number, number, number][] {
  const r = nx + nw;
  const b = ny + nh;
  return [
    [nx, ny, r, ny],
    [r, ny, r, b],
    [r, b, nx, b],
    [nx, b, nx, ny],
  ];
}

/** Per-room outlines only — no outer shell; gutters read as open space between cells. */
const FLOOR_WALLS: [number, number, number, number][] = FLOOR_ROOMS.flatMap((room) =>
  floorRectEdges(room.x, room.y, room.w, room.h),
);

type FloorFeature = {
  x: number;
  y: number;
  text: string;
  /** Label anchor relative to dot (px); default below centered is handled per align. */
  labelDx?: number;
  labelDy?: number;
  labelAlign?: CanvasTextAlign;
};

/**
 * Windows centered in room; doors on top wall mid; stairs upper corridor; fire exit lower-left wall
 * (features avoid corridor centroid so "Corridor" label stays clear).
 */
const FLOOR_FEATURES: FloorFeature[] = [
  {
    x: L_IN + W_LEFT / 2,
    y: (y101T + y101B) / 2,
    text: "Window",
    labelAlign: "center",
    labelDx: 0,
    labelDy: 10,
  },
  {
    x: L_IN + w102 / 2,
    y: y23T,
    text: "Door",
    labelAlign: "center",
    labelDx: 0,
    labelDy: 12,
  },
  {
    x: (CORR_L + CORR_R) / 2,
    y: y101T + CORR_VERT * 0.24,
    text: "Stairs",
    labelAlign: "center",
    labelDx: 0,
    labelDy: 10,
  },
  {
    x: CORR_L,
    y: y101T + CORR_VERT * 0.78,
    text: "Fire Exit",
    labelAlign: "left",
    labelDx: 6,
    labelDy: 3,
  },
  {
    x: R_IN + W_RIGHT / 2,
    y: (y104T + y104B) / 2,
    text: "Window",
    labelAlign: "center",
    labelDx: 0,
    labelDy: 10,
  },
  {
    x: R_IN + W_RIGHT / 2,
    y: y105T,
    text: "Door",
    labelAlign: "center",
    labelDx: 0,
    labelDy: 12,
  },
];

function strokeWallGlow(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  pulse: number,
) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.shadowBlur = 1.2 + pulse * 0.8;
  ctx.shadowColor = "rgba(34, 211, 238, 0.35)";
  ctx.strokeStyle = "rgba(45, 212, 191, 0.82)";
  ctx.lineWidth = 0.55;
  ctx.stroke();
  ctx.restore();
}

/** 2D plan — HTML-style: cyan walls, orange labels & anchors, dark blueprint field. */
export function attachFloorPlanCanvas(canvas: HTMLCanvasElement) {
  const ctx0 = canvas.getContext("2d");
  if (!ctx0) return () => {};
  const ctx: CanvasRenderingContext2D = ctx0;

  let raf = 0;
  let t = 0;
  let W = 0;
  let H = 0;
  let hover = -1;
  let mx = 0;
  let my = 0;

  const mono = '11px ui-monospace, SFMono-Regular, "Space Mono", monospace';

  function resize() {
    W = (canvas.width = canvas.offsetWidth);
    H = (canvas.height = canvas.offsetHeight);
  }

  function hit(px: number, py: number) {
    for (let i = 0; i < FLOOR_ROOMS.length; i++) {
      const r = FLOOR_ROOMS[i]!;
      const rx = r.x * W;
      const ry = r.y * H;
      const rw = r.w * W;
      const rh = r.h * H;
      if (px >= rx && px <= rx + rw && py >= ry && py <= ry + rh) return i;
    }
    return -1;
  }

  const onMove = (e: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    mx = e.clientX - rect.left;
    my = e.clientY - rect.top;
    hover = hit(mx, my);
  };
  const onLeave = () => {
    hover = -1;
  };

  function draw() {
    t += 0.012;
    const pulse = 0.5 + 0.5 * Math.sin(t * 2.5);
    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = "#040a14";
    ctx.fillRect(0, 0, W, H);
    const bg = ctx.createRadialGradient(W * 0.45, H * 0.35, 0, W * 0.5, H * 0.5, W * 0.75);
    bg.addColorStop(0, "rgba(8, 25, 48, 0.95)");
    bg.addColorStop(1, "rgba(2, 6, 14, 1)");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    ctx.save();
    ctx.strokeStyle = "rgba(16, 43, 77, 0.22)";
    ctx.lineWidth = 0.5;
    const g = 22;
    for (let gx = 0; gx < W; gx += g) {
      ctx.beginPath();
      ctx.moveTo(gx, 0);
      ctx.lineTo(gx, H);
      ctx.stroke();
    }
    for (let gy = 0; gy < H; gy += g) {
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.lineTo(W, gy);
      ctx.stroke();
    }
    ctx.restore();

    FLOOR_ROOMS.forEach((r, i) => {
      const rx = r.x * W;
      const ry = r.y * H;
      const rw = r.w * W;
      const rh = r.h * H;
      if (hover === i) {
        ctx.fillStyle = "rgba(245, 138, 11, 0.11)";
        ctx.fillRect(rx, ry, rw, rh);
      }
    });

    ctx.globalAlpha = 1;
    FLOOR_WALLS.forEach(([a, b, c, d]) => {
      strokeWallGlow(ctx, a * W, b * H, c * W, d * H, pulse);
    });

    if (hover >= 0 && FLOOR_ROOMS[hover]) {
      const hr = FLOOR_ROOMS[hover]!;
      const rx = hr.x * W;
      const ry = hr.y * H;
      const rw = hr.w * W;
      const rh = hr.h * H;
      ctx.save();
      ctx.strokeStyle = "rgba(251, 146, 60, 0.92)";
      ctx.lineWidth = 2;
      ctx.setLineDash([]);
      ctx.strokeRect(rx + 0.5, ry + 0.5, rw - 1, rh - 1);
      ctx.restore();
    }

    FLOOR_FEATURES.forEach((f, i) => {
      const ax = f.x * W;
      const ay = f.y * H;
      const pr = 0.35 + 0.2 * Math.sin(t * 3 + i);
      ctx.beginPath();
      ctx.arc(ax, ay, 3.2 + pr, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(251, 146, 60, ${0.78 + 0.12 * pulse})`;
      ctx.fill();
      ctx.strokeStyle = "rgba(254, 215, 170, 0.45)";
      ctx.lineWidth = 0.85;
      ctx.stroke();
    });

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    FLOOR_ROOMS.forEach((r, i) => {
      const rx = r.x * W;
      const ry = r.y * H;
      const rw = r.w * W;
      const rh = r.h * H;
      const isH = hover === i;
      ctx.font = mono;
      ctx.fillStyle = isH ? "rgba(165, 243, 252, 0.95)" : "rgba(34, 211, 238, 0.82)";
      ctx.fillText(r.name, rx + rw / 2, ry + rh / 2);
    });
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";

    ctx.font = "9px ui-monospace, SFMono-Regular, \"Space Mono\", monospace";
    FLOOR_FEATURES.forEach((f) => {
      ctx.textAlign = f.labelAlign ?? "left";
      const lx = f.x * W + (f.labelDx ?? 0);
      const ly = f.y * H + (f.labelDy ?? 11);
      ctx.fillStyle = "rgba(251, 146, 60, 0.78)";
      ctx.fillText(f.text, lx, ly);
    });
    ctx.textAlign = "left";

    if (hover >= 0 && FLOOR_ROOMS[hover]) {
      const r = FLOOR_ROOMS[hover]!;
      const data = FLOOR_ROOM_DATA_BY_ID.get(r.name);
      const rows = data ? (Object.entries(data) as [string, string][]) : [];
      const padX = 12;
      const padY = 10;
      const rowH = 16;
      const headerH = 22;
      const afterTitleGap = 10;
      const rowFont = '10px ui-monospace, SFMono-Regular, "Space Mono", monospace';

      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";
      ctx.font = mono;
      let contentW = ctx.measureText(r.name).width;
      ctx.font = rowFont;
      rows.forEach(([key, val]) => {
        const keyStr = `${key}: `;
        const lineW = ctx.measureText(keyStr).width + ctx.measureText(val).width;
        contentW = Math.max(contentW, lineW);
      });
      if (rows.length === 0) {
        ctx.font = rowFont;
        contentW = Math.max(contentW, ctx.measureText(r.detail).width);
      }
      const tw = Math.min(Math.max(Math.ceil(contentW) + padX * 2 + 8, 96), W - 16);

      const th =
        padY + headerH + afterTitleGap + Math.max(1, rows.length || 1) * rowH + padY + 4;
      let tx = Math.min(Math.max(8, mx - tw / 2), W - tw - 8);
      let ty = my - th - 16;
      if (ty < 8) ty = my + 16;
      if (ty + th > H - 8) ty = H - th - 8;

      ctx.fillStyle = "rgba(4, 12, 24, 0.97)";
      ctx.strokeStyle = "rgba(45, 212, 191, 0.55)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      if (typeof ctx.roundRect === "function") {
        ctx.roundRect(tx, ty, tw, th, 8);
      } else {
        ctx.rect(tx, ty, tw, th);
      }
      ctx.fill();
      ctx.stroke();

      ctx.font = mono;
      ctx.fillStyle = "rgba(251, 146, 60, 0.98)";
      ctx.fillText(r.name, tx + padX, ty + padY + 14);

      ctx.font = rowFont;
      const rowStart = ty + padY + headerH + afterTitleGap;
      if (rows.length === 0) {
        ctx.fillStyle = "rgba(148, 163, 184, 0.75)";
        ctx.fillText(r.detail, tx + padX, rowStart + 2);
      } else {
        rows.forEach(([key, val], i) => {
          const y = rowStart + i * rowH;
          const keyStr = `${key}: `;
          ctx.fillStyle = "rgba(45, 212, 191, 0.88)";
          ctx.fillText(keyStr, tx + padX, y);
          const kw = ctx.measureText(keyStr).width;
          ctx.fillStyle = "rgba(251, 146, 60, 0.92)";
          ctx.fillText(val, tx + padX + kw, y);
        });
      }
    }

    raf = requestAnimationFrame(draw);
  }

  canvas.addEventListener("mousemove", onMove);
  canvas.addEventListener("mouseleave", onLeave);

  const onResize = () => resize();
  window.addEventListener("resize", onResize);
  resize();
  draw();

  return () => {
    window.removeEventListener("resize", onResize);
    canvas.removeEventListener("mousemove", onMove);
    canvas.removeEventListener("mouseleave", onLeave);
    cancelAnimationFrame(raf);
  };
}

/** Rotating certification-style seal ticks. */
export function attachSealCanvas(canvas: HTMLCanvasElement) {
  const ctx0 = canvas.getContext("2d");
  if (!ctx0) return () => {};
  const ctx: CanvasRenderingContext2D = ctx0;

  let raf = 0;
  let t = 0;
  let W = 0;
  let H = 0;

  function resize() {
    W = (canvas.width = canvas.offsetWidth);
    H = (canvas.height = canvas.offsetHeight);
  }

  function draw() {
    t += 0.006;
    ctx.clearRect(0, 0, W, H);
    const cx = W / 2;
    const cy = H / 2;
    const R = Math.min(W, H) * 0.38;
    ctx.strokeStyle = "rgba(255,153,51,0.25)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy, R * 0.72, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(56,189,248,0.2)";
    ctx.stroke();

    const n = 48;
    for (let i = 0; i < n; i++) {
      const ang = (i / n) * Math.PI * 2 + t * 0.08;
      const r1 = R * 0.92;
      const r2 = R * (i % 4 === 0 ? 0.78 : 0.85);
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(ang) * r1, cy + Math.sin(ang) * r1);
      ctx.lineTo(cx + Math.cos(ang) * r2, cy + Math.sin(ang) * r2);
      ctx.strokeStyle = `rgba(255,153,51,${0.15 + 0.35 * ((i + Math.floor(t * 10)) % 5 === 0 ? 1 : 0)})`;
      ctx.lineWidth = i % 4 === 0 ? 1.2 : 0.6;
      ctx.stroke();
    }

    ctx.font = "700 11px ui-sans-serif, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(255,255,255,0.45)";
    ctx.fillText("AS-BUILT", cx, cy - 4);
    ctx.fillStyle = "rgba(255,153,51,0.85)";
    ctx.fillText("VERIFIED", cx, cy + 12);

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

export function attachReconStackCanvas(
  canvas: HTMLCanvasElement,
  monoFontStack: string,
  labels: readonly string[] = RECON_STACK_GRAPH_LABELS,
) {
  const ctx0 = canvas.getContext("2d");
  if (!ctx0) return () => {};
  const ctx: CanvasRenderingContext2D = ctx0;

  let raf = 0;
  let t = 0;
  let W = 0;
  let H = 0;

  const stackNodeLayout: [number, number][] = [
    [0.18, 0.68],
    [0.14, 0.42],
    [0.32, 0.22],
    [0.46, 0.48],
    [0.58, 0.72],
    [0.74, 0.38],
    [0.86, 0.62],
    [0.52, 0.28],
    [0.78, 0.2],
  ];
  const nodes: StackNode[] = labels.map((lbl, i) => {
    const xy = stackNodeLayout[i] ?? [0.5, 0.5];
    return { lbl, x: xy[0], y: xy[1] };
  });
  const edges: [number, number][] = [
    [1, 2],
    [2, 3],
    [0, 1],
    [3, 4],
    [4, 5],
    [5, 6],
    [4, 7],
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
      const progress = (((t * 0.55 + idx * 0.16) % 1) + 1) % 1;
      const px2 = na.x + (nb.x - na.x) * progress;
      const py2 = na.y + (nb.y - na.y) * progress;
      ctx.beginPath();
      ctx.arc(px2, py2, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(56,189,248,0.72)";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(px2, py2, 5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(56,189,248,0.15)";
      ctx.fill();
    });
    nodes.forEach((n, i) => {
      const nx = n.x * W;
      const ny = n.y * H;
      const pulse = 0.65 + 0.35 * Math.sin(t * 1.15 + i * 0.65);
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

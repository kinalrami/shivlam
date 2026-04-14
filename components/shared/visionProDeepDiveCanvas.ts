"use client";

const PURPLE = "#C084FC";
const CYAN = "#1DCFCF";
const ORANGE = "#FF9933";

type Win = {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  floatY: number;
  phase: number;
  accent: string;
};

export function attachVisionProDeepDiveCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const dpr = window.devicePixelRatio || 1;
  let raf = 0;
  let t = 0;
  let destroyed = false;

  const windows: Win[] = [
    { x: 0.5, y: 0.25, w: 0.55, h: 0.22, label: "GAME WORLD · visionOS", floatY: 0.012, phase: 0, accent: PURPLE },
    { x: 0.22, y: 0.58, w: 0.32, h: 0.16, label: "SCORE PANEL", floatY: 0.015, phase: 1.5, accent: CYAN },
    { x: 0.78, y: 0.62, w: 0.28, h: 0.14, label: "MAP · 3D", floatY: 0.01, phase: 0.8, accent: ORANGE },
  ];

  let gazeX = 0.5;
  let gazeY = 0.4;
  let gazeTargetX = 0.5;
  let gazeTargetY = 0.4;
  let gazeTimer = 0;

  const handPoints: [number, number][] = [
    [0.15, 0.75],
    [0.18, 0.7],
    [0.2, 0.64],
    [0.22, 0.59],
    [0.24, 0.56],
    [0.2, 0.73],
    [0.22, 0.65],
    [0.24, 0.58],
    [0.25, 0.54],
    [0.24, 0.74],
    [0.26, 0.66],
    [0.28, 0.6],
    [0.29, 0.56],
    [0.28, 0.75],
    [0.3, 0.67],
    [0.32, 0.61],
    [0.33, 0.57],
    [0.32, 0.77],
    [0.34, 0.7],
    [0.35, 0.65],
    [0.36, 0.62],
  ];

  const handConnections: [number, number][] = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [5, 6],
    [6, 7],
    [7, 8],
    [9, 10],
    [10, 11],
    [11, 12],
    [13, 14],
    [14, 15],
    [15, 16],
    [17, 18],
    [18, 19],
    [19, 20],
    [0, 5],
    [5, 9],
    [9, 13],
    [13, 17],
    [0, 17],
  ];

  const resize = () => {
    const parent = canvas.parentElement;
    if (!parent) return;
    const r = parent.getBoundingClientRect();
    const cssW = Math.max(1, Math.floor(r.width));
    const cssH = 360;
    canvas.width = Math.floor(cssW * dpr);
    canvas.height = Math.floor(cssH * dpr);
    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${cssH}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const roundRectStroke = (x: number, y: number, w: number, h: number, r: number) => {
    if (typeof ctx.roundRect === "function") {
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, r);
      ctx.stroke();
    } else {
      ctx.strokeRect(x, y, w, h);
    }
  };

  const roundRectFill = (x: number, y: number, w: number, h: number, r: number) => {
    if (typeof ctx.roundRect === "function") {
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, r);
      ctx.fill();
    } else {
      ctx.fillRect(x, y, w, h);
    }
  };

  const draw = () => {
    if (destroyed) return;
    const W = canvas.clientWidth || canvas.offsetWidth;
    const H = 360;

    ctx.fillStyle = "#08081a";
    ctx.fillRect(0, 0, W, H);

    for (let i = 0; i < 50; i++) {
      const sx = (i * 157 + t * 0.3) % W;
      const sy = (i * 113) % H;
      ctx.fillStyle = "rgba(255,255,255,.2)";
      ctx.beginPath();
      ctx.arc(sx, sy, 0.8, 0, Math.PI * 2);
      ctx.fill();
    }

    const rg = ctx.createRadialGradient(W * 0.5, H * 0.5, 0, W * 0.5, H * 0.5, W * 0.6);
    rg.addColorStop(0, "rgba(192,132,252,.04)");
    rg.addColorStop(1, "transparent");
    ctx.fillStyle = rg;
    ctx.fillRect(0, 0, W, H);

    windows.forEach((win) => {
      const wx = win.x * W;
      const wy = (win.y + Math.sin(t * 0.03 + win.phase) * win.floatY) * H;
      const ww = win.w * W;
      const wh = win.h * H;

      ctx.fillStyle = "rgba(20,15,35,.75)";
      roundRectFill(wx - ww / 2, wy - wh / 2, ww, wh, 8);

      ctx.strokeStyle = `${win.accent}55`;
      ctx.lineWidth = 1;
      roundRectStroke(wx - ww / 2, wy - wh / 2, ww, wh, 8);

      ctx.fillStyle = `${win.accent}22`;
      ctx.beginPath();
      if (typeof ctx.roundRect === "function") {
        ctx.roundRect(wx - ww / 2, wy - wh / 2, ww, 18, 8);
      } else {
        ctx.rect(wx - ww / 2, wy - wh / 2, ww, 18);
      }
      ctx.fill();

      ctx.font = "7px JetBrains Mono, ui-monospace, monospace";
      ctx.fillStyle = `${win.accent}cc`;
      ctx.textAlign = "left";
      ctx.fillText(win.label, wx - ww / 2 + 8, wy - wh / 2 + 12);

      if (win.label.includes("GAME WORLD")) {
        const cx = wx;
        const cy = wy + 8;
        const cr2 = 28;
        ctx.strokeStyle = `${PURPLE}55`;
        ctx.lineWidth = 0.8;
        for (let a = 0; a < 8; a++) {
          const a1 = (a / 8) * Math.PI * 2 + t * 0.02;
          const a2 = ((a + 1) / 8) * Math.PI * 2 + t * 0.02;
          ctx.beginPath();
          ctx.moveTo(cx + Math.cos(a1) * cr2, cy + Math.sin(a1) * cr2 * 0.4);
          ctx.lineTo(cx + Math.cos(a2) * cr2, cy + Math.sin(a2) * cr2 * 0.4);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(cx + Math.cos(a1) * cr2, cy + Math.sin(a1) * cr2 * 0.4);
          ctx.lineTo(cx, cy - cr2 * 0.5);
          ctx.stroke();
        }
        ctx.strokeStyle = `${PURPLE}88`;
        ctx.beginPath();
        ctx.ellipse(cx, cy, cr2, cr2 * 0.4, 0, 0, Math.PI * 2);
        ctx.stroke();
      } else if (win.label.includes("SCORE")) {
        ctx.font = "18px Roboto Slab, ui-serif, Georgia, serif";
        ctx.fillStyle = "rgba(255,255,255,.8)";
        ctx.textAlign = "center";
        ctx.fillText(Math.floor((t * 2.3) % 9999).toString().padStart(5, "0"), wx, wy + 12);
        ctx.font = "7px JetBrains Mono, ui-monospace, monospace";
        ctx.fillStyle = `${CYAN}99`;
        ctx.fillText(`LEVEL ${Math.floor((t / 200) % 9) + 1}  ·  LIVES: ♥♥♥`, wx, wy + 24);
      } else {
        [
          [-0.3, 0],
          [0.1, -0.2],
          [0.2, 0.3],
          [-0.1, 0.25],
        ].forEach(([dx, dy]) => {
          ctx.fillStyle = `${ORANGE}88`;
          ctx.beginPath();
          ctx.arc(wx + dx * ww * 0.4, wy + dy * wh * 0.5, 3, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.strokeStyle = `${ORANGE}33`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(wx - ww * 0.12, wy - wh * 0.08);
        ctx.lineTo(wx + ww * 0.04, wy - wh * 0.04);
        ctx.lineTo(wx + ww * 0.08, wy + wh * 0.12);
        ctx.stroke();
      }
    });

    gazeTimer++;
    if (gazeTimer > 80) {
      gazeTargetX = 0.15 + Math.random() * 0.7;
      gazeTargetY = 0.15 + Math.random() * 0.6;
      gazeTimer = 0;
    }
    gazeX += (gazeTargetX - gazeX) * 0.04;
    gazeY += (gazeTargetY - gazeY) * 0.04;
    const gx = gazeX * W;
    const gy = gazeY * H;
    ctx.strokeStyle = "rgba(192,132,252,.25)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(gx, gy, 20, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = "rgba(192,132,252,.5)";
    [
      [gx - 28, gy],
      [gx + 28, gy],
      [gx, gy - 28],
      [gx, gy + 28],
    ].forEach(([lx, ly]) => {
      ctx.beginPath();
      ctx.moveTo(lx, ly);
      ctx.lineTo(gx, gy);
      ctx.stroke();
    });
    ctx.fillStyle = "rgba(192,132,252,.4)";
    ctx.beginPath();
    ctx.arc(gx, gy, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = "7px JetBrains Mono, ui-monospace, monospace";
    ctx.fillStyle = "rgba(192,132,252,.5)";
    ctx.textAlign = "left";
    ctx.fillText("EYE_GAZE", gx + 12, gy - 8);

    const hScale = W;
    const hScaleY = H;
    ctx.strokeStyle = "rgba(255,153,51,.4)";
    ctx.lineWidth = 1;
    handConnections.forEach(([a, b]) => {
      const wave = Math.sin(t * 0.04 + a * 0.3) * 0.015;
      const pa = handPoints[a];
      const pb = handPoints[b];
      if (!pa || !pb) return;
      ctx.beginPath();
      ctx.moveTo(pa[0] * hScale, pa[1] * hScaleY + wave * hScaleY);
      ctx.lineTo(pb[0] * hScale, pb[1] * hScaleY + wave * hScaleY);
      ctx.stroke();
    });
    handPoints.forEach((p, i) => {
      const wave = Math.sin(t * 0.04 + i * 0.3) * 0.015;
      ctx.fillStyle = i === 0 ? ORANGE : "rgba(255,153,51,.5)";
      ctx.beginPath();
      ctx.arc(p[0] * hScale, p[1] * hScaleY + wave * hScaleY, 2, 0, Math.PI * 2);
      ctx.fill();
    });
    const hp4 = handPoints[4];
    if (hp4) {
      ctx.font = "7px JetBrains Mono, ui-monospace, monospace";
      ctx.fillStyle = "rgba(255,153,51,.5)";
      ctx.textAlign = "left";
      ctx.fillText("HAND_TRACKING · PINCH_ACTIVE", hp4[0] * hScale + 5, hp4[1] * hScaleY - 8);
    }

    ctx.fillStyle = "rgba(0,0,0,.5)";
    ctx.beginPath();
    if (typeof ctx.roundRect === "function") {
      ctx.roundRect(10, H - 28, W - 20, 18, 4);
    } else {
      ctx.rect(10, H - 28, W - 20, 18);
    }
    ctx.fill();
    ctx.font = "7px JetBrains Mono, ui-monospace, monospace";
    ctx.fillStyle = "rgba(192,132,252,.7)";
    ctx.textAlign = "left";
    ctx.fillText("visionOS 2.0 · RealityKit · EYE_TRACK: ACTIVE · HAND_TRACK: ACTIVE · FPS: 90", 16, H - 15);

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

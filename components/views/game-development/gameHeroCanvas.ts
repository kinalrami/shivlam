export type GameHeroCanvasHandles = {
  setChips: (v: { live: string; fps: string }) => void;
};

type Star = { x: number; y: number; r: number; v: number };
type Platform = {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  label: string;
  floatAmp: number;
  floatSpeed: number;
  phase: number;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  r: number;
};

export function attachGameHeroCanvas(
  canvas: HTMLCanvasElement,
  onChipText: (v: { live: string; fps: string }) => void,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const ORANGE = "#FF9933";
  const CYAN = "#1DCFCF";
  const UNITY = "#AAAAFF";
  const GREEN = "rgba(34,197,94,.85)";

  let raf = 0;
  let t = 0;
  let destroyed = false;
  let lastChipIdx = -1;

  const stars: Star[] = Array.from({ length: 60 }, () => ({
    x: Math.random(),
    y: Math.random(),
    r: Math.random() * 0.8 + 0.2,
    v: Math.random() * 0.003 + 0.001,
  }));

  const platforms: Platform[] = [
    { x: 0.5, y: 0.35, w: 0.32, h: 0.06, color: UNITY, label: "PLAYER", floatAmp: 0.015, floatSpeed: 1.2, phase: 0 },
    { x: 0.2, y: 0.55, w: 0.22, h: 0.05, color: ORANGE, label: "ENEMY_01", floatAmp: 0.012, floatSpeed: 0.9, phase: 1.1 },
    { x: 0.78, y: 0.6, w: 0.18, h: 0.04, color: CYAN, label: "COLLECTIBLE", floatAmp: 0.018, floatSpeed: 1.5, phase: 2.2 },
    { x: 0.35, y: 0.72, w: 0.26, h: 0.05, color: GREEN, label: "GROUND", floatAmp: 0.008, floatSpeed: 0.7, phase: 0.5 },
  ];

  const particles: Particle[] = [];

  const roundRectPath = (x: number, y: number, w: number, h: number, r: number) => {
    const rr = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.arcTo(x + w, y, x + w, y + h, rr);
    ctx.arcTo(x + w, y + h, x, y + h, rr);
    ctx.arcTo(x, y + h, x, y, rr);
    ctx.arcTo(x, y, x + w, y, rr);
    ctx.closePath();
  };

  const hexToRgba = (hex: string, a: number) => {
    const h = hex.replace("#", "");
    if (h.length !== 6) return `rgba(255,255,255,${a})`;
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return `rgba(${r},${g},${b},${a})`;
  };

  const resize = () => {
    const parent = canvas.parentElement;
    if (!parent) return;
    const r = parent.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const cssW = Math.max(1, Math.floor(r.width));
    const cssH = 400;
    canvas.width = Math.floor(cssW * dpr);
    canvas.height = Math.floor(cssH * dpr);
    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${cssH}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const spawnParticle = () => {
    const palette = [ORANGE, CYAN, UNITY];
    particles.push({
      x: Math.random(),
      y: 1.05,
      vx: (Math.random() - 0.5) * 0.003,
      vy: -(Math.random() * 0.006 + 0.002),
      alpha: 1,
      color: palette[Math.floor(Math.random() * palette.length)] ?? ORANGE,
      r: Math.random() * 2 + 1,
    });
  };

  const maybeUpdateChips = () => {
    const idx = Math.floor(Date.now() / 3000) % 3;
    if (idx === lastChipIdx) return;
    lastChipIdx = idx;
    const states = [
      { live: "● GAME RUNNING", fps: "60 FPS · UNITY" },
      { live: "◎ AR MODE ACTIVE", fps: "ARKit · LiDAR" },
      { live: "✦ VISION PRO", fps: "visionOS · RealityKit" },
    ] as const;
    onChipText(states[idx] ?? states[0]);
  };

  const draw = () => {
    if (destroyed) return;
    const W = canvas.offsetWidth;
    const H = 400;

    // Background
    ctx.fillStyle = "#080818";
    ctx.fillRect(0, 0, W, H);

    const nebula = ctx.createRadialGradient(W * 0.5, H * 0.4, 0, W * 0.5, H * 0.4, W * 0.55);
    nebula.addColorStop(0, "rgba(170,170,255,.06)");
    nebula.addColorStop(1, "transparent");
    ctx.fillStyle = nebula;
    ctx.fillRect(0, 0, W, H);

    // Stars
    for (const s of stars) {
      s.x -= s.v;
      if (s.x < 0) s.x = 1;
      const twinkle = 0.4 + 0.4 * Math.sin(t * 0.04 + s.x * 10);
      ctx.fillStyle = `rgba(255,255,255,${twinkle})`;
      ctx.beginPath();
      ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Isometric-ish grid
    ctx.strokeStyle = "rgba(170,170,255,.06)";
    ctx.lineWidth = 1;
    for (let gx = 0; gx < W; gx += 40) {
      ctx.beginPath();
      ctx.moveTo(gx, 0);
      ctx.lineTo(gx + 20, H);
      ctx.stroke();
    }
    for (let gy = 0; gy < H; gy += 30) {
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.lineTo(W, gy + 10);
      ctx.stroke();
    }

    // Platforms
    platforms.forEach((p, i) => {
      const px = p.x * W;
      const py = (p.y + Math.sin(t * p.floatSpeed * 0.04 + p.phase) * p.floatAmp) * H;
      const pw = p.w * W;
      const ph = p.h * H;

      // Shadow
      ctx.fillStyle = "rgba(0,0,0,.3)";
      ctx.beginPath();
      ctx.ellipse(px, py + ph + 6, pw * 0.45, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Body
      const fill = p.color.startsWith("#") ? hexToRgba(p.color, 0.16) : p.color.replace(/,\s*[\d.]+\)\s*$/, ",0.18)");
      ctx.fillStyle = fill;
      roundRectPath(px - pw / 2, py - ph / 2, pw, ph, 6);
      ctx.fill();
      ctx.strokeStyle = p.color.startsWith("#") ? hexToRgba(p.color, 0.9) : p.color;
      ctx.lineWidth = 1.2;
      roundRectPath(px - pw / 2, py - ph / 2, pw, ph, 6);
      ctx.stroke();

      // Label
      ctx.font = "7px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
      ctx.fillStyle = p.color.startsWith("#") ? hexToRgba(p.color, 0.9) : p.color;
      ctx.textAlign = "center";
      ctx.fillText(p.label, px, py + 3);

      if (i === 0) {
        const edy = py - ph / 2 - 10 - Math.sin(t * 0.08) * 4;
        ctx.fillStyle = UNITY;
        ctx.beginPath();
        ctx.arc(px, edy, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = UNITY;
        ctx.lineWidth = 1.5;
        // Arms
        ctx.beginPath();
        ctx.moveTo(px - 8, edy + 2);
        ctx.lineTo(px - 4, edy + 5);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(px + 8, edy + 2);
        ctx.lineTo(px + 4, edy + 5);
        ctx.stroke();
        // Legs
        ctx.beginPath();
        ctx.moveTo(px - 3, edy + 5);
        ctx.lineTo(px - 4, edy + 11);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(px + 3, edy + 5);
        ctx.lineTo(px + 4, edy + 11);
        ctx.stroke();
      }
    });

    // Particles
    if (t % 8 === 0) spawnParticle();
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i]!;
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.008;
      if (p.alpha <= 0) {
        particles.splice(i, 1);
        continue;
      }
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // HUD
    ctx.fillStyle = "rgba(0,0,0,.4)";
    roundRectPath(10, 10, 220, 20, 4);
    ctx.fill();
    ctx.font = "7px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
    ctx.textAlign = "left";
    ctx.fillStyle = "rgba(170,170,255,.7)";
    ctx.fillText("UNITY_EDITOR · SCENE_VIEW · PLAY_MODE", 16, 23);

    const score = Math.floor(t * 3.7) % 9999;
    ctx.fillStyle = "rgba(0,0,0,.4)";
    roundRectPath(W - 110, 10, 100, 20, 4);
    ctx.fill();
    ctx.fillStyle = ORANGE;
    ctx.textAlign = "right";
    ctx.fillText(`SCORE: ${String(score).padStart(5, "0")}`, W - 18, 23);

    ctx.fillStyle = "rgba(0,0,0,.4)";
    roundRectPath(10, H - 28, 130, 18, 4);
    ctx.fill();
    ctx.fillStyle = CYAN;
    ctx.textAlign = "left";
    const fps = 58 + Math.round(Math.sin(t * 0.1) * 2);
    ctx.fillText(`FPS: ${fps} · GPU: 12ms`, 16, H - 15);

    t++;
    maybeUpdateChips();
    raf = window.requestAnimationFrame(draw);
  };

  resize();
  const ro = new ResizeObserver(() => resize());
  ro.observe(canvas.parentElement ?? canvas);
  window.addEventListener("resize", resize);
  raf = window.requestAnimationFrame(draw);

  return () => {
    destroyed = true;
    if (raf) window.cancelAnimationFrame(raf);
    window.removeEventListener("resize", resize);
    ro.disconnect();
  };
}


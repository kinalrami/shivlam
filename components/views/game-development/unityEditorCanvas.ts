"use client";

export function attachUnityEditorCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const dpr = window.devicePixelRatio || 1;
  let raf = 0;
  let t = 0;
  let destroyed = false;

  const UNITY = "#AAAAFF";
  const ORANGE = "#FF9933";
  const CYAN = "#1DCFCF";

  type Enemy = { x: number; y: number; vx: number; alive: boolean };
  const enemies: Enemy[] = [
    { x: 0.2, y: 0.35, vx: 0.003, alive: true },
    { x: 0.6, y: 0.25, vx: -0.002, alive: true },
    { x: 0.85, y: 0.45, vx: -0.004, alive: true },
    { x: 0.4, y: 0.5, vx: 0.003, alive: true },
  ];

  const bullets: Array<{ x: number; y: number }> = [];
  let lastSpawn = 0;
  const explosions: Array<{ x: number; y: number; r: number; max: number; tt: number }> = [];

  const resize = () => {
    const parent = canvas.parentElement;
    if (!parent) return;
    const r = parent.getBoundingClientRect();
    const cssW = Math.max(1, Math.floor(r.width));
    const cssH = Math.max(1, Math.floor(r.height));
    canvas.width = Math.floor(cssW * dpr);
    canvas.height = Math.floor(cssH * dpr);
    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${cssH}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const drawTri = (cx: number, cy: number, s: number, fill: string, stroke: string) => {
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.moveTo(cx, cy - s);
    ctx.lineTo(cx - s * 0.8, cy + s * 0.8);
    ctx.lineTo(cx + s * 0.8, cy + s * 0.8);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 1;
    ctx.stroke();
  };

  const loop = () => {
    if (destroyed) return;
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;

    ctx.fillStyle = "#0a0a1a";
    ctx.fillRect(0, 0, W, H);

    // stars
    for (let i = 0; i < 40; i++) {
      const sx = ((i * 137 + t * 0.8) % W + W) % W;
      const sy = (i * 97) % H;
      ctx.fillStyle = "rgba(255,255,255,.3)";
      ctx.fillRect(sx, sy, 1, 1);
    }

    // grid
    ctx.strokeStyle = "rgba(170,170,255,.05)";
    ctx.lineWidth = 1;
    for (let gx = 0; gx < W; gx += 24) {
      ctx.beginPath();
      ctx.moveTo(gx + 0.5, 0);
      ctx.lineTo(gx + 0.5, H);
      ctx.stroke();
    }
    for (let gy = 0; gy < H; gy += 24) {
      ctx.beginPath();
      ctx.moveTo(0, gy + 0.5);
      ctx.lineTo(W, gy + 0.5);
      ctx.stroke();
    }

    // player ship
    const px = W * 0.5;
    const py = H * 0.8;
    ctx.fillStyle = UNITY;
    ctx.beginPath();
    ctx.moveTo(px, py - 14);
    ctx.lineTo(px - 8, py + 6);
    ctx.lineTo(px, py + 2);
    ctx.lineTo(px + 8, py + 6);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "rgba(170,170,255,.5)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // thruster glow
    const glowR = 12 + Math.sin(t * 0.2) * 3;
    const tg = ctx.createRadialGradient(px, py + 8, 0, px, py + 8, glowR);
    tg.addColorStop(0, "rgba(255,153,51,.6)");
    tg.addColorStop(1, "transparent");
    ctx.fillStyle = tg;
    ctx.beginPath();
    ctx.arc(px, py + 8, glowR, 0, Math.PI * 2);
    ctx.fill();

    // bullets spawn
    if (t - lastSpawn > 12) {
      bullets.push({ x: px, y: py - 14 });
      lastSpawn = t;
    }

    // bullets
    for (let i = bullets.length - 1; i >= 0; i--) {
      const b = bullets[i]!;
      b.y -= 5;
      if (b.y < -10) {
        bullets.splice(i, 1);
        continue;
      }

      // collision
      let hit = false;
      for (const en of enemies) {
        if (!en.alive) continue;
        const dx = b.x - en.x * W;
        const dy = b.y - en.y * H;
        if (Math.sqrt(dx * dx + dy * dy) < 12) {
          en.alive = false;
          hit = true;
          explosions.push({ x: en.x * W, y: en.y * H, r: 4, max: 20, tt: 0 });
        }
      }
      if (hit) {
        bullets.splice(i, 1);
        continue;
      }

      ctx.fillStyle = CYAN;
      ctx.fillRect(b.x - 1.5, b.y - 8, 3, 8);
      const bg = ctx.createLinearGradient(b.x, b.y - 8, b.x, b.y);
      bg.addColorStop(0, "rgba(29,207,207,.8)");
      bg.addColorStop(1, "transparent");
      ctx.fillStyle = bg;
      ctx.fillRect(b.x - 1.5, b.y - 8, 3, 8);
    }

    // enemies
    enemies.forEach((en) => {
      en.x += en.vx;
      if (en.x < 0.05 || en.x > 0.95) en.vx *= -1;
      if (!en.alive) return;
      drawTri(en.x * W, en.y * H, 10, "rgba(255,107,107,.8)", "rgba(255,107,107,.4)");
    });

    // revive
    enemies.forEach((en) => {
      if (!en.alive && Math.random() < 0.003) {
        en.alive = true;
        en.x = Math.random() * 0.8 + 0.1;
        en.y = 0.2 + Math.random() * 0.3;
      }
    });

    // explosions
    for (let i = explosions.length - 1; i >= 0; i--) {
      const ex = explosions[i]!;
      ex.tt += 1;
      ex.r += 1.5;
      const alpha = 1 - ex.tt / ex.max;
      if (alpha <= 0) {
        explosions.splice(i, 1);
        continue;
      }
      ctx.strokeStyle = `rgba(255,153,51,${alpha})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(ex.x, ex.y, ex.r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = `rgba(29,207,207,${alpha * 0.6})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(ex.x, ex.y, ex.r * 0.6, 0, Math.PI * 2);
      ctx.stroke();
    }

    t += 1;
    raf = window.requestAnimationFrame(loop);
  };

  resize();
  const ro = new ResizeObserver(() => resize());
  ro.observe(canvas.parentElement ?? canvas);
  window.addEventListener("resize", resize);
  raf = window.requestAnimationFrame(loop);

  return () => {
    destroyed = true;
    if (raf) window.cancelAnimationFrame(raf);
    window.removeEventListener("resize", resize);
    ro.disconnect();
  };
}


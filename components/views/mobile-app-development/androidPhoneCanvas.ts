type Cleanup = () => void;

function roundRect(
  ctx: CanvasRenderingContext2D,
  rx: number,
  ry: number,
  rw: number,
  rh: number,
  rad: number,
  fill?: string,
  stroke?: string,
) {
  ctx.beginPath();
  ctx.moveTo(rx + rad, ry);
  ctx.lineTo(rx + rw - rad, ry);
  ctx.quadraticCurveTo(rx + rw, ry, rx + rw, ry + rad);
  ctx.lineTo(rx + rw, ry + rh - rad);
  ctx.quadraticCurveTo(rx + rw, ry + rh, rx + rw - rad, ry + rh);
  ctx.lineTo(rx + rad, ry + rh);
  ctx.quadraticCurveTo(rx, ry + rh, rx, ry + rh - rad);
  ctx.lineTo(rx, ry + rad);
  ctx.quadraticCurveTo(rx, ry, rx + rad, ry);
  ctx.closePath();
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

/** Android-flavoured hero phone canvas (Kotlin/Compose style). */
export function attachAndroidPhoneCanvas(canvas: HTMLCanvasElement): Cleanup {
  const ctx0 = canvas.getContext("2d");
  if (!ctx0) return () => {};
  const ctx: CanvasRenderingContext2D = ctx0;

  let raf = 0;
  let t = 0;

  canvas.width = 260;
  canvas.height = 520;
  const W = 260;
  const H = 520;

  const ACCENT = { r: 34, g: 197, b: 94 }; // green
  const accent = (a: number) => `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${a})`;

  function drawScreen(alpha: number) {
    // status bar
    ctx.fillStyle = accent(alpha * 0.65);
    ctx.font = "4px var(--font-space-mono), ui-monospace, monospace";
    ctx.fillText("9:41", 20, 61);
    ctx.fillStyle = `rgba(255,255,255,${alpha * 0.32})`;
    ctx.fillText("●●●●", W - 55, 55);

    // header card
    roundRect(
      ctx,
      14,
      64,
      W - 28,
      70,
      10,
      `rgba(7,20,14,${alpha * 0.9})`,
      accent(alpha * 0.28),
    );
    ctx.fillStyle = accent(alpha * 0.9);
    ctx.font = "bold 12px var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif";
    ctx.fillText("Compose UI", 24, 94);
    ctx.fillStyle = `rgba(255,255,255,${alpha * 0.4})`;
    ctx.font = "7px var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif";
    ctx.fillText("Material · Kotlin-first", 24, 110);

    // stat row
    const stats: Array<[number, number, string, string]> = [
      [14, 148, "32", "Modules"],
      [90, 148, "4.8", "Rating"],
      [167, 148, "120", "Installs"],
    ];
    stats.forEach(([bx, by, val, lbl]) => {
      roundRect(
        ctx,
        bx,
        by,
        68,
        52,
        8,
        `rgba(7,20,14,${alpha * 0.72})`,
        accent(alpha * 0.18),
      );
      ctx.fillStyle = accent(alpha * 0.9);
      ctx.font = "bold 14px var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif";
      ctx.fillText(val, bx + 10, by + 25);
      ctx.fillStyle = `rgba(255,255,255,${alpha * 0.35})`;
      ctx.font = "7px var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif";
      ctx.fillText(lbl, bx + 10, by + 40);
    });

    // list items
    const items: Array<[string, string]> = [
      ["Release build", "Signed ✓"],
      ["Crash-free", "99.8%"],
      ["Play rollout", "Staged 10%"],
    ];
    items.forEach(([ttl, sub], i) => {
      const ly = 216 + i * 54;
      roundRect(
        ctx,
        14,
        ly,
        W - 28,
        44,
        8,
        `rgba(6,18,12,${alpha * 0.68})`,
        `rgba(255,255,255,${alpha * 0.08})`,
      );
      ctx.fillStyle = accent(alpha * 0.55);
      ctx.fillRect(14, ly, 3, 44);
      ctx.fillStyle = `rgba(255,255,255,${alpha * 0.55})`;
      ctx.font = "10px var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif";
      ctx.fillText(ttl, 26, ly + 17);
      ctx.fillStyle = `rgba(255,255,255,${alpha * 0.25})`;
      ctx.font = "7px var(--font-space-mono), ui-monospace, monospace";
      ctx.fillText(sub, 26, ly + 32);
    });

    // bottom nav
    roundRect(
      ctx,
      14,
      H - 70,
      W - 28,
      50,
      12,
      `rgba(6,18,12,${alpha * 0.86})`,
      accent(alpha * 0.12),
    );
    ["⌂", "◎", "♡", "☰"].forEach((ic, i) => {
      ctx.fillStyle = i === 1 ? accent(alpha * 0.9) : `rgba(255,255,255,${alpha * 0.3})`;
      ctx.font = "14px ui-sans-serif, system-ui, sans-serif";
      ctx.fillText(ic, 28 + i * 52, H - 38);
    });
  }

  function draw() {
    t += 0.01;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#06110b";
    ctx.fillRect(0, 0, W, H);

    // subtle grid
    for (let i = 0; i < W; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, H);
      ctx.strokeStyle = "rgba(34,197,94,0.08)";
      ctx.lineWidth = 0.4;
      ctx.stroke();
    }
    for (let j = 0; j < H; j += 20) {
      ctx.beginPath();
      ctx.moveTo(0, j);
      ctx.lineTo(W, j);
      ctx.strokeStyle = "rgba(34,197,94,0.08)";
      ctx.lineWidth = 0.4;
      ctx.stroke();
    }

    drawScreen(1);

    // shimmer
    const shimX = ((t * 60) % (W + 80)) - 40;
    const sg = ctx.createLinearGradient(shimX, 0, shimX + 40, 0);
    sg.addColorStop(0, "transparent");
    sg.addColorStop(0.5, "rgba(34,197,94,0.06)");
    sg.addColorStop(1, "transparent");
    ctx.fillStyle = sg;
    ctx.fillRect(0, 0, W, H);

    raf = requestAnimationFrame(draw);
  }

  draw();

  return () => cancelAnimationFrame(raf);
}


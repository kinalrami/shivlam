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

/** Flutter-flavoured hero phone canvas (cross-platform UI style). */
export function attachFlutterPhoneCanvas(canvas: HTMLCanvasElement): Cleanup {
  const ctx0 = canvas.getContext("2d");
  if (!ctx0) return () => {};
  const ctx: CanvasRenderingContext2D = ctx0;

  let raf = 0;
  let t = 0;

  canvas.width = 260;
  canvas.height = 520;
  const W = 260;
  const H = 520;

  const ACCENT = { r: 29, g: 207, b: 207 }; // cyan
  const accent = (a: number) => `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${a})`;

  function drawScreen(alpha: number) {
    // status bar
    ctx.fillStyle = accent(alpha * 0.6);
    ctx.font = "4px var(--font-space-mono), ui-monospace, monospace";
    ctx.fillText("9:41", 20, 61);
    ctx.fillStyle = `rgba(255,255,255,${alpha * 0.3})`;
    ctx.fillText("●●●●", W - 55, 55);

    // header
    roundRect(
      ctx,
      14,
      64,
      W - 28,
      70,
      10,
      `rgba(9,18,30,${alpha * 0.92})`,
      accent(alpha * 0.26),
    );
    ctx.fillStyle = accent(alpha * 0.88);
    ctx.font = "bold 12px var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif";
    ctx.fillText("Flutter UI", 24, 94);
    ctx.fillStyle = `rgba(255,255,255,${alpha * 0.38})`;
    ctx.font = "7px var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif";
    ctx.fillText("One codebase · iOS + Android", 24, 110);

    // cards
    const cards: Array<[number, number, string, string]> = [
      [14, 148, "60fps", "Motion"],
      [90, 148, "1x", "Codebase"],
      [167, 148, "2", "Stores"],
    ];
    cards.forEach(([bx, by, val, lbl], i) => {
      roundRect(
        ctx,
        bx,
        by,
        68,
        52,
        8,
        `rgba(9,18,30,${alpha * 0.78})`,
        accent(alpha * (0.14 + i * 0.02)),
      );
      ctx.fillStyle = accent(alpha * 0.9);
      ctx.font = "bold 14px var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif";
      ctx.fillText(val, bx + 10, by + 25);
      ctx.fillStyle = `rgba(255,255,255,${alpha * 0.35})`;
      ctx.font = "7px var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif";
      ctx.fillText(lbl, bx + 10, by + 40);
    });

    // timeline blocks
    const items: Array<[string, string]> = [
      ["Widgets", "Reusable UI"],
      ["Bridges", "Native SDKs"],
      ["Release", "Store-ready ✓"],
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
        `rgba(6,14,24,${alpha * 0.72})`,
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
      `rgba(6,14,24,${alpha * 0.86})`,
      accent(alpha * 0.12),
    );
    ["⌂", "◎", "♡", "☰"].forEach((ic, i) => {
      ctx.fillStyle = i === 2 ? accent(alpha * 0.88) : `rgba(255,255,255,${alpha * 0.3})`;
      ctx.font = "14px ui-sans-serif, system-ui, sans-serif";
      ctx.fillText(ic, 28 + i * 52, H - 38);
    });
  }

  function draw() {
    t += 0.01;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#050d18";
    ctx.fillRect(0, 0, W, H);

    for (let i = 0; i < W; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, H);
      ctx.strokeStyle = "rgba(29,207,207,0.08)";
      ctx.lineWidth = 0.4;
      ctx.stroke();
    }
    for (let j = 0; j < H; j += 20) {
      ctx.beginPath();
      ctx.moveTo(0, j);
      ctx.lineTo(W, j);
      ctx.strokeStyle = "rgba(29,207,207,0.08)";
      ctx.lineWidth = 0.4;
      ctx.stroke();
    }

    drawScreen(1);

    const shimX = ((t * 60) % (W + 80)) - 40;
    const sg = ctx.createLinearGradient(shimX, 0, shimX + 40, 0);
    sg.addColorStop(0, "transparent");
    sg.addColorStop(0.5, "rgba(29,207,207,0.06)");
    sg.addColorStop(1, "transparent");
    ctx.fillStyle = sg;
    ctx.fillRect(0, 0, W, H);

    raf = requestAnimationFrame(draw);
  }

  draw();

  return () => cancelAnimationFrame(raf);
}


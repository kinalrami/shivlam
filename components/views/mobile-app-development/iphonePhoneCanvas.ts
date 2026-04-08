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

/** Ported from `shivlam-iphone-dev.html` (`#phone-cv`) with responsive sizing. */
export function attachIphonePhoneCanvas(canvas: HTMLCanvasElement): Cleanup {
  const ctx0 = canvas.getContext("2d");
  if (!ctx0) return () => {};
  const ctx: CanvasRenderingContext2D = ctx0;

  let raf = 0;
  let t = 0;
  // Match HTML exactly: fixed canvas resolution (prevents zoom/crop differences).
  canvas.width = 260;
  canvas.height = 520;
  const W = 260;
  const H = 520;

  function screen0(alpha: number) {
    // status bar
    ctx.fillStyle = `rgba(245,138,11,${alpha * 0.6})`;
    ctx.font = "4px var(--font-space-mono), ui-monospace, monospace";
    ctx.fillText("9:41", 20, 61);
    ctx.fillStyle = `rgba(255,255,255,${alpha * 0.3})`;
    ctx.fillText("●●●●", W - 55, 55);

    // header card
    const cw = W;
    const ch = H;
    roundRect(
      ctx,
      14,
      64,
      cw - 28,
      70,
      8,
      `rgba(16,43,77,${alpha * 0.8})`,
      `rgba(245,138,11,${alpha * 0.3})`,
    );
    ctx.fillStyle = `rgba(245,138,11,${alpha * 0.85})`;
    ctx.font = "bold 12px var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif";
    ctx.fillText("Dashboard", 24, 94);
    ctx.fillStyle = `rgba(255,255,255,${alpha * 0.4})`;
    ctx.font = "7px var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif";
    ctx.fillText("Welcome back, User", 24, 110);

    // stat row
    const stats: Array<[number, number, string, string]> = [
      [14, 148, "24", "Active"],
      [90, 148, "138", "Orders"],
      [167, 148, "4.9", "Reviews"],
    ];
    stats.forEach(([bx, by, val, lbl]) => {
      roundRect(
        ctx,
        bx,
        by,
        68,
        52,
        6,
        `rgba(16,43,77,${alpha * 0.7})`,
        `rgba(245,138,11,${alpha * 0.2})`,
      );
      ctx.fillStyle = `rgba(245,138,11,${alpha * 0.9})`;
      ctx.font = "bold 14px var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif";
      ctx.fillText(val, bx + 10, by + 25);
      ctx.fillStyle = `rgba(255,255,255,${alpha * 0.35})`;
      ctx.font = "7px var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif";
      ctx.fillText(lbl, bx + 10, by + 40);
    });

    // list items
    const items: Array<[string, string]> = [
      ["Order #1042", "Delivered ✓"],
      ["User Analytics", "98% retention"],
      ["Push Notification", "Sent to 2.1k"],
    ];
    items.forEach(([ttl, sub], i) => {
      const ly = 216 + i * 54;
      roundRect(
        ctx,
        14,
        ly,
        cw - 28,
        44,
        6,
        `rgba(10,27,51,${alpha * 0.6})`,
        `rgba(16,43,77,${alpha * 0.4})`,
      );
      ctx.fillStyle = `rgba(245,138,11,${alpha * 0.6})`;
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
      ch - 70,
      cw - 28,
      50,
      10,
      `rgba(10,27,51,${alpha * 0.8})`,
      `rgba(245,138,11,${alpha * 0.15})`,
    );
    ["⌂", "◎", "♡", "☰"].forEach((ic, i) => {
      ctx.fillStyle =
        i === 0 ? `rgba(245,138,11,${alpha * 0.9})` : `rgba(255,255,255,${alpha * 0.3})`;
      ctx.font = "14px ui-sans-serif, system-ui, sans-serif";
      ctx.fillText(ic, 28 + i * 52, ch - 38);
    });
  }

  function draw() {
    t += 0.01;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#040e1e";
    ctx.fillRect(0, 0, W, H);

    // subtle grid
    for (let i = 0; i < W; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, H);
      ctx.strokeStyle = "rgba(16,43,77,0.25)";
      ctx.lineWidth = 0.4;
      ctx.stroke();
    }
    for (let j = 0; j < H; j += 20) {
      ctx.beginPath();
      ctx.moveTo(0, j);
      ctx.lineTo(W, j);
      ctx.strokeStyle = "rgba(16,43,77,0.25)";
      ctx.lineWidth = 0.4;
      ctx.stroke();
    }

    screen0(1);

    // shimmer
    const shimX = ((t * 60) % (W + 80)) - 40;
    const sg = ctx.createLinearGradient(shimX, 0, shimX + 40, 0);
    sg.addColorStop(0, "transparent");
    sg.addColorStop(0.5, "rgba(245,138,11,0.04)");
    sg.addColorStop(1, "transparent");
    ctx.fillStyle = sg;
    ctx.fillRect(0, 0, W, H);

    raf = requestAnimationFrame(draw);
  }

  draw();

  return () => {
    cancelAnimationFrame(raf);
  };
}


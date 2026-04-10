type Cleanup = () => void;

/** Dashboard / analytics / profile phone preview for Why Hire left column. */
export function attachWhyPhoneCanvas(canvas: HTMLCanvasElement): Cleanup {
  const x0 = canvas.getContext("2d");
  if (!x0) return () => {};
  const x: CanvasRenderingContext2D = x0;

  let raf = 0;
  let t = 0;

  const W = 150;
  const H = 300;
  canvas.width = W;
  canvas.height = H;

  const screens = ["dashboard", "profile", "analytics", "settings"] as const;
  let screenIdx = 0;
  let screenT = 0;

  function roundRect(
    ctx: CanvasRenderingContext2D,
    rx: number,
    ry: number,
    rw: number,
    rh: number,
    rad: number,
    fill: string | null,
    stroke: string | null,
  ) {
    ctx.beginPath();
    ctx.moveTo(rx + rad, ry);
    ctx.lineTo(rx + rw - rad, ry);
    ctx.arcTo(rx + rw, ry, rx + rw, ry + rad, rad);
    ctx.lineTo(rx + rw, ry + rh - rad);
    ctx.arcTo(rx + rw, ry + rh, rx + rw - rad, ry + rh, rad);
    ctx.lineTo(rx + rad, ry + rh);
    ctx.arcTo(rx, ry + rh, rx, ry + rh - rad, rad);
    ctx.lineTo(rx, ry + rad);
    ctx.arcTo(rx, ry, rx + rad, ry, rad);
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

  function drawStatusBar(alpha: number) {
    x.fillStyle = `rgba(255,153,51,${alpha * 0.7})`;
    x.font = "5px var(--font-space-mono), ui-monospace, monospace";
    x.textAlign = "left";
    x.fillText("9:41", 10, 29);
    x.textAlign = "right";
    x.fillStyle = `rgba(255,255,255,${alpha * 0.4})`;
    x.fillText("●●● 5G", W - 10, 29);
    x.textAlign = "left";
  }

  function drawDashboard(alpha: number) {
    roundRect(
      x,
      8,
      36,
      W - 16,
      42,
      6,
      `rgba(255,153,51,${alpha * 0.12})`,
      `rgba(255,153,51,${alpha * 0.25})`,
    );
    x.fillStyle = `rgba(255,255,255,${alpha * 0.85})`;
    x.font = "bold 6px var(--font-dm-sans), ui-sans-serif, sans-serif";
    x.textAlign = "left";
    x.fillText("Dashboard", 16, 52);
    x.fillStyle = `rgba(255,255,255,${alpha * 0.3})`;
    x.font = "6px var(--font-dm-sans), ui-sans-serif, sans-serif";
    x.fillText("Welcome back 👋", 16, 64);

    [
      [8, "Active", "24"],
      [55, "Orders", "138"],
      [102, "Rating", "4.9"],
    ].forEach(([bx, lbl, val]) => {
      roundRect(
        x,
        bx as number,
        86,
        40,
        34,
        5,
        `rgba(16,43,77,${alpha * 0.8})`,
        `rgba(255,153,51,${alpha * 0.18})`,
      );
      x.fillStyle = `rgba(255,153,51,${alpha * 0.9})`;
      x.font = "bold 8px var(--font-dm-sans), ui-sans-serif, sans-serif";
      x.textAlign = "center";
      x.fillText(String(val), (bx as number) + 20, 100);
      x.fillStyle = `rgba(255,255,255,${alpha * 0.35})`;
      x.font = "5px var(--font-space-mono), ui-monospace, monospace";
      x.fillText(String(lbl), (bx as number) + 20, 112);
    });
    x.textAlign = "left";

    [0, 1, 2, 3].forEach((i) => {
      const ly = 128 + i * 34;
      const progress = Math.min(1, Math.max(0, t * 0.4 - i * 0.3));
      roundRect(
        x,
        8,
        ly,
        (W - 16) * progress,
        26,
        5,
        `rgba(10,27,51,${alpha * 0.7})`,
        `rgba(255,153,51,${alpha * 0.1})`,
      );
      if (progress > 0.2) {
        x.fillStyle = `rgba(255,153,51,${alpha * 0.6})`;
        x.fillRect(8, ly, 2, 26);
        x.fillStyle = `rgba(255,255,255,${alpha * 0.6})`;
        x.font = "6px var(--font-dm-sans), ui-sans-serif, sans-serif";
        x.fillText(
          ["User Analytics", "Push Sent", "Build OK ✓", "Store Live ✓"][i],
          14,
          ly + 11,
        );
        x.fillStyle = `rgba(255,255,255,${alpha * 0.28})`;
        x.font = "5px var(--font-space-mono), ui-monospace, monospace";
        x.fillText(
          ["98% retention", "2.1k users", "v2.4.1", "App Store"][i],
          14,
          ly + 21,
        );
      }
    });

    roundRect(
      x,
      8,
      H - 44,
      W - 16,
      34,
      8,
      `rgba(10,22,44,${alpha * 0.9})`,
      `rgba(255,153,51,${alpha * 0.12})`,
    );
    const navIcons = ["⌂", "◎", "♡", "☰"];
    navIcons.forEach((ic, i) => {
      const active = i === 0;
      x.fillStyle = active
        ? `rgba(255,153,51,${alpha * 0.95})`
        : `rgba(255,255,255,${alpha * 0.28})`;
      x.font = "10px sans-serif";
      x.textAlign = "center";
      x.fillText(ic, 20 + i * 30, H - 22);
      if (active) {
        x.beginPath();
        x.arc(20, H - 14, 1.5, 0, Math.PI * 2);
        x.fillStyle = `rgba(255,153,51,${alpha * 0.8})`;
        x.fill();
      }
    });
    x.textAlign = "left";
  }

  function drawAnalytics(alpha: number) {
    x.fillStyle = `rgba(255,255,255,${alpha * 0.8})`;
    x.font = "bold 8px var(--font-dm-sans), ui-sans-serif, sans-serif";
    x.fillText("Analytics", 14, 50);
    x.fillStyle = `rgba(255,255,255,${alpha * 0.28})`;
    x.font = "6px var(--font-space-mono), ui-monospace, monospace";
    x.fillText("Last 7 days", 14, 60);

    const barData = [0.4, 0.65, 0.5, 0.8, 0.7, 0.9, 0.75];
    const chartH = 80;
    const chartY = 80;
    barData.forEach((h, i) => {
      const bx = 12 + i * 18;
      const bh = chartH * h * Math.min(1, t * 0.3);
      roundRect(
        x,
        bx,
        chartY + chartH - bh,
        12,
        bh,
        2,
        `rgba(255,153,51,${alpha * (0.4 + h * 0.4)})`,
        null,
      );
    });
    x.beginPath();
    barData.forEach((h, i) => {
      const px = 18 + i * 18;
      const py = chartY + chartH - chartH * h * Math.min(1, t * 0.3);
      if (i === 0) x.moveTo(px, py);
      else x.lineTo(px, py);
    });
    x.strokeStyle = `rgba(29,207,207,${alpha * 0.7})`;
    x.lineWidth = 1.5;
    x.stroke();

    [
      ["DAU", "4.2k"],
      ["MAU", "28k"],
      ["CVR", "3.8%"],
    ].forEach(([lbl, val], i) => {
      roundRect(
        x,
        8 + i * 46,
        174,
        40,
        32,
        5,
        `rgba(16,43,77,${alpha * 0.8})`,
        `rgba(255,153,51,${alpha * 0.18})`,
      );
      x.fillStyle = `rgba(255,153,51,${alpha * 0.9})`;
      x.font = "bold 7px var(--font-dm-sans), ui-sans-serif, sans-serif";
      x.textAlign = "center";
      x.fillText(val, 28 + i * 46, 190);
      x.fillStyle = `rgba(255,255,255,${alpha * 0.35})`;
      x.font = "5px var(--font-space-mono), ui-monospace, monospace";
      x.fillText(lbl, 28 + i * 46, 200);
    });
    x.textAlign = "left";

    const pulse = 0.5 + 0.4 * Math.sin(t * 2);
    roundRect(
      x,
      8,
      216,
      W - 16,
      24,
      5,
      `rgba(34,197,94,${alpha * 0.08})`,
      `rgba(34,197,94,${alpha * pulse * 0.4})`,
    );
    x.fillStyle = `rgba(34,197,94,${alpha * 0.85})`;
    x.font = "5.5px var(--font-space-mono), ui-monospace, monospace";
    x.fillText("  ● APP PERFORMING WELL", 14, 232);

    roundRect(
      x,
      8,
      H - 44,
      W - 16,
      34,
      8,
      `rgba(10,22,44,${alpha * 0.9})`,
      `rgba(255,153,51,${alpha * 0.12})`,
    );
    ["⌂", "◎", "♡", "☰"].forEach((ic, i) => {
      const active = i === 1;
      x.fillStyle = active
        ? `rgba(255,153,51,${alpha * 0.95})`
        : `rgba(255,255,255,${alpha * 0.28})`;
      x.font = "10px sans-serif";
      x.textAlign = "center";
      x.fillText(ic, 20 + i * 30, H - 22);
    });
    x.textAlign = "left";
  }

  function drawProfile(alpha: number) {
    x.beginPath();
    x.arc(W / 2, 70, 20, 0, Math.PI * 2);
    x.fillStyle = `rgba(255,153,51,${alpha * 0.2})`;
    x.fill();
    x.strokeStyle = `rgba(255,153,51,${alpha * 0.5})`;
    x.lineWidth = 1.5;
    x.stroke();
    x.fillStyle = `rgba(255,153,51,${alpha * 0.7})`;
    x.font = "bold 11px var(--font-dm-sans), ui-sans-serif, sans-serif";
    x.textAlign = "center";
    x.fillText("S", W / 2, 74);

    x.fillStyle = `rgba(255,255,255,${alpha * 0.8})`;
    x.font = "bold 7.5px var(--font-dm-sans), ui-sans-serif, sans-serif";
    x.fillText("Shivlam Dev", W / 2, 106);
    x.fillStyle = `rgba(255,255,255,${alpha * 0.35})`;
    x.font = "6px var(--font-space-mono), ui-monospace, monospace";
    x.fillText("hi@shivlam.com", W / 2, 117);
    x.textAlign = "left";

    const menuItems = ["My Projects", "App Store", "Settings", "Analytics", "Support"];
    menuItems.forEach((item, i) => {
      roundRect(
        x,
        8,
        124 + i * 24,
        W - 16,
        20,
        4,
        `rgba(16,43,77,${alpha * 0.6})`,
        `rgba(255,153,51,${alpha * 0.12})`,
      );
      x.fillStyle = `rgba(255,255,255,${alpha * 0.55})`;
      x.font = "6.5px var(--font-dm-sans), ui-sans-serif, sans-serif";
      x.fillText(`  ${item}`, 12, 137 + i * 24);
      x.fillStyle = `rgba(255,153,51,${alpha * 0.4})`;
      x.fillText("›", W - 18, 137 + i * 24);
    });
  }

  function draw() {
    t += 0.012;
    screenT += 0.012;
    x.clearRect(0, 0, W, H);
    x.fillStyle = "#060d1a";
    x.fillRect(0, 0, W, H);

    for (let i = 0; i < W; i += 18) {
      x.beginPath();
      x.moveTo(i, 0);
      x.lineTo(i, H);
      x.strokeStyle = "rgba(16,43,77,0.2)";
      x.lineWidth = 0.4;
      x.stroke();
    }
    for (let j = 0; j < H; j += 18) {
      x.beginPath();
      x.moveTo(0, j);
      x.lineTo(W, j);
      x.strokeStyle = "rgba(16,43,77,0.2)";
      x.lineWidth = 0.4;
      x.stroke();
    }

    if (screenT > 5.5) {
      screenT = 0;
      screenIdx = (screenIdx + 1) % screens.length;
    }
    const fadeIn = Math.min(1, screenT * 3);
    const fadeOut = screenT > 4.5 ? Math.max(0, 1 - (screenT - 4.5) * 4) : 1;
    const alpha = Math.min(fadeIn, fadeOut);

    drawStatusBar(alpha);
    const screen = screens[screenIdx];
    if (screen === "dashboard") drawDashboard(alpha);
    else if (screen === "analytics") drawAnalytics(alpha);
    else if (screen === "profile") drawProfile(alpha);
    else drawDashboard(alpha);

    raf = requestAnimationFrame(draw);
  }

  draw();

  return () => {
    cancelAnimationFrame(raf);
  };
}

export function attachBrandHeroCanvas(
  canvas: HTMLCanvasElement,
  onChipText: (v: { top: string; bot: string }) => void,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const ORANGE = "#FF9933";
  const CYAN = "#1DCFCF";
  const GREEN = "#22c55e";
  const BLUE = "#60A5FA";
  const PINK = "#E879F9";

  type Node = {
    label: string;
    x: number;
    y: number;
    vx: number;
    vy: number;
    color: string;
    size: number;
    fixed?: boolean;
  };

  const phases = ["BUSINESS", "ONLINE PRESENCE", "BRAND AWARENESS", "BRAND AUTHORITY"] as const;

  const nodes: Node[] = [
    { label: "SEO", x: 0.2, y: 0.3, vx: 0.0015, vy: 0.001, color: GREEN, size: 24 },
    { label: "ASO", x: 0.8, y: 0.25, vx: -0.002, vy: 0.0015, color: CYAN, size: 20 },
    { label: "SOCIAL", x: 0.15, y: 0.65, vx: 0.002, vy: -0.001, color: PINK, size: 22 },
    { label: "ADS", x: 0.75, y: 0.7, vx: -0.0015, vy: -0.002, color: ORANGE, size: 20 },
    { label: "CONTENT", x: 0.5, y: 0.15, vx: 0.001, vy: 0.002, color: BLUE, size: 18 },
    { label: "EMAIL", x: 0.5, y: 0.82, vx: -0.001, vy: -0.0015, color: "#FB923C", size: 16 },
    { label: "BRAND", x: 0.5, y: 0.5, vx: 0, vy: 0, color: ORANGE, size: 32, fixed: true },
  ];

  const rankHistory = Array.from({ length: 40 }, (_, i) => 100 - i * 1.5 - Math.random() * 5);
  rankHistory[rankHistory.length - 1] = 4;

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

  let raf = 0;
  let t = 0;
  let destroyed = false;
  let lastChipIdx = -1;

  const resize = () => {
    const parent = canvas.parentElement;
    if (!parent) return;
    const r = parent.getBoundingClientRect();
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const cssW = Math.max(1, Math.floor(r.width));
    const cssH = 420;
    canvas.width = Math.floor(cssW * dpr);
    canvas.height = Math.floor(cssH * dpr);
    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${cssH}px`;
    canvas.style.maxWidth = "100%";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const maybeUpdateChips = () => {
    const idx = Math.floor(Date.now() / 3000) % 3;
    if (idx === lastChipIdx) return;
    lastChipIdx = idx;
    const states = [
      { top: "↑ RANK #1 · GOOGLE", bot: "● BRAND GROWING" },
      { top: "↑ DOWNLOADS +340%", bot: "◎ ASO ACTIVE" },
      { top: "↑ REACH 2.1M", bot: "● SOCIAL SCALING" },
    ] as const;
    onChipText(states[idx] ?? states[0]);
  };

  const draw = () => {
    if (destroyed) return;
    const W = canvas.offsetWidth || 1;
    const H = 420;

    ctx.fillStyle = "#080818";
    ctx.fillRect(0, 0, W, H);

    // Background grid
    ctx.strokeStyle = "rgba(255,153,51,.04)";
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 44) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = 0; y < H; y += 44) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    // Phase label (cycling)
    const phase = phases[Math.floor(t / 120) % phases.length];
    ctx.fillStyle = "rgba(0,0,0,.5)";
    roundRectPath(12, 12, 220, 22, 4);
    ctx.fill();
    ctx.font = "8px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
    ctx.fillStyle = "rgba(255,153,51,.7)";
    ctx.textAlign = "left";
    ctx.fillText(`BRAND_STATUS: ${phase}`, 18, 26);

    // Move nodes (bounce off edges)
    for (const n of nodes) {
      if (n.fixed) continue;
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0.08 || n.x > 0.92) n.vx *= -1;
      if (n.y < 0.08 || n.y > 0.92) n.vy *= -1;
    }

    // Connections from center
    const center = nodes[nodes.length - 1]!;
    nodes.slice(0, -1).forEach((n, i) => {
      const nx = n.x * W;
      const ny = n.y * H;
      const cx = center.x * W;
      const cy = center.y * H;
      const dist = Math.sqrt((nx - cx) ** 2 + (ny - cy) ** 2);
      const alpha = Math.max(0, 0.3 - (dist / W) * 0.5 + 0.2 * Math.sin(t * 0.04 + i));
      ctx.strokeStyle = `rgba(255,153,51,${alpha})`;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.moveTo(nx, ny);
      ctx.lineTo(cx, cy);
      ctx.stroke();
      ctx.setLineDash([]);

      // Pulse dot
      const prog = (t * 0.02 + i * 0.2) % 1;
      const px = nx + (cx - nx) * prog;
      const py = ny + (cy - ny) * prog;
      ctx.fillStyle = `${n.color}99`;
      ctx.beginPath();
      ctx.arc(px, py, 2.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // Nodes
    nodes.forEach((n, i) => {
      const nx = n.x * W;
      const ny = n.y * H;
      const pulse = 1 + 0.06 * Math.sin(t * 0.06 + i);

      const grd = ctx.createRadialGradient(nx, ny, 0, nx, ny, n.size * 1.8 * pulse);
      grd.addColorStop(0, `${n.color}44`);
      grd.addColorStop(1, "transparent");
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(nx, ny, n.size * 1.8 * pulse, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `${n.color}33`;
      ctx.beginPath();
      ctx.arc(nx, ny, n.size * pulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = n.color;
      ctx.lineWidth = n.fixed ? 2 : 1.2;
      ctx.beginPath();
      ctx.arc(nx, ny, n.size * pulse, 0, Math.PI * 2);
      ctx.stroke();

      ctx.font = `${n.fixed ? 9 : 8}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
      ctx.fillStyle = n.fixed ? "#fff" : n.color;
      ctx.textAlign = "center";
      ctx.fillText(n.label, nx, ny + 3);
    });

    // Mini rank chart bottom-right
    const chartX = W - 160;
    const chartY = H - 80;
    const chartW = 148;
    const chartH = 60;
    ctx.fillStyle = "rgba(0,0,0,.5)";
    roundRectPath(chartX - 4, chartY - 18, chartW + 8, chartH + 26, 6);
    ctx.fill();
    ctx.font = "7px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
    ctx.fillStyle = "rgba(255,153,51,.7)";
    ctx.textAlign = "left";
    ctx.fillText("GOOGLE RANK CLIMBING", chartX - 2, chartY - 6);

    ctx.strokeStyle = GREEN;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    rankHistory.forEach((v, i) => {
      const px = chartX + i * (chartW / rankHistory.length);
      const py = chartY + chartH - (1 - v / 100) * chartH;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.stroke();

    const curRank = Math.max(1, Math.round(4 + 15 * Math.max(0, 1 - t / 600)));
    ctx.fillStyle = "rgba(34,197,94,.15)";
    roundRectPath(chartX + chartW - 32, chartY + chartH - 16, 32, 16, 3);
    ctx.fill();
    ctx.font = "8px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
    ctx.fillStyle = GREEN;
    ctx.textAlign = "center";
    ctx.fillText(`P${curRank}`, chartX + chartW - 16, chartY + chartH - 5);

    // Awareness ring around center
    const arpha = 0.12 + 0.08 * Math.sin(t * 0.03);
    for (let r = 1; r <= 3; r++) {
      ctx.strokeStyle = `rgba(255,153,51,${arpha / r})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(center.x * W, center.y * H, (50 + r * 35) * (0.9 + 0.1 * Math.sin(t * 0.02 + r)), 0, Math.PI * 2);
      ctx.stroke();
    }

    maybeUpdateChips();
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


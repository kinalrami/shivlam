"use client";

const ORANGE = "#FF9933";
const CYAN = "#1DCFCF";

type Obj = { x: number; y: number; type: "cube" | "sphere"; color: string; scale: number; rot: number; label: string };

export function attachArGameDeepDiveCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const dpr = window.devicePixelRatio || 1;
  let raf = 0;
  let t = 0;
  let destroyed = false;

  const anchors = [
    { wx: 0.3, wy: 0.58, label: "ANCHOR_01", active: true },
    { wx: 0.65, wy: 0.62, label: "ANCHOR_02", active: true },
    { wx: 0.5, wy: 0.7, label: "ANCHOR_03", active: false },
  ];

  const objects: Obj[] = [
    { x: 0.3, y: 0.5, type: "cube", color: ORANGE, scale: 1, rot: 0, label: "Enemy" },
    { x: 0.65, y: 0.52, type: "sphere", color: CYAN, scale: 0.9, rot: 0, label: "Collectible" },
    { x: 0.5, y: 0.65, type: "cube", color: "#22c55e", scale: 0.7, rot: 0.3, label: "Platform" },
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

  const drawIsoCube = (cx: number, cy: number, size: number, color: string) => {
    const s = size;
    const top = color.length === 7 && color.startsWith("#") ? `${color}b3` : color;
    ctx.fillStyle = top;
    ctx.beginPath();
    ctx.moveTo(cx, cy - s * 0.5);
    ctx.lineTo(cx + s * 0.7, cy - s * 0.1);
    ctx.lineTo(cx, cy + s * 0.3);
    ctx.lineTo(cx - s * 0.7, cy - s * 0.1);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = color.length === 7 && color.startsWith("#") ? `${color}59` : color;
    ctx.beginPath();
    ctx.moveTo(cx + s * 0.7, cy - s * 0.1);
    ctx.lineTo(cx + s * 0.7, cy + s * 0.4);
    ctx.lineTo(cx, cy + s * 0.8);
    ctx.lineTo(cx, cy + s * 0.3);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.stroke();

    ctx.fillStyle = color.length === 7 && color.startsWith("#") ? `${color}33` : color;
    ctx.beginPath();
    ctx.moveTo(cx - s * 0.7, cy - s * 0.1);
    ctx.lineTo(cx, cy + s * 0.3);
    ctx.lineTo(cx, cy + s * 0.8);
    ctx.lineTo(cx - s * 0.7, cy + s * 0.4);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.stroke();
  };

  const draw = () => {
    if (destroyed) return;
    const W = canvas.clientWidth || canvas.offsetWidth;
    const H = 360;
    ctx.fillStyle = "#1a1410";
    ctx.fillRect(0, 0, W, H);
    const rg = ctx.createRadialGradient(W * 0.4, H * 0.3, 0, W * 0.4, H * 0.3, W * 0.7);
    rg.addColorStop(0, "rgba(60,45,30,.4)");
    rg.addColorStop(1, "rgba(0,0,0,.8)");
    ctx.fillStyle = rg;
    ctx.fillRect(0, 0, W, H);

    ctx.save();
    ctx.translate(0, H * 0.55);
    const gridColor = "rgba(255,107,107,.12)";
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    const vanX = W * 0.5;
    const vanY = -H * 0.3;
    for (let gx = -5; gx <= 15; gx++) {
      const bx = W * (0.05 + gx * 0.06);
      ctx.beginPath();
      ctx.moveTo(bx, H * 0.5);
      ctx.lineTo(vanX + (bx - vanX) * 0.0, vanY);
      ctx.stroke();
    }
    for (let gy = 0; gy < 8; gy++) {
      const prog = gy / 7;
      const y = prog * H * 0.5;
      ctx.beginPath();
      ctx.moveTo(W * (0.1 * (1 - prog)) - W * 0.02, y);
      ctx.lineTo(W * (1 - 0.1 * (1 - prog)) + W * 0.02, y);
      ctx.stroke();
    }
    ctx.restore();

    const scanY = H * 0.35 + Math.sin(t * 0.03) * H * 0.15;
    const sg = ctx.createLinearGradient(0, scanY - 2, 0, scanY + 2);
    sg.addColorStop(0, "transparent");
    sg.addColorStop(0.5, "rgba(255,107,107,.3)");
    sg.addColorStop(1, "transparent");
    ctx.fillStyle = sg;
    ctx.fillRect(0, scanY - 2, W, 4);

    ctx.fillStyle = "rgba(0,0,0,.5)";
    ctx.beginPath();
    if (typeof ctx.roundRect === "function") {
      ctx.roundRect(10, 10, 200, 22, 4);
    } else {
      ctx.rect(10, 10, 200, 22);
    }
    ctx.fill();
    ctx.font = "8px JetBrains Mono, ui-monospace, monospace";
    ctx.fillStyle = "rgba(255,107,107,.8)";
    ctx.textAlign = "left";
    ctx.fillText("ARKit · PLANE_DETECTED · LiDAR_ACTIVE", 16, 24);

    objects.forEach((obj, i) => {
      obj.rot += 0.008;
      const ox = obj.x * W;
      const oy = obj.y * H;
      const s = 28 * obj.scale;
      const bob = Math.sin(t * 0.06 + i * 2) * 4;

      if (obj.type === "cube") {
        drawIsoCube(ox, oy + bob, s, obj.color);
      } else {
        const sg2 = ctx.createRadialGradient(ox - s * 0.2, oy + bob - s * 0.2, 0, ox, oy + bob, s);
        sg2.addColorStop(0, "rgba(255,255,255,.4)");
        sg2.addColorStop(0.5, `${obj.color}cc`);
        sg2.addColorStop(1, `${obj.color}22`);
        ctx.fillStyle = sg2;
        ctx.beginPath();
        ctx.arc(ox, oy + bob, s * 0.7, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = obj.color;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.strokeStyle = `${obj.color}66`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(ox, oy + bob, s, s * 0.3, t * 0.04, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.fillStyle = "rgba(0,0,0,.25)";
      ctx.beginPath();
      ctx.ellipse(ox, oy + s * 0.7 + bob, s * 0.5, s * 0.15, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = "7px JetBrains Mono, ui-monospace, monospace";
      ctx.fillStyle = obj.color;
      ctx.textAlign = "center";
      ctx.fillText(obj.label, ox, oy + bob - s - 6);
    });

    anchors.forEach((a, i) => {
      const ax = a.wx * W;
      const ay = a.wy * H;
      const pulse = 0.4 + 0.4 * Math.sin(t * 0.08 + i);
      ctx.strokeStyle = a.active ? `rgba(255,107,107,${pulse})` : "rgba(255,255,255,.2)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(ax - 10, ay);
      ctx.lineTo(ax + 10, ay);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(ax, ay - 10);
      ctx.lineTo(ax, ay + 10);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(ax, ay, 6 + pulse * 3, 0, Math.PI * 2);
      ctx.stroke();
      ctx.font = "7px JetBrains Mono, ui-monospace, monospace";
      ctx.fillStyle = "rgba(255,107,107,.6)";
      ctx.textAlign = "left";
      ctx.fillText(a.label, ax + 10, ay + 4);
    });

    ctx.font = "7px JetBrains Mono, ui-monospace, monospace";
    ctx.fillStyle = "rgba(255,255,255,.25)";
    ctx.textAlign = "right";
    ctx.fillText("DIST: 1.2m", W - 10, H - 12);
    ctx.fillText("PLANE: 3.4m²", W - 10, H - 22);

    t++;
    raf = requestAnimationFrame(draw);
  };

  const ro = new ResizeObserver(() => {
    resize();
  });
  ro.observe(canvas.parentElement ?? canvas);
  resize();
  draw();

  return () => {
    destroyed = true;
    cancelAnimationFrame(raf);
    ro.disconnect();
  };
}

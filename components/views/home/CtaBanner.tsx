"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/** Rounded-rect orbit for particles (matches original CTA canvas). */
const BORDER_R = 14;
const MARGIN = 3;
/** More dots = denser “frame” on long top/bottom edges on wide layouts */
const COUNT = 72;
const SPREAD = 18;
const BASE_SPD = 0.22;

type PathPoint = { x: number; y: number };

type SegArc = {
  len: number;
  type: "arc";
  cx: number;
  cy: number;
  a0: number;
  da: number;
};

type SegLine = {
  len: number;
  type: "line";
  dx: number;
  dy: number;
  sx: number;
  sy: number;
};

type Seg = SegArc | SegLine;

type Particle = {
  offset: number;
  jitter: number;
  speedVar: number;
  size: number;
  op: number;
  isAmber: boolean;
};

function perimeterPoint(
  d: number,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  cr: number,
  st: number,
  sr: number,
  _cl: number,
): PathPoint {
  const seg: Seg[] = [
    {
      len: (Math.PI / 2) * cr,
      type: "arc",
      cx: x0 + cr,
      cy: y0 + cr,
      a0: Math.PI,
      da: -Math.PI / 2,
    },
    { len: st, type: "line", dx: 1, dy: 0, sx: x0 + cr, sy: y0 },
    {
      len: (Math.PI / 2) * cr,
      type: "arc",
      cx: x1 - cr,
      cy: y0 + cr,
      a0: -Math.PI / 2,
      da: -Math.PI / 2,
    },
    { len: sr, type: "line", dx: 0, dy: 1, sx: x1, sy: y0 + cr },
    {
      len: (Math.PI / 2) * cr,
      type: "arc",
      cx: x1 - cr,
      cy: y1 - cr,
      a0: 0,
      da: -Math.PI / 2,
    },
    { len: st, type: "line", dx: -1, dy: 0, sx: x1 - cr, sy: y1 },
    {
      len: (Math.PI / 2) * cr,
      type: "arc",
      cx: x0 + cr,
      cy: y1 - cr,
      a0: Math.PI / 2,
      da: -Math.PI / 2,
    },
    { len: sr, type: "line", dx: 0, dy: -1, sx: x0, sy: y1 - cr },
  ];

  let rem = d;
  for (const s of seg) {
    if (rem <= s.len) {
      const frac = rem / s.len;
      if (s.type === "arc") {
        const a = s.a0 + s.da * frac;
        return {
          x: s.cx + Math.cos(a) * cr,
          y: s.cy - Math.sin(a) * cr,
        };
      }
      return {
        x: s.sx + s.dx * s.len * frac,
        y: s.sy + s.dy * s.len * frac,
      };
    }
    rem -= s.len;
  }
  return { x: x0, y: y0 };
}

function buildBorderPath(
  w: number,
  h: number,
  r: number,
  m: number,
): { path: PathPoint[] } {
  const x0 = m;
  const y0 = m;
  const x1 = w - m;
  const y1 = h - m;
  const cr = Math.min(r, (x1 - x0) / 2, (y1 - y0) / 2);

  const straightTop = x1 - x0 - 2 * cr;
  const straightRight = y1 - y0 - 2 * cr;
  const cornerLen = (Math.PI / 2) * cr;
  const perimeter =
    2 * (straightTop + straightRight) + 4 * cornerLen;

  const path: PathPoint[] = [];
  const steps = 360;
  for (let i = 0; i < steps; i++) {
    const f = i / steps;
    const d = f * perimeter;
    path.push(
      perimeterPoint(
        d,
        x0,
        y0,
        x1,
        y1,
        cr,
        straightTop,
        straightRight,
        cornerLen,
      ),
    );
  }
  return { path };
}

function normalAt(path: PathPoint[], idx: number): { nx: number; ny: number } {
  const len = path.length;
  const a = path[(idx + len - 1) % len]!;
  const b = path[(idx + 1) % len]!;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const d = Math.hypot(dx, dy) || 1;
  return { nx: -dy / d, ny: dx / d };
}

function initParticles(path: PathPoint[]): Particle[] {
  const pts: Particle[] = [];
  for (let i = 0; i < COUNT; i++) {
    const offset = i / COUNT;
    const jitter = (Math.random() - 0.5) * 2 * SPREAD;
    const speedVar = 0.75 + Math.random() * 0.5;
    const size = 0.85 + Math.random() * 1.75;
    const op = 0.28 + Math.random() * 0.52;
    const isAmber = Math.random() < 0.25;
    pts.push({ offset, jitter, speedVar, size, op, isAmber });
  }
  return pts;
}

export default function CtaBanner() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathRef = useRef<PathPoint[]>([]);
  const ptsRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let wCss = 0;
    let hCss = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      wCss = root.offsetWidth;
      hCss = root.offsetHeight;
      if (wCss < 1 || hCss < 1) return;

      canvas.width = Math.round(wCss * dpr);
      canvas.height = Math.round(hCss * dpr);
      canvas.style.width = `${wCss}px`;
      canvas.style.height = `${hCss}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const { path } = buildBorderPath(wCss, hCss, BORDER_R, MARGIN);
      pathRef.current = path;
      ptsRef.current = initParticles(path);
    };

    const draw = (ts: number) => {
      const t = ts * 0.001;
      const path = pathRef.current;
      const pts = ptsRef.current;
      if (!path.length || !pts.length || wCss < 1) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, wCss, hCss);

      pts.forEach((p) => {
        const pos = (((p.offset + t * BASE_SPD * p.speedVar) % 1) + 1) % 1;
        const pathIdx = Math.floor(pos * path.length);
        const base = path[pathIdx]!;
        const { nx, ny } = normalAt(path, pathIdx);
        const px = base.x + nx * p.jitter;
        const py = base.y + ny * p.jitter;

        const pulse = 0.7 + 0.3 * Math.sin(t * 1.4 + p.offset * Math.PI * 6);
        const alpha = p.op * pulse;

        const color = p.isAmber
          ? `rgba(245,138,11,${alpha})`
          : `rgba(0,212,204,${alpha})`;

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        if (p.size > 1.55) {
          ctx.beginPath();
          ctx.arc(px, py, p.size * 2.6, 0, Math.PI * 2);
          ctx.fillStyle = p.isAmber
            ? `rgba(245,138,11,${alpha * 0.22})`
            : `rgba(0,212,204,${alpha * 0.18})`;
          ctx.fill();
        }
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    rafRef.current = requestAnimationFrame(draw);

    const ro = new ResizeObserver(() => resize());
    ro.observe(root);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [reduceMotion]);

  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      className="relative scroll-mt-24 px-5 pb-12 sm:px-8 md:pb-20 lg:px-12"
    >
      <div
        ref={rootRef}
        className="cta-root relative w-full overflow-hidden rounded-[14px] font-mono"
      >
        {/* Corner brackets only — keeps the tech frame without a full box border */}
        <span
          className="pointer-events-none absolute left-4 top-4 z-[6] size-5 border-l border-t border-sl-saffron/40"
          aria-hidden
        />
        <span
          className="pointer-events-none absolute right-4 top-4 z-[6] size-5 border-r border-t border-sl-saffron/40"
          aria-hidden
        />
        <span
          className="pointer-events-none absolute bottom-4 left-4 z-[6] size-5 border-b border-l border-sl-saffron/40"
          aria-hidden
        />
        <span
          className="pointer-events-none absolute bottom-4 right-4 z-[6] size-5 border-b border-r border-sl-saffron/40"
          aria-hidden
        />

        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 z-0 h-full w-full rounded-[14px]"
          aria-hidden
        />

        {!reduceMotion ? (
          <>
            {/* Horizontal scan lines — travel top→bottom; read as “active frame” with the canvas ring */}
            <div
              className="cta-scan pointer-events-none absolute inset-x-0 z-[2] h-px"
              aria-hidden
            />
            <div
              className="cta-scan cta-scan-delayed pointer-events-none absolute inset-x-0 z-[2] h-px"
              aria-hidden
            />
          </>
        ) : null}

        <div className="relative z-[5] flex flex-col items-center px-6 py-14 text-center sm:px-10 sm:py-16 md:px-12 md:py-[4.25rem]">
          <div className="mb-6 flex flex-wrap items-center justify-center gap-2 text-balance sm:mb-7">
            <span
              className="cta-hq-dot size-2 shrink-0 rounded-full bg-sl-saffron"
              aria-hidden
            />
            <span className="max-w-[min(100%,36rem)] text-[0.53125rem] font-medium uppercase leading-snug tracking-[0.16em] text-gray-400">
              Shivlam Development Co. — Ahmedabad, India — accepting projects
            </span>
          </div>

          <p className="mb-5 flex items-center justify-center gap-2 font-mono text-[0.5625rem] font-medium uppercase tracking-[0.22em] text-sl-saffron">
            <span className="h-px w-[22px] bg-sl-saffron" aria-hidden />
            Initiate contact
            <span className="h-px w-[22px] bg-sl-saffron" aria-hidden />
          </p>

          <h2
            id="cta-heading"
            className="mb-4 max-w-[40rem] font-sans text-[clamp(1.5rem,4vw,2.625rem)] font-extrabold leading-[1.12] tracking-[-0.035em] text-white"
          >
            Ready to <em className="not-italic text-sl-saffron">Engineer</em>
            <br />
            Something Extraordinary?
          </h2>

          <p className="mb-10 max-w-[30rem] font-mono text-[11.5px] leading-[1.8] tracking-wide text-gray-400 sm:mb-11">
            From complex architectures to immersive mobile experiences — we build systems
            that scale. Let&apos;s discuss your next project.
          </p>

          <div className="mb-7 flex flex-wrap items-center justify-center gap-3.5 sm:gap-3.5">
            <Link
              href="/#contact"
              className="cta-btn-primary relative z-0 inline-flex items-center justify-center overflow-hidden rounded border border-sl-saffron bg-sl-saffron px-7 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_0_24px_rgb(245_138_11/0.3),0_4px_20px_rgb(245_138_11/0.2)] transition-[box-shadow,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] before:pointer-events-none before:absolute before:inset-0 before:z-0 before:bg-linear-to-br before:from-white/12 before:to-transparent after:pointer-events-none after:absolute after:left-[-100%] after:top-0 after:z-0 after:h-full after:w-[60%] after:bg-linear-to-r after:from-transparent after:via-white/15 after:to-transparent after:transition-[left] after:duration-[550ms] hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgb(245_138_11/0.55),0_8px_32px_rgb(245_138_11/0.3)] hover:after:left-[150%] active:translate-y-0 active:scale-[0.98] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-sl-saffron/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <span className="relative z-10">[ Start a project → ]</span>
            </Link>
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-gray-500">
              or
            </span>
            <Link
              href="mailto:hi@shivlam.com"
              className="cta-btn-secondary relative z-0 inline-flex items-center justify-center overflow-hidden rounded border border-sl-saffron/35 bg-transparent px-7 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-sl-saffron transition-[border-color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] after:pointer-events-none after:absolute after:inset-0 after:z-0 after:bg-sl-saffron/[0.06] after:transition-transform after:duration-[400ms] after:ease-[cubic-bezier(0.16,1,0.3,1)] after:content-[''] after:[transform:translateX(-105%)] hover:-translate-y-0.5 hover:border-sl-saffron/75 hover:shadow-[0_0_20px_rgb(245_138_11/0.15)] hover:after:translate-x-0 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-sl-saffron/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <span className="relative z-10">[ Send a brief ]</span>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.1em] text-gray-400">
            <svg
              className="size-[18px] shrink-0 opacity-45"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <rect
                x="1"
                y="3.5"
                width="16"
                height="11"
                rx="2"
                stroke="rgb(0 212 204 / 0.5)"
                strokeWidth="0.9"
              />
              <path
                d="M1 5.5L9 10.5L17 5.5"
                stroke="rgb(0 212 204 / 0.5)"
                strokeWidth="0.9"
                strokeLinecap="round"
              />
            </svg>
            <span>Or drop us a line directly at</span>
            <Link
              href="mailto:hi@shivlam.com"
              className="border-b border-sl-cyan/20 pb-px text-[11px] normal-case tracking-wide text-sl-cyan/70 transition-colors hover:border-sl-cyan hover:text-sl-cyan"
            >
              hi@shivlam.com
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

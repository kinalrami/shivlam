"use client";

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export type NetworkClient = {
  project: string;
  location: string;
  quote: string;
  name: string;
  metric: string;
  svgX: number;
  svgY: number;
  accent: "saffron" | "cyan";
};

const CLIENTS: NetworkClient[] = [
  {
    project: "LogiTrack RN",
    location: "New York, USA",
    quote:
      "Shivlam engineered a scalable platform handling 2M+ daily sessions. Execution speed and architecture quality is unmatched.",
    name: "James Carter",
    metric: "+140% Throughput Gain",
    svgX: 185,
    svgY: 148,
    accent: "saffron",
  },
  {
    project: "NovaDash Enterprise",
    location: "London, UK",
    quote:
      "The Next.js dashboard cut our ops latency to sub-16ms. Clean architecture, zero downtime migrations.",
    name: "Olivia Bennett",
    metric: "99.98% Uptime SLA",
    svgX: 424,
    svgY: 80,
    accent: "cyan",
  },
  {
    project: "SpatialFrame Pro",
    location: "Dubai, UAE",
    quote:
      "AR + BIM overlay on live construction sites — flawless. Shivlam merges complex requirements with clean code.",
    name: "Ahmed Al Farsi",
    metric: "40% Reduction in Errors",
    svgX: 575,
    svgY: 158,
    accent: "saffron",
  },
  {
    project: "Vantara Brand OS",
    location: "Bangalore, India",
    quote:
      "Full-stack dev to brand reboot — record-time delivery. Best engineering team we have worked with.",
    name: "Priya Menon",
    metric: "+340% Lead Conversion",
    svgX: 640,
    svgY: 210,
    accent: "cyan",
  },
  {
    project: "GridWatch AI",
    location: "Sydney, Australia",
    quote:
      "Remarkable AI energy dashboard — real-time telemetry at scale with incredible system design and stability.",
    name: "Liam Thornton",
    metric: "60% Faster Data Ingestion",
    svgX: 820,
    svgY: 350,
    accent: "saffron",
  },
];

const HQX = 622;
const HQY = 188;
const GLYPHS =
  "ABCDEFGabcdefg0123456789!@#$";

function shuffleOrder(length: number): number[] {
  const order = Array.from({ length }, (_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

function accentStroke(accent: NetworkClient["accent"]): string {
  return accent === "saffron" ? "var(--sl-saffron)" : "var(--sl-cyan)";
}

export default function NetworkFeedbackMap() {
  const uid = useId().replace(/:/g, "");
  const blurId = `${uid}-nf-gw`;
  const blurHqId = `${uid}-nf-hqw`;
  const gradId = `${uid}-nf-bgr`;
  const markerAmberId = `${uid}-nf-ma`;
  const markerCyanId = `${uid}-nf-mc`;
  const reduceMotion = usePrefersReducedMotion();

  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const cycleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scramTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [currentIndex, setCurrentIndex] = useState(-1);
  const [cardShow, setCardShow] = useState(false);
  const [lineDash, setLineDash] = useState({ len: 0, off: 0 });
  // const [statusText, setStatusText] = useState(
  //   "SIGNAL ACTIVE — AWAITING TRANSMISSION",
  // );

  const client =
    currentIndex >= 0 ? CLIENTS[currentIndex]! : null;

  const positionCard = useCallback(() => {
    const wrap = wrapRef.current;
    const svg = svgRef.current;
    const card = cardRef.current;
    if (!wrap || !svg || !card) return;

    const c = currentIndex >= 0 ? CLIENTS[currentIndex] : null;
    if (!c) return;

    const vb = svg.viewBox.baseVal;
    const scaleX = svg.clientWidth / vb.width;
    const scaleY = svg.clientHeight / vb.height;
    const px = c.svgX * scaleX;
    const py = c.svgY * scaleY;
    const cw = 210;
    const ch = 160;
    const padX = 12;
    const padY = 12;
    const totalW = svg.clientWidth;
    const totalH = svg.clientHeight;

    let left = px + 16;
    if (left + cw > totalW - padX) left = px - cw - 16;
    left = Math.max(padX, Math.min(left, totalW - cw - padX));

    let top = py - 10;
    if (top + ch > totalH - padY) top = py - ch + 10;
    top = Math.max(padY, Math.min(top, totalH - ch - padY));

    card.style.left = `${left}px`;
    card.style.top = `${top}px`;
  }, [currentIndex]);

  const scramble = useCallback(
    (text: string) => {
      const el = quoteRef.current;
      if (!el) return;
      if (reduceMotion) {
        el.textContent = text;
        return;
      }
      if (scramTimerRef.current) clearTimeout(scramTimerRef.current);
      let i = 0;
      const run = () => {
        if (i >= text.length) {
          el.textContent = text;
          return;
        }
        let out = text.slice(0, i);
        for (let j = i; j < Math.min(i + 4, text.length); j++) {
          out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)]!;
        }
        el.textContent = out;
        i += 2;
        scramTimerRef.current = setTimeout(run, 14);
      };
      run();
    },
    [reduceMotion],
  );

  const lineLen =
    client != null
      ? Math.hypot(client.svgX - HQX, client.svgY - HQY)
      : 0;

  useLayoutEffect(() => {
    if (client == null) {
      setLineDash({ len: 0, off: 0 });
      return;
    }
    if (reduceMotion) {
      setLineDash({ len: lineLen, off: 0 });
      return;
    }
    setLineDash({ len: lineLen, off: lineLen });
    const id = requestAnimationFrame(() => {
      setLineDash({ len: lineLen, off: 0 });
    });
    return () => cancelAnimationFrame(id);
  }, [client, currentIndex, lineLen, reduceMotion]);

  useEffect(() => {
    if (client == null) {
      setCardShow(false);
      // setStatusText("SIGNAL ACTIVE — AWAITING TRANSMISSION");
      return;
    }

    if (reduceMotion) {
      setCardShow(true);
      scramble(client.quote);
      // setStatusText(
      //   `SIGNAL ACTIVE — NODE ${currentIndex + 1}/${CLIENTS.length} · ${client.location.toUpperCase()}`,
      // );
      positionCard();
      return;
    }

    setCardShow(false);
    const tPopulate = window.setTimeout(() => {
      positionCard();
    }, 200);

    const tReveal = window.setTimeout(() => {
      setCardShow(true);
      scramble(client.quote);
      // setStatusText(
      //   `SIGNAL ACTIVE — NODE ${currentIndex + 1}/${CLIENTS.length} · ${client.location.toUpperCase()}`,
      // );
    }, 200 + 960);

    return () => {
      clearTimeout(tPopulate);
      clearTimeout(tReveal);
      if (scramTimerRef.current) clearTimeout(scramTimerRef.current);
    };
  }, [
    client,
    currentIndex,
    positionCard,
    reduceMotion,
    scramble,
  ]);

  useEffect(() => {
    const onResize = () => positionCard();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [positionCard]);

  useEffect(() => {
    positionCard();
  }, [positionCard, cardShow]);

  useEffect(() => {
    let order = shuffleOrder(CLIENTS.length);
    let oi = 0;
    let alive = true;

    const step = (delay: number) => {
      if (cycleTimerRef.current) clearTimeout(cycleTimerRef.current);
      cycleTimerRef.current = setTimeout(() => {
        if (!alive) return;
        if (oi >= order.length) {
          oi = 0;
          order = shuffleOrder(CLIENTS.length);
        }
        setCurrentIndex(order[oi]!);
        oi += 1;
        step(4500);
      }, delay);
    };

    step(500);
    return () => {
      alive = false;
      if (cycleTimerRef.current) clearTimeout(cycleTimerRef.current);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (scramTimerRef.current) clearTimeout(scramTimerRef.current);
    };
  }, []);

  const markerEnd =
    client?.accent === "saffron"
      ? `url(#${markerAmberId})`
      : `url(#${markerCyanId})`;

  return (
    <div className="nf-root w-full overflow-hidden rounded-[14px] bg-[#06080f] font-mono text-[0.65rem] md:rounded-2xl">
      <div
        ref={wrapRef}
        id={`nf-wrap-${uid}`}
        className="relative w-full bg-[#06080f]"
      >
        {!reduceMotion ? (
          <>
            <div
              className="nf-scan pointer-events-none absolute inset-x-0 z-3 h-px"
              aria-hidden
            />
            <div
              className="nf-scan pointer-events-none absolute inset-x-0 z-3 h-px opacity-50"
              style={{ animationDelay: "-3s" }}
              aria-hidden
            />
          </>
        ) : null}

        <svg
          ref={svgRef}
          id={`nf-svg-${uid}`}
          className="block h-auto w-full"
          viewBox="0 0 960 480"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <defs>
            <filter id={blurId}>
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id={blurHqId}>
              <feGaussianBlur stdDeviation="6" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id={gradId} cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#0e1528" />
              <stop offset="100%" stopColor="#06080f" />
            </radialGradient>
            <marker
              id={markerAmberId}
              viewBox="0 0 10 10"
              refX={9}
              refY={5}
              markerWidth={5}
              markerHeight={5}
              orient="auto"
            >
              <path
                d="M1 2L8 5L1 8"
                fill="none"
                stroke="var(--sl-saffron)"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </marker>
            <marker
              id={markerCyanId}
              viewBox="0 0 10 10"
              refX={9}
              refY={5}
              markerWidth={5}
              markerHeight={5}
              orient="auto"
            >
              <path
                d="M1 2L8 5L1 8"
                fill="none"
                stroke="var(--sl-cyan)"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </marker>
          </defs>

          <rect width={960} height={480} fill={`url(#${gradId})`} />

          <g
            stroke="rgb(0 212 204 / 0.055)"
            strokeWidth={0.6}
            fill="none"
          >
            <line x1={0} y1={96} x2={960} y2={96} />
            <line x1={0} y1={192} x2={960} y2={192} />
            <line x1={0} y1={288} x2={960} y2={288} />
            <line x1={0} y1={384} x2={960} y2={384} />
            <line x1={96} y1={0} x2={96} y2={480} />
            <line x1={192} y1={0} x2={192} y2={480} />
            <line x1={288} y1={0} x2={288} y2={480} />
            <line x1={384} y1={0} x2={384} y2={480} />
            <line x1={480} y1={0} x2={480} y2={480} />
            <line x1={576} y1={0} x2={576} y2={480} />
            <line x1={672} y1={0} x2={672} y2={480} />
            <line x1={768} y1={0} x2={768} y2={480} />
            <line x1={864} y1={0} x2={864} y2={480} />
          </g>

          <WorldLandmasses />

          {client != null ? (
            <line
              key={`sig-${currentIndex}`}
              x1={HQX}
              y1={HQY}
              x2={client.svgX}
              y2={client.svgY}
              stroke={accentStroke(client.accent)}
              strokeWidth={1.2}
              strokeDasharray={lineDash.len || lineLen}
              strokeDashoffset={lineDash.off}
              strokeLinecap="round"
              opacity={0.85}
              markerEnd={markerEnd}
              style={{
                transition: reduceMotion
                  ? "none"
                  : "stroke-dashoffset 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
          ) : null}

          {CLIENTS.map((c, i) => (
            <g key={c.project} filter={`url(#${blurId})`}>
              <g transform={`translate(${c.svgX} ${c.svgY})`}>
                <g
                  className={
                    reduceMotion ? "" : "nf-node-pulse-wrap"
                  }
                  style={
                    reduceMotion
                      ? undefined
                      : { animationDelay: `${i * 0.5}s` }
                  }
                >
                  <circle
                    r={8}
                    fill="none"
                    stroke={accentStroke(c.accent)}
                    strokeWidth={1}
                    opacity={0.85}
                  />
                </g>
              </g>
              <circle
                cx={c.svgX}
                cy={c.svgY}
                r={3.5}
                fill={accentStroke(c.accent)}
                opacity={0.9}
              />
            </g>
          ))}

          <g filter={`url(#${blurHqId})`}>
            <g transform={`translate(${HQX} ${HQY})`}>
              <g className={reduceMotion ? "" : "nf-hq-pulse-wrap"}>
                <circle
                  r={13}
                  fill="none"
                  stroke="var(--sl-saffron)"
                  strokeWidth={1.5}
                  opacity={0.6}
                />
              </g>
            </g>
            <circle
              cx={HQX}
              cy={HQY}
              r={5.5}
              fill="var(--sl-saffron)"
            />
          </g>
          <text
            fontFamily="var(--font-space-mono), ui-monospace, monospace"
            fontSize={8.5}
            fill="var(--sl-saffron)"
            opacity={0.9}
            x={633}
            y={177}
            letterSpacing="0.09em"
          >
            HQ ▸ AHMEDABAD
          </text>
        </svg>

        <div
          ref={cardRef}
          className={[
            "absolute z-40 w-52.5 rounded-[9px] border border-sl-cyan/30 bg-[rgb(7_10_20/0.96)] p-3 pb-3.5 shadow-[0_0_24px_rgb(0_212_204/0.08),0_8px_32px_rgb(0_0_0/0.7)] backdrop-blur-xl transition-[opacity,transform] duration-450 ease-[cubic-bezier(0.16,1,0.3,1)]",
            cardShow && client != null
              ? "translate-y-0 scale-100 opacity-100"
              : "pointer-events-none translate-y-1.5 scale-90 opacity-0",
          ].join(" ")}
          style={{ pointerEvents: "none" }}
        >
          {client != null ? (
            <>
              <p className="mb-px font-mono text-[0.6875rem] font-medium tracking-wide text-emerald-400/95">
                {client.project}
              </p>
              <p className="mb-2 font-mono text-[0.53125rem] tracking-wide text-emerald-400/60">
                ▶ {client.location}
              </p>
              <p
                ref={quoteRef}
                className="mb-2 border-l-2 border-sl-saffron pl-2 font-mono text-[0.5625rem] leading-[1.7] text-[rgb(175_195_210/0.8)]"
              >
                {client.quote}
              </p>
              <p className="font-sans text-[0.6875rem] font-bold text-sl-saffron">
                {client.name}
              </p>
              <p className="mt-1.5 flex items-center gap-1 font-mono text-[0.53125rem] text-sl-saffron">
                <span className="text-[0.4375rem]" aria-hidden>
                  ▲
                </span>
                {client.metric}
              </p>
            </>
          ) : null}
        </div>
      </div>

      <div
        className="flex items-center justify-center gap-1.75 py-2.5 pb-5 sm:pb-6"
        aria-hidden
      >
        {CLIENTS.map((_, i) => (
          <span
            key={i}
            className={[
              "h-1.25 w-1.25 rounded-full transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
              currentIndex >= 0 && i === currentIndex
                ? "scale-[1.4] bg-sl-saffron shadow-[0_0_8px_var(--sl-saffron)]"
                : "bg-[#1a2030]",
            ].join(" ")}
          />
        ))}
      </div>

      {/* Footer: live signal status (cyan dot + "SIGNAL ACTIVE — NODE n/5 · …")
      <div className="flex items-center gap-2.5 px-6 pb-5 pt-1 sm:px-8">
        <span
          className={
            reduceMotion
              ? "h-[5px] w-[5px] shrink-0 rounded-full bg-sl-cyan"
              : "nf-status-dot h-[5px] w-[5px] shrink-0 rounded-full bg-sl-cyan shadow-[0_0_6px_var(--sl-cyan)]"
          }
          aria-hidden
        />
        <span className="font-mono text-[0.53125rem] tracking-[0.12em] text-gray-400">
          {statusText}
        </span>
      </div>
      */}
    </div>
  );
}

/** Stylized land paths (960×480) — same topology as client reference */
function WorldLandmasses() {
  return (
    <g
      fill="rgb(0 212 204 / 0.11)"
      stroke="rgb(0 212 204 / 0.36)"
      strokeWidth={0.85}
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <path d="M75,62 L90,55 L108,52 L130,54 L155,58 L178,64 L200,72 L218,82 L232,96 L242,112 L248,130 L246,150 L238,166 L226,178 L210,188 L194,196 L178,204 L164,214 L152,228 L140,242 L126,252 L112,254 L100,246 L90,234 L80,218 L72,200 L66,180 L62,158 L62,134 L66,110 L72,86 Z" />
      <path d="M178,204 L186,210 L192,220 L188,232 L178,238 L170,230 L168,216 Z" />
      <path d="M100,246 L116,252 L130,262 L138,278 L134,292 L122,298 L110,292 L100,276 L96,260 Z" />
      <path d="M134,292 L148,296 L160,304 L162,316 L154,322 L142,318 L132,308 Z" />
      <path d="M240,18 L268,12 L290,16 L298,28 L294,44 L276,52 L254,50 L238,40 L234,26 Z" />
      <path d="M62,62 L74,55 L86,58 L90,70 L80,78 L66,76 Z" />
      <path d="M196,232 L212,228 L220,234 L216,242 L202,244 L192,238 Z" />
      <path d="M210,308 L234,296 L258,298 L278,310 L294,328 L304,352 L308,378 L304,406 L292,428 L274,448 L254,458 L234,456 L216,442 L202,420 L194,394 L192,364 L196,336 L204,316 Z" />
      <path d="M428,60 L452,54 L476,56 L498,64 L510,76 L510,90 L500,102 L484,110 L464,114 L444,112 L428,104 L420,90 L420,74 Z" />
      <path d="M420,90 L438,86 L454,92 L458,108 L448,120 L432,124 L418,116 L412,100 Z" />
      <path d="M456,22 L474,14 L494,18 L502,32 L498,48 L482,56 L462,54 L448,44 L446,28 Z" />
      <path d="M400,54 L416,48 L424,60 L420,74 L406,78 L394,68 L396,56 Z" />
      <path d="M384,58 L396,54 L400,64 L394,72 L382,68 Z" />
      <path d="M464,114 L476,110 L484,120 L486,136 L480,148 L470,154 L460,146 L456,130 L458,116 Z" />
      <path d="M498,112 L510,108 L518,118 L514,130 L502,134 L492,126 Z" />
      <path d="M430,128 L464,120 L498,124 L522,136 L536,154 L542,176 L542,202 L536,228 L526,256 L512,282 L494,306 L474,324 L452,334 L430,334 L410,320 L396,298 L386,270 L382,240 L382,210 L386,180 L396,156 L410,138 Z" />
      <path d="M556,290 L564,278 L572,284 L576,300 L570,318 L560,322 L552,312 L550,298 Z" />
      <path d="M522,136 L556,128 L580,134 L590,150 L588,170 L576,184 L556,190 L534,184 L520,168 L516,150 Z" />
      <path d="M500,102 L534,96 L556,100 L564,112 L554,124 L526,128 L504,122 L494,110 Z" />
      <path d="M518,22 L596,14 L680,14 L760,18 L828,26 L874,36 L890,50 L876,66 L848,76 L812,82 L772,84 L732,86 L692,86 L654,82 L616,78 L580,74 L548,68 L522,56 Z" />
      <path d="M862,78 L874,74 L882,84 L878,98 L866,102 L856,92 Z" />
      <path d="M556,128 L594,120 L628,122 L650,132 L652,150 L638,164 L614,172 L590,170 L568,160 L554,144 Z" />
      <path d="M614,152 L648,144 L672,152 L682,168 L682,188 L672,208 L656,228 L638,244 L618,252 L600,248 L584,232 L576,212 L576,190 L582,170 Z" />
      <path d="M628,252 L636,248 L642,256 L638,266 L628,266 L622,258 Z" />
      <path d="M652,82 L718,78 L772,82 L808,96 L818,116 L810,136 L788,152 L758,162 L726,166 L696,160 L668,148 L650,130 Z" />
      <path d="M794,116 L808,112 L816,122 L812,136 L798,140 L788,130 Z" />
      <path d="M830,100 L848,94 L858,104 L854,118 L840,124 L828,114 Z" />
      <path d="M822,126 L832,122 L838,130 L832,140 L820,138 Z" />
      <path d="M800,158 L808,154 L814,162 L810,172 L800,170 Z" />
      <path d="M698,156 L730,148 L756,154 L768,168 L764,184 L748,194 L724,196 L702,186 L692,170 Z" />
      <path d="M694,204 L724,194 L748,200 L756,216 L748,230 L722,236 L698,228 L686,214 Z" />
      <path d="M754,198 L782,192 L804,198 L812,214 L806,232 L784,240 L760,234 L746,218 Z" />
      <path d="M728,248 L762,242 L788,248 L796,260 L784,270 L752,272 L726,262 Z" />
      <path d="M798,152 L812,148 L820,158 L816,172 L804,174 L796,164 Z" />
      <path d="M738,296 L792,282 L842,282 L878,296 L896,318 L898,346 L886,374 L864,396 L836,410 L804,414 L770,408 L740,390 L718,364 L708,332 L714,304 Z" />
      <path d="M800,420 L816,416 L824,428 L818,440 L802,440 L794,430 Z" />
      <path d="M900,386 L912,380 L920,392 L914,406 L900,406 L894,396 Z" />
      <path d="M896,408 L910,404 L918,418 L912,434 L896,436 L888,422 Z" />
    </g>
  );
}

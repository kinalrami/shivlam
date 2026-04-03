"use client";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  FilterRailSeparator,
  SectionIntro,
} from "@/components/shared/section-chrome";
import { portfolioThumbSrc } from "@/lib/illustration-src";
import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const PORTFOLIO_FILTER_OPTS = [
  { key: "all" as const, label: "[ ALL MODULES ]" },
  { key: "mobile" as const, label: "MOBILE ECOSYSTEMS" },
  { key: "web" as const, label: "WEB PLATFORMS" },
] as const;

type PortfolioCategory = "mobile" | "web";

type PortfolioProject = {
  id: string;
  num: string;
  title: string;
  cat: PortfolioCategory;
  catLabel: string;
  stack: string[];
  desc: string;
  status: string;
  latency: string;
  cta: string;
  metric: string;
  accent: "saffron" | "cyan";
  svgPattern: "arc" | "grid" | "wave" | "dots";
  link?: string;
};

const PROJECTS: PortfolioProject[] = [
  {
    id: "SHV-091",
    num: "PROJECT 01",
    title: "SpatialFrame Pro",
    cat: "mobile",
    catLabel: "MOBILE APP",
    stack: ["Swift", "Unity AR", "Firebase"],
    desc: "A high-performance spatial tool for on-site construction visualization — overlaying BIM data directly onto physical environments.",
    status: "LIVE_PRODUCTION",
    latency: "11ms",
    cta: "VIEW ON APP STORE →",
    metric: "4.9★ App Store Rating",
    accent: "saffron",
    svgPattern: "arc",
  },
  {
    id: "SHV-092",
    num: "PROJECT 02",
    title: "LogiTrack RN",
    cat: "mobile",
    catLabel: "MOBILE APP",
    stack: ["React Native", "Node.js", "AWS"],
    desc: "Real-time logistics tracking with a focus on clean UX and data integrity. Handles 2M+ daily active sessions across 14 regions.",
    status: "LIVE_PRODUCTION",
    latency: "14ms",
    cta: "VIEW ON PLAY STORE →",
    metric: "2M+ Daily Sessions",
    accent: "cyan",
    svgPattern: "grid",
  },
  {
    id: "SHV-093",
    num: "PROJECT 03",
    title: "NovaDash Enterprise",
    cat: "web",
    catLabel: "WEB PLATFORM",
    stack: ["Next.js", "Tailwind CSS", "GSAP"],
    desc: "An enterprise-grade dashboard for monitoring AI-driven energy systems. Sub-16ms render time with real-time telemetry streaming.",
    status: "LIVE_PRODUCTION",
    latency: "9ms",
    cta: "VIEW LIVE SITE →",
    link: "https://example-live-link.com",
    metric: "99.98% Uptime SLA",
    accent: "saffron",
    svgPattern: "wave",
  },
  {
    id: "SHV-094",
    num: "PROJECT 04",
    title: "Vantara Brand OS",
    cat: "web",
    catLabel: "WEB PLATFORM",
    stack: ["TypeScript", "Sanity CMS", "Framer Motion"],
    desc: "A high-conversion brand experience for a global technology consultancy. Increased qualified lead flow by 340% in Q1.",
    status: "LIVE_PRODUCTION",
    latency: "12ms",
    cta: "VIEW LIVE SITE →",
    link: "https://example-brand-site.com",
    metric: "+340% Lead Conversion",
    accent: "cyan",
    svgPattern: "dots",
  },
];

function PortfolioThumb({
  project,
  className,
}: {
  project: PortfolioProject;
  className?: string;
}) {
  return (
    <img
      src={portfolioThumbSrc(project.svgPattern, project.accent)}
      alt=""
      className={className ?? "absolute inset-0 size-full object-cover"}
    />
  );
}

export default function WorkPortfolio() {
  const [filter, setFilter] = useState<"all" | PortfolioCategory>("all");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const scanLineEls = useRef<Record<number, HTMLDivElement | null>>({});
  const scanBusy = useRef<Record<number, boolean>>({});
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const reduceMotion = usePrefersReducedMotion();

  const visibleCount = useMemo(() => {
    return PROJECTS.filter((p) => filter === "all" || p.cat === filter).length;
  }, [filter]);

  const runScan = useCallback((i: number) => {
    if (reduceMotion) return;
    if (scanBusy.current[i]) return;
    scanBusy.current[i] = true;
    const line = scanLineEls.current[i];
    if (!line) {
      delete scanBusy.current[i];
      return;
    }
    line.style.transition = "none";
    line.style.top = "-2px";
    line.style.opacity = "1";
    line.style.transition = "top 0.55s cubic-bezier(0.4, 0, 0.2, 1)";
    requestAnimationFrame(() => {
      line.style.top = "170px";
    });
    window.setTimeout(() => {
      line.style.opacity = "0";
      line.style.top = "-2px";
      delete scanBusy.current[i];
    }, 580);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) {
      const all: Record<number, boolean> = {};
      PROJECTS.forEach((_, i) => {
        all[i] = true;
      });
      setRevealed(all);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLDivElement;
          const idx = Number(el.dataset.idx);
          if (Number.isNaN(idx)) return;
          window.setTimeout(() => {
            setRevealed((r) => ({ ...r, [idx]: true }));
          }, idx * 140);
          obs.unobserve(e.target);
        });
      },
      { threshold: 0.1 },
    );

    cardRefs.current.forEach((el) => {
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, [reduceMotion]);

  useEffect(() => {
    if (expandedIndex === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpandedIndex(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [expandedIndex]);

  const expanded = expandedIndex !== null ? PROJECTS[expandedIndex] : null;

  return (
    <section
      id="work-portfolio"
      aria-labelledby="work-portfolio-heading"
      className="relative scroll-mt-24 px-5 sm:px-8 lg:px-12 pb-12 md:pb-20"
    >
      <SectionIntro
        id="work-portfolio-heading"
        eyebrow="Work portfolio"
        lead="Engineered solutions from concept to deployment — a curated look at shipped builds across mobile and web."
      />

      <div className="mb-8 flex flex-wrap items-center gap-2.5 font-mono">
        {PORTFOLIO_FILTER_OPTS.map(({ key, label }, idx) => (
          <Fragment key={key}>
            {idx === 1 ? <FilterRailSeparator /> : null}
            <button
              type="button"
              onClick={() => setFilter(key)}
              className={
                filter === key
                  ? "relative cursor-pointer overflow-hidden rounded px-[18px] py-[7px] font-mono text-[10px] uppercase tracking-[0.14em] transition-[color,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] border border-[#1a1e2e] bg-transparent text-[#2a3555] border-sl-saffron text-sl-saffron shadow-[0_0_16px_rgba(245,138,11,0.18),inset_0_0_0_1px_rgba(245,138,11,0.12)] before:pointer-events-none before:absolute before:inset-0 before:bg-linear-to-br before:from-[rgba(245,138,11,0.08)] before:to-transparent before:opacity-100 before:content-['']"
                  : "relative cursor-pointer overflow-hidden rounded px-[18px] py-[7px] font-mono text-[10px] uppercase tracking-[0.14em] transition-[color,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] border border-[#1a1e2e] bg-transparent text-[#2a3555] hover:border-[#2a3555] hover:text-[#3a4a6a] before:pointer-events-none before:absolute before:inset-0 before:bg-linear-to-br before:from-[rgba(245,138,11,0.08)] before:to-transparent before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100"
              }
            >
              {label}
            </button>
          </Fragment>
        ))}
        <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.12em] text-gray-500">
          {visibleCount} BUILD{visibleCount !== 1 ? "S" : ""} LOADED
        </span>
      </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {PROJECTS.map((p, i) => {
            const match = filter === "all" || p.cat === filter;
            return (
              <Fragment key={p.id}>
                {/*
                Legacy portfolio card — high-tech panel + generative thumb + scan line.
                <article
                  key={p.id}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  data-idx={i}
                  role="button"
                  tabIndex={0}
                  onMouseEnter={() => runScan(i)}
                  onClick={() => setExpandedIndex(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setExpandedIndex(i);
                    }
                  }}
                  className={[
                    "group relative cursor-pointer overflow-hidden rounded-[10px] border border-white/[0.05] bg-[rgba(12,15,26,0.85)] backdrop-blur-xl transition-[transform,box-shadow,border-color,opacity] duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                    revealed[i]
                      ? "translate-y-0 opacity-100"
                      : "translate-y-7 opacity-0",
                    match ? "" : "hidden",
                    "hover:-translate-y-1 hover:scale-[1.012] hover:border-sl-saffron/25 hover:shadow-[0_0_40px_rgba(245,138,11,0.1),0_16px_48px_rgba(0,0,0,0.6),inset_0_0_0_1px_rgba(245,138,11,0.08)]",
                  ].join(" ")}
                >
                  <div className="relative h-[168px] overflow-hidden bg-[#0a0d18]">
                    <PortfolioThumb project={p} />
                    <div
                      ref={(el) => {
                        scanLineEls.current[i] = el;
                      }}
                      className="pointer-events-none absolute left-0 right-0 top-[-2px] z-[5] h-0.5 bg-linear-to-r from-transparent via-sl-saffron to-sl-cyan opacity-0 shadow-[0_0_12px_var(--sl-saffron),0_0_24px_rgba(245,138,11,0.3)]"
                      aria-hidden
                    />
                    <div className="pointer-events-none absolute left-3 top-2.5 z-[4] rounded border-l border-sl-cyan/30 bg-[rgba(6,8,16,0.6)] px-2 py-1.5 font-mono text-[8px] leading-[1.7] tracking-[0.06em] text-sl-cyan/55">
                      PROJECT_ID: {p.id}
                      <br />
                      STATUS: {p.status}
                      <br />
                      LATENCY: {p.latency}
                    </div>
                    <div className="pointer-events-none absolute right-3 top-2.5 z-[4] rounded border border-sl-saffron/30 bg-sl-saffron/[0.06] px-[7px] py-0.5 font-mono text-[8px] uppercase tracking-[0.14em] text-sl-saffron">
                      {p.catLabel}
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-[18px]">
                    <span className="mb-2 block font-mono text-[8px] uppercase tracking-[0.2em] text-[#1a2535]">
                      {p.num}
                    </span>
                    <h3 className="mb-1.5 font-sans text-base font-bold tracking-[-0.015em] text-[#c8d4e8] transition-colors duration-300 group-hover:text-white">
                      {p.title}
                    </h3>
                    <div className="mb-3.5 flex flex-wrap gap-1.5">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded border border-[#0f1525] px-[7px] py-0.5 font-mono text-[8.5px] uppercase tracking-[0.1em] text-[#1a2535] transition-all duration-300 group-hover:border-sl-cyan/20 group-hover:text-sl-cyan/40"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <p className="mb-3.5 font-mono text-[10.5px] leading-[1.75] text-[#2a3a50] transition-colors duration-300 group-hover:text-[#3a5060]">
                      {p.desc}
                    </p>
                    <div className="flex items-center justify-between border-t border-white/[0.04] pt-3">
                      <span className="portfolio-cta-shine relative inline-block cursor-pointer overflow-hidden rounded border border-sl-saffron/25 bg-sl-saffron/5 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-sl-saffron transition-[color,box-shadow,border-color] duration-300 hover:bg-sl-saffron/10 hover:text-white hover:shadow-[0_0_16px_rgba(245,138,11,0.2)] hover:border-sl-saffron/60">
                        {p.cta}
                      </span>
                      <div className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-[#0f1a20]">
                        <span
                          className="size-[5px] rounded-full bg-sl-cyan shadow-[0_0_6px_var(--sl-cyan)] animate-sl-pip"
                          aria-hidden
                        />
                        {p.metric}
                      </div>
                    </div>
                  </div>
                </article>
                */}

                <article
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  data-idx={i}
                  role="button"
                  tabIndex={0}
                  onMouseEnter={() => runScan(i)}
                  onClick={() => setExpandedIndex(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setExpandedIndex(i);
                    }
                  }}
                  className={[
                    "group relative h-full cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/3 px-6 py-7 backdrop-blur-2xl transition-[transform,box-shadow,border-color,opacity] duration-200 will-change-transform hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_18px_70px_rgba(0,0,0,0.55)] group-hover:border-white/20",
                    revealed[i]
                      ? "translate-y-0 opacity-100"
                      : "translate-y-7 opacity-0",
                    match ? "" : "hidden",
                  ].join(" ")}
                >
                  <div
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    style={{
                      boxShadow:
                        "0 0 0 2px color-mix(in srgb, var(--sl-saffron) 95%, transparent), 0 0 38px color-mix(in srgb, var(--sl-saffron) 45%, transparent), 0 0 130px color-mix(in srgb, var(--sl-saffron) 22%, transparent)",
                    }}
                    aria-hidden
                  />
                  <div
                    className="pointer-events-none absolute inset-0 opacity-60 mask-[radial-gradient(70%_50%_at_50%_0%,black,transparent)]"
                    aria-hidden
                  >
                    <div className="absolute -left-16 top-0 h-48 w-48 rounded-full bg-sl-cyan/[0.07] blur-2xl" />
                  </div>

                  <div className="relative z-[1] -mx-6 -mt-7 mb-5 h-[168px] overflow-hidden bg-[#0a0d18]">
                    <PortfolioThumb project={p} />
                    <div
                      ref={(el) => {
                        scanLineEls.current[i] = el;
                      }}
                      className="pointer-events-none absolute left-0 right-0 top-[-2px] z-[5] h-0.5 bg-linear-to-r from-transparent via-sl-saffron to-sl-cyan opacity-0 shadow-[0_0_12px_var(--sl-saffron),0_0_24px_rgba(245,138,11,0.3)]"
                      aria-hidden
                    />
                    <div className="pointer-events-none absolute left-3 top-2.5 z-[4] rounded border-l border-sl-cyan/30 bg-[rgba(6,8,16,0.6)] px-2 py-1.5 font-mono text-[8px] leading-[1.7] tracking-[0.06em] text-sl-cyan/55">
                      PROJECT_ID: {p.id}
                      <br />
                      STATUS: {p.status}
                      <br />
                      LATENCY: {p.latency}
                    </div>
                    <div className="pointer-events-none absolute right-3 top-2.5 z-[4] rounded border border-sl-saffron/30 bg-sl-saffron/[0.06] px-[7px] py-0.5 font-mono text-[8px] uppercase tracking-[0.14em] text-sl-saffron">
                      {p.catLabel}
                    </div>
                  </div>

                  <div className="relative z-[1]">
                    <span className="mb-2 block font-mono text-[8px] uppercase tracking-[0.2em] text-[#1a2535]">
                      {p.num}
                    </span>
                    <h3 className="mb-1.5 font-sans text-base font-bold tracking-[-0.015em] text-[#c8d4e8] transition-colors duration-300 group-hover:text-white">
                      {p.title}
                    </h3>
                    <div className="mb-3.5 flex flex-wrap gap-1.5">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded border border-[#0f1525] px-[7px] py-0.5 font-mono text-[8.5px] uppercase tracking-[0.1em] text-[#1a2535] transition-all duration-300 group-hover:border-sl-cyan/20 group-hover:text-sl-cyan/40"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <p className="mb-3.5 font-mono text-[10.5px] leading-[1.75] text-[#2a3a50] transition-colors duration-300 group-hover:text-[#3a5060]">
                      {p.desc}
                    </p>
                    <div className="flex items-center justify-between border-t border-white/[0.04] pt-3">
                      <span className="portfolio-cta-shine relative inline-block cursor-pointer overflow-hidden rounded border border-sl-saffron/25 bg-sl-saffron/5 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-sl-saffron transition-[color,box-shadow,border-color] duration-300 hover:bg-sl-saffron/10 hover:text-white hover:shadow-[0_0_16px_rgba(245,138,11,0.2)] hover:border-sl-saffron/60">
                        {p.cta}
                      </span>
                      <div className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-[#0f1a20]">
                        <span
                          className="size-[5px] rounded-full bg-sl-cyan shadow-[0_0_6px_var(--sl-cyan)] animate-sl-pip"
                          aria-hidden
                        />
                        {p.metric}
                      </div>
                    </div>
                  </div>

                  <div
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    style={{
                      boxShadow:
                        "0 0 0 2px color-mix(in srgb, var(--sl-saffron) 85%, transparent), 0 0 48px color-mix(in srgb, var(--sl-saffron) 18%, transparent)",
                    }}
                    aria-hidden
                  />
                </article>
              </Fragment>
            );
          })}
        </div>

      <div
        role="presentation"
        className={`fixed inset-0 z-[1000] flex items-center justify-center bg-[rgba(4,6,12,0.95)] backdrop-blur-md transition-opacity duration-[400ms] ${
          expanded ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setExpandedIndex(null);
        }}
        aria-hidden={!expanded}
      >
        <div
          role={expanded ? "dialog" : undefined}
          aria-modal={expanded ? "true" : undefined}
          aria-labelledby={expanded ? "portfolio-exp-title" : undefined}
          className={`relative max-h-[85vh] w-[min(680px,90vw)] scale-90 overflow-y-auto rounded-[14px] border border-sl-saffron/20 bg-[#0a0d18] p-9 transition-transform duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] [scrollbar-color:#1a1e2e_transparent] [scrollbar-width:thin] ${
            expanded ? "scale-100" : ""
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {expanded ? (
            <>
              <button
                type="button"
                onClick={() => setExpandedIndex(null)}
                className="absolute right-5 top-[18px] cursor-pointer border-none bg-transparent font-mono text-[11px] uppercase tracking-[0.1em] text-[#2a3555] transition-colors hover:text-sl-cyan"
              >
                [ CLOSE ✕ ]
              </button>
              <p className="mb-3 font-mono text-[8px] uppercase tracking-[0.22em] text-sl-cyan">
                [ {expanded.num} — {expanded.catLabel} ]
              </p>
              <h3
                id="portfolio-exp-title"
                className="mb-4 font-sans text-[26px] font-extrabold tracking-[-0.025em] text-white"
              >
                {expanded.title}
              </h3>
              <div className="relative mb-5 h-[200px] w-full overflow-hidden rounded-lg">
                <PortfolioThumb project={expanded} className="size-full object-cover" />
              </div>
              <p className="mb-5 font-mono text-[11px] leading-[1.85] text-[#3a5060]">
                {expanded.desc}
              </p>
              <div className="mb-5 grid grid-cols-2 gap-3">
                {(
                  [
                    ["PROJECT ID", expanded.id],
                    ["STATUS", expanded.status],
                    ["LATENCY", expanded.latency],
                    ["METRIC", expanded.metric],
                  ] as const
                ).map(([label, val]) => (
                  <div
                    key={label}
                    className="rounded-md border border-[#0f1525] bg-white/[0.02] px-3.5 py-3"
                  >
                    <div className="mb-1 font-mono text-[8px] uppercase tracking-[0.14em] text-[#1a2535]">
                      {label}
                    </div>
                    <div className="font-mono text-[11px] tracking-[0.06em] text-sl-saffron">
                      {val}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mb-5 flex flex-wrap gap-1.5">
                {expanded.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded border border-sl-saffron/20 px-[7px] py-0.5 font-mono text-[8.5px] uppercase tracking-[0.1em] text-sl-saffron/50"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <a
                href={expanded.link ?? "#"}
                target="_blank"
                rel="noreferrer"
                className="inline-block cursor-pointer rounded border border-sl-saffron/40 bg-sl-saffron/6 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-sl-saffron no-underline transition-[background,box-shadow] duration-300 hover:bg-sl-saffron/15 hover:shadow-[0_0_20px_rgba(245,138,11,0.2)]"
              >
                {expanded.cta}
              </a>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}

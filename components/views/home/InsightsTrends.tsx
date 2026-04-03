"use client";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { insightThumbSrc } from "@/lib/illustration-src";
import {
  FilterRailSeparator,
  SectionIntro,
} from "@/components/shared/section-chrome";
import {
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

const INS_FILTER_OPTS = [
  { key: "all" as const, label: "[ ALL ]" },
  { key: "strategy" as const, label: "STRATEGY" },
  { key: "immersive" as const, label: "IMMERSIVE" },
  { key: "identity" as const, label: "IDENTITY" },
];

type CodeLineType = "kw" | "fn" | "cm" | "plain";

type CodeLine = { type: CodeLineType; text: string };

type CatKey = "strategy" | "immersive" | "identity";

type InsightPost = {
  id: string;
  cat: string;
  catKey: CatKey;
  title: string;
  date: string;
  dateLabel: string;
  read: string;
  excerpt: string;
  code: { lines: CodeLine[] };
  color: string;
  svgType: "circuit" | "blueprint" | "pulse";
};

const POSTS: InsightPost[] = [
  {
    id: "POST-001",
    cat: "STRATEGY",
    catKey: "strategy",
    title: "Scaling Complex Web Ecosystems with Next.js 16.",
    date: "2026-04-02",
    dateLabel: "02 APR 2026",
    read: "6 min read",
    excerpt:
      "Modern web ecosystems demand more than a framework — they demand an architecture. Next.js 16 changes the rules on server components, streaming, and edge-first delivery.",
    code: {
      lines: [
        { type: "kw", text: "export async" },
        { type: "plain", text: " function " },
        { type: "fn", text: "getStaticProps" },
        { type: "plain", text: "() {" },
        { type: "cm", text: "  // SSG — runs at build time" },
        { type: "kw", text: "  const" },
        { type: "plain", text: " data = await fetchEdge()" },
      ],
    },
    color: "#f58a0b",
    svgType: "circuit",
  },
  {
    id: "POST-002",
    cat: "IMMERSIVE",
    catKey: "immersive",
    title: "The Future of On-site Construction: AR & BIM Integration.",
    date: "2026-03-28",
    dateLabel: "28 MAR 2026",
    read: "8 min read",
    excerpt:
      "Overlaying 4D BIM data onto a live construction site via LiDAR and ARKit is no longer a research paper — it is production software. Here is how we built it.",
    code: {
      lines: [
        { type: "fn", text: "ARSession" },
        { type: "plain", text: ".run(config: " },
        { type: "kw", text: "BIMConfig" },
        { type: "plain", text: "())" },
        { type: "cm", text: "  // LiDAR mesh + BIM overlay" },
        { type: "fn", text: "renderBlueprintLayer" },
        { type: "plain", text: "(mesh)" },
      ],
    },
    color: "#1dcfcf",
    svgType: "blueprint",
  },
  {
    id: "POST-003",
    cat: "IDENTITY",
    catKey: "identity",
    title: "Why Brand Building is the Hardest Code to Crack in 2026.",
    date: "2026-03-15",
    dateLabel: "15 MAR 2026",
    read: "5 min read",
    excerpt:
      "A brand is a distributed system. It has states, transitions, and failure modes just like any codebase. Most agencies debug symptoms; we debug the architecture.",
    code: {
      lines: [
        { type: "kw", text: "interface" },
        { type: "plain", text: " " },
        { type: "fn", text: "BrandSystem" },
        { type: "plain", text: " {" },
        { type: "plain", text: "  identity: " },
        { type: "kw", text: "DesignToken" },
        { type: "plain", text: "[]" },
        { type: "plain", text: "  voice: " },
        { type: "fn", text: "ToneMap" },
      ],
    },
    color: "#f58a0b",
    svgType: "pulse",
  },
];

function codeLinesToHtml(lines: CodeLine[]): string {
  return (
    lines
      .map((l) => {
        if (l.type === "kw")
          return `<span class="ins-code-kw">${l.text}</span>`;
        if (l.type === "fn")
          return `<span class="ins-code-fn">${l.text}</span>`;
        if (l.type === "cm")
          return `<br><span class="ins-code-cm">${l.text}</span>`;
        return l.text;
      })
      .join("") + "<br>"
  );
}

type FilterCat = "all" | CatKey;

/** Reference “today” for NEW badges — matches editorial dates (avoids SSR/client clock skew). */
const INSIGHTS_NOW = new Date("2026-04-03T12:00:00");

export default function InsightsTrends() {
  const [filter, setFilter] = useState<FilterCat>("all");
  const reduceMotion = usePrefersReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);

  const sorted = useMemo(
    () =>
      [...POSTS].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    [],
  );

  const filtered = useMemo(() => {
    if (filter === "all") return sorted;
    return sorted.filter((p) => p.catKey === filter);
  }, [sorted, filter]);

  useEffect(() => {
    const root = gridRef.current;
    if (!root) return;

    const cards = root.querySelectorAll<HTMLElement>(".ins-card");
    cards.forEach((el) => el.classList.remove("ins-card-revealed"));

    if (reduceMotion) {
      cards.forEach((el) => el.classList.add("ins-card-revealed"));
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          const idx = Number.parseInt(el.dataset.idx ?? "0", 10);
          window.setTimeout(() => {
            el.classList.add("ins-card-revealed");
          }, idx * 180);
          obs.unobserve(el);
        });
      },
      { threshold: 0.08 },
    );

    cards.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, [filtered, reduceMotion]);

  const countLabel = `${filtered.length} JOURNAL${filtered.length !== 1 ? "S" : ""} LOADED`;

  const onCardKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
    }
  };

  return (
    <section
      id="insights-trends"
      aria-labelledby="insights-heading"
      className="relative scroll-mt-24 px-5 sm:px-8 lg:px-12 pb-12 md:pb-20"
    >
      <SectionIntro
        id="insights-heading"
        eyebrow="Insights & trends"
        lead="Technical journals covering how we think about engineering — architecture, immersive systems, and brand as code."
      />

      <div id="ins-root" className="relative w-full">
        <div className="mb-8 flex flex-wrap items-center gap-2.5 font-mono">
          {INS_FILTER_OPTS.map(({ key, label }, idx) => (
            <Fragment key={key}>
              {idx === 1 ? <FilterRailSeparator /> : null}
              <button
                type="button"
                className={
                  filter === key
                    ? "relative cursor-pointer overflow-hidden rounded border border-sl-saffron bg-transparent px-4 py-2 font-mono text-xs uppercase tracking-widest text-sl-saffron shadow-md ring-2 ring-sl-saffron/20 transition-[color,box-shadow,border-color] duration-300 ease-out before:pointer-events-none before:absolute before:inset-0 before:bg-linear-to-br before:from-sl-saffron/10 before:to-transparent before:opacity-100 before:content-['']"
                    : "relative cursor-pointer overflow-hidden rounded border border-slate-800 bg-transparent px-4 py-2 font-mono text-xs uppercase tracking-widest text-slate-600 transition-[color,box-shadow,border-color] duration-300 ease-out hover:border-slate-600 hover:text-slate-500 before:pointer-events-none before:absolute before:inset-0 before:bg-linear-to-br before:from-sl-saffron/10 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100"
                }
                onClick={() => setFilter(key)}
              >
                {label}
              </button>
            </Fragment>
          ))}
          <span className="ml-auto font-mono text-xs uppercase tracking-wider text-gray-500">
            {countLabel}
          </span>
        </div>

        <div id="ins-grid" ref={gridRef}>
          {filtered.map((p, i) => {
            const diffDays = Math.floor(
              (INSIGHTS_NOW.getTime() - new Date(p.date).getTime()) / 86400000,
            );
            const isNew = diffDays <= 2;
            const codeHtml = codeLinesToHtml(p.code.lines);
            const thumbSrc = insightThumbSrc(p.svgType, p.color);

            return (
              <div
                key={p.id}
                className="ins-card group relative h-full cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/3 px-6 py-7 shadow-none backdrop-blur-2xl transition-[transform,box-shadow,border-color,opacity] duration-200 will-change-transform hover:-translate-y-1.5 hover:shadow-2xl group-hover:border-white/20 motion-reduce:transition-opacity motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100 motion-reduce:hover:shadow-none"
                data-cat={p.catKey}
                data-idx={i}
                role="button"
                tabIndex={0}
                onKeyDown={onCardKeyDown}
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
                <div className="card-img-wrap relative z-10 -mx-6 -mt-7 mb-5 h-42">
                  <div className="card-img-inner relative">
                    <img
                      src={thumbSrc}
                      alt=""
                      className="absolute inset-0 size-full object-cover"
                    />
                  </div>
                  <div className="card-grain" aria-hidden />
                  <div className="card-cat">{p.cat}</div>
                  {isNew ? (
                    <div className="card-new">
                      <div className="new-dot" />
                      NEW
                    </div>
                  ) : null}
                </div>
                <div className="card-body relative z-10">
                  <div className="card-meta">
                    <div
                      className={
                        isNew ? "read-dot read-dot-new-post" : "read-dot"
                      }
                    />
                    <span>{p.dateLabel}</span>
                    <span className="meta-sep">•</span>
                    <span>{p.read}</span>
                    <span className="meta-sep">•</span>
                    <span className="card-meta-id">{p.id}</span>
                  </div>
                  <div className="card-title">{p.title}</div>
                  <div
                    className="card-code"
                    dangerouslySetInnerHTML={{ __html: codeHtml }}
                  />
                  <div className="card-excerpt">{p.excerpt}</div>
                  <div className="card-footer">
                    <span className="card-read-btn">READ JOURNAL</span>
                    <span className="card-idx">
                      [ {String(i + 1).padStart(2, "0")} /{" "}
                      {String(filtered.length).padStart(2, "0")} ]
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

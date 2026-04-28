"use client";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { insightThumbSrc } from "@/lib/illustration-src";
import {
  BLOG_INSIGHT_FILTERS,
  BLOG_INSIGHT_POSTS,
  HOME_INSIGHT_FILTERS,
  HOME_INSIGHT_POSTS,
  INSIGHTS_NOW,
} from "@/lib/insights-data";
import type {
  CodeLine,
  InsightCatStyle,
  InsightFilterCat,
  InsightFilterOption,
  InsightPost,
} from "@/lib/insights-types";
import {
  FilterRailSeparator,
  SectionIntro,
} from "@/components/shared/section-chrome";
import Image from "next/image";
import Link from "next/link";
import {
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";

export type { InsightPost, InsightFilterOption } from "@/lib/insights-types";

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

function catBadgeStyle(catStyle: InsightCatStyle): CSSProperties {
  const map: Record<InsightCatStyle, CSSProperties> = {
    amber: {
      borderColor: "rgb(245 138 11 / 0.35)",
      color: "var(--ins-amber)",
      background: "rgb(6 8 16 / 0.72)",
    },
    cyan: {
      borderColor: "rgb(29 207 207 / 0.35)",
      color: "var(--ins-cyan)",
      background: "rgb(6 8 16 / 0.72)",
    },
    purple: {
      borderColor: "rgb(170 170 255 / 0.35)",
      color: "rgb(170 170 255 / 0.95)",
      background: "rgb(6 8 16 / 0.72)",
    },
    green: {
      borderColor: "rgb(34 197 94 / 0.35)",
      color: "rgb(34 197 94 / 0.95)",
      background: "rgb(6 8 16 / 0.72)",
    },
  };
  return map[catStyle];
}

export type InsightsTrendsSectionProps = {
  posts: readonly InsightPost[];
  filterOptions: readonly InsightFilterOption[];
  sectionId?: string;
  headingId?: string;
  /** Set false on /blogs — {@link BlogHero} already introduces the page. */
  showSectionIntro?: boolean;
  eyebrow?: string;
  lead?: string;
  /** Set false on /blogs to hide monospace code teasers under each title. */
  showCodePreview?: boolean;
  /** Reference date for “NEW” badges (avoids SSR/client clock skew) */
  insightsNow?: Date;
  showLoadMore?: boolean;
};

export function InsightsTrendsSection({
  posts,
  filterOptions,
  sectionId = "insights-trends",
  headingId = "insights-heading",
  showSectionIntro = true,
  eyebrow,
  lead,
  showCodePreview = true,
  insightsNow = INSIGHTS_NOW,
  showLoadMore = false,
}: InsightsTrendsSectionProps) {
  const [filter, setFilter] = useState<InsightFilterCat>("all");
  const [loadMoreDone, setLoadMoreDone] = useState(false);
  const reduceMotion = usePrefersReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);

  const sorted = useMemo(
    () =>
      [...posts].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    [posts],
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

  const totalForIndex = filtered.length;

  const slugify = (input: string) =>
    input
      .toLowerCase()
      .replaceAll(/[^a-z0-9]+/g, "-")
      .replaceAll(/(^-|-$)/g, "");

  return (
    <section
      id={sectionId}
      aria-labelledby={showSectionIntro ? headingId : undefined}
      aria-label={showSectionIntro ? undefined : "Technical journals"}
      className="relative scroll-mt-24 pb-12 md:pb-20"
    >
      <div className="mx-auto max-w-325 px-5 md:px-12">
        {showSectionIntro && eyebrow != null && lead != null ? (
          <SectionIntro id={headingId} eyebrow={eyebrow} lead={lead} />
        ) : null}

        <div id="ins-root" className="relative w-full">
          <div className="mb-8 flex flex-wrap items-center gap-2.5 font-mono">
            {filterOptions.map(({ key, label }, idx) => (
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
                (insightsNow.getTime() - new Date(p.date).getTime()) / 86400000,
              );
              const isNew = diffDays <= 2;
              const codeHtml = showCodePreview ? codeLinesToHtml(p.code.lines) : "";
              const thumbSrc = insightThumbSrc(p.svgType, p.color);

              return (
                <Link
                  key={p.id}
                  href={`/blogs/${slugify(p.title)}`}
                  className="ins-card group relative h-full cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/3 px-6 py-7 shadow-none backdrop-blur-2xl transition-[transform,box-shadow,border-color,opacity] duration-200 will-change-transform hover:-translate-y-1.5 hover:shadow-2xl group-hover:border-white/20 motion-reduce:transition-opacity motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100 motion-reduce:hover:shadow-none"
                  data-cat={p.catKey}
                  data-idx={i}
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
                      <Image
                        src={thumbSrc}
                        alt=""
                        fill
                        unoptimized
                        sizes="100vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="card-grain" aria-hidden />
                    <div className="card-cat" style={catBadgeStyle(p.catStyle)}>
                      {p.cat}
                    </div>
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
                    {showCodePreview ? (
                      <div
                        className="card-code"
                        dangerouslySetInnerHTML={{ __html: codeHtml }}
                      />
                    ) : null}
                    <div className="card-excerpt">{p.excerpt}</div>
                    <div className="card-footer">
                      <span className="card-read-btn">READ JOURNAL</span>
                      <span className="card-idx">
                        [ {String(i + 1).padStart(2, "0")} /{" "}
                        {String(totalForIndex).padStart(2, "0")} ]
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {showLoadMore ? (
            <div className="mt-12 flex flex-wrap items-center gap-6">
              <button
                type="button"
                disabled={loadMoreDone}
                onClick={() => setLoadMoreDone(true)}
                className="rounded-sm border border-white/20 bg-transparent px-7 py-3 font-mono text-[10px] tracking-[0.18em] text-white/50 uppercase transition-colors hover:border-sl-saffron hover:text-sl-saffron disabled:cursor-default disabled:opacity-40"
              >
                {loadMoreDone ? "All Journals Loaded" : "Load More Journals"}
              </button>
              <span className="font-mono text-[9px] tracking-[0.14em] text-white/25 uppercase">
                Showing {posts.length} of {posts.length} · More coming soon
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/** Home page — three journals, four filters (no engineering). */
export function HomeInsightsTrendsSection() {
  return (
    <InsightsTrendsSection
      posts={HOME_INSIGHT_POSTS}
      filterOptions={HOME_INSIGHT_FILTERS}
      eyebrow="Insights & trends"
      lead="Technical journals covering how we think about engineering — architecture, immersive systems, and brand as code."
    />
  );
}

/** Dedicated /blogs page — six journals + engineering filter + load-more stub. */
export function BlogInsightsTrendsSection() {
  return (
    <InsightsTrendsSection
      posts={BLOG_INSIGHT_POSTS}
      filterOptions={BLOG_INSIGHT_FILTERS}
      sectionId="blog-journals"
      headingId="blog-journals-heading"
      showSectionIntro={false}
      showCodePreview={false}
      showLoadMore
    />
  );
}

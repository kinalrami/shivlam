import Link from "next/link";
import type { CSSProperties } from "react";
import { AlignJustify, CalendarDays, Clock3, User } from "lucide-react";

import type { BlogPost } from "@/components/views/blogs/content";

function catBadgeStyle(
  catStyle: "amber" | "cyan" | "purple" | "green",
): CSSProperties {
  const map: Record<
    "amber" | "cyan" | "purple" | "green",
    CSSProperties
  > = {
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

export function Hero({ post, isNew }: { post: BlogPost; isNew: boolean }) {
  const meta = [
    { label: "Published", value: post.dateLabel, icon: CalendarDays },
    { label: "Reading Time", value: post.read, icon: Clock3 },
    { label: "Publisher", value: post.publisher, icon: User },
    { label: "Category", value: post.cat, icon: AlignJustify },
  ] as const;

  return (
    <section
      aria-labelledby="blog-detail-h2"
      className="relative mx-auto w-full max-w-325 overflow-hidden px-5 pt-8 pb-10 md:px-12 sm:pt-12 sm:pb-16"
    >
      <nav
        className="relative z-10 mb-7 flex items-center gap-2 font-mono text-[9px] tracking-[0.14em] text-white/22 uppercase"
        aria-label="Breadcrumb"
      >
        <Link
          href="/"
          className="text-orange-400/55 transition-colors hover:text-orange-400"
        >
          Home
        </Link>
        <span aria-hidden className="text-white/22">
          ›
        </span>
        <Link
          href="/blogs"
          className="text-orange-400/55 transition-colors hover:text-orange-400"
        >
          Blog
        </Link>
        <span aria-hidden className="text-white/22">
          ›
        </span>
        <span aria-current="page" className="text-white/40">
          {post.id}
        </span>
      </nav>

      <div className="relative z-10 max-w-225">
        <div className="mb-4 inline-flex items-center gap-2">
          <span
            className="inline-flex rounded border px-2 py-1 font-mono text-[10px] uppercase"
            style={catBadgeStyle(post.catStyle)}
          >
            {post.cat}
          </span>
          {isNew ? (
            <span className="inline-flex items-center gap-2 rounded border border-emerald-400/40 bg-emerald-400/10 px-2 py-1 font-mono text-[10px] uppercase text-emerald-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
              NEW
            </span>
          ) : null}
        </div>

        <h1
          id="blog-detail-h2"
          className="font-sans text-4xl font-light text-white sm:text-5xl md:text-6xl"
        >
          {post.title}
        </h1>

        <p className="mt-5 max-w-4xl font-sans text-base font-light leading-relaxed text-gray-400">
          {post.excerpt}
        </p>

        <div className="mt-8 grid overflow-hidden rounded-2xl border border-white/10 bg-white/3 backdrop-blur-2xl sm:grid-cols-2 lg:grid-cols-4">
          {meta.map((m) => (
            <div
              key={m.label}
              className="flex items-center gap-3.5 border-b border-white/5 p-4 last:border-b-0 sm:border-r sm:[&:nth-child(2n)]:border-r-0 sm:[&:nth-last-child(-n+2)]:border-b-0 lg:border-b-0 lg:border-r lg:[&:nth-child(2n)]:border-r lg:last:border-r-0"
            >
              <m.icon className="h-3.5 w-3.5 text-white/40" aria-hidden />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
                  {m.label}
                </p>
                <p className="font-mono text-[13px] font-semibold text-white/85">
                  {m.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


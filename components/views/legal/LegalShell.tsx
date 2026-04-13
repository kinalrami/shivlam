"use client";

import Link from "next/link";
import { useState } from "react";
import { LEGAL_DOCS, type LegalBodyPart, type LegalDocKey } from "@/components/views/legal/content";

function renderBody(parts: readonly LegalBodyPart[]) {
  return parts.map((p, idx) => {
    if (typeof p === "string") return <span key={idx}>{p}</span>;
    if (p.type === "mailto") {
      return (
        <a key={idx} className="text-orange-400 hover:underline" href={`mailto:${p.email}`}>
          {p.email}
        </a>
      );
    }
    return null;
  });
}

export function LegalShell() {
  const docs = LEGAL_DOCS;
  const [active, setActive] = useState<LegalDocKey>("terms");
  const doc = docs.find((d) => d.key === active) ?? docs[0]!;

  return (
    <main className="min-h-[calc(100vh-64px)] bg-[#060606] text-white">
      <div className="mx-auto w-full max-w-[760px] px-5 py-12 sm:px-8 sm:py-20">
        <div
          className="inline-flex overflow-hidden rounded-md border border-white/12 bg-white/[0.03] backdrop-blur"
          role="tablist"
          aria-label="Legal documents"
        >
          {docs.map((d) => {
            const isActive = d.key === active;
            return (
              <button
                key={d.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={[
                  "font-mono border-r border-white/12 px-6 py-3 text-[10px] tracking-[0.16em] uppercase transition-colors",
                  isActive ? "bg-orange-400/[0.08] text-orange-400" : "text-white/45 hover:bg-white/[0.06] hover:text-white/80",
                ].join(" ")}
                onClick={() => setActive(d.key)}
              >
                {d.tabLabel}
              </button>
            );
          })}
        </div>

        <div className="mt-12">
          <div className="font-mono flex items-center gap-2 text-[9px] tracking-[0.22em] uppercase text-orange-400/85">
            <span className="h-px w-5 bg-orange-400/50" aria-hidden />
            <span>{doc.label}</span>
          </div>
          <h1 className="mt-3 font-card-title text-4xl leading-tight text-white">
            {doc.title.before}
            <span className="text-orange-400">{doc.title.highlight}</span>
            {doc.title.after ?? ""}
          </h1>
          <p className="font-mono mt-3 border-b border-white/[0.08] pb-8 text-[9px] tracking-[0.1em] uppercase text-white/35">
            {doc.meta}
          </p>
          <blockquote
            className="mt-8 rounded-r-lg border-l-[3px] border-sl-saffron bg-sl-saffron/[0.06] py-4 pr-5 pl-5"
          >
            <p className="font-sans text-[17px] font-semibold leading-snug text-sl-text italic">
              {doc.intro}
            </p>
          </blockquote>
          <div className="mt-12">
            {doc.points.map((p) => (
              <section
                key={p.num}
                className="grid grid-cols-[48px_1fr] gap-5 border-b border-white/[0.08] py-7 last:border-b-0"
              >
                <div className="font-mono pt-1 text-[11px] tracking-[0.1em] font-medium text-orange-400/70">
                  {p.num}
                </div>
                <div>
                  <h2 className="font-card-title text-base leading-5 text-white/90">{p.title}</h2>
                  <div className="mt-2 text-sm leading-7 text-white/55">{renderBody(p.body)}</div>
                </div>
              </section>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-between gap-5 rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-7">
            <div>
              <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-orange-400/80">
                {doc.strip.eyebrow}
              </p>
              <p className="mt-1 text-sm leading-6 text-white/50">{doc.strip.body}</p>
            </div>
            <Link
              className="font-mono whitespace-nowrap rounded-md bg-orange-400 px-6 py-3 text-[9px] font-semibold tracking-[0.12em] uppercase text-white shadow-[0_0_24px_rgb(245_138_11/0.28)] transition-colors hover:bg-[#E68A1F]"
              href={doc.strip.href}
            >
              {doc.strip.label}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}


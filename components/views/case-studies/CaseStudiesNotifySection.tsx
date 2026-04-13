"use client";

import { useState } from "react";
import { CASE_STUDIES_NOTIFY } from "@/lib/case-studies/data";

export function CaseStudiesNotifySection() {
  const n = CASE_STUDIES_NOTIFY;
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const v = email.trim();
    if (!v || !v.includes("@")) return;
    setDone(true);
  }

  return (
    <section
      className="relative mb-10 overflow-hidden rounded-xl bg-[#0A1B33] px-6 py-8 md:px-8"
      aria-labelledby="case-studies-notify-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage: `linear-gradient(rgba(255,153,51,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,153,51,.04) 1px, transparent 1px)`,
          backgroundSize: "52px 52px",
        }}
        aria-hidden
      />
      <div className="relative z-[1] flex flex-wrap items-center gap-8">
        <div className="min-w-0 flex-1">
          <h2 id="case-studies-notify-heading" className="mb-1.5 font-sans text-xl font-bold text-white">
            Get Notified When Case Studies <span className="text-orange-400">Drop.</span>
          </h2>
          <p className="max-w-[360px] text-[13px] leading-relaxed text-white/45">{n.description}</p>
        </div>
        <div className="min-w-[280px] flex-1">
          {done ? (
            <p className="py-3 font-mono text-[10px] tracking-[0.1em] text-emerald-400">{n.successMessage}</p>
          ) : (
            <form onSubmit={submit} className="mt-2 flex flex-wrap gap-2.5">
              <input
                id="notify-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={n.placeholder}
                autoComplete="email"
                className="min-w-[220px] flex-1 rounded-md border border-white/15 bg-white/[0.07] px-4 py-2.5 font-mono text-[10px] tracking-[0.06em] text-white outline-none transition-colors placeholder:text-white/30 focus:border-orange-400"
              />
              <button
                type="submit"
                className="rounded-md bg-orange-400 px-5 py-2.5 text-[11px] font-semibold tracking-[0.07em] text-white uppercase transition-colors hover:bg-[#E68A1F]"
              >
                {n.submitLabel}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

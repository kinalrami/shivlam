"use client";

import { SectionIntro } from "@/components/shared/section-chrome";
import { useState, type FormEvent } from "react";

export function BlogNewsletter() {
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "").trim();
    if (!email.includes("@")) return;
    setDone(true);
  }

  return (
    <section
      className="relative scroll-mt-24 overflow-hidden border-t-2 border-sl-saffron py-12 md:py-20"
      aria-labelledby="blog-newsletter-heading"
    >
      <div className="relative z-1 mx-auto grid max-w-325 grid-cols-1 gap-10 px-5 md:grid-cols-2 md:gap-16 md:px-12">
        <div>
          <SectionIntro
            id="blog-newsletter-heading"
            eyebrow="Engineering Newsletter"
            eyebrowStyle="dash"
            title={
              <>
                Get Journals
                <br />
                <span className="text-sl-saffron">Straight to Your Inbox.</span>
              </>
            }
            lead="One email when we publish. No marketing — just the raw engineering and strategy thinking from the Shivlam team."
            className="mb-0! [&_h2]:text-sl-saffron/90 [&_h3]:text-3xl [&_h3]:font-bold [&_h3]:leading-tight [&_h3]:text-white md:[&_h3]:text-[32px] [&_p]:max-w-md! [&_p]:text-sm [&_p]:leading-relaxed [&_p]:text-white/45"
          />
        </div>

        <div className="flex flex-col justify-center">
          {done ? (
            <p className="font-mono text-sm tracking-wide text-[#22c55e]">
              ✓ You&apos;re subscribed · First journal lands in your inbox soon.
            </p>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col gap-2.5 sm:flex-row">
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="your@email.com"
                  className="min-w-0 flex-1 rounded-[3px] border border-white/15 bg-white/[0.07] px-4 py-3 font-mono text-[10px] tracking-[0.06em] text-white outline-none placeholder:text-white/28 focus:border-sl-saffron"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-[3px] bg-sl-saffron px-6 py-3 font-mono text-[10px] tracking-[0.12em] text-white uppercase transition-colors hover:bg-[#E68A1F]"
                >
                  Subscribe →
                </button>
              </div>
              <span className="font-mono text-[8px] tracking-[0.08em] text-white/20 uppercase">
                No spam. Unsubscribe any time. Engineers only.
              </span>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

"use client";

import type { RefObject } from "react";
import Link from "next/link";
import { MoveRight, Phone } from "lucide-react";
import { ArbimReveal } from "./Motion";

type Props = {
  midCvRef: RefObject<HTMLCanvasElement | null>;
};

export default function MidCta({ midCvRef }: Props) {
  const email = "hi@shivlam.com";
  const primaryHref = `mailto:${email}`;

  return (
    <section
      id="arbim-mid-cta"
      className="relative scroll-mt-14 overflow-hidden bg-[#060606] py-20 md:py-[88px]"
    >
      <canvas className="absolute inset-0 z-0 h-full w-full" id="arbim-mid-cv" ref={midCvRef} />
      <div className="relative z-[5] mx-auto max-w-[800px] px-5 text-center md:px-12">
        <ArbimReveal delayStep={1}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-sm border border-orange-400/30 bg-orange-400/[0.06] px-3.5 py-1.5 font-mono text-[9px] tracking-[0.22em] text-orange-400 uppercase">
            <span
              className="size-1.5 rounded-full bg-orange-400 animate-[arbim-landing-bpulse_1.8s_ease-in-out_infinite]"
              aria-hidden
            />
            THE TECHNICAL BRIDGE
          </div>
        </ArbimReveal>

        <ArbimReveal delayStep={2}>
          <h2 className="mb-4 font-sans text-[clamp(1.625rem,3.5vw,3rem)] leading-tight font-extrabold tracking-[-0.03em] text-white md:mb-[18px]">
            Overlay Your Dream
            <br />
            above your code,
            <br />
            <span className="text-orange-400">Capture Now.</span>
          </h2>
        </ArbimReveal>

        <ArbimReveal delayStep={3}>
          <div className="mb-9 flex items-center justify-center gap-4">
            <span className="h-px max-w-[120px] flex-1 bg-gradient-to-r from-transparent to-orange-400/30" />
            <span className="flex size-8 items-center justify-center rounded-full border border-orange-400/30">
              <Phone className="size-3.5 stroke-orange-400 stroke-2" aria-hidden />
            </span>
            <span className="h-px max-w-[120px] flex-1 bg-gradient-to-l from-transparent to-orange-400/30" />
          </div>
        </ArbimReveal>

        <ArbimReveal delayStep={3}>
          <p className="mb-9 text-[15px] leading-[1.75] text-white/45 md:mb-9">
            Ready to see your Revit models in the field?
            <br />
            Send your specs to{" "}
            <a
              href={`mailto:${email}`}
              className="border-b border-orange-400/30 text-orange-400 no-underline hover:border-orange-400"
            >
              {email}
            </a>{" "}
            and we'll sync your site in AR.
          </p>
        </ArbimReveal>

        <ArbimReveal delayStep={4} className="flex flex-wrap items-center justify-center gap-3.5">
          <Link
            data-arbim-cursor
            href={primaryHref}
            className="relative flex items-center gap-2 rounded-md border border-orange-400 bg-orange-400 px-8 py-3 text-[13px] font-semibold tracking-[0.07em] text-white uppercase shadow-[0_0_24px_rgb(245_138_11/0.35)] transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-[0_0_44px_rgb(245_138_11/0.55)]"
          >
            Start AR sync <MoveRight/>
          </Link>
          <a
            data-arbim-cursor
            href="https://deltaarbim.tech/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-md border-[1.5px] border-white/30 bg-transparent px-6 py-3.5 text-xs font-semibold tracking-[0.08em] text-white uppercase transition-[border-color,background,transform] hover:-translate-y-0.5 hover:border-orange-400 hover:bg-orange-400/[0.08]"
          >
            View Deltaarbim
          </a>
        </ArbimReveal>
      </div>
    </section>
  );
}


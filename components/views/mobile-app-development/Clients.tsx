"use client";

import { SectionIntro } from "@/components/shared/section-chrome";
import type { MobileServiceContent } from "./content";

type Props = {
  content: MobileServiceContent;
};

export function Clients({ content }: Props) {
  const c = content.clients;

  return (
    <section id={c.sectionId} className="bg-[#060606] scroll-mt-14">
      <div className="mx-auto max-w-325 px-5 md:px-12">
        <SectionIntro
          id={c.headingId}
          eyebrow={c.eyebrow}
          eyebrowStyle="dash"
          title={
            <>
              {c.titleBefore}
              <span className="text-orange-400">{c.titleHighlight}</span>
            </>
          }
          lead={c.lead}
        />
      </div>

      <div className="mx-auto max-w-325 px-5 pb-18 md:px-12">
        <div className="relative overflow-hidden rounded-xl">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-18"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-18"
            aria-hidden
          />

          <div className="py-4">
            <div className="flex min-w-max gap-3 motion-safe:animate-[arbim-dev-marquee_22s_linear_infinite]">
              {Array.from({ length: 2 }).map((_, loopIdx) => (
                <div key={loopIdx} className="flex min-w-max gap-3 pr-3">
                  {c.names.map((name) => (
                    <span
                      key={`${loopIdx}-${name}`}
                      className="inline-flex items-center rounded-md border border-black/10 bg-black/[0.03] px-4 py-2 font-sans text-[12px] font-semibold tracking-tight text-grey-400"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-4 text-center font-mono text-[10px] tracking-[0.22em] text-gray-400 uppercase">
          {c.marqueeLine}
        </p>
      </div>
    </section>
  );
}

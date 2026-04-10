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
        <p className="mt-4 text-center font-mono text-[10px] tracking-[0.22em] text-gray-400 uppercase">
          {c.marqueeLine}
        </p>
      </div>
    </section>
  );
}

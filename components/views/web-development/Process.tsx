import { SectionIntro } from "@/components/shared/section-chrome";

export type ProcessContent = {
  sectionId: string;
  headingId: string;
  eyebrow: string;
  title: { before: string; highlight: string; after?: string };
  lead: string;
  steps: readonly { num: string; tag: string; title: string; desc: string }[];
};

type Props = { content: ProcessContent };

export function Process({ content }: Props) {
  return (
    <section id={content.sectionId} className="bg-[#060606] scroll-mt-14">
      <div className="mx-auto max-w-325 px-5 pb-12 md:px-12 md:pb-20">
        <SectionIntro
          id={content.headingId}
          align="center"
          eyebrow={content.eyebrow}
          eyebrowStyle="dash"
          title={
            <>
              {content.title.before}<br />
              <span className="text-sl-saffron">{content.title.highlight}</span>
              {content.title.after ?? null}
            </>
          }
          lead={content.lead ? content.lead : undefined}
        />

        <div className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* connector line between step nodes (lg+) */}
          <div
            className="pointer-events-none absolute left-[10%] right-[10%] top-8 hidden h-px bg-orange-400/20 lg:block"
            aria-hidden
          />

          {content.steps.map((s) => (
            <div key={s.num} className="relative z-[1] text-center">
              <div className="relative mx-auto mb-5 flex size-16 items-center justify-center rounded-full border border-orange-400/30 bg-[#060606] font-sans text-lg font-bold text-orange-400">
                <div
                  className="pointer-events-none absolute inset-0 rounded-full bg-orange-400/[0.06]"
                  aria-hidden
                />
                <span className="relative">{s.num}</span>
              </div>
              <div className="font-mono text-[10px] tracking-[0.16em] text-orange-400/70 uppercase">
                {s.tag}
              </div>
              <div className="mt-2 font-sans text-sm font-semibold text-white">
                {s.title}
              </div>
              <p className="mt-2 text-sm leading-relaxed font-light text-white/45">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


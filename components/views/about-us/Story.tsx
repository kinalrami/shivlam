import { SectionIntro } from "@/components/shared/section-chrome";
import { SECTION_SHELL, TIMELINE } from "./constants";

export function Story() {
  return (
    <section
      id="about-story"
      aria-labelledby="story-heading"
      className="bg-[#060606] pb-12 md:pb-20"
    >
      {/* Story */}
      <div className={SECTION_SHELL}>
        <div data-about-reveal className="mb-8">
          <SectionIntro
            id="story-heading"
            eyebrow="Our journey"
            title={
              <>
                From corporate <span className="text-sl-saffron">engineering</span>
                <br />
                to product innovation.
              </>
            }
            lead="DeltaARBIM didn't begin in a startup garage. It began inside large-scale construction technology teams, watching the same problems repeat project after project. Here's how we got here."
            fullWidth
            className="mb-0"
          />
        </div>
        <div className="relative mt-5 before:absolute before:top-0 before:bottom-0 before:left-6 before:w-px before:bg-orange-400/20 md:before:left-6">
          <ul className="relative z-[1] list-none space-y-12 md:space-y-[52px]" role="list">
            {TIMELINE.map((item, i) => (
              <li
                key={item.year}
                data-about-reveal
                data-arbim-cursor
                data-about-delay={i > 0 ? String(Math.min(i, 5)) : undefined}
                className="flex gap-8 md:gap-10"
              >
                <div className="relative z-[2] flex size-12 shrink-0 items-center justify-center rounded-full border-[1.5px] border-orange-400/40 bg-[#1c1c1c] transition-[border-color,background-color] duration-300 hover:border-orange-400 hover:bg-orange-400/10">
                  <span className="font-mono text-[9px] font-medium tracking-wide text-orange-400">
                    {item.year}
                  </span>
                </div>
                <div className="min-w-0 pt-2">
                  <h3 className="mb-2 font-sans text-lg font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="text-[13.5px] leading-relaxed text-white/50">
                    {item.desc}
                  </p>
                  <span className="mt-2.5 inline-block rounded-sm border border-orange-400/25 px-2 py-0.5 font-mono text-[8px] tracking-[0.14em] text-orange-400 uppercase">
                    {item.tag}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

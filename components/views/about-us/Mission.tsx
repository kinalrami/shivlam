import { SectionLead } from "@/components/shared/section-chrome";
import { MSTATS, SECTION_SHELL } from "./constants";

export function Mission() {
  return (
    <section
      id="about-mission"
      aria-labelledby="mission-heading"
      className="bg-[#060606] py-12 md:py-20"
    >
      {/* Mission */}
      <div className={SECTION_SHELL}>
        <header
          data-about-reveal
          className="mb-4"
        >
          <div className="flex items-center justify-between gap-4">
            <p className="font-label text-xs font-medium uppercase text-sl-saffron">
              Our mission
            </p>
            <div
              className="hidden h-px min-w-0 flex-1 bg-linear-to-r from-transparent via-gray-800 to-transparent sm:block"
              aria-hidden
            />
          </div>
        </header>

        <div className="grid gap-14 md:grid-cols-2 md:items-start md:gap-20">
          <div>
            <h2
              id="mission-heading"
              data-about-reveal
              data-about-delay="1"
              className="max-w-none font-sans text-[clamp(1.65rem,4vw,2.5rem)] font-extrabold leading-[1.12] tracking-tight text-sl-text"
            >
              Eliminating the gap between{" "}
              <span className="text-sl-saffron">BIM design</span> and real-world
              construction.
            </h2>
            <div
              data-about-reveal
              data-about-delay="1"
              className="mt-4 space-y-5"
            >
              <SectionLead className="max-w-none">
                Construction projects lose billions every year to rework — the simple,
                catastrophic result of building something that doesn&apos;t match the
                design. A beam in the wrong place. A pipe that clashes with a duct. A
                wall 8 centimeters off.
              </SectionLead>
              <SectionLead className="max-w-none">
                DeltaARBIM exists to make those errors visible before they become
                concrete. Our platform puts a live 3D BIM model — every wall, every
                pipe, every structural layer — directly over the physical site
                through your device&apos;s camera. If it&apos;s wrong, you&apos;ll see
                it before a single dollar is wasted.
              </SectionLead>
            </div>
            <blockquote
              data-about-reveal
              data-about-delay="2"
              className="mt-8 rounded-r-lg border-l-[3px] border-sl-saffron bg-sl-saffron/[0.06] py-4 pr-5 pl-5"
            >
              <p className="font-sans text-[17px] font-semibold leading-snug text-sl-text italic">
                &ldquo;Construction has always had the data. We just finally put it in
                the right place — on the site, in the hands of the person holding the
                trowel.&rdquo;
              </p>
              <cite className="mt-2.5 block font-mono text-[9px] tracking-[0.12em] text-sl-saffron not-italic">
                — Shivlam Engineering Team, DeltaARBIM
              </cite>
            </blockquote>
          </div>
          <div data-about-reveal data-about-delay="2" className="flex flex-col gap-3.5">
            {MSTATS.map((m) => (
              <div
                key={m.title}
                data-arbim-cursor
                className="group relative flex items-center gap-5 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] px-6 py-[22px] transition-[border-color,transform] duration-300 before:absolute before:top-0 before:bottom-0 before:left-0 before:w-[3px] before:bg-sl-saffron before:opacity-0 before:transition-opacity before:duration-300 group-hover:before:opacity-100 hover:translate-x-1.5 hover:border-sl-saffron/35"
              >
                <div className="shrink-0 font-sans text-[2rem] font-extrabold leading-none tracking-[-0.04em] text-sl-saffron">
                  {m.val}
                </div>
                <div className="min-w-0">
                  <div className="mb-1 font-sans text-sm font-bold text-white">
                    {m.title}
                  </div>
                  <div className="text-xs leading-snug text-white/50">
                    {m.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

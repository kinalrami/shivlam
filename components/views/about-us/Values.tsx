import { SectionIntro } from "@/components/shared/section-chrome";
import { SECTION_SHELL, VALUES } from "./constants";

export function Values() {
  return (
    <section
        id="about-values" 
        aria-labelledby="values-heading"
        className="bg-[#060606] pb-12 md:pb-20"
      >
        {/* Values */}
        <div className={SECTION_SHELL}>
          <div data-about-reveal className="mb-8">
            <SectionIntro
              id="values-heading"
              fullWidth
              eyebrow="What we stand for"
              title={
                <>
                  Principles that drive
                  <br />
                  every <span className="text-sl-saffron">line of code.</span>
                </>
              }
              lead="We're a small team with strong opinions about what good software looks like — especially when lives and livelihoods depend on it working correctly."
              className="mb-0"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((v, i) => (
              <article
                key={v.num}
                data-about-reveal
                data-arbim-cursor
                data-about-delay={String(Math.min(i + 1, 6))}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-8 transition-[border-color,transform] duration-[350ms] after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:origin-left after:scale-x-0 after:bg-sl-saffron after:transition-transform after:duration-[400ms] after:ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:after:scale-x-100 hover:-translate-y-1 hover:border-sl-saffron/28"
              >
                <span className="mb-4 block text-2xl opacity-90" aria-hidden>
                  {v.icon}
                </span>
                <div
                  className="mb-4 font-sans text-5xl font-extrabold leading-none tracking-[-0.05em] text-sl-saffron/[0.12]"
                  aria-hidden
                >
                  {v.num}
                </div>
                <h3 className="mb-2.5 font-sans text-[17px] font-bold text-white">
                  {v.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-white/50">{v.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
  );
}

import { SectionLead } from "@/components/shared/section-chrome";
import { SB_CHIPS, SECTION_SHELL } from "./constants";

export function Shivlam() {
  return (
    <section
      id="about-shivlam"
      aria-labelledby="shivlam-heading"
      className="bg-[#060606] pb-12 md:pb-20"
    >
      {/* Shivlam */}
      <div className={SECTION_SHELL}>
        <header
          data-about-reveal
          className="mb-4"
        >
          <div className="flex items-center justify-between gap-4">
            <p className="font-label text-xs font-medium uppercase text-sl-saffron">
              The company behind DeltaARBIM
            </p>
            <div
              className="hidden h-px min-w-0 flex-1 bg-linear-to-r from-transparent via-gray-800 to-transparent sm:block"
              aria-hidden
            />
          </div>
        </header>

        <div className="grid gap-14 md:grid-cols-2 md:items-start md:gap-12 lg:gap-20">
          <div>
            <h2
              id="shivlam-heading"
              data-about-reveal
              data-about-delay="1"
              className="max-w-none font-sans text-[clamp(1.65rem,4vw,2.5rem)] font-extrabold leading-[1.12] tracking-tight text-sl-text"
            >
              Shivlam —
              <br />
              Scalable Tech
              <br />
              for Everyone.
            </h2>
            <div data-about-reveal data-about-delay="1" className="mt-4">
              <SectionLead className="max-w-none">
                Shivlam is a Bharat-based technology company that architects
                production-grade software across AR, mobile, web, eCommerce, and
                digital identity. DeltaARBIM is our flagship construction tech
                product — but it represents the same engineering standard applied
                across everything we build.
              </SectionLead>
            </div>
            <div
              data-about-reveal
              data-about-delay="2"
              className="mt-8 mb-7 flex flex-wrap gap-2"
            >
              {SB_CHIPS.map((chip) => (
                <span
                  key={chip}
                  className="rounded-sm border border-sl-saffron/25 bg-sl-saffron/[0.08] px-3 py-1 font-mono text-[8.5px] tracking-[0.1em] text-sl-text uppercase"
                >
                  {chip}
                </span>
              ))}
            </div>
            <a
              data-about-reveal
              data-about-delay="3"
              href="https://www.shivlam.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-md border border-sl-saffron bg-sl-saffron px-6 py-3.5 font-mono text-[11px] font-semibold tracking-[0.14em] text-black uppercase shadow-[0_0_24px_rgb(245_138_11/0.25)] transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgb(245_138_11/0.45)]"
            >
              Explore shivlam.com →
            </a>
          </div>
          <div
            data-about-reveal
            data-about-delay="2"
            className="grid grid-cols-2 gap-4"
          >
            {[
              { v: "10+", l: "YEARS OF CORPORATE EXPERIENCE" },
              { v: "50+", l: "PROJECTS DELIVERED" },
              { v: "5+", l: "eCOM BRANDS BUILT" },
              { v: "3+", l: "COMPLEX PRODUCTS ACTIVE" },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-lg border border-white/10 bg-white/4 px-5 py-5"
              >
                <div className="mb-1 font-sans text-[1.875rem] font-extrabold leading-none tracking-[-0.04em] text-sl-text">
                  {s.v}
                </div>
                <div className="font-mono text-[8.5px] tracking-[0.12em] text-gray-400 uppercase">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

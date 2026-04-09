import { SectionIntro } from "@/components/shared/section-chrome";
import { NumberedCardsGrid } from "@/components/shared/NumberedCardsGrid";
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
        <NumberedCardsGrid
          reveal
          items={VALUES.map((v) => ({
            num: v.num,
            title: v.title,
            desc: v.desc,
            icon: v.icon,
          }))}
        />
      </div>
    </section>
  );
}

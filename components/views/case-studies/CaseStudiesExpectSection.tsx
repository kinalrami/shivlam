import { CASE_STUDIES_EXPECT } from "@/lib/case-studies/data";

export function CaseStudiesExpectSection() {
  return (
    <section className="mb-10" aria-labelledby="case-studies-expect-heading">
      <h2
        id="case-studies-expect-heading"
        className="mb-5 font-sans text-[22px] font-bold tracking-tight text-white"
      >
        What Each Case Study Will <span className="text-orange-400">Cover.</span>
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {CASE_STUDIES_EXPECT.map((item) => (
          <div
            key={item.num}
            className="rounded-[10px] border border-white/[0.08] bg-white/[0.03] p-5 transition-colors hover:border-orange-400/25"
          >
            <span className="mb-2.5 block font-mono text-[10px] tracking-[0.15em] text-orange-400/50">
              {item.num}
            </span>
            <h3 className="mb-1.5 font-sans text-[15px] font-bold text-white">{item.title}</h3>
            <p className="text-xs leading-relaxed text-white/50">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

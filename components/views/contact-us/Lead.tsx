"use client";

type Reason = {
  num: string;
  title: string;
  desc: string;
};

const REASONS: Reason[] = [
  {
    num: "01",
    title: "Free Early Access Partnership",
    desc: "Early partners get free access during development and preferred pricing at launch — in exchange for real-world feedback from live sites.",
  },
  {
    num: "02",
    title: "Direct Access to Our Engineers",
    desc: "No sales layer. You talk directly to the people building DeltaARBIM — so your site needs can shape what ships.",
  },
  {
    num: "03",
    title: "Custom Site Demo Available",
    desc: "For qualified construction teams, we can walk through DeltaARBIM using your BIM model so you see it working in your context.",
  },
];

const WHO: string[] = [
  "General contractor managing multi-storey builds",
  "MEP subcontractor routing pipes, ducts, or conduits",
  "Project owner or developer tracking as-built progress",
  "Architect or BIM manager needing on-site design validation",
  "Construction tech buyer evaluating AR solutions",
  "Investor or partner interested in Bharat’s ConTech space",
];

export function Lead() {
  return (
    <section
      aria-labelledby="contact-lead-heading"
      className="relative overflow-hidden bg-[#060606] py-14 text-sl-text sm:py-20"
    >
      <div className="relative mx-auto w-full max-w-325 px-5 md:px-12">
        <header data-contact-reveal className="mb-4">
          <div className="flex items-center justify-between gap-4">
            <p className="font-label text-xs font-medium uppercase text-sl-saffron">
              Why reach out now?
            </p>
            <div
              className="hidden h-px min-w-0 flex-1 bg-linear-to-r from-transparent via-gray-800 to-transparent sm:block"
              aria-hidden
            />
          </div>
        </header>
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2
              id="contact-lead-heading"
              data-contact-reveal
              data-contact-delay="1"
              className="font-sans text-[clamp(1.9rem,3.6vw,2.9rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-white"
            >
              Early access means
              <br />
              you shape the <span className="text-sl-saffron">product</span>.
            </h2>

            <p
              data-contact-reveal
              data-contact-delay="2"
              className="mt-4 max-w-prose font-sans text-[15px] leading-relaxed text-white/50"
            >
              DeltaARBIM is in active development. We’re onboarding a carefully
              selected group of construction teams who work directly with our
              engineers — your site challenges become our roadmap.
            </p>

            <div className="mt-8 grid gap-3">
              {REASONS.map((r) => (
                <div
                  key={r.num}
                  data-contact-reveal
                  data-contact-delay="3"
                  className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 transition-[border-color,transform] hover:-translate-y-0.5 hover:border-sl-saffron/30"
                >
                  <div className="shrink-0 font-sans text-[22px] font-extrabold leading-none text-white/22">
                    {r.num}
                  </div>
                  <div className="min-w-0">
                    <div className="font-sans text-[15px] font-bold text-white">
                      {r.title}
                    </div>
                    <div className="mt-1 font-sans text-[12.5px] leading-relaxed text-white/45">
                      {r.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            data-contact-reveal
            data-contact-delay="3"
            className="rounded-3xl border border-white/10 bg-black/35 p-7 backdrop-blur-2xl sm:p-9"
          >
            <div className="mb-4 flex items-center gap-3 font-mono text-[9px] tracking-[0.22em] text-white/35 uppercase">
              <span className="h-px w-4 bg-white/20" aria-hidden />
              Who should contact us
            </div>

            <h3 className="font-sans text-xl font-extrabold leading-snug tracking-[-0.02em] text-white">
              DeltaARBIM is built for your team if you are a…
            </h3>

            <ul className="mt-5 grid gap-2.5">
              {WHO.map((w) => (
                <li key={w} className="flex items-start gap-2.5">
                  <span
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-white/30"
                    aria-hidden
                  />
                  <span className="font-sans text-[13.5px] leading-relaxed text-white/55">
                    {w}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-7 h-px w-full bg-white/10" aria-hidden />

            <a
              href="#contact"
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl border border-sl-saffron bg-sl-saffron px-6 py-3.5 font-mono text-[11px] font-bold tracking-[0.14em] text-black uppercase transition-[filter,transform,box-shadow] hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_0_44px_rgb(245_138_11/0.35)]"
            >
              Fill the contact form →
            </a>

            <div className="mt-4 text-center font-mono text-[9px] tracking-[0.1em] text-white/30 uppercase">
              No commitments. No sales pitch. Just a real conversation.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


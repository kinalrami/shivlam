"use client";

import { SectionIntro } from "@/components/shared/section-chrome";

export function Dedication() {
  return (
    <section id="dedication" className="relative overflow-hidden bg-[#060606] scroll-mt-14">
      <div className="relative mx-auto max-w-325 px-5 pb-12 md:pb-20 md:px-12">
        <div className="grid items-start gap-12 md:grid-cols-2 md:gap-18">
          <div>
            <SectionIntro
              id="our-ethos"
              eyebrow="OUR ETHOS"
              eyebrowStyle="dash"
              title={
                <>
                  <span className="text-white/90">Infusing Every Endeavour with</span>
                  <br />
                  <span className="text-orange-400">Genuine Care &amp; Dedication.</span>
                </>
              }
              lead="Our primary focus is on genuinely assisting people, rather than pursuing quick
                  profits. This mindset guides us to provide exceptional iPhone app development
                  services, resulting in satisfied clients and reflecting our dedication to quality and
                  integrity."
            />

            <blockquote
              className="mt-8 rounded-r-lg border-l-[3px] border-sl-saffron bg-sl-saffron/[0.06] py-4 pr-5 pl-5"
            >
              <p className="font-sans text-[17px] font-semibold leading-snug text-sl-text italic">
                “We take immense pride in our ability to consistently deliver innovative solutions,
                tailored to meet the unique needs of our clients.”
              </p>
            </blockquote>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="https://shivlam.com/contact-us/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-orange-400 px-7 py-3 text-[13px] font-semibold tracking-[0.07em] text-white uppercase shadow-[0_0_24px_rgb(245_138_11/0.25)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_44px_rgb(245_138_11/0.4)]"
              >
                Believe in Us →
              </a>
              <a
                href="https://shivlam.com/about-us/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-md border border-white/25 bg-transparent px-7 py-3 text-[13px] font-semibold tracking-[0.07em] text-white uppercase transition-[transform,border-color,background] duration-200 hover:-translate-y-0.5 hover:border-orange-400/60 hover:bg-orange-400/10"
              >
                About Shivlam
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:pt-10">
            {[
              { val: "20+", lbl: "Completed iOS Projects" },
              { val: "9+", lbl: "Happy Clients" },
              { val: "99%", lbl: "Satisfaction Rate" },
              { val: "5+", lbl: "Countries Served" },
            ].map((s) => (
              <div
                key={s.lbl}
                className="rounded-lg border border-white/10 bg-white/4 px-6 py-5"
              >
                <div className="text-3xl font-extrabold tracking-tight text-sl-text">
                  {s.val}
                </div>
                <div className="mt-1 font-mono text-[8.5px] tracking-[0.18em] text-gray-400 uppercase">
                  {s.lbl}
                </div>
              </div>
            ))}

            <div className="sm:col-span-2 rounded-lg border border-white/10 bg-white/4 px-6 py-5">
              <div className="text-3xl font-extrabold tracking-tight text-sl-text">3+</div>
              <div className="mt-1 font-sans text-sm leading-relaxed text-gray-400">
                Years of focused innovation at Shivlam — scalable tech services for Bharat and beyond.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


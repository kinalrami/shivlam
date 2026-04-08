"use client";

import { useEffect, useRef } from "react";
import { Heart, Clock } from "lucide-react";
import { attachWhyCanvas } from "./whyCanvas";

export function WhyHire() {
  const whyCvRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = whyCvRef.current;
    if (!c) return;
    return attachWhyCanvas(c);
  }, []);

  return (
    <section id="why" className="relative overflow-hidden bg-[#060606] scroll-mt-14">
      <div className="mx-auto max-w-325 px-5 py-12 md:py-20 md:px-12">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="relative order-2 overflow-hidden rounded-2xl border border-white/10 bg-[#060606] shadow-[0_20px_60px_rgb(0_0_0/0.45)] lg:order-1">
            <canvas ref={whyCvRef} className="block h-[480px] w-full" />
            <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-orange-400/20 bg-black/70 px-4 py-3 backdrop-blur-2xl">
              <div className="grid grid-cols-3">
                {[
                  { val: "50+", lbl: "Projects Shipped" },
                  { val: "99%", lbl: "Satisfaction Rate" },
                  { val: "5+", lbl: "Countries Served" },
                ].map((s, idx) => (
                  <div key={s.lbl} className="relative text-center">
                    {idx !== 0 && (
                      <span
                        className="pointer-events-none absolute left-0 top-[10%] h-[80%] w-px bg-white/10"
                        aria-hidden
                      />
                    )}
                    <div className="font-sans text-2xl font-extrabold leading-none text-orange-400">
                      {s.val}
                    </div>
                    <div className="mt-1 font-mono text-[10px] tracking-[0.18em] text-white/35 uppercase">
                      {s.lbl}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="mb-4 flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-orange-400 uppercase">
              <span className="h-0.5 w-5 bg-orange-400" aria-hidden />
              WHY HIRE US
            </div>

            <h2 className="font-sans text-[clamp(1.8rem,3vw,2.75rem)] leading-[1.08] font-extrabold tracking-[-0.03em] text-white">
              Ultimate iPhone App
              <br />
              Development Company
              <br />
              <span className="text-orange-400">to Shortlist.</span>
            </h2>

            <p className="mt-4 max-w-xl text-[15px] leading-[1.82] text-white/45">
              Discover excellence in app development with our top-tier iPhone app development
              company. Our skilled team crafts immersive, user-friendly apps tailored to your
              vision. From concept to App Store launch, we ensure seamless functionality, stunning
              design, and optimal performance.
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/3 p-6 backdrop-blur-2xl transition-transform duration-200 hover:-translate-y-1">
                <div className="mb-4 inline-flex size-10 items-center justify-center rounded-xl border border-orange-400/25 bg-orange-400/10 text-orange-400">
                  <Heart className="size-5" aria-hidden />
                </div>
                <h3 className="text-base font-bold text-white">Customer Satisfaction</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/45">
                  Our success thrives on your happiness. We prioritize your needs, exceed
                  expectations, and create lasting connections through unmatched customer
                  satisfaction.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/3 p-6 backdrop-blur-2xl transition-transform duration-200 hover:-translate-y-1">
                <div className="mb-4 inline-flex size-10 items-center justify-center rounded-xl border border-orange-400/25 bg-orange-400/10 text-orange-400">
                  <Clock className="size-5" aria-hidden />
                </div>
                <h3 className="text-base font-bold text-white">On-Time Delivery</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/45">
                  Embrace the challenge of on-time delivery. Our commitment drives efficient
                  processes, ensuring your project reaches the finish line promptly without
                  compromising quality.
                </p>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="https://shivlam.com/contact-us/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-orange-400 px-7 py-3 text-[13px] font-semibold tracking-[0.07em] text-white uppercase shadow-[0_0_24px_rgb(245_138_11/0.25)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_44px_rgb(245_138_11/0.4)]"
              >
                Start Your Project →
              </a>
              <a
                href="https://shivlam.com/shivlam-it-services-portfolio-apps-games-websites-seo/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-md border border-white/20 bg-transparent px-7 py-3 text-[13px] font-medium tracking-[0.07em] text-white/65 uppercase transition-[transform,border-color,color] duration-200 hover:-translate-y-0.5 hover:border-orange-400/60 hover:text-orange-400"
              >
                View Portfolio
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


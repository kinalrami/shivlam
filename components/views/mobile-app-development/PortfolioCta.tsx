"use client";

import { useEffect, useRef } from "react";
import { SectionIntro } from "@/components/shared/section-chrome";
import { attachPortfolioCanvas } from "./portfolioCanvas";

export function PortfolioCta() {
  const portRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = portRef.current;
    if (!c) return;
    return attachPortfolioCanvas(c);
  }, []);

  return (
    <section id="portfolio-cta" className="relative overflow-hidden bg-[#060606] scroll-mt-14">
      <div className="relative mx-auto max-w-325 px-5 pb-12 md:pb-20 md:px-12">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-18">
          <div>
            <SectionIntro
              id="it-services-portfolio"
              eyebrow="IT SERVICES PORTFOLIO"
              eyebrowStyle="dash"
              title={
                <>
                  Explore How Shivlam
                  <br />
                  Drives Growth Through
                  <br />
                  <span className="text-orange-400">Digital Products.</span>
                </>
              }
              lead={null}
              className="mb-0"
            />

            <div className="mt-6 space-y-3 text-[15px] leading-relaxed text-white/45">
              <Bullet>
                <strong className="text-white">Creative Solutions:</strong> Innovative apps,
                websites, and marketing strategies designed to stand out.
              </Bullet>
              <Bullet>
                <strong className="text-white">Technical Expertise:</strong> Reliable and scalable
                development with modern technologies.
              </Bullet>
              <Bullet>
                <strong className="text-white">Client Success:</strong> Projects delivered across{" "}
                <strong className="text-white">5+ countries</strong> with{" "}
                <strong className="text-white">99.99% satisfaction</strong>.
              </Bullet>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://shivlam.com/shivlam-it-services-portfolio-apps-games-websites-seo/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-orange-400 px-7 py-3 text-[13px] font-semibold tracking-[0.07em] text-white uppercase shadow-[0_0_24px_rgb(245_138_11/0.25)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_44px_rgb(245_138_11/0.4)]"
              >
                🚀 View Our Work
              </a>
              <a
                href="https://shivlam.com/contact/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-md border border-white/20 bg-transparent px-7 py-3 text-[13px] font-medium tracking-[0.07em] text-white/65 uppercase transition-[transform,border-color,color] duration-200 hover:-translate-y-0.5 hover:border-orange-400/60 hover:text-orange-400"
              >
                🤝 Let&apos;s Connect
              </a>
            </div>
          </div>

          <div className="relative h-[320px] overflow-hidden rounded-2xl border border-white/10 bg-[#040e1e] shadow-[0_20px_60px_rgb(0_0_0/0.45)]">
            <canvas ref={portRef} className="block h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-orange-400" aria-hidden />
      <div>{children}</div>
    </div>
  );
}


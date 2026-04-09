"use client";

import { MidBannerCta } from "@/components/shared/MidBannerCta";

type Props = {
  serviceName: string;
};

export function FinalCta({ serviceName }: Props) {
  return (
    <MidBannerCta
      sectionId="cta"
      reveal="arbim"
      sectionClassName="pb-12 md:pb-20"
      badge="GET IN TOUCH TODAY"
      title={
        <>
          Ready to Build Your
          <br />
          <span className="text-orange-400">{serviceName}?</span>
        </>
      }
      body={
        <>
          Let&apos;s chat about your app idea and build the perfect experience. Drop us<br /> a line and
          we&apos;ll respond promptly.
        </>
      }
      actions={
        <div className="flex w-full flex-col items-center">
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <a
              href="mailto:hi@shivlam.com"
              className="inline-flex items-center justify-center rounded-md bg-orange-400 px-7 py-3 text-[13px] font-semibold tracking-[0.07em] text-white uppercase shadow-[0_0_24px_rgb(245_138_11/0.25)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_44px_rgb(245_138_11/0.4)]"
            >
              Email Us →
            </a>
            <a
              href="https://shivlam.com/contact-us/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-md border border-white/25 bg-transparent px-7 py-3 text-[13px] font-semibold tracking-[0.07em] text-white uppercase transition-[transform,border-color,background] duration-200 hover:-translate-y-0.5 hover:border-orange-400/60 hover:bg-orange-400/10"
            >
              Contact Form
            </a>
          </div>

          <div className="mt-8 text-center">
            <div className="flex items-center justify-center gap-4 text-sm">
              <a
                href="mailto:hi@shivlam.com"
                className="font-mono text-[12px] tracking-[0.14em] text-orange-400"
              >
                hi@shivlam.com
              </a>
              <span className="font-mono text-white/15" aria-hidden>
                ·
              </span>
              <a
                href="https://www.shivlam.com"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[12px] tracking-[0.14em] text-orange-400"
              >
                shivlam.com
              </a>
            </div>

            <p className="mt-6 font-mono text-[10px] tracking-[0.22em] text-white/35 uppercase">
              — OR EXPLORE OUR WORK —
            </p>
            <div className="mt-4">
              <a
                href="https://shivlam.com/shivlam-it-services-portfolio-apps-games-websites-seo/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-md border border-white/25 bg-transparent px-7 py-3 text-[13px] font-semibold tracking-[0.07em] text-white uppercase transition-[transform,border-color,background] duration-200 hover:-translate-y-0.5 hover:border-orange-400/60 hover:bg-orange-400/10"
              >
                View Portfolio
              </a>
            </div>
          </div>
        </div>
      }
    />
  );
}


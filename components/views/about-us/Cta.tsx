"use client";

import Link from "next/link";
import { MoveRight } from "lucide-react";
import { MidBannerCta } from "@/components/shared/MidBannerCta";

export function Cta() {
  return (
    <MidBannerCta
      sectionId="about-cta"
      ariaLabelledBy="cta-heading"
      reveal="about"
      badge="Ready to build smarter?"
      sectionClassName="md:pb-24"
      title={
        <>
          Join the early
          <br />
          <span className="text-orange-400">access</span> waitlist.
        </>
      }
      body={
        <>
          Be among the first construction teams to use DeltaARBIM on your next
          project.<br />We&apos;re onboarding early partners now.
        </>
      }
      actions={
        <>
          <a
            href="https://deltaarbim.tech/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center gap-2 rounded-md border border-orange-400 bg-orange-400 px-8 py-3 text-[13px] font-semibold tracking-[0.07em] text-white uppercase shadow-[0_0_24px_rgb(245_138_11/0.35)] transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-[0_0_44px_rgb(245_138_11/0.55)]"
          >
            Join early access <MoveRight />
          </a>
          <Link
            href="/contact-us"
            className="inline-block rounded-md border-[1.5px] border-white/30 bg-transparent px-6 py-3.5 text-xs font-semibold tracking-[0.08em] text-white uppercase transition-[border-color,background,transform] hover:-translate-y-0.5 hover:border-orange-400 hover:bg-orange-400/8"
          >
            Talk to us
          </Link>
        </>
      }
    />
  );
}

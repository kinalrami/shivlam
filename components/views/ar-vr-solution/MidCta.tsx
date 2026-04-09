"use client";

import type { RefObject } from "react";
import Link from "next/link";
import { MidBannerCta } from "@/components/shared/MidBannerCta";

type Props = {
  midCvRef: RefObject<HTMLCanvasElement | null>;
};

export default function MidCta({ midCvRef }: Props) {
  const email = "hi@shivlam.com";
  const primaryHref = `mailto:${email}`;

  return (
    <MidBannerCta
      sectionId="arvr-mid-cta"
      canvasRef={midCvRef}
      canvasId="arvr-mcta-cv"
      reveal="arbim"
      badge="Sync your vision"
      showPhoneIcon
      centerIcon="clock"
      title={
        <>
          Overlay Your Dream
          <br />
          on Top of <span className="text-orange-400">our Code.</span>
        </>
      }
      body={
        <>
          Ready to step inside your architecture before a single brick is laid? Share your <br />
          project specs with our engineering team at{" "}
          <a
            href={`mailto:${email}`}
            className="border-b border-orange-400/30 text-orange-400 no-underline hover:border-orange-400"
          >
            {email}
          </a>
          .
        </>
      }
      actions={
        <Link
          data-arbim-cursor
          href={primaryHref}
          className="rounded-md border border-orange-400 bg-orange-400 px-7 py-3.5 font-mono text-[12px] font-semibold tracking-[0.12em] text-white uppercase shadow-[0_0_28px_rgb(245_138_11/0.4)] transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-[0_0_48px_rgb(245_138_11/0.55)]"
        >
          [ Activate virtual sync ]
        </Link>
      }
    />
  );
}


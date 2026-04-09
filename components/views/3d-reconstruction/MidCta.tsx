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
      sectionId="recon-mid-cta"
      canvasRef={midCvRef}
      canvasId="recon-mcta-cv"
      reveal="arbim"
      badge="Capture your workspace"
      showPhoneIcon
      centerIcon="mapPin"
      title={
        <>
          Overlay Your Dream on Top of
          <br />
          <span className="text-orange-400">our Code.</span>
        </>
      }
      body={
        <>
          Ready to digitize your existing assets? Let us help you capture your site today.
          Reach out to{" "}
          <a
            href={`mailto:${email}`}
            className="border-b border-orange-400/30 text-orange-400 no-underline hover:border-orange-400"
          >
            {email}
          </a>{" "}
          and we&apos;ll plan your first scan.
        </>
      }
      actions={
        <Link
          data-arbim-cursor
          href={primaryHref}
          className="rounded-md border border-orange-400 bg-orange-400 px-7 py-3.5 font-mono text-[12px] font-semibold tracking-[0.12em] text-white uppercase shadow-[0_0_28px_rgb(245_138_11/0.4)] transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-[0_0_48px_rgb(245_138_11/0.55)]"
        >
          [ Start scanning now ]
        </Link>
      }
    />
  );
}

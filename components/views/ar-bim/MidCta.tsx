"use client";

import type { RefObject } from "react";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { MidBannerCta } from "@/components/shared/MidBannerCta";

type Props = {
  midCvRef: RefObject<HTMLCanvasElement | null>;
};

export default function MidCta({ midCvRef }: Props) {
  const email = "hi@shivlam.com";
  const primaryHref = `mailto:${email}`;

  return (
    <MidBannerCta
      sectionId="arbim-mid-cta"
      canvasRef={midCvRef}
      canvasId="arbim-mid-cv"
      reveal="arbim"
      badge="THE TECHNICAL BRIDGE"
      showPhoneIcon
      title={
        <>
          Overlay Your Dream
          <br />
          above your code,
          <br />
          <span className="text-orange-400">Capture Now.</span>
        </>
      }
      body={
        <>
          Ready to see your Revit models in the field?
          <br />
          Send your specs to{" "}
          <a
            href={`mailto:${email}`}
            className="border-b border-orange-400/30 text-orange-400 no-underline hover:border-orange-400"
          >
            {email}
          </a>{" "}
          and we&apos;ll sync your site in AR.
        </>
      }
      actions={
        <>
          <Link
            data-arbim-cursor
            href={primaryHref}
            className="relative flex items-center gap-2 rounded-md border border-orange-400 bg-orange-400 px-8 py-3 text-[13px] font-semibold tracking-[0.07em] text-white uppercase shadow-[0_0_24px_rgb(245_138_11/0.35)] transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-[0_0_44px_rgb(245_138_11/0.55)]"
          >
            Start AR sync <MoveRight />
          </Link>
          <a
            data-arbim-cursor
            href="https://deltaarbim.tech/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-md border-[1.5px] border-white/30 bg-transparent px-6 py-3.5 text-xs font-semibold tracking-[0.08em] text-white uppercase transition-[border-color,background,transform] hover:-translate-y-0.5 hover:border-orange-400 hover:bg-orange-400/8"
          >
            View Deltaarbim
          </a>
        </>
      }
    />
  );
}

"use client";

import { IdentitySection } from "@/components/shared/IdentitySection";

export default function Identity() {
  return (
    <IdentitySection
      sectionId="recon-identity"
      eyebrow="Global identity"
      title={
        <>
          Built in Bharat,
          <br />
          <span className="text-orange-400">Delivered Globally.</span>
        </>
      }
      description={
        <>
          Proudly engineered in Bharat, delivering complex development solutions that move
          industries forward. Our team combines 10+ years of corporate leadership with 3+ years of
          focused Shivlam innovation — building 3D reconstruction tools that rival global
          benchmarks.
        </>
      }
      quote={
        <>“We bridge the gap between physical reality and high-fidelity digital models — one LiDAR scan at a time.”</>
      }
      primaryCta={{ href: "/contact-us", label: <>Start a project</> }}
      secondaryCta={{ href: "/", label: <>Shivlam.com</> }}
    />
  );
}

"use client";

import { IdentitySection } from "@/components/shared/IdentitySection";

export default function Identity() {
  return (
    <IdentitySection
      sectionId="arvr-identity"
      eyebrow="Shivlam identity"
      title={
        <>
          Bharat-Based
          <br />
          <span className="text-orange-400">Global Innovation.</span>
        </>
      }
      description="Proudly engineered in Bharat, providing scalable tech services for the global market. Our team combines 10+ years of corporate leadership with 50+ successfully shipped projects spanning AR, VR, mobile, and enterprise platforms."
      quote={<>“We engineer high-performance immersive ecosystems that bridge the gap between legacy stability and next-gen agility.”</>}
      primaryCta={{ href: "/contact-us", label: <>Start a project</> }}
      secondaryCta={{ href: "/", label: <>Shivlam.com</> }}
    />
  );
}


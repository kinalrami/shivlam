"use client";

import { SectionIntro } from "@/components/shared/section-chrome";
import NetworkFeedbackMap from "@/components/views/home/NetworkFeedbackMap";

type Props = {
  eyebrowStyle?: "rule" | "dash";
};

export default function Feedback({ eyebrowStyle = "rule" }: Props) {
  return (
    <section
      id="clients"
      aria-labelledby="network-feedback-heading"
      className="relative scroll-mt-24 pb-12 md:pb-20"
    >
      <div className="mx-auto max-w-325 px-5 md:px-12">
        <SectionIntro
          id="network-feedback-heading"
          eyebrow="Our clients"
          eyebrowStyle={eyebrowStyle}
          lead="Our Client's are Celebrating Success with Sharing Joy."
        />

        <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/3 shadow-2xl backdrop-blur-2xl transition-[border-color,box-shadow] duration-200 hover:border-white/15">
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            style={{
              boxShadow:
                "0 0 0 2px color-mix(in srgb, var(--sl-saffron) 85%, transparent), 0 0 48px color-mix(in srgb, var(--sl-saffron) 18%, transparent)",
            }}
            aria-hidden
          />
          <div className="relative p-1 sm:p-1.5">
            <NetworkFeedbackMap />
          </div>
        </div>
      </div>
    </section>
  );
}

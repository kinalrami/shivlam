"use client";

import type { ReactNode } from "react";
import { AndroidArcoreCanvas } from "@/components/shared/AndroidArcoreCanvas";
import { ArFoundationCanvas } from "@/components/shared/ArFoundationCanvas";
import { IphoneArVrCanvas } from "@/components/shared/IphoneArVrCanvas";
import { IphoneVisionOsCanvas } from "@/components/shared/IphoneVisionOsCanvas";
import {
  ArShowcaseSection,
  type ArShowcaseFeatureItem,
} from "@/components/shared/ArShowcaseSection";
import type {
  ArFoundationFeatureContent,
  ArFoundationFeatureIcon,
  ArFoundationSectionContent,
} from "@/components/shared/arFoundationTypes";
import type {
  AndroidArFeatureContent,
  AndroidArFeatureIcon,
  AndroidArShowcaseContent,
  IphoneArVrFeatureIcon,
  IphoneArVrShowcaseContent,
  IphoneVisionOsShowcaseContent,
} from "@/components/shared/arShowcaseTypes";

/* ── Flutter feature icons ── */

function FlutterFeatureIcon({ name }: { name: ArFoundationFeatureIcon }) {
  const common = "size-4";
  switch (name) {
    case "plugin":
      return (
        <svg className={common} viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M2 8h5M9 8h5" stroke="#54C5F8" strokeWidth="1.3" strokeLinecap="round" />
          <rect x="5" y="5" width="6" height="6" rx="1.5" stroke="#54C5F8" strokeWidth="1.3" />
        </svg>
      );
    case "cube":
      return (
        <svg className={common} viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M8 2v3M8 11v3M2 8h3M11 8h3" stroke="#FF9933" strokeWidth="1.3" strokeLinecap="round" />
          <circle cx="8" cy="8" r="3" stroke="#FF9933" strokeWidth="1.3" />
        </svg>
      );
    case "reload":
      return (
        <svg className={common} viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M3 8l3 3 7-7" stroke="#3DDC84" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "stores":
      return (
        <svg className={common} viewBox="0 0 16 16" fill="none" aria-hidden>
          <rect x="3" y="4" width="5" height="8" rx="1" stroke="#54C5F8" strokeWidth="1.3" />
          <rect x="8.5" y="4" width="5" height="8" rx="1.5" stroke="#54C5F8" strokeWidth="1.3" />
          <path d="M8 8h.5" stroke="#54C5F8" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

function flutterIconWrap(icon: ArFoundationFeatureIcon): string {
  switch (icon) {
    case "plugin":
      return "border-[rgba(84,197,248,.2)] bg-[rgba(84,197,248,.1)]";
    case "cube":
      return "border-[rgba(255,153,51,.2)] bg-[rgba(255,153,51,.1)]";
    case "reload":
      return "border-[rgba(61,220,132,.2)] bg-[rgba(61,220,132,.1)]";
    case "stores":
      return "border-[rgba(84,197,248,.2)] bg-[rgba(84,197,248,.1)]";
    default:
      return "";
  }
}

function mapFlutterFeatures(items: readonly ArFoundationFeatureContent[]): ArShowcaseFeatureItem[] {
  return items.map((f) => ({
    key: f.title,
    title: f.title,
    desc: f.desc,
    icon: <FlutterFeatureIcon name={f.icon} />,
    iconWrapClass: flutterIconWrap(f.icon),
  }));
}

/* ── Android feature icons ── */

function AndroidFeatureIcon({ name }: { name: AndroidArFeatureIcon }) {
  const common = "size-4";
  switch (name) {
    case "motion":
      return (
        <svg className={common} viewBox="0 0 16 16" fill="none" aria-hidden>
          <rect x="2" y="2" width="12" height="12" rx="2" stroke="#3DDC84" strokeWidth="1.3" />
          <path d="M5 8h6M8 5v6" stroke="#3DDC84" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      );
    case "cloud":
      return (
        <svg className={common} viewBox="0 0 16 16" fill="none" aria-hidden>
          <circle cx="8" cy="8" r="5" stroke="#FF9933" strokeWidth="1.3" />
          <path d="M8 3v2M8 11v2M3 8h2M11 8h2" stroke="#FF9933" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      );
    case "depth":
      return (
        <svg className={common} viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M3 13L8 3l5 10H3z" stroke="#1DCFCF" strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M5.5 10h5" stroke="#1DCFCF" strokeWidth="1" strokeLinecap="round" />
        </svg>
      );
    case "geo":
      return (
        <svg className={common} viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M2 8h4M10 8h4M8 2v4M8 10v4" stroke="#3DDC84" strokeWidth="1.3" strokeLinecap="round" />
          <circle cx="8" cy="8" r="2" stroke="#3DDC84" strokeWidth="1.3" />
        </svg>
      );
    default:
      return null;
  }
}

function androidIconWrap(icon: AndroidArFeatureIcon): string {
  switch (icon) {
    case "motion":
      return "border-[rgba(61,220,132,.2)] bg-[rgba(61,220,132,.1)]";
    case "cloud":
      return "border-[rgba(255,153,51,.2)] bg-[rgba(255,153,51,.1)]";
    case "depth":
      return "border-[rgba(29,207,207,.2)] bg-[rgba(29,207,207,.1)]";
    case "geo":
      return "border-[rgba(61,220,132,.2)] bg-[rgba(61,220,132,.1)]";
    default:
      return "";
  }
}

function mapAndroidFeatures(items: readonly AndroidArFeatureContent[]): ArShowcaseFeatureItem[] {
  return items.map((f) => ({
    key: f.title,
    title: f.title,
    desc: f.desc,
    icon: <AndroidFeatureIcon name={f.icon} />,
    iconWrapClass: androidIconWrap(f.icon),
  }));
}

/* ── iPhone AR/VR feature icons ── */

function IphoneArVrFeatureIcon({ name }: { name: IphoneArVrFeatureIcon }) {
  const common = "size-4";
  switch (name) {
    case "world":
      return (
        <svg className={common} viewBox="0 0 16 16" fill="none" aria-hidden>
          <rect x="2" y="2" width="12" height="12" rx="2" stroke="#FF9933" strokeWidth="1.3" />
          <path d="M5 8h6M8 5v6" stroke="#FF9933" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      );
    case "lidar":
      return (
        <svg className={common} viewBox="0 0 16 16" fill="none" aria-hidden>
          <circle cx="8" cy="8" r="5" stroke="#1DCFCF" strokeWidth="1.3" />
          <path d="M8 3v2M8 11v2M3 8h2M11 8h2" stroke="#1DCFCF" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      );
    case "face":
      return (
        <svg className={common} viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M3 13L8 3l5 10H3z" stroke="#FF9933" strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M5.5 10h5" stroke="#FF9933" strokeWidth="1" strokeLinecap="round" />
        </svg>
      );
    case "object":
      return (
        <svg className={common} viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M2 8h4M10 8h4M8 2v4M8 10v4" stroke="#1DCFCF" strokeWidth="1.3" strokeLinecap="round" />
          <circle cx="8" cy="8" r="2" stroke="#1DCFCF" strokeWidth="1.3" />
        </svg>
      );
    default:
      return null;
  }
}

function iphoneArVrIconWrap(icon: IphoneArVrFeatureIcon): string {
  switch (icon) {
    case "world":
    case "face":
      return "border-[rgba(255,153,51,.2)] bg-[rgba(255,153,51,.1)]";
    case "lidar":
    case "object":
      return "border-[rgba(29,207,207,.2)] bg-[rgba(29,207,207,.1)]";
    default:
      return "";
  }
}

function mapIphoneArVrFeatures(
  items: readonly { icon: IphoneArVrFeatureIcon; title: string; desc: string }[],
): ArShowcaseFeatureItem[] {
  return items.map((f) => ({
    key: f.title,
    title: f.title,
    desc: f.desc,
    icon: <IphoneArVrFeatureIcon name={f.icon} />,
    iconWrapClass: iphoneArVrIconWrap(f.icon),
  }));
}

/** Default Dart snippet for Flutter AR Foundation sections */
export function ArFoundationFlutterDartSnippet() {
  return (
    <div className="mb-6 overflow-hidden rounded-lg border border-[rgba(84,197,248,.15)] bg-[#1e1e1e]">
      <div className="flex items-center gap-2 border-b border-white/[0.05] bg-[#2d2d2d] px-3.5 py-2">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#2aca44]" />
        <span className="ml-1.5 font-mono text-[9px] text-white/40">ar_view_widget.dart</span>
        <span className="ml-auto font-mono text-[8px] text-[#54C5F8]">Dart 3.3</span>
      </div>
      <div className="px-4 py-3.5 font-mono text-[10px] leading-[1.75]">
        <p className="whitespace-pre text-[#c792ea]">
          import <span className="text-[#c3e88d]">{`'package:ar_flutter_plugin/ar_flutter_plugin.dart'`}</span>;
        </p>
        <p className="whitespace-pre">&nbsp;</p>
        <p className="whitespace-pre">
          <span className="text-[#c792ea]">class </span>
          <span className="text-[#54c5f8]">ARScene </span>
          <span className="text-[#c792ea]">extends </span>
          <span className="text-[#54c5f8]">StatefulWidget </span>
          {"{"}
        </p>
        <p className="whitespace-pre">
          {"  "}
          <span className="text-[#82aaff]">ARView</span>(
        </p>
        <p className="whitespace-pre">
          {"    "}
          <span className="text-[#ff9933]">onARViewCreated</span>: <span className="text-[#82aaff]">_onARViewCreated</span>,
        </p>
        <p className="whitespace-pre">
          {"    "}
          <span className="text-[#ff9933]">planeDetectionConfig</span>:{" "}
          <span className="text-[#54c5f8]">PlaneDetectionConfig</span>.<span className="text-[#82aaff]">horizontal</span>,
        </p>
        <p className="whitespace-pre text-[#546e7a]">{"    "}// Runs ARKit on iOS, ARCore on Android</p>
        <p className="whitespace-pre">{"  "});</p>
        <p className="whitespace-pre">{"}"}</p>
      </div>
    </div>
  );
}

export type ArMarketingShowcaseProps =
  | {
      variant: "flutter";
      content: ArFoundationSectionContent;
      codeSnippet?: ReactNode;
    }
  | {
      variant: "android";
      content: AndroidArShowcaseContent;
    }
  | {
      variant: "iphone-arvr";
      content: IphoneArVrShowcaseContent;
    }
  | {
      variant: "iphone-visionos";
      content: IphoneVisionOsShowcaseContent;
    };

/**
 * Single entry for Flutter AR Foundation + Android ARCore marketing blocks.
 * Same layout as {@link ArShowcaseSection}; only canvas, badges, column order, and optional blocks differ.
 */
export function ArMarketingShowcase(props: ArMarketingShowcaseProps) {
  if (props.variant === "flutter") {
    const c = props.content;
    const code = props.codeSnippet ?? <ArFoundationFlutterDartSnippet />;

    const visual = (
      <>
        <div className="overflow-hidden rounded-xl border-[1.5px] border-[rgba(84,197,248,.25)] bg-[#080818] shadow-[0_0_60px_rgba(84,197,248,.07)]">
          <ArFoundationCanvas />
        </div>
        <div className="mt-3.5 flex flex-wrap gap-2.5">
          <span className="rounded border border-[rgba(84,197,248,.25)] bg-[rgba(84,197,248,.1)] px-3 py-1 font-mono text-[8px] tracking-[0.1em] text-[rgba(84,197,248,.9)] uppercase">
            {c.canvasBadges.ios}
          </span>
          <span className="rounded border border-[rgba(61,220,132,.25)] bg-[rgba(61,220,132,.1)] px-3 py-1 font-mono text-[8px] tracking-[0.1em] text-[rgba(61,220,132,.9)] uppercase">
            {c.canvasBadges.android}
          </span>
          <span className="rounded border border-[rgba(255,153,51,.25)] bg-[rgba(255,153,51,.1)] px-3 py-1 font-mono text-[8px] tracking-[0.1em] text-[rgba(255,153,51,.85)] uppercase">
            {c.canvasBadges.oneCodebase}
          </span>
        </div>
      </>
    );

    const afterIntro = (
      <>
        <div className="mb-5 flex flex-wrap gap-2.5">
          <div className="flex items-center gap-2 rounded-md border border-[rgba(84,197,248,.25)] bg-[rgba(84,197,248,.1)] px-3.5 py-2 font-mono text-[9px] tracking-[0.1em] text-[rgba(84,197,248,.9)] uppercase">
            <span className="size-1.5 shrink-0 rounded-full bg-[#54C5F8]" aria-hidden />
            {c.platformRow.ios}
          </div>
          <div className="flex items-center gap-2 rounded-md border border-[rgba(61,220,132,.25)] bg-[rgba(61,220,132,.1)] px-3.5 py-2 font-mono text-[9px] tracking-[0.1em] text-[rgba(61,220,132,.9)] uppercase">
            <span className="size-1.5 shrink-0 rounded-full bg-[#3DDC84]" aria-hidden />
            {c.platformRow.android}
          </div>
        </div>
        {code}
      </>
    );

    return (
      <ArShowcaseSection
        sectionId={c.sectionId}
        headingId={c.headingId}
        eyebrow={c.eyebrow}
        titleLines={c.titleLines}
        description={c.description}
        visual={visual}
        visualPosition="start"
        afterIntro={afterIntro}
        features={mapFlutterFeatures(c.features)}
        compare={undefined}
        pills={c.pills.map((p) => ({
          label: p.label,
          variant: p.variant as "cyan" | "orange" | "green" | "muted",
        }))}
        primaryCta={c.primaryCta}
        secondaryCta={c.secondaryCta}
      />
    );
  }

  if (props.variant === "iphone-arvr") {
    const c = props.content;
    const visual = (
      <>
        <div className="overflow-hidden rounded-xl border-[1.5px] border-[rgba(255,153,51,.25)] bg-[#0A1B33] shadow-[0_0_60px_rgba(255,153,51,.08)]">
          <IphoneArVrCanvas />
        </div>
        <div className="mt-3.5 flex flex-wrap gap-2.5">
          <span className="rounded border border-[rgba(255,153,51,.25)] bg-[rgba(255,153,51,.1)] px-3 py-1 font-mono text-[8px] tracking-[0.1em] text-[rgba(255,153,51,.85)] uppercase">
            {c.canvasBadges.lidar}
          </span>
          <span className="rounded border border-[rgba(29,207,207,.22)] bg-[rgba(29,207,207,.08)] px-3 py-1 font-mono text-[8px] tracking-[0.1em] text-[rgba(29,207,207,.85)] uppercase">
            {c.canvasBadges.realitykit}
          </span>
          <span className="rounded border border-[rgba(34,197,94,.22)] bg-[rgba(34,197,94,.08)] px-3 py-1 font-mono text-[8px] tracking-[0.1em] text-[rgba(34,197,94,.85)] uppercase">
            {c.canvasBadges.plane}
          </span>
        </div>
      </>
    );

    return (
      <ArShowcaseSection
        sectionId={c.sectionId}
        headingId={c.headingId}
        eyebrow={c.eyebrow}
        titleLines={c.titleLines}
        description={c.description}
        visual={visual}
        visualPosition="start"
        features={mapIphoneArVrFeatures(c.features)}
        pills={c.pills.map((p) => ({
          label: p.label,
          variant: p.variant as "cyan" | "orange" | "green" | "muted" | "purple",
        }))}
        primaryCta={c.primaryCta}
        secondaryCta={c.secondaryCta}
      />
    );
  }

  if (props.variant === "iphone-visionos") {
    const c = props.content;
    const visual = (
      <>
        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#1a1814] shadow-[0_8px_40px_rgb(0_0_0/0.35)]">
          <IphoneVisionOsCanvas />
        </div>
        <div className="mt-3.5 flex flex-wrap gap-2.5">
          <span className="rounded border border-[rgba(192,132,252,.25)] bg-[rgba(192,132,252,.1)] px-3 py-1 font-mono text-[8px] tracking-[0.1em] text-[rgba(192,132,252,.85)] uppercase">
            {c.canvasBadges.visionos}
          </span>
          <span className="rounded border border-white/15 bg-white/[0.06] px-3 py-1 font-mono text-[8px] tracking-[0.1em] text-white/50 uppercase">
            {c.canvasBadges.realitykit}
          </span>
          <span className="rounded border border-[rgba(255,153,51,.2)] bg-[rgba(255,153,51,.08)] px-3 py-1 font-mono text-[8px] tracking-[0.1em] text-[rgba(255,153,51,.8)] uppercase">
            {c.canvasBadges.spatial}
          </span>
        </div>
      </>
    );

    return (
      <ArShowcaseSection
        sectionId={c.sectionId}
        headingId={c.headingId}
        eyebrow={c.eyebrow}
        titleLines={c.titleLines}
        description={c.description}
        visual={visual}
        visualPosition="end"
        features={[]}
        cardGrid={c.cardGrid}
        pills={c.pills.map((p) => ({
          label: p.label,
          variant: p.variant === "purple" ? "purple" : "muted",
        }))}
        primaryCta={c.primaryCta}
        secondaryCta={c.secondaryCta}
      />
    );
  }

  const c = props.content;

  const visual = (
    <>
      <div className="overflow-hidden rounded-xl border-[1.5px] border-[rgba(61,220,132,.25)] bg-[#0A1B33] shadow-[0_0_60px_rgba(61,220,132,.06)]">
        <AndroidArcoreCanvas />
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2.5">
        <span className="rounded border border-[rgba(61,220,132,.25)] bg-[rgba(61,220,132,.1)] px-3 py-1 font-mono text-[8px] tracking-[0.1em] text-[rgba(61,220,132,.85)] uppercase">
          {c.canvasBadges.arcore}
        </span>
        <span className="rounded border border-[rgba(255,153,51,.25)] bg-[rgba(255,153,51,.1)] px-3 py-1 font-mono text-[8px] tracking-[0.1em] text-[rgba(255,153,51,.85)] uppercase">
          {c.canvasBadges.geospatial}
        </span>
        <span className="rounded border border-[rgba(29,207,207,.22)] bg-[rgba(29,207,207,.08)] px-3 py-1 font-mono text-[8px] tracking-[0.1em] text-[rgba(29,207,207,.85)] uppercase">
          {c.canvasBadges.depth}
        </span>
      </div>
    </>
  );

  return (
    <ArShowcaseSection
      sectionId={c.sectionId}
      headingId={c.headingId}
      eyebrow={c.eyebrow}
      titleLines={c.titleLines}
      description={c.description}
      visual={visual}
      visualPosition="end"
      features={mapAndroidFeatures(c.features)}
      compare={{ eyebrow: c.compareEyebrow, cards: c.compareCards }}
      pills={c.pills}
      primaryCta={c.primaryCta}
      secondaryCta={c.secondaryCta}
    />
  );
}

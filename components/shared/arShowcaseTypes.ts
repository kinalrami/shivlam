/** Shared title line parts for AR marketing sections */
export type ArShowcaseTitlePart = { text: string; emphasis?: boolean };

export type AndroidArFeatureIcon = "motion" | "cloud" | "depth" | "geo";

export type AndroidArFeatureContent = {
  icon: AndroidArFeatureIcon;
  title: string;
  desc: string;
};

export type AndroidArPillVariant = "green" | "orange" | "muted";

export type AndroidArCompareCard = {
  variant: "green" | "orange";
  tag: string;
  title: string;
  desc: string;
};

export type AndroidArShowcaseContent = {
  sectionId: string;
  headingId: string;
  eyebrow: string;
  titleLines: readonly (readonly ArShowcaseTitlePart[])[];
  description: string;
  features: readonly AndroidArFeatureContent[];
  compareEyebrow: string;
  compareCards: readonly AndroidArCompareCard[];
  pills: readonly { label: string; variant: AndroidArPillVariant }[];
  canvasBadges: { arcore: string; geospatial: string; depth: string };
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

/** Multi-line centered title for AR / platform mid-CTAs */
export type MidCtaTitleSegment = {
  text: string;
  /** default = white / sl-text via SectionIntro */
  tone?: "default" | "saffron" | "green";
};

export type MidCtaTitleLine = {
  segments: readonly MidCtaTitleSegment[];
};

export type SpatialMidCtaContent = {
  sectionId: string;
  headingId: string;
  eyebrow: string;
  titleLines: readonly MidCtaTitleLine[];
  lead: string;
  stats: readonly { value: string; label: string }[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

/** @deprecated Use SpatialMidCtaContent */
export type AndroidArMidCtaContent = SpatialMidCtaContent;

export type IphoneArVrFeatureIcon = "world" | "lidar" | "face" | "object";

export type IphoneArVrShowcaseContent = {
  sectionId: string;
  headingId: string;
  eyebrow: string;
  titleLines: readonly (readonly ArShowcaseTitlePart[])[];
  description: string;
  features: readonly { icon: IphoneArVrFeatureIcon; title: string; desc: string }[];
  pills: readonly { label: string; variant: "orange" | "cyan" | "muted" }[];
  canvasBadges: { lidar: string; realitykit: string; plane: string };
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

export type IphoneVisionOsShowcaseContent = {
  sectionId: string;
  headingId: string;
  eyebrow: string;
  titleLines: readonly (readonly ArShowcaseTitlePart[])[];
  description: string;
  cardGrid: readonly { tag: string; title: string; desc: string }[];
  pills: readonly { label: string; variant: "purple" | "muted" }[];
  canvasBadges: { visionos: string; realitykit: string; spatial: string };
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

/** Game development landing — AR deep dive feature row icons */
export type GameArDeepDiveFeatureIcon = "plus" | "target" | "check";

export type GameArDeepDiveFeatureContent = {
  icon: GameArDeepDiveFeatureIcon;
  title: string;
  desc: string;
};

export type GameArDeepDiveContent = {
  sectionId: string;
  headingId: string;
  eyebrow: string;
  titleLines: readonly (readonly ArShowcaseTitlePart[])[];
  description: string;
  features: readonly GameArDeepDiveFeatureContent[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

/** Game development landing — Vision Pro deep dive (navy section, badges + 2×2 cards) */
export type GameVisionProDeepDiveContent = {
  sectionId: string;
  headingId: string;
  eyebrow: string;
  titleLines: readonly (readonly ArShowcaseTitlePart[])[];
  description: string;
  pills: readonly { label: string; variant: "purple" | "cyan" | "orange" }[];
  cardGrid: readonly { tag: string; title: string; desc: string }[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

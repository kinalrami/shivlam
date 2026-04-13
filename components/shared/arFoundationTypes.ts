/** Single title line: array of text spans; `emphasis` uses brand orange */
export type ArFoundationTitlePart = { text: string; emphasis?: boolean };

export type ArFoundationFeatureIcon = "plugin" | "cube" | "reload" | "stores";

export type ArFoundationFeatureContent = {
  icon: ArFoundationFeatureIcon;
  title: string;
  desc: string;
};

export type ArFoundationPillVariant = "cyan" | "orange";

export type ArFoundationSectionContent = {
  sectionId: string;
  headingId: string;
  eyebrow: string;
  /** Each inner array renders as one line (block) */
  titleLines: readonly (readonly ArFoundationTitlePart[])[];
  description: string;
  canvasBadges: { ios: string; android: string; oneCodebase: string };
  platformRow: { ios: string; android: string };
  features: readonly ArFoundationFeatureContent[];
  pills: readonly { label: string; variant: ArFoundationPillVariant }[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

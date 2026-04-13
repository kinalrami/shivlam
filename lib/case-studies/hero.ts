export const CASE_STUDIES_HERO = {
  label: "Case Studies · Shivlam",
  titleLine1: "The Full Story",
  titleLine2Before: "Behind Every ",
  titleEm: "Build.",
  description:
    "Real problems. Real decisions. Real results. We're writing in-depth case studies for our most impactful projects — from iOS apps and AR tools to Unity games and brand-building campaigns.",
  progressPct: "35% Complete",
  progressLabel: "Writing Progress",
  primaryCta: { label: "View Work Portfolio", href: "/work-portfolio" },
  secondaryCta: { label: "Start a Project", href: "https://shivlam.com/contact-us/" },
  emailNote: "hi@shivlam.com",
  notifyPill: "Notify me when case studies drop",
  notifyPillBtn: "Get Notified →",
} as const;

export const CASE_STUDIES_PROGRESS_ROWS = [
  {
    dot: "bg-[#54C5F8]",
    delay: "0s",
    name: "iPhone & AR",
    status: "● Writing now",
    barDuration: "2.8s",
  },
  {
    dot: "bg-[#AAAAFF]",
    delay: "0.4s",
    name: "Games",
    status: "● Writing now",
    barDuration: "3.2s",
  },
  {
    dot: "bg-[#22c55e]",
    delay: "0.8s",
    name: "Web & Design",
    status: "● Soon",
    barDuration: "2s",
  },
  {
    dot: "bg-orange-400",
    delay: "1.2s",
    name: "Brand Building",
    status: "● Soon",
    barDuration: "1.6s",
  },
] as const;

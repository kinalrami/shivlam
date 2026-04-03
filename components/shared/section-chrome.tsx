import type { ReactNode } from "react";

export function SectionHeadingRow({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <h2
        id={id}
        className="font-label text-xs font-medium uppercase text-sl-saffron"
      >
        {children}
      </h2>
      <div
        className="hidden h-px flex-1 bg-linear-to-r from-transparent via-gray-800 to-transparent sm:block"
        aria-hidden
      />
    </div>
  );
}

export function SectionLead({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={[
        "max-w-4xl font-sans text-base font-light leading-relaxed text-gray-400",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </p>
  );
}

/** Eyebrow + optional large title + lead as one semantic block (matches home sections). */
export function SectionIntro({
  id,
  eyebrow,
  title,
  lead,
  className,
}: {
  id: string;
  eyebrow: ReactNode;
  title?: ReactNode;
  lead: ReactNode;
  className?: string;
}) {
  return (
    <header className={["mb-8 space-y-4", className].filter(Boolean).join(" ")}>
      <div className="flex items-center justify-between gap-4">
        <h2
          id={id}
          className="font-label text-xs font-medium uppercase text-sl-saffron"
        >
          {eyebrow}
        </h2>
        <div
          className="hidden h-px flex-1 bg-linear-to-r from-transparent via-gray-800 to-transparent sm:block"
          aria-hidden
        />
      </div>
      {title != null ? (
        <h3 className="max-w-4xl font-sans text-[clamp(1.65rem,4vw,2.5rem)] font-extrabold leading-[1.12] tracking-tight text-sl-text">
          {title}
        </h3>
      ) : null}
      <SectionLead>{lead}</SectionLead>
    </header>
  );
}

export function FilterRailSeparator() {
  return (
    <span
      className="hidden h-4 w-px shrink-0 bg-[#1a1e2e] sm:block"
      aria-hidden
    />
  );
}

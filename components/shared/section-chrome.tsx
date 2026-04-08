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
        "max-w-4xl! font-sans text-base font-light leading-relaxed text-gray-400",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </p>
  );
}

export function SectionIntro({
  id,
  eyebrow,
  title,
  lead,
  className,
  align = "left",
  fullWidth = false,
  eyebrowStyle = "rule",
}: {
  id: string;
  eyebrow?: ReactNode;
  title?: ReactNode;
  lead?: ReactNode;
  className?: string;
  align?: "left" | "center";
  fullWidth?: boolean;
  /**
   * - `rule` (default): shows the grey gradient rule around/after eyebrow (your 2nd screenshot)
   * - `dash`: compact orange dash + eyebrow (your 1st screenshot)
   */
  eyebrowStyle?: "rule" | "dash";
}) {
  const isCenter = align === "center";
  const titleWidth = fullWidth ? "max-w-none" : "max-w-4xl";
  const leadExtra =
    [isCenter && "mx-auto text-center", fullWidth && "max-w-none"]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <header className={["mb-8 space-y-4", className].filter(Boolean).join(" ")}>
      {eyebrow != null ? (
        isCenter ? (
          eyebrowStyle === "dash" ? (
            <div className="flex items-center justify-center gap-2">
              <span className="h-0.5 w-5 bg-sl-saffron" aria-hidden />
              <h2
                id={id}
                className="font-label text-xs font-medium uppercase text-sl-saffron"
              >
                {eyebrow}
              </h2>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-3">
              <div
                className="hidden h-px w-10 shrink-0 bg-linear-to-r from-transparent to-gray-800 sm:block"
                aria-hidden
              />
              <h2
                id={id}
                className="font-label text-xs font-medium uppercase text-sl-saffron"
              >
                {eyebrow}
              </h2>
              <div
                className="hidden h-px w-10 shrink-0 bg-linear-to-l from-transparent to-gray-800 sm:block"
                aria-hidden
              />
            </div>
          )
        ) : (
          eyebrowStyle === "dash" ? (
            <div className="flex items-center gap-2">
              <span className="h-0.5 w-5 bg-sl-saffron" aria-hidden />
              <h2
                id={id}
                className="font-label text-xs font-medium uppercase text-sl-saffron"
              >
                {eyebrow}
              </h2>
            </div>
          ) : (
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
          )
        )
      ) : null}
      {title != null ? (
        <h3
          className={[
            "font-sans text-[clamp(1.65rem,4vw,2.5rem)] font-extrabold leading-[1.12] tracking-tight text-sl-text",
            titleWidth,
            isCenter ? "mx-auto text-center" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {title}
        </h3>
      ) : null}
      {lead != null ? <SectionLead className={leadExtra}>{lead}</SectionLead> : null}
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

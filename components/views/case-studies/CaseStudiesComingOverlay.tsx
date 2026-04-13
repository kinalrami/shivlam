export function CaseStudiesComingOverlay({
  label,
  sub,
}: {
  label: string;
  sub: string;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[rgba(10,27,51,.65)]">
      <div className="flex size-12 items-center justify-center rounded-xl border border-orange-400/30 bg-orange-400/15">
        <svg className="size-[22px]" viewBox="0 0 22 22" fill="none" aria-hidden>
          <path
            d="M11 3v5M11 14v5M3 11h5M14 11h5"
            stroke="var(--sl-saffron, #FF9933)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="11" cy="11" r="3" stroke="var(--sl-saffron, #FF9933)" strokeWidth="1.5" />
        </svg>
      </div>
      <span className="font-mono text-[9px] tracking-[0.18em] text-orange-400/90 uppercase">{label}</span>
      <span className="font-mono text-[8px] tracking-[0.1em] text-white/35 uppercase">{sub}</span>
    </div>
  );
}

export type StatsStripItem = { value: string; label: string };

type Props = {
  items: readonly StatsStripItem[];
};

export function StatsStrip({ items }: Props) {
  return (
    <section className="bg-[#060606]">
      <div className="mx-auto max-w-325 px-5 py-12 md:py-20 md:px-12">
        <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4 md:gap-10">
          {items.map((s) => (
            <div key={`${s.value}-${s.label}`} className="">
              {/* rounded-xl border border-white/5 bg-white/[0.02] p-5 */}
              <div className="font-sans text-3xl font-extrabold tracking-tight text-orange-400 md:text-4xl">
                {s.value}
              </div>
              <div className="mt-2 font-mono text-[10px] tracking-[0.18em] text-white/40 uppercase">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


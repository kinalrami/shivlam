"use client";

type Props = {
  items: readonly string[];
};

export default function Marquee({ items }: Props) {
  return (
    <div className="overflow-hidden border-t-2 border-orange-400 bg-[#060606] py-3">
      <div className="flex w-max animate-[arbim-dev-marquee_24s_linear_infinite]">
        {items.map((t, i) => (
          <div
            key={`${t}-${i}`}
            className="flex items-center gap-6 whitespace-nowrap px-7 font-mono text-[10px] tracking-[0.2em] text-white/30"
          >
            {t} <b className="font-normal text-orange-400">·</b>
          </div>
        ))}
      </div>
    </div>
  );
}

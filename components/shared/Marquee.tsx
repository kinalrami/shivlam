"use client";

import { useMemo } from "react";

type Props = {
  items: readonly string[];
  /** How many times to duplicate items for a continuous track. */
  repeat?: number;
  /** Tailwind className passthrough for spacing tweaks. */
  className?: string;
};

export function Marquee({ items, repeat = 2, className }: Props) {
  const track = useMemo(() => {
    const out: string[] = [];
    const reps = Math.max(1, Math.floor(repeat));
    for (let i = 0; i < reps; i++) out.push(...items);
    return out;
  }, [items, repeat]);

  return (
    <div className={["overflow-hidden border-t-2 border-orange-400 bg-[#060606] py-3", className].filter(Boolean).join(" ")}>
      <div className="flex w-max animate-[arbim-dev-marquee_24s_linear_infinite]">
        {track.map((t, i) => (
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


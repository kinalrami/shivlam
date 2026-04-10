"use client";

type Props = {
  topLeft: string;
  topRight: string;
};

export function AndroidHeroPhone({ topLeft, topRight }: Props) {
  return (
    <div className="absolute inset-0 z-[2] bg-[#0b1f36] text-white">
      {/* screen padding */}
      <div className="px-[18px] pt-[46px] pb-[62px]">
        {/* Status bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-1">
          <span className="inline-flex items-center gap-1.5 font-mono text-[9px] text-white/55 uppercase">
            <span className="size-1.5 rounded-full bg-[#22c55e] shadow-[0_0_10px_rgb(34_197_94/0.35)]" />
            {topLeft}
          </span>
          <span className="truncate font-mono text-[8px] text-[#22c55e] uppercase">
            ⬡ {topRight}
          </span>
        </div>

        {/* Header */}
        <div className="mt-3 flex items-center justify-between">
          <span className="font-sans text-[11px] font-semibold text-white/65">Dashboard</span>
          <span className="font-mono text-[10px] tracking-[0.08em] text-orange-400">9:41</span>
        </div>
        <div className="mt-0.5 font-mono text-[9px] tracking-[0.06em] text-white/24">
          Welcome back, User
        </div>

        {/* Stats */}
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[
            { num: "24", lbl: "ACTIVE" },
            { num: "138", lbl: "ORDERS" },
            { num: "4.9", lbl: "REVIEWS" },
          ].map((s) => (
            <div
              key={s.lbl}
              className="rounded-lg border border-[#21415f] bg-[#102a46]/70 px-2.5 py-2.5 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.02)]"
            >
              <div className="font-sans text-[14px] font-extrabold leading-none text-[#36d9d9]">
                {s.num}
              </div>
              <div className="mt-1 font-mono text-[8px] tracking-[0.16em] text-white/25 uppercase">
                {s.lbl}
              </div>
            </div>
          ))}
        </div>

        {/* List items */}
        <div className="mt-3 space-y-2">
          <div className="relative overflow-hidden rounded-lg border border-[#21415f] bg-[#102a46]/55 px-3 py-2.5">
            <span className="absolute inset-y-0 left-0 w-[3px] bg-orange-400/80" aria-hidden />
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] font-semibold text-white/75">Order #1042</div>
                <div className="font-mono text-[9px] text-white/20">Delivered ✓</div>
              </div>
              <div className="font-mono text-[11px] text-[#22c55e]">✓</div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg border border-[#21415f] bg-[#102a46]/55 px-3 py-2.5">
            <span className="absolute inset-y-0 left-0 w-[3px] bg-orange-400/80" aria-hidden />
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] font-semibold text-white/75">User Analytics</div>
                <div className="font-mono text-[9px] text-white/20">98% retention</div>
              </div>
              <div className="font-mono text-[11px] text-orange-400">→</div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg border border-[#21415f] bg-[#102a46]/55 px-3 py-2.5">
            <span className="absolute inset-y-0 left-0 w-[3px] bg-orange-400/80" aria-hidden />
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] font-semibold text-white/75">Push Notification</div>
                <div className="font-mono text-[9px] text-white/20">Sent to 2.1k</div>
              </div>
              <div className="font-mono text-[11px] text-[#36d9d9]">⬡</div>
            </div>
          </div>
        </div>

        {/* Progress bars */}
        <div className="mt-3 space-y-3">
          <div>
            <div className="mb-1 font-mono text-[8px] tracking-[0.18em] text-white/22 uppercase">
              PERFORMANCE
            </div>
            <div className="h-[3px] overflow-hidden rounded-[2px] bg-white/8">
              <div
                className="h-full w-[78%] origin-left rounded-[2px] bg-gradient-to-r from-orange-400 to-cyan-400 animate-pulse"
                style={{ animationDuration: "3s" }}
              />
            </div>
          </div>
          <div>
            <div className="mb-1 font-mono text-[8px] tracking-[0.18em] text-white/22 uppercase">
              MEMORY
            </div>
            <div className="h-[3px] overflow-hidden rounded-[2px] bg-white/8">
              <div
                className="h-full w-[56%] origin-left rounded-[2px] bg-gradient-to-r from-orange-400 to-cyan-400 animate-pulse"
                style={{ animationDuration: "3s", animationDelay: "250ms" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="absolute inset-x-[18px] px-4 bottom-[16px] flex items-center justify-between">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={`size-3 rounded-sm ${i === 0
              ? "bg-orange-400 shadow-[0_0_10px_rgb(245_138_11/0.35)]"
              : "bg-white/15"
              }`}
          />
        ))}
      </div>
    </div>
  );
}


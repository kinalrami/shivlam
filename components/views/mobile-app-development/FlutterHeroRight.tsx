"use client";

import { useEffect, useState } from "react";

type Props = {
  /** Top-left chip text, e.g. "FLUTTER LIVE" */
  chipTopLeft: string;
  /** Bottom-right chip text, e.g. "✓ BOTH STORES READY" */
  chipBottomRight: string;
};

function PhoneFrame({ variant }: { variant: "ios" | "android" }) {
  const isIos = variant === "ios";
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={[
          "relative overflow-hidden bg-[#0D2240]",
          isIos
            ? "h-[480px] w-[220px] rounded-[32px] border-[1.5px] border-[rgba(84,197,248,0.3)] shadow-[0_0_40px_rgba(84,197,248,0.08)]"
            : "h-[480px] w-[220px] rounded-[24px] border-[1.5px] border-[rgba(255,153,51,0.3)] shadow-[0_0_40px_rgba(255,153,51,0.08)]",
        ].join(" ")}
      >
        {isIos ? (
          <div className="absolute left-1/2 top-[10px] z-[5] h-[5px] w-[48px] -translate-x-1/2 rounded-[3px] bg-black/70" />
        ) : (
          <div className="absolute left-1/2 top-[10px] z-[5] size-2 -translate-x-1/2 rounded-full border border-[rgba(84,197,248,0.2)] bg-black/70" />
        )}

        <div className="absolute inset-0 flex flex-col gap-[5px] px-2 pt-[26px] pb-[10px] font-mono">
          <div className="flex justify-between border-b border-[rgba(84,197,248,0.1)] pb-[5px] text-[9px] text-white/30">
            <span>9:41</span>
            <span className={isIos ? "text-[#54C5F8]" : "text-[#3DDC84]"}>
              {isIos ? "iOS" : "Android"}
            </span>
          </div>

          <div className="text-[11px] font-medium tracking-[0.04em] text-white/80">Flutter App</div>
          <div className="mb-1 text-[8px] tracking-[0.04em] text-white/28">SHARED · DART WIDGET</div>

          <div className="mb-1 grid grid-cols-2 gap-1">
            {[
              { n: "3.2k", l: "Users" },
              { n: "4.9★", l: "Rating" },
            ].map((s) => (
              <div
                key={s.l}
                className={[
                  "rounded-[5px] border px-1 py-[5px] text-center",
                  isIos
                    ? "border-[rgba(84,197,248,0.15)] bg-[rgba(84,197,248,0.07)]"
                    : "border-[rgba(255,153,51,0.18)] bg-[rgba(255,153,51,0.07)]",
                ].join(" ")}
              >
                <span
                  className={[
                    "block text-[14px] leading-[1.2]",
                    isIos ? "text-[#54C5F8]" : "text-[#FF9933]",
                  ].join(" ")}
                >
                  {s.n}
                </span>
                <span className="block text-[8px] tracking-[0.04em] text-white/28">{s.l}</span>
              </div>
            ))}
          </div>

          {[
            { t: "Session Time", v: "8m 24s" },
            { t: "Retention", v: "94%" },
          ].map((r) => (
            <div
              key={r.t}
              className="flex items-center justify-between rounded-[5px] border border-[rgba(255,153,51,0.14)] bg-[rgba(255,153,51,0.06)] px-[7px] py-[5px]"
            >
              <span className="text-[9px] tracking-[0.04em] text-white/55">{r.t}</span>
              <span className="text-[9px] text-[#FF9933]">{r.v}</span>
            </div>
          ))}

          <div className="mt-2">
            <div className="text-[8px] tracking-[0.06em] text-white/25">FRAME RATE</div>
            <div className="mt-[4px] h-[4px] overflow-hidden rounded-[2px] bg-white/7">
              <div
                className="h-full rounded-[2px]"
                style={{
                  background: isIos
                    ? "linear-gradient(90deg, #54C5F8, #00B4AB)"
                    : "linear-gradient(90deg, #FF9933, #3DDC84)",
                  animation: "flutterPfill 3.5s ease-in-out infinite alternate",
                  animationDelay: isIos ? "0ms" : "500ms",
                }}
              />
            </div>
          </div>

          <div className={["mt-[2px] text-[8px] tracking-[0.06em]", isIos ? "text-[#54C5F8]" : "text-[#3DDC84]"].join(" ")}>
            60 fps ●
          </div>

          <div className="mt-auto flex justify-around border-t border-white/6 pt-[6px]">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className={[
                  "h-[14px] w-[14px] rounded-[3px] bg-white/7",
                  i === 0
                    ? isIos
                      ? "bg-[rgba(84,197,248,0.2)]"
                      : "bg-[rgba(255,153,51,0.2)]"
                    : "",
                ].join(" ")}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="font-mono text-[7px] tracking-[0.14em] text-white/30 uppercase">
        {isIos ? "iOS" : "Android"}
      </div>
    </div>
  );
}

export function FlutterHeroRight({ chipTopLeft, chipBottomRight }: Props) {
  const MS_VALUES = ["182ms", "204ms", "240ms", "197ms", "221ms", "188ms"] as const;
  const [ms, setMs] = useState<(typeof MS_VALUES)[number]>("240ms");
  const [msOpacity, setMsOpacity] = useState(1);

  useEffect(() => {
    let cancelled = false;
    const interval = window.setInterval(() => {
      if (cancelled) return;
      setMsOpacity(0);
      window.setTimeout(() => {
        if (cancelled) return;
        const next = MS_VALUES[Math.floor(Math.random() * MS_VALUES.length)];
        setMs(next);
        setMsOpacity(1);
      }, 150);
    }, 2200);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative z-10 flex items-center">
      <style jsx>{`
        @keyframes flutterPfill {
          0% {
            width: 45%;
          }
          100% {
            width: 88%;
          }
        }
        @keyframes hrspin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>

      <div className="absolute top-[-10px] left-[-60px] z-[4] whitespace-nowrap rounded-[4px] border border-[rgba(84,197,248,0.25)] bg-[rgba(10,27,51,0.92)] px-[10px] py-[5px] font-mono text-[7px] tracking-[0.1em] text-white/65">
        {chipTopLeft}
      </div>
      <div className="absolute bottom-[30px] right-[-65px] z-[4] whitespace-nowrap rounded-[4px] border border-[rgba(84,197,248,0.25)] bg-[rgba(10,27,51,0.92)] px-[10px] py-[5px] font-mono text-[7px] tracking-[0.1em] text-white/65">
        {chipBottomRight}
      </div>

      <PhoneFrame variant="ios" />

      <div className="relative z-[3] flex flex-col items-center gap-[6px] px-[14px]">
        <div className="relative flex size-[44px] items-center justify-center rounded-full border-[1.5px] border-[rgba(84,197,248,0.3)]">
          <div
            className="absolute inset-[-4px] rounded-full border border-dashed border-[rgba(255,153,51,0.25)]"
            style={{ animation: "hrspin 6s linear infinite" }}
            aria-hidden
          />
          <span className="text-[18px] motion-safe:animate-pulse" aria-hidden>
            🔥
          </span>
        </div>
        <div className="text-center font-mono text-[7px] tracking-[0.1em] text-[rgba(84,197,248,0.6)] uppercase leading-tight">
          Hot
          <br />
          Reload
        </div>
        <div className="font-mono text-[8px] tracking-[0.05em] text-orange-400" style={{ opacity: msOpacity, transition: "opacity .2s" }}>
          {ms}
        </div>
      </div>

      <PhoneFrame variant="android" />
    </div>
  );
}


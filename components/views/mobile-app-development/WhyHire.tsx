"use client";

import { useEffect, useRef, useState } from "react";
import { Heart, Clock } from "lucide-react";
import { attachWhyPhoneCanvas } from "./whyPhoneCanvas";
import { WHY_CODE_LINES, type CodeToken } from "./whyCodeLines";

const BUILD_STATES = [
  { pct: 0, txt: "COMPILING...", color: "rgba(255,153,51,0.7)" },
  { pct: 22, txt: "LINKING...", color: "rgba(255,153,51,0.7)" },
  { pct: 55, txt: "BUNDLING ASSETS...", color: "rgba(255,153,51,0.7)" },
  { pct: 78, txt: "CODE SIGNING...", color: "rgba(255,153,51,0.7)" },
  { pct: 95, txt: "INSTALLING...", color: "rgba(255,153,51,0.7)" },
  { pct: 100, txt: "BUILD SUCCEEDED ✓", color: "#22c55e" },
] as const;

function tokenClass(t: CodeToken["t"]): string {
  switch (t) {
    case "kw":
      return "text-[#FF9933]";
    case "fn":
      return "text-[#1dcfcf]";
    case "st":
      return "text-[#22c55e]";
    case "cm":
      return "text-[#2d4060]";
    case "ln":
      return "min-w-[22px] text-[8.5px] text-[#2a3555] select-none";
    default:
      return "text-white/55";
  }
}

export function WhyHire() {
  const phoneCvRef = useRef<HTMLCanvasElement>(null);
  const [renderedLines, setRenderedLines] = useState<CodeToken[][]>([]);
  const [showCodeCursor, setShowCodeCursor] = useState(true);
  const [buildPct, setBuildPct] = useState(0);
  const [buildTxt, setBuildTxt] = useState<string>(BUILD_STATES[0].txt);
  const [buildTxtColor, setBuildTxtColor] = useState<string>(BUILD_STATES[0].color);

  useEffect(() => {
    const c = phoneCvRef.current;
    if (!c) return;
    return attachWhyPhoneCanvas(c);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const timeouts: number[] = [];
    let rendered: CodeToken[][] = [];
    let li = 0;
    let ci = 0;

    const schedule = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
      timeouts.push(id);
    };

    const renderLines = () => {
      if (cancelled) return;
      setRenderedLines(rendered.map((line) => [...line]));
      setShowCodeCursor(li < WHY_CODE_LINES.length);
    };

    const typeLine = () => {
      if (cancelled) return;
      if (li >= WHY_CODE_LINES.length) {
        schedule(() => {
          if (cancelled) return;
          rendered = [];
          li = 0;
          ci = 0;
          renderLines();
          typeLine();
        }, 2800);
        return;
      }
      const line = WHY_CODE_LINES[li];
      if (ci === 0) rendered.push([]);
      const curLine = rendered[rendered.length - 1];
      const tok = line[ci];
      if (tok) {
        curLine.push(tok);
        ci++;
      }
      renderLines();
      if (ci < line.length) {
        schedule(typeLine, 38 + Math.random() * 28);
      } else {
        li++;
        ci = 0;
        renderLines();
        schedule(typeLine, li % 3 === 0 ? 180 : 65);
      }
    };

    schedule(typeLine, 80);

    return () => {
      cancelled = true;
      timeouts.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const timeouts: number[] = [];
    let bIdx = 0;

    const runBuild = () => {
      if (cancelled) return;
      const s = BUILD_STATES[bIdx];
      setBuildPct(s.pct);
      setBuildTxt(s.txt);
      setBuildTxtColor(s.color);
      bIdx++;
      if (bIdx < BUILD_STATES.length) {
        timeouts.push(window.setTimeout(runBuild, 600 + Math.random() * 400));
      } else {
        timeouts.push(
          window.setTimeout(() => {
            if (cancelled) return;
            bIdx = 0;
            setBuildPct(0);
            runBuild();
          }, 3500),
        );
      }
    };

    runBuild();

    return () => {
      cancelled = true;
      timeouts.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  return (
    <section id="why" className="relative overflow-hidden bg-[#060606] scroll-mt-14">
      <div className="mx-auto max-w-325 px-5 py-12 md:py-20 md:px-12">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Left: no panel background — sits on section bg like hero phone canvas */}
          <div className="relative order-2 flex min-h-[520px] flex-col items-center justify-center gap-0 overflow-hidden px-6 pt-2 pb-4 md:min-h-[600px] lg:order-1">
            <div
              className="relative z-[3] flex w-full max-w-[340px] items-center gap-2 rounded-t-[10px] border border-orange-400/12 border-b-0 bg-[#161d2e] px-3.5 py-2.5"
              aria-hidden
            >
              <span className="size-2 rounded-full bg-[#ff5f57]" />
              <span className="size-2 rounded-full bg-[#febc2e]" />
              <span className="size-2 rounded-full bg-[#28c840]" />
              <span className="ml-2 font-mono text-[9px] tracking-[0.1em] text-white/30">
                ContentView.swift
              </span>
              <span className="ml-auto font-mono text-[8px] tracking-[0.1em] text-[#ff9933]/70">
                Swift 5.9
              </span>
            </div>
            <div
              className="relative z-[3] h-[140px] w-full max-w-[340px] overflow-hidden border border-orange-400/10 border-t-0 bg-[#131928] px-3.5 py-3 font-mono text-[9.5px] leading-[1.75]"
              aria-label="Sample SwiftUI code"
            >
              {renderedLines.map((line, li2) => (
                <div key={`line-${li2}`} className="flex items-baseline gap-0 whitespace-pre">
                  {line.map((tok, ti) => (
                    <span key={`${li2}-${ti}`} className={tokenClass(tok.t)}>
                      {tok.v}
                    </span>
                  ))}
                  {showCodeCursor && li2 === renderedLines.length - 1 ? (
                    <span className="ml-0.5 inline-block h-3 w-[7px] animate-[why-hire-cursor-blink_0.85s_step-end_infinite] align-text-bottom bg-[#FF9933]/85" />
                  ) : null}
                </div>
              ))}
              {renderedLines.length === 0 ? (
                <div className="flex items-baseline whitespace-pre">
                  <span className="ml-0.5 inline-block h-3 w-[7px] animate-[why-hire-cursor-blink_0.85s_step-end_infinite] align-text-bottom bg-[#FF9933]/85" />
                </div>
              ) : null}
            </div>
            <div className="relative z-[3] flex w-full max-w-[340px] items-center gap-2 border border-orange-400/10 border-t border-t-orange-400/[0.06] bg-[#0f1621] px-3.5 py-2 font-mono text-[8px] tracking-[0.1em]">
              <span className="size-[5px] shrink-0 rounded-full bg-[#22c55e] shadow-[0_0_6px_#22c55e] motion-safe:animate-[arbim-landing-bpulse_1.4s_ease-in-out_infinite]" />
              <span style={{ color: buildTxtColor }}>{buildTxt}</span>
              <span className="ml-auto text-[#ff9933]/70">{buildPct}%</span>
            </div>
            <div className="relative z-[3] h-0.5 w-full max-w-[340px] border-x border-orange-400/10 bg-white/5">
              <div
                className="h-full rounded-r-sm bg-gradient-to-r from-[#ff9933] to-[#ffcc66] transition-[width] duration-75"
                style={{ width: `${buildPct}%` }}
              />
            </div>

            <div className="relative z-[3] mt-4 flex justify-center">
              <div className="relative">
                <div className="relative h-[300px] w-[150px] overflow-hidden rounded-[26px] border-2 border-orange-400/30 bg-[#070d1a] shadow-[0_0_40px_rgb(255_153_51/0.1),0_20px_50px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.04)]">
                  <div className="absolute left-1/2 top-0 z-10 h-4 w-[50px] -translate-x-1/2 rounded-b-[10px] bg-[#060c18]" />
                  <canvas
                    ref={phoneCvRef}
                    id="phone-screen"
                    className="block h-full w-full rounded-[24px]"
                    width={150}
                    height={300}
                    aria-hidden
                  />
                </div>
                <div
                  className="mx-auto mt-1.5 h-1 w-9 rounded-sm bg-white/12"
                  aria-hidden
                />
                <div className="motion-safe:animate-[arbim-landing-chip-float_3s_ease-in-out_infinite] absolute -left-2.5 top-[20%] z-[4] whitespace-nowrap rounded border border-orange-400/28 bg-[rgb(13_27_51/0.95)] px-2 py-1 font-mono text-[7px] tracking-[0.1em] text-[#ff9933] shadow-[0_3px_12px_rgb(0_0_0/0.4)]">
                  ✓ UIKit Ready
                </div>
                <div className="motion-safe:animate-[arbim-landing-chip-float_3s_ease-in-out_infinite] [animation-delay:0.9s] absolute -right-2 top-[38%] z-[4] whitespace-nowrap rounded border border-orange-400/28 bg-[rgb(13_27_51/0.95)] px-2 py-1 font-mono text-[7px] tracking-[0.1em] text-[#ff9933] shadow-[0_3px_12px_rgb(0_0_0/0.4)]">
                  ⬡ SwiftUI
                </div>
                <div className="motion-safe:animate-[arbim-landing-chip-float_3s_ease-in-out_infinite] [animation-delay:1.8s] absolute bottom-[22%] left-0.5 z-[4] whitespace-nowrap rounded border border-orange-400/28 bg-[rgb(13_27_51/0.95)] px-2 py-1 font-mono text-[7px] tracking-[0.1em] text-[#ff9933] shadow-[0_3px_12px_rgb(0_0_0/0.4)]">
                  ◎ 4.9★ Store
                </div>
              </div>
            </div>

            <div className="relative z-[3] mt-3.5 grid w-full max-w-[340px] grid-cols-3 overflow-hidden rounded-lg border border-orange-400/12 bg-[#0f1621]">
              {[
                { val: "50+", lbl: "Projects Shipped" },
                { val: "99%", lbl: "Satisfaction Rate" },
                { val: "5+", lbl: "Countries Served" },
              ].map((s, idx) => (
                <div
                  key={s.lbl}
                  className={`relative py-3 text-center ${idx > 0 ? "border-l border-white/[0.06]" : ""}`}
                >
                  <div className="font-sans text-[22px] font-extrabold leading-none text-[#ff9933]">
                    {s.val}
                  </div>
                  <div className="mt-1 font-mono text-[7.5px] tracking-[0.12em] text-white/70 uppercase">
                    {s.lbl}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="mb-4 flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-orange-400 uppercase">
              <span className="h-0.5 w-5 bg-orange-400" aria-hidden />
              WHY HIRE US
            </div>

            <h2 className="font-sans text-[clamp(1.8rem,3vw,2.75rem)] leading-[1.08] font-extrabold tracking-[-0.03em] text-white">
              Ultimate iPhone App
              <br />
              Development Company
              <br />
              <span className="text-orange-400">to Shortlist.</span>
            </h2>

            <p className="mt-4 max-w-xl text-[15px] leading-[1.82] text-white/45">
              Discover excellence in app development with our top-tier iPhone app development
              company. Our skilled team crafts immersive, user-friendly apps tailored to your
              vision. From concept to App Store launch, we ensure seamless functionality, stunning
              design, and optimal performance.
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/3 p-6 backdrop-blur-2xl transition-transform duration-200 hover:-translate-y-1">
                <div className="mb-4 inline-flex size-10 items-center justify-center rounded-xl border border-orange-400/25 bg-orange-400/10 text-orange-400">
                  <Heart className="size-5" aria-hidden />
                </div>
                <h3 className="text-base font-bold text-white">Customer Satisfaction</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/45">
                  Our success thrives on your happiness. We prioritize your needs, exceed
                  expectations, and create lasting connections through unmatched customer
                  satisfaction.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/3 p-6 backdrop-blur-2xl transition-transform duration-200 hover:-translate-y-1">
                <div className="mb-4 inline-flex size-10 items-center justify-center rounded-xl border border-orange-400/25 bg-orange-400/10 text-orange-400">
                  <Clock className="size-5" aria-hidden />
                </div>
                <h3 className="text-base font-bold text-white">On-Time Delivery</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/45">
                  Embrace the challenge of on-time delivery. Our commitment drives efficient
                  processes, ensuring your project reaches the finish line promptly without
                  compromising quality.
                </p>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="https://shivlam.com/contact-us/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-orange-400 px-7 py-3 text-[13px] font-semibold tracking-[0.07em] text-white uppercase shadow-[0_0_24px_rgb(245_138_11/0.25)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_44px_rgb(245_138_11/0.4)]"
              >
                Start Your Project →
              </a>
              <a
                href="https://shivlam.com/shivlam-it-services-portfolio-apps-games-websites-seo/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-md border border-white/20 bg-transparent px-7 py-3 text-[13px] font-medium tracking-[0.07em] text-white/65 uppercase transition-[transform,border-color,color] duration-200 hover:-translate-y-0.5 hover:border-orange-400/60 hover:text-orange-400"
              >
                View Portfolio
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

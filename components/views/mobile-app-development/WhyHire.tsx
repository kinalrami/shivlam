"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Heart,
  Clock,
  Box,
  CheckCircle2,
  Layers,
  Flame,
  Activity,
  Store,
  type LucideIcon,
} from "lucide-react";
import { attachWhyPhoneCanvas } from "./whyPhoneCanvas";
import { WHY_CODE_LINES_BY_SERVICE, type CodeToken } from "./whyCodeLines";
import type { MobileServiceContent, WhyHireCardIconKey } from "./content";

const BUILD_STATES_IOS = [
  { pct: 0, txt: "COMPILING...", color: "rgba(255,153,51,0.7)" },
  { pct: 22, txt: "LINKING...", color: "rgba(255,153,51,0.7)" },
  { pct: 55, txt: "BUNDLING ASSETS...", color: "rgba(255,153,51,0.7)" },
  { pct: 78, txt: "CODE SIGNING...", color: "rgba(255,153,51,0.7)" },
  { pct: 95, txt: "INSTALLING...", color: "rgba(255,153,51,0.7)" },
  { pct: 100, txt: "BUILD SUCCEEDED ✓", color: "#22c55e" },
] as const;

const BUILD_STATES_ANDROID = [
  { pct: 0, txt: "SYNCING GRADLE...", color: "rgba(255,255,255,0.35)" },
  { pct: 18, txt: "COMPILING KOTLIN...", color: "rgba(255,153,51,0.8)" },
  { pct: 42, txt: "RUNNING LINT...", color: "rgba(255,153,51,0.8)" },
  { pct: 71, txt: "GENERATING APK...", color: "rgba(255,153,51,0.8)" },
  { pct: 100, txt: "GRADLE BUILD SUCCESSFUL ✓", color: "rgba(61,220,132,0.95)" },
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

function tokenClassAndroid(t: CodeToken["t"]): string {
  switch (t) {
    case "kw":
      return "text-[#cc99cd]";
    case "fn":
      return "text-[#6cbfff]";
    case "st":
      return "text-[#ce9178]";
    case "cm":
      return "text-[#6a9955]";
    case "ln":
      return "min-w-[16px] text-right text-[9px] text-white/18 select-none pt-[1px]";
    default:
      return "text-white/75";
  }
}

const CARD_ICONS: Record<WhyHireCardIconKey, LucideIcon> = {
  heart: Heart,
  clock: Clock,
  cube: Box,
  check: CheckCircle2,
  oneCodebase: Layers,
  hotReload: Flame,
  performance: Activity,
  stores: Store,
};

type Props = {
  serviceKey: "iphone" | "android" | "flutter";
  content: MobileServiceContent;
};

export function WhyHire({ serviceKey, content }: Props) {
  const w = content.whyHire;
  const codeLines = WHY_CODE_LINES_BY_SERVICE[serviceKey];
  const phoneCvRef = useRef<HTMLCanvasElement>(null);
  const [renderedLines, setRenderedLines] = useState<CodeToken[][]>([]);
  const [showCodeCursor, setShowCodeCursor] = useState(true);
  const [buildPct, setBuildPct] = useState(0);
  const BUILD_STATES = useMemo(
    () => (serviceKey === "android" ? BUILD_STATES_ANDROID : BUILD_STATES_IOS),
    [serviceKey],
  );
  const [buildTxt, setBuildTxt] = useState<string>(BUILD_STATES[0].txt);
  const [buildTxtColor, setBuildTxtColor] = useState<string>(BUILD_STATES[0].color);
  const [androidLogLines, setAndroidLogLines] = useState<Array<{ text: string; color: string }>>([]);
  const [androidApkPct, setAndroidApkPct] = useState(0);
  const [androidApkVal, setAndroidApkVal] = useState("— MB");
  const [androidFinalStatus, setAndroidFinalStatus] = useState("⏳ BUILDING...");
  const [androidFinalStatusColor, setAndroidFinalStatusColor] = useState("rgba(255,153,51,1)");
  const [flutterStatusText, setFlutterStatusText] = useState("Flutter (stable)");
  const [flutterDotColor, setFlutterDotColor] = useState("rgba(84,197,248,1)");
  const [flutterDevice, setFlutterDevice] = useState("● Pixel 8 Pro");
  const [flutterHrLines, setFlutterHrLines] = useState<
    Array<{ text: string; kind: "base" | "ok" | "warn" }>
  >([
    { text: "Launching lib/main.dart on Pixel 8 Pro...", kind: "base" },
    { text: "", kind: "ok" },
    { text: "", kind: "warn" },
    { text: "", kind: "ok" },
  ]);

  useEffect(() => {
    if (serviceKey !== "iphone") return;
    const c = phoneCvRef.current;
    if (!c) return;
    return attachWhyPhoneCanvas(c);
  }, [serviceKey]);

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
      setShowCodeCursor(li < codeLines.length);
    };

    const typeLine = () => {
      if (cancelled) return;
      if (li >= codeLines.length) {
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
      const line = codeLines[li];
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
  }, [codeLines]);

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
  }, [BUILD_STATES]);

  useEffect(() => {
    if (serviceKey !== "android") return;
    let cancelled = false;
    const timeouts: number[] = [];

    const LOG_LINES: Array<{ text: string; color: string }> = [
      { text: "> Task :app:compileKotlin", color: "rgba(255,255,255,.45)" },
      { text: "> Task :app:mergeResources", color: "rgba(255,255,255,.45)" },
      { text: "> Task :app:packageDebug", color: "rgba(255,153,51,.85)" },
      { text: "> BUILD SUCCESSFUL in 4s", color: "rgba(61,220,132,.95)" },
      { text: "  APK: app-release.apk", color: "rgba(29,207,207,.95)" },
    ];

    const reset = () => {
      setAndroidLogLines([]);
      setAndroidApkPct(0);
      setAndroidApkVal("— MB");
      setAndroidFinalStatus("⏳ BUILDING...");
      setAndroidFinalStatusColor("rgba(255,153,51,1)");
    };

    reset();

    let i = 0;
    const addNext = () => {
      if (cancelled) return;
      if (i >= LOG_LINES.length) {
        timeouts.push(
          window.setTimeout(() => {
            if (cancelled) return;
            i = 0;
            reset();
            timeouts.push(window.setTimeout(addNext, 600));
          }, 3000),
        );
        return;
      }

      const line = LOG_LINES[i];
      setAndroidLogLines((prev) => [...prev, line]);

      if (i === 3) {
        timeouts.push(
          window.setTimeout(() => {
            if (cancelled) return;
            setAndroidApkPct(73);
            setAndroidApkVal("8.7 MB");
            setAndroidFinalStatus("✓ BUILD SUCCESSFUL");
            setAndroidFinalStatusColor("rgba(61,220,132,1)");
          }, 400),
        );
      }

      i++;
      timeouts.push(window.setTimeout(addNext, 700));
    };

    timeouts.push(window.setTimeout(addNext, 1000));

    return () => {
      cancelled = true;
      timeouts.forEach((t) => window.clearTimeout(t));
    };
  }, [serviceKey]);

  useEffect(() => {
    if (serviceKey !== "flutter") return;
    let cancelled = false;
    const timeouts: number[] = [];

    const STATUSES = [
      { text: "Hot Reload 🔥", device: "● Pixel 8 Pro", dot: "rgba(84,197,248,1)" },
      { text: "Flutter (stable)", device: "● iPhone 15 Pro", dot: "rgba(84,197,248,1)" },
      { text: "Running Debug", device: "● Chrome (web)", dot: "rgba(255,153,51,1)" },
      { text: "Build Succeeded ✓", device: "● Pixel 8 Pro", dot: "rgba(61,220,132,1)" },
    ] as const;

    const LOG_SETS: Array<Array<{ text: string; kind: "base" | "ok" | "warn" }>> = [
      [
        { text: "Launching lib/main.dart on Pixel 8 Pro...", kind: "base" },
        { text: "✓  Built build/app-release.apk (8.3MB)", kind: "ok" },
        { text: "🔥  Hot reload performed in 228ms", kind: "warn" },
        { text: "✓  2 widgets rebuilt, 0 errors", kind: "ok" },
      ],
      [
        { text: "Switching target to iPhone 15 Pro...", kind: "base" },
        { text: "✓  Built Runner.app (12.1MB)", kind: "ok" },
        { text: "🔥  Hot reload performed in 197ms", kind: "warn" },
        { text: "✓  All tests passed (47/47)", kind: "ok" },
      ],
      [
        { text: "flutter pub get → 142 packages", kind: "base" },
        { text: "✓  Resolving dependencies complete", kind: "ok" },
        { text: "🔥  Hot restart performed in 1.4s", kind: "warn" },
        { text: "✓  App running on 2 devices simultaneously", kind: "ok" },
      ],
    ];

    let si = 0;
    let li = 0;

    const cycleStatus = () => {
      if (cancelled) return;
      const s = STATUSES[si++ % STATUSES.length];
      setFlutterStatusText(s.text);
      setFlutterDevice(s.device);
      setFlutterDotColor(s.dot);
      timeouts.push(window.setTimeout(cycleStatus, 2800));
    };

    const cycleLog = () => {
      if (cancelled) return;
      const set = LOG_SETS[li++ % LOG_SETS.length];
      // clear first, then stagger in (like the HTML script)
      setFlutterHrLines([
        { text: "", kind: "base" },
        { text: "", kind: "ok" },
        { text: "", kind: "warn" },
        { text: "", kind: "ok" },
      ]);
      set.forEach((line, idx) => {
        timeouts.push(
          window.setTimeout(() => {
            if (cancelled) return;
            setFlutterHrLines((prev) => {
              const next = [...prev];
              next[idx] = line;
              return next;
            });
          }, idx * 350),
        );
      });
      timeouts.push(window.setTimeout(cycleLog, 4500));
    };

    cycleStatus();
    cycleLog();

    return () => {
      cancelled = true;
      timeouts.forEach((t) => window.clearTimeout(t));
    };
  }, [serviceKey]);

  return (
    <section id={w.sectionId} className="relative overflow-hidden bg-[#060606] scroll-mt-14">
      <div className="mx-auto max-w-325 px-5 py-12 md:py-20 md:px-12">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Left: no panel background — sits on section bg like hero phone canvas */}
          <div className="relative order-2 flex min-h-[520px] flex-col items-center justify-center gap-0 overflow-hidden px-6 pt-2 pb-4 md:min-h-[600px] lg:order-1">
            {serviceKey === "android" ? (
              <>
                <div className="relative z-[3] w-full max-w-[540px] shrink-0 overflow-hidden rounded-[10px] border border-orange-400/15 bg-[#1e1e1e] shadow-[0_24px_60px_rgb(0_0_0/0.5)]">
                  <div className="flex items-center gap-2 border-b border-white/5 bg-[#2b2b2b] px-[14px] py-[10px]">
                    <span className="size-[10px] rounded-full bg-[#ff5f57]" aria-hidden />
                    <span className="size-[10px] rounded-full bg-[#febc2e]" aria-hidden />
                    <span className="size-[10px] rounded-full bg-[#3ddc84]" aria-hidden />
                    <span className="ml-2 font-mono text-[9px] text-white/45">{w.codeFilename}</span>
                    <span className="ml-auto font-mono text-[9px] text-[#3ddc84]">{w.codeLangLabel}</span>
                  </div>

                  <div className="px-4 pt-4 h-[140px] font-mono text-[11px] leading-[1.8]">
                    {renderedLines.map((line, li2) => (
                      <div key={`line-${li2}`} className="flex items-start gap-3 whitespace-pre">
                        {line.map((tok, ti) => (
                          <span key={`${li2}-${ti}`} className={tokenClassAndroid(tok.t)}>
                            {tok.v}
                          </span>
                        ))}
                        {showCodeCursor && li2 === renderedLines.length - 1 ? (
                          <span className="ml-0.5 inline-block h-3 w-[2px] align-middle bg-orange-400 motion-safe:animate-pulse" />
                        ) : null}
                      </div>
                    ))}
                    {renderedLines.length === 0 ? (
                      <div className="flex items-start gap-3 whitespace-pre">
                        <span className="inline-block h-3 w-[2px] bg-orange-400 motion-safe:animate-pulse" />
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-[14px] flex items-center gap-2 border-t border-white/5 bg-[#2b2b2b] px-[14px] py-[6px] font-mono text-[8px]">
                    <span
                      className="size-[6px] rounded-full"
                      style={{
                        background: buildPct >= 100 ? "rgba(61,220,132,0.95)" : "rgba(255,153,51,0.8)",
                      }}
                      aria-hidden
                    />
                    <span className="tracking-[0.1em] text-white/50" style={{ color: buildTxtColor }}>
                      {buildTxt}
                    </span>
                    <span className="ml-auto tracking-[0.08em]" style={{ color: buildTxtColor }}>
                      ✓ {buildPct}%
                    </span>
                  </div>
                </div>

                {/* Android: mini phone + build log goes below editor */}
                <div className="relative z-[3] mt-4 w-full max-w-[540px] rounded-xl border border-white/7 bg-white/3 p-[18px]">
                  <div className="flex flex-col gap-4 md:flex-row">
                    {/* Mini phone */}
                    <div className="relative h-[280px] w-[140px] shrink-0 overflow-hidden rounded-[24px] border-[1.5px] border-orange-400/30 bg-[#0a1b33]">
                      <div className="absolute left-1/2 top-2 z-10 h-1 w-10 -translate-x-1/2 rounded bg-black/70" />
                      <div className="absolute inset-0 flex flex-col gap-[5px] px-2 pt-5 pb-2.5 font-mono">
                        <div className="flex items-center justify-between border-b border-orange-400/10 pb-[5px] text-[6px] text-white/30">
                          <span>9:41</span>
                          <span className="text-[#3ddc84]">⬡ COMPOSE</span>
                        </div>
                        <div className="text-[9px] font-medium tracking-[0.05em] text-white/80">
                          Analytics
                        </div>
                        <div className="mb-1 text-[6px] tracking-[0.05em] text-white/30">
                          REAL-TIME · KOTLIN FLOW
                        </div>

                        <div className="mb-1 grid grid-cols-3 gap-1">
                          {[
                            { n: "2.1k", l: "Users" },
                            { n: "98%", l: "Retain" },
                            { n: "4.8", l: "Rating" },
                          ].map((s) => (
                            <div
                              key={s.l}
                              className="rounded-[5px] border border-cyan-400/15 bg-cyan-400/7 px-[3px] py-[5px] text-center"
                            >
                              <span className="block text-[10px] text-cyan-300">{s.n}</span>
                              <span className="block text-[5px] tracking-[0.04em] text-white/30">
                                {s.l}
                              </span>
                            </div>
                          ))}
                        </div>

                        {[
                          { dot: "bg-[#3ddc84]", text: "Push Sent", val: "2.1k users" },
                          { dot: "bg-orange-400", text: "Build v2.4.1", val: "OK ✓" },
                          { dot: "bg-cyan-400", text: "App Store", val: "4.8★" },
                        ].map((it) => (
                          <div
                            key={it.text}
                            className="flex items-center gap-1.5 rounded bg-white/3 px-1.5 py-1"
                            style={{ borderLeft: "1.5px solid rgba(255,153,51,1)" }}
                          >
                            <span className={`size-1 rounded-full ${it.dot}`} aria-hidden />
                            <span className="flex-1 text-[6px] tracking-[0.04em] text-white/55">
                              {it.text}
                            </span>
                            <span className="text-[6px] text-[#3ddc84]">{it.val}</span>
                          </div>
                        ))}

                        <div className="mt-1">
                          <div className="mb-1 text-[5px] tracking-[0.06em] text-white/25">
                            WEEKLY SESSIONS
                          </div>
                          <div className="flex h-[30px] items-end gap-[3px]">
                            {[40, 65, 30, 80, 55, 70, 90].map((h, idx) => (
                              <div
                                key={idx}
                                className="flex-1 rounded-t-[2px] bg-orange-400/25 motion-safe:animate-pulse"
                                style={{ height: `${h}%`, animationDelay: `${idx * 150}ms` }}
                              />
                            ))}
                          </div>
                        </div>

                        <div className="mt-auto flex justify-around border-t border-white/5 pt-1.5">
                          {Array.from({ length: 4 }).map((_, i) => (
                            <div
                              key={i}
                              className={`h-[14px] w-[14px] rounded-[3px] ${i === 0 ? "bg-orange-400/25" : "bg-white/8"
                                }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Build log */}
                    <div className="flex min-h-[280px] flex-1 flex-col gap-2 font-mono">
                      <div className="mb-1 text-[8px] tracking-[0.12em] text-white/30 uppercase">
                        BUILD LOG
                      </div>
                      <div className="flex flex-col gap-1.5">
                        {androidLogLines.map((l, idx) => (
                          <div
                            key={`${idx}-${l.text}`}
                            className="text-[8px] tracking-[0.06em] transition-opacity duration-300"
                            style={{ color: l.color }}
                          >
                            {l.text}
                          </div>
                        ))}
                      </div>

                      <div className="mt-2 border-t border-white/7 pt-2">
                        <div className="mb-1.5 text-[7px] tracking-[0.08em] text-white/25 uppercase">
                          APK SIZE
                        </div>
                        <div className="h-[3px] overflow-hidden rounded-[2px] bg-white/7">
                          <div
                            className="h-full rounded-[2px]"
                            style={{
                              width: `${androidApkPct}%`,
                              background:
                                "linear-gradient(90deg, rgba(61,220,132,1), rgba(29,207,207,1))",
                              transition: "width .4s ease",
                            }}
                          />
                        </div>
                        <div className="mt-1 flex justify-between text-[7px]">
                          <span className="text-white/25">0 MB</span>
                          <span className="text-[#3ddc84]">{androidApkVal}</span>
                          <span className="text-white/25">12 MB</span>
                        </div>
                      </div>

                      <div className="mt-auto rounded-md border border-[#3ddc84]/20 bg-[#3ddc84]/8 px-2.5 py-2">
                        <div className="text-[8px] tracking-[0.1em]" style={{ color: androidFinalStatusColor }}>
                          {androidFinalStatus}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : serviceKey === "flutter" ? (
              <div className="relative z-[3] w-full max-w-[640px]">
                <div className="flex flex-col gap-[14px]">
                  {/* VS Code window */}
                  <div className="overflow-hidden rounded-[10px] border border-[rgba(84,197,248,0.15)] bg-[#1e1e1e] shadow-[0_24px_60px_rgb(0_0_0/0.5)]">
                    {/* titlebar */}
                    <div className="flex items-center gap-2 border-b border-white/5 bg-[#323233] px-[14px] py-[10px]">
                      <span className="size-[10px] rounded-full bg-[#ff5f57]" aria-hidden />
                      <span className="size-[10px] rounded-full bg-[#febc2e]" aria-hidden />
                      <span className="size-[10px] rounded-full bg-[#2aca44]" aria-hidden />

                      <div className="ml-3 flex flex-1 items-center">
                        {[
                          { t: "home_screen.dart", active: true },
                          { t: "app_widget.dart", active: false },
                          { t: "pubspec.yaml", active: false },
                        ].map((tab) => (
                          <div
                            key={tab.t}
                            className={[
                              "border-r border-white/7 px-3 py-1 font-mono text-[8px] text-white/35",
                              tab.active
                                ? "bg-white/5 text-white/80 border-b border-b-[#54C5F8]"
                                : "",
                            ].join(" ")}
                          >
                            {tab.t}
                          </div>
                        ))}
                      </div>
                      <span className="ml-auto font-mono text-[8px] text-[#54C5F8]">Dart 3.3</span>
                    </div>

                    {/* body */}
                    <div className="flex">
                      <div className="min-w-[32px] border-r border-white/5 bg-[#1e1e1e] px-[6px] pt-[14px] pb-[14px] pr-[6px] pl-[10px]">
                        {Array.from({ length: 12 }).map((_, i) => (
                          <span
                            key={i}
                            className="block text-right font-mono text-[9px] leading-[1.78] text-white/18"
                          >
                            {i + 1}
                          </span>
                        ))}
                      </div>
                      <div className="flex-1 overflow-hidden px-4 pt-[14px] pb-[14px] font-mono text-[10.5px] leading-[1.78]">
                        <div className="whitespace-pre">
                          <span className="text-[#569cd6]">import </span>
                          <span className="text-[#ce9178]">'package:flutter/material.dart'</span>
                          <span className="text-[#d4d4d4]">;</span>
                        </div>
                        <div className="whitespace-pre"> </div>
                        <div className="whitespace-pre">
                          <span className="text-[#4ec9b0]">@override</span>
                        </div>
                        <div className="whitespace-pre">
                          <span className="text-[#54C5F8]">Widget </span>
                          <span className="text-[#dcdcaa]">build</span>
                          <span className="text-[#d4d4d4]">(</span>
                          <span className="text-[#54C5F8]">BuildContext </span>
                          <span className="text-[#9cdcfe]">ctx</span>
                          <span className="text-[#d4d4d4]">) {"{"}</span>
                        </div>
                        <div className="whitespace-pre">
                          <span className="text-[#d4d4d4]">  </span>
                          <span className="text-[#569cd6]">return </span>
                          <span className="text-[#54C5F8]">Scaffold</span>
                          <span className="text-[#d4d4d4]">(</span>
                        </div>
                        <div className="whitespace-pre">
                          <span className="text-[#d4d4d4]">    </span>
                          <span className="text-[#9cdcfe]">appBar</span>
                          <span className="text-[#d4d4d4]">: </span>
                          <span className="text-[#54C5F8]">AppBar</span>
                          <span className="text-[#d4d4d4]">(</span>
                        </div>
                        <div className="whitespace-pre">
                          <span className="text-[#d4d4d4]">      </span>
                          <span className="text-[#9cdcfe]">title</span>
                          <span className="text-[#d4d4d4]">: </span>
                          <span className="text-[#54C5F8]">Text</span>
                          <span className="text-[#d4d4d4]">(</span>
                          <span className="text-[#ce9178]">'Dashboard'</span>
                          <span className="text-[#d4d4d4]">),</span>
                        </div>
                        <div className="whitespace-pre">
                          <span className="text-[#d4d4d4]">    ),</span>
                        </div>
                        <div className="whitespace-pre">
                          <span className="text-[#d4d4d4]">    </span>
                          <span className="text-[#9cdcfe]">body</span>
                          <span className="text-[#d4d4d4]">: </span>
                          <span className="text-[#54C5F8]">ListView</span>
                          <span className="text-[#d4d4d4]">.</span>
                          <span className="text-[#dcdcaa]">builder</span>
                          <span className="text-[#d4d4d4]">(</span>
                        </div>
                        <div className="whitespace-pre">
                          <span className="text-[#d4d4d4]">      </span>
                          <span className="text-[#9cdcfe]">itemCount</span>
                          <span className="text-[#d4d4d4]">: items.</span>
                          <span className="text-[#9cdcfe]">length</span>
                          <span className="text-[#d4d4d4]">,</span>
                        </div>
                        <div className="whitespace-pre">
                          <span className="text-[#d4d4d4]">      </span>
                          <span className="text-[#9cdcfe]">itemBuilder</span>
                          <span className="text-[#d4d4d4]">: (_, i) =&gt; </span>
                          <span className="text-[#54C5F8]">ItemCard</span>
                          <span className="text-[#d4d4d4]">(items[i])</span>
                          <span className="cursor ml-0.5 inline-block h-[11px] w-[2px] bg-orange-400 align-middle animate-[why-hire-cursor-blink_0.85s_step-end_infinite]" />
                        </div>
                        <div className="whitespace-pre">
                          <span className="text-[#d4d4d4]">  ));</span>
                        </div>
                      </div>
                    </div>

                    {/* status bar */}
                    <div className="flex items-center gap-3 bg-[#007acc] px-[14px] py-1 font-mono text-[7px] tracking-[0.08em] text-white/70">
                      <div className="flex items-center gap-2">
                        <span className="size-[6px] rounded-full" style={{ background: flutterDotColor }} aria-hidden />
                        <span>{flutterStatusText}</span>
                      </div>
                      <div className="ml-auto flex items-center gap-3">
                        <span>Dart 3.3.0</span>
                        <span>{flutterDevice}</span>
                      </div>
                    </div>

                    {/* hot reload panel */}
                    <div className="max-h-[70px] overflow-hidden border-t border-white/5 bg-black/30 px-[14px] py-2 font-mono text-[8px]">
                      {flutterHrLines.map((l, idx) => (
                        <div
                          key={idx}
                          className={[
                            "leading-[1.7] tracking-[0.04em]",
                            l.kind === "ok"
                              ? "text-[#54C5F8]"
                              : l.kind === "warn"
                                ? "text-orange-400"
                                : "text-white/35",
                          ].join(" ")}
                        >
                          {l.text}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Deploy targets */}
                  <div>
                    <div className="mb-2 font-mono text-[8px] tracking-[0.12em] text-white/28 uppercase">
                      DEPLOY TARGETS
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-[4px] border border-[rgba(84,197,248,0.25)] bg-[rgba(84,197,248,0.1)] px-[10px] py-1 font-mono text-[8px] tracking-[0.1em] text-[#54C5F8] uppercase">
                        ✓ iOS · App Store
                      </span>
                      <span className="rounded-[4px] border border-[rgba(61,220,132,0.2)] bg-[rgba(61,220,132,0.08)] px-[10px] py-1 font-mono text-[8px] tracking-[0.1em] text-[#3DDC84] uppercase">
                        ✓ Android · Play Store
                      </span>
                      <span className="rounded-[4px] border border-[rgba(255,153,51,0.2)] bg-[rgba(255,153,51,0.08)] px-[10px] py-1 font-mono text-[8px] tracking-[0.1em] text-orange-400 uppercase">
                        ✓ Web · PWA
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div
                  className="relative z-[3] flex w-full max-w-[340px] items-center gap-2 rounded-t-[10px] border border-orange-400/12 border-b-0 bg-[#161d2e] px-3.5 py-2.5"
                  aria-hidden
                >
                  <span className="size-2 rounded-full bg-[#ff5f57]" />
                  <span className="size-2 rounded-full bg-[#febc2e]" />
                  <span className="size-2 rounded-full bg-[#28c840]" />
                  <span className="ml-2 font-mono text-[9px] tracking-[0.1em] text-white/30">
                    {w.codeFilename}
                  </span>
                  <span className="ml-auto font-mono text-[8px] tracking-[0.1em] text-[#ff9933]/70">
                    {w.codeLangLabel}
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
              </>
            )}

            {serviceKey === "iphone" ? (
              <>
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
                    <div className="mx-auto mt-1.5 h-1 w-9 rounded-sm bg-white/12" aria-hidden />
                    <div className="motion-safe:animate-[arbim-landing-chip-float_3s_ease-in-out_infinite] absolute -left-2.5 top-[20%] z-[4] whitespace-nowrap rounded border border-orange-400/28 bg-[rgb(13_27_51/0.95)] px-2 py-1 font-mono text-[7px] tracking-[0.1em] text-[#ff9933] shadow-[0_3px_12px_rgb(0_0_0/0.4)]">
                      {w.phoneChip1}
                    </div>
                    <div className="motion-safe:animate-[arbim-landing-chip-float_3s_ease-in-out_infinite] [animation-delay:0.9s] absolute -right-2 top-[38%] z-[4] whitespace-nowrap rounded border border-orange-400/28 bg-[rgb(13_27_51/0.95)] px-2 py-1 font-mono text-[7px] tracking-[0.1em] text-[#ff9933] shadow-[0_3px_12px_rgb(0_0_0/0.4)]">
                      {w.phoneChip2}
                    </div>
                    <div className="motion-safe:animate-[arbim-landing-chip-float_3s_ease-in-out_infinite] [animation-delay:1.8s] absolute bottom-[22%] left-0.5 z-[4] whitespace-nowrap rounded border border-orange-400/28 bg-[rgb(13_27_51/0.95)] px-2 py-1 font-mono text-[7px] tracking-[0.1em] text-[#ff9933] shadow-[0_3px_12px_rgb(0_0_0/0.4)]">
                      {w.phoneChip3}
                    </div>
                  </div>
                </div>
              </>
            ) : null}
            <div
              className={`relative z-[3] mt-3.5 grid w-full grid-cols-3 overflow-hidden rounded-lg border border-orange-400/12 bg-[#0f1621] ${serviceKey === "iphone" ? "max-w-[340px]" : ""}`}
            >
              {w.stats.map((s, idx) => (
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
              {w.eyebrow}
            </div>

            <h2 className="font-sans text-[clamp(1.8rem,3vw,2.75rem)] leading-[1.08] font-extrabold tracking-[-0.03em] text-white">
              {w.titleLine1}
              <br />
              {w.titleLine2}
              <br />
              <span className="text-orange-400">{w.titleHighlight}</span>
            </h2>

            <p className="mt-4 max-w-xl text-[15px] leading-[1.82] text-white/45">
              {w.description}
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {w.cards.map((c) => {
                const Icon = CARD_ICONS[c.icon];
                const accentClasses =
                  c.accent === "cyan"
                    ? "border-cyan-400/25 bg-cyan-400/10 text-cyan-300"
                    : c.accent === "flutter"
                      ? "border-[#54C5F8]/25 bg-[#54C5F8]/10 text-[#54C5F8]"
                      : "border-orange-400/25 bg-orange-400/10 text-orange-400";
                return (
                  <div
                    key={c.title}
                    className="rounded-2xl border border-white/10 bg-white/3 p-6 backdrop-blur-2xl transition-transform duration-200 hover:-translate-y-1"
                  >
                    <div className={`mb-4 inline-flex size-10 items-center justify-center rounded-xl border ${accentClasses}`}>
                      <Icon className="size-5" aria-hidden />
                    </div>
                    <h3 className="text-base font-bold text-white">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/45">{c.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={w.primaryCta.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-orange-400 px-7 py-3 text-[13px] font-semibold tracking-[0.07em] text-white uppercase shadow-[0_0_24px_rgb(245_138_11/0.25)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_44px_rgb(245_138_11/0.4)]"
              >
                {w.primaryCta.label}
              </a>
              <a
                href={w.secondaryCta.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-md border border-white/20 bg-transparent px-7 py-3 text-[13px] font-medium tracking-[0.07em] text-white/65 uppercase transition-[transform,border-color,color] duration-200 hover:-translate-y-0.5 hover:border-orange-400/60 hover:text-orange-400"
              >
                {w.secondaryCta.label}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

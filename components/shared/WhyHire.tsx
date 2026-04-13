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
} from "lucide-react";

import { attachWhyPhoneCanvas } from "@/components/views/mobile-app-development/whyPhoneCanvas";
import { WHY_CODE_LINES_BY_SERVICE, type CodeToken } from "@/components/views/mobile-app-development/whyCodeLines";
import type {
  WhyHireCardIconKey,
  WhyHireSectionContent,
} from "@/components/views/mobile-app-development/content";

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

type CardIconComponent = (props: { className?: string; "aria-hidden"?: boolean }) => React.ReactNode;

function IconCheck(props: { className?: string; "aria-hidden"?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={props.className} aria-hidden={props["aria-hidden"]}>
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconClock(props: { className?: string; "aria-hidden"?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={props.className} aria-hidden={props["aria-hidden"]}>
      <path
        d="M12 21a9 9 0 1 0-9-9 9 9 0 0 0 9 9Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 7v5l3 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconHome(props: { className?: string; "aria-hidden"?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={props.className} aria-hidden={props["aria-hidden"]}>
      <path
        d="M3 11.2 12 4l9 7.2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.5 10.7V20h13V10.7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 20v-6h4v6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconBriefcase(props: { className?: string; "aria-hidden"?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={props.className} aria-hidden={props["aria-hidden"]}>
      <path
        d="M9 6V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 7h16a2 2 0 0 1 2 2v3.5a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V9a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 21h8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const CARD_ICONS: Record<WhyHireCardIconKey, CardIconComponent> = {
  heart: Heart,
  clock: IconClock,
  cube: Box,
  check: IconCheck,
  home: IconHome,
  briefcase: IconBriefcase,
  oneCodebase: Layers,
  hotReload: Flame,
  performance: Activity,
  stores: Store,
};

export type WhyHireProps = {
  serviceKey: "iphone" | "android" | "flutter";
  why: WhyHireSectionContent;
  codeLines?: CodeToken[][];
  showPhoneCanvas?: boolean;
  /** Editor UI variant: mobile-style (default) or web-style code editor. */
  editorVariant?: "mobile" | "web";
  /** Web editor snippets when `editorVariant="web"`. */
  webEditorSnippets?: readonly WebEditorSnippet[];
  /** Hide the bottom 3-column stats bar (useful for Web). */
  showBottomStats?: boolean;
};

export type WebEditorSnippet = {
  lang: string;
  tab1: string;
  tab2: string;
  tab3: string;
  statusText: string;
  rightText: string;
  statusDot: string;
  terminalTop: string;
  terminalLine1: string;
  terminalLine2: string;
  /** HTML strings containing spans for syntax colors. */
  codeHtmlLines: readonly string[];
};

function WebCodeEditor({ snippets }: { snippets: readonly WebEditorSnippet[] }) {
  const [idx, setIdx] = useState(0);
  const s = snippets[Math.max(0, Math.min(idx, snippets.length - 1))];

  useEffect(() => {
    if (snippets.length <= 1) return;
    const id = window.setInterval(() => setIdx((p) => (p + 1) % snippets.length), 4000);
    return () => window.clearInterval(id);
  }, [snippets.length]);

  if (!s) return null;

  return (
    <div className="w-full max-w-[560px] overflow-hidden rounded-[10px] border border-orange-400/15 bg-[#1e1e1e] shadow-[0_24px_60px_rgb(0_0_0/0.5)]">
      {/* bar */}
      <div className="flex items-center gap-2 border-b border-white/5 bg-[#2d2d2d] px-[14px] py-[10px]">
        <span className="size-[10px] rounded-full bg-[#ff5f57]" aria-hidden />
        <span className="size-[10px] rounded-full bg-[#febc2e]" aria-hidden />
        <span className="size-[10px] rounded-full bg-[#2aca44]" aria-hidden />

        <div className="ml-3 flex flex-1 items-center overflow-hidden">
          {[
            { t: s.tab1, active: true },
            { t: s.tab2, active: false },
            { t: s.tab3, active: false },
          ].map((tab) => (
            <div
              key={tab.t}
              className={[
                "shrink-0 border-r border-white/7 px-3 py-1 font-mono text-[8px] text-white/35",
                tab.active ? "bg-white/5 text-white/80 border-b border-b-orange-400" : "",
              ].join(" ")}
            >
              {tab.t}
            </div>
          ))}
        </div>

        <span className="ml-auto font-mono text-[8px] text-orange-400/80">{s.lang}</span>
      </div>

      {/* body */}
      <div className="flex">
        <div className="min-w-[34px] border-r border-white/5 bg-[#1e1e1e] px-[8px] pt-[14px] pb-[14px] pr-[8px] pl-[10px]">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="block text-right font-mono text-[9px] leading-[1.78] text-white/18"
            >
              {i + 1}
            </span>
          ))}
        </div>
        <div className="flex-1 px-4 pt-[14px] pb-[14px] font-mono text-[10.5px] leading-[1.78] text-[#d4d4d4]">
          {s.codeHtmlLines.slice(0, 12).map((line, i) => (
            <div
              key={i}
              className="whitespace-pre"
              dangerouslySetInnerHTML={{ __html: line || " " }}
            />
          ))}
        </div>
      </div>

      {/* status */}
      <div className="flex items-center gap-3 bg-[#007acc] px-[14px] py-1 font-mono text-[7px] tracking-[0.08em] text-white/70">
        <div className="flex items-center gap-2">
          <span className="size-[6px] rounded-full" style={{ background: s.statusDot }} aria-hidden />
          <span>{s.statusText}</span>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <span className="text-white/60">{s.rightText}</span>
        </div>
      </div>

      {/* terminal */}
      <div className="border-t border-white/5 bg-black/30 px-[14px] py-2 font-mono text-[8px]">
        <div className="leading-[1.7] tracking-[0.04em] text-white/25">{s.terminalTop}</div>
        <div className="leading-[1.7] tracking-[0.04em] text-[#22c55e]">{s.terminalLine1}</div>
        <div className="leading-[1.7] tracking-[0.04em] text-orange-400/70">{s.terminalLine2}</div>
      </div>
    </div>
  );
}

export function WhyHire({
  serviceKey,
  why,
  codeLines,
  showPhoneCanvas = true,
  editorVariant = "mobile",
  webEditorSnippets,
  showBottomStats = true,
}: WhyHireProps) {
  const w = why;
  const editorLines = codeLines ?? WHY_CODE_LINES_BY_SERVICE[serviceKey];

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
  const [flutterHrLines, setFlutterHrLines] = useState<Array<{ text: string; kind: "base" | "ok" | "warn" }>>([
    { text: "Launching lib/main.dart on Pixel 8 Pro...", kind: "base" },
    { text: "", kind: "ok" },
    { text: "", kind: "warn" },
    { text: "", kind: "ok" },
  ]);

  useEffect(() => {
    if (!showPhoneCanvas) return;
    if (serviceKey !== "iphone") return;
    const c = phoneCvRef.current;
    if (!c) return;
    return attachWhyPhoneCanvas(c);
  }, [serviceKey, showPhoneCanvas]);

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
      setShowCodeCursor(li < editorLines.length);
    };

    const typeLine = () => {
      if (cancelled) return;
      if (li >= editorLines.length) {
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
      const line = editorLines[li];
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
  }, [editorLines]);

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
      timeouts.forEach((t2) => window.clearTimeout(t2));
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
      timeouts.forEach((t2) => window.clearTimeout(t2));
    };
  }, [serviceKey]);

  return (
    <section id={w.sectionId} className="relative overflow-hidden bg-[#060606] scroll-mt-14">
      <div className="mx-auto max-w-325 px-5 py-12 md:py-20 md:px-12">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* LEFT */}
          <div className="relative order-2 flex min-h-[520px] flex-col items-center justify-center gap-0 overflow-hidden px-6 pt-2 pb-4 md:min-h-[600px] lg:order-1">
            {editorVariant === "web" && webEditorSnippets?.length ? (
              <div className="relative z-[3] w-full">
                <WebCodeEditor snippets={webEditorSnippets} />
              </div>
            ) : null}

            {editorVariant === "web"
              ? null
              : serviceKey === "android" ? (
              // Keep full Android view (unchanged)
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
            ) : serviceKey === "flutter" ? (
              // Keep full Flutter view (unchanged)
              <div className="relative z-[3] w-full max-w-[640px]">
                <div className="flex flex-col gap-[14px]">
                  <div className="overflow-hidden rounded-[10px] border border-[rgba(84,197,248,0.15)] bg-[#1e1e1e] shadow-[0_24px_60px_rgb(0_0_0/0.5)]">
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
                              tab.active ? "bg-white/5 text-white/80 border-b border-b-[#54C5F8]" : "",
                            ].join(" ")}
                          >
                            {tab.t}
                          </div>
                        ))}
                      </div>
                      <span className="ml-auto font-mono text-[8px] text-[#54C5F8]">Dart 3.3</span>
                    </div>
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
                        {renderedLines.map((line, li2) => (
                          <div key={`line-${li2}`} className="whitespace-pre">
                            {line.map((tok, ti) => (
                              <span key={`${li2}-${ti}`} className={tokenClassAndroid(tok.t)}>
                                {tok.v}
                              </span>
                            ))}
                            {showCodeCursor && li2 === renderedLines.length - 1 ? (
                              <span className="ml-0.5 inline-block h-[11px] w-[2px] bg-orange-400 align-middle animate-[why-hire-cursor-blink_0.85s_step-end_infinite]" />
                            ) : null}
                          </div>
                        ))}
                      </div>
                    </div>
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
                </div>
              </div>
            ) : (
              // iPhone / simple mode (also used for Web via `showPhoneCanvas={false}`)
              <>
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
                  <div className="relative z-[3] h-[140px] w-full max-w-[340px] overflow-hidden border border-orange-400/10 border-t-0 bg-[#131928] px-3.5 py-3 font-mono text-[9.5px] leading-[1.75]">
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

                {showPhoneCanvas && serviceKey === "iphone" ? (
                  <div className="relative z-[3] mt-4 flex justify-center">
                    <div className="relative">
                      <div className="relative h-[300px] w-[150px] overflow-hidden rounded-[26px] border-2 border-orange-400/30 bg-[#070d1a] shadow-[0_0_40px_rgb(255_153_51/0.1),0_20px_50px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.04)]">
                        <div className="absolute left-1/2 top-0 z-10 h-4 w-[50px] -translate-x-1/2 rounded-b-[10px] bg-[#060c18]" />
                        <canvas ref={phoneCvRef} className="block h-full w-full rounded-[24px]" />
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
                ) : null}
              </>
            )}

            {showBottomStats ? (
              <div className="relative z-[3] mt-3.5 grid w-full grid-cols-3 overflow-hidden rounded-lg border border-orange-400/12 bg-[#0f1621]">
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
            ) : null}
          </div>

          {/* RIGHT */}
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
            <p className="mt-4 max-w-xl text-[15px] leading-[1.82] text-white/45">{w.description}</p>

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


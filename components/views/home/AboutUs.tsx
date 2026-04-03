"use client";

import { SectionIntro } from "@/components/shared/section-chrome";
import { useState } from "react";
import "@/styles/about-us-section.css";

const ABOUT_VF_SVGS = [
  "/illustrations/about/construction.svg",
  "/illustrations/about/aero-flight.svg",
] as const;

const MODES = [
  {
    label: "MODE_01 // CONSTRUCTION",
    hud: "LAT: 23.0225° N\nLNG: 72.5714° E\nALT: 052m ASL",
  },
  {
    label: "MODE_02 // AERO FLIGHT",
    hud: "VEL: MACH 2.1\nALT: 12,000m\nVEC: 045° NE",
  },
  {
    label: "MODE_03 // ANALYTICS",
    hud: "SRV: 99.98% UP\nRPS: 12,440\nDB: LIVE",
  },
] as const;

const ANALYTICS_HTML = `<div class="code-stream fade-in">
<span class="hl2">&gt;&gt; SHIVLAM_OS v3.0 // LIVE DIAGNOSTIC</span><br>
<span class="hl">PROJECTS</span>: TOTAL .............. <span style="color:#22d3a0">50+</span><br>
<span class="hl">PROJECTS</span>: COMPLEX ONGOING ..... <span style="color:#22d3a0">3+</span><br>
<span class="hl">eCOM</span>: BRANDS BUILT ........... <span style="color:#22d3a0">5+</span><br>
<span style="color:rgba(138,155,186,.4)">──────────────────────────────</span><br>
<span class="hl2">LATENCY</span>   [████████░░]  1.2ms<br>
<span class="hl2">UPTIME</span>    [██████████]  99.98%<br>
<span class="hl2">LOAD</span>      [███████░░░]  68.4%<br>
<span style="color:rgba(138,155,186,.4)">──────────────────────────────</span><br>
<span style="color:rgba(138,155,186,.45)">DB_NODES:</span><br>
<span style="margin-left:8px">● AUTH_DB</span> <span style="color:#22d3a0">LIVE</span>  <span style="color:rgba(138,155,186,.45)">rps:4,120</span><br>
<span style="margin-left:8px">● IDENTITY_DB</span> <span style="color:#22d3a0">LIVE</span>  <span style="color:rgba(138,155,186,.45)">rps:3,880</span><br>
<span style="margin-left:8px">● ANALYTICS_DB</span> <span style="color:#22d3a0">LIVE</span>  <span style="color:rgba(138,155,186,.45)">rps:4,440</span><br>
<span style="color:rgba(138,155,186,.4)">──────────────────────────────</span><br>
<span class="hl">TEAM</span>: 10+ STRONG // AES-256 <span class="hl2">SECURE</span>
</div>`;

const AR_DOTS = [
  {
    top: "38%",
    left: "19%",
    pulseDelay: undefined as string | undefined,
    tipId: "MODULE: AR_CORE_v2.1",
    tipVal: "ANCHOR → STRUCT_BASE<br>LOAD: 98.4%",
  },
  {
    top: "20%",
    left: "65%",
    pulseDelay: "0.7s",
    tipId: "MODULE: WEB_ARCH_v4.0",
    tipVal: "ANCHOR → APEX_NODE<br>LATENCY: 1.2ms",
  },
  {
    top: "68%",
    left: "74%",
    pulseDelay: "1.3s",
    tipId: "MODULE: IDENTITY_v1.8",
    tipVal: "ANCHOR → AUTH_LAYER<br>SECURE: AES-256",
  },
] as const;

const BENTO = [
  { num: "50", unit: "+", label: "PROJECTS DONE" },
  { num: "3", unit: "+", label: "COMPLEX ONGOING" },
  { num: "5", unit: "+", label: "eCOM BRANDS BUILT" },
  { num: "10", unit: "+", label: "YRS CORPORATE XP" },
  { num: "10", unit: "+", label: "TEAM // PRODUCTIVE" },
] as const;

export default function AboutUs() {
  const [mode, setMode] = useState(0);

  const hudLines = MODES[mode].hud.split("\n");

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative scroll-mt-24 px-12 pb-12 md:pb-20"
    >
      <SectionIntro
        id="about-heading"
        eyebrow="The core engine"
        title={
          <>
            Decades of Experience.
            <br />
            Built for the{" "}
            <span className="text-sl-saffron">Future of Bharat.</span>
          </>
        }
        lead={
          <>
            Shivlam is a Bharat-based technology powerhouse specializing in complex
            development ecosystems. With 10+ years of corporate leadership and 3+
            years of focused innovation, we bridge the gap between legacy stability
            and next-gen agility. From high-performance mobile and web architecture
            to digital Identity, we engineer solutions that endure.
          </>
        }
      />

      <div className="ac-root w-full">
        <div className="badges">
          <div className="badge-seal">
            <div className="seal-ring">
              <div className="seal-dot" />
              <div className="seal-inner">
                SHV
                <br />
                LAM
              </div>
            </div>
            <div className="badge-seal-text">
              10+ YRS CORPORATE XP
              <br />
              // 3+ YRS SHIVLAM INNOVATION
            </div>
          </div>
          <div className="badge-location">
            <div className="pin-icon" />
            <span>PROUDLY ENGINEERED IN BHARAT</span>
          </div>
        </div>

        <div className="vf-wrap">
          <div className="vf-header">
            <div className="vf-header-left">
              <div className="vf-status-dot" />
              <div className="vf-title-txt">AR_VIEWFINDER // LIVE</div>
            </div>
            <div className="mode-tabs" role="tablist" aria-label="Viewfinder mode">
              <button
                type="button"
                role="tab"
                aria-selected={mode === 0}
                className={`mode-btn${mode === 0 ? " active" : ""}`}
                onClick={() => setMode(0)}
              >
                CONSTRUCT
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mode === 1}
                className={`mode-btn${mode === 1 ? " active" : ""}`}
                onClick={() => setMode(1)}
              >
                AERO
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mode === 2}
                className={`mode-btn${mode === 2 ? " active" : ""}`}
                onClick={() => setMode(2)}
              >
                ANALYTICS
              </button>
            </div>
          </div>
          <div className="vf-canvas">
            <div className="vf-outside" aria-hidden />
            <div className="vf-frame">
              <div key={mode} className="vf-inner">
                {mode < 2 ? (
                  <img
                    src={ABOUT_VF_SVGS[mode]}
                    alt=""
                    className="vf-scene fade-in"
                  />
                ) : (
                  <div
                    dangerouslySetInnerHTML={{ __html: ANALYTICS_HTML }}
                  />
                )}
              </div>
              <div className="lidar-line" aria-hidden />
              <div className="vf-corner tl" />
              <div className="vf-corner tr" />
              <div className="vf-corner bl" />
              <div className="vf-corner br" />
              <div className="vf-mode-label">{MODES[mode].label}</div>
            </div>
            {AR_DOTS.map((dot) => (
              <div
                key={dot.tipId}
                className="ar-dot"
                style={{ top: dot.top, left: dot.left }}
              >
                <div
                  className="ar-pulse"
                  style={
                    dot.pulseDelay
                      ? { animationDelay: dot.pulseDelay }
                      : undefined
                  }
                />
                <div className="ar-dot-core" />
                <div className="ar-tooltip">
                  <span className="ar-tip-id">{dot.tipId}</span>
                  <span
                    className="ar-tip-val"
                    dangerouslySetInnerHTML={{ __html: dot.tipVal }}
                  />
                </div>
              </div>
            ))}
            <div className="vf-hud">
              {hudLines.map((line, i) => (
                <span key={line}>
                  {line}
                  {i < hudLines.length - 1 ? <br /> : null}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="bento-row">
          {BENTO.map((item) => (
            <div key={item.label} className="bc">
              <div className="bc-num">
                {item.num}
                <span className="bc-unit">{item.unit}</span>
              </div>
              <div className="bc-label">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

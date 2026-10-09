
"use client";

import { useEffect, useState } from "react";

const patentCategories = [
  {
    id: "logics",
    number: 8,
    title: "Logics",
    accent: "#0796E2",
    rgb: "7, 150, 226",
    points: [
      "Cell-level electrochemical balancing algorithm",
      "Real-time individual SoC / SoH computation",
      "Predictive thermal anomaly detection logic",
      "Active containment decision and trigger logic",
      "Zero-current energy transfer logic",
      "Equilibrium maintenance across all states",
      "Charge / discharge optimisation logic",
      "Communication and OTA update protocol",
    ],
  },
  {
    id: "bms-architecture",
    number: 7,
    title: "BMS Architecture",
    accent: "#FACC15",
    rgb: "250, 204, 21",
    points: [
      "Proprietary cell-to-cell transfer circuit topology",
      "Auxiliary circuit design — zero BMS self-heating",
      "Sensor array architecture — per-cell measurement",
      "High-voltage series stacking architecture",
      "Modular scalability framework — any kW to HV grid",
      "Thermal management hardware integration",
      "Redundancy and fail-safe architecture",
    ],
  },
  {
    id: "product",
    number: 5,
    title: "Product",
    accent: "#12C879",
    rgb: "18, 200, 121",
    points: [
      "STHORAM BMS — complete product specification",
      "NexCell BESS — integrated system design",
      "4G/LTE/GPS connected BMS hardware platform",
      "BaaS (Battery as a Service) product framework",
      "OEM integration specification and interface",
    ],
  },
  {
    id: "utility",
    number: 4,
    title: "Utility",
    accent: "#9AA5B8",
    rgb: "154, 165, 184",
    points: [
      "Grid-direct connection utility — eliminates transformer",
      "Solar-BESS integration utility application",
      "EV range extension utility application",
      "Defence and remote power utility application",
    ],
  },
];

const SERIF = 'Georgia, "Times New Roman", serif';
const BRAND_BLUE = "#009FE3";

/* ---------- Donut Chart ---------- */

function PatentDonut({ activeId }: { activeId: string | null }) {
  const R = 72;
  const C = 2 * Math.PI * R;
  const GAP = 3;
  const total = patentCategories.reduce((sum, p) => sum + p.number, 0);

  let cursor = 0;

  const segments = patentCategories.map((p) => {
    const len = (p.number / total) * C;
    const start = cursor;
    cursor += len;

    const midAngle =
      ((start + len / 2) / C) * 2 * Math.PI - Math.PI / 2;

    return {
      ...p,
      dash: Math.max(len - GAP, 0),
      offset: -(start + GAP / 2),
      lx: 100 + R * Math.cos(midAngle),
      ly: 100 + R * Math.sin(midAngle),
    };
  });

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[300px] 2xl:max-w-[340px]">
      {/* Soft Halo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-6 rounded-full bg-[#0796E2]/[0.07] blur-3xl"
      />

      <svg
        viewBox="0 0 200 200"
        className="relative h-full w-full"
        role="img"
        aria-label="Patent split: 8 Logics, 7 BMS Architecture, 5 Product, 4 Utility"
      >
        {/* Outer and Inner Rings */}
        <circle
          cx="100"
          cy="100"
          r="96"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="0.6"
        />

        <circle
          cx="100"
          cy="100"
          r="48"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="0.6"
        />

        {/* Segments */}
        <g transform="rotate(-90 100 100)">
          {segments.map((s) => {
            const dimmed = activeId !== null && activeId !== s.id;

            return (
              <circle
                key={s.id}
                cx="100"
                cy="100"
                r={R}
                fill="none"
                stroke={s.accent}
                strokeWidth={activeId === s.id ? 32 : 30}
                strokeDasharray={`${s.dash} ${C - s.dash}`}
                strokeDashoffset={s.offset}
                style={{
                  opacity: dimmed ? 0.3 : 1,
                  transition:
                    "opacity 400ms ease, stroke-width 400ms ease",
                }}
              />
            );
          })}
        </g>

        {/* Numbers on Segments */}
        {segments.map((s) => (
          <text
            key={`t-${s.id}`}
            x={s.lx}
            y={s.ly}
            textAnchor="middle"
            dominantBaseline="central"
            fontFamily={SERIF}
            fontSize="17"
            fontWeight="700"
            fill={
              s.id === "utility" || s.id === "bms-architecture"
                ? "#05080F"
                : "#FFFFFF"
            }
            style={{
              opacity: activeId !== null && activeId !== s.id ? 0.4 : 1,
              transition: "opacity 400ms ease",
            }}
          >
            {s.number}
          </text>
        ))}

        {/* Center Total */}
        <text
          x="100"
          y="96"
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily={SERIF}
          fontSize="30"
          fontWeight="700"
          fill="#FFFFFF"
        >
          24
        </text>

        <text
          x="100"
          y="116"
          textAnchor="middle"
          fontSize="6.5"
          fontWeight="600"
          letterSpacing="2.2"
          fill="#7C8AA0"
        >
          PATENTS
        </text>
      </svg>
    </div>
  );
}

/* ---------- Patents Section ---------- */

export default function Patents() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const handleOutside = (e: PointerEvent) => {
      const target = e.target as HTMLElement;

      if (!target.closest("[data-patent-card]")) {
        setActiveId(null);
      }
    };

    document.addEventListener("pointerdown", handleOutside);

    return () => {
      document.removeEventListener("pointerdown", handleOutside);
    };
  }, []);

  return (
    <section
      id="patents"
      className="relative overflow-hidden bg-[#05080F] pb-14 pt-28 sm:pb-16 sm:pt-28 lg:pb-20 lg:pt-32"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-10%] top-[20%] h-[500px] w-[500px] rounded-full bg-[#087F73]/[0.06] blur-[140px]" />

        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#009FE3]/30 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-[1560px] px-5 sm:px-6 lg:px-10">
        {/* Centered Blue Heading */}
        <h2
          className="mx-auto max-w-[1200px] text-center text-[clamp(30px,3.5vw,60px)] font-bold leading-[1.1] tracking-[-0.02em]"
          style={{
            fontFamily: SERIF,
            color: BRAND_BLUE,
          }}
        >
          24 Patents. Four Categories. Total IP Protection.
        </h2>

        {/* Chart + Cards */}
        <div className="mt-10 grid items-center gap-10 2xl:grid-cols-[340px_minmax(0,1fr)] 2xl:gap-14">
          <PatentDonut activeId={activeId} />

          <div className="grid items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {patentCategories.map((patent) => {
              const isActive = activeId === patent.id;

              return (
                <article
                  key={patent.id}
                  data-patent-card
                  tabIndex={0}
                  onPointerDown={(e) => {
                    if (e.pointerType !== "mouse") {
                      setActiveId(patent.id);
                    }
                  }}
                  onPointerEnter={(e) => {
                    if (e.pointerType === "mouse") {
                      setActiveId(patent.id);
                    }
                  }}
                  onPointerLeave={(e) => {
                    if (e.pointerType === "mouse") {
                      setActiveId(null);
                    }
                  }}
                  onFocus={() => setActiveId(patent.id)}
                  onBlur={() => setActiveId(null)}
                  className={`group relative flex cursor-pointer select-none flex-col overflow-hidden bg-gradient-to-b from-[#0C1322] to-[#070B14] outline-none [-webkit-tap-highlight-color:transparent] touch-manipulation transition-all duration-500 ease-out ${
                    isActive ? "-translate-y-1.5" : ""
                  }`}
                  style={{
                    border: `1.5px solid rgba(${patent.rgb}, ${
                      isActive ? 1 : 0.7
                    })`,
                    boxShadow: isActive
                      ? `0 30px 60px -28px rgba(${patent.rgb},0.45), 0 20px 40px -24px rgba(0,0,0,0.9)`
                      : "0 24px 48px -26px rgba(0,0,0,0.9)",
                  }}
                >
                  {/* Category Accent Bar */}
                  <div
                    className="h-[6px] w-full shrink-0"
                    style={{ backgroundColor: patent.accent }}
                  />

                  {/* Accent Light */}
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-x-0 top-[6px] h-36 transition-opacity duration-500 ${
                      isActive ? "opacity-100" : "opacity-60"
                    }`}
                    style={{
                      background: `linear-gradient(to bottom, rgba(${patent.rgb},0.11), transparent)`,
                    }}
                  />

                  <div className="relative flex flex-1 flex-col px-6 pb-8 pt-7 lg:px-7">
                    {/* Number */}
                    <div
                      className="text-center text-[68px] font-bold leading-none tracking-[-0.02em]"
                      style={{
                        color: patent.accent,
                        fontFamily: SERIF,
                      }}
                    >
                      {patent.number}
                    </div>

                    {/* Category */}
                    <div
                      className="mt-4 text-center text-[14px] font-bold uppercase tracking-[0.28em]"
                      style={{ color: patent.accent }}
                    >
                      {patent.title}
                    </div>

                    {/* Divider */}
                    <div
                      className="mx-auto my-6 h-[2px] w-full"
                      style={{
                        background: `linear-gradient(90deg, transparent, rgba(${patent.rgb},0.9), transparent)`,
                      }}
                    />

                    {/* Patent Details */}
                    <ul className="flex flex-1 flex-col gap-3.5">
                      {patent.points.map((point) => (
                        <li key={point} className="flex items-start gap-3">
                          <span
                            className="mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full"
                            style={{ backgroundColor: patent.accent }}
                          />

                          <span
                            className={`text-[14.5px] leading-[1.55] transition-colors duration-300 ${
                              isActive
                                ? "text-[#DCE2EC]"
                                : "text-[#B3BDCC]"
                            }`}
                          >
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Bottom Statement */}
        <p
          className="mt-12 max-w-[1100px] text-[14px] italic leading-[1.7] text-[#6B7A8F] sm:text-[15px]"
          style={{ fontFamily: SERIF }}
        >
          All 24 applications cover inventions that endure across battery
          chemistries. Full patent numbers and claims available under NDA.
        </p>
      </div>
    </section>
  );
}

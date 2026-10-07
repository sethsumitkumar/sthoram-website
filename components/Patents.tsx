"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";

const patentCategories = [
  {
    number: "8",
    title: "LOGICS",
    description:
      "Balancing algorithms, per-cell SoC/SoH computation, predictive thermal anomaly detection, concurrent zero-current transfer, OTA protocols.",
  },
  {
    number: "7",
    title: "BMS ARCHITECTURE",
    description:
      "Cell-to-cell transfer topology, zero-self-heating auxiliary circuits, per-cell sensor arrays, HV series stacking, modular scalability, fail-safe design.",
  },
  {
    number: "5",
    title: "PRODUCT",
    description:
      "STHORAM BMS specification, NexCell BESS system design, 4G/LTE/GPS hardware platform, BaaS framework, OEM integration interfaces.",
  },
  {
    number: "4",
    title: "UTILITY",
    description:
      "Grid-direct connection, solar-BESS integration, EV range extension, defence and remote power applications.",
  },
];

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
      className="relative overflow-hidden bg-[#05080F] py-24 sm:py-28 lg:py-32"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        {/* Ambient glow */}
        <div className="absolute right-[-10%] top-[20%] h-[500px] w-[500px] rounded-full bg-[#087F73]/[0.06] blur-[140px]" />

        {/* Grid */}
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

        {/* Top line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#4DE7E5]/20 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-10">
        {/* Heading */}
        <div className="max-w-[760px]">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-[#4DE7E5]" />

            <span className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-[#65D8D5]">
              Patents
            </span>
          </div>

          <h2 className="font-sans text-[38px] font-semibold leading-[1.08] tracking-[-0.025em] text-white sm:text-[48px] lg:text-[56px]">
            24 patents. Four categories. Total
            <br />
            IP protection.
          </h2>
        </div>

        {/* Patent categories */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {patentCategories.map((patent) => {
            const isActive = activeId === patent.number;

            return (
              <article
                key={patent.title}
                data-patent-card
                tabIndex={0}
                onPointerDown={(e) => {
                  if (e.pointerType !== "mouse") {
                    setActiveId(patent.number);
                  }
                }}
                onPointerEnter={(e) => {
                  if (e.pointerType === "mouse") {
                    setActiveId(patent.number);
                  }
                }}
                onPointerLeave={(e) => {
                  if (e.pointerType === "mouse") {
                    setActiveId(null);
                  }
                }}
                onFocus={() => setActiveId(patent.number)}
                onBlur={() => setActiveId(null)}
                className={`group relative cursor-pointer select-none overflow-hidden rounded-2xl border outline-none [-webkit-tap-highlight-color:transparent] touch-manipulation transition-all duration-500 ease-out active:scale-[0.98]
                  ${
                    isActive
                      ? "border-[#4DE7E5]/70 bg-[#0B1721] -translate-y-1 shadow-[0_20px_50px_-20px_rgba(77,231,229,0.35)]"
                      : "border-[#173040] bg-[#0A111A]/80 hover:border-[#244454]"
                  }`}
              >
                {/* Top glow */}
                <span
                  className={`pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#4DE7E5] to-transparent transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-50"
                  }`}
                />

                {/* Corner glow */}
                <span
                  className={`pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#4DE7E5]/15 blur-[70px] transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* Shine */}
                <span
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.035] to-transparent transition-transform duration-1000 ${
                    isActive
                      ? "translate-x-full"
                      : "-translate-x-full"
                  }`}
                />

                <div className="relative flex min-h-[202px] flex-col px-6 py-7 text-center">
                  {/* Number */}
                  <div
                    className={`font-sans text-[34px] font-medium leading-none tracking-[-0.03em] transition-all duration-500 ${
                      isActive
                        ? "text-[#62E8E7] drop-shadow-[0_0_14px_rgba(77,231,229,0.35)]"
                        : "text-[#4DE7E5]"
                    }`}
                  >
                    {patent.number}
                  </div>

                  {/* Category */}
                  <div
                    className={`mt-3 font-sans text-[10px] font-semibold uppercase tracking-[0.22em] transition-colors duration-300 ${
                      isActive
                        ? "text-[#65D8D5]"
                        : "text-[#55C9C5]"
                    }`}
                  >
                    {patent.title}
                  </div>

                  {/* Description */}
                  <p
                    className={`mx-auto mt-3 max-w-[220px] font-sans text-[12px] leading-[1.55] transition-colors duration-300 ${
                      isActive
                        ? "text-[#AEBBCA]"
                        : "text-[#77869B]"
                    }`}
                  >
                    {patent.description}
                  </p>

                  {/* Bottom indicator */}
                  <div className="mt-auto flex justify-center pt-5">
                    <span
                      className={`h-px transition-all duration-500 ${
                        isActive
                          ? "w-12 bg-[#4DE7E5]"
                          : "w-6 bg-[#4DE7E5]/30"
                      }`}
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom statement */}
        <div className="mt-6 px-4 text-center">
          <p className="mx-auto max-w-[1120px] font-sans text-[11px] leading-[1.6] text-[#68788D] sm:text-[12px]">
            All 24 applications cover inventions that endure across battery
            chemistries · India jurisdiction, PCT pathway · 19 assigned to SPV
            (BESS/Grid), 5 retained by founders · Full patent numbers and claims
            available under NDA
          </p>
        </div>
      </div>
    </section>
  );
}
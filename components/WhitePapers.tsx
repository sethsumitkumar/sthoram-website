"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, BarChart3, FileText, Zap, Check } from "lucide-react";

const whitePapers = [
  {
    icon: Zap,
    number: "01",
    title: "Continuous Cell-Level Electrochemical Equilibrium",
    description:
      "Why periodic balancing fails, and how continuous equilibrium changes everything.",
    status: "Forthcoming",
  },
  {
    icon: FileText,
    number: "02",
    title: "Eliminating Thermal Runaway at the Root Cause",
    description:
      "From detection-after-onset to prediction and active N₂ containment.",
    status: "Forthcoming",
  },
  {
    icon: BarChart3,
    number: "03",
    title: "The Economics of 2× Cycle Life",
    description:
      "What double asset life does to TCO across EV, BESS, and defence programmes.",
    status: "Forthcoming",
  },
];

export default function WhitePapers() {
  const [activeId, setActiveId] = useState<string | null>(null);

  // Clear the active effect when tapping or clicking outside a card.
  useEffect(() => {
    const handleOutside = (e: PointerEvent) => {
      const target = e.target as HTMLElement;

      if (!target.closest("[data-paper-card]")) {
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
      id="white-papers"
      className="relative overflow-hidden bg-[#05080F] py-24 sm:py-28 lg:py-32"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-10%] top-[20%] h-[500px] w-[500px] rounded-full bg-[#009FE3]/[0.06] blur-[140px]" />

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
      </div>

      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-10">
        {/* Centered Heading */}
        <div className="mx-auto max-w-[900px] text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#009FE3]" />

            <span className="font-sans text-[13px] font-semibold uppercase tracking-[0.22em] text-[#009FE3]">
              White Papers
            </span>

            <span className="h-px w-10 bg-[#009FE3]" />
          </div>

          <h2 className="font-sans text-[42px] font-semibold leading-[1.12] tracking-[-0.025em] text-[#009FE3] sm:text-[54px] lg:text-[64px]">
            Technical depth,
            <br />
            <span className="text-[#009FE3]">in writing.</span>
          </h2>

          <p className="mx-auto mt-7 max-w-[850px] font-sans text-[19px] leading-[1.8] text-[#D0D9E5] sm:text-[21px] lg:text-[23px]">
            Our white papers will set out the physics, the architecture, and
            the evidence behind each claim, for engineers, investors, and
            institutions.
          </p>
        </div>

        {/* White Paper Cards */}
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {whitePapers.map((paper) => {
            const Icon = paper.icon;
            const isActive = activeId === paper.number;

            return (
              <article
                key={paper.number}
                data-paper-card
                tabIndex={0}
                onPointerDown={(e) => {
                  if (e.pointerType !== "mouse") {
                    setActiveId(paper.number);
                  }
                }}
                onPointerEnter={(e) => {
                  if (e.pointerType === "mouse") {
                    setActiveId(paper.number);
                  }
                }}
                onPointerLeave={(e) => {
                  if (e.pointerType === "mouse") {
                    setActiveId(null);
                  }
                }}
                onFocus={() => setActiveId(paper.number)}
                onBlur={() => setActiveId(null)}
                className={`group relative cursor-pointer select-none overflow-hidden rounded-3xl border-2 p-7 outline-none [-webkit-tap-highlight-color:transparent] touch-manipulation transition-all duration-500 ease-out active:scale-[0.97] ${
                  isActive
                    ? "-translate-y-2 scale-[1.02] border-[#009FE3] bg-[#0C1822] shadow-[0_0_0_1px_rgba(0,159,227,0.4),0_20px_60px_-10px_rgba(0,159,227,0.25)]"
                    : "border-white/10 bg-[#0A111A]/80"
                }`}
              >
                {/* Top Accent Line */}
                <span
                  className={`absolute left-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[#009FE3] to-transparent transition-all duration-500 ${
                    isActive ? "w-full opacity-100" : "w-0 opacity-0"
                  }`}
                />

                {/* Glow */}
                <span
                  className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#009FE3]/20 blur-[70px] transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* Shine Effect */}
                <span
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent transition-transform duration-1000 ${
                    isActive ? "translate-x-full" : "-translate-x-full"
                  }`}
                />

                {/* Number and Icon */}
                <div className="relative flex items-start justify-between">
                  <span
                    className={`font-sans text-[12px] font-medium tracking-[0.15em] transition-colors duration-300 ${
                      isActive ? "text-[#009FE3]" : "text-[#009FE3]/60"
                    }`}
                  >
                    PAPER {paper.number}
                  </span>

                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-500 ${
                      isActive
                        ? "rotate-6 border-[#009FE3] bg-[#009FE3] text-[#05080F]"
                        : "border-white/10 bg-white/[0.03] text-[#009FE3]"
                    }`}
                  >
                    {isActive ? (
                      <Check size={19} strokeWidth={2.5} />
                    ) : (
                      <Icon size={19} strokeWidth={1.7} />
                    )}
                  </div>
                </div>

                {/* Card Title */}
                <h3 className="relative mt-8 font-sans text-[21px] font-semibold leading-7 text-white">
                  {paper.title}
                </h3>

                {/* Card Description */}
                <p
                  className={`relative mt-4 font-sans text-[14px] leading-6 transition-colors duration-300 ${
                    isActive ? "text-[#D0D9E5]" : "text-[#8290A5]"
                  }`}
                >
                  {paper.description}
                </p>

                {/* Card Footer */}
                <div
                  className={`relative mt-8 flex items-center justify-between border-t pt-5 transition-colors duration-300 ${
                    isActive ? "border-[#009FE3]/30" : "border-white/10"
                  }`}
                >
                  <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#009FE3]">
                    {paper.status}
                  </span>

                  <span
                    className={`inline-flex items-center gap-1.5 text-[13px] transition-colors ${
                      isActive ? "text-white" : "text-white/55"
                    }`}
                  >
                    Read
                    <ArrowUpRight
                      size={15}
                      className={`transition-transform duration-300 ${
                        isActive ? "translate-x-0.5 -translate-y-0.5" : ""
                      }`}
                    />
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Statement */}
        <div className="mt-10 rounded-3xl border border-[#009FE3]/15 bg-[#0A151F]/50 px-7 py-6 text-center">
          <p className="font-sans text-[15px] leading-7 tracking-wide text-[#B8C5D6] sm:text-[16px]">
            Research <span className="text-[#009FE3]">·</span> Engineering{" "}
            <span className="text-[#009FE3]">·</span> Evidence
          </p>
        </div>
      </div>
    </section>
  );
}
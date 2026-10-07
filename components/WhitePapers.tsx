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

  // Tap/touch anywhere outside a card clears the effect
  useEffect(() => {
    const handleOutside = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-paper-card]")) setActiveId(null);
    };
    document.addEventListener("pointerdown", handleOutside);
    return () => document.removeEventListener("pointerdown", handleOutside);
  }, []);

  return (
    <section
      id="white-papers"
      className="relative overflow-hidden bg-[#05080F] py-24 sm:py-28 lg:py-32"
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
      </div>

      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-10">
        {/* Heading */}
        <div className="max-w-[760px]">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-[#4DE7E5]" />

            <span className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-[#65D8D5]">
              White Papers
            </span>
          </div>

          <h2 className="font-sans text-[38px] font-semibold leading-[1.1] tracking-[-0.025em] text-white sm:text-[48px] lg:text-[56px]">
            Technical depth,
            <br />
            <span className="text-white/55">in writing.</span>
          </h2>

          <p className="mt-5 max-w-[690px] font-sans text-[17px] leading-8 text-[#8290A5]">
            Our white papers will set out the physics, the architecture, and
            the evidence behind each claim, for engineers, investors, and
            institutions.
          </p>
        </div>

        {/* Paper cards */}
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {whitePapers.map((paper) => {
            const Icon = paper.icon;
            const isActive = activeId === paper.number;

            return (
              <article
                key={paper.number}
                data-paper-card
                tabIndex={0}
                // Touch / pen: activate on touch
                onPointerDown={(e) => {
                  if (e.pointerType !== "mouse") setActiveId(paper.number);
                }}
                // Mouse: activate on hover
                onPointerEnter={(e) => {
                  if (e.pointerType === "mouse") setActiveId(paper.number);
                }}
                onPointerLeave={(e) => {
                  if (e.pointerType === "mouse") setActiveId(null);
                }}
                // Keyboard
                onFocus={() => setActiveId(paper.number)}
                onBlur={() => setActiveId(null)}
                className={`group relative cursor-pointer select-none overflow-hidden rounded-3xl border-2 p-7 outline-none [-webkit-tap-highlight-color:transparent] touch-manipulation transition-all duration-500 ease-out active:scale-[0.97]
                  ${
                    isActive
                      ? "-translate-y-2 scale-[1.02] border-[#4DE7E5] bg-[#0C1822] shadow-[0_0_0_1px_rgba(77,231,229,0.4),0_20px_60px_-10px_rgba(77,231,229,0.35)]"
                      : "border-black bg-[#0A111A]/80"
                  }`}
              >
                {/* Top accent line */}
                <span
                  className={`absolute left-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[#4DE7E5] to-transparent transition-all duration-500 ${
                    isActive ? "w-full opacity-100" : "w-0 opacity-0"
                  }`}
                />

                {/* Glow blob */}
                <span
                  className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#4DE7E5]/20 blur-[70px] transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* Shine sweep */}
                <span
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent transition-transform duration-1000 ${
                    isActive ? "translate-x-full" : "-translate-x-full"
                  }`}
                />

                {/* Number + icon */}
                <div className="relative flex items-start justify-between">
                  <span
                    className={`font-sans text-[12px] font-medium tracking-[0.15em] transition-colors duration-300 ${
                      isActive ? "text-[#4DE7E5]" : "text-[#4DE7E5]/60"
                    }`}
                  >
                    PAPER {paper.number}
                  </span>

                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-500 ${
                      isActive
                        ? "rotate-6 border-[#4DE7E5] bg-[#4DE7E5] text-[#05080F]"
                        : "border-white/10 bg-white/[0.03] text-[#4DE7E5]"
                    }`}
                  >
                    {isActive ? (
                      <Check size={19} strokeWidth={2.5} />
                    ) : (
                      <Icon size={19} strokeWidth={1.7} />
                    )}
                  </div>
                </div>

                <h3 className="relative mt-8 font-sans text-[21px] font-semibold leading-7 text-white">
                  {paper.title}
                </h3>

                <p
                  className={`relative mt-4 font-sans text-[14px] leading-6 transition-colors duration-300 ${
                    isActive ? "text-[#B4C0D0]" : "text-[#8290A5]"
                  }`}
                >
                  {paper.description}
                </p>

                <div
                  className={`relative mt-8 flex items-center justify-between border-t pt-5 transition-colors duration-300 ${
                    isActive ? "border-[#4DE7E5]/30" : "border-white/10"
                  }`}
                >
                  <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#65D8D5]">
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

        {/* Bottom statement */}
        <div className="mt-10 rounded-3xl border border-[#4DE7E5]/10 bg-[#0A151F]/50 px-7 py-6">
          <p className="font-sans text-[14px] leading-6 text-[#8290A5]">
            Research · Engineering · Evidence
          </p>
        </div>
      </div>
    </section>
  );
}
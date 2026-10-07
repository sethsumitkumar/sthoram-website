"use client";

import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Check, MapPin } from "lucide-react";

const P1 = {
  number: "01",
  tag: "Project 01 — Commercialisation Underway",
  title: "Renewable Energy Storage",
  text: "India needs 86+ GWh of energy storage now, with 200 GWh of tenders outstanding — and zero domestic deep-tech solutions. STHORAM Labs' first commercialisation track delivers the missing layer: battery intelligence that makes storage safe, long-lived, and grid-ready.",
};

const P2 = {
  number: "02",
  tag: "Project 02 — In Development",
  title: "Life Sciences",
  text: "Our second project track applies the same first-principles, zero-noise approach to critical unsolved problems in the life sciences — where measurement, prediction, and containment matter just as much as they do in a battery",
};

export default function Projects() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const handleOutside = (e: PointerEvent) => {
      const target = e.target as HTMLElement;

      if (!target.closest("[data-project-card]")) {
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
      id="projects"
      className="relative overflow-hidden bg-[#05080F] py-24 sm:py-28 lg:py-32"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[20%] h-[500px] w-[500px] rounded-full bg-[#087F73]/[0.06] blur-[140px]" />

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
        <div className="max-w-[900px]">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-[#4DE7E5]" />

            <span className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-[#65D8D5]">
              Projects
            </span>
          </div>

          <h2 className="font-sans text-[38px] font-semibold leading-[1.1] tracking-[-0.025em] text-white sm:text-[48px] lg:text-[56px]">
            Two project tracks. One standard:
            <br />
            <span className="text-white/50">
              problems actually solved.
            </span>
          </h2>
        </div>

        {/* Project cards */}
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {/* Project 01 */}
          <article
            data-project-card
            tabIndex={0}
            onPointerDown={(e) => {
              if (e.pointerType !== "mouse") {
                setActiveId(P1.number);
              }
            }}
            onPointerEnter={(e) => {
              if (e.pointerType === "mouse") {
                setActiveId(P1.number);
              }
            }}
            onPointerLeave={(e) => {
              if (e.pointerType === "mouse") {
                setActiveId(null);
              }
            }}
            onFocus={() => setActiveId(P1.number)}
            onBlur={() => setActiveId(null)}
            className={`group relative cursor-pointer select-none overflow-hidden rounded-3xl border-2 p-7 outline-none [-webkit-tap-highlight-color:transparent] touch-manipulation transition-all duration-500 ease-out active:scale-[0.98] sm:p-9 ${
              activeId === P1.number
                ? "-translate-y-2 scale-[1.01] border-[#4DE7E5] bg-[#0C1822] shadow-[0_0_0_1px_rgba(77,231,229,0.4),0_20px_60px_-10px_rgba(77,231,229,0.35)]"
                : "border-black bg-[#0A111A]/80"
            }`}
          >
            {/* Top accent */}
            <span
              className={`absolute left-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[#4DE7E5] to-transparent transition-all duration-500 ${
                activeId === P1.number
                  ? "w-full opacity-100"
                  : "w-0 opacity-0"
              }`}
            />

            {/* Glow */}
            <span
              className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#4DE7E5]/20 blur-[70px] transition-opacity duration-500 ${
                activeId === P1.number ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Shine */}
            <span
              className={`pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent transition-transform duration-1000 ${
                activeId === P1.number
                  ? "translate-x-full"
                  : "-translate-x-full"
              }`}
            />

            {/* Header */}
            <div className="relative flex items-start justify-between">
              <span
                className={`font-sans text-[12px] font-medium uppercase tracking-[0.15em] transition-colors duration-300 ${
                  activeId === P1.number
                    ? "text-[#4DE7E5]"
                    : "text-[#4DE7E5]/60"
                }`}
              >
                PROJECT {P1.number}
              </span>

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-500 ${
                  activeId === P1.number
                    ? "rotate-6 border-[#4DE7E5] bg-[#4DE7E5] text-[#05080F]"
                    : "border-white/10 bg-white/[0.03] text-[#4DE7E5]"
                }`}
              >
                {activeId === P1.number ? (
                  <Check size={19} strokeWidth={2.5} />
                ) : (
                  <ArrowUpRight size={19} strokeWidth={1.7} />
                )}
              </div>
            </div>

            {/* Tag */}
            <div className="relative mt-7">
              <span
                className={`font-sans text-[11px] font-medium uppercase tracking-[0.14em] transition-colors duration-300 ${
                  activeId === P1.number
                    ? "text-white"
                    : "text-white/60"
                }`}
              >
                {P1.tag}
              </span>
            </div>

            {/* Title */}
            <h3 className="relative mt-5 font-sans text-[27px] font-semibold leading-[1.15] tracking-[-0.02em] text-white sm:text-[32px]">
              {P1.title}
            </h3>

            {/* Description */}
            <p
              className={`relative mt-4 font-sans text-[14px] leading-6 transition-colors duration-300 sm:text-[15px] ${
                activeId === P1.number
                  ? "text-[#B4C0D0]"
                  : "text-[#8290A5]"
              }`}
            >
              {P1.text}
            </p>

            {/* BMS offering */}
            <div
              className={`relative mt-8 border-t pt-6 transition-colors duration-300 ${
                activeId === P1.number
                  ? "border-[#4DE7E5]/30"
                  : "border-white/10"
              }`}
            >
              <h4 className="font-sans text-[19px] font-semibold leading-snug text-white">
                First commercialisation offering:{" "}
                <span className="text-[#6FDCD8]">STHORAM BMS</span>
              </h4>

              <p className="mt-3 font-sans text-[13px] leading-6 text-[#8290A5]">
                The world&apos;s only battery management system maintaining
                continuous cell-level electrochemical equilibrium — charging,
                discharging, idle, fast charge — always, automatically,
                simultaneously.
              </p>

              <a
                href="#"
                onClick={(e) => e.stopPropagation()}
                className={`group/btn mt-6 inline-flex items-center gap-2 font-sans text-[13px] font-medium transition-colors ${
                  activeId === P1.number
                    ? "text-[#4DE7E5]"
                    : "text-[#65D8D5]"
                }`}
              >
                View the Product Page
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover/btn:translate-x-1"
                />
              </a>
            </div>

            {/* Bottom status */}
            <div
              className={`relative mt-7 flex items-center justify-between border-t pt-5 transition-colors duration-300 ${
                activeId === P1.number
                  ? "border-[#4DE7E5]/30"
                  : "border-white/10"
              }`}
            >
              <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#65D8D5]">
                Commercialisation Underway
              </span>

              <span
                className={`inline-flex items-center gap-1.5 text-[13px] transition-colors ${
                  activeId === P1.number
                    ? "text-white"
                    : "text-white/55"
                }`}
              >
                Explore
                <ArrowUpRight
                  size={15}
                  className={`transition-transform duration-300 ${
                    activeId === P1.number
                      ? "translate-x-0.5 -translate-y-0.5"
                      : ""
                  }`}
                />
              </span>
            </div>
          </article>

          {/* Project 02 */}
          <article
            data-project-card
            tabIndex={0}
            onPointerDown={(e) => {
              if (e.pointerType !== "mouse") {
                setActiveId(P2.number);
              }
            }}
            onPointerEnter={(e) => {
              if (e.pointerType === "mouse") {
                setActiveId(P2.number);
              }
            }}
            onPointerLeave={(e) => {
              if (e.pointerType === "mouse") {
                setActiveId(null);
              }
            }}
            onFocus={() => setActiveId(P2.number)}
            onBlur={() => setActiveId(null)}
            className={`group relative cursor-pointer select-none overflow-hidden rounded-3xl border-2 p-7 outline-none [-webkit-tap-highlight-color:transparent] touch-manipulation transition-all duration-500 ease-out active:scale-[0.98] sm:p-9 ${
              activeId === P2.number
                ? "-translate-y-2 scale-[1.01] border-[#4DE7E5] bg-[#0C1822] shadow-[0_0_0_1px_rgba(77,231,229,0.4),0_20px_60px_-10px_rgba(77,231,229,0.35)]"
                : "border-black bg-[#0A111A]/80"
            }`}
          >
            {/* Top accent */}
            <span
              className={`absolute left-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[#4DE7E5] to-transparent transition-all duration-500 ${
                activeId === P2.number
                  ? "w-full opacity-100"
                  : "w-0 opacity-0"
              }`}
            />

            {/* Glow */}
            <span
              className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#4DE7E5]/20 blur-[70px] transition-opacity duration-500 ${
                activeId === P2.number ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Shine */}
            <span
              className={`pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent transition-transform duration-1000 ${
                activeId === P2.number
                  ? "translate-x-full"
                  : "-translate-x-full"
              }`}
            />

            {/* Header */}
            <div className="relative flex items-start justify-between">
              <span
                className={`font-sans text-[12px] font-medium uppercase tracking-[0.15em] transition-colors duration-300 ${
                  activeId === P2.number
                    ? "text-[#4DE7E5]"
                    : "text-[#4DE7E5]/60"
                }`}
              >
                PROJECT {P2.number}
              </span>

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-500 ${
                  activeId === P2.number
                    ? "rotate-6 border-[#4DE7E5] bg-[#4DE7E5] text-[#05080F]"
                    : "border-white/10 bg-white/[0.03] text-[#4DE7E5]"
                }`}
              >
                {activeId === P2.number ? (
                  <Check size={19} strokeWidth={2.5} />
                ) : (
                  <ArrowUpRight size={19} strokeWidth={1.7} />
                )}
              </div>
            </div>

            {/* Tag */}
            <div className="relative mt-7">
              <span
                className={`font-sans text-[11px] font-medium uppercase tracking-[0.14em] transition-colors duration-300 ${
                  activeId === P2.number
                    ? "text-white"
                    : "text-white/60"
                }`}
              >
                {P2.tag}
              </span>
            </div>

            {/* Title */}
            <h3 className="relative mt-5 font-sans text-[27px] font-semibold leading-[1.15] tracking-[-0.02em] text-white sm:text-[32px]">
              {P2.title}
            </h3>

            {/* Description */}
            <p
              className={`relative mt-4 font-sans text-[14px] leading-6 transition-colors duration-300 sm:text-[15px] ${
                activeId === P2.number
                  ? "text-[#B4C0D0]"
                  : "text-[#8290A5]"
              }`}
            >
              {P2.text}
            </p>

            {/* Bottom */}
            <div
              className={`relative mt-10 flex items-center justify-between border-t pt-6 transition-colors duration-300 ${
                activeId === P2.number
                  ? "border-[#4DE7E5]/30"
                  : "border-white/10"
              }`}
            >
              <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#65D8D5]">
                In Development
              </span>

              <span
                className={`inline-flex items-center gap-1.5 text-[13px] transition-colors ${
                  activeId === P2.number
                    ? "text-white"
                    : "text-white/55"
                }`}
              >
                Explore
                <ArrowUpRight
                  size={15}
                  className={`transition-transform duration-300 ${
                    activeId === P2.number
                      ? "translate-x-0.5 -translate-y-0.5"
                      : ""
                  }`}
                />
              </span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
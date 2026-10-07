"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, CalendarDays, MapPin, Check } from "lucide-react";

const newsItems = [
  {
    number: "01",
    date: "5–6 AUGUST 2026",
    location: "NEW DELHI",
    title: "STHORAM Labs exhibits at the CII Exhibition",
    description:
      "STHORAM BMS and NexCell BESS will be on display at the CII Exhibition, 5–6 August 2026, alongside our 24-patent portfolio and POC validation results. Visit us to see continuous cell-level equilibrium running live.",
    status: "Upcoming",
  },
  {
    number: "02",
    date: "JUNE 2026",
    location: "BHOPAL",
    title: "Proof-of-concept independently validated",
    description:
      "Our working proof-of-concept was witnessed and validated at Bhopal on 11–12 June 2026 by Dr. Vikrant Sharma (ADM Consultant), substantiating the core performance claims of STHORAM BMS.",
    status: "Latest Update",
  },
];

export default function News() {
  const [activeId, setActiveId] = useState<string | null>(null);

  // Tap/touch anywhere outside a card clears the effect
  useEffect(() => {
    const handleOutside = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-news-card]")) setActiveId(null);
    };
    document.addEventListener("pointerdown", handleOutside);
    return () => document.removeEventListener("pointerdown", handleOutside);
  }, []);

  return (
    <section
      id="news"
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
              News
            </span>
          </div>

          <h2 className="font-sans text-[38px] font-semibold leading-[1.1] tracking-[-0.025em] text-white sm:text-[48px] lg:text-[56px]">
            Latest from the lab.
          </h2>
        </div>

        {/* News cards */}
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {newsItems.map((item) => {
            const isActive = activeId === item.number;

            return (
              <article
                key={item.number}
                data-news-card
                tabIndex={0}
                // Touch / pen: activate on touch
                onPointerDown={(e) => {
                  if (e.pointerType !== "mouse") setActiveId(item.number);
                }}
                // Mouse: activate on hover
                onPointerEnter={(e) => {
                  if (e.pointerType === "mouse") setActiveId(item.number);
                }}
                onPointerLeave={(e) => {
                  if (e.pointerType === "mouse") setActiveId(null);
                }}
                // Keyboard
                onFocus={() => setActiveId(item.number)}
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
                    NEWS {item.number}
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
                      <CalendarDays size={19} strokeWidth={1.7} />
                    )}
                  </div>
                </div>

                {/* Date + location */}
                <div className="relative mt-7 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span
                    className={`font-sans text-[11px] font-medium tracking-[0.16em] transition-colors duration-300 ${
                      isActive ? "text-white" : "text-white/70"
                    }`}
                  >
                    {item.date}
                  </span>

                  <span className="flex items-center gap-1.5 text-white/40">
                    <MapPin size={13} strokeWidth={1.7} />
                    <span className="font-sans text-[11px] font-medium tracking-[0.16em]">
                      {item.location}
                    </span>
                  </span>
                </div>

                <h3 className="relative mt-5 font-sans text-[21px] font-semibold leading-7 text-white">
                  {item.title}
                </h3>

                <p
                  className={`relative mt-4 font-sans text-[14px] leading-6 transition-colors duration-300 ${
                    isActive ? "text-[#B4C0D0]" : "text-[#8290A5]"
                  }`}
                >
                  {item.description}
                </p>

                <div
                  className={`relative mt-8 flex items-center justify-between border-t pt-5 transition-colors duration-300 ${
                    isActive ? "border-[#4DE7E5]/30" : "border-white/10"
                  }`}
                >
                  <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#65D8D5]">
                    {item.status}
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
      </div>
    </section>
  );
}

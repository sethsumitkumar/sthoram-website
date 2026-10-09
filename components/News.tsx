
"use client";

import { useState } from "react";
import { ArrowUpRight, CalendarDays, MapPin, Check } from "lucide-react";

const navItems = [
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

const BRAND_BLUE = "#009FE3";

export default function News() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const goToGallery = () => {
    const gallery = document.getElementById("gallery");

    if (!gallery) {
      console.error('News: Gallery section with id="gallery" was not found.');
      return;
    }

    const targetPosition =
      gallery.getBoundingClientRect().top + window.scrollY - 90;

    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior: "smooth",
    });

    setActiveId(null);
  };

  return (
    <section
      id="news"
      className="relative overflow-hidden bg-[#05080F] py-24 sm:py-28 lg:py-32"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-10%] top-[20%] h-[500px] w-[500px] rounded-full bg-[#009FE3]/[0.06] blur-[140px]" />

        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-10">
        {/* Centered Heading */}
        <div className="mx-auto max-w-[1000px] text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#009FE3]" />

            <span className="font-sans text-[14px] font-bold uppercase tracking-[0.22em] text-[#009FE3] sm:text-[16px]">
              News
            </span>

            <span className="h-px w-10 bg-[#009FE3]" />
          </div>

          <h2 className="font-sans text-[42px] font-bold leading-[1.1] tracking-[-0.025em] text-[#009FE3] sm:text-[52px] lg:text-[60px]">
            Latest from the lab.
          </h2>
        </div>

        {/* News Cards */}
        <div className="mt-12 grid gap-6 md:mt-14 md:grid-cols-2">
          {navItems.map((item) => {
            const isActive = activeId === item.number;

            return (
              <article
                key={item.number}
                role="link"
                tabIndex={0}
                aria-label={`${item.title} — view Gallery`}
                onClick={goToGallery}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    goToGallery();
                  }
                }}
                onPointerEnter={(e) => {
                  if (e.pointerType === "mouse") setActiveId(item.number);
                }}
                onPointerLeave={(e) => {
                  if (e.pointerType === "mouse") setActiveId(null);
                }}
                onFocus={() => setActiveId(item.number)}
                onBlur={() => setActiveId(null)}
                className={`group relative cursor-pointer select-none overflow-hidden rounded-3xl border-2 p-7 outline-none [-webkit-tap-highlight-color:transparent] touch-manipulation transition-all duration-500 ease-out active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#009FE3] sm:p-9 ${
                  isActive
                    ? "-translate-y-1 border-[#009FE3] bg-[#0C1822] shadow-[0_0_0_1px_rgba(0,159,227,0.3),0_20px_60px_-10px_rgba(0,159,227,0.25)]"
                    : "border-white/10 bg-[#0A111A]/80 hover:border-[#009FE3]/40"
                }`}
              >
                {/* Accent Line */}
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

                {/* Number + Icon */}
                <div className="relative flex items-start justify-between">
                  <span
                    className={`font-sans text-[14px] font-semibold tracking-[0.15em] transition-colors duration-300 ${
                      isActive ? "text-[#009FE3]" : "text-[#009FE3]/70"
                    }`}
                  >
                    NEWS {item.number}
                  </span>

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-300 ${
                      isActive
                        ? "border-[#009FE3] bg-[#009FE3] text-[#05080F]"
                        : "border-white/10 bg-white/[0.03] text-[#009FE3]"
                    }`}
                  >
                    {isActive ? (
                      <Check size={22} strokeWidth={2.5} />
                    ) : (
                      <CalendarDays size={22} strokeWidth={1.7} />
                    )}
                  </div>
                </div>

                {/* Date + Location */}
                <div className="relative mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <span className="font-sans text-[13px] font-semibold tracking-[0.12em] text-white/80 sm:text-[14px]">
                    {item.date}
                  </span>

                  <span className="flex items-center gap-2 text-white/60">
                    <MapPin size={16} strokeWidth={1.7} />
                    <span className="font-sans text-[13px] font-semibold tracking-[0.12em] sm:text-[14px]">
                      {item.location}
                    </span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="relative mt-6 font-sans text-[24px] font-semibold leading-[1.3] text-white sm:text-[28px]">
                  {item.title}
                </h3>

                {/* Description */}
                <p
                  className={`relative mt-5 font-sans text-[16px] leading-7 transition-colors duration-300 sm:text-[17px] sm:leading-8 ${
                    isActive ? "text-[#CBD5E1]" : "text-[#9AA8BB]"
                  }`}
                >
                  {item.description}
                </p>

                {/* Footer */}
                <div
                  className={`relative mt-9 flex items-center justify-between gap-3 border-t pt-6 ${
                    isActive ? "border-[#009FE3]/30" : "border-white/10"
                  }`}
                >
                  <span className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#009FE3] sm:text-[13px]">
                    {item.status}
                  </span>

                  <span
                    className={`inline-flex items-center gap-2 font-sans text-[15px] font-medium transition-colors sm:text-[16px] ${
                      isActive ? "text-white" : "text-white/65"
                    }`}
                  >
                    View Gallery
                    <ArrowUpRight
                      size={19}
                      className={`transition-transform duration-300 ${
                        isActive
                          ? "translate-x-0.5 -translate-y-0.5"
                          : ""
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

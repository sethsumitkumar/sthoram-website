"use client";

import { CarFront, Zap, ShieldCheck, ArrowUpRight } from "lucide-react";

const verticals = [
  {
    id: "mobility",
    category: "Mobility",
    title: "Electric & Hybrid Vehicles",
    icon: CarFront,
    points: [
      "OEM drop-in for EV / HEV / PHEV",
      "+25% usable range — same cells",
      "2× cycle life — halves TCO",
      "India EV market: USD 150Bn 2030",
    ],
  },
  {
    id: "bess-grid",
    category: "BESS - Grid",
    title: "Energy Storage & Grid",
    icon: Zap,
    points: [
      "NexCell — High kV direct grid",
      "India: 200+ GWh mandated — now",
      "₹2 Lakh Cr India market · 200 GWh tenders",
      "ADM Solar Group — active SPV",
    ],
  },
  {
    id: "defence",
    category: "Defence",
    title: "Defence & Critical Infrastructure",
    icon: ShieldCheck,
    points: [
      "High-reliability BMS — field systems",
      "Predictive failure — weeks ahead",
      "Active thermal containment — field safe",
      "iDEX Challenge Ready",
    ],
  },
];

const SERIF = 'Georgia, "Times New Roman", serif';

export default function Verticals() {
  return (
    <section
      id="verticals"
      className="relative overflow-hidden bg-[#05080F] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-12 lg:py-28"
    >
      {/* Faint grid only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto max-w-[1400px]">
        {/* Section heading */}
        <div className="mb-12 sm:mb-14 lg:mb-16">
          <h2
            className="text-[clamp(30px,4vw,60px)] font-bold leading-[1.1] tracking-[-0.02em] text-white"
            style={{ fontFamily: SERIF }}
          >
            Three Distinct Verticals.{" "}
            <span className="text-[#7C8AA0]">One Technology.</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
          {verticals.map((item, index) => {
            const Icon = item.icon;

            return (
              <article
                key={item.id}
                className="group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border border-white/[0.18] bg-white/[0.02] p-7 shadow-[0_20px_40px_-28px_rgba(0,0,0,0.9)] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-[#4DE7E5]/70 hover:bg-white/[0.04] hover:shadow-[0_30px_60px_-30px_rgba(77,231,229,0.25)] sm:p-8"
              >
                {/* Top accent line: grows on hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#4DE7E5] to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100"
                />
                {/* Top row: number + category */}
                <div className="flex items-center justify-between">
                  <span
                    className="text-[18px] tracking-[0.1em] text-[#5B6A80]"
                    style={{ fontFamily: SERIF }}
                  >
                    0{index + 1}
                  </span>

                  <span className="text-[14px] font-medium uppercase tracking-[0.22em] text-[#8A97AB]">
                    {item.category}
                  </span>
                </div>

                {/* Icon */}
                <div className="mt-8 flex h-14 w-14 items-center justify-center rounded-lg border border-white/[0.18] text-[#65D8D5] transition-colors duration-300 group-hover:border-[#4DE7E5]/60 group-hover:bg-[#4DE7E5]/[0.08]">
                  <Icon size={26} strokeWidth={1.5} aria-hidden="true" />
                </div>

                {/* Title */}
                <h3
                  className="mt-6 text-[30px] font-bold leading-[1.2] tracking-[-0.01em] text-white sm:min-h-[82px] sm:text-[34px]"
                  style={{ fontFamily: SERIF }}
                >
                  {item.title}
                </h3>

                {/* Divider */}
                <div className="my-6 h-px w-full bg-white/[0.09]" />

                {/* Feature list */}
                <ul className="flex flex-1 flex-col gap-4">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-3.5">
                      <span className="mt-[13px] h-px w-3 shrink-0 bg-[#65D8D5]" />
                      <span className="text-[19px] leading-[1.6] text-[#B3BDCC] transition-colors duration-300 group-hover:text-[#D5DBE6]">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Footer */}
                <div className="mt-8 flex items-center justify-end border-t border-white/[0.09] pt-5">
                  <ArrowUpRight
                    size={18}
                    strokeWidth={1.5}
                    className="text-[#5B6A80] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#65D8D5]"
                    aria-hidden="true"
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

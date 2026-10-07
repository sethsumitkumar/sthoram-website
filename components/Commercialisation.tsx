"use client";

import { ArrowRight, BatteryCharging, Cpu, Zap } from "lucide-react";

export default function Commercialisation() {
  return (
    <section
      id="commercialisation"
      className="relative overflow-hidden bg-[#071019] py-24 sm:py-28 lg:py-32"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(77,231,229,0.12) 1px, transparent 1px),
              linear-gradient(90deg, rgba(77,231,229,0.12) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="absolute left-1/4 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[#087F73]/10 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-10">
        {/* Section heading */}
        <div className="max-w-[760px]">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-[#4DE7E5]" />

            <span className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-[#65D8D5]">
              First Commercialisation Offering
            </span>
          </div>

          <h2 className="font-sans text-[38px] font-semibold leading-[1.1] tracking-[-0.025em] text-white sm:text-[48px] lg:text-[56px]">
            STHORAM BMS
          </h2>

          <p className="mt-5 max-w-[680px] font-sans text-[17px] leading-8 text-[#8290A5]">
            Our first commercialisation offering is built around advanced
            battery management technology for renewable energy storage.
          </p>
        </div>

        {/* Main content */}
        <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Main card */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0A151F]/80 p-8 backdrop-blur-xl sm:p-10 lg:p-12">
            <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-[#4DE7E5]/5 blur-[80px]" />

            <div className="relative">
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#4DE7E5]/20 bg-[#4DE7E5]/10 text-[#4DE7E5]">
                <BatteryCharging size={27} strokeWidth={1.7} />
              </div>

              <h3 className="font-sans text-[28px] font-semibold text-white sm:text-[34px]">
                Intelligent Battery Management
              </h3>

              <p className="mt-5 max-w-[650px] font-sans text-[16px] leading-7 text-[#8290A5]">
                STHORAM BMS is designed to provide intelligent monitoring,
                protection and control for energy storage systems, helping
                improve safety, reliability and battery performance.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-[13px] text-white/70">
                  Battery Intelligence
                </div>

                <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-[13px] text-white/70">
                  Real-Time Monitoring
                </div>

                <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-[13px] text-white/70">
                  Energy Storage
                </div>
              </div>

              <button className="group mt-10 inline-flex items-center gap-2 font-sans text-[14px] font-medium text-[#65E4E1] transition-colors hover:text-white">
                Discover STHORAM BMS

                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>

          {/* Supporting cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-3xl border border-white/10 bg-[#0A151F]/70 p-7 backdrop-blur-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#4DE7E5]/20 bg-[#4DE7E5]/10 text-[#4DE7E5]">
                <Cpu size={23} strokeWidth={1.7} />
              </div>

              <h3 className="mt-6 font-sans text-[21px] font-semibold text-white">
                Deep-Tech Engineering
              </h3>

              <p className="mt-3 font-sans text-[14px] leading-6 text-[#8290A5]">
                Proprietary technology developed to address demanding
                industrial energy-storage challenges.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#0A151F]/70 p-7 backdrop-blur-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#4DE7E5]/20 bg-[#4DE7E5]/10 text-[#4DE7E5]">
                <Zap size={23} strokeWidth={1.7} />
              </div>

              <h3 className="mt-6 font-sans text-[21px] font-semibold text-white">
                NexCell BESS
              </h3>

              <p className="mt-3 font-sans text-[14px] leading-6 text-[#8290A5]">
                A battery energy storage system built around the next
                generation of intelligent energy management.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
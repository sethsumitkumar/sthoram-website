"use client";

import { ArrowUpRight } from "lucide-react";

const teamMembers = [
  {
    initials: "AJ",
    name: "Ankur Jain",
    role: "SAVANT · PRINCIPAL INVENTOR · CTO",
    description:
      "Approaches industrial problems from a state of zero-noise consciousness. The nine core STHORAM BMS innovations are his creation — not incremental improvements, but a different category of technology entirely.",
  },
  {
    initials: "PK",
    name: "Prabhpreet Singh Khinda",
    role: "INDUSTRIAL ENGINEER · SERIAL ENTREPRENEUR",
    description:
      "30+ years building and scaling ventures. MSc Minerals Engineering. Commercial architect of the capital roadmap — from seed to USD 750M programme to IPO.",
  },
  {
    initials: "VS",
    name: "Vishwas Tiwari",
    role: "AUTHOR · THOUGHT LEADER · CO-FOUNDER",
    description:
      "Serial entrepreneur and success story of distribution and marketing. Pan-India network and a solid management pillar of the company.",
  },
];

const BLUE = "#009FE3";

export default function Team() {
  return (
    <section
      id="team"
      className="relative scroll-mt-[90px] overflow-hidden bg-[#05080F] py-24 sm:py-28 lg:py-32"
    >
      {/* Ambient Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[15%] top-[18%] h-[400px] w-[400px] rounded-full bg-[#009FE3]/[0.055] blur-[150px]" />

        <div className="absolute bottom-[-15%] right-[10%] h-[450px] w-[450px] rounded-full bg-[#009FE3]/[0.035] blur-[160px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,159,227,0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,159,227,0.8) 1px, transparent 1px)
            `,
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-10">
        {/* Centered Heading */}
        <div className="mx-auto max-w-[1000px] text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#009FE3]" />

            <span className="font-sans text-[15px] font-bold uppercase tracking-[0.25em] text-[#009FE3] sm:text-[17px]">
              Team
            </span>

            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#009FE3]" />
          </div>

          <h2 className="mt-7 font-sans text-[40px] font-bold leading-[1.12] tracking-[-0.03em] text-[#009FE3] sm:text-[52px] lg:text-[64px]">
            The people behind the
            <br className="hidden sm:block" />{" "}
            <span className="text-[#009FE3]">innovations.</span>
          </h2>
        </div>

        {/* Team Cards */}
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <article
              key={member.initials}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.10] bg-[#09111C]/90 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#009FE3]/45 hover:bg-[#0B1622] hover:shadow-[0_24px_60px_rgba(0,0,0,0.30)] sm:p-8"
            >
              {/* Card Glow */}
              <div className="pointer-events-none absolute left-1/2 top-[-100px] h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-[#009FE3]/[0.045] blur-[80px] transition-all duration-500 group-hover:bg-[#009FE3]/[0.09]" />

              {/* Card Number */}
              <span className="absolute right-7 top-7 font-sans text-[14px] tracking-[0.2em] text-white/45">
                0{index + 1}
              </span>

              {/* Initials */}
              <div className="relative flex justify-center">
                <div className="relative flex h-[110px] w-[110px] items-center justify-center rounded-full border border-[#009FE3]/40 bg-[#009FE3]/15 transition-all duration-300 group-hover:border-[#009FE3]/70 group-hover:bg-[#009FE3]/25">
                  <span className="font-sans text-[34px] font-bold tracking-[-0.03em] text-[#42BFFF]">
                    {member.initials}
                  </span>

                  <div className="absolute inset-[-7px] rounded-full border border-[#009FE3]/15" />
                </div>
              </div>

              {/* Name and Role */}
              <div className="relative mt-8 text-center">
                <h3 className="font-sans text-[27px] font-bold leading-tight tracking-[-0.02em] text-white sm:text-[29px]">
                  {member.name}
                </h3>

                <p className="mx-auto mt-4 max-w-[340px] font-sans text-[14px] font-semibold uppercase leading-7 tracking-[0.10em] text-[#42BFFF] sm:text-[15px]">
                  {member.role}
                </p>
              </div>

              {/* Divider */}
              <div className="relative mx-auto mt-7 h-px w-[80%] bg-gradient-to-r from-transparent via-[#009FE3]/30 to-transparent" />

              {/* Description */}
              <p className="relative mt-7 flex-1 text-center font-sans text-[18px] leading-[1.9] text-[#D0D9E5] sm:text-[19px]">
                {member.description}
              </p>

              {/* Card Footer */}
              <div className="relative mt-8 flex items-center justify-between border-t border-white/[0.10] pt-5">
                <span className="font-sans text-[13px] font-semibold uppercase tracking-[0.18em] text-white/55">
                  STHORAM LABS
                </span>

                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/55 transition-all duration-300 group-hover:border-[#009FE3]/50 group-hover:text-[#42BFFF]">
                  <ArrowUpRight size={20} strokeWidth={1.7} />
                </span>
              </div>

              {/* Bottom Accent */}
              <div className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#009FE3] to-transparent transition-all duration-500 group-hover:w-[65%]" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
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
    initials: "AS",
    name: "Aseem Singh",
    role: "AUTHOR · THOUGHT LEADER · CO-FOUNDER",
    description:
      "Serial entrepreneur and success story of distribution and marketing. Pan-India network and a solid management pillar of the company.",
  },
];

export default function Team() {
  return (
    <section
      id="team"
      className="relative overflow-hidden bg-[#05080F] py-28 sm:py-32 lg:py-36"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[15%] top-[18%] h-[400px] w-[400px] rounded-full bg-[#087F73]/[0.045] blur-[150px]" />

        <div className="absolute bottom-[-15%] right-[10%] h-[450px] w-[450px] rounded-full bg-[#075C32]/[0.035] blur-[160px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(77,231,229,0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(77,231,229,0.8) 1px, transparent 1px)
            `,
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-10">
        {/* Heading */}
        <div className="max-w-[720px]">
          <div className="flex items-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-[#4DE7E5] to-transparent" />

            <span className="font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-[#67D9D5]">
              Team
            </span>
          </div>

          <h2 className="mt-7 font-sans text-[42px] font-semibold leading-[1.08] tracking-[-0.035em] text-[#F2F6FF] sm:text-[52px] lg:text-[60px]">
            The people behind the
            <br />
            <span className="text-white/55">innovations.</span>
          </h2>
        </div>

        {/* Team cards */}
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <article
              key={member.initials}
              className="group relative overflow-hidden rounded-[28px] border border-white/[0.09] bg-[#09111C]/85 p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#4DE7E5]/25 hover:bg-[#0B1622] hover:shadow-[0_28px_80px_rgba(0,0,0,0.38)] sm:p-8"
            >
              {/* Card glow */}
              <div className="pointer-events-none absolute left-1/2 top-[-100px] h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-[#4DE7E5]/[0.045] blur-[80px] transition-all duration-500 group-hover:bg-[#4DE7E5]/[0.09]" />

              {/* Card number */}
              <span className="absolute right-7 top-7 font-sans text-[10px] tracking-[0.2em] text-white/20">
                0{index + 1}
              </span>

              {/* Initials */}
              <div className="relative flex justify-center">
                <div className="relative flex h-[92px] w-[92px] items-center justify-center rounded-full border border-[#4DE7E5]/25 bg-gradient-to-br from-[#4DE7E5] to-[#5DE8D0] shadow-[0_0_45px_rgba(77,231,229,0.14)] transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_0_60px_rgba(77,231,229,0.22)]">
                  <span className="font-sans text-[25px] font-semibold tracking-[-0.03em] text-[#061116]">
                    {member.initials}
                  </span>

                  <div className="absolute inset-[-7px] rounded-full border border-[#4DE7E5]/10" />
                </div>
              </div>

              {/* Name */}
              <div className="relative mt-8 text-center">
                <h3 className="font-sans text-[21px] font-semibold tracking-[-0.01em] text-[#EAF0F8]">
                  {member.name}
                </h3>

                <p className="mx-auto mt-3 max-w-[260px] font-sans text-[10px] font-medium uppercase leading-4 tracking-[0.18em] text-[#62D9D3]">
                  {member.role}
                </p>
              </div>

              {/* Divider */}
              <div className="relative mx-auto mt-7 h-px w-[80%] bg-gradient-to-r from-transparent via-white/[0.10] to-transparent" />

              {/* Description */}
              <p className="relative mt-7 text-center font-sans text-[14px] leading-6 text-[#77869B]">
                {member.description}
              </p>

              {/* Bottom */}
              <div className="relative mt-8 flex items-center justify-between border-t border-white/[0.07] pt-5">
                <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-white/25">
                  STHORAM LABS
                </span>

                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/25 transition-all duration-300 group-hover:border-[#4DE7E5]/30 group-hover:text-[#4DE7E5]">
                  <ArrowUpRight size={15} strokeWidth={1.6} />
                </span>
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#4DE7E5] to-transparent transition-all duration-500 group-hover:w-[65%]" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
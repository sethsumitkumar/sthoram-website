"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

const body = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

/* ---------- Count-up number (runs once when visible) ---------- */
function CountUp({
  to,
  decimals = 0,
  suffix = "",
  duration = 1600,
}: {
  to: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }

    let raf: number | undefined;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        io.disconnect();

        const start = performance.now();

        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);

          setValue(to * (1 - Math.pow(1 - t, 4)));

          if (t < 1) {
            raf = requestAnimationFrame(tick);
          }
        };

        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    io.observe(el);

    return () => {
      io.disconnect();

      if (raf !== undefined) {
        cancelAnimationFrame(raf);
      }
    };
  }, [to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ---------- Stat cell: quiet, one hairline reacts on hover ---------- */
function Stat({
  children,
  label,
  className = "",
}: {
  children: React.ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`group relative flex flex-col items-center justify-center px-4 py-6 text-center sm:py-7 ${className}`}
    >
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-[#4DE7E5] to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100" />

      <div
        className={`${display.className} flex items-center gap-1.5 bg-gradient-to-b from-[#7DF2F0] to-[#3FD3D6] bg-clip-text text-[26px] font-semibold leading-none tracking-[-0.01em] text-transparent transition-all duration-500 group-hover:from-white group-hover:to-[#5CE8D2] sm:text-[32px]`}
      >
        {children}
      </div>

      <div className="mt-2.5 text-[11px] font-medium uppercase tracking-[0.12em] text-[#64748A] transition-colors duration-500 group-hover:text-[#9FDCD9]">
        {label}
      </div>
    </div>
  );
}

export default function Hero() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section
      className={`${body.className} relative flex min-h-[100svh] flex-col overflow-hidden bg-[#04070D] pt-[74px]`}
    >
      <style>{`
        @keyframes hero-rise {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: none; }
        }

        @keyframes hero-ping {
          0% { transform: scale(1); opacity: .6; }
          80%,100% { transform: scale(3); opacity: 0; }
        }

        .hero-rise {
          opacity: 0;
          animation: hero-rise .9s cubic-bezier(.2,.7,.2,1) forwards;
        }

        .hero-ping {
          animation: hero-ping 2.4s cubic-bezier(0,0,.2,1) infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-rise {
            animation: none;
            opacity: 1;
          }

          .hero-ping {
            animation: none;
          }
        }
      `}</style>

      {/* ---------- Background (same palette) ---------- */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(72,224,224,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(72,224,224,0.10) 1px, transparent 1px)",
          backgroundSize: "54px 54px",
          maskImage:
            "radial-gradient(ellipse 75% 65% at 50% 45%, #000 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 65% at 50% 45%, #000 30%, transparent 100%)",
        }}
      />

      <div className="pointer-events-none absolute left-[56%] top-[40%] h-[560px] w-[760px] -translate-x-1/2 rounded-full bg-[#0A9E8F]/[0.15] blur-[150px]" />

      <div className="pointer-events-none absolute right-[6%] top-[14%] h-[380px] w-[380px] rounded-full bg-[#2BA8FF]/[0.11] blur-[130px]" />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 45%, rgba(2,4,8,0.7) 100%)",
        }}
      />

      {/* ---------- Main content ---------- */}
      <div className="relative mx-auto flex w-full max-w-[1280px] flex-1 items-center px-6 py-8 lg:px-10 lg:py-10">
        <div className="max-w-[1100px]">
          {/* Status line */}
          <div
            className="hero-rise mb-6 flex items-center gap-3 lg:mb-7"
            style={{ animationDelay: "0.05s" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="hero-ping absolute inline-flex h-full w-full rounded-full bg-[#4DE7E5]" />

              <span className="relative h-2 w-2 rounded-full bg-[#4DE7E5]" />
            </span>

            <span className="text-[11.5px] font-medium tracking-[0.1em] text-[#8CE6E1] sm:text-[12.5px]">
              DEEP TECH INNOVATIONS · 24+ PATENTS FILED · POC VALIDATED
            </span>

            <span className="hidden h-px w-16 bg-gradient-to-r from-[#4DE7E5]/40 to-transparent sm:block" />
          </div>

          {/* Heading */}
          <h1
            className={`${display.className} hero-rise font-semibold leading-[1.06] tracking-[-0.03em] text-[#F4F7FF]`}
            style={{
              animationDelay: "0.15s",
              fontSize: "clamp(38px, min(6.2vw, 9.4vh), 88px)",
            }}
          >
            Solving the critical
            <br />
            problems the industry has
            <br />
            <span className="text-[#6FDCD8]">
              stopped trying to solve.
            </span>
          </h1>

          {/* Description */}
          <p
            className="hero-rise mt-6 max-w-[64ch] text-[16px] leading-[1.75] text-[#94A2B6] sm:text-[17px] lg:mt-7"
            style={{ animationDelay: "0.28s" }}
          >
            STHORAM Labs is a deep-tech innovation company built for the
            hardest problems in industry. Our first project —{" "}
            <span className="font-medium text-white/95">
              Renewable Energy Storage
            </span>{" "}
            — begins commercialisation with STHORAM BMS and NexCell BESS. Our
            second —{" "}
            <span className="font-medium text-white/95">
              Life Sciences
            </span>{" "}
            — is in development. Indian IP. Global impact.
          </p>

          {/* Actions */}
          <div
            className="hero-rise mt-8 flex flex-wrap items-center gap-3.5 lg:mt-10"
            style={{ animationDelay: "0.4s" }}
          >
            <button
              onClick={scrollToProjects}
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#5CE8D8] px-7 py-3.5 text-[14.5px] font-semibold text-[#041014] transition-colors duration-300 hover:bg-[#8CF3E8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4DE7E5]"
            >
              Explore Our Projects

              <ArrowRight
                size={17}
                strokeWidth={2.2}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

            <button
              onClick={scrollToProjects}
              className="rounded-full border border-white/15 px-7 py-3.5 text-[14.5px] font-medium text-white/80 transition-colors duration-300 hover:border-[#4DE7E5]/50 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4DE7E5]"
            >
              First Offering: STHORAM BMS
            </button>
          </div>
        </div>
      </div>

      {/* ---------- Stats strip ---------- */}
      <div
        className="hero-rise relative mt-auto w-full"
        style={{ animationDelay: "0.6s" }}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#4DE7E5]/35 to-transparent" />

        <div className="relative border-b border-white/[0.06] bg-[#060B13]/70 backdrop-blur-xl">
          <div className="mx-auto grid max-w-[1280px] grid-cols-2 md:grid-cols-5 [&>*]:border-white/[0.06] [&>*:not(:last-child)]:border-r max-md:[&>*:nth-child(-n+4)]:border-b">
            <Stat label="Patents Filed">
              <CountUp to={24} suffix="+" />
            </Stat>

            <Stat label="Innovations">
              <CountUp to={9} />
            </Stat>

            <Stat label="Validated">
              <Check
                size={25}
                strokeWidth={2.6}
                className="text-[#6CEFE9]"
              />

              <span>POC</span>
            </Stat>

            <Stat label="SoC Equilibrium">
              <CountUp to={100} decimals={1} suffix="%" />
            </Stat>

            <Stat
              label="Project Tracks"
              className="max-md:col-span-2 max-md:!border-r-0"
            >
              <CountUp to={2} />
            </Stat>
          </div>
        </div>
      </div>
    </section>
  );
}
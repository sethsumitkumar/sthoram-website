"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { Bodoni_Moda, Instrument_Sans } from "next/font/google";

/* High-contrast didone: luxury / editorial feel, close to the reference slide */
const display = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

const body = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/* ---------- Count-up number ---------- */

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
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    io.observe(el);

    return () => {
      io.disconnect();
      if (raf !== undefined) cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ---------- Stat Card ---------- */
/* Quiet on purpose: ivory numerals, one brand accent, no glow/gradients */

function StatCard({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="group relative flex h-[172px] flex-col items-center justify-center overflow-hidden rounded-[6px] border border-white/[0.07] bg-[#0A0F18] px-5 text-center transition-colors duration-500 hover:border-[#0796E2]/35 hover:bg-[#0C121D] sm:h-[190px] lg:h-[208px]"
      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
    >
      {/* Short accent that opens to full width on hover */}
      <span className="absolute left-1/2 top-0 h-[2px] w-10 -translate-x-1/2 bg-[#0796E2] transition-[width] duration-500 ease-out group-hover:w-full" />

      {/* Value */}
      <div
        className={`${display.className} flex items-center justify-center gap-1.5 text-[50px] font-medium leading-none tracking-[-0.01em] text-[#F2F5FA] sm:text-[58px] lg:text-[66px]`}
        style={{ fontVariantNumeric: "lining-nums" }}
      >
        {children}
      </div>

      {/* Label (font size increased) */}
      <div className="mt-6 text-[15px] font-medium leading-none tracking-[0.03em] text-[#8E9BAF] sm:mt-7 sm:text-[17px] lg:text-[19px]">
        {label}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      className={`${body.className} relative min-h-[calc(100svh-68px)] overflow-hidden bg-black text-white`}
    >
      <style>{`
        @keyframes hero-rise {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes hero-mark {
          from { opacity: 0; transform: translateY(10px); filter: blur(8px); }
          to   { opacity: 1; transform: none; filter: blur(0); }
        }
        @keyframes hero-rule {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }

        .hero-rise { opacity: 0; animation: hero-rise .9s cubic-bezier(.2,.7,.2,1) forwards; }
        .hero-mark { opacity: 0; animation: hero-mark 1.3s cubic-bezier(.2,.7,.2,1) .05s forwards; }
        .rule-l { transform-origin: right; transform: scaleX(0); animation: hero-rule 1.1s cubic-bezier(.2,.7,.2,1) .7s forwards; }
        .rule-r { transform-origin: left;  transform: scaleX(0); animation: hero-rule 1.1s cubic-bezier(.2,.7,.2,1) .7s forwards; }

        .stat-plus {
          align-self: flex-start;
          margin-top: 0.14em;
          font-size: 0.46em;
          font-weight: 500;
          line-height: 1;
          color: #0796E2;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-rise, .hero-mark { animation: none; opacity: 1; filter: none; transform: none; }
          .rule-l, .rule-r { animation: none; transform: none; }
        }
      `}</style>

      {/* ---------- Background ---------- */}

      <div className="pointer-events-none absolute inset-0">
        {/* Soft right-side blue atmosphere */}
        <div className="absolute right-[-7%] top-[-12%] h-[680px] w-[680px] rounded-full bg-[#071521] opacity-80 blur-[25px]" />

        {/* Large tilted shape */}
        <div className="absolute right-[-15%] top-[-5%] h-[720px] w-[520px] rotate-[-19deg] rounded-full border border-[#12293B]/50 bg-[#06111B]/35" />

        {/* Faint light behind the wordmark */}
        <div className="absolute left-1/2 top-[18%] h-[360px] w-[900px] -translate-x-1/2 rounded-full bg-[#0796E2]/[0.07] blur-[120px]" />

        {/* Edge vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.65) 100%)",
          }}
        />
      </div>

      {/* ---------- Content ---------- */}

      <div className="relative mx-auto flex w-full max-w-[1500px] flex-col items-center px-5 pb-8 pt-[96px] sm:px-8 sm:pt-[104px] lg:px-10 lg:pt-[108px]">
        {/* STHORAM */}
        <h1
          className={`${display.className} hero-mark w-full select-none text-center font-extrabold uppercase leading-[0.9] tracking-[-0.02em] text-transparent`}
          style={{
            fontSize: "clamp(56px, min(14.2vw, 21vh), 230px)",
            backgroundImage:
              "linear-gradient(180deg, #FFFFFF 35%, #B9C6D6 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          STHORAM
        </h1>

        {/* DEEP TECH INNOVATIONS, flanked by hairlines */}
        <div
          className="hero-rise mt-4 flex w-full items-center justify-center gap-5 sm:mt-5 sm:gap-8"
          style={{ animationDelay: "0.35s" }}
        >
          <span className="rule-l hidden h-px max-w-[220px] flex-1 bg-gradient-to-l from-[#0796E2]/70 to-transparent sm:block" />

          <h2 className="text-center text-[clamp(17px,2.7vw,40px)] font-semibold uppercase leading-none tracking-[0.2em] text-[#0796E2]">
            Deep Tech Innovations
          </h2>

          <span className="rule-r hidden h-px max-w-[220px] flex-1 bg-gradient-to-r from-[#0796E2]/70 to-transparent sm:block" />
        </div>

        {/* Tagline (font size increased) */}
        <div
          className="hero-rise mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center text-[13px] font-medium uppercase leading-none tracking-[0.2em] text-[#A1AAB8] sm:mt-7 sm:gap-x-5 sm:text-[15px] lg:text-[16px] xl:text-[18px]"
          style={{ animationDelay: "0.5s" }}
        >
          <span>STHORAM BMS</span>
          <span className="h-[3px] w-[3px] rounded-full bg-[#4B5563]" />
          <span>STHORAM KAVACH</span>
          <span className="h-[3px] w-[3px] rounded-full bg-[#4B5563]" />
          <span>ATMANIRBHAR BHARAT</span>
          <span className="h-[3px] w-[3px] rounded-full bg-[#4B5563]" />
          <span>Indian IP</span>
          <span className="h-[3px] w-[3px] rounded-full bg-[#4B5563]" />
          <span>Global Impact</span>
        </div>

        {/* Stats */}
        <div
          className="hero-rise mt-10 grid w-full grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-4 lg:gap-5"
          style={{ animationDelay: "0.7s" }}
        >
          <StatCard label="Patents Filed">
            <CountUp to={24} />
            <span className={`${body.className} stat-plus`}>+</span>
          </StatCard>

          <StatCard label="Validated">
            <span>POC</span>
            <Check
              strokeWidth={2.6}
              className="h-[28px] w-[28px] text-[#0796E2] sm:h-[34px] sm:w-[34px] lg:h-[38px] lg:w-[38px]"
            />
          </StatCard>

          <StatCard label="Innovations">
            <CountUp to={9} />
          </StatCard>

          <StatCard label="Verticals">
            <CountUp to={3} />
          </StatCard>
        </div>
      </div>
    </section>
  );
}

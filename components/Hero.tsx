"use client";

import { useEffect, useRef, useState } from "react";
import {
  FileText,
  ShieldCheck,
  Lightbulb,
  ChartNoAxesColumn,
  Check,
} from "lucide-react";
import { Bodoni_Moda, Instrument_Sans } from "next/font/google";

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

const BG_URL = 'url("/images/logo/Renewable%20Energy%20City%20at%20Sunrise.png")';

// Background colour of the section that comes right after the hero.
// Change this if your next section uses a slightly different dark colour.
const NEXT_BG = "#050810";

const brandKeywords = [
  "STHORAM BMS",
  "STHORAM KAVACH",
  "ATMANIRBHAR BHARAT",
  "INDIAN IP",
  "GLOBAL IMPACT",
];

function CountUp({
  to,
  duration = 1500,
}: {
  to: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }

    let animationFrame = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        observer.disconnect();
        const start = performance.now();

        const animate = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);

          setValue(Math.round(to * eased));

          if (progress < 1) {
            animationFrame = requestAnimationFrame(animate);
          } else {
            setValue(to);
          }
        };

        animationFrame = requestAnimationFrame(animate);
      },
      { threshold: 0.3 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, [to, duration]);

  return <span ref={ref}>{value}</span>;
}

const cardImg = (name: string) =>
  `url("/images/card/${encodeURIComponent(name)}")`;

const stats = [
  {
    label: "Patents Filed",
    type: "patents",
    accent: "#1788E8",
    soft: "rgba(44, 151, 255, 0.16)",
    image: cardImg("Glossy Blue Document Stack Background.png"),
  },
  {
    label: "Validated",
    type: "validated",
    accent: "#00A995",
    soft: "rgba(22, 199, 170, 0.18)",
    image: cardImg("Pastel Mint Shield Security Banner.png"),
  },
  {
    label: "Innovations",
    type: "innovations",
    accent: "#D99A14",
    soft: "rgba(255, 190, 60, 0.22)",
    image: cardImg("Warm Lightbulb Innovation Background.png"),
  },
  {
    label: "Verticals",
    type: "verticals",
    accent: "#6553E8",
    soft: "rgba(128, 107, 255, 0.18)",
    image: cardImg("Pastel Growth Analytics Dashboard Abstract.png"),
  },
];

function StatCard({ stat }: { stat: (typeof stats)[number] }) {
  return (
    <div
      tabIndex={0}
      className="stat-card group relative flex aspect-[3/2] flex-col items-start justify-start overflow-hidden rounded-[16px] border-2 border-white/90 px-3 pb-3 pt-3.5 outline-none sm:aspect-auto sm:min-h-[140px] sm:items-stretch sm:justify-center sm:rounded-[18px] sm:px-5 sm:py-5 md:min-h-[150px] xl:min-h-[165px] xl:rounded-[20px] xl:px-6"
      style={
        {
          "--accent": stat.accent,
          "--soft": stat.soft,
        } as React.CSSProperties
      }
    >
      {/* Card illustration (zooms slightly on hover) */}
      <div
        className="stat-bg pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat sm:bg-bottom"
        style={{ backgroundImage: stat.image }}
      />

      {/* Soft white fade on the left so content stays crisp */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(255,255,255,.92) 0%, rgba(255,255,255,.62) 45%, rgba(255,255,255,0) 78%)",
        }}
      />

      <div className="relative z-10 flex items-center justify-start gap-2 sm:justify-center sm:gap-3.5">
        <div
          className="stat-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-[0_4px_12px_rgba(26,63,100,0.12)] ring-1 ring-white/80 sm:h-12 sm:w-12 xl:h-14 xl:w-14"
          style={{
            backgroundColor: stat.soft,
            color: stat.accent,
          }}
        >
          {stat.type === "patents" && (
            <FileText className="h-5 w-5 sm:h-6 sm:w-6 xl:h-7 xl:w-7" strokeWidth={1.8} />
          )}

          {stat.type === "validated" && (
            <ShieldCheck className="h-5 w-5 sm:h-7 sm:w-7 xl:h-8 xl:w-8" strokeWidth={1.8} />
          )}

          {stat.type === "innovations" && (
            <Lightbulb className="h-5 w-5 sm:h-7 sm:w-7 xl:h-8 xl:w-8" strokeWidth={1.7} />
          )}

          {stat.type === "verticals" && (
            <ChartNoAxesColumn
              className="h-5 w-5 sm:h-7 sm:w-7 xl:h-8 xl:w-8"
              strokeWidth={2.2}
            />
          )}
        </div>

        <div
          className={`${display.className} stat-number flex items-center gap-0.5 whitespace-nowrap text-[30px] font-semibold leading-none tracking-[-0.045em] text-[#102342] sm:text-[44px] md:text-[50px] xl:text-[58px]`}
        >
          {stat.type === "patents" && (
            <>
              <CountUp to={24} />
              <span
                className="self-start pt-0.5 text-[16px] sm:text-[22px] xl:text-[26px]"
                style={{ color: stat.accent }}
              >
                +
              </span>
            </>
          )}

          {stat.type === "validated" && (
            <>
              <span>POC</span>
              <Check
                className="ml-0.5 h-5 w-5 sm:h-7 sm:w-7 xl:h-8 xl:w-8"
                strokeWidth={3}
                style={{ color: stat.accent }}
              />
            </>
          )}

          {stat.type === "innovations" && <CountUp to={9} />}

          {stat.type === "verticals" && <CountUp to={3} />}
        </div>
      </div>

      <div className="relative z-10 mt-2.5 text-left sm:mt-4 sm:text-center">
        <span
          className="stat-line mb-1.5 block h-[3px] w-7 rounded-full sm:mx-auto sm:mb-2.5 sm:w-9"
          style={{ backgroundColor: stat.accent }}
        />
        <p className="text-[12px] font-semibold tracking-[-0.01em] text-[#0F1F3A] sm:text-[15px] md:text-[16px] xl:text-[18px]">
          {stat.label}
        </p>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      className={`${body.className} relative isolate w-full overflow-hidden bg-[#E7F2FA] text-[#0A1A35]`}
    >
      <style>{`
        @keyframes sthoram-enter {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes sthoram-title {
          from {
            opacity: 0;
            transform: translateY(10px);
            filter: blur(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        @keyframes sthoram-shine {
          0%, 55% { transform: translateX(-120%) skewX(-20deg); }
          100% { transform: translateX(420%) skewX(-20deg); }
        }

        @keyframes sthoram-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .marquee-track {
          animation: sthoram-marquee 24s linear infinite;
        }

        .sthoram-enter {
          animation: sthoram-enter .8s cubic-bezier(.2,.7,.2,1) both;
        }

        .strip-shine {
          animation: sthoram-shine 7s ease-in-out 1.5s infinite;
        }

        .sthoram-title {
          animation: sthoram-title 1s cubic-bezier(.2,.7,.2,1) both;
        }

        .stat-card {
          background: #fff;
          cursor: pointer;
          box-shadow:
            0 8px 22px rgba(26,63,100,.10),
            0 2px 6px rgba(26,63,100,.05),
            inset 0 1px 0 rgba(255,255,255,.98);
          -webkit-tap-highlight-color: transparent;
          transition:
            transform .35s cubic-bezier(.2,.7,.2,1),
            box-shadow .35s ease,
            border-color .25s ease;
        }

        .stat-bg {
          transition: transform .8s cubic-bezier(.2,.7,.2,1);
        }

        .stat-number,
        .stat-icon {
          transition: transform .35s cubic-bezier(.2,.7,.2,1);
        }

        .stat-line {
          transition: width .35s ease;
        }

        /* Hover, keyboard focus and touch (tap) all get the black border */
        .stat-card:hover,
        .stat-card:focus-visible,
        .stat-card:active {
          transform: translateY(-4px);
          border-color: #0A0F1C;
          box-shadow:
            0 18px 36px rgba(10,15,28,.20),
            0 4px 10px rgba(10,15,28,.10);
        }

        .stat-card:active {
          transform: translateY(-1px) scale(.985);
        }

        .stat-card:hover .stat-bg,
        .stat-card:focus-visible .stat-bg {
          transform: scale(1.07);
        }

        .stat-card:hover .stat-icon,
        .stat-card:focus-visible .stat-icon {
          transform: scale(1.08) rotate(-4deg);
        }

        .stat-card:hover .stat-number,
        .stat-card:focus-visible .stat-number {
          transform: scale(1.04);
        }

        .stat-card:hover .stat-line,
        .stat-card:focus-visible .stat-line {
          width: 56px;
        }

        @media (prefers-reduced-motion: reduce) {
          .sthoram-enter,
          .sthoram-title,
          .strip-shine {
            animation: none;
          }

          .marquee-track {
            animation: none;
            width: auto;
            flex-wrap: wrap;
            justify-content: center;
          }

          .marquee-dup {
            display: none;
          }

          .stat-card,
          .stat-bg,
          .stat-number,
          .stat-icon,
          .stat-line {
            transition: none;
          }
        }
      `}</style>

      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        {/* Mobile: soft ambient glow + fine dot texture behind the text */}
        <div
          className="absolute inset-0 sm:hidden"
          style={{
            background:
              "radial-gradient(120% 55% at 50% 0%, rgba(44,151,255,.26) 0%, rgba(44,151,255,0) 62%), radial-gradient(70% 38% at 100% 34%, rgba(0,174,239,.16) 0%, rgba(0,174,239,0) 70%), radial-gradient(60% 30% at 0% 55%, rgba(101,83,232,.10) 0%, rgba(101,83,232,0) 70%), linear-gradient(180deg, #F5FAFF 0%, #E7F2FA 50%, #DCEBF7 100%)",
          }}
        />
        <div
          className="absolute inset-0 sm:hidden"
          style={{
            backgroundImage:
              "radial-gradient(rgba(16,35,66,.10) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
            WebkitMaskImage:
              "linear-gradient(to bottom, #000 0%, transparent 45%)",
            maskImage: "linear-gradient(to bottom, #000 0%, transparent 45%)",
          }}
        />

        {/* Tablet/Desktop: full-cover background (same as before) */}
        <div
          className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat sm:block"
          style={{
            backgroundImage: BG_URL,
            backgroundPosition: "center center",
          }}
        />
      </div>

      {/* Keep the reference image bright (desktop/tablet only) */}
      <div className="pointer-events-none absolute inset-0 -z-10 hidden bg-gradient-to-b from-white/[0.04] via-transparent to-[#F4F8FC]/[0.08] sm:block" />

      {/* Smooth fade from the hero into the dark section below (mobile) */}
      <div
        className="pointer-events-none absolute inset-x-0 -bottom-px -z-10 h-[240px] sm:hidden"
        style={{
          background: `linear-gradient(to bottom, rgba(11,36,68,0) 0%, rgba(11,36,68,0.55) 45%, ${NEXT_BG} 100%)`,
        }}
      />

      {/* Smooth fade from the hero into the dark section below (tablet/desktop) */}
      <div
        className="pointer-events-none absolute inset-x-0 -bottom-px -z-10 hidden h-[150px] sm:block lg:h-[170px]"
        style={{
          background: `linear-gradient(to bottom, transparent 0%, ${NEXT_BG}99 55%, ${NEXT_BG} 100%)`,
        }}
      />

      {/* Hero content */}
      <div className="mx-auto flex w-full max-w-[1500px] flex-col items-center px-3 pb-[100px] pt-[112px] sm:px-6 sm:pb-[120px] sm:pt-[112px] md:px-8 md:pt-[118px] lg:px-10 lg:pb-[140px] lg:pt-[126px] xl:px-12">
        {/* Main title */}
        <div className="sthoram-title w-full text-center">
          <h1
            className={`${display.className} select-none text-[clamp(54px,14.5vw,68px)] sm:text-[clamp(48px,8.5vw,124px)] [text-shadow:0_2px_28px_rgba(255,255,255,0.85)] sm:[text-shadow:none] font-bold uppercase leading-[0.95] tracking-[-0.065em] text-[#07182F]`}
          >
            STHO<span className="text-[#087FE8]">R</span>AM
          </h1>
        </div>

        {/* Subtitle */}
        <div
          className="sthoram-enter mt-2 flex w-full items-center justify-center gap-2.5 sm:mt-3 sm:gap-4"
          style={{ animationDelay: "0.12s" }}
        >
          <span className="h-px max-w-[34px] flex-1 bg-gradient-to-r from-transparent to-[#0B3155]/50 sm:max-w-[90px] sm:bg-[#0B3155]/45 md:max-w-[120px]" />

          <h2 className="whitespace-nowrap text-center text-[clamp(12px,1.9vw,26px)] font-bold uppercase leading-tight tracking-[0.10em] text-[#102B4E] sm:tracking-[0.18em]">
            Deep Tech Innovations
          </h2>

          <span className="h-px max-w-[34px] flex-1 bg-gradient-to-r from-transparent to-[#0B3155]/50 sm:max-w-[90px] sm:bg-[#0B3155]/45 md:max-w-[120px]" />
        </div>

        {/* Mobile: full-width scrolling keyword bar */}
        <div
          className="sthoram-enter relative z-10 mt-5 w-[calc(100%+1.5rem)] max-w-none overflow-hidden border-y border-white/15 sm:hidden"
          style={{
            background:
              "linear-gradient(90deg, #0C2850 0%, #06142B 50%, #0C2850 100%)",
            boxShadow:
              "0 14px 32px rgba(4,18,43,.38), inset 0 1px 0 rgba(255,255,255,.14)",
            animationDelay: "0.24s",
          }}
        >
          <div className="marquee-track flex w-max items-center py-3">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                aria-hidden={copy === 1}
                className={`flex shrink-0 items-center ${copy === 1 ? "marquee-dup" : ""}`}
              >
                {brandKeywords.map((keyword) => (
                  <div key={keyword} className="flex items-center">
                    <span className="whitespace-nowrap px-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
                      {keyword}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#2C97FF] shadow-[0_0_8px_2px_rgba(44,151,255,0.75)]" />
                  </div>
                ))}
              </div>
            ))}
          </div>

          <span className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#06142B] to-transparent" />
          <span className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#06142B] to-transparent" />
        </div>

        {/* Brand keywords: premium dark glass strip with gradient border */}
        <div
          className="sthoram-enter mt-4 hidden max-w-full rounded-2xl bg-gradient-to-r from-[#2C97FF]/80 via-white/30 to-[#2C97FF]/80 p-px shadow-[0_16px_44px_rgba(4,18,43,0.5),0_0_30px_rgba(44,151,255,0.18)] sm:mt-5 sm:block sm:rounded-full"
          style={{ animationDelay: "0.24s" }}
        >
          <div
            className="relative flex flex-col items-center justify-center gap-y-2 overflow-hidden sm:flex-row sm:flex-wrap rounded-[15px] px-5 py-3 text-center text-[10px] font-semibold uppercase leading-relaxed tracking-[0.1em] text-white sm:gap-x-5 sm:rounded-full sm:px-10 sm:py-3.5 sm:text-[12px] sm:tracking-[0.16em] md:gap-x-6 md:text-[13px] lg:text-[15px]"
            style={{
              background:
                "linear-gradient(135deg, #0C2850 0%, #06142B 50%, #0A1F42 100%)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,.14), inset 0 -10px 24px rgba(44,151,255,.08)",
            }}
          >
            {/* top highlight line */}
            <span className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />

            {/* slow light sweep */}
            <span className="strip-shine pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-transparent via-white/15 to-transparent" />

            <div className="flex items-center justify-center gap-x-3 sm:contents">
              <span className="relative">STHORAM BMS</span>
              <span className="relative h-1.5 w-1.5 rounded-full bg-[#2C97FF] shadow-[0_0_8px_2px_rgba(44,151,255,0.75)]" />
              <span className="relative">STHORAM KAVACH</span>
            </div>
            <span className="relative hidden h-1.5 w-1.5 rounded-full bg-[#2C97FF] shadow-[0_0_8px_2px_rgba(44,151,255,0.75)] sm:block" />
            <div className="flex items-center justify-center gap-x-3 sm:contents">
              <span className="relative">ATMANIRBHAR BHARAT</span>
              <span className="relative h-1.5 w-1.5 rounded-full bg-[#2C97FF] shadow-[0_0_8px_2px_rgba(44,151,255,0.75)]" />
              <span className="relative">INDIAN IP</span>
            </div>
            <span className="relative hidden h-1.5 w-1.5 rounded-full bg-[#2C97FF] shadow-[0_0_8px_2px_rgba(44,151,255,0.75)] sm:block" />
            <div className="flex items-center justify-center sm:contents">
              <span className="relative">GLOBAL IMPACT</span>
            </div>
          </div>
        </div>

        {/* Mobile: full-bleed image, feathered into the background top and bottom */}
        <div
          role="img"
          aria-label="Renewable energy city at sunrise"
          className="sthoram-enter pointer-events-none relative -mt-8 aspect-[3/2] w-[calc(100%+1.5rem)] max-w-none bg-cover bg-center bg-no-repeat sm:hidden"
          style={{
            backgroundImage: BG_URL,
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, #000 24%, #000 80%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, #000 24%, #000 80%, transparent 100%)",
            animationDelay: "0.3s",
          }}
        />

        {/* Statistics: on mobile they sit below the image, separate from it */}
        <div
          className="sthoram-enter relative z-10 mt-2 grid w-full grid-cols-2 gap-2.5 sm:mt-[68px] sm:gap-4 md:mt-[88px] xl:grid-cols-4 md:gap-4 lg:mt-[105px] lg:gap-5 xl:mt-[112px]"
          style={{ animationDelay: "0.36s" }}
        >
          {stats.map((stat) => (
            <StatCard key={stat.type} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

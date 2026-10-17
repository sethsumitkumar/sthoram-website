"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { Playfair_Display } from "next/font/google";

const serif = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

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

const NAVY = "#0F1B33";
const BRONZE = "#B98557";
const BLUE = "#1F6FE5";

const BG_IMAGE = `url("/images/gallery/${encodeURIComponent(
  "Golden-Hour STHORAM Courtyard (1).png"
)}")`;

export default function Team() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  // Nav click (e.g. "Team"): once the page stops scrolling, make sure the section
  // starts exactly under the header, so the previous page never peeks out above it
  useEffect(() => {
    const section = document.getElementById("team");
    if (!section) return;

    let armedUntil = 0;
    let timer: number | undefined;

    const headerBottom = () => {
      const header =
        document.querySelector("header") || document.querySelector("nav");
      if (!header) return 0;
      const bottom = header.getBoundingClientRect().bottom;
      return bottom > 0 ? bottom : 0;
    };

    const onClick = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("header, nav")) armedUntil = Date.now() + 3500;
    };

    const settle = () => {
      if (Date.now() > armedUntil) return;
      const gap = section.getBoundingClientRect().top - headerBottom();
      if (Math.abs(gap) > 0.5 && Math.abs(gap) < 140) {
        window.scrollBy({ top: gap, behavior: "auto" });
      }
      armedUntil = 0;
    };

    const onScroll = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(settle, 160);
    };

    document.addEventListener("click", onClick, true);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Mobile carousel helpers
  const getStep = () => {
    const first = trackRef.current?.children[0] as HTMLElement | undefined;
    return first ? first.offsetWidth + 16 : 0;
  };

  const handleScroll = () => {
    const el = trackRef.current;
    const step = getStep();
    if (!el || !step) return;
    setActive(
      Math.min(teamMembers.length - 1, Math.round(el.scrollLeft / step))
    );
  };

  const goTo = (index: number) => {
    trackRef.current?.scrollTo({ left: index * getStep(), behavior: "smooth" });
  };

  // Desktop: spotlight follows the mouse inside the card
  const handleMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <section
      id="team"
      style={{ overflowX: "clip" }}
      className="t-stage relative scroll-mt-[90px] pb-5 max-md:flex max-md:flex-col max-md:overflow-hidden sm:pb-6 md:bg-[#F7E6CC] md:pb-16"
    >
      <style>{`
        .t-stage { background: #DCE8F8; }

        /* Phone: section fills one full screen (viewport minus header) */
        @media (max-width: 767px) {
          .t-stage { min-height: calc(100svh - 72px); }
        }

        @media (min-width: 768px) {
          .t-stage { background: #F7E6CC; }
        }

        /* Phone: cards slide up over the lower part of the photo */
        .t-cards-pull { margin-top: calc(-0.22 * 100vw); }
        @media (min-width: 768px) {
          .t-cards-pull { margin-top: 0; }
        }

        .t-track { scrollbar-width: none; }
        .t-track::-webkit-scrollbar { display: none; }

        @keyframes t-nudge {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }
        .t-hint { animation: t-nudge 1.6s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .t-hint { animation: none; }
        }
      `}</style>

      {/* PHONE background layer 1: blurred copy of the SAME photo fills the whole section,
          so there is never a flat colour band - only matching sunset tones */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 md:hidden"
        style={{
          backgroundImage: BG_IMAGE,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(26px) saturate(1.05)",
          transform: "scale(1.25)",
        }}
      />
      {/* PHONE soft mist on top (blends with header / News) and a light wash at the bottom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 md:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(238,244,252,0.92) 0%, rgba(238,244,252,0.45) 16%, rgba(238,244,252,0.10) 32%, rgba(255,255,255,0) 70%, rgba(255,248,238,0.35) 100%)",
        }}
      />

      {/* DESKTOP background: FULL photo at its real ratio, never cropped (board stays visible) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto hidden w-full max-w-[1920px] md:block"
        style={{ aspectRatio: "1672 / 941" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: BG_IMAGE,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            WebkitMaskImage:
              "linear-gradient(to bottom, #000 0%, #000 78%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, #000 0%, #000 78%, transparent 100%)",
          }}
        />
      </div>

      {/* Extension strip above the section (phone: same mist colour as the top of this section) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-8 h-8 md:hidden"
        style={{ background: "#EEF4FC" }}
      />
      {/* Extension strip above the section (desktop: mirrored sky) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-8 mx-auto hidden h-8 w-full max-w-[1920px] md:block"
        style={{
          backgroundImage: BG_IMAGE,
          backgroundSize: "100% auto",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
          transform: "scaleY(-1)",
        }}
      />

      {/* Heading */}
      <div className="relative mx-auto w-full max-w-[1000px] px-5 pt-7 sm:px-6 sm:pt-12">
        <div className="mx-auto text-center lg:max-w-[560px]">
          {/* Glass pill on phone (same as News), hairlines on larger screens */}
          <div className="mx-auto flex w-fit items-center justify-center gap-3 max-sm:rounded-full max-sm:border max-sm:border-white/70 max-sm:bg-white/70 max-sm:px-5 max-sm:py-1.5 max-sm:shadow-[0_6px_20px_-8px_rgba(15,27,51,0.35)] max-sm:backdrop-blur-md sm:w-full">
            <span
              className="h-px w-10 max-sm:hidden sm:w-12"
              style={{
                background: `linear-gradient(to right, transparent, ${BLUE})`,
              }}
            />
            <span
              className="font-sans text-[11px] font-semibold uppercase tracking-[0.3em] sm:text-[12px]"
              style={{ color: BLUE }}
            >
              Team
            </span>
            <span
              className="h-px w-10 max-sm:hidden sm:w-12"
              style={{
                background: `linear-gradient(to left, transparent, ${BLUE})`,
              }}
            />
          </div>

          <h2
            className={`${serif.className} mt-3 text-[32px] font-semibold leading-[1.1] tracking-[-0.02em] sm:mt-4 sm:text-[38px] lg:text-[42px]`}
            style={{ color: NAVY }}
          >
            The people behind the
            <br />
            <span style={{ color: BRONZE }}>innovations.</span>
          </h2>
        </div>

        {/* Desktop spacer: pushes the cards down below the board */}
        <div className="hidden h-[9vw] max-h-[170px] min-h-[40px] md:block" />
      </div>

      {/* PHONE spacer: takes the extra height so photo + cards sit at the bottom of the screen */}
      <div aria-hidden="true" className="min-h-[8px] flex-1 md:hidden" />

      {/* PHONE photo: FULL width at its real ratio (board fully visible, nothing cropped).
          Its top and bottom fade into the blurred background of the same photo. */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative w-full md:hidden"
        style={{ aspectRatio: "1672 / 941" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: BG_IMAGE,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, #000 22%, #000 78%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, #000 22%, #000 78%, transparent 100%)",
          }}
        />
      </div>

      {/* Cards: swipe carousel on phone, compact 3-column grid from md */}
      <div className="t-cards-pull relative z-10 mx-auto w-full max-w-[1000px] px-5 sm:px-6 md:mt-4">
        <div
          ref={trackRef}
          onScroll={handleScroll}
          role="region"
          aria-label="Our team"
          className="t-track -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-4 pt-3 sm:-mx-6 sm:scroll-px-6 sm:px-6 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0 md:pt-0"
        >
          {teamMembers.map((member, index) => (
            /* Outer wrapper = gradient border */
            <article
              key={member.initials}
              onMouseMove={handleMove}
              className="group relative w-[84%] shrink-0 snap-start rounded-[20px] p-[1.5px] shadow-[0_12px_30px_rgba(15,27,51,0.28)] transition-all duration-500 ease-out sm:w-[62%] md:w-auto md:shrink md:shadow-[0_14px_36px_rgba(120,80,40,0.22)] md:hover:-translate-y-2 md:hover:shadow-[0_30px_70px_rgba(185,133,87,0.40)]"
              style={{
                background:
                  "linear-gradient(145deg, rgba(185,133,87,0.65) 0%, rgba(255,255,255,0.95) 45%, rgba(185,133,87,0.45) 100%)",
              }}
            >
              {/* Brighter gold border that fades in on hover */}
              <div
                className="pointer-events-none absolute inset-0 rounded-[20px] opacity-0 transition-opacity duration-500 md:group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(145deg, #E8C48F 0%, #B98557 40%, #FFF3DC 70%, #C99A66 100%)",
                }}
              />

              {/* Inner card */}
              <div className="relative flex h-full flex-col overflow-hidden rounded-[18.5px] bg-gradient-to-b from-[#FFFDF9] to-[#FAF1E4] px-5 pb-3 pt-5 sm:px-6 md:px-5 md:pb-4 md:pt-6">
                {/* Mouse spotlight */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 md:group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(260px circle at var(--mx, 50%) var(--my, 0%), rgba(255,206,140,0.38), transparent 70%)",
                  }}
                />

                {/* Shine sweep */}
                <div className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-[20deg] bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 transition-all duration-[900ms] ease-out md:group-hover:left-[130%] md:group-hover:opacity-100" />

                {/* Top gold accent line */}
                <div
                  className="absolute left-1/2 top-0 h-[3px] w-[45%] -translate-x-1/2 rounded-b-full transition-all duration-500 md:w-10 md:group-hover:w-[60%]"
                  style={{
                    background: `linear-gradient(to right, transparent, ${BRONZE}, transparent)`,
                  }}
                />

                {/* Number */}
                <span
                  className="absolute right-4 top-4 font-sans text-[12px] tracking-[0.2em] transition-colors duration-300 md:text-[11px] md:group-hover:text-[#B98557]"
                  style={{ color: "rgba(15,27,51,0.4)" }}
                >
                  0{index + 1}
                </span>

                {/* Initials circle */}
                <div className="relative flex justify-center">
                  <div className="relative transition-transform duration-500 md:group-hover:scale-110">
                    <div className="absolute inset-0 rounded-full bg-[#B98557]/20 blur-xl transition-all duration-500 md:bg-[#B98557]/0 md:group-hover:bg-[#B98557]/40" />

                    <div
                      className="relative flex h-[60px] w-[60px] items-center justify-center rounded-full border bg-gradient-to-b from-white to-[#F6EBDD] shadow-[0_4px_14px_rgba(185,133,87,0.25)] transition-all duration-500 md:h-[64px] md:w-[64px] md:group-hover:border-transparent md:group-hover:from-[#1B2B4D] md:group-hover:to-[#0F1B33]"
                      style={{ borderColor: "rgba(185,133,87,0.55)" }}
                    >
                      <span
                        className={`${serif.className} text-[22px] font-medium text-[#0F1B33] transition-colors duration-500 md:text-[23px] md:group-hover:text-[#F3D9AE]`}
                      >
                        {member.initials}
                      </span>

                      <div
                        className="absolute inset-[-6px] rounded-full border transition-all duration-500 md:inset-[-5px] md:group-hover:inset-[-7px] md:group-hover:border-[#B98557]/70"
                        style={{ borderColor: "rgba(185,133,87,0.28)" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Name + role */}
                <div className="relative mt-4 text-center md:mt-4">
                  <h3
                    className={`${serif.className} text-[20px] font-semibold leading-tight text-[#0F1B33] md:text-[19px]`}
                  >
                    {member.name}
                  </h3>

                  <p
                    className="mx-auto mt-1.5 max-w-[280px] font-sans text-[10px] font-semibold uppercase leading-[1.6] tracking-[0.12em] md:mt-2 md:max-w-[240px] md:text-[10px] md:tracking-[0.12em]"
                    style={{ color: BLUE }}
                  >
                    {member.role}
                  </p>
                </div>

                {/* Divider with diamond */}
                <div className="relative mx-auto mt-3 flex w-full items-center justify-center gap-2 md:mt-3">
                  <span
                    className="h-px w-10 transition-all duration-500 md:w-8 md:group-hover:w-12"
                    style={{
                      background: `linear-gradient(to right, transparent, ${BRONZE})`,
                    }}
                  />
                  <span
                    className="h-[5px] w-[5px] rotate-45"
                    style={{ background: BRONZE }}
                  />
                  <span
                    className="h-px w-10 transition-all duration-500 md:w-8 md:group-hover:w-12"
                    style={{
                      background: `linear-gradient(to left, transparent, ${BRONZE})`,
                    }}
                  />
                </div>

                {/* Description */}
                <p
                  className="relative mt-3 flex-1 text-center font-sans text-[13px] leading-[1.55] md:mt-3 md:text-[12.5px] md:leading-[1.6]"
                  style={{ color: "#3F4452" }}
                >
                  {member.description}
                </p>

                {/* Footer */}
                <div
                  className="relative mt-3 flex items-center justify-between border-t pt-2.5 md:mt-4 md:pt-3"
                  style={{ borderColor: "rgba(185,133,87,0.25)" }}
                >
                  <span
                    className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 md:group-hover:text-[#B98557]"
                    style={{ color: "rgba(15,27,51,0.6)" }}
                  >
                    STHORAM LABS
                  </span>

                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-500 md:group-hover:rotate-45 md:group-hover:border-transparent md:group-hover:bg-gradient-to-br md:group-hover:from-[#D9A86B] md:group-hover:to-[#B98557] md:group-hover:text-white md:group-hover:shadow-[0_6px_16px_rgba(185,133,87,0.5)]"
                    style={{
                      borderColor: "rgba(185,133,87,0.6)",
                      color: BRONZE,
                    }}
                  >
                    <ArrowUpRight size={15} strokeWidth={1.8} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Phone: swipe dots + hint (glass pill so it stays readable on the photo) */}
        <div className="flex justify-center md:hidden">
          <div className="flex items-center gap-3 rounded-full border border-white/70 bg-white/70 px-4 py-1.5 shadow-[0_6px_20px_-8px_rgba(15,27,51,0.35)] backdrop-blur-md">
            <div
              className="flex items-center justify-center gap-2"
              role="tablist"
              aria-label="Choose team member"
            >
              {teamMembers.map((member, index) => (
                <button
                  key={member.initials}
                  type="button"
                  role="tab"
                  aria-selected={active === index}
                  aria-label={`Show ${member.name}`}
                  onClick={() => goTo(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    active === index
                      ? "w-7 bg-[#B98557] shadow-[0_0_12px_rgba(185,133,87,0.6)]"
                      : "w-2 bg-[#0F1B33]/25"
                  }`}
                />
              ))}
            </div>

            <span
              className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em]"
              style={{ color: "rgba(15,27,51,0.6)" }}
            >
              Swipe <span className="t-hint inline-block">→</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
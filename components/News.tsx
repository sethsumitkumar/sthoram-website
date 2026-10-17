"use client";

import { useEffect, useRef, useState } from "react";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import { ArrowRight, CalendarDays, MapPin, Check } from "lucide-react";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const serif = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const IMG = {
  hero: "/images/gallery/Golden Lakeside Corporate Retreat.png",
  cii: "/images/card/Futuristic Blue and Amber Exhibition Hall.png",
  palace: "/images/card/Domed Palace at Golden Dusk.png",
};

const bgUrl = (path: string) => `url("${encodeURI(path)}")`;

const NAVY = "#0F1B33";
const BRONZE = "#B98557";
const BLUE = "#1F6FE5";
const CARD = "#FBF2E3"; // warm sand, not white
const PAGE = "#E8B878"; // golden base (matches the photo's sunset)

const navItems = [
  {
    number: "01",
    date: "5–6 AUGUST 2026",
    location: "NEW DELHI",
    title: "STHORAM Labs exhibits at the CII Exhibition",
    description:
      "STHORAM BMS and NexCell BESS will be on display at the CII Exhibition, 5–6 August 2026, alongside our 24-patent portfolio and POC validation results. Visit us to see continuous cell-level equilibrium running live.",
    status: "Upcoming",
    image: IMG.cii,
    imagePos: "90% 45%", // tablet / desktop crop
    mobilePos: "50% 30%", // phone banner crop (top = sign, bottom = hall)
  },
  {
    number: "02",
    date: "JUNE 2026",
    location: "BHOPAL",
    title: "Proof-of-concept independently validated",
    description:
      "Our working proof-of-concept was witnessed and validated at Bhopal on 11–12 June 2026 by Dr. Vikrant Sharma (ADM Consultant), substantiating the core performance claims of STHORAM BMS.",
    status: "Latest Update",
    image: IMG.palace,
    imagePos: "84% 50%",
    mobilePos: "50% 50%",
  },
];

// Floating golden dust (tablet / desktop only)
const DOTS = [
  { l: "8%", t: "14%", s: 3, d: 0, u: 9 },
  { l: "17%", t: "38%", s: 2, d: 1.4, u: 11 },
  { l: "27%", t: "10%", s: 3, d: 2.2, u: 8 },
  { l: "38%", t: "42%", s: 2, d: 0.6, u: 12 },
  { l: "49%", t: "18%", s: 3, d: 3.1, u: 10 },
  { l: "61%", t: "36%", s: 2, d: 1.1, u: 9 },
  { l: "72%", t: "12%", s: 3, d: 2.7, u: 13 },
  { l: "83%", t: "40%", s: 2, d: 0.3, u: 10 },
  { l: "92%", t: "20%", s: 3, d: 1.9, u: 11 },
];

export default function News() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [dot, setDot] = useState(0);
  const [visible, setVisible] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);

  // Cards fade up once when they scroll into view
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Nav click: once scrolling stops, align the section right under the header
  useEffect(() => {
    const section = document.getElementById("news");
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
      if (gap > 0.5 && gap < 140) {
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

  // Full-screen fit: section height = screen height minus the header (measured, not guessed)
  useEffect(() => {
    const section = document.getElementById("news");
    if (!section) return;

    const update = () => {
      const header =
        document.querySelector("header") || document.querySelector("nav");
      const h = header ? Math.round(header.getBoundingClientRect().height) : 0;
      if (h > 0) section.style.setProperty("--nw-header", `${h}px`);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const getStep = () => {
    const el = trackRef.current;
    const first = el?.children[0] as HTMLElement | undefined;
    return first ? first.offsetWidth + 12 : 0;
  };

  const handleTrackScroll = () => {
    const el = trackRef.current;
    const step = getStep();
    if (!el || !step) return;
    setDot(Math.min(navItems.length - 1, Math.round(el.scrollLeft / step)));
  };

  const goTo = (index: number) => {
    trackRef.current?.scrollTo({ left: index * getStep(), behavior: "smooth" });
  };

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
      className="nw-section relative flex flex-col pb-12 pt-8 sm:justify-center sm:py-16 lg:py-20"
      style={{ backgroundColor: PAGE, overflowX: "clip" }}
    >
      <style>{`
        /* The section always fills one full screen (below the header), so the next
           section never peeks in when you open News from the menu */
        .nw-section {
          min-height: calc(100vh - var(--nw-header, 72px));
          min-height: calc(100svh - var(--nw-header, 72px));
        }

        /* Section photo: covers the WHOLE section on every screen (no flat orange).
           Phone = fixed, framed on the lake + building. Tablet / desktop = slow gentle zoom */
        .nw-full {
          background-size: cover;
          background-position: 92% 28%;
          background-repeat: no-repeat;
        }
        @media (min-width: 640px) {
          .nw-full {
            background-position: 70% 35%;
            transform-origin: 50% 0;
            animation: nw-zoom 44s ease-in-out infinite alternate;
          }
        }
        @keyframes nw-zoom {
          from { transform: scale(1); }
          to { transform: scale(1.015); }
        }

        .nw-dot {
          background: radial-gradient(circle, rgba(255,200,120,.95), rgba(240,160,75,0) 70%);
          animation: nw-float var(--u, 10s) ease-in-out var(--d, 0s) infinite;
        }
        @keyframes nw-float {
          0%, 100% { transform: translateY(0); opacity: .1; }
          50% { transform: translateY(-20px); opacity: .85; }
        }

        .nw-track { scrollbar-width: none; }
        .nw-track::-webkit-scrollbar { display: none; }

        /* One-time card entrance */
        .nw-card { opacity: 0; }
        .nw-visible .nw-card {
          opacity: 1;
          animation: nw-rise .8s cubic-bezier(.2,.7,.2,1) var(--rd, 0s) backwards;
        }
        @keyframes nw-rise {
          from { opacity: 0; transform: translateY(26px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Card photo: neat rounded banner on phones, right side of the card on larger screens */
        .nw-photo {
          position: absolute;
          top: 8px; left: 8px; right: 8px;
          height: 92px;
          border-radius: 16px;
          overflow: hidden;
          background-size: cover;
          background-repeat: no-repeat;
          background-position: var(--posm, 50% 40%);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,.4);
          transition: transform .8s cubic-bezier(.2,.7,.2,1);
        }
        /* soft top shade so the chips stay readable on the photo */
        .nw-photo::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(180deg, rgba(15,27,51,.3), rgba(15,27,51,0) 60%);
        }
        @media (min-width: 640px) {
          .nw-photo {
            inset: 0;
            height: auto;
            border-radius: 0;
            box-shadow: none;
            background-position: var(--pos, 90% 45%);
          }
          .nw-photo::after { display: none; }
        }

        /* Phone: no veil (card body is plain warm sand). Larger screens: readability veil over the photo */
        .nw-veil { background: none; }
        @media (min-width: 640px) {
          .nw-veil {
            background: linear-gradient(
              90deg,
              rgba(251, 242, 227, 0.99) 0%,
              rgba(251, 242, 227, 0.96) 34%,
              rgba(251, 242, 227, 0.88) 49%,
              rgba(251, 242, 227, 0.48) 67%,
              rgba(251, 242, 227, 0.08) 100%
            );
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .nw-full { animation: none; }
          .nw-dot { animation: none; opacity: .35; }
          .nw-photo { transition: none; }
          .nw-visible .nw-card { animation: none; }
        }
      `}</style>

      {/* Extension strip above the section (so the previous page never peeks out) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-8 h-8"
        style={{
          backgroundColor: PAGE,
          backgroundImage: bgUrl(IMG.hero),
          backgroundSize: "100% auto",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
          transform: "scaleY(-1)",
        }}
      />

      {/* PHOTO: fills the whole section on every screen */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="nw-full absolute inset-0"
          style={{
            backgroundImage: bgUrl(IMG.hero),
            filter: "saturate(1.25) contrast(1.05)",
          }}
        />
      </div>

      {/* Soft glow behind the heading text (tablet / desktop only; phone keeps the photo clean) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 hidden h-[380px] sm:block"
        style={{
          background:
            "radial-gradient(ellipse 36% 34% at 50% 36%, rgba(255,247,232,.5), rgba(255,247,232,0) 100%)",
        }}
      />

      {/* Warm sunset tone toward the bottom (golden, never white) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden sm:block"
        style={{
          background:
            "linear-gradient(180deg, rgba(232,160,70,0) 0%, rgba(232,160,70,0) 55%, rgba(214,134,50,.18) 100%)",
        }}
      />

      {/* Phone only: the photo stays vivid to the very end, then dissolves into a light mist
          (same colour the Team section starts with), so there is no flat band or hard cut */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[52px] sm:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(238,244,252,0) 0%, rgba(238,244,252,.85) 65%, #EEF4FC 100%)",
        }}
      />

      {/* Golden dust (not on phones) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 hidden h-[400px] sm:block"
      >
        {DOTS.map((d, i) => (
          <span
            key={i}
            className="nw-dot absolute rounded-full"
            style={
              {
                left: d.l,
                top: d.t,
                width: d.s * 2,
                height: d.s * 2,
                "--d": `${d.d}s`,
                "--u": `${d.u}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div className="relative mx-auto w-full max-w-[1000px] px-5 max-sm:flex max-sm:flex-1 max-sm:flex-col sm:px-7 lg:px-8">
        {/* Heading */}
        <div className="mx-auto w-full max-w-[900px] text-center">
          <div className="mx-auto mb-3 flex w-fit items-center justify-center gap-3 max-sm:rounded-full max-sm:border max-sm:border-white/70 max-sm:bg-white/70 max-sm:px-5 max-sm:py-1.5 max-sm:shadow-[0_6px_20px_-8px_rgba(15,27,51,0.35)] max-sm:backdrop-blur-md sm:mb-5 sm:w-full">
            <span
              className="h-px w-10 max-sm:hidden sm:w-16"
              style={{
                background: `linear-gradient(90deg, transparent, ${BLUE})`,
              }}
            />
            <span
              className={`${font.className} text-[12px] font-bold uppercase tracking-[0.32em] sm:text-[14px]`}
              style={{
                color: BLUE,
                textShadow: "0 1px 10px rgba(255,247,232,.8)",
              }}
            >
              News
            </span>
            <span
              className="h-px w-10 max-sm:hidden sm:w-16"
              style={{
                background: `linear-gradient(270deg, transparent, ${BLUE})`,
              }}
            />
          </div>

          <h2
            className={`${serif.className} text-[32px] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[54px] lg:text-[64px]`}
            style={{
              color: NAVY,
              textShadow: "0 2px 16px rgba(255,247,232,.9), 0 0 3px rgba(255,247,232,.6)",
            }}
          >
            Latest from the <span style={{ color: "#A8672F" }}>lab.</span>
          </h2>

          <p
            className={`${font.className} mx-auto mt-2.5 max-w-[320px] text-[13.5px] font-semibold leading-[1.6] sm:mt-5 sm:max-w-[560px] sm:text-[17px] sm:leading-[1.65]`}
            style={{
              color: "#1F2A44",
              textShadow: "0 1px 12px rgba(255,247,232,.95), 0 0 3px rgba(255,247,232,.7)",
            }}
          >
            Stay updated with our research, exhibitions, and key milestones
            from the field to the future.
          </p>
        </div>

        {/* News cards: swipe carousel on phone, 2-column grid from md */}
        <div className="max-sm:mt-auto max-sm:pt-[72px] sm:mt-14 lg:mt-16">
          <div
            ref={trackRef}
            onScroll={handleTrackScroll}
            role="region"
            aria-label="Latest news"
            className={`nw-track -mx-5 flex snap-x snap-mandatory scroll-px-5 items-stretch gap-3 overflow-x-auto px-5 pb-5 pt-2 sm:-mx-8 sm:scroll-px-8 sm:px-8 md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 md:pt-0 ${
              visible ? "nw-visible" : ""
            }`}
          >
            {navItems.map((item, index) => {
              const isActive = activeId === item.number;
              const isCurrent = dot === index;

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
                  style={
                    {
                      backgroundColor: CARD,
                      "--rd": `${index * 0.14}s`,
                    } as React.CSSProperties
                  }
                  className={`${font.className} nw-card group relative isolate flex max-sm:!bg-[rgba(251,242,227,0.92)] max-sm:backdrop-blur-[3px] w-[86%] shrink-0 cursor-pointer select-none snap-start flex-col overflow-hidden rounded-[20px] border-2 p-2 outline-none [-webkit-tap-highlight-color:transparent] touch-manipulation transition-all duration-500 ease-out active:scale-[0.985] focus-visible:ring-2 focus-visible:ring-[#B98557] sm:w-[72%] sm:min-h-[370px] sm:rounded-[22px] sm:p-6 md:w-auto ${
                    isCurrent
                      ? "max-md:border-[#B98557] max-md:shadow-[0_20px_44px_-18px_rgba(185,133,87,0.6)]"
                      : "max-md:scale-[0.95] max-md:border-[#C99A66]/60 max-md:opacity-80"
                  } ${
                    isActive
                      ? "md:-translate-y-1.5 md:border-[#B98557] md:shadow-[0_0_0_1px_rgba(185,133,87,0.4),0_28px_60px_-18px_rgba(185,133,87,0.6)]"
                      : "md:border-[#C99A66]/60 md:shadow-[0_16px_40px_-18px_rgba(120,70,30,0.45)] md:hover:border-[#B98557]"
                  }`}
                >
                  {/* Photo (banner on phone, full card on larger screens) */}
                  <div
                    aria-hidden
                    className="nw-photo -z-20"
                    style={
                      {
                        backgroundImage: bgUrl(item.image),
                        "--pos": item.imagePos,
                        "--posm": item.mobilePos,
                        transform: isActive ? "scale(1.05)" : "scale(1)",
                        filter: "saturate(1.12)",
                      } as React.CSSProperties
                    }
                  />

                  {/* Readability veil (larger screens only) */}
                  <div aria-hidden className="nw-veil absolute inset-0 -z-10" />

                  {/* Accent line */}
                  <span
                    className={`absolute left-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#B98557] to-transparent transition-all duration-500 ${
                      isActive || isCurrent
                        ? "w-full opacity-100"
                        : "w-0 opacity-0"
                    }`}
                  />

                  {/* Number + icon (sit on the photo banner on phone) */}
                  <div className="relative flex items-start justify-between max-sm:items-center max-sm:p-2">
                    <div className="flex items-center gap-2 rounded-full bg-[#FBF2E3]/90 py-1.5 pl-2.5 pr-3.5 shadow-[0_4px_14px_rgba(120,80,40,0.14)] backdrop-blur-md sm:gap-2.5 sm:bg-transparent sm:p-0 sm:pt-1.5 sm:shadow-none sm:backdrop-blur-none">
                      <span
                        className="h-[6px] w-[6px] rounded-full"
                        style={{
                          backgroundColor: BRONZE,
                          boxShadow: `0 0 8px ${BRONZE}`,
                        }}
                      />
                      <span
                        className="text-[10.5px] font-bold uppercase tracking-[0.22em] sm:text-[12.5px]"
                        style={{ color: "#A8672F" }}
                      >
                        News {item.number}
                      </span>
                      <span
                        className="hidden h-px w-12 sm:block"
                        style={{ backgroundColor: `${BRONZE}80` }}
                      />
                    </div>

                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-xl border backdrop-blur-md transition-all duration-300 sm:h-11 sm:w-11 ${
                        isActive
                          ? "border-[#B98557] bg-[#B98557] text-white"
                          : "border-[#B98557]/55 bg-[#FBF2E3]/90 text-[#A8672F]"
                      }`}
                    >
                      {isActive ? (
                        <Check size={17} strokeWidth={2.4} />
                      ) : (
                        <CalendarDays size={17} strokeWidth={1.7} />
                      )}
                    </div>
                  </div>

                  {/* Body (starts right under the photo banner on phone) */}
                  <div className="relative flex flex-1 flex-col max-sm:mt-[54px] max-sm:px-2 max-sm:pb-1.5 sm:mt-7">
                    {/* Date + location */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays
                          size={13}
                          strokeWidth={1.8}
                          style={{ color: "#A8672F" }}
                        />
                        <span
                          className="text-[11.5px] font-bold tracking-[0.08em] sm:text-[13px]"
                          style={{ color: NAVY }}
                        >
                          {item.date}
                        </span>
                      </span>

                      <span className="h-3.5 w-px bg-[#0F1B33]/25" />

                      <span className="flex items-center gap-1.5">
                        <MapPin
                          size={13}
                          strokeWidth={1.8}
                          style={{ color: "#A8672F" }}
                        />
                        <span
                          className="text-[11.5px] font-bold tracking-[0.08em] sm:text-[13px]"
                          style={{ color: NAVY }}
                        >
                          {item.location}
                        </span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className={`${serif.className} mt-2 max-w-full text-[19px] font-bold leading-[1.25] tracking-normal sm:mt-4 sm:max-w-[68%] sm:text-[25px] sm:leading-[1.3]`}
                      style={{ color: NAVY }}
                    >
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="mt-1.5 max-w-full flex-1 text-[12.5px] font-semibold leading-[1.55] sm:mt-3 sm:max-w-[68%] sm:text-[14px] sm:leading-[1.65]"
                      style={{ color: "#20283A" }}
                    >
                      {item.description}
                    </p>

                    {/* Footer */}
                    <div className="mt-3 flex items-center justify-between gap-3 border-t border-[#B98557]/30 pt-2.5 sm:mt-4 sm:border-0 sm:pt-0">
                      <span
                        className="inline-flex items-center gap-2 rounded-full border bg-[#FBF2E3]/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] backdrop-blur-md sm:px-4 sm:py-2 sm:text-[11.5px]"
                        style={{
                          color: "#A8672F",
                          borderColor: `${BRONZE}99`,
                        }}
                      >
                        <span
                          className="h-[5px] w-[5px] rounded-full"
                          style={{ backgroundColor: BRONZE }}
                        />
                        {item.status}
                      </span>

                      <span
                        className="inline-flex items-center gap-2.5 rounded-full bg-[#FBF2E3]/85 py-1 pl-3 pr-1 text-[12.5px] font-bold backdrop-blur-md transition-colors sm:text-[14.5px]"
                        style={{ color: NAVY }}
                      >
                        View Gallery
                        <span
                          className={`flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-300 sm:h-9 sm:w-9 ${
                            isActive || isCurrent
                              ? "border-transparent bg-gradient-to-br from-[#D9A86B] to-[#B98557] text-white shadow-[0_6px_16px_rgba(185,133,87,0.5)]"
                              : "border-[#B98557]/70 bg-white/85 text-[#A8672F]"
                          }`}
                        >
                          <ArrowRight
                            size={15}
                            strokeWidth={2}
                            className={`transition-transform duration-300 ${
                              isActive ? "translate-x-0.5" : ""
                            }`}
                          />
                        </span>
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Progress indicator (phone only): 01 ──── 02 */}
          <div
            className="mx-auto mt-1 flex w-fit items-center justify-center gap-3 rounded-full border border-white/80 bg-white/85 px-4 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,27,51,0.45)] backdrop-blur-md md:hidden"
            role="tablist"
            aria-label="Choose news"
          >
            <button
              type="button"
              role="tab"
              aria-selected={dot === 0}
              aria-label="Show news 01"
              onClick={() => goTo(0)}
              className={`text-[12px] font-bold tabular-nums tracking-[0.12em] transition-colors ${font.className} ${
                dot === 0 ? "text-[#A8672F]" : "text-[#0F1B33]/60"
              }`}
            >
              01
            </button>

            <span className="relative h-[3px] w-24 overflow-hidden rounded-full bg-[#0F1B33]/20">
              <span
                className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
                style={{
                  width: `${((dot + 1) / navItems.length) * 100}%`,
                  background: `linear-gradient(90deg, #D9A86B, ${BRONZE})`,
                  boxShadow: `0 0 10px ${BRONZE}88`,
                }}
              />
            </span>

            <button
              type="button"
              role="tab"
              aria-selected={dot === 1}
              aria-label="Show news 02"
              onClick={() => goTo(1)}
              className={`text-[12px] font-bold tabular-nums tracking-[0.12em] transition-colors ${font.className} ${
                dot === 1 ? "text-[#A8672F]" : "text-[#0F1B33]/60"
              }`}
            >
              02
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

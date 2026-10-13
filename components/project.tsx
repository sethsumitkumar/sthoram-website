"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { CarFront, Zap, ShieldCheck, ArrowUpRight } from "lucide-react";

const cardImg = (name: string) =>
  `url("/images/card/${encodeURIComponent(name)}")`;

const SECTION_BG = `url("/images/gallery/${encodeURIComponent(
  "Futuristic Energy Horizon at Blue Hour.png"
)}")`;

const verticals = [
  {
    id: "mobility",
    category: "Mobility",
    title: "Electric & Hybrid Vehicles",
    icon: CarFront,
    image: cardImg("Futuristic Electric Car Charging Cityscape.png"),
    imagePosition: "80% 40%",
    accent: "#1788E8",
    soft: "rgba(23, 136, 232, 0.14)",
    glow: "rgba(23, 136, 232, 0.40)",
    tint: "#E3F0FC",
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
    image: cardImg("Renewable Energy Storage Landscape.png"),
    imagePosition: "55% 30%",
    accent: "#0FA3B8",
    soft: "rgba(15, 163, 184, 0.14)",
    glow: "rgba(15, 163, 184, 0.40)",
    tint: "#E1F4F7",
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
    image: cardImg("Radar System at Mountain Sunrise.png"),
    imagePosition: "100% 25%",
    accent: "#E8891B",
    soft: "rgba(232, 137, 27, 0.16)",
    glow: "rgba(232, 137, 27, 0.40)",
    tint: "#FDF0DD",
    points: [
      "High-reliability BMS — field systems",
      "Predictive failure — weeks ahead",
      "Active thermal containment — field safe",
      "iDEX Challenge Ready",
    ],
  },
];

const SERIF = 'Georgia, "Times New Roman", serif';

// Same side margins for the heading and the cards
const WRAP =
  "mx-auto w-[calc(100%-2.5rem)] max-w-[1240px] sm:w-[calc(100%-4rem)] lg:w-[calc(100%-6rem)]";

export default function Verticals() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);

  // Reveal the cards (staggered) once the grid scrolls into view
  useEffect(() => {
    const element = trackRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Nav click (e.g. "Projects"): once the page stops scrolling, make sure the section
  // starts exactly under the header, so the previous page never peeks out above it
  useEffect(() => {
    const section = document.getElementById("verticals");
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

  const getStep = () => {
    const element = trackRef.current;
    const first = element?.children[0] as HTMLElement | undefined;
    return first ? first.offsetWidth + 16 : 0;
  };

  // Mobile carousel: keep the dots in sync with the swipe position
  const handleScroll = () => {
    const element = trackRef.current;
    const step = getStep();
    if (!element || !step) return;

    setActive(
      Math.min(verticals.length - 1, Math.round(element.scrollLeft / step))
    );
  };

  const goTo = (index: number) => {
    trackRef.current?.scrollTo({ left: index * getStep(), behavior: "smooth" });
  };

  // Desktop: soft spotlight + gentle 3D tilt that follow the mouse
  const handleMove = (event: MouseEvent<HTMLElement>) => {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    element.style.setProperty("--mx", `${x}px`);
    element.style.setProperty("--my", `${y}px`);
    element.style.setProperty("--ry", `${(x / rect.width - 0.5) * 7}deg`);
    element.style.setProperty("--rx", `${(0.5 - y / rect.height) * 7}deg`);
  };

  const handleLeave = (event: MouseEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--rx", "0deg");
    event.currentTarget.style.setProperty("--ry", "0deg");
  };

  return (
    <section
      id="verticals"
      style={{ overflowX: "clip" }}
      className="v-stage relative bg-[#EAF3FD] pb-14 pt-10 text-[#0B1D3A] sm:pb-20 sm:pt-14 md:bg-[#0E3A6B] md:pt-0 md:text-white lg:pb-24"
    >
      <style>{`
        /* Width the panorama is drawn at (it is never cropped) */
        .v-stage { --pw: min(100vw, 1920px); }

        /* Panorama sits right under the heading on phones, and starts at the top of the section from md up */
        .v-pan-pull { margin-top: 1.25rem; }
        @media (min-width: 768px) {
          .v-pan-pull { margin-top: 0; }
        }

        /* Cards slide up over the lower part of the photo (phones a little, md and up more) */
        .v-cards-pull { margin-top: calc(-0.05 * var(--pw)); }
        @media (min-width: 768px) {
          .v-cards-pull { margin-top: calc(-0.14 * var(--pw)); }
        }

        /* Heading: same deep navy + blue as the home page heading, on every screen size */
        .v-h2 { color: #0B1D3A; text-shadow: none; }
        .v-gold { filter: none; }
        @media (min-width: 768px) {
          .v-h2 { text-shadow: 0 2px 20px rgba(255,255,255,.55); }
          .v-gold { filter: drop-shadow(0 2px 14px rgba(255,255,255,.55)); }
        }

        @keyframes v-rise {
          from { opacity: 0; transform: translateY(32px) scale(.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .v-card {
          opacity: 0;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          transform: perspective(900px) translateY(0) rotateX(0deg) rotateY(0deg);
          box-shadow:
            0 22px 46px rgba(11,40,90,.26),
            0 2px 6px rgba(11,40,90,.08),
            inset 0 1px 0 rgba(255,255,255,.95);
          transition:
            transform .45s cubic-bezier(.2,.7,.2,1),
            box-shadow .4s ease,
            border-color .3s ease;
        }

        .v-visible .v-card {
          opacity: 1;
          animation: v-rise .8s cubic-bezier(.2,.7,.2,1) var(--d, 0s) backwards;
        }

        .v-img {
          transform: scale(1.1);
          transform-origin: 50% 0;
          transition: transform 1.1s cubic-bezier(.2,.7,.2,1);
        }

        .v-shine {
          opacity: 0;
          transition: opacity .35s ease;
        }

        .v-bar {
          transform: scaleX(0);
          transform-origin: left;
          transition: transform .6s cubic-bezier(.2,.7,.2,1);
        }

        .v-arrow {
          background: var(--soft);
          color: var(--accent);
          transition: background-color .3s ease, color .3s ease, transform .3s ease;
        }

        .v-icon {
          transition: transform .45s cubic-bezier(.2,.7,.2,1), box-shadow .3s ease;
        }

        .v-li {
          transition: transform .4s cubic-bezier(.2,.7,.2,1);
        }

        .v-dash {
          transition: width .4s cubic-bezier(.2,.7,.2,1);
        }

        /* Hover (desktop), keyboard focus and tap (mobile) */
        .v-card:hover,
        .v-card:focus-visible {
          transform: perspective(900px) translateY(-8px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
          border-color: var(--accent);
          box-shadow:
            0 34px 70px rgba(11,40,90,.4),
            0 0 0 1px var(--accent),
            0 0 50px var(--glow),
            inset 0 1px 0 rgba(255,255,255,.95);
          transition:
            transform .12s ease-out,
            box-shadow .4s ease,
            border-color .3s ease;
        }

        .v-card:active {
          transform: perspective(900px) translateY(-3px) scale(.99);
          border-color: var(--accent);
          box-shadow:
            0 24px 54px rgba(11,40,90,.35),
            0 0 0 1px var(--accent),
            0 0 40px var(--glow),
            inset 0 1px 0 rgba(255,255,255,.95);
        }

        .v-card:hover .v-img,
        .v-card:focus-visible .v-img {
          transform: scale(1.18);
        }

        .v-card:hover .v-shine,
        .v-card:focus-visible .v-shine {
          opacity: .75;
        }

        .v-card:hover .v-bar,
        .v-card:focus-visible .v-bar,
        .v-card:active .v-bar {
          transform: scaleX(1);
        }

        .v-card:hover .v-icon,
        .v-card:focus-visible .v-icon {
          transform: scale(1.1) rotate(-5deg);
          box-shadow: 0 14px 30px var(--glow), 0 0 0 1px var(--accent);
        }

        .v-card:hover .v-li,
        .v-card:focus-visible .v-li {
          transform: translateX(5px);
        }

        .v-card:hover .v-dash,
        .v-card:focus-visible .v-dash {
          width: 20px;
        }

        .v-card:hover .v-arrow,
        .v-card:focus-visible .v-arrow,
        .v-card:active .v-arrow {
          background: var(--accent);
          color: #fff;
          transform: translate(3px, -3px) scale(1.08);
        }

        /* Touch screens: a tap or swipe must not leave the card tilted/highlighted */
        @media (hover: none) {
          .v-card:hover {
            transform: perspective(900px) translateY(0) rotateX(0deg) rotateY(0deg);
            border-color: #fff;
            box-shadow: 0 22px 46px rgba(11,40,90,.26), 0 2px 6px rgba(11,40,90,.08), inset 0 1px 0 rgba(255,255,255,.95);
          }
          .v-card:hover .v-img { transform: scale(1.1); }
          .v-card:hover .v-shine { opacity: 0; }
          .v-card:hover .v-bar { transform: scaleX(0); }
          .v-card:hover .v-icon { transform: none; }
          .v-card:hover .v-li { transform: none; }
          .v-card:hover .v-dash { width: .875rem; }
          .v-card:hover .v-arrow { background: var(--soft); color: var(--accent); transform: none; }
        }

        .v-track {
          scrollbar-width: none;
        }
        .v-track::-webkit-scrollbar {
          display: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .v-card { opacity: 1; transition: none; }
          .v-visible .v-card { animation: none; }
          .v-img, .v-icon, .v-arrow, .v-li, .v-dash, .v-bar, .v-shine { transition: none; }
        }
      `}</style>

      {/* PHONE extension: sky-blue strip just above the section, so the previous page is never visible under the nav */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-8 h-8 md:hidden"
        style={{ background: "#DDEEFF" }}
      />

      {/* PHONE background: light sky gradient + soft dotted pattern (same feel as the home page) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 md:hidden"
        style={{
          background:
            "linear-gradient(180deg, #DDEEFF 0%, #EAF4FF 30%, #F4F9FF 60%, #DCEAFA 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70 md:hidden"
        style={{
          backgroundImage:
            "radial-gradient(rgba(23,136,232,.16) 1px, transparent 1.2px)",
          backgroundSize: "18px 18px",
          WebkitMaskImage:
            "linear-gradient(to bottom, #000 0%, transparent 38%, transparent 70%, #000 100%)",
          maskImage:
            "linear-gradient(to bottom, #000 0%, transparent 38%, transparent 70%, #000 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 md:hidden"
        style={{
          background:
            "radial-gradient(70% 22% at 50% 0%, rgba(0,159,227,.16) 0%, rgba(0,159,227,0) 70%), radial-gradient(60% 24% at 100% 100%, rgba(255,193,90,.22) 0%, rgba(255,193,90,0) 70%), radial-gradient(60% 24% at 0% 96%, rgba(23,136,232,.16) 0%, rgba(23,136,232,0) 70%)",
        }}
      />

      {/* PHONE: the photo continues softly behind the cards (no hard edge, no gap) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden md:hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, transparent 18%, #000 38%, #000 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, transparent 18%, #000 38%, #000 100%)",
        }}
      >
        <div
          className="absolute -inset-6"
          style={{
            backgroundImage: SECTION_BG,
            backgroundSize: "cover",
            backgroundPosition: "50% 82%",
            backgroundRepeat: "no-repeat",
            filter: "blur(14px) saturate(1.3) brightness(1.15)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(214,232,252,.30) 0%, rgba(200,222,248,.55) 100%)",
          }}
        />
      </div>
      {/* PHONE: soft light-blue fade at the very bottom so the section ends cleanly */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 md:hidden"
        style={{
          background:
            "linear-gradient(to bottom, rgba(190,214,242,0) 0%, rgba(190,214,242,0) 82%, rgba(190,214,242,.85) 100%)",
        }}
      />

      {/* DESKTOP / TABLET background, layer 1: bright, softly blurred copy of the photo that fills the whole section (continues the scene below the panorama) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block"
      >
        <div
          className="absolute -inset-8"
          style={{
            backgroundImage: SECTION_BG,
            backgroundSize: "cover",
            backgroundPosition: "50% 78%",
            backgroundRepeat: "no-repeat",
            filter: "blur(10px) saturate(1.2) brightness(1.05)",
          }}
        />
      </div>

      {/* Extension: a mirrored strip of the sky sits just above the section, so even if the page stops a few px early the previous page is never visible */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-8 mx-auto hidden h-8 w-full max-w-[1920px] md:block"
        style={{
          backgroundImage: SECTION_BG,
          backgroundSize: "100% auto",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
          filter: "saturate(1.1)",
          transform: "scaleY(-1)",
        }}
      />

      {/* Layer 2: the FULL panorama, sharp and never cropped (car, grid and radar all visible), fading smoothly into layer 1 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto hidden w-full max-w-[1920px] md:block"
        style={{ aspectRatio: "1983 / 793" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: SECTION_BG,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            filter: "saturate(1.1)",
            WebkitMaskImage:
              "linear-gradient(to bottom, #000 0%, #000 82%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, #000 0%, #000 82%, transparent 100%)",
          }}
        />
      </div>

      {/* Heading + panorama */}
      <div className="relative">
        <div
          className={`relative z-10 text-center md:absolute md:inset-x-0 md:top-[7%] ${WRAP}`}
        >
          <h2
            className="v-h2 mx-auto text-center font-bold leading-[1.08] tracking-[-0.015em]"
            style={{
              fontFamily: SERIF,
              fontSize: "clamp(32px, 4.4vw, 68px)",
            }}
          >
            <span className="block">Three Distinct Verticals.</span>
            <span
              className="v-gold mt-1 block bg-gradient-to-r from-[#0A5FD0] via-[#1788E8] to-[#2FA0F5] bg-clip-text pb-1 italic text-transparent"
              style={{ textShadow: "none" }}
            >
              One Technology.
            </span>
          </h2>

          {/* Gold divider with a small diamond */}
          <div className="mt-5 flex items-center justify-center gap-3">
            <span className="h-px w-14 bg-gradient-to-r from-transparent to-[#060A14] sm:w-20" />
            <span className="h-2 w-2 rotate-45 bg-[#060A14] shadow-[0_0_10px_rgba(6,10,20,0.45)]" />
            <span className="h-px w-14 bg-gradient-to-l from-transparent to-[#060A14] sm:w-20" />
          </div>
        </div>

        {/* Panorama: on phones it is shown in full under the heading; from md up it is only a spacer (the section photo is the background) */}
        <div
          aria-hidden="true"
          className="v-pan-pull pointer-events-none relative mx-auto w-full max-w-[1920px]"
          style={{ aspectRatio: "1983 / 793" }}
        >
          <div
            className="absolute inset-0 md:hidden"
            style={{
              backgroundImage: SECTION_BG,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              filter: "saturate(1.12) brightness(1.03)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, #000 9%, #000 74%, transparent 100%)",
              maskImage:
                "linear-gradient(to bottom, transparent 0%, #000 9%, #000 74%, transparent 100%)",
            }}
          />
        </div>
      </div>

      {/* Vertical Cards: swipe carousel on mobile, grid from md */}
      <div className={`v-cards-pull relative z-10 ${WRAP}`}>
        <div
          ref={trackRef}
          onScroll={handleScroll}
          role="region"
          aria-label="Our three verticals"
          className={`v-track -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-8 pt-3 sm:-mx-8 sm:scroll-px-8 sm:px-8 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 md:pt-0 xl:grid-cols-3 xl:gap-6 ${
            visible ? "v-visible" : ""
          }`}
        >
          {verticals.map((item, index) => {
            const Icon = item.icon;

            return (
              <article
                key={item.id}
                tabIndex={0}
                onMouseMove={handleMove}
                onMouseLeave={handleLeave}
                className={`v-card group relative flex w-[86%] shrink-0 snap-start flex-col overflow-hidden rounded-[24px] border-2 border-white sm:w-[72%] md:shrink md:border-white/80 ${
                  index === verticals.length - 1
                    ? "md:col-span-2 md:mx-auto md:w-[calc(50%-0.5rem)] xl:col-span-1 xl:mx-0 xl:w-auto"
                    : "md:w-auto"
                }`}
                style={
                  {
                    "--accent": item.accent,
                    "--soft": item.soft,
                    "--glow": item.glow,
                    "--d": `${index * 0.14}s`,
                    background: `linear-gradient(180deg, ${item.tint} 0%, #F7FAFD 42%, #FFFFFF 100%)`,
                  } as React.CSSProperties
                }
              >
                {/* Card illustration, fading into the card body */}
                <div
                  aria-hidden="true"
                  className="v-img pointer-events-none absolute inset-x-0 top-0 h-[250px] bg-cover bg-no-repeat sm:h-[260px]"
                  style={{
                    backgroundImage: item.image,
                    backgroundPosition: item.imagePosition,
                    WebkitMaskImage:
                      "linear-gradient(to bottom, #000 0%, #000 52%, transparent 100%)",
                    maskImage:
                      "linear-gradient(to bottom, #000 0%, #000 52%, transparent 100%)",
                  }}
                />

                {/* Soft white veil on top so the header text stays crisp */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-[90px]"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,.62) 0%, rgba(255,255,255,0) 100%)",
                  }}
                />

                {/* Mouse-following spotlight (desktop hover) */}
                <div
                  aria-hidden="true"
                  className="v-shine pointer-events-none absolute inset-0 z-20"
                  style={{
                    background:
                      "radial-gradient(340px circle at var(--mx, 50%) var(--my, 0%), var(--glow), rgba(255,255,255,0) 62%)",
                    mixBlendMode: "soft-light",
                  }}
                />

                {/* Accent line that sweeps across the top on hover / tap */}
                <span
                  aria-hidden="true"
                  className="v-bar pointer-events-none absolute inset-x-0 top-0 z-20 h-[3px]"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)`,
                  }}
                />

                <div className="relative z-10 flex flex-1 flex-col p-5 sm:p-6">
                  {/* Top area: number + category + icon (illustration shows through) */}
                  <div className="h-[150px] sm:h-[155px]">
                    <div className="flex items-center justify-between">
                      <span
                        className="text-[21px] font-bold tracking-[0.08em] text-[#0B1D3A] sm:text-[23px]"
                        style={{ fontFamily: SERIF }}
                      >
                        0{index + 1}
                      </span>

                      <span
                        className="rounded-full bg-white/90 px-4 py-2 text-[13.5px] font-extrabold uppercase tracking-[0.16em] shadow-[0_8px_20px_rgba(16,35,66,0.18)] backdrop-blur-md sm:text-[14.5px]"
                        style={{
                          color: item.accent,
                          border: `1px solid ${item.soft}`,
                        }}
                      >
                        {item.category}
                      </span>
                    </div>

                    <div
                      className="v-icon mt-5 flex h-[46px] w-[46px] items-center justify-center rounded-[14px] bg-white"
                      style={{
                        color: item.accent,
                        boxShadow: `0 10px 24px rgba(16,35,66,0.14), 0 0 0 1px ${item.soft}`,
                      }}
                    >
                      <Icon size={22} strokeWidth={1.7} aria-hidden="true" />
                    </div>
                  </div>

                  {/* Card Title */}
                  <h3
                    className="text-[25px] font-bold leading-[1.2] tracking-[-0.01em] text-[#0B1D3A] sm:min-h-[68px] sm:text-[28px]"
                    style={{ fontFamily: SERIF }}
                  >
                    {item.title}
                  </h3>

                  {/* Divider */}
                  <div className="my-4 h-px w-full bg-[#0B1D3A]/10" />

                  {/* Feature List */}
                  <ul className="flex flex-1 flex-col gap-3">
                    {item.points.map((point, pointIndex) => (
                      <li
                        key={point}
                        className="v-li flex items-start gap-3"
                        style={{ transitionDelay: `${pointIndex * 45}ms` }}
                      >
                        <span
                          className="v-dash mt-[13px] h-[2.5px] w-3.5 shrink-0 rounded-full"
                          style={{ backgroundColor: item.accent }}
                        />
                        <span className="text-[16.5px] font-medium leading-[1.5] text-[#2A3A55] sm:text-[17.5px]">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Footer */}
                  <div className="mt-5 flex items-center justify-end border-t border-[#0B1D3A]/10 pt-3">
                    <span className="v-arrow flex h-10 w-10 items-center justify-center rounded-full shadow-[0_6px_16px_rgba(16,35,66,0.12)]">
                      <ArrowUpRight
                        size={18}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Mobile swipe dots (phone only, light theme colours) */}
        <div
          className="mt-1 flex items-center justify-center gap-2 md:hidden"
          role="tablist"
          aria-label="Choose vertical"
        >
          {verticals.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-label={`Show ${item.category}`}
              onClick={() => goTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                active === index
                  ? "w-7 bg-[#1788E8] shadow-[0_0_12px_rgba(23,136,232,0.6)]"
                  : "w-2 bg-[#0B1D3A]/25"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

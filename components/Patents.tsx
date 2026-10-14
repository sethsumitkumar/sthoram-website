"use client";



import { useEffect, useRef, useState } from "react";

import { Plus_Jakarta_Sans } from "next/font/google";



const jakarta = Plus_Jakarta_Sans({

  subsets: ["latin"],

  weight: ["500", "600", "700", "800"],

  display: "swap",

});



/* Sirf heading text ke peeche halka light glow (0 = off, 0.5 = strong). Baaki background same rehta hai */

const HEADING_GLOW = 0.35;



/* Heading ka dark navy (Three Distinct Verticals wale heading jaisa). Pure black chahiye to "#000000" */

const TITLE_COLOR = "#0B1A38";



/* "Total IP Protection." ka blue (One Technology. wale heading jaisa) */

const LOGO_BLUE = "#1A85E6";



/* Light shadow: dark/blue text bright sky par saaf dikhe */

const LIGHT_SHADOW = "0 1px 2px rgba(255,255,255,0.45), 0 2px 18px rgba(255,255,255,0.5)";



/* Background section ke upar kitna extend ho (previous section ki patti cover) */

const BG_EXTEND = 40;



/* Mobile par background image ki height (px): pehle jaisa full scene (containers + towers) dikhega */

const MOBILE_BG_H = 560;



/* Mobile par image ka kaun sa hissa dikhe: 0% = left (containers), 100% = right (towers) */

const MOBILE_BG_X = "56%";



/* Mobile carousel ka left padding (px-5 = 20px) */

const SIDE_PAD = 20;



const img = (path: string) => `url("${encodeURI(path)}")`;



const SECTION_BG = "/images/gallery/Clean-Tech Sunset Industrial Campus.png";



const patentCategories = [

  {

    id: "logics",

    number: 8,

    title: "Logics",

    accent: "#0796E2",

    rgb: "7, 150, 226",

    image: "/images/card/Neon Circuit Power Node.png",

    icon: "chip",

    points: [

      "Cell-level electrochemical balancing algorithm",

      "Real-time individual SoC / SoH computation",

      "Predictive thermal anomaly detection logic",

      "Active containment decision and trigger logic",

      "Zero-current energy transfer logic",

      "Equilibrium maintenance across all states",

      "Charge / discharge optimisation logic",

      "Communication and OTA update protocol",

    ],

  },

  {

    id: "bms-architecture",

    number: 7,

    title: "BMS Architecture",

    accent: "#FACC15",

    rgb: "250, 204, 21",

    // 👉 Yahan battery-cell wali image ka path daalo

    image: "/images/card/Renewable Energy Storage Landscape.png",

    icon: "layers",

    points: [

      "Proprietary cell-to-cell transfer circuit topology",

      "Auxiliary circuit design — zero BMS self-heating",

      "Sensor array architecture — per-cell measurement",

      "High-voltage series stacking architecture",

      "Modular scalability framework — any kW to HV grid",

      "Thermal management hardware integration",

      "Redundancy and fail-safe architecture",

    ],

  },

  {

    id: "product",

    number: 5,

    title: "Product",

    accent: "#12C879",

    rgb: "18, 200, 121",

    image: "/images/card/Cinematic Renewable Energy Storage Landscape.png",

    icon: "cube",

    points: [

      "STHORAM BMS — complete product specification",

      "NexCell BESS — integrated system design",

      "4G/LTE/GPS connected BMS hardware platform",

      "BaaS (Battery as a Service) product framework",

      "OEM integration specification and interface",

    ],

  },

  {

    id: "utility",

    number: 4,

    title: "Utility",

    accent: "#D5DCEA",

    rgb: "213, 220, 234",

    image: "/images/card/Sunset Smart Grid Landscape.png",

    icon: "gear",

    points: [

      "Grid-direct connection utility — eliminates transformer",

      "Solar-BESS integration utility application",

      "EV range extension utility application",

      "Defence and remote power utility application",

    ],

  },

];



/* ---------- Icons ---------- */



function CardIcon({ name, color }: { name: string; color: string }) {

  const common = {

    viewBox: "0 0 24 24",

    fill: "none",

    stroke: color,

    strokeWidth: 1.4,

    strokeLinecap: "round" as const,

    strokeLinejoin: "round" as const,

    /* mobile: 20px, md+: 26px */

    className: "h-5 w-5 md:h-[26px] md:w-[26px]",

  };



  if (name === "chip")

    return (

      <svg {...common}>

        <rect x="6" y="6" width="12" height="12" rx="2" />

        <rect x="9.5" y="9.5" width="5" height="5" />

        <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" />

      </svg>

    );

  if (name === "layers")

    return (

      <svg {...common}>

        <path d="M12 3l9 5-9 5-9-5 9-5z" />

        <path d="M3 12l9 5 9-5" />

        <path d="M3 16l9 5 9-5" />

      </svg>

    );

  if (name === "cube")

    return (

      <svg {...common}>

        <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />

        <path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" />

      </svg>

    );

  return (

    <svg {...common}>

      <circle cx="12" cy="12" r="3" />

      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" />

    </svg>

  );

}



/* ---------- Donut Chart ---------- */



function PatentDonut({ activeId }: { activeId: string | null }) {

  const R = 72;

  const C = 2 * Math.PI * R;

  const GAP = 2.5;

  const total = patentCategories.reduce((sum, p) => sum + p.number, 0);



  let cursor = 0;



  const segments = patentCategories.map((p) => {

    const len = (p.number / total) * C;

    const start = cursor;

    cursor += len;

    const midAngle = ((start + len / 2) / C) * 2 * Math.PI - Math.PI / 2;



    return {

      ...p,

      dash: Math.max(len - GAP, 0),

      offset: -(start + GAP / 2),

      lx: 100 + R * Math.cos(midAngle),

      ly: 100 + R * Math.sin(midAngle),

    };

  });



  const darkText = (id: string) => id === "utility" || id === "bms-architecture";



  return (

    <div className="relative mx-auto aspect-square w-[112px] sm:w-[148px] md:w-[clamp(118px,16vh,168px)]">

      <div

        aria-hidden="true"

        className="pointer-events-none absolute -inset-4 rounded-full bg-[#0796E2]/30 blur-2xl"

      />



      <svg

        viewBox="0 0 200 200"

        className="relative h-full w-full drop-shadow-[0_12px_28px_rgba(0,0,0,0.6)]"

        role="img"

        aria-label="Patent split: 8 Logics, 7 BMS Architecture, 5 Product, 4 Utility"

      >

        <circle cx="100" cy="100" r="99" fill="rgba(5,8,15,0.8)" />

        <circle

          cx="100"

          cy="100"

          r="97.5"

          fill="none"

          stroke="rgba(140,210,255,0.55)"

          strokeWidth="1.5"

        />

        <circle

          cx="100"

          cy="100"

          r="50"

          fill="rgba(5,8,15,0.95)"

          stroke="rgba(255,255,255,0.22)"

          strokeWidth="1"

        />



        <g transform="rotate(-90 100 100)">

          {segments.map((s) => {

            const dimmed = activeId !== null && activeId !== s.id;

            return (

              <circle

                key={s.id}

                cx="100"

                cy="100"

                r={R}

                fill="none"

                stroke={s.accent}

                strokeWidth={activeId === s.id ? 36 : 32}

                strokeDasharray={`${s.dash} ${C - s.dash}`}

                strokeDashoffset={s.offset}

                style={{

                  opacity: dimmed ? 0.3 : 1,

                  filter:

                    activeId === s.id

                      ? `drop-shadow(0 0 7px rgba(${s.rgb},0.95))`

                      : "none",

                  transition:

                    "opacity 400ms ease, stroke-width 400ms ease, filter 400ms ease",

                }}

              />

            );

          })}

        </g>



        {segments.map((s) => (

          <text

            key={`t-${s.id}`}

            x={s.lx}

            y={s.ly}

            textAnchor="middle"

            dominantBaseline="central"

            fontSize="19"

            fontWeight="800"

            fill={darkText(s.id) ? "#05080F" : "#FFFFFF"}

            style={{

              fontFamily: "inherit",

              opacity: activeId !== null && activeId !== s.id ? 0.4 : 1,

              transition: "opacity 400ms ease",

            }}

          >

            {s.number}

          </text>

        ))}



        <text

          x="100"

          y="94"

          textAnchor="middle"

          dominantBaseline="central"

          fontSize="31"

          fontWeight="800"

          fill="#FFFFFF"

          style={{ fontFamily: "inherit" }}

        >

          24

        </text>

        <text

          x="100"

          y="117"

          textAnchor="middle"

          fontSize="6.5"

          fontWeight="700"

          letterSpacing="2.2"

          fill="#B4C0D4"

          style={{ fontFamily: "inherit" }}

        >

          PATENTS

        </text>

      </svg>

    </div>

  );

}



/* ---------- Patents Section ---------- */



export default function Patents() {

  /* Desktop / tablet hover state */

  const [activeId, setActiveId] = useState<string | null>(null);



  /* Mobile carousel state */

  const [isMobile, setIsMobile] = useState(false);

  const [mobileIndex, setMobileIndex] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);



  /* Mobile detect (< 768px) */

  useEffect(() => {

    const mq = window.matchMedia("(max-width: 767px)");

    const update = () => setIsMobile(mq.matches);

    update();

    mq.addEventListener("change", update);

    return () => mq.removeEventListener("change", update);

  }, []);



  /* Tap outside: tablet/desktop touch ke liye */

  useEffect(() => {

    const handleOutside = (e: PointerEvent) => {

      const target = e.target as HTMLElement;

      if (!target.closest("[data-patent-card]")) setActiveId(null);

    };

    document.addEventListener("pointerdown", handleOutside);

    return () => document.removeEventListener("pointerdown", handleOutside);

  }, []);



  /* Swipe karne par kaun sa card sabse paas hai */

  const handleScroll = () => {

    const track = trackRef.current;

    if (!track) return;

    const cards = Array.from(track.children) as HTMLElement[];

    let best = 0;

    let bestDist = Infinity;

    cards.forEach((c, i) => {

      const d = Math.abs(c.offsetLeft - SIDE_PAD - track.scrollLeft);

      if (d < bestDist) {

        bestDist = d;

        best = i;

      }

    });

    setMobileIndex(best);

  };



  const goTo = (i: number) => {

    const track = trackRef.current;

    if (!track) return;

    const card = track.children[i] as HTMLElement | undefined;

    if (!card) return;

    track.scrollTo({ left: card.offsetLeft - SIDE_PAD, behavior: "smooth" });

  };



  const effectiveActiveId = isMobile

    ? patentCategories[mobileIndex]?.id ?? null

    : activeId;



  /* Card glass overlay: mobile par halka taaki background/image dikhe */

  const overlayLeft = isMobile ? 0.62 : 0.88;

  const overlayMid = isMobile ? 0.34 : 0.62;



  return (

    <section

      id="patents"

      className={`${jakarta.className} relative isolate z-[1] flex flex-col overflow-x-clip bg-[#05080F] pb-5 pt-7 min-h-[calc(100svh-68px)] sm:pt-9 md:min-h-0 lg:min-h-[calc(100vh-96px)] lg:pb-4 lg:pt-9`}

    >

      {/* Background image

          Mobile : pehle jaisa full scene (fixed height, top se) + uske neeche usi image ka

                   mirror reflection (gehre paani jaisa) taaki neeche black na aaye

          Desktop: poore section par cover */}

      <div

        aria-hidden="true"

        className="absolute inset-x-0 -z-10 bg-cover md:bottom-0 md:h-auto md:[background-position:center]"

        style={{

          top: `-${BG_EXTEND}px`,

          height: isMobile ? `${MOBILE_BG_H}px` : undefined,

          backgroundPosition: isMobile ? `${MOBILE_BG_X} 55%` : undefined,

          backgroundImage: img(SECTION_BG),

        }}

      />



      {/* Mobile: image ke neeche mirror reflection (seamless continuation) */}

      <div

        aria-hidden="true"

        className="absolute inset-x-0 bottom-0 -z-10 md:hidden"

        style={{

          top: `${MOBILE_BG_H - BG_EXTEND - 1}px`,

          backgroundImage: img(SECTION_BG),

          backgroundRepeat: "no-repeat",

          backgroundSize: `auto ${MOBILE_BG_H}px`,

          backgroundPosition: `${MOBILE_BG_X} 100%`,

          transform: "scaleY(-1)",

        }}

      />



      <div className="relative mx-auto flex w-full max-w-[1560px] flex-1 flex-col px-5 sm:px-6 lg:px-10">

        {/* Heading */}

        <div className="relative text-center">

          {/* Soft light glow behind the heading (text saaf dikhe, baaki background same) */}

          <div

            aria-hidden="true"

            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[190%] w-[120%] -translate-x-1/2 -translate-y-1/2"

            style={{

              background: `radial-gradient(ellipse at center, rgba(255,255,255,${HEADING_GLOW}) 0%, rgba(255,255,255,${

                HEADING_GLOW * 0.6

              }) 40%, rgba(255,255,255,0) 70%)`,

            }}

          />



          {/* Eyebrow: glass pill + gold lines */}

          <div className="flex items-center justify-center gap-3 md:gap-5">

            <span

              aria-hidden="true"

              className="hidden h-px w-10 bg-gradient-to-r from-transparent to-[#C9A24A] sm:block md:w-20 lg:w-28"

            />



            <p className="relative inline-flex items-center rounded-full border border-white/90 bg-white/75 px-4 py-2 text-[clamp(9.5px,2.7vw,11px)] font-extrabold uppercase leading-none tracking-[0.16em] shadow-[0_12px_32px_-10px_rgba(11,26,56,0.48),inset_0_1px_0_rgba(255,255,255,0.95)] ring-1 ring-[#0B1A38]/10 backdrop-blur-xl sm:px-5 sm:py-2.5 sm:text-[12px] sm:tracking-[0.26em] md:px-7 md:py-3 md:text-[clamp(12px,1vw,15px)] md:tracking-[0.32em]">

              <span style={{ color: TITLE_COLOR }}>Indian Innovation.</span>

              <span aria-hidden="true" className="mx-2.5 h-1 w-1 rotate-45 bg-[#C9A24A] md:mx-3.5" />

              <span style={{ color: LOGO_BLUE }}>Global Impact.</span>

            </p>



            <span

              aria-hidden="true"

              className="hidden h-px w-10 bg-gradient-to-l from-transparent to-[#C9A24A] sm:block md:w-20 lg:w-28"

            />

          </div>



          <h2
            className="mx-auto mt-3 w-full max-w-[390px] font-extrabold leading-[1.08] tracking-[-0.045em] [text-wrap:balance] text-[clamp(27px,6.8vw,30px)] sm:mt-4 sm:max-w-none sm:text-[40px] md:mt-5 md:text-[clamp(34px,3.4vw,56px)]"
          >
            <span
              className="block"
              style={{ color: TITLE_COLOR, textShadow: LIGHT_SHADOW }}
            >
              <span className="block sm:inline-block">24 Patents.</span>{" "}
              <span className="block sm:inline-block">Four Categories.</span>
            </span>
            <span
              className="mt-1 block pb-1 text-[clamp(24px,6.1vw,28px)] sm:text-[1em]"
              style={{ color: "#1688E8", textShadow: "0 2px 12px rgba(22,136,232,0.16)" }}
            >
              Total IP Protection.
            </span>
          </h2>



          {/* Divider with a small diamond */}

          <div className="mt-3 flex items-center justify-center gap-3 md:mt-4">

            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#0B1A38] sm:w-20" />

            <span className="h-1.5 w-1.5 rotate-45 bg-[#0B1A38]" />

            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#0B1A38] sm:w-20" />

          </div>

        </div>



        {/* Donut */}

        <div className="relative z-10 mt-3 md:mt-3">

          <PatentDonut activeId={effectiveActiveId} />

        </div>



        {/* Cards: mobile = swipe carousel, md = 2 cols, lg = 4 cols */}

        <div

          ref={trackRef}

          onScroll={handleScroll}

          className="-mx-5 mt-6 flex snap-x snap-mandatory items-stretch gap-2.5 overflow-x-auto scroll-smooth px-5 pb-3 pt-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-6 sm:px-6 md:mx-0 md:mt-3 md:grid md:flex-1 md:snap-none md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0 md:pt-0 lg:grid-cols-4 lg:gap-5"

        >

          {patentCategories.map((patent) => {

            const isActive = effectiveActiveId === patent.id;



            return (

              <article

                key={patent.id}

                data-patent-card

                tabIndex={0}

                onPointerDown={(e) => {

                  if (!isMobile && e.pointerType !== "mouse")

                    setActiveId(patent.id);

                }}

                onPointerEnter={(e) => {

                  if (!isMobile && e.pointerType === "mouse")

                    setActiveId(patent.id);

                }}

                onPointerLeave={(e) => {

                  if (!isMobile && e.pointerType === "mouse") setActiveId(null);

                }}

                onFocus={() => {

                  if (!isMobile) setActiveId(patent.id);

                }}

                onBlur={() => {

                  if (!isMobile) setActiveId(null);

                }}

                /* MOBILE card width: w-[68vw] max-w-[270px]  (aur chhota chahiye to 62vw / 240px karo) */

                className={`group relative flex w-[68vw] max-w-[270px] shrink-0 snap-start cursor-pointer select-none flex-col overflow-hidden rounded-2xl outline-none [-webkit-tap-highlight-color:transparent] touch-manipulation transition-all duration-500 ease-out md:min-h-[330px] md:w-auto md:max-w-none md:shrink md:rounded-[20px] ${

                  isActive ? "md:-translate-y-2" : ""

                }`}

                style={{

                  border: `1.5px solid rgba(${patent.rgb}, ${

                    isActive ? 1 : 0.75

                  })`,

                  boxShadow: isActive

                    ? `inset 0 1px 0 rgba(255,255,255,0.3), 0 0 0 1px rgba(${patent.rgb},0.5), 0 0 40px -2px rgba(${patent.rgb},0.6), 0 24px 48px -24px rgba(0,0,0,0.95)`

                    : `inset 0 1px 0 rgba(255,255,255,0.2), 0 0 24px -6px rgba(${patent.rgb},0.45), 0 20px 40px -26px rgba(0,0,0,0.9)`,

                }}

              >

                {/* Card image */}

                <div

                  aria-hidden="true"

                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[900ms] ease-out"

                  style={{

                    backgroundImage: img(patent.image),

                    transform: isActive ? "scale(1.1)" : "scale(1.02)",

                  }}

                />



                {/* Glass overlay (mobile par halka) */}

                <div

                  aria-hidden="true"

                  className="absolute inset-0 transition-opacity duration-500"

                  style={{

                    background: `linear-gradient(100deg, rgba(5,8,15,${overlayLeft}) 0%, rgba(5,8,15,${overlayMid}) 55%, rgba(5,8,15,${

                      isActive ? 0.1 : 0.18

                    }) 100%), linear-gradient(to bottom, rgba(5,8,15,0.25) 0%, rgba(5,8,15,0.05) 60%, rgba(5,8,15,0.3) 100%)`,

                  }}

                />



                {/* Accent tint */}

                <div

                  aria-hidden="true"

                  className="pointer-events-none absolute inset-0 transition-opacity duration-500"

                  style={{

                    opacity: isActive ? 1 : 0.75,

                    background: `linear-gradient(140deg, rgba(${patent.rgb},0.26), transparent 55%)`,

                  }}

                />



                {/* Shine sweep */}

                <div

                  aria-hidden="true"

                  className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-[900ms] ease-out"

                  style={{

                    transform: isActive

                      ? "translateX(520%) skewX(-12deg)"

                      : "translateX(0) skewX(-12deg)",

                  }}

                />



                {/* Top accent bar */}

                <div

                  className="absolute inset-x-0 top-0 h-[3px] origin-left transition-transform duration-500 md:h-[4px]"

                  style={{

                    backgroundColor: patent.accent,

                    transform: isActive ? "scaleX(1)" : "scaleX(0.35)",

                  }}

                />



                <div className="relative flex flex-1 flex-col px-3.5 pb-11 pt-4 md:px-5 md:pb-12 md:pt-4 xl:px-6">

                  {/* Number + title + icon */}

                  <div className="flex items-start justify-between">

                    <div>

                      <div

                        className="text-[32px] font-extrabold leading-none tracking-[-0.03em] md:text-[clamp(40px,6.2vh,62px)]"

                        style={{

                          color: patent.accent,

                          textShadow: `0 0 30px rgba(${patent.rgb},0.55)`,

                        }}

                      >

                        {patent.number}

                      </div>

                      <div

                        className="mt-1.5 text-[9.5px] font-bold uppercase tracking-[0.22em] md:mt-1.5 md:text-[12px] md:tracking-[0.28em]"

                        style={{ color: patent.accent }}

                      >

                        {patent.title}

                      </div>

                    </div>



                    <div

                      className="rounded-md p-1 transition-transform duration-500 md:rounded-lg md:p-1.5"

                      style={{

                        background: `rgba(${patent.rgb},0.14)`,

                        border: `1px solid rgba(${patent.rgb},0.45)`,

                        transform: isActive

                          ? "rotate(-6deg) scale(1.08)"

                          : "none",

                      }}

                    >

                      <CardIcon name={patent.icon} color={patent.accent} />

                    </div>

                  </div>



                  {/* Divider */}

                  <div

                    className="my-2.5 h-[1.5px] w-full md:my-3 md:h-[2px]"

                    style={{

                      background: `linear-gradient(90deg, rgba(${patent.rgb},1), transparent)`,

                    }}

                  />



                  {/* Points */}

                  <ul className="flex flex-1 flex-col justify-start gap-1.5 md:gap-[clamp(5px,1vh,10px)]">

                    {patent.points.map((point) => (

                      <li key={point} className="flex items-start gap-2">

                        <span

                          className="mt-[6px] h-1 w-1 shrink-0 rounded-full md:mt-[7px] md:h-[5px] md:w-[5px]"

                          style={{

                            backgroundColor: patent.accent,

                            boxShadow: `0 0 8px rgba(${patent.rgb},0.95)`,

                          }}

                        />

                        <span className="text-[11px] font-medium leading-[1.35] text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.95)] md:text-[clamp(12px,1.6vh,14px)] md:leading-[1.4]">

                          {point}

                        </span>

                      </li>

                    ))}

                  </ul>

                </div>



                {/* Arrow button (corner) */}

                <span

                  className="absolute bottom-2.5 right-2.5 flex h-6 w-6 items-center justify-center rounded-full transition-all duration-500 md:bottom-3 md:right-3 md:h-8 md:w-8"

                  style={{

                    border: `1.5px solid ${patent.accent}`,

                    backgroundColor: isActive

                      ? patent.accent

                      : "rgba(5,8,15,0.6)",

                    boxShadow: isActive

                      ? `0 0 18px rgba(${patent.rgb},0.8)`

                      : "none",

                    transform: isActive ? "translateX(3px)" : "none",

                  }}

                >

                  <svg

                    viewBox="0 0 24 24"

                    className="h-3 w-3 md:h-[15px] md:w-[15px]"

                    fill="none"

                    stroke={isActive ? "#05080F" : patent.accent}

                    strokeWidth="2.4"

                    strokeLinecap="round"

                    strokeLinejoin="round"

                  >

                    <path d="M5 12h14M13 6l6 6-6 6" />

                  </svg>

                </span>

              </article>

            );

          })}

        </div>



        {/* Dots (sirf mobile) */}

        <div className="mb-3 mt-1 flex items-center justify-center gap-2 md:hidden">

          {patentCategories.map((p, i) => {

            const on = mobileIndex === i;

            return (

              <button

                key={p.id}

                type="button"

                aria-label={`Show ${p.title}`}

                onClick={() => goTo(i)}

                className="h-2 rounded-full transition-all duration-300"

                style={{

                  width: on ? 26 : 8,

                  backgroundColor: on ? p.accent : "rgba(255,255,255,0.5)",

                  boxShadow: on ? `0 0 10px rgba(${p.rgb},0.8)` : "none",

                }}

              />

            );

          })}

        </div>



        {/* Bottom statement: mobile = right-to-left marquee, desktop = dark pill bar */}

        <style>{`

          @keyframes patents-marquee {

            from { transform: translateX(0); }

            to { transform: translateX(-50%); }

          }

          @media (prefers-reduced-motion: reduce) {

            .patents-marquee { animation: none !important; }

          }

        `}</style>



        {/* Mobile marquee: light strip + black text (saaf padhne ke liye) */}

        <div className="-mx-5 mt-auto overflow-hidden bg-[#F4F0E6]/90 py-2 md:hidden">

          <div

            style={{

              WebkitMaskImage:

                "linear-gradient(to right, transparent, #000 5%, #000 95%, transparent)",

              maskImage:

                "linear-gradient(to right, transparent, #000 5%, #000 95%, transparent)",

            }}

          >

            <div

              className="patents-marquee flex w-max whitespace-nowrap"

              style={{ animation: "patents-marquee 26s linear infinite" }}

            >

              {[0, 1].map((n) => (

                <span

                  key={n}

                  aria-hidden={n === 1}

                  className="shrink-0 pr-12 text-[12px] font-semibold italic leading-[1.5] text-black"

                >

                  All 24 applications cover inventions that endure across battery

                  chemistries. Full patent numbers and claims available under NDA.

                </span>

              ))}

            </div>

          </div>

        </div>



        {/* Desktop / tablet pill bar */}

        <div className="mx-auto mt-4 hidden w-full max-w-[1180px] items-center justify-between gap-6 rounded-full bg-[#0A0F0E] px-8 py-3.5 text-[13px] text-[#EDEAE0] shadow-[0_12px_30px_-12px_rgba(0,0,0,0.7)] md:flex">

          <span className="font-medium">

            All 24 applications cover inventions that endure across battery

            chemistries.

          </span>

          <span className="shrink-0 font-bold text-[#E8B96A]">

            Full patent numbers and claims available under NDA.

          </span>

        </div>

      </div>

    </section>

  );

}

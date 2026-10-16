"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, FileText, Zap, X } from "lucide-react";
import { Newsreader } from "next/font/google";

const serif = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const IMG = {
  hero: "/images/gallery/Mist-Softened.png",
  battery: "/images/card/Elegant Copper Battery Blueprint.png",
  circuit: "/images/card/Minimal Ivory Isometric Circuit Blueprint.png",
};

const bgUrl = (path: string) => `url("${encodeURI(path)}")`;

const whitePapers = [
  {
    icon: Zap,
    number: "01",
    title: "Continuous Cell-Level Electrochemical Equilibrium",
    description:
      "Why periodic balancing fails, and how continuous equilibrium changes everything.",
    status: "Volume I",
    filename: "White Paper Volume I – Cell Balancing.pdf",
    art: IMG.battery,
    artClass: "inset-0 bg-cover bg-[position:right_bottom] bg-no-repeat",
    artSize: undefined as string | undefined,
  },
  {
    icon: FileText,
    number: "02",
    title: "Eliminating Thermal Runaway at the Root Cause",
    description:
      "From detection-after-onset to prediction and active N₂ containment.",
    status: "Volume II",
    filename: "White Paper Volume II – Cell_Isolation.pdf",
    art: IMG.circuit,
    // circuit image mein built-in border hai, isliye scale + shift karke crop kiya
    artClass:
      "right-[-5%] top-1/2 h-[150%] -translate-y-1/2 aspect-[1662/946] bg-no-repeat",
    artSize: "100% 100%",
  },
];

type WhitePaper = (typeof whitePapers)[number];

const COPPER = "#A9673F";
const COPPER_DARK = "#8F5430";
const INK = "#14181F";
const IVORY = "#F6EFE5";
const CARD = "#FBF6EE";

// Floating light dust (fixed values, so no hydration mismatch)
const DOTS = [
  { l: "6%", t: "10%", s: 5, d: 0, u: 9 },
  { l: "14%", t: "34%", s: 4, d: 1.4, u: 11 },
  { l: "22%", t: "18%", s: 3, d: 2.2, u: 8 },
  { l: "31%", t: "46%", s: 5, d: 0.6, u: 12 },
  { l: "42%", t: "8%", s: 3, d: 3.1, u: 10 },
  { l: "52%", t: "30%", s: 4, d: 1.1, u: 9 },
  { l: "63%", t: "14%", s: 3, d: 2.7, u: 13 },
  { l: "71%", t: "42%", s: 5, d: 0.3, u: 10 },
  { l: "80%", t: "22%", s: 4, d: 1.9, u: 11 },
  { l: "88%", t: "50%", s: 3, d: 3.4, u: 8 },
  { l: "94%", t: "12%", s: 5, d: 0.9, u: 12 },
  { l: "47%", t: "56%", s: 3, d: 2.4, u: 9 },
];

export default function WhitePapers() {
  const [selectedPaper, setSelectedPaper] = useState<WhitePaper | null>(null);
  const [formError, setFormError] = useState("");

  // Modal: body scroll lock + Escape to close
  useEffect(() => {
    if (!selectedPaper) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedPaper(null);
        setFormError("");
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPaper]);

  // Nav click: scroll rukne ke baad section ko header ke neeche align karo
  useEffect(() => {
    const section = document.getElementById("white-papers");
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

  function openForm(paper: WhitePaper) {
    setFormError("");
    setSelectedPaper(paper);
  }

  function closeForm() {
    setSelectedPaper(null);
    setFormError("");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedPaper) return;

    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();

    if (!name || !email || !phone) {
      setFormError("Please complete all required fields.");
      return;
    }

    /*
     * Front-end demonstration only.
     * This does not save the submitted details.
     * A backend is required for client-accessible lead storage.
     */

    const pdfUrl = `/whitepapers/${encodeURIComponent(selectedPaper.filename)}`;

    const pdfWindow = window.open(pdfUrl, "_blank", "noopener,noreferrer");

    if (!pdfWindow) {
      setFormError(
        "The PDF could not be opened. Please allow pop-ups and try again."
      );
      return;
    }

    closeForm();
  }

  const inputClass =
    "h-12 w-full rounded-lg border border-[#DCC9B3] bg-white/70 px-4 text-[14px] text-[#14181F] outline-none placeholder:text-[#A39482] hover:border-[#C9AE90] focus:border-[#A9673F] focus:bg-white focus:ring-2 focus:ring-[#A9673F]/20";

  const labelClass = "mb-2 block text-[12px] font-medium text-[#3A3128]";

  return (
    <section
      id="white-papers"
      className="relative pb-16 pt-14 sm:py-24 lg:py-28"
      style={{ backgroundColor: IVORY, overflowX: "clip" }}
    >
      <style>{`
        /* Phone: slow cinematic pan, buildings -> mountains */
        .wp-pan {
          background-size: auto 100%;
          background-position: 0% 50%;
          background-repeat: no-repeat;
          animation: wp-pan 36s ease-in-out infinite alternate;
        }
        /* Tablet / desktop: slow Ken Burns zoom */
        @media (min-width: 640px) {
          .wp-pan {
            background-size: cover;
            background-position: center top;
            transform-origin: 50% 0;
            animation: wp-zoom 40s ease-in-out infinite alternate;
          }
        }
        @keyframes wp-pan {
          from { background-position: 0% 50%; }
          to { background-position: 100% 50%; }
        }
        @keyframes wp-zoom {
          from { transform: scale(1); }
          to { transform: scale(1.07); }
        }

        /* Soft sunlight shimmer sweeping across the photo */
        .wp-sweep {
          background: linear-gradient(105deg, transparent 38%, rgba(255,236,200,.7) 50%, transparent 62%);
          background-size: 260% 100%;
          animation: wp-sweep 11s ease-in-out infinite;
          mix-blend-mode: soft-light;
        }
        @keyframes wp-sweep {
          from { background-position: 100% 0; }
          to { background-position: 0% 0; }
        }

        /* Floating copper dust */
        .wp-dot {
          background: radial-gradient(circle, rgba(214,150,96,.95), rgba(169,103,63,0) 70%);
          animation: wp-float var(--u, 10s) ease-in-out var(--d, 0s) infinite;
        }
        @keyframes wp-float {
          0%, 100% { transform: translateY(0); opacity: .15; }
          50% { transform: translateY(-22px); opacity: .85; }
        }

        @media (prefers-reduced-motion: reduce) {
          .wp-pan { animation: none; background-position: 50% 50%; }
          .wp-sweep, .wp-dot { animation: none; }
          .wp-dot { opacity: .4; }
        }
      `}</style>

      {/* Extension strip */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-8 h-8"
        style={{
          backgroundColor: IVORY,
          backgroundImage: bgUrl(IMG.hero),
          backgroundSize: "100% auto",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
          transform: "scaleY(-1)",
        }}
      />

      {/* Base: warm ivory depth gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #F8F1E7 0%, #F6EFE5 45%, #F1E6D6 100%)",
        }}
      />

      {/* Blueprint grid, fades in and out */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(169,103,63,.10) 1px, transparent 1px), linear-gradient(90deg, rgba(169,103,63,.10) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, transparent 30%, #000 60%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, transparent 30%, #000 60%, transparent 100%)",
          opacity: 0.7,
        }}
      />

      {/* HERO PHOTO: clearly visible on every screen (phone pans, desktop zooms) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[540px] overflow-hidden sm:h-[660px] lg:h-[780px]"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, #000 0%, #000 60%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, #000 0%, #000 60%, transparent 100%)",
        }}
      >
        <div
          className="wp-pan absolute inset-0"
          style={{
            backgroundImage: bgUrl(IMG.hero),
            filter: "saturate(1.15) contrast(1.04) brightness(1.02)",
          }}
        />
        <div className="wp-sweep absolute inset-0" />
      </div>

      {/* Soft readability wash behind the heading only (keeps photo visible at the sides) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[540px] sm:h-[660px] lg:h-[780px]"
        style={{
          background:
            "radial-gradient(ellipse 62% 40% at 50% 34%, rgba(248,241,231,0.78), rgba(248,241,231,0) 100%)",
        }}
      />

      {/* Floating copper dust */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[540px] sm:h-[660px] lg:h-[780px]"
      >
        {DOTS.map((dot, i) => (
          <span
            key={i}
            className="wp-dot absolute rounded-full"
            style={
              {
                left: dot.l,
                top: dot.t,
                width: dot.s * 2,
                height: dot.s * 2,
                "--d": `${dot.d}s`,
                "--u": `${dot.u}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* Concentric blueprint rings, bottom left (matches the circle on the photo) */}
      <svg
        aria-hidden
        viewBox="0 0 520 520"
        className="pointer-events-none absolute -bottom-24 -left-32 h-[420px] w-[420px] opacity-60 sm:-left-20 sm:h-[520px] sm:w-[520px]"
        fill="none"
      >
        {[70, 120, 170, 220, 255].map((r, i) => (
          <circle
            key={r}
            cx="260"
            cy="260"
            r={r}
            stroke={COPPER}
            strokeOpacity={0.28 - i * 0.04}
            strokeWidth="1"
          />
        ))}
        <circle cx="260" cy="40" r="4" fill={COPPER} fillOpacity="0.6" />
        <circle cx="430" cy="140" r="3" fill={COPPER} fillOpacity="0.5" />
      </svg>

      {/* Bottom ambient copper glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[360px]"
        style={{
          background:
            "radial-gradient(ellipse 70% 100% at 50% 100%, rgba(214,160,110,0.28), rgba(246,239,229,0) 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-10">
        {/* Heading */}
        <div className="mx-auto max-w-[900px] text-center">
          <div className="mb-5 flex items-center justify-center gap-3 sm:mb-6">
            <span
              className="h-px w-8 sm:w-14"
              style={{ backgroundColor: `${COPPER}99` }}
            />
            <span
              className="text-[11px] font-medium uppercase tracking-[0.3em] sm:text-[13px]"
              style={{ color: COPPER }}
            >
              White Papers
            </span>
            <span
              className="h-px w-8 sm:w-14"
              style={{ backgroundColor: `${COPPER}99` }}
            />
          </div>

          <h2
            className={`${serif.className} text-[44px] font-medium leading-[1.05] tracking-[-0.025em] sm:text-[62px] lg:text-[80px]`}
            style={{ color: INK }}
          >
            Technical depth,
            <br />
            <span style={{ color: COPPER }}>in writing.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-[720px] text-[15px] leading-[1.75] text-[#2B2F36] sm:mt-8 sm:text-[18px] lg:text-[20px]">
            Our white papers will set out the physics, the architecture, and
            the evidence behind each claim, for engineers, investors, and
            institutions.
          </p>
        </div>

        {/* Cards + bottom bar (spacer on phone lets the photo breathe above the cards) */}
        <div className="relative z-10 mx-auto mt-28 max-w-[1020px] sm:mt-14">
          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 md:gap-6">
            {whitePapers.map((paper) => {
              const Icon = paper.icon;

              return (
                <button
                  key={paper.number}
                  type="button"
                  onClick={() => openForm(paper)}
                  aria-label={`Request access to ${paper.title}`}
                  className="group relative isolate flex min-h-[290px] w-full flex-col overflow-hidden rounded-[20px] border p-5 text-left shadow-[0_22px_46px_-24px_rgba(120,76,36,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_28px_56px_-24px_rgba(120,76,36,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A9673F] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F6EFE5] sm:min-h-[310px] sm:p-7"
                  style={{ backgroundColor: CARD, borderColor: "#E3CFB6" }}
                >
                  {/* Illustration */}
                  <div
                    aria-hidden
                    className={`absolute -z-20 transition-transform duration-700 group-hover:scale-[1.03] ${paper.artClass}`}
                    style={{
                      backgroundImage: bgUrl(paper.art),
                      backgroundSize: paper.artSize,
                    }}
                  />

                  {/* Text readability fade (mobile) */}
                  <div
                    aria-hidden
                    className="absolute inset-0 -z-10 sm:hidden"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(251,246,238,0.97) 0%, rgba(251,246,238,0.88) 45%, rgba(251,246,238,0.35) 100%)",
                    }}
                  />
                  {/* Text readability fade (desktop) */}
                  <div
                    aria-hidden
                    className="absolute inset-0 -z-10 hidden sm:block"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(251,246,238,1) 0%, rgba(251,246,238,0.94) 42%, rgba(251,246,238,0.4) 68%, rgba(251,246,238,0) 100%)",
                    }}
                  />

                  {/* Top copper hairline on hover */}
                  <span
                    className="absolute left-0 top-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
                    style={{ backgroundColor: COPPER }}
                  />

                  {/* Top row */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-1 items-center gap-3 pt-1.5">
                      <span
                        className="text-[11px] font-medium uppercase tracking-[0.22em] sm:text-[12px]"
                        style={{ color: COPPER }}
                      >
                        Paper {paper.number}
                      </span>
                      <span
                        className="h-px w-12 sm:w-16"
                        style={{ backgroundColor: `${COPPER}59` }}
                      />
                    </div>

                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border bg-[#FDF9F3] shadow-[0_6px_16px_-8px_rgba(120,76,36,0.45)] transition-colors group-hover:bg-white"
                      style={{ borderColor: "#E2CDB3", color: COPPER }}
                    >
                      <Icon size={18} strokeWidth={1.6} />
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className={`${serif.className} mt-6 max-w-[88%] text-[22px] font-medium leading-[1.18] tracking-[-0.015em] sm:mt-8 sm:max-w-[78%] sm:text-[25px]`}
                    style={{ color: INK }}
                  >
                    {paper.title}
                  </h3>

                  <p className="mt-3 max-w-[88%] flex-1 text-[14px] leading-[1.65] text-[#5A5148] sm:max-w-[56%] sm:text-[14.5px]">
                    {paper.description}
                  </p>

                  {/* Footer */}
                  <div
                    className="mt-6 flex items-center justify-between gap-3 border-t pt-4"
                    style={{ borderColor: "#DEC6AB" }}
                  >
                    <span
                      className="text-[10.5px] font-medium uppercase tracking-[0.18em] sm:text-[11.5px]"
                      style={{ color: COPPER }}
                    >
                      PDF · {paper.status}
                    </span>

                    <span className="inline-flex items-center gap-1.5 border-l border-[#DEC6AB] pl-4 text-[13px] font-medium text-[#14181F] transition-colors group-hover:text-[#A9673F] sm:pl-5 sm:text-[14px]">
                      Request access
                      <ArrowUpRight
                        size={15}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bottom statement */}
          <div
            className="mt-4 flex items-center justify-center gap-4 rounded-[18px] border px-5 py-4 shadow-[0_14px_32px_-26px_rgba(120,76,36,0.45)] backdrop-blur-sm sm:mt-5 sm:gap-6 sm:py-5"
            style={{
              backgroundColor: "rgba(251,246,238,0.8)",
              borderColor: "#E3CFB6",
            }}
          >
            <span
              className="hidden h-px flex-1 sm:block"
              style={{
                background: `linear-gradient(90deg, transparent, ${COPPER}80)`,
              }}
            />
            <span
              className="hidden h-[6px] w-[6px] shrink-0 rounded-full sm:block"
              style={{ backgroundColor: COPPER }}
            />

            <p
              className={`${serif.className} text-[14px] tracking-[0.14em] text-[#2B2F36] sm:text-[16px] sm:tracking-[0.2em]`}
            >
              Research <span style={{ color: COPPER }}>·</span> Engineering{" "}
              <span style={{ color: COPPER }}>·</span> Evidence
            </p>

            <span
              className="hidden h-[6px] w-[6px] shrink-0 rounded-full sm:block"
              style={{ backgroundColor: COPPER }}
            />
            <span
              className="hidden h-px flex-1 sm:block"
              style={{
                background: `linear-gradient(270deg, transparent, ${COPPER}80)`,
              }}
            />
          </div>
        </div>
      </div>

      {/* White paper access form */}
      {selectedPaper && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#2A1C10]/50 px-4 py-6 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeForm();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="white-paper-form-title"
            className="relative my-auto w-full max-w-[480px] overflow-hidden rounded-[22px] border shadow-[0_30px_90px_rgba(60,35,15,0.35)]"
            style={{ backgroundColor: CARD, borderColor: "#DFC8AE" }}
          >
            <div className="h-[3px] w-full" style={{ backgroundColor: COPPER }} />

            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p
                    className="text-[11px] font-semibold uppercase tracking-[0.22em]"
                    style={{ color: COPPER }}
                  >
                    STHORAM LABS / RESEARCH
                  </p>

                  <h3
                    id="white-paper-form-title"
                    className={`${serif.className} mt-3 text-[30px] font-medium leading-[1.1] tracking-[-0.02em] sm:text-[36px]`}
                    style={{ color: INK }}
                  >
                    Access the white paper
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={closeForm}
                  aria-label="Close form"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#DCC9B3] bg-white/60 text-[#6B5E50] transition-colors hover:border-[#A9673F] hover:text-[#A9673F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A9673F]"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Selected PDF details */}
              <div className="mt-6 border-y border-[#E2CDB3] py-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9A8A78]">
                  Selected document
                </p>

                <div className="mt-3 flex items-start gap-3">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-[#FDF9F3]"
                    style={{ borderColor: "#E2CDB3", color: COPPER }}
                  >
                    <FileText size={19} strokeWidth={1.7} />
                  </div>

                  <div>
                    <p className="text-[15px] font-medium leading-6 text-[#14181F]">
                      {selectedPaper.title}
                    </p>
                    <p className="mt-1 text-[12px] text-[#8A7B6A]">
                      PDF document · {selectedPaper.status}
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-5 text-[13px] leading-6 text-[#5A5148]">
                Enter your contact details to continue to the document.
              </p>

              <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="white-paper-name" className={labelClass}>
                    Full name <span style={{ color: COPPER }}>*</span>
                  </label>
                  <input
                    id="white-paper-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your full name"
                    minLength={2}
                    maxLength={100}
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="white-paper-email" className={labelClass}>
                    Work email <span style={{ color: COPPER }}>*</span>
                  </label>
                  <input
                    id="white-paper-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="name@company.com"
                    maxLength={254}
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="white-paper-phone" className={labelClass}>
                    Phone number <span style={{ color: COPPER }}>*</span>
                  </label>
                  <input
                    id="white-paper-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="Include country code"
                    minLength={7}
                    maxLength={20}
                    pattern="[0-9+().\-\s]{7,20}"
                    title="Enter a valid phone number."
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="white-paper-company" className={labelClass}>
                    Company / organisation{" "}
                    <span className="font-normal text-[#9A8A78]">
                      (optional)
                    </span>
                  </label>
                  <input
                    id="white-paper-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Company or institution"
                    maxLength={150}
                    className={inputClass}
                  />
                </div>

                <label className="flex items-start gap-3 pt-1 text-[11.5px] leading-5 text-[#6B5E50]">
                  <input
                    type="checkbox"
                    name="privacyConsent"
                    required
                    className="mt-1 h-4 w-4 shrink-0 accent-[#A9673F]"
                  />
                  <span>
                    I consent to the processing of my information as described
                    in the{" "}
                    <a
                      href="/privacy"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#14181F] underline decoration-[#C9AE90] underline-offset-4 hover:text-[#A9673F]"
                    >
                      Privacy Policy
                    </a>
                    .
                  </span>
                </label>

                {formError && (
                  <p role="alert" className="text-sm text-red-600">
                    {formError}
                  </p>
                )}

                <button
                  type="submit"
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-lg px-5 text-[14px] font-semibold text-white shadow-[0_12px_24px_-12px_rgba(143,84,48,0.7)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A9673F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBF6EE]"
                  style={{ backgroundColor: COPPER }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = COPPER_DARK)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = COPPER)
                  }
                >
                  Continue to PDF
                  <ArrowUpRight size={17} />
                </button>

               
<p className="text-center text-[11px] leading-5 text-[#9A8A78]">
  Your information should be handled in accordance with the
  company&apos;s{" "}
  <a
    href="/privacy"
    target="_blank"
    rel="noreferrer"
    className="underline decoration-[#C9AE90] underline-offset-4 hover:text-[#A9673F]"
  >
    Privacy Policy
  </a>
  .
</p>

              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
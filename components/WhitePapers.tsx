"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, FileText, Zap, X } from "lucide-react";
import { Newsreader, Manrope } from "next/font/google";

// Headings, titles and the statement bar
const serif = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

// Body text, labels, buttons and the form
const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
const COPPER_LIGHT = "#D6965F";
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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedPaper) return;

    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const company = String(formData.get("company") || "").trim();
   

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

  const pdfWindow = window.open("about:blank", "_blank");

if (!pdfWindow) {
  setFormError("Please allow pop-ups and try again.");
  return;
}

pdfWindow.opener = null;

try {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      phone,
      company,
      paperTitle: selectedPaper.title,
      paperStatus: selectedPaper.status,
    }),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    pdfWindow.close();
    setFormError(result.error || "Email could not be sent. Please try again.");
    return;
  }

  pdfWindow.location.href = pdfUrl;
  closeForm();
} catch {
  pdfWindow.close();
  setFormError("Something went wrong. Please try again.");
}
  }

  // 16px on phone stops iOS Safari from zooming into the field on focus
  const inputClass =
    "h-12 w-full rounded-lg border border-[#DCC9B3] bg-white/70 px-4 text-[16px] font-medium text-[#14181F] outline-none placeholder:font-normal placeholder:text-[#A39482] hover:border-[#C9AE90] focus:border-[#A9673F] focus:bg-white focus:ring-2 focus:ring-[#A9673F]/20 sm:text-[14px]";

  const labelClass =
    "mb-2 block text-[12px] font-semibold tracking-[0.01em] text-[#3A3128]";

  return (
    <section
      id="white-papers"
      className={`${sans.className} relative pb-12 pt-12 antialiased sm:py-24 lg:py-28`}
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

        /* Phone: cards slide up one after another */
        @keyframes wp-card-in {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: none; }
        }
        .wp-card { animation: wp-card-in .7s cubic-bezier(.2,.7,.2,1) both; }
        .wp-card:nth-child(2) { animation-delay: .12s; }

        /* Black statement bar: slow light sweep across the dark surface */
        .wp-dark-sweep {
          background: linear-gradient(105deg, transparent 40%, rgba(214,150,96,.16) 50%, transparent 60%);
          background-size: 260% 100%;
          animation: wp-dark-sweep 9s ease-in-out infinite;
        }
        @keyframes wp-dark-sweep {
          from { background-position: 100% 0; }
          to { background-position: 0% 0; }
        }

        /* Modal: slide-up sheet on phone */
        @keyframes wp-sheet-in {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: none; }
        }
        .wp-sheet { animation: wp-sheet-in .35s cubic-bezier(.2,.7,.2,1) both; }

        .wp-card, .wp-tap { -webkit-tap-highlight-color: transparent; }

        @media (prefers-reduced-motion: reduce) {
          .wp-pan { animation: none; background-position: 50% 50%; }
          .wp-sweep, .wp-dot, .wp-card, .wp-sheet, .wp-dark-sweep { animation: none; }
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
        className="pointer-events-none absolute inset-x-0 top-0 h-[470px] overflow-hidden sm:h-[660px] lg:h-[780px]"
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

      {/* Readability wash behind the heading: wide on phone so text never fights the photo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[470px] sm:hidden"
        style={{
          background:
            "radial-gradient(ellipse 120% 46% at 50% 36%, rgba(248,241,231,0.9), rgba(248,241,231,0.55) 60%, rgba(248,241,231,0) 100%)",
        }}
      />
      {/* Tablet / desktop wash (same as before) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 hidden h-[660px] sm:block lg:h-[780px]"
        style={{
          background:
            "radial-gradient(ellipse 62% 40% at 50% 34%, rgba(248,241,231,0.78), rgba(248,241,231,0) 100%)",
        }}
      />

      {/* Floating copper dust */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[470px] sm:h-[660px] lg:h-[780px]"
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

      <div className="relative mx-auto max-w-[1180px] px-4 sm:px-8 lg:px-10">
        {/* Heading */}
        <div className="mx-auto max-w-[900px] text-center">
          <div className="mb-4 flex items-center justify-center gap-3 sm:mb-6">
            <span
              className="h-px w-8 sm:w-14"
              style={{ backgroundColor: `${COPPER}99` }}
            />
            <span
              className="text-[11px] font-bold uppercase tracking-[0.3em] sm:text-[12.5px] sm:font-semibold"
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
            className={`${serif.className} text-[40px] font-medium leading-[1.05] tracking-[-0.025em] sm:text-[62px] lg:text-[80px]`}
            style={{ color: INK }}
          >
            Technical depth,
            <br />
            <span className="italic" style={{ color: COPPER }}>
              in writing.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-[720px] px-1 text-[14.5px] font-medium leading-[1.75] text-[#3A3F48] sm:mt-8 sm:px-0 sm:text-[17px] sm:leading-[1.8] lg:text-[19px]">
            Our white papers will set out the physics, the architecture, and
            the evidence behind each claim, for engineers, investors, and
            institutions.
          </p>
        </div>

        {/* Cards + bottom bar */}
        <div className="relative z-10 mx-auto mt-14 max-w-[1020px] sm:mt-14">
          <div className="grid grid-cols-1 gap-3 sm:gap-5 md:grid-cols-2 md:gap-6">
            {whitePapers.map((paper) => {
              const Icon = paper.icon;

              return (
                <button
                  key={paper.number}
                  type="button"
                  onClick={() => openForm(paper)}
                  aria-label={`Request access to ${paper.title}`}
                  className="wp-card group relative isolate flex w-full flex-col overflow-hidden rounded-[18px] border p-4 text-left shadow-[0_18px_38px_-22px_rgba(120,76,36,0.55)] transition-all duration-300 active:scale-[0.985] hover:-translate-y-0.5 hover:shadow-[0_28px_56px_-24px_rgba(120,76,36,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A9673F] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F6EFE5] sm:min-h-[310px] sm:rounded-[20px] sm:p-7"
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
                        "linear-gradient(90deg, rgba(251,246,238,0.98) 0%, rgba(251,246,238,0.9) 50%, rgba(251,246,238,0.3) 100%)",
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

                  {/* Copper edge on the left (phone only) */}
                  <span
                    aria-hidden
                    className="absolute bottom-4 left-0 top-4 w-[3px] rounded-r-full sm:hidden"
                    style={{
                      background: `linear-gradient(180deg, ${COPPER}, ${COPPER}33)`,
                    }}
                  />

                  {/* Top copper hairline on hover */}
                  <span
                    className="absolute left-0 top-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
                    style={{ backgroundColor: COPPER }}
                  />

                  {/* Top row */}
                  <div className="flex items-center justify-between gap-4 sm:items-start">
                    <div className="flex flex-1 items-center gap-3 sm:pt-1.5">
                      <span
                        className="text-[10.5px] font-bold uppercase tracking-[0.22em] sm:text-[11.5px] sm:font-semibold"
                        style={{ color: COPPER }}
                      >
                        Paper {paper.number}
                      </span>
                      <span
                        className="h-px w-10 sm:w-16"
                        style={{ backgroundColor: `${COPPER}59` }}
                      />
                    </div>

                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border bg-[#FDF9F3] shadow-[0_6px_16px_-8px_rgba(120,76,36,0.45)] transition-colors group-hover:bg-white sm:h-10 sm:w-10"
                      style={{ borderColor: "#E2CDB3", color: COPPER }}
                    >
                      <Icon size={17} strokeWidth={1.6} />
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className={`${serif.className} mt-3.5 max-w-[86%] text-[20px] font-medium leading-[1.2] tracking-[-0.015em] sm:mt-8 sm:max-w-[78%] sm:text-[27px] sm:leading-[1.16] sm:tracking-[-0.02em]`}
                    style={{ color: INK }}
                  >
                    {paper.title}
                  </h3>

                  <p className="mt-2 max-w-[84%] text-[13px] font-medium leading-[1.6] text-[#5A5148] sm:mt-3 sm:max-w-[56%] sm:flex-1 sm:text-[14px] sm:leading-[1.7]">
                    {paper.description}
                  </p>

                  {/* Footer */}
                  <div
                    className="mt-4 flex items-center justify-between gap-3 border-t pt-3 sm:mt-6 sm:pt-4"
                    style={{ borderColor: "#DEC6AB" }}
                  >
                    <span
                      className="text-[10px] font-bold uppercase tracking-[0.16em] sm:text-[11px] sm:font-semibold sm:tracking-[0.18em]"
                      style={{ color: COPPER }}
                    >
                      PDF · {paper.status}
                    </span>

                    <span className="inline-flex items-center gap-1.5 text-[12.5px] font-bold tracking-[0.01em] text-[#8F5430] transition-colors group-hover:text-[#14181F] max-sm:rounded-full max-sm:border max-sm:border-[#A9673F]/30 max-sm:bg-[#A9673F]/10 max-sm:px-3 max-sm:py-1.5 sm:border-l sm:border-[#DEC6AB] sm:pl-5 sm:text-[13.5px] sm:font-semibold">
                      Request access
                      <ArrowUpRight
                        size={14}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bottom statement: premium black + copper bar */}
          <div
            className="wp-tap group relative mt-3 flex cursor-default items-center justify-center gap-3 overflow-hidden rounded-[16px] border px-4 py-3.5 shadow-[0_22px_44px_-18px_rgba(10,12,16,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_28px_54px_-18px_rgba(10,12,16,0.8),0_0_30px_rgba(214,150,96,0.18)] active:scale-[0.99] sm:mt-5 sm:gap-6 sm:rounded-[18px] sm:px-5 sm:py-5"
            style={{
              background:
                "linear-gradient(135deg, #1A1F28 0%, #0D1015 55%, #14181F 100%)",
              borderColor: "rgba(214,150,96,0.35)",
            }}
          >
            {/* Copper hairline on top */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-6 top-0 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${COPPER_LIGHT}, transparent)`,
              }}
            />

            {/* Soft copper glow in the corners */}
            <span
              aria-hidden
              className="pointer-events-none absolute -left-10 -top-12 h-32 w-32 rounded-full bg-[#D6965F]/15 blur-3xl"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-12 -right-10 h-32 w-32 rounded-full bg-[#A9673F]/20 blur-3xl"
            />

            {/* Slow light sweep */}
            <span
              aria-hidden
              className="wp-dark-sweep pointer-events-none absolute inset-0"
            />

            <span
              className="relative hidden h-px flex-1 sm:block"
              style={{
                background: `linear-gradient(90deg, transparent, ${COPPER_LIGHT}b3)`,
              }}
            />
            <span
              className="relative hidden h-[6px] w-[6px] shrink-0 rounded-full shadow-[0_0_10px_rgba(214,150,96,0.9)] sm:block"
              style={{ backgroundColor: COPPER_LIGHT }}
            />

            <p
              className={`${serif.className} relative text-[13.5px] font-normal italic tracking-[0.12em] text-[#F6EFE5] sm:text-[18px] sm:tracking-[0.16em]`}
            >
              Research <span style={{ color: COPPER_LIGHT }}>·</span>{" "}
              Engineering <span style={{ color: COPPER_LIGHT }}>·</span>{" "}
              Evidence
            </p>

            <span
              className="relative hidden h-[6px] w-[6px] shrink-0 rounded-full shadow-[0_0_10px_rgba(214,150,96,0.9)] sm:block"
              style={{ backgroundColor: COPPER_LIGHT }}
            />
            <span
              className="relative hidden h-px flex-1 sm:block"
              style={{
                background: `linear-gradient(270deg, transparent, ${COPPER_LIGHT}b3)`,
              }}
            />
          </div>
        </div>
      </div>

      {/* White paper access form (bottom sheet on phone, centered dialog on larger screens) */}
      {selectedPaper && (
        <div
          className={`${sans.className} fixed inset-0 z-[100] flex items-end justify-center overflow-y-auto bg-[#2A1C10]/50 antialiased backdrop-blur-sm sm:items-center sm:px-4 sm:py-6`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeForm();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="white-paper-form-title"
            className="wp-sheet relative w-full max-w-[480px] overflow-hidden rounded-t-[22px] border shadow-[0_30px_90px_rgba(60,35,15,0.35)] sm:my-auto sm:rounded-[22px]"
            style={{
              backgroundColor: CARD,
              borderColor: "#DFC8AE",
              maxHeight: "94dvh",
              overflowY: "auto",
            }}
          >
            <div className="h-[3px] w-full" style={{ backgroundColor: COPPER }} />

            {/* Grab handle (phone) */}
            <div className="flex justify-center pt-2.5 sm:hidden">
              <span className="h-1 w-10 rounded-full bg-[#DCC9B3]" />
            </div>

            <div className="p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:p-8">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p
                    className="text-[11px] font-bold uppercase tracking-[0.22em]"
                    style={{ color: COPPER }}
                  >
                    STHORAM LABS / RESEARCH
                  </p>

                  <h3
                    id="white-paper-form-title"
                    className={`${serif.className} mt-2.5 text-[28px] font-medium leading-[1.1] tracking-[-0.02em] sm:mt-3 sm:text-[36px]`}
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
              <div className="mt-5 border-y border-[#E2CDB3] py-3.5 sm:mt-6 sm:py-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9A8A78]">
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
                    <p className="text-[14.5px] font-semibold leading-6 text-[#14181F] sm:text-[15px]">
                      {selectedPaper.title}
                    </p>
                    <p className="mt-1 text-[12px] font-medium text-[#8A7B6A]">
                      PDF document · {selectedPaper.status}
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-[13px] font-medium leading-6 text-[#5A5148] sm:mt-5">
                Enter your contact details to continue to the document.
              </p>

              <form
                className="mt-4 space-y-3.5 sm:mt-5 sm:space-y-4"
                onSubmit={handleSubmit}
              >
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

                <label className="flex items-start gap-3 pt-1 text-[11.5px] font-medium leading-5 text-[#6B5E50]">
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
                  <p role="alert" className="text-sm font-medium text-red-600">
                    {formError}
                  </p>
                )}

                <button
                  type="submit"
                  className="wp-tap flex h-12 w-full items-center justify-center gap-2 rounded-lg px-5 text-[14px] font-bold tracking-[0.01em] text-white shadow-[0_12px_24px_-12px_rgba(143,84,48,0.7)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A9673F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBF6EE]"
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

                <p className="text-center text-[11px] font-medium leading-5 text-[#9A8A78]">
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
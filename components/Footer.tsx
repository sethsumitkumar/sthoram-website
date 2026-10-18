"use client";

import {
  ArrowUp,
  ChevronRight,
  Cpu,
  FlaskConical,
  Globe,
  Headphones,
  LayoutGrid,
  Leaf,
  Mail,
  MapPin,
} from "lucide-react";

// Each link tries its ids in order and scrolls to the first one found on the page
const siteLinks = [
  { label: "Projects", ids: ["verticals", "projects"] },
  { label: "Patents", ids: ["patents"] },
  {
    label: "Witness Reports",
    ids: ["witness-reports", "certification", "witness"],
  },
  { label: "White Papers", ids: ["white-papers", "whitepapers"] },
  { label: "Gallery", ids: ["gallery"] },
  { label: "News", ids: ["news"] },
  { label: "Team", ids: ["team"] },
];

const highlights = [
  { icon: Leaf, a: "Clean", b: "Energy" },
  { icon: Cpu, a: "Advanced", b: "Technologies" },
  { icon: FlaskConical, a: "Life", b: "Sciences" },
  { icon: Globe, a: "Global", b: "Impact" },
];

const NAVY = "#0B1730";
const BLUE = "#2446C2";
const ORANGE = "#C0601C";
const GOLD = "#E8C48F";
const TEXT = "#2A3550";

const BG_IMAGE = `url("/images/card/${encodeURIComponent(
  "Futuristic STHORAM Energy Campus at Golden Hour.png"
)}")`;

const SOFT_SHADOW = { textShadow: "0 1px 10px rgba(255,255,255,0.85)" };

// Removes the grey tap flash on phones and makes taps respond instantly
const TOUCH =
  "touch-manipulation [-webkit-tap-highlight-color:transparent] select-none";

// Phone / tablet: premium navy + gold card, lifts and glows on hover / touch
const PANEL =
  "max-lg:relative max-lg:overflow-hidden max-lg:rounded-[24px] max-lg:border max-lg:border-[#E8C48F]/30 max-lg:bg-[linear-gradient(155deg,#1B3263_0%,#0F1F42_55%,#0A1329_100%)] max-lg:p-6 max-lg:shadow-[0_22px_50px_-12px_rgba(11,23,48,0.55),inset_0_1px_0_rgba(255,255,255,0.08)] max-lg:transition-all max-lg:duration-300 max-lg:ease-out max-lg:hover:-translate-y-1 max-lg:hover:border-[#E8C48F]/60 max-lg:hover:shadow-[0_28px_60px_-12px_rgba(11,23,48,0.65),0_0_32px_rgba(232,161,92,0.22),inset_0_1px_0_rgba(255,255,255,0.12)] max-lg:active:scale-[0.99]";

// Decorative bits shown only inside the phone / tablet panels
function PanelDecor() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 top-0 h-px lg:hidden"
        style={{
          background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#E8A15C]/20 blur-3xl transition-opacity duration-300 lg:hidden"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -left-10 h-36 w-36 rounded-full bg-[#2446C2]/25 blur-3xl lg:hidden"
      />
    </>
  );
}

export default function Footer() {
  const scrollToSection = (ids: string[]) => {
    const element = ids
      .map((id) => document.getElementById(id))
      .find((el) => el !== null);

    if (!element) {
      console.warn("Section not found. Tried ids:", ids);
      return;
    }

    const navbarHeight = 74;
    const elementPosition =
      element.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: elementPosition - navbarHeight,
      behavior: "smooth",
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const contacts = [
    {
      label: "sthoram.com",
      icon: Globe,
      onClick: () => window.open("https://sthoram.com", "_blank", "noreferrer"),
    },
    {
      label: "contact@sthoram.com",
      icon: Mail,
      onClick: () => (window.location.href = "mailto:contact@sthoram.com"),
    },
    {
      label: "ps.khinda@sthoram.com",
      icon: Mail,
      onClick: () => (window.location.href = "mailto:ps.khinda@sthoram.com"),
    },
    {
      label: "STHORAM BMS · Sthoram Kavach",
      icon: MapPin,
      onClick: () => scrollToSection(["verticals", "projects"]),
    },
  ];

  return (
    <footer className="relative flex flex-col justify-between overflow-hidden bg-[#F4E3CC] max-lg:bg-[#FFF8EE] lg:min-h-[max(680px,calc(100svh-90px))]">
      {/* DESKTOP background photo (anchored to the bottom, building stays on the right) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{
          backgroundImage: BG_IMAGE,
          backgroundSize: "cover",
          backgroundPosition: "72% 100%",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* DESKTOP wash: left to right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,251,245,0.94) 0%, rgba(255,251,245,0.86) 30%, rgba(255,251,245,0.62) 52%, rgba(255,251,245,0.18) 72%, rgba(255,251,245,0) 88%)",
        }}
      />

      {/* PHONE / TABLET soft background tint (photo is shown in its own band below) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 lg:hidden"
        style={{
          background:
            "linear-gradient(180deg, #F7E6CC 0%, #FFF6E8 14%, #FFF9F1 60%, #FFF4E4 100%)",
        }}
      />

      {/* Seamless blend from the Team section above */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-20"
        style={{
          background:
            "linear-gradient(180deg, #F7E6CC 0%, rgba(247,230,204,0) 100%)",
        }}
      />

      {/* Gold hairline */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, #E8C48F 20%, #C0601C 50%, #E8C48F 80%, transparent)",
        }}
      />

      {/* Main content */}
      <div className="relative mx-auto w-full max-w-[1400px] px-5 pt-12 sm:px-8 lg:px-12 lg:pt-20">
        <div className="grid gap-5 md:grid-cols-2 lg:gap-0 xl:grid-cols-[1.25fr_0.65fr_0.85fr_0.85fr]">
          {/* Company */}
          <div className="mb-2 md:col-span-2 lg:col-span-1 lg:mb-0 lg:pr-12 max-lg:text-center">
            <button
              type="button"
              onClick={scrollToTop}
              className={`${TOUCH} text-left transition-transform duration-300 hover:scale-[1.02] active:scale-[0.97] max-lg:mx-auto max-lg:text-center`}
              aria-label="Back to top"
            >
              <div
                className="flex items-center gap-x-3 whitespace-nowrap font-sans text-[28px] font-extrabold tracking-[0.04em] max-lg:justify-center sm:text-[32px] lg:text-[34px]"
                style={SOFT_SHADOW}
              >
                <span style={{ color: NAVY }}>STHORAM</span>
                <span
                  className="inline-block h-[13px] w-[13px] shrink-0 rotate-45 sm:h-[15px] sm:w-[15px]"
                  style={{
                    background: `linear-gradient(135deg, #E8A15C, ${ORANGE})`,
                  }}
                />
                <span style={{ color: BLUE }}>LABS</span>
              </div>

              <div
                className="mt-2 font-sans text-[11px] font-bold tracking-[0.38em] sm:text-[12.5px]"
                style={{ color: ORANGE }}
              >
                DEEP TECH INNOVATIONS
              </div>

              <div
                className="mt-3 h-[2px] w-14 rounded-full max-lg:mx-auto"
                style={{
                  background: `linear-gradient(90deg, ${ORANGE}, transparent)`,
                }}
              />
            </button>

            <p
              className="mt-5 max-w-[460px] font-sans text-[15px] font-medium leading-[1.7] max-lg:mx-auto sm:text-[17px] lg:mt-6 lg:leading-[1.75]"
              style={{ color: TEXT, ...SOFT_SHADOW }}
            >
              A deep-tech innovation company solving the critical problems of
              industry — beginning with Renewable Energy Storage, and extending
              to Life Sciences.
            </p>

            {/* Highlights: react to mouse hover AND to touch (active) */}
            <div className="mx-auto mt-7 grid max-w-[480px] grid-cols-4 divide-x divide-[#C0601C]/20 lg:mx-0 lg:mt-9">
              {highlights.map(({ icon: Icon, a, b }) => (
                <div
                  key={a}
                  className={`${TOUCH} group flex cursor-default flex-col items-center px-1 text-center`}
                >
                  {/* No inline color here, so the hover color can actually apply */}
                  <span className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white text-[#C0601C] shadow-[0_8px_20px_rgba(192,96,28,0.25)] ring-1 ring-[#C0601C]/25 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:bg-[#C0601C] group-hover:text-white group-hover:shadow-[0_14px_28px_rgba(192,96,28,0.42)] group-active:-translate-y-1.5 group-active:scale-95 group-active:bg-[#C0601C] group-active:text-white group-active:shadow-[0_14px_28px_rgba(192,96,28,0.42)] sm:h-[60px] sm:w-[60px]">
                    <Icon
                      size={24}
                      strokeWidth={1.5}
                      color="currentColor"
                      aria-hidden="true"
                    />
                  </span>
                  <span
                    className="mt-2.5 font-sans text-[8.5px] font-bold uppercase leading-[1.55] tracking-[0.12em] transition-colors duration-300 group-hover:text-[#C0601C] group-active:text-[#C0601C] sm:text-[10px] sm:tracking-[0.16em]"
                    style={{ color: undefined }}
                  >
                    <span className="text-[#0B1730] transition-colors duration-300 group-hover:text-[#C0601C] group-active:text-[#C0601C]">
                      {a}
                      <br />
                      {b}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Site */}
          <div className={`lg:border-l lg:border-[#0B1730]/12 lg:px-9 ${PANEL}`}>
            <PanelDecor />

            <div className="relative flex items-center gap-3">
              <LayoutGrid
                size={24}
                strokeWidth={1.5}
                className="text-[#C0601C] max-lg:text-[#E8C48F]"
                aria-hidden="true"
              />
              <h3 className="font-sans text-[14px] font-extrabold uppercase tracking-[0.3em] text-[#0B1730] max-lg:text-white">
                Site
              </h3>
            </div>
            <div
              className="relative mt-3 h-[2px] w-12 rounded-full"
              style={{
                background: `linear-gradient(90deg, ${ORANGE}, transparent)`,
              }}
            />

            <nav className="relative mt-3 flex flex-col max-lg:divide-y max-lg:divide-white/10 lg:mt-4">
              {siteLinks.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => scrollToSection(link.ids)}
                  className={`${TOUCH} group flex w-full items-center justify-between py-[11px] text-left font-sans text-[15.5px] font-semibold text-[#0B1730] transition-all duration-200 hover:text-[#C0601C] max-lg:-mx-3 max-lg:w-[calc(100%+1.5rem)] max-lg:rounded-xl max-lg:px-3 max-lg:text-white/95 max-lg:hover:bg-white/[0.07] max-lg:hover:text-[#E8C48F] max-lg:active:scale-[0.98] max-lg:active:bg-[#E8C48F]/15 max-lg:active:text-[#E8C48F] lg:py-[9px] lg:[text-shadow:0_1px_10px_rgba(255,255,255,0.85)]`}
                >
                  <span className="relative transition-transform duration-200 group-hover:translate-x-1 group-active:translate-x-1.5">
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#C0601C] transition-all duration-300 group-hover:w-full group-active:w-full max-lg:bg-[#E8C48F]" />
                  </span>
                  <ChevronRight
                    size={16}
                    strokeWidth={2}
                    className="text-[#C0601C] transition-transform duration-200 group-hover:translate-x-1.5 group-active:translate-x-2 max-lg:text-[#E8C48F]"
                    aria-hidden="true"
                  />
                </button>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className={`lg:border-l lg:border-[#0B1730]/12 lg:px-9 ${PANEL}`}>
            <PanelDecor />

            <div className="relative flex items-center gap-3">
              <Headphones
                size={24}
                strokeWidth={1.5}
                className="text-[#C0601C] max-lg:text-[#E8C48F]"
                aria-hidden="true"
              />
              <h3 className="font-sans text-[14px] font-extrabold uppercase tracking-[0.3em] text-[#0B1730] max-lg:text-white">
                Contact
              </h3>
            </div>
            <div
              className="relative mt-3 h-[2px] w-12 rounded-full"
              style={{
                background: `linear-gradient(90deg, ${ORANGE}, transparent)`,
              }}
            />

            <div className="relative mt-4 flex flex-col items-start gap-3 max-lg:items-stretch lg:mt-5">
              {contacts.map(({ label, icon: Icon, onClick }) => (
                <button
                  key={label}
                  type="button"
                  onClick={onClick}
                  className={`${TOUCH} group flex max-w-full items-center gap-3 rounded-full border border-white/80 bg-white/70 py-1.5 pl-1.5 pr-5 text-left font-sans text-[14px] font-semibold text-[#0B1730] shadow-[0_8px_22px_rgba(90,60,30,0.14)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C0601C]/40 hover:bg-white/90 hover:shadow-[0_12px_28px_rgba(192,96,28,0.25)] active:translate-y-0 active:scale-[0.97] max-lg:border-white/15 max-lg:bg-white/[0.07] max-lg:text-white max-lg:shadow-none max-lg:hover:border-[#E8C48F]/60 max-lg:hover:bg-white/[0.14] max-lg:hover:shadow-[0_10px_24px_rgba(0,0,0,0.3)] max-lg:active:border-[#E8C48F]/70 max-lg:active:bg-[#E8C48F]/20 max-lg:active:shadow-[0_6px_18px_rgba(232,161,92,0.25)] lg:text-[14.5px]`}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#C0601C]/12 text-[#C0601C] transition-all duration-300 group-hover:bg-[#C0601C] group-hover:text-white group-active:bg-[#C0601C] group-active:text-white max-lg:bg-[#E8C48F]/15 max-lg:text-[#E8C48F] max-lg:ring-1 max-lg:ring-[#E8C48F]/30 max-lg:group-hover:bg-[#E8C48F] max-lg:group-hover:text-[#0B1730] max-lg:group-active:bg-[#E8C48F] max-lg:group-active:text-[#0B1730]">
                    <Icon
                      size={17}
                      strokeWidth={1.7}
                      color="currentColor"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="whitespace-nowrap">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Spacer column on big screens: keeps the building visible */}
          <div className="hidden xl:block" aria-hidden="true" />
        </div>
      </div>

      {/* PHONE / TABLET photo band: building + sunset stay clearly visible.
          Top fades into the cream background; the glass bar below overlaps its bottom. */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative mt-6 h-[300px] w-full sm:h-[360px] lg:hidden"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: BG_IMAGE,
            backgroundSize: "cover",
            backgroundPosition: "78% 70%",
            backgroundRepeat: "no-repeat",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, #000 28%, #000 100%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, #000 28%, #000 100%)",
          }}
        />
      </div>

      {/* Bottom glass bar */}
      <div className="relative mx-auto -mt-20 w-full max-w-[1400px] px-3 sm:px-8 lg:mt-12 lg:px-8">
        <div className="rounded-t-[28px] border border-b-0 border-white/80 bg-white/80 px-6 py-5 shadow-[0_-10px_40px_rgba(90,60,30,0.14)] backdrop-blur-xl transition-colors duration-300 hover:bg-white/90 lg:bg-white/75 lg:px-10 lg:hover:bg-white/85">
          <div className="flex flex-col items-center gap-3 text-center lg:flex-row lg:justify-between lg:gap-0 lg:text-left">
            <p
              className="font-sans text-[12.5px] font-medium lg:pr-8"
              style={{ color: TEXT }}
            >
              © 2026 STHORAM Labs. All rights reserved.
            </p>

            <span className="hidden h-6 w-px bg-[#0B1730]/15 lg:block" />

            <p
              className="font-sans text-[12.5px] font-semibold lg:px-8"
              style={{ color: NAVY }}
            >
              24+ Patent Applications Filed
            </p>

            <span className="hidden h-6 w-px bg-[#0B1730]/15 lg:block" />

            <div className="flex items-center gap-4 lg:pl-8">
              <p
                className="font-sans text-[10px] font-bold uppercase tracking-[0.14em] lg:text-[10.5px] lg:tracking-[0.16em]"
                style={{ color: TEXT }}
              >
                Innovation <span className="mx-1 text-[#C0601C]">|</span>
                Sustainability <span className="mx-1 text-[#C0601C]">|</span>
                A Brighter Tomorrow
              </p>

              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Back to top"
                className={`${TOUCH} flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#C0601C]/50 text-[#C0601C] transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:bg-[#C0601C] hover:text-white hover:shadow-[0_8px_18px_rgba(192,96,28,0.4)] active:translate-y-0 active:scale-90 active:border-transparent active:bg-[#C0601C] active:text-white`}
              >
                <ArrowUp size={16} strokeWidth={2} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
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
const TEXT = "#2A3550";

const BG_IMAGE = `url("/images/card/${encodeURIComponent(
  "Futuristic STHORAM Energy Campus at Golden Hour.png"
)}")`;

const SOFT_SHADOW = { textShadow: "0 1px 10px rgba(255,255,255,0.85)" };

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
      label: "STHORAM BMS · Sthoram Kavach",
      icon: MapPin,
      onClick: () => scrollToSection(["verticals", "projects"]),
    },
  ];

  return (
    <footer
      className="relative flex flex-col justify-between overflow-hidden bg-[#F4E3CC]"
      style={{ minHeight: "max(680px, calc(100svh - 90px))" }}
    >
      {/* Background photo (anchored to the bottom, building stays on the right) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: BG_IMAGE,
          backgroundSize: "cover",
          backgroundPosition: "72% 100%",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Wash: desktop = left to right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,251,245,0.94) 0%, rgba(255,251,245,0.86) 30%, rgba(255,251,245,0.62) 52%, rgba(255,251,245,0.18) 72%, rgba(255,251,245,0) 88%)",
        }}
      />
      {/* Wash: phone / tablet = top to bottom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 lg:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,251,245,0.94) 0%, rgba(255,251,245,0.86) 55%, rgba(255,251,245,0.35) 85%, rgba(255,251,245,0) 100%)",
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
      <div className="relative mx-auto w-full max-w-[1400px] px-6 pt-16 sm:px-8 lg:px-12 lg:pt-20">
        <div className="grid gap-12 md:grid-cols-2 lg:gap-0 xl:grid-cols-[1.25fr_0.65fr_0.85fr_0.85fr]">
          {/* Company */}
          <div className="md:col-span-2 lg:col-span-1 lg:pr-12">
            <button
              type="button"
              onClick={scrollToTop}
              className="text-left"
              aria-label="Back to top"
            >
              <div
                className="flex items-center gap-x-3 whitespace-nowrap font-sans text-[26px] font-extrabold tracking-[0.04em] sm:text-[32px] lg:text-[34px]"
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
                className="mt-3 h-[2px] w-14 rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${ORANGE}, transparent)`,
                }}
              />
            </button>

            <p
              className="mt-6 max-w-[460px] font-sans text-[15.5px] font-medium leading-[1.75] sm:text-[17px]"
              style={{ color: TEXT, ...SOFT_SHADOW }}
            >
              A deep-tech innovation company solving the critical problems of
              industry — beginning with Renewable Energy Storage, and extending
              to Life Sciences.
            </p>

            {/* Highlights */}
            <div className="mt-9 grid max-w-[480px] grid-cols-4 divide-x divide-[#C0601C]/20">
              {highlights.map(({ icon: Icon, a, b }) => (
                <div
                  key={a}
                  className="group flex cursor-default flex-col items-center px-1 text-center"
                >
                  {/* No inline color here, so the hover color can actually apply */}
                  <span className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-white text-[#C0601C] shadow-[0_8px_20px_rgba(192,96,28,0.25)] ring-1 ring-[#C0601C]/25 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:bg-[#C0601C] group-hover:text-white group-hover:shadow-[0_14px_28px_rgba(192,96,28,0.42)] sm:h-[60px] sm:w-[60px]">
                    <Icon
                      size={25}
                      strokeWidth={1.5}
                      color="currentColor"
                      aria-hidden="true"
                    />
                  </span>
                  <span
                    className="mt-2.5 font-sans text-[9px] font-bold uppercase leading-[1.55] tracking-[0.16em] sm:text-[10px]"
                    style={{ color: NAVY }}
                  >
                    {a}
                    <br />
                    {b}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Site */}
          <div className="lg:border-l lg:border-[#0B1730]/12 lg:px-9">
            <div className="flex items-center gap-3">
              <LayoutGrid
                size={24}
                strokeWidth={1.5}
                style={{ color: ORANGE }}
                aria-hidden="true"
              />
              <h3
                className="font-sans text-[14px] font-extrabold uppercase tracking-[0.3em]"
                style={{ color: NAVY }}
              >
                Site
              </h3>
            </div>
            <div
              className="mt-3 h-[2px] w-12 rounded-full"
              style={{
                background: `linear-gradient(90deg, ${ORANGE}, transparent)`,
              }}
            />

            <nav className="mt-4 flex flex-col">
              {siteLinks.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => scrollToSection(link.ids)}
                  className="group flex w-full items-center justify-between py-[9px] text-left font-sans text-[15.5px] font-semibold transition-colors duration-200 hover:text-[#C0601C]"
                  style={{ color: NAVY, ...SOFT_SHADOW }}
                >
                  <span className="relative transition-transform duration-200 group-hover:translate-x-1">
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#C0601C] transition-all duration-300 group-hover:w-full" />
                  </span>
                  <ChevronRight
                    size={16}
                    strokeWidth={2}
                    className="text-[#C0601C] transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </button>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="lg:border-l lg:border-[#0B1730]/12 lg:px-9">
            <div className="flex items-center gap-3">
              <Headphones
                size={24}
                strokeWidth={1.5}
                style={{ color: ORANGE }}
                aria-hidden="true"
              />
              <h3
                className="font-sans text-[14px] font-extrabold uppercase tracking-[0.3em]"
                style={{ color: NAVY }}
              >
                Contact
              </h3>
            </div>
            <div
              className="mt-3 h-[2px] w-12 rounded-full"
              style={{
                background: `linear-gradient(90deg, ${ORANGE}, transparent)`,
              }}
            />

            <div className="mt-5 flex flex-col items-start gap-3">
              {contacts.map(({ label, icon: Icon, onClick }) => (
                <button
                  key={label}
                  type="button"
                  onClick={onClick}
                  className="group flex items-center gap-3 rounded-full border border-white/80 bg-white/70 py-1.5 pl-1.5 pr-5 text-left font-sans text-[14.5px] font-semibold shadow-[0_8px_22px_rgba(90,60,30,0.14)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C0601C]/40 hover:bg-white/90 hover:shadow-[0_12px_28px_rgba(192,96,28,0.25)]"
                  style={{ color: NAVY }}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#C0601C]/12 text-[#C0601C] transition-all duration-300 group-hover:bg-[#C0601C] group-hover:text-white">
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

      {/* Bottom glass bar */}
      <div className="relative mx-auto mt-12 w-full max-w-[1400px] px-0 sm:px-8">
        <div className="rounded-t-[28px] border border-b-0 border-white/80 bg-white/75 px-6 py-5 shadow-[0_-10px_40px_rgba(90,60,30,0.14)] backdrop-blur-xl lg:px-10">
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
              CII Exhibition · 5–6 August 2026 · 24+ Patent Applications Filed
            </p>

            <span className="hidden h-6 w-px bg-[#0B1730]/15 lg:block" />

            <div className="flex items-center gap-4 lg:pl-8">
              <p
                className="font-sans text-[10.5px] font-bold uppercase tracking-[0.16em]"
                style={{ color: TEXT }}
              >
                Innovation <span className="mx-1.5 text-[#C0601C]">|</span>
                Sustainability <span className="mx-1.5 text-[#C0601C]">|</span>
                A Brighter Tomorrow
              </p>

              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Back to top"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#C0601C]/50 text-[#C0601C] transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:bg-[#C0601C] hover:text-white hover:shadow-[0_8px_18px_rgba(192,96,28,0.4)]"
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
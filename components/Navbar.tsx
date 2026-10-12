"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Projects", id: "projects" },
  { label: "Patents", id: "patents" },
  { label: "Certification", id: "certification" },
  { label: "White Papers", id: "white-papers" },
  { label: "Gallery", id: "gallery" },
  { label: "News", id: "news" },
  { label: "Team", id: "team" },
];

const sectionAliases: Record<string, string[]> = {
  projects: ["projects", "project", "verticals"],
  patents: ["patents"],
  certification: ["certification"],
  "white-papers": ["white-papers", "whitePapers"],
  gallery: ["gallery"],
  news: ["news"],
  team: ["team"],
};

const NAVBAR_HEIGHT = 74;

function findSection(id: string) {
  const ids = sectionAliases[id] ?? [id];
  return (
    ids
      .map((sectionId) => document.getElementById(sectionId))
      .find((element) => element !== null) ?? null
  );
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("");

  // While a click-triggered smooth scroll is running, keep the clicked item selected
  const lockUntil = useRef(0);

  // Shadow after scroll + highlight the section currently in view
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);

      if (Date.now() < lockUntil.current) return;

      const offset = NAVBAR_HEIGHT + 60;
      let bestId = "";
      let bestTop = -Infinity;

      for (const item of navItems) {
        const element = findSection(item.id);
        if (!element) continue;

        const top = element.getBoundingClientRect().top - offset;
        if (top <= 0 && top > bestTop) {
          bestTop = top;
          bestId = item.id;
        }
      }

      setActiveId(bestId);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const section = findSection(id);

    // Clicked item turns black immediately and stays selected after the scroll
    setActiveId(id);
    lockUntil.current = Date.now() + 1100;
    window.setTimeout(() => window.dispatchEvent(new Event("scroll")), 1150);

    if (!section) {
      console.error(`Navbar: No section found for "${id}".`);
      setMobileMenuOpen(false);
      return;
    }

    const extraSpacing = 16;

    const targetPosition =
      section.getBoundingClientRect().top +
      window.scrollY -
      NAVBAR_HEIGHT -
      extraSpacing;

    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior: "smooth",
    });

    setMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] w-full border-b backdrop-blur-xl transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled
          ? "border-[#CFE3F5] bg-[#F2F8FD]/95 shadow-[0_10px_34px_rgba(16,35,66,0.10)]"
          : "border-[#D7E8F7] bg-[#F2F8FD]/90"
      }`}
    >
      <style>{`
        @keyframes sthoram-menu {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .sthoram-menu {
          animation: sthoram-menu .25s cubic-bezier(.2,.7,.2,1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .sthoram-menu { animation: none; }
        }
      `}</style>

      {/* Thin glowing accent line along the bottom edge */}
      <span className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-[#00AEEF]/60 to-transparent" />

      {/* Header */}
      <div className="mx-auto flex h-[74px] max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-10">
        {/* Logo */}
        <button
          type="button"
          onClick={scrollToTop}
          className="relative -top-[3px] flex shrink-0 items-center transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00AEEF] focus-visible:ring-offset-4"
          aria-label="Scroll to top"
        >
          <img
            src="/images/logo/sthoram-logo.png"
            alt="STHORAM Labs"
            width={205}
            height={80}
            className="block h-auto w-[125px] object-contain sm:w-[155px] lg:w-[180px]"
            onError={(event) => {
              console.error(
                "Logo failed to load:",
                event.currentTarget.src
              );
            }}
          />
        </button>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 lg:flex xl:gap-2"
        >
          {navItems.map((item) => {
            const isActive = activeId === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                aria-current={isActive ? "true" : undefined}
                className={`group relative whitespace-nowrap rounded-full px-3.5 py-2 font-sans text-[16px] font-medium tracking-[-0.005em] transition-all duration-300 hover:-translate-y-px hover:bg-[#E3F1FC] hover:text-[#0A7FD6] hover:shadow-[0_6px_16px_rgba(0,143,224,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00AEEF] focus-visible:ring-offset-2 active:bg-[#0A0F1C] active:text-white xl:px-4 xl:text-[17px] ${
                  isActive
                    ? "bg-[#0A0F1C] text-white shadow-[0_8px_20px_rgba(10,15,28,0.28)] hover:!bg-[#0A0F1C] hover:!text-white"
                    : "text-[#102342]"
                }`}
              >
                {item.label}

                {/* Animated underline */}
                <span
                  className={`pointer-events-none absolute inset-x-4 bottom-1 h-[2px] origin-center rounded-full bg-gradient-to-r from-[#2C97FF] to-[#7DD3FC] transition-transform duration-300 group-hover:scale-x-100 ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#C7DCEF] bg-white/60 text-[#102342] shadow-sm transition-all duration-200 hover:border-[#00AEEF] hover:bg-[#E3F1FC] hover:text-[#0A7FD6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00AEEF] active:scale-95 lg:hidden"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {mobileMenuOpen ? (
            <X size={26} aria-hidden="true" />
          ) : (
            <Menu size={26} aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="sthoram-menu absolute inset-x-0 top-[74px] z-[110] max-h-[calc(100dvh-74px)] overflow-y-auto overscroll-contain border-t border-[#D7E8F7] bg-[#F2F8FD] px-5 pb-6 pt-2 shadow-[0_24px_40px_rgba(16,35,66,0.18)] lg:hidden"
        >
          <div className="mx-auto w-full max-w-[600px]">
            {navItems.map((item) => {
              const isActive = activeId === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`group flex w-full items-center justify-between rounded-xl border-b border-[#D7E8F7] px-2 py-4 text-left font-sans text-[18px] font-medium transition-all duration-200 hover:bg-white hover:pl-4 hover:text-[#0A7FD6] focus-visible:bg-white focus-visible:text-[#0A7FD6] focus-visible:outline-none active:bg-[#0A0F1C] active:text-white ${
                    isActive
                      ? "bg-[#0A0F1C] text-white hover:!bg-[#0A0F1C] hover:!text-white"
                      : "text-[#102342]"
                  }`}
                >
                  <span>{item.label}</span>
                  <span
                    className="text-[20px] text-[#008FE0] transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}

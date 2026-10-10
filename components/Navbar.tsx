
"use client";

import { useState } from "react";
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
  certification: ["certification", "Certification"],
  "white-papers": ["white-papers", "whitePapers"],
  gallery: ["gallery"],
  news: ["news"],
  team: ["team"],
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const ids = sectionAliases[id] ?? [id];

    const section = ids
      .map((sectionId) => document.getElementById(sectionId))
      .find((element) => element !== null);

    if (!section) {
      console.error(`Navbar: No section found for "${id}".`);
      setMobileMenuOpen(false);
      return;
    }

    const navbarHeight = 74;
    const extraSpacing = 16;

    const targetPosition =
      section.getBoundingClientRect().top +
      window.scrollY -
      navbarHeight -
      extraSpacing;

    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior: "smooth",
    });

    setMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-[100] w-full border-b border-white/10 bg-[#05080F]">
      {/* Header */}
      <div className="mx-auto flex h-[74px] max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-10">
        <button
          type="button"
          onClick={scrollToTop}
          className="flex shrink-0 items-center"
          aria-label="Scroll to top"
        >
          <img
            src="/images/sthoram-logo.png"
            alt="STHORAM Labs"
            className="block h-auto w-[145px] sm:w-[180px] lg:w-[205px]"
          />
        </button>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-7 lg:flex"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className="whitespace-nowrap font-sans text-[14px] font-medium text-white/65 transition-colors hover:text-[#00AEEF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00AEEF]"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-[#00AEEF] transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00AEEF] lg:hidden"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {mobileMenuOpen ? (
            <X size={25} aria-hidden="true" />
          ) : (
            <Menu size={25} aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="absolute inset-x-0 top-[74px] z-[110] max-h-[calc(100dvh-74px)] overflow-y-auto overscroll-contain border-t border-[#00AEEF]/20 bg-[#05080F] px-5 pb-6 pt-3 shadow-2xl lg:hidden"
        >
          <div className="mx-auto w-full max-w-[600px]">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="flex w-full items-center justify-between border-b border-white/10 py-4 text-left font-sans text-[15px] font-medium text-white/80 transition-colors hover:text-[#00AEEF] focus-visible:outline-none focus-visible:text-[#00AEEF]"
              >
                <span>{item.label}</span>
                <span className="text-[#00AEEF]" aria-hidden="true">
                  →
                </span>
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

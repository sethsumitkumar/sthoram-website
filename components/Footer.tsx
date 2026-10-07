"use client";

import { ArrowUpRight } from "lucide-react";

const siteLinks = [
  { label: "Projects", id: "projects" },
  { label: "Patents", id: "patents" },
  { label: "Witness Reports", id: "witness-reports" },
  { label: "White Papers", id: "white-papers" },
  { label: "Gallery", id: "gallery" },
  { label: "News", id: "news" },
  { label: "Team", id: "team" },
];

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);

    if (!element) return;

    const navbarHeight = 74;

    const elementPosition =
      element.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: elementPosition - navbarHeight,
      behavior: "smooth",
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative overflow-hidden bg-[#05080F]">
      {/* Top CTA area */}
      <section
        id="partner"
        className="relative overflow-hidden border-t border-white/[0.07] py-24 sm:py-28 lg:py-32"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#087F73]/[0.08] blur-[150px]" />

          <div className="absolute left-1/2 top-0 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#4DE7E5]/20 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-[1100px] px-6 text-center lg:px-10">
          <div className="mx-auto max-w-[760px]">
            <span className="font-sans text-[10px] font-medium uppercase tracking-[0.28em] text-[#67D9D5]">
              Partner With Us
            </span>

            <h2 className="mt-6 font-sans text-[38px] font-semibold leading-[1.08] tracking-[-0.035em] text-[#F2F6FF] sm:text-[48px] lg:text-[56px]">
              Building technology for problems
              <br />
              <span className="text-white/50">that matter.</span>
            </h2>

            <p className="mx-auto mt-6 max-w-[620px] font-sans text-[15px] leading-7 text-[#7F8DA2]">
              STHORAM Labs is building deep-tech solutions for critical
              industrial challenges, beginning with renewable energy storage
              and extending into life sciences.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#55DFFF] to-[#5CE8D2] px-7 py-3.5 font-sans text-[14px] font-semibold text-[#061116] shadow-[0_0_35px_rgba(77,231,229,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(77,231,229,0.28)]"
              >
                Schedule a Demonstration

                <ArrowUpRight
                  size={17}
                  strokeWidth={1.8}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>

              <button
                type="button"
                className="rounded-full border border-white/10 px-7 py-3.5 font-sans text-[14px] text-white/65 transition-all duration-300 hover:border-[#4DE7E5]/30 hover:text-white"
              >
                Investor Enquiry
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main footer */}
      <div className="border-t border-white/[0.07]">
        <div className="mx-auto max-w-[1280px] px-6 py-16 lg:px-10 lg:py-20">
          <div className="grid gap-14 md:grid-cols-[1.5fr_0.7fr_0.9fr]">
            {/* Company */}
            <div>
              <button
                type="button"
                onClick={scrollToTop}
                className="text-left"
              >
                <div className="font-sans text-[17px] font-bold tracking-[0.15em] text-white">
                  STHORAM
                  <span className="text-[#4DE7E5]">◆</span>
                  LABS
                </div>

                <div className="mt-1 font-sans text-[8px] font-medium tracking-[0.3em] text-white/40">
                  DEEP TECH INNOVATIONS
                </div>
              </button>

              <p className="mt-7 max-w-[420px] font-sans text-[14px] leading-6 text-[#77869B]">
                A deep-tech innovation company solving the critical problems of
                industry — beginning with Renewable Energy Storage, and
                extending to Life Sciences. Atmanirbhar Bharat · Indian IP ·
                Global Impact.
              </p>
            </div>

            {/* Site */}
            <div>
              <h3 className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-[#5FD3D0]">
                Site
              </h3>

              <nav className="mt-6 flex flex-col gap-3">
                {siteLinks.map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => scrollToSection(link.id)}
                    className="w-fit font-sans text-left text-[14px] text-[#77869B] transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-[#5FD3D0]">
                Contact
              </h3>

              <div className="mt-6 flex flex-col gap-3">
                <a
                  href="https://sthoram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-fit font-sans text-[14px] text-[#77869B] transition-colors hover:text-white"
                >
                  sthoram.com
                </a>

                <a
                  href="mailto:contact@sthoram.com"
                  className="w-fit font-sans text-[14px] text-[#77869B] transition-colors hover:text-white"
                >
                  contact@sthoram.com
                </a>

                <a
                  href="mailto:invest@sthoram.com"
                  className="w-fit font-sans text-[14px] text-[#77869B] transition-colors hover:text-white"
                >
                  invest@sthoram.com
                </a>

                <button
                  type="button"
                  onClick={() => scrollToSection("projects")}
                  className="w-fit font-sans text-left text-[14px] text-[#77869B] transition-colors hover:text-white"
                >
                  STHORAM BMS · Sthoram Kavach
                </button>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-16 flex flex-col gap-5 border-t border-white/[0.07] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-sans text-[11px] text-white/35">
              © 2026 STHORAM Labs. All rights reserved.
            </p>

            <p className="font-sans text-[11px] text-white/30">
              CII Exhibition · 5–6 August 2026 · 24+ Patent Applications Filed
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
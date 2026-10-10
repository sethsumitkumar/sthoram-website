"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  BarChart3,
  FileText,
  Zap,
  X,
} from "lucide-react";

const whitePapers = [
  {
    icon: Zap,
    number: "01",
    title: "Continuous Cell-Level Electrochemical Equilibrium",
    description:
      "Why periodic balancing fails, and how continuous equilibrium changes everything.",
    status: "Volume I",
    filename: "White Paper Volume I – Cell Balancing.pdf",
  },
  {
    icon: FileText,
    number: "02",
    title: "Eliminating Thermal Runaway at the Root Cause",
    description:
      "From detection-after-onset to prediction and active N₂ containment.",
    status: "Volume II",
    filename: "White Paper Volume II – Cell_Isolation.pdf",
  },
];

type WhitePaper = (typeof whitePapers)[number];

export default function WhitePapers() {
  const [selectedPaper, setSelectedPaper] = useState<WhitePaper | null>(
    null
  );
  const [formError, setFormError] = useState("");

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

  function openForm(paper: WhitePaper) {
    setFormError("");
    setSelectedPaper(paper);
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

    const pdfUrl = `/whitepapers/${encodeURIComponent(
      selectedPaper.filename
    )}`;

    const pdfWindow = window.open(
      pdfUrl,
      "_blank",
      "noopener,noreferrer"
    );

    if (!pdfWindow) {
      setFormError(
        "The PDF could not be opened. Please allow pop-ups and try again."
      );
      return;
    }

    setSelectedPaper(null);
    setFormError("");
  }

  return (
    <section
      id="white-papers"
      className="relative overflow-hidden bg-[#05080F] py-24 sm:py-28 lg:py-32"
    >
      {/* Existing background preserved */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-10%] top-[20%] h-[500px] w-[500px] rounded-full bg-[#009FE3]/[0.06] blur-[140px]" />

        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-10">
        {/* Original heading and description preserved */}
        <div className="mx-auto max-w-[900px] text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#009FE3]" />

            <span className="font-sans text-[13px] font-semibold uppercase tracking-[0.22em] text-[#009FE3]">
              White Papers
            </span>

            <span className="h-px w-10 bg-[#009FE3]" />
          </div>

          <h2 className="font-sans text-[42px] font-semibold leading-[1.12] tracking-[-0.025em] text-[#009FE3] sm:text-[54px] lg:text-[64px]">
            Technical depth,
            <br />
            <span className="text-[#009FE3]">in writing.</span>
          </h2>

          <p className="mx-auto mt-7 max-w-[850px] font-sans text-[19px] leading-[1.8] text-[#D0D9E5] sm:text-[21px] lg:text-[23px]">
            Our white papers will set out the physics, the architecture, and
            the evidence behind each claim, for engineers, investors, and
            institutions.
          </p>
        </div>

        {/* Exactly two PDF cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {whitePapers.map((paper) => {
            const Icon = paper.icon;

            return (
              <button
                key={paper.number}
                type="button"
                onClick={() => openForm(paper)}
                aria-label={`Request access to ${paper.title}`}
                className="group relative flex min-h-[360px] w-full flex-col overflow-hidden rounded-2xl border border-[#263442] bg-[#090F17] p-7 text-left transition-colors duration-200 hover:border-[#009FE3]/70 hover:bg-[#0B141E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009FE3] focus-visible:ring-offset-4 focus-visible:ring-offset-[#05080F] sm:p-9"
              >
                <span className="absolute left-0 top-0 h-[2px] w-0 bg-[#009FE3] transition-all duration-200 group-hover:w-full" />

                <div className="flex items-start justify-between gap-4">
                  <span className="pt-1 font-sans text-[12px] font-semibold tracking-[0.17em] text-[#009FE3] sm:text-[13px]">
                    PAPER {paper.number}
                  </span>

                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#293746] bg-[#0D1620] text-[#009FE3] transition-colors group-hover:border-[#009FE3]/50">
                    <Icon size={20} strokeWidth={1.7} />
                  </span>
                </div>

                <h3 className="mt-10 font-sans text-[23px] font-semibold leading-[1.35] tracking-[-0.025em] text-[#F3F6FA] sm:text-[27px]">
                  {paper.title}
                </h3>

                <p className="mt-4 flex-1 font-sans text-[15px] leading-7 text-[#AAB7C6] sm:text-[16px]">
                  {paper.description}
                </p>

                <div className="mt-8 flex items-center justify-between gap-3 border-t border-white/10 pt-5">
                  <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#009FE3] sm:text-[12px]">
                    PDF · {paper.status}
                  </span>

                  <span className="inline-flex items-center gap-2 text-[14px] font-medium text-white/85 transition-colors group-hover:text-[#009FE3]">
                    Request access
                    <ArrowUpRight size={17} />
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Original bottom statement preserved */}
        <div className="mt-10 rounded-3xl border border-[#009FE3]/15 bg-[#0A151F]/50 px-7 py-6 text-center">
          <p className="font-sans text-[15px] leading-7 tracking-wide text-[#B8C5D6] sm:text-[16px]">
            Research <span className="text-[#009FE3]">·</span> Engineering{" "}
            <span className="text-[#009FE3]">·</span> Evidence
          </p>
        </div>
      </div>

      {/* White paper access form */}
      {selectedPaper && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#02050A]/85 px-4 py-6 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedPaper(null);
              setFormError("");
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="white-paper-form-title"
            className="relative my-auto w-full max-w-[480px] overflow-hidden rounded-2xl border border-[#283746] bg-[#0A1018] shadow-[0_24px_80px_rgba(0,0,0,0.5)]"
          >
            <div className="h-[3px] w-full bg-[#009FE3]" />

            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#009FE3]">
                    STHORAM LABS / RESEARCH
                  </p>

                  <h3
                    id="white-paper-form-title"
                    className="mt-3 text-[28px] font-semibold leading-[1.15] tracking-[-0.035em] text-white sm:text-[32px]"
                  >
                    Access the white paper
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedPaper(null);
                    setFormError("");
                  }}
                  aria-label="Close form"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-[#AAB7C6] transition-colors hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009FE3]"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Selected PDF details */}
              <div className="mt-6 border-y border-white/10 py-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7F91A5]">
                  Selected document
                </p>

                <div className="mt-3 flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#009FE3]/25 bg-[#009FE3]/[0.08] text-[#009FE3]">
                    <FileText size={19} strokeWidth={1.7} />
                  </div>

                  <div>
                    <p className="text-[15px] font-medium leading-6 text-[#F1F5F9]">
                      {selectedPaper.title}
                    </p>

                    <p className="mt-1 text-[12px] text-[#8292A5]">
                      PDF document · {selectedPaper.status}
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-5 text-[13px] leading-6 text-[#AAB7C6]">
                Enter your contact details to continue to the document.
              </p>

              <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="white-paper-name"
                    className="mb-2 block text-[12px] font-medium text-[#DCE4EE]"
                  >
                    Full name <span className="text-[#009FE3]">*</span>
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
                    className="h-12 w-full rounded-lg border border-[#293645] bg-[#070C12] px-4 text-[14px] text-white outline-none placeholder:text-[#647386] hover:border-[#3A4B5E] focus:border-[#009FE3] focus:ring-1 focus:ring-[#009FE3]/30"
                  />
                </div>

                <div>
                  <label
                    htmlFor="white-paper-email"
                    className="mb-2 block text-[12px] font-medium text-[#DCE4EE]"
                  >
                    Work email <span className="text-[#009FE3]">*</span>
                  </label>

                  <input
                    id="white-paper-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="name@company.com"
                    maxLength={254}
                    required
                    className="h-12 w-full rounded-lg border border-[#293645] bg-[#070C12] px-4 text-[14px] text-white outline-none placeholder:text-[#647386] hover:border-[#3A4B5E] focus:border-[#009FE3] focus:ring-1 focus:ring-[#009FE3]/30"
                  />
                </div>

                <div>
                  <label
                    htmlFor="white-paper-phone"
                    className="mb-2 block text-[12px] font-medium text-[#DCE4EE]"
                  >
                    Phone number <span className="text-[#009FE3]">*</span>
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
                    className="h-12 w-full rounded-lg border border-[#293645] bg-[#070C12] px-4 text-[14px] text-white outline-none placeholder:text-[#647386] hover:border-[#3A4B5E] focus:border-[#009FE3] focus:ring-1 focus:ring-[#009FE3]/30"
                  />
                </div>

                <div>
                  <label
                    htmlFor="white-paper-company"
                    className="mb-2 block text-[12px] font-medium text-[#DCE4EE]"
                  >
                    Company / organisation{" "}
                    <span className="font-normal text-[#718096]">
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
                    className="h-12 w-full rounded-lg border border-[#293645] bg-[#070C12] px-4 text-[14px] text-white outline-none placeholder:text-[#647386] hover:border-[#3A4B5E] focus:border-[#009FE3] focus:ring-1 focus:ring-[#009FE3]/30"
                  />
                </div>

                <label className="flex items-start gap-3 pt-1 text-[11px] leading-5 text-[#A0ADBD]">
                  <input
                    type="checkbox"
                    name="privacyConsent"
                    required
                    className="mt-1 h-4 w-4 shrink-0 accent-[#009FE3]"
                  />

                  <span>
                    I consent to the processing of my information as
                    described in the{" "}
                    <a
                      href="/privacy-policy"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#DCE4EE] underline decoration-[#526579] underline-offset-4 hover:text-[#009FE3]"
                    >
                      Privacy Policy
                    </a>
                    .
                  </span>
                </label>

                {formError && (
                  <p role="alert" className="text-sm text-red-400">
                    {formError}
                  </p>
                )}

                <button
                  type="submit"
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#009FE3] px-5 text-[14px] font-semibold text-[#03111A] transition-colors hover:bg-[#26B4ED] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1018]"
                >
                  Continue to PDF
                  <ArrowUpRight size={17} />
                </button>

                <p className="text-center text-[11px] leading-5 text-[#718096]">
                  Your information should be handled in accordance with
                  the company&apos;s Privacy Policy.
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
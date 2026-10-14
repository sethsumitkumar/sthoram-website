"use client";

import { useEffect } from "react";
import Image from "next/image";

const IMG_SRC = "/images/gallery/Awards at Sunrise in a Renewable Landscape.png";
const SECTION_BG = `url("/images/gallery/${encodeURIComponent(
  "Awards at Sunrise in a Renewable Landscape.png"
)}")`;

export default function Certification() {
  // Nav click (e.g. "Certification"): once the page stops scrolling, make sure the section
  // starts exactly under the header, so the previous page never peeks out above it
  useEffect(() => {
    const section = document.getElementById("certification");
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

  return (
    <section
      id="certification"
      style={{ overflowX: "clip" }}
      className="relative isolate flex min-h-[calc(100svh-95px)] w-full scroll-mt-[95px] bg-[#EAF2FB]"
    >
      {/* Extension: a mirrored strip of the image sits just above the section,
          so even if the page stops a few px early the previous page is never visible */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-8 -z-20 h-8"
        style={{
          backgroundColor: "#EAF2FB",
          backgroundImage: SECTION_BG,
          backgroundSize: "cover",
          backgroundPosition: "85% top",
          backgroundRepeat: "no-repeat",
          transform: "scaleY(-1)",
        }}
      />

      {/* Background image */}
      <div className="absolute inset-0 -z-20 overflow-hidden bg-[#EAF2FB]">
        <div className="absolute inset-x-0 bottom-0 h-[62%] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,#000_38%)] [mask-image:linear-gradient(to_bottom,transparent_0%,#000_38%)] lg:inset-0 lg:h-full lg:[-webkit-mask-image:none] lg:[mask-image:none]">
          <Image
            src={IMG_SRC}
            alt="Certification documents displayed in a renewable energy landscape"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[78%_center] sm:object-[75%_center] lg:object-[85%_center]"
          />
        </div>
      </div>

      {/* Desktop: soft left-side fade */}
      <div className="pointer-events-none absolute inset-0 -z-10 hidden bg-gradient-to-r from-white/70 via-white/25 via-[45%] to-transparent lg:block" />

      {/* Left decorative accent */}
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-14 -skew-x-[14deg] bg-gradient-to-b from-white/50 to-white/0 sm:block" />

      {/* Main content */}
      <div className="relative flex w-full items-start px-6 pb-10 pt-12 sm:px-10 sm:pt-16 lg:items-center lg:px-0 lg:pb-0 lg:pl-[7.4%] lg:pt-0">
        <div className="w-full max-w-full">
          {/* Blue accent line */}
          <div className="mb-5 h-[3px] w-[70px] bg-[#2878F0] sm:mb-6 sm:w-[90px] lg:mb-[2vw] lg:w-[4.4vw]" />

          {/* Main heading */}
          <h2 className="font-sans text-[28px] font-semibold leading-[1.2] tracking-[-0.01em] text-[#0F2557] [text-shadow:0_1px_18px_rgba(255,255,255,0.55)] sm:max-w-[85%] sm:text-[38px] lg:max-w-none lg:text-[clamp(32px,2.6vw,56px)] lg:leading-[1.22]">
            <span className="lg:block lg:whitespace-nowrap">
              Witness reports, validations and certifications
            </span>{" "}
            <span className="lg:block lg:whitespace-nowrap">
              from various third parties expected shortly{" "}
              <span className="text-[#2878F0]">as per</span>
            </span>{" "}
            <span className="inline-block whitespace-nowrap text-[#2878F0] lg:block">
              IS 17387 &amp; IS 16046.
            </span>
          </h2>

          {/* Publication status */}
          <p className="mt-6 inline-flex max-w-full items-center gap-3 rounded-2xl bg-white/85 px-4 py-3 shadow-[0_10px_34px_rgba(16,42,85,0.16)] ring-1 ring-white/80 backdrop-blur-md sm:mt-8 sm:rounded-full sm:px-6 sm:py-3.5 lg:mt-[2vw]">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2878F0] opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#2878F0]" />
            </span>

            <span className="font-sans text-[15px] font-bold leading-snug text-[#0F2557] sm:text-[18px] lg:text-[clamp(18px,1.4vw,28px)]">
              The reports and certificates will be published shortly.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Certification() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const getHeader = () =>
      (document.querySelector("header") ||
        document.querySelector("nav")) as HTMLElement | null;

    // 1) Section height = visible screen minus the REAL header height,
    //    so it fits the screen exactly (nothing of the next page shows below)
    const fit = () => {
      const header = getHeader();
      const h = Math.round(header?.getBoundingClientRect().height ?? 95);
      section.style.minHeight = `${document.documentElement.clientHeight - h}px`;
      section.style.scrollMarginTop = `${h}px`;
    };

    fit();
    window.addEventListener("resize", fit);

    let resizeObserver: ResizeObserver | undefined;
    const header = getHeader();
    if (header && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(fit);
      resizeObserver.observe(header);
    }

    // 2) Nav click: once scrolling stops, put the section exactly under the header
    //    (no gap above it, so the previous page never peeks out)
    let armedUntil = 0;
    let timer: number | undefined;

    const headerBottom = () => {
      const el = getHeader();
      if (!el) return 0;
      const bottom = el.getBoundingClientRect().bottom;
      return bottom > 0 ? bottom : 0;
    };

    const onClick = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("header, nav")) armedUntil = Date.now() + 3500;
    };

    const settle = () => {
      if (Date.now() > armedUntil) return;
      const gap = section.getBoundingClientRect().top - headerBottom();
      if (Math.abs(gap) > 0.5 && Math.abs(gap) < 140) {
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
      window.removeEventListener("resize", fit);
      resizeObserver?.disconnect();
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="certification"
      className="relative isolate flex min-h-[calc(100dvh-95px)] w-full scroll-mt-[95px] overflow-hidden bg-[#EAF2FB]"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-[#EAF2FB]">
        <div className="absolute inset-x-0 bottom-0 h-[62%] [mask-image:linear-gradient(to_bottom,transparent_0%,#000_38%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,#000_38%)] lg:inset-0 lg:h-full lg:[mask-image:none] lg:[-webkit-mask-image:none]">
          <Image
            src="/images/gallery/Awards at Sunrise in a Renewable Landscape.png"
            alt="Certification documents displayed in a renewable energy landscape"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[78%_center] sm:object-[75%_center] lg:object-[85%_center]"
          />
        </div>
      </div>

      {/* Desktop background fade */}
      <div className="pointer-events-none absolute inset-0 z-10 hidden bg-gradient-to-r from-white/70 via-white/25 via-[45%] to-transparent lg:block" />

      {/* Left decorative accent */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-14 -skew-x-[14deg] bg-gradient-to-b from-white/50 to-white/0 sm:block" />

      {/* Content */}
      <div className="relative z-20 flex w-full items-start px-6 pb-10 pt-12 sm:px-10 sm:pt-16 lg:items-center lg:px-0 lg:pb-0 lg:pl-[7.4%] lg:pt-0">
        <div className="w-full max-w-full">
          {/* Blue accent line */}
          <div className="mb-5 h-[3px] w-[70px] bg-[#2878F0] sm:mb-6 sm:w-[90px] lg:mb-[2vw] lg:w-[4.4vw]" />

          {/* Main heading */}
          <h1 className="font-sans text-[28px] font-semibold leading-[1.2] tracking-[-0.01em] text-[#0F2557] [text-shadow:0_1px_18px_rgba(255,255,255,0.55)] sm:max-w-[85%] sm:text-[38px] lg:max-w-none lg:text-[clamp(32px,2.6vw,56px)] lg:leading-[1.22]">
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
          </h1>

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
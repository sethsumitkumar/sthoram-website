"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  FlaskConical,
  Image as ImageIcon,
  Landmark,
  Maximize2,
  Settings,
  X,
} from "lucide-react";

const HERO_BG = `url("/images/card/${encodeURIComponent(
  "Futuristic Blue Particle Wave Laboratory (1).png"
)}")`;

const PAGE_SIZE = 4;

type GalleryImage = {
  src: string;
  label: string;
  caption: string;
};

const labCaptions = [
  "Research • Development • Collaboration",
  "Testing • Prototyping • Field Readiness",
  "Teamwork • Precision • Innovation",
  "Technology in Detail",
];

const normalImages: GalleryImage[] = [1, 2, 3, 4].map((n, i) => ({
  src: `/images/gallery/image-0${n}.jpg`,
  label: "STHORAM Labs",
  caption: labCaptions[i],
}));

const mandiImages: GalleryImage[] = Array.from({ length: 14 }, (_, i) => ({
  src: `/images/iit-mandi/iit-${String(i + 1).padStart(2, "0")}.jpg`,
  label: "IIT Mandi",
  caption: "Visit & Engagement",
}));

const highlights = [
  { icon: FlaskConical, top: "Real Research", bottom: "Real Impact" },
  { icon: Settings, top: "Innovation", bottom: "in Action" },
  { icon: BarChart3, top: "From Ideas", bottom: "to Real Solutions" },
];

// Same side margins for the header and the cards
const WRAP =
  "relative mx-auto w-[calc(100%-2.5rem)] sm:w-[calc(100%-4rem)] lg:w-[82%] max-w-[1480px]";

export default function Gallery() {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [activeGallery, setActiveGallery] = useState<"gallery" | "iit-mandi">(
    "gallery"
  );
  const [page, setPage] = useState(0);
  const [mobileActive, setMobileActive] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const activeImages =
    activeGallery === "gallery" ? normalImages : mandiImages;

  const totalPages = Math.ceil(activeImages.length / PAGE_SIZE);
  const pageImages = activeImages.slice(
    page * PAGE_SIZE,
    page * PAGE_SIZE + PAGE_SIZE
  );

  const selectedImage =
    selectedIndex !== null ? activeImages[selectedIndex] : null;

  const closeImage = () => setSelectedIndex(null);

  const showPrevious = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(
      selectedIndex === 0 ? activeImages.length - 1 : selectedIndex - 1
    );
  };

  const showNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(
      selectedIndex === activeImages.length - 1 ? 0 : selectedIndex + 1
    );
  };

  const switchGallery = (key: "gallery" | "iit-mandi") => {
    setActiveGallery(key);
    setPage(0);
    setSelectedIndex(null);
  };

  const prevPage = () => {
    if (totalPages < 2) return;
    setPage((p) => (p === 0 ? totalPages - 1 : p - 1));
  };

  const nextPage = () => {
    if (totalPages < 2) return;
    setPage((p) => (p === totalPages - 1 ? 0 : p + 1));
  };

  // Mobile carousel helpers
  const getStep = () => {
    const element = trackRef.current;
    const first = element?.children[0] as HTMLElement | undefined;
    return first ? first.offsetWidth + 16 : 0;
  };

  const handleTrackScroll = () => {
    const element = trackRef.current;
    const step = getStep();
    if (!element || !step) return;
    setMobileActive(
      Math.min(pageImages.length - 1, Math.round(element.scrollLeft / step))
    );
  };

  const goToCard = (index: number) => {
    trackRef.current?.scrollTo({ left: index * getStep(), behavior: "smooth" });
  };

  // When the page or gallery changes, go back to the first card
  useEffect(() => {
    setMobileActive(0);
    trackRef.current?.scrollTo({ left: 0, behavior: "auto" });
  }, [page, activeGallery]);

  // Lightbox: keyboard + body scroll lock
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeImage();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex, activeImages.length]);

  // Nav click (e.g. "Gallery"): once the page stops scrolling, make sure the section
  // starts exactly under the header, so the previous page never peeks out above it
  useEffect(() => {
    const section = document.getElementById("gallery");
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

  const pillBase =
    "inline-flex items-center justify-center gap-2.5 rounded-full border px-4 py-3.5 font-sans text-[15px] font-semibold outline-none transition-all duration-300 sm:px-7 sm:py-3.5 lg:px-[1.9vw] lg:py-[0.95vw] lg:text-[clamp(14px,0.95vw,17px)] xl:px-7 xl:py-3.5";
  const pillActive =
    "border-[#2FA0F5]/60 bg-gradient-to-b from-[#1FB0FF] to-[#0A6FE0] text-white shadow-[0_8px_30px_rgba(23,136,232,0.45)]";
  const pillIdle =
    "border-white/30 bg-[#04101F]/60 text-white/90 hover:border-[#2FA0F5]/60 hover:text-white";

  return (
    <section
      id="gallery"
      style={{ overflowX: "clip" }}
      className="relative scroll-mt-[90px] bg-[#04101F] pb-12 pt-10 sm:pt-14 sm:pb-16 lg:pb-14"
    >
      {/* Very soft particle-wave glow across the whole section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage: HERO_BG,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, #000 30%, #000 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, #000 30%, #000 100%)",
        }}
      />

      {/* Header background image (fades at the bottom) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px] sm:h-[380px] lg:h-[max(19vw,320px)]"
        style={{
          backgroundImage: HERO_BG,
          backgroundSize: "cover",
          backgroundPosition: "62% 30%",
          backgroundRepeat: "no-repeat",
          WebkitMaskImage:
            "linear-gradient(to bottom, #000 0%, #000 78%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, #000 0%, #000 78%, transparent 100%)",
        }}
      />

      {/* Mobile: top-to-bottom dark fade so the text stays readable */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-gradient-to-b from-[#04101F]/75 via-[#04101F]/55 via-[55%] to-transparent sm:hidden"
      />

      {/* Tablet / desktop: left-to-right dark fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 hidden h-[380px] bg-gradient-to-r from-[#04101F]/70 via-[#04101F]/25 via-[50%] to-transparent sm:block lg:h-[max(19vw,320px)]"
      />

      {/* ===== Header ===== */}
      <div className={WRAP}>
        <div className="grid items-start gap-6 lg:grid-cols-[1fr_43%] lg:gap-6">
          <div>
            <div className="mb-3 flex items-center gap-3 lg:mb-[0.6vw]">
              <span className="font-sans text-[13px] font-bold uppercase tracking-[0.24em] text-[#2FA0F5] sm:text-[14px]">
                Gallery
              </span>
              <span className="h-px w-14 bg-gradient-to-r from-[#2FA0F5] to-transparent" />
            </div>

            <h2 className="font-sans text-[40px] font-bold leading-[1.08] tracking-[-0.03em] text-white sm:text-[50px] lg:whitespace-nowrap lg:text-[clamp(34px,3.25vw,62px)]">
              From the lab to the{" "}
              <span className="bg-gradient-to-r from-[#1FB0FF] to-[#0A8CF0] bg-clip-text text-transparent">
                field.
              </span>
            </h2>

            <p className="mt-3 max-w-[620px] font-sans text-[16.5px] leading-[1.5] text-white/90 sm:text-[19px] sm:leading-[1.3] lg:mt-[0.8vw] lg:max-w-[40vw] lg:text-[clamp(16px,1.2vw,22px)]">
              A look at STHORAM Labs, our technology, and key moments from our
              innovation journey.
            </p>

            {/* Gallery selector */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center lg:mt-[1.6vw]">
              <button
                type="button"
                onClick={() => switchGallery("gallery")}
                className={`${pillBase} ${
                  activeGallery === "gallery" ? pillActive : pillIdle
                }`}
              >
                <ImageIcon size={20} strokeWidth={1.7} aria-hidden="true" />
                Gallery
              </button>

              <button
                type="button"
                onClick={() => switchGallery("iit-mandi")}
                className={`${pillBase} ${
                  activeGallery === "iit-mandi" ? pillActive : pillIdle
                }`}
              >
                <Landmark size={20} strokeWidth={1.7} aria-hidden="true" />
                IIT Mandi
              </button>
            </div>
          </div>

          {/* Highlights glass card */}
          <div className="grid grid-cols-3 rounded-2xl border border-white/20 bg-[#0A1B33]/70 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-[3px] sm:bg-[#0A1B33]/55 sm:py-5 lg:mt-[1.8vw]">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.top}
                  className={`px-3 sm:px-5 lg:px-[1.2vw] ${
                    index > 0 ? "border-l border-white/20" : ""
                  }`}
                >
                  <Icon
                    size={38}
                    strokeWidth={1.4}
                    className="h-[30px] w-[30px] text-[#2FA0F5] sm:h-[38px] sm:w-[38px]"
                    aria-hidden="true"
                  />
                  <p className="mt-2 font-sans text-[13px] font-bold leading-tight text-white sm:mt-2.5 sm:text-[14px] lg:text-[clamp(12.5px,0.92vw,16px)]">
                    {item.top}
                  </p>
                  <p className="mt-0.5 font-sans text-[12.5px] leading-tight text-white/80 sm:text-[14px] lg:text-[clamp(12.5px,0.92vw,16px)]">
                    {item.bottom}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===== Sub heading + pager + grid ===== */}
      <div className={`${WRAP} mt-9 lg:mt-[2.9vw]`}>
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="font-sans text-[12.5px] font-bold uppercase tracking-[0.2em] text-[#2FA0F5] lg:text-[clamp(12px,0.85vw,15px)]">
              {activeGallery === "gallery" ? "STHORAM Labs" : "IIT Mandi"}
            </p>
            <h3 className="mt-1 font-sans text-[27px] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-[32px] lg:text-[clamp(28px,2.15vw,42px)]">
              {activeGallery === "gallery"
                ? "Innovation in focus."
                : "IIT Mandi visit & engagement."}
            </h3>
          </div>

          <div className="flex shrink-0 items-center gap-2.5 sm:gap-4">
            <button
              type="button"
              onClick={prevPage}
              aria-label="Previous images"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2FA0F5]/50 bg-[#04101F]/60 text-[#2FA0F5] outline-none transition hover:bg-[#2FA0F5]/15 sm:h-11 sm:w-11"
            >
              <ArrowLeft size={18} strokeWidth={1.8} />
            </button>
            <button
              type="button"
              onClick={nextPage}
              aria-label="Next images"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-[#04101F]/60 text-white outline-none transition hover:border-[#2FA0F5]/60 hover:bg-[#2FA0F5]/15 sm:h-11 sm:w-11"
            >
              <ArrowRight size={18} strokeWidth={1.8} />
            </button>

            <div className="hidden w-[92px] border-b border-white/15 pb-1 text-center sm:block">
              <span className="font-sans text-[14px] text-[#2FA0F5]">
                {activeImages.length}{" "}
                {activeImages.length === 1 ? "image" : "images"}
              </span>
              <span className="mx-auto mt-1 block h-[2px] w-12 bg-[#2FA0F5]" />
            </div>
          </div>
        </div>

        {/* Cards: swipe carousel on phones, grid from sm */}
        <div
          ref={trackRef}
          onScroll={handleTrackScroll}
          role="region"
          aria-label="Gallery images"
          className="-mx-5 mt-5 flex snap-x snap-mandatory scroll-px-5 items-start gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:mt-4 sm:grid sm:snap-none sm:grid-cols-2 sm:items-stretch sm:overflow-visible sm:px-0 sm:pb-0 lg:gap-[18px]"
        >
          {pageImages.map((image, i) => {
            const index = page * PAGE_SIZE + i;
            return (
              <button
                key={image.src}
                type="button"
                onClick={() => setSelectedIndex(index)}
                aria-label={`Open ${image.label} image ${index + 1}`}
                className="group relative flex w-[86%] shrink-0 snap-start flex-col overflow-hidden rounded-[22px] border border-[#5BB8FF]/35 bg-[#071426] text-left outline-none shadow-[0_0_0_1px_rgba(47,160,245,0.08),0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-[#5BB8FF]/90 focus-visible:ring-2 focus-visible:ring-[#2FA0F5] sm:block sm:aspect-[16/9] sm:w-auto sm:shrink sm:rounded-2xl sm:border-[#5BB8FF]/45 sm:bg-[#0A111A] sm:hover:-translate-y-1 sm:hover:shadow-[0_0_40px_rgba(23,136,232,0.35)] lg:aspect-[2.2/1] xl:aspect-[3/1]"
              >
                {/* Photo (mobile: top block, sm+: fills the whole card) */}
                <div className="relative aspect-[4/3.4] w-full overflow-hidden sm:absolute sm:inset-0 sm:aspect-auto">
                  {/* width/height here only tell the browser the image ratio.
                      The real size still comes from the parent div (h-full w-full + object-cover). */}
                  <Image
                    src={image.src}
                    alt={`${image.label} image ${index + 1}`}
                    width={1600}
                    height={900}
                    sizes="(max-width: 640px) 86vw, 50vw"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                  />

                  {/* Gradient: soft blend into the info panel on mobile,
                      stronger bottom fade for the overlay text on sm+ */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071426]/70 via-transparent via-45% to-[#04101F]/35 sm:from-[#04101F]/90 sm:via-[#04101F]/10 sm:via-50% sm:to-transparent" />
                </div>

                {/* Number badge */}
                <div className="absolute left-3 top-3 flex items-baseline rounded-full border border-[#2FA0F5]/60 bg-[#06193A]/85 px-3 py-1 backdrop-blur-md sm:left-4 sm:top-4 sm:rounded-lg sm:px-3 sm:py-1.5">
                  <span className="font-sans text-[13px] font-bold tracking-wide text-white sm:text-[15px]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="ml-1 font-sans text-[11px] font-medium text-white/50 sm:hidden">
                    / {String(activeImages.length).padStart(2, "0")}
                  </span>
                </div>

                {/* Expand icon (always visible on mobile, hover on sm+) */}
                <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-[#04101F]/65 text-white backdrop-blur-md transition-opacity duration-300 sm:right-4 sm:top-4 sm:h-10 sm:w-10 sm:opacity-0 sm:group-hover:opacity-100">
                  <Maximize2 size={16} strokeWidth={1.8} />
                </div>

                {/* Label + caption (mobile: separate panel, sm+: overlay) */}
                <div className="relative flex items-center justify-between gap-3 border-t border-[#2FA0F5]/25 bg-gradient-to-b from-[#0B1E38] to-[#071426] px-4 py-3.5 sm:absolute sm:inset-x-0 sm:bottom-0 sm:border-t-0 sm:bg-none sm:p-4 xl:px-5 xl:py-3.5">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="h-9 w-[3px] shrink-0 rounded-full bg-gradient-to-b from-[#1FB0FF] to-[#0A6FE0] sm:w-[4px]" />
                    <div className="min-w-0">
                      <p className="truncate font-sans text-[14.5px] font-bold uppercase leading-tight tracking-[0.06em] text-white sm:text-[18px] sm:tracking-[0.04em] lg:text-[clamp(15px,1.15vw,20px)]">
                        {image.label}
                      </p>
                      <p className="mt-1 font-sans text-[12.5px] leading-snug text-white/70 sm:mt-0.5 sm:text-[14px] sm:text-white/90 lg:text-[clamp(13px,0.92vw,16px)]">
                        {image.caption}
                      </p>
                    </div>
                  </div>

                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#2FA0F5]/70 bg-[#04101F]/55 text-[#2FA0F5] backdrop-blur-md transition-all duration-300 group-hover:bg-[#1788E8] group-hover:text-white sm:h-11 sm:w-11">
                    <ArrowUpRight size={19} strokeWidth={1.8} />
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Mobile dots: which card of this page is showing */}
        {pageImages.length > 1 && (
          <div
            className="mt-2 flex items-center justify-center gap-2 sm:hidden"
            role="tablist"
            aria-label="Choose image"
          >
            {pageImages.map((image, i) => (
              <button
                key={image.src}
                type="button"
                role="tab"
                aria-selected={mobileActive === i}
                aria-label={`Show image ${i + 1}`}
                onClick={() => goToCard(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  mobileActive === i
                    ? "w-7 bg-[#2FA0F5] shadow-[0_0_12px_rgba(47,160,245,0.6)]"
                    : "w-2 bg-white/30"
                }`}
              />
            ))}
          </div>
        )}

        {/* Desktop page dots (only when more than one page) */}
        {totalPages > 1 && (
          <div className="mt-6 hidden items-center justify-center gap-2 sm:flex">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to page ${i + 1}`}
                onClick={() => setPage(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  page === i
                    ? "w-7 bg-[#2FA0F5] shadow-[0_0_12px_rgba(47,160,245,0.6)]"
                    : "w-2 bg-white/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ===== Fullscreen viewer ===== */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020408]/95 p-4 backdrop-blur-xl sm:p-8"
          onClick={closeImage}
        >
          <button
            type="button"
            onClick={closeImage}
            aria-label="Close image"
            className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/85 backdrop-blur-md transition-all hover:border-[#2FA0F5]/50 hover:bg-white/10 hover:text-white"
          >
            <X size={20} strokeWidth={1.8} />
          </button>

          {activeImages.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showPrevious();
              }}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/85 backdrop-blur-md transition-all hover:border-[#2FA0F5]/50 hover:bg-[#2FA0F5]/10 sm:left-7 sm:h-12 sm:w-12"
            >
              <ChevronLeft size={24} strokeWidth={1.8} />
            </button>
          )}

          <div
            className="relative h-[70vh] w-full max-w-[1200px] sm:h-[78vh]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={selectedImage.src}
              alt={selectedImage.label}
              fill
              priority
              sizes="100vw"
              className="object-contain"
            />
          </div>

          {activeImages.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              aria-label="Next image"
              className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/85 backdrop-blur-md transition-all hover:border-[#2FA0F5]/50 hover:bg-[#2FA0F5]/10 sm:right-7 sm:h-12 sm:w-12"
            >
              <ChevronRight size={24} strokeWidth={1.8} />
            </button>
          )}

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center sm:bottom-7">
            <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.22em] text-[#2FA0F5]">
              {selectedImage.label}
            </p>
            <p className="mt-1 font-sans text-[12px] text-white/65">
              {selectedIndex !== null ? selectedIndex + 1 : 0} /{" "}
              {activeImages.length}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

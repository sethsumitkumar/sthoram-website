
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";

const galleryImages = [
  "/images/gallery/image-01.jpg",
  "/images/gallery/image-02.jpg",
  "/images/gallery/image-03.jpg",
  "/images/gallery/image-04.jpg",
];

const iitMandiImages = [
  "/images/iit-mandi/iit-01.jpg",
  "/images/iit-mandi/iit-02.jpg",
  "/images/iit-mandi/iit-03.jpg",
  "/images/iit-mandi/iit-04.jpg",
  "/images/iit-mandi/iit-05.jpg",
  "/images/iit-mandi/iit-06.jpg",
  "/images/iit-mandi/iit-07.jpg",
  "/images/iit-mandi/iit-08.jpg",
  "/images/iit-mandi/iit-09.jpg",
  "/images/iit-mandi/iit-10.jpg",
  "/images/iit-mandi/iit-11.jpg",
  "/images/iit-mandi/iit-12.jpg",
  "/images/iit-mandi/iit-13.jpg",
  "/images/iit-mandi/iit-14.jpg",
];

type GalleryImage = {
  src: string;
  label: string;
};

const normalImages: GalleryImage[] = galleryImages.map((src) => ({
  src,
  label: "STHORAM Labs",
}));

const mandiImages: GalleryImage[] = iitMandiImages.map((src) => ({
  src,
  label: "IIT Mandi",
}));

export default function Gallery() {
  const [activeGallery, setActiveGallery] = useState<"gallery" | "iit-mandi">(
    "gallery"
  );

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const activeImages =
    activeGallery === "gallery" ? normalImages : mandiImages;

  const selectedImage =
    selectedIndex !== null ? activeImages[selectedIndex] : null;

  const closeImage = () => {
    setSelectedIndex(null);
  };

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
  }, [selectedIndex, activeImages.length]);

  return (
    <section
      id="gallery"
      className="relative scroll-mt-[90px] overflow-hidden bg-[#05080F] py-24 sm:py-28 lg:py-32"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[35%] h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-[#009FE3]/[0.06] blur-[160px]" />

        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-10">
        {/* Centered Heading and Larger Description */}
        <div className="mx-auto max-w-[1100px] text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#009FE3]" />

            <span className="font-sans text-[15px] font-bold uppercase tracking-[0.22em] text-[#009FE3] sm:text-[16px]">
              Gallery
            </span>

            <span className="h-px w-10 bg-[#009FE3]" />
          </div>

          <h2 className="font-sans text-[42px] font-bold leading-[1.12] tracking-[-0.025em] text-[#009FE3] sm:text-[54px] lg:text-[64px]">
            From the lab to the field.
          </h2>

          <p className="mx-auto mt-7 max-w-[900px] font-sans text-[20px] leading-[1.8] text-[#E2E8F0] sm:text-[22px] sm:leading-[1.8] lg:text-[24px]">
            A look at STHORAM Labs, our technology, and key moments from our
            innovation journey.
          </p>
        </div>

        {/* Gallery Selector */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              setActiveGallery("gallery");
              setSelectedIndex(null);
            }}
            className={`rounded-full border px-6 py-3 font-sans text-[14px] font-semibold transition-all duration-300 ${
              activeGallery === "gallery"
                ? "border-[#009FE3]/70 bg-[#009FE3]/15 text-[#42BFFF] shadow-[0_0_25px_rgba(0,159,227,0.12)]"
                : "border-white/15 bg-white/[0.02] text-white/70 hover:border-[#009FE3]/50 hover:text-white"
            }`}
          >
            Gallery
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveGallery("iit-mandi");
              setSelectedIndex(null);
            }}
            className={`rounded-full border px-6 py-3 font-sans text-[14px] font-semibold transition-all duration-300 ${
              activeGallery === "iit-mandi"
                ? "border-[#009FE3]/70 bg-[#009FE3]/15 text-[#42BFFF] shadow-[0_0_25px_rgba(0,159,227,0.12)]"
                : "border-white/15 bg-white/[0.02] text-white/70 hover:border-[#009FE3]/50 hover:text-white"
            }`}
          >
            IIT Mandi
          </button>
        </div>

        {/* Gallery Subheading */}
        <div className="mt-12 flex items-end justify-between gap-4">
          <div>
            <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.22em] text-[#009FE3]">
              {activeGallery === "gallery" ? "STHORAM Labs" : "IIT Mandi"}
            </p>

            <h3 className="mt-2 font-sans text-[26px] font-semibold tracking-[-0.02em] text-white sm:text-[30px]">
              {activeGallery === "gallery"
                ? "Innovation in focus."
                : "IIT Mandi visit & engagement."}
            </h3>
          </div>

          <span className="hidden font-sans text-[13px] text-white/60 sm:block">
            {activeImages.length}{" "}
            {activeImages.length === 1 ? "image" : "images"}
          </span>
        </div>

        {/* Image Grid: Two Columns on Desktop */}
        <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {activeImages.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setSelectedIndex(index)}
              aria-label={`Open ${image.label} image ${index + 1}`}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0A111A] text-left outline-none transition-all duration-500 hover:-translate-y-1 hover:border-[#009FE3]/50 hover:shadow-[0_25px_70px_rgba(0,0,0,0.35)] focus-visible:ring-2 focus-visible:ring-[#009FE3]"
            >
              <Image
                src={image.src}
                alt={`${image.label} image ${index + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
              />

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#05080F]/80 via-transparent to-transparent opacity-80" />

              {/* Image Number */}
              <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-[#05080F]/65 px-3 py-1.5 backdrop-blur-md">
                <span className="font-sans text-[12px] font-medium tracking-[0.16em] text-white/85">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Open Icon */}
              <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#05080F]/65 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100">
                <Maximize2 size={17} strokeWidth={1.8} />
              </div>

              {/* Larger Image Label */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-sans text-[16px] font-bold uppercase tracking-[0.14em] text-white sm:text-[18px]">
                    {image.label}
                  </span>

                  <span className="h-px w-8 shrink-0 bg-[#009FE3] transition-all duration-300 group-hover:w-14" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen Image Viewer */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020408]/95 p-4 backdrop-blur-xl sm:p-8"
          onClick={closeImage}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={closeImage}
            aria-label="Close image"
            className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/85 backdrop-blur-md transition-all hover:border-[#009FE3]/50 hover:bg-white/10 hover:text-white"
          >
            <X size={20} strokeWidth={1.8} />
          </button>

          {/* Previous Button */}
          {activeImages.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showPrevious();
              }}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/85 backdrop-blur-md transition-all hover:border-[#009FE3]/50 hover:bg-[#009FE3]/10 sm:left-7"
            >
              <ChevronLeft size={24} strokeWidth={1.8} />
            </button>
          )}

          {/* Selected Image */}
          <div
            className="relative h-[78vh] w-full max-w-[1200px]"
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

          {/* Next Button */}
          {activeImages.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              aria-label="Next image"
              className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/85 backdrop-blur-md transition-all hover:border-[#009FE3]/50 hover:bg-[#009FE3]/10 sm:right-7"
            >
              <ChevronRight size={24} strokeWidth={1.8} />
            </button>
          )}

          {/* Image Information */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center sm:bottom-7">
            <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.22em] text-[#009FE3]">
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

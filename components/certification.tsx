
"use client";

export default function Certification() {
  return (
    <section
      id="certification"
      className="relative scroll-mt-[90px] overflow-hidden bg-[#05080F] py-24 sm:py-28 lg:py-32"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[15%] top-[25%] h-[450px] w-[450px] rounded-full bg-[#009FE3]/[0.06] blur-[140px]" />

        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="max-w-[1200px]">
          {/* Two-line Heading */}
          <h2
            className="max-w-[1150px] font-sans text-[30px] font-bold leading-[1.2] tracking-[-0.025em] text-[#009FE3] sm:text-[38px] lg:text-[48px]"
          >
            Witness reports, validations and certifications
            <br className="hidden lg:block" />{" "}
            from various third parties expected shortly as per IS&nbsp;17387
            &amp; IS&nbsp;16046.
          </h2>

          {/* Supporting Text */}
          <p className="mt-6 font-sans text-[16px] leading-7 text-[#8290A5] sm:text-[18px]">
            The reports and certificates will be published shortly.
          </p>
        </div>
      </div>
    </section>
  );
}

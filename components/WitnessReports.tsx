"use client";

export default function WitnessReports() {
  return (
    <section
      id="witness-reports"
      className="relative overflow-hidden bg-[#05080F] py-24 sm:py-28 lg:py-32"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[15%] top-[25%] h-[450px] w-[450px] rounded-full bg-[#087F73]/[0.05] blur-[140px]" />

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

      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-10">
        {/* Heading */}
        <div className="max-w-[760px]">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-[#4DE7E5]" />

            <span className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-[#65D8D5]">
              Witness Reports
            </span>
          </div>

          <h2 className="font-sans text-[38px] font-semibold leading-[1.1] tracking-[-0.025em] text-white sm:text-[48px] lg:text-[56px]">
            Independent validation.
          </h2>

          <p className="mt-5 max-w-[690px] font-sans text-[16px] leading-7 text-[#8290A5]">
            Independent witness documentation and validation of our technology
            and prototype demonstrations.
          </p>
        </div>

        {/* Report card */}
        <div className="mt-14 overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0A111A]/80">
          <div className="p-7 sm:p-9 lg:p-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-[760px]">
                <div className="flex items-center gap-3">
                  <span className="rounded-full border border-[#4DE7E5]/20 bg-[#4DE7E5]/[0.06] px-3 py-1.5 font-sans text-[10px] font-medium uppercase tracking-[0.16em] text-[#65D8D5]">
                    Witnessed Prototype
                  </span>
                </div>

                <h3 className="mt-5 font-sans text-[24px] font-semibold tracking-[-0.02em] text-white sm:text-[28px]">
                  NISE witnessed the prototype
                </h3>

                <p className="mt-4 font-sans text-[15px] leading-7 text-[#8290A5]">
                  The prototype was witnessed by NISE. The certificate will be
                  added shortly.
                </p>

                <p className="mt-4 font-sans text-[12px] uppercase tracking-[0.16em] text-white/35">
                  Date to be added
                </p>
              </div>

              <div className="shrink-0">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#4DE7E5]/20 bg-[#4DE7E5]/[0.06]">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 3L19 6V11C19 15.5 16.1 19.3 12 21C7.9 19.3 5 15.5 5 11V6L12 3Z"
                      stroke="#4DE7E5"
                      strokeWidth="1.6"
                    />
                    <path
                      d="M9 12L11 14L15 10"
                      stroke="#4DE7E5"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/[0.06] px-7 py-4 sm:px-9 lg:px-10">
            <p className="font-sans text-[11px] text-white/30">
              Certificate documentation will be made available shortly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
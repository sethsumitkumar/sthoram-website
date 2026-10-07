"use client";

const navItems = [
  { label: "Projects", id: "projects" },
  { label: "Patents", id: "patents" },
  { label: "Witness Reports", id: "witness-reports" },
  { label: "White Papers", id: "white-papers" },
  { label: "Gallery", id: "gallery" },
  { label: "News", id: "news" },
  { label: "Team", id: "team" },
];

export default function Navbar() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#05080F]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[74px] max-w-[1280px] items-center justify-between px-6 lg:px-10">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-left"
        >
          <div className="font-sans text-[16px] font-bold tracking-[0.12em] text-white">
            STHORAM<span className="text-[#4DE7E5]">◆</span>LABS
          </div>

          <div className="mt-0.5 font-sans text-[8px] font-medium tracking-[0.28em] text-white/50">
            DEEP TECH INNOVATIONS
          </div>
        </button>

        {/* Navigation */}
        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="font-sans text-[14px] font-normal text-white/65 transition-colors duration-200 hover:text-white"
            >
              {item.label}
            </button>
          ))}

          <button
            onClick={() => scrollToSection("partner")}
            className="rounded-full border border-[#4DE7E5]/70 px-5 py-2.5 font-sans text-[14px] font-medium text-[#8DEDED] transition-all duration-200 hover:bg-[#4DE7E5]/10"
          >
            Partner With Us
          </button>
        </nav>
      </div>
    </header>
  );
}
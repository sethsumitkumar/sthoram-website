
"use client";

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
  partner: ["partner"],
};

export default function Navbar() {
  const scrollToSection = (id: string) => {
    const ids = sectionAliases[id] ?? [id];

    const section = ids
      .map((sectionId) => document.getElementById(sectionId))
      .find((element) => element !== null);

    if (!section) {
      console.error(
        `Navbar: No section found for "${id}". Add the matching ID to its component.`
      );
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
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#05080F]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[74px] max-w-[1280px] items-center justify-between px-6 lg:px-10">
        {/* Logo */}
        <button
          type="button"
          onClick={scrollToTop}
          className="flex shrink-0 items-center"
          aria-label="Scroll to top"
        >
          <img
            src="/images/sthoram-logo.png"
            alt="STHORAM Labs"
            className="block h-auto w-[205px]"
          />
        </button>

        {/* Navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-7 lg:flex"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className="whitespace-nowrap font-sans text-[14px] font-medium text-white/65 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4DE7E5]"
            >
              {item.label}
            </button>
          ))}

          <button
            type="button"
            onClick={() => scrollToSection("partner")}
            className="whitespace-nowrap rounded-full border border-[#4DE7E5]/70 px-5 py-2.5 font-sans text-[14px] font-medium text-[#8DEDED] transition-all duration-200 hover:bg-[#4DE7E5]/10"
          >
            Partner With Us
          </button>
        </nav>
      </div>
    </header>
  );
}

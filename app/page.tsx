import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Project from "@/components/project";
import Patents from "@/components/Patents";
import WitnessReports from "@/components/WitnessReports";
import Gallery from "@/components/Gallery";
import WhitePapers from "@/components/WhitePapers";
import News from "@/components/News";
import Team from "@/components/Team";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#05080F] text-white">
      <Navbar />

      <Hero />

      <Project />

      <Patents />

      <WitnessReports />

      <Gallery />

      <WhitePapers />

      <News />

      <Team />

      <Footer />
    </main>
  );
}
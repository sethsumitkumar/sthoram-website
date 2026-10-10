import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Project from "@/components/project";
import Patents from "@/components/Patents";
import Certification from "@/components/certification";
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
      <Certification />
      <Gallery />
      <WhitePapers />
      <News />
      <Team />
      <Footer />
    </main>
  );
}
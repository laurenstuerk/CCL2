// src/pages/HomePage.jsx
import LandingSection from "../../features/home/components/LandingSection";
import AboutSection from "../../features/home/components/AboutSection";
import HighlightsSection from "../../features/home/components/HighlightsSection";
import FeaturesSection from "../../features/home/components/FeaturesSection";
import TechStackSection from "../../features/home/components/TechStackSection";


export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center w-full">
      <LandingSection />
      <AboutSection />
      <HighlightsSection />
      <FeaturesSection />
      <TechStackSection />
    </main>
  );
}

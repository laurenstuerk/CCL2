// src/pages/HomePage.jsx
import LandingSection from "../../features/home/components/LandingSection";
import FeaturedGamesSection from "../../features/home/components/FeaturedGamesSection";
import CorePillarsSection from "@/features/home/components/CorePillarsSection";
import SocialProofSection from "@/features/home/components/SocialProofSection";
import FinalCTASection from "@/features/home/components/FinalCTASection";
import { Helmet } from 'react-helmet-async';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Ripground - Play Browser Games</title>
        <meta name="description" content="Ripground is your destination for playing and discovering browser games. Join our community and start gaming today!" />
        <link rel="canonical" href="https://ripground.win/" />
      </Helmet>
      <main className="flex flex-col items-center justify-center w-full">

        <LandingSection />
        <FeaturedGamesSection />
        <CorePillarsSection />
        <SocialProofSection />
        <FinalCTASection />
      </main>
    </>
  );
}

// frontend/src/pages/user/dashboard/components/FeaturedGamesCarousel.jsx

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Info, Star, ChevronLeft, ChevronRight } from "lucide-react";

// The StarRating component is also needed here
function StarRating({ rating }) { /* ... same StarRating component code ... */ }

export default function FeaturedGamesCarousel({ games }) {
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);

  // Carousel timer effect is now self-contained in this component
  useEffect(() => {
    if (games.length > 1) {
      const interval = setInterval(() => {
        setCurrentFeaturedIndex(prev => (prev + 1) % games.length);
      }, 7000);
      return () => clearInterval(interval);
    }
  }, [games.length]);

  const currentFeaturedGame = games[currentFeaturedIndex];

  const nextFeatured = () => games.length > 0 && setCurrentFeaturedIndex(p => (p + 1) % games.length);
  const prevFeatured = () => games.length > 0 && setCurrentFeaturedIndex(p => (p - 1 + games.length) % games.length);

  if (!currentFeaturedGame) {
    return null; // Don't render anything if there are no featured games
  }

  return (
    <div className="relative h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `url(${currentFeaturedGame.main_image_url})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl">
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 mb-4 text-sm">FEATURED GAME</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">{currentFeaturedGame.title}</h1>
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 border-purple-500/30 mb-4">{currentFeaturedGame.genre}</Badge>
            <div className="mb-6"><StarRating rating={currentFeaturedGame.rating} /></div>
            <p className="text-xl text-neutral-300 mb-8 leading-relaxed">{currentFeaturedGame.description}</p>
            <div className="flex gap-4">
              <Link to={currentFeaturedGame.play_url || "#"}><Button size="lg" className="bg-blue-600 hover:bg-blue-700"><Play className="w-5 h-5 mr-2" /> Play Now</Button></Link>
              <Link to={`/games/${currentFeaturedGame.slug}`}><Button size="lg" variant="outline" className="border-neutral-600 hover:border-neutral-500"><Info className="w-5 h-5 mr-2" /> Learn More</Button></Link>
            </div>
          </div>
        </div>
      </div>

      {games.length > 1 && (
        <>
          <div className="absolute bottom-6 right-6 flex gap-2"><Button size="sm" variant="outline" onClick={prevFeatured} aria-label="Previous featured game"><ChevronLeft /></Button><Button size="sm" variant="outline" onClick={nextFeatured} aria-label="Next featured game"><ChevronRight /></Button></div>
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
            {games.map((_, index) => (
              <button key={index} aria-label={`Go to featured game ${index + 1}`} className={`w-3 h-3 ... ${index === currentFeaturedIndex ? "bg-blue-500 rounded-full" : "bg-neutral-600 rounded-full hover:bg-neutral-500"}`} onClick={() => setCurrentFeaturedIndex(index)} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
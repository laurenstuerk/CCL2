// src/features/home/components/FeaturedGamesSection.jsx

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getAllGames } from '@/services/gameApi';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

// A reusable GameCard component with responsive width
function FeaturedGameCard({ game }) {
  return (
    // The classes here make the card full-width on mobile, and a fixed width on larger screens.
    <Link 
      to={`/games/${game.slug}`} 
      className="relative aspect-[16/9] w-full md:w-80 lg:w-96 flex-shrink-0 rounded-lg overflow-hidden group shadow-lg"
    >
      <img 
        src={game.main_image_url} 
        alt={game.title} 
        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
      />
      {/* Overlay that appears on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content that appears on hover */}
      <div className="absolute bottom-0 left-0 p-6 w-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        <h3 className="text-2xl font-bold text-white tracking-tight">{game.title}</h3>
        <p className="text-neutral-300 text-sm mt-1">{game.genre}</p>
        <Button size="sm" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold">
          <Play className="w-4 h-4 mr-2" />
          Play Now
        </Button>
      </div>
    </Link>
  );
}

// A Skeleton component with matching responsive classes
function SkeletonCard() {
    return <div className="aspect-[16/9] w-full md:w-80 lg:w-96 flex-shrink-0 rounded-lg bg-neutral-900 animate-pulse"></div>;
}


export default function FeaturedGamesSection() {
  const { data: games, isLoading, isError } = useQuery({
    queryKey: ['games'],
    queryFn: getAllGames,
  });

  const featuredGames = games?.filter(game => game.featured) || [];

  return (
    <section className="bg-black py-20 md:py-28" role="region" aria-labelledby="featured-games-heading">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 id="featured-games-heading" className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
            Handpicked for Play
          </h2>
          <p className="mt-4 text-lg text-neutral-400">
            Explore our curated selection of featured games, crafted with passion and built for performance.
          </p>
        </div>

        {/* --- RESPONSIVE CONTAINER --- */}
        <div className="mt-12">
          <div 
            className="
              grid grid-cols-1 gap-8 
              md:flex md:gap-8 md:overflow-x-auto md:pb-4
            "
            // Hides the scrollbar for a cleaner look
            style={{ scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}
          >
            {/* Conditional Rendering for Loading/Error/Data */}
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => <SkeletonCard key={index} />)
            ) : isError ? (
              <p className="text-red-500">Could not load featured games.</p>
            ) : (
              featuredGames.map(game => <FeaturedGameCard key={game.id} game={game} />)
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

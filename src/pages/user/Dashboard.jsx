// frontend/src/pages/user/Dashboard.jsx

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllGames } from "@/services/gameApi";
import ErrorPage from "@/pages/shared/ErrorPage";
import { Helmet } from 'react-helmet-async';

// Import our new components
import FeaturedGamesCarousel from "./components/FeaturedGamesCarousel";
import GameLibrary from "./components/GameLibrary";

export default function Dashboard() {
  const { data: games, isLoading, isError, error } = useQuery({
    queryKey: ['games'],
    queryFn: getAllGames,
  });

  const featuredGames = useMemo(() => games?.filter(game => game.featured) || [], [games]);
  const regularGames = useMemo(() => games?.filter(game => !game.featured) || [], [games]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl animate-pulse">Loading Awesome Games...</p>
      </div>
    );
  }

  if (isError) {
    return <ErrorPage errorMessage="Could Not Load Games" errorDescription={error.message} />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Helmet>
        <title>Dashboard - Ripground</title>
        <meta name="description" content="Your personal game library and featured games on Ripground." />
      </Helmet>
      {/* Conditionally render the carousel only if there are featured games */}
      {featuredGames.length > 0 && <FeaturedGamesCarousel games={featuredGames} />}
      {games.length > 0 && <GameLibrary games={games} />}
    </div>
  );
}
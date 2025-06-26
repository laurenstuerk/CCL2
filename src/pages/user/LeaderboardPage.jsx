// src/pages/user/LeaderboardPage.jsx

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trophy, Gamepad2, Globe } from "lucide-react";
import ErrorPage from "@/pages/shared/ErrorPage";
import { Helmet } from "react-helmet-async";
import { getGlobalLeaderboard, getGameLeaderboard } from "@/services/gameApi";
import { getGameNavList } from "@/services/gameApi";
import Leaderboard from "@/components/Leaderboard";

export default function LeaderboardPage() {
  // --- State Management ---
  const [selectedBoard, setSelectedBoard] = useState("global");

  // --- Data Fetching ---
  const { data: gameLinks } = useQuery({
    queryKey: ["gameNavLinks"],
    queryFn: getGameNavList,
  });

  const {
    data: globalData,
    isLoading: isGlobalLoading,
    isError: isGlobalError,
    error: globalError,
  } = useQuery({
    queryKey: ["leaderboard", "global"],
    queryFn: getGlobalLeaderboard,
    // This query is only enabled when 'global' is selected
    enabled: selectedBoard === "global",
  });

  // Query 3: Fetches the GAME-SPECIFIC leaderboard data
  const {
    data: gameData,
    isLoading: isGameLoading,
    isError: isGameError,
    error: gameError,
  } = useQuery({
    queryKey: ["leaderboard", "game", selectedBoard],
    queryFn: () => getGameLeaderboard(selectedBoard),
    // This query is only enabled when a game slug is selected
    enabled: selectedBoard !== "global",
  });

  // --- Combine State for the UI ---
  const isLoading = isGlobalLoading || isGameLoading;
  const isError = isGlobalError || isGameError;
  const error = globalError || gameError;

  const leaderboardData = selectedBoard === "global" ? globalData : gameData;

  const handleBoardChange = (boardSlug) => {
    setSelectedBoard(boardSlug);
  };

  if (isError) return <ErrorPage errorMessage="Could Not Load Leaderboard" errorDescription={error.message} />;

  return (
    <div className="min-h-screen bg-black text-white sm:p-6 lg:p-8">
      <Helmet>
        <title>Leaderboards - Ripground</title>
        <meta name="description" content="View the latest leaderboards for global XP and individual games." />
      </Helmet>
      <div className="container mx-auto max-w-7xl">
        <header className="mt-16 sm:mt-20 mb-8 text-center">
          <Trophy className="mx-auto h-12 w-12 text-yellow-400 animate-pulse" />
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter text-white mt-4">Leaderboards</h1>
          <p className="text-lg text-neutral-400 mt-2">See who's dominating the competition.</p>
        </header>

        <Card className="bg-neutral-950/70 border-neutral-800 backdrop-blur-sm">
          <CardHeader className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 border-b border-neutral-800">
            <div className="flex items-center gap-2 text-lg font-semibold text-white">
              {selectedBoard === "global" ? <Globe className="h-5 w-5 text-blue-400" /> : <Gamepad2 className="h-5 w-5 text-green-400" />}
              <h2>{selectedBoard === "global" ? "Global XP Rankings" : gameLinks?.find((g) => g.slug === selectedBoard)?.title || "Game Leaderboard"}</h2>
            </div>
            <Select value={selectedBoard} onValueChange={handleBoardChange}>
              <SelectTrigger className="w-full md:w-64 bg-neutral-900 border-neutral-700 text-white">
                <SelectValue placeholder="Select a leaderboard..." />
              </SelectTrigger>
              <SelectContent className="bg-neutral-900 border-neutral-700 text-white">
                <SelectItem value="global">Global XP</SelectItem>
                {gameLinks?.map((game) => (
                  <SelectItem key={game.slug} value={game.slug}>
                    {game.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="p-6">{isLoading ? <div className="text-center py-24 text-neutral-400 text-lg animate-pulse">Fetching latest rankings...</div> : <Leaderboard data={leaderboardData} type={selectedBoard === "global" ? "global" : "game"} itemsPerPage={25} />}</CardContent>
        </Card>
      </div>
    </div>
  );
}

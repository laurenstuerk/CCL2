// src/features/profile/components/StatsAndAchievements.jsx

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { fetchUserGameStats, getGlobalLeaderboard } from "@/services/gameApi";
import { Trophy, Clock, Award, Star, BarChart2, UserPlus, ChartNoAxesColumn } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

// --- XP and League Logic ---
const LEAGUES = [
  { name: "Iron", minXp: 0, color: "text-neutral-400" },
  { name: "Bronze", minXp: 100, color: "text-amber-500" },
  { name: "Silver", minXp: 200, color: "text-slate-300" },
  { name: "Gold", minXp: 300, color: "text-yellow-400" },
  { name: "Diamond", minXp: 400, color: "text-cyan-400" },
];

const InfoSection = ({ title, icon: Icon, children }) => (
  <div className="py-8">
    <div className="flex items-center gap-3 mb-4">
      <Icon className="w-5 h-5 text-gray-400" />
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">{title}</h3>
    </div>
    <div className="text-lg text-gray-100">{children}</div>
  </div>
);

const getLeagueInfo = (xp) => {
  const currentXp = Number(xp) || 0;
  let currentLeague = [...LEAGUES].reverse().find((l) => currentXp >= l.minXp);
  if (!currentLeague) {
    currentLeague = LEAGUES[0];
  }
  const nextLeagueIndex = LEAGUES.findIndex((l) => l.name === currentLeague.name) + 1;
  const nextLeague = LEAGUES[nextLeagueIndex];
  if (!nextLeague) {
    return { current: currentLeague, next: null, progress: 100 };
  }
  const xpInCurrentTier = currentXp - currentLeague.minXp;
  const xpForNextTier = nextLeague.minXp - currentLeague.minXp;
  const progress = Math.min((xpInCurrentTier / xpForNextTier) * 100, 100);
  return { current: currentLeague, next: nextLeague, progress };
};

// --- Sub-Components ---
const XpProgressCircle = ({ xp }) => {
  const { current, next, progress } = getLeagueInfo(xp);
  const strokeWidth = 4;
  const radius = 50 - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={radius} strokeWidth={strokeWidth} className="text-neutral-800" stroke="currentColor" fill="transparent" />
        <circle cx="50" cy="50" r={radius} strokeWidth={strokeWidth} className={current.color} stroke="currentColor" fill="transparent" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.5s ease-out" }} />
      </svg>
      <div className="absolute text-center">
        <div className={`text-2xl font-bold ${current.color}`}>{current.name}</div>
        <div className="text-xs text-neutral-400">{xp.toLocaleString()} XP</div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, unit, isLoading }) => (
  <div className="p-6">
    <div className="flex items-center gap-3 text-neutral-400">
      {icon}
      <h3 className="text-sm font-semibold uppercase tracking-wider">{title}</h3>
    </div>
    {isLoading ? (
      <Skeleton className="h-9 w-3/4 mt-2 bg-neutral-800" />
    ) : (
      <p className="text-3xl font-light text-white mt-2">
        {value} <span className="text-lg text-neutral-400">{unit}</span>
      </p>
    )}
  </div>
);

const AchievementCard = ({ icon, title, description, achieved }) => (
  <div className={`bg-neutral-900 p-6 rounded-lg border border-neutral-800 transition-all ${achieved ? "border-green-500/30 bg-green-950/20" : ""}`}>
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${achieved ? "bg-green-500/20 text-green-400" : "bg-neutral-800 text-neutral-500"}`}>{icon}</div>
      <div className="text-center sm:text-left">
        <h3 className={`font-bold text-lg ${achieved ? "text-white" : "text-neutral-500"}`}>{title}</h3>
        <p className={`text-sm ${achieved ? "text-neutral-300" : "text-neutral-600"}`}>{description}</p>
      </div>
    </div>
  </div>
);

// --- Main Component ---
export default function StatsAndAchievements({ userProfile }) {
  const { user } = useAuth(); // For getting the current user's ID/username
  console.log("StatsAndAchievements userProfile:", userProfile);

  // Fetch the global leaderboard to find the user's rank
  const { data: globalLeaderboard, isLoading: isLoadingRank } = useQuery({
    queryKey: ["leaderboard", "global"],
    queryFn: getGlobalLeaderboard,
    staleTime: 1000 * 60 * 5, // Cache for 5 mins
  });

  const { data: marbleRushStats, isLoading: isLoadingStats } = useQuery({
    queryKey: ["userGameStats", "marble-rush-3d", user?.id],
    queryFn: () => fetchUserGameStats("marble-rush-3d"),
    enabled: !!user,
  });
  console.log("Marble Rush Stats:", marbleRushStats);

  // Find the current user's rank from the fetched data
  const userRankIndex = globalLeaderboard?.findIndex((p) => p.username === user?.username);
  const rank = userRankIndex !== -1 ? userRankIndex + 1 : "Unranked";

  // Helper to format hours and minutes
  const formatPlayTime = (ms) => {
    if (!ms || ms < 60000) return "<1 min";
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="space-y-12">
      <InfoSection title="Statistics" icon={ChartNoAxesColumn}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 flex flex-col items-center justify-center  p-6 ">
            <XpProgressCircle xp={userProfile.xp || 0} />
            <p className="text-center text-sm text-neutral-400 mt-2">Next League: {getLeagueInfo(userProfile.xp).next?.name || "Maxed"}</p>
          </div>
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <StatCard icon={<Trophy size={20} />} title="Global Rank" value={rank} isLoading={isLoadingRank} />
            <StatCard icon={<Clock size={20} />} title="Total Play Time" value={formatPlayTime(marbleRushStats?.stats.totalPlayTimeMs)} />
          </div>
        </div>
      </InfoSection>

      <Separator className="bg-gray-800" />

      {/* Achievements Section */}
      <InfoSection title="Achievements" icon={Trophy}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <AchievementCard icon={<BarChart2 size={24} />} title="First Game Played" description="Play your first game." achieved={marbleRushStats?.stats.timesPlayed >= 1} />
          <AchievementCard icon={<Star size={24} />} title="First Review" description="Share your thoughts on any game." achieved={marbleRushStats?.review.reviewCount >= 1} />
          <AchievementCard icon={<Award size={24} />} title="Game Master" description="Play 10 games." achieved={marbleRushStats?.stats.timesPlayed >= 10} />
          <AchievementCard icon={<UserPlus size={24} />} title="Sign Up" description="Create your account." achieved={true} />
          <AchievementCard icon={<Award size={24} />} title="Game Master" description="Play 100 games." achieved={marbleRushStats?.stats.timesPlayed >= 100} />
          <AchievementCard icon={<Trophy size={24} />} title="Time Traveler" description="Spend 1 hour playing games." achieved={marbleRushStats?.stats.totalPlayTimeMs >= 1000 * 60 * 60} />
        </div>
      </InfoSection>
    </div>
  );
}

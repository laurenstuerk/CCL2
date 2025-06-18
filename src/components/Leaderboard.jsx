// src/components/Leaderboard.jsx

import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Medal, Award, ChevronLeft, ChevronRight } from "lucide-react";

// --- Presentational Sub-Components & Helpers ---

const RankDisplay = ({ rank }) => {
  if (rank === 1) return <Trophy className="h-6 w-6 text-yellow-400" />;
  if (rank === 2) return <Medal className="h-6 w-6 text-slate-300" />;
  if (rank === 3) return <Award className="h-6 w-6 text-amber-500" />;
  return <span className="font-mono text-neutral-400">{rank}</span>;
};

const getRowClassName = (rank) => {
  if (rank === 1) return "bg-stone-700 border-l-2 border-yellow-400";
  if (rank === 2) return "bg-stone-800 border-l-2 border-slate-400";
  if (rank === 3) return "bg-stone-900 border-l-2 border-amber-500";
  return "border-l-2 border-transparent";
};

const getLeagueBadgeColor = (league) => {
  const colors = {
    Gold: "bg-[#FFD700] hover:bg-purple-600 text-purple-100 border border-purple-400/50",
    Silver: "bg-[#C0C0C0] hover:bg-blue-600 text-blue-100 border border-blue-400/50",
    Bronze: "bg-[#CD7F32] hover:bg-gray-600 text-gray-100 border border-gray-400/50",
  };
  return colors[league] || "bg-gray-700/80";
};

// --- Main Leaderboard Component ---

export default function Leaderboard({ data = [], type = "global", itemsPerPage = 20 }) {
  const [currentPage, setCurrentPage] = useState(1);

  // --- Client-Side Pagination Logic ---
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex).map((item, index) => ({
      ...item,
      // The rank is the starting index + the current item's index in the slice + 1
      rank: item.rank || startIndex + index + 1,
    }));
  }, [data, currentPage, itemsPerPage]);

  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);

  // Reset page if data changes and current page is out of bounds
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(1);
  }

  console.log("Leaderboard Data:", data);

  return (
    <>
      <div className="overflow-x-auto rounded-lg border border-neutral-800">
        <Table>
          <TableHeader>
            <TableRow className="border-neutral-800 hover:bg-neutral-900">
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Rank</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Player</TableHead>
              <TableHead className="text-center text-xs font-semibold uppercase tracking-wider text-neutral-400">League</TableHead>
              <TableHead className="text-right text-xs font-semibold uppercase tracking-wider text-neutral-400">{type === "global" ? "Joined" : "Timemark"}</TableHead>
              <TableHead className="text-right text-xs font-semibold uppercase tracking-wider text-neutral-400">{type === "global" ? "Total XP" : "Best Time"}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((player) => (
              <TableRow key={player.username + player.rank} className={`${getRowClassName(player.rank)} border-neutral-800/50`}>
                <TableCell className="font-bold text-lg">
                  <RankDisplay rank={player.rank} />
                </TableCell>
                <TableCell className="font-medium text-white">
                  <Link to={`/${player.username}`} className="flex items-center gap-3 group">
                    <span className="group-hover:text-blue-400 transition-colors">{player.username}</span>
                  </Link>
                </TableCell>
                <TableCell className="text-center">{player.league && <Badge className={getLeagueBadgeColor(player.league)}>{player.league}</Badge>}</TableCell>

                <TableCell className="text-right font-mono text-lg font-semibold">{type === "global" ? <div className="flex items-center justify-end gap-2 text-neutral-400">{new Date(player.created_at).toLocaleDateString()} </div> : <span className="text-green-400">{player.created_at}s</span>}</TableCell>

                <TableCell className="text-right font-mono text-lg font-semibold">{type === "global" ? <div className="flex items-center justify-end gap-2">{player.xp.toLocaleString()}</div> : <span className="text-green-400">{(player.time / 1000).toFixed(2)}s</span>}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between gap-4 p-4 mt-4">
          <span className="text-sm text-neutral-500">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="bg-neutral-800 border-neutral-700">
              <ChevronLeft className="h-4 w-4" /> Prev
            </Button>
            <Button variant="outline" size="sm" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="bg-neutral-800 border-neutral-700">
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

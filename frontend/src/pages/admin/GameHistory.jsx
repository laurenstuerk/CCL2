import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchGameHistory, deleteGameHistoryEntry } from "@/services/adminApi";
import { Helmet } from 'react-helmet-async';

// UI & Icon Imports
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUp, ArrowDown, Filter, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

// Hilfs-Komponente für sortierbare Spaltenköpfe
const SortableHeader = ({ columnId, label, sorting, onSort }) => (
  <Button variant="ghost" onClick={() => onSort(columnId)} className="pl-0 hover:bg-transparent">
    {label}
    {sorting.sortBy === columnId && (
      sorting.order === 'asc' ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />
    )}
  </Button>
);

export default function GameHistoryPage() {
  const queryClient = useQueryClient();
  const [filterOpen, setFilterOpen] = useState(false);

  // Zentraler State für alle Query-Parameter
  const [queryOptions, setQueryOptions] = useState({
    page: 1,
    limit: 10,
    sortBy: 'id',
    order: 'desc',
    game: '',
    username: '',
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['gameHistory', queryOptions],
    queryFn: () => fetchGameHistory(queryOptions),
    keepPreviousData: true,
  });

  // Mutation für das Löschen von Einträgen
  const deleteMutation = useMutation({
    mutationFn: deleteGameHistoryEntry,
    onSuccess: () => {
      // Wenn das Löschen erfolgreich war, lade die Daten der aktuellen Seite neu
      queryClient.invalidateQueries(['gameHistory', queryOptions]);
      // Hier könnte auch eine Erfolgs-Toast-Nachricht angezeigt werden
    },
    onError: (err) => {
      // Zeige eine Fehler-Toast-Nachricht an
      alert(err.message);
    }
  });

  const handleSort = (columnId) => {
    setQueryOptions(prev => ({
      ...prev,
      page: 1,
      sortBy: columnId,
      order: prev.sortBy === columnId && prev.order === 'asc' ? 'desc' : 'asc',
    }));
  };
  
  const handleFilterChange = (filterName, value) => {
    setQueryOptions(prev => ({
      ...prev,
      page: 1,
      [filterName]: value,
    }));
  };

  const currentData = data?.data || [];
  const pagination = data?.pagination;
  
  return (
    <div className="min-h-screen bg-black text-white p-6 pt-24">
      <Helmet>
        <title>Game History - Ripground Admin</title>
        <meta name="description" content="View and manage game history entries." />
      </Helmet>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Game History</h1>
          {/* Filter Dialog (vereinfacht für dieses Beispiel) */}
          <Input 
             placeholder="Search by username..."
             className="w-full md:w-64 bg-gray-900 border-gray-700 text-gray-100"
             value={queryOptions.username}
             onChange={(e) => handleFilterChange('username', e.target.value)}
          />
        </div>

        <div className="bg-natural-800 rounded-lg border border-gray-800 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800 hover:bg-transparent">
                <TableHead><SortableHeader columnId="id" label="ID" sorting={queryOptions} onSort={handleSort} /></TableHead>
                <TableHead><SortableHeader columnId="username" label="Username" sorting={queryOptions} onSort={handleSort} /></TableHead>
                <TableHead><SortableHeader columnId="game" label="Game" sorting={queryOptions} onSort={handleSort} /></TableHead>
                <TableHead><SortableHeader columnId="time" label="Time" sorting={queryOptions} onSort={handleSort} /></TableHead>
                <TableHead><SortableHeader columnId="played_at" label="Played At" sorting={queryOptions} onSort={handleSort} /></TableHead>
                <TableHead className="w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: queryOptions.limit }).map((_, i) => (
                  <TableRow key={i}><TableCell colSpan={6}><Skeleton className="h-8 w-full" /></TableCell></TableRow>
                ))
              ) : isError ? (
                <TableRow><TableCell colSpan={6} className="text-center text-red-500 py-10">{error.message}</TableCell></TableRow>
              ) : (
                currentData.map((item) => (
                  <TableRow key={item.id} className="border-gray-800 hover:bg-gray-800/30">
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.username}</TableCell>
                    <tableCell>{item.game_title}</tableCell>
                    <TableCell>{item.time}</TableCell>
                    <TableCell>{new Date(item.created_at).toLocaleString()}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300" onClick={() => deleteMutation.mutate(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Controls */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-400">
              Page {pagination.currentPage} of {pagination.totalPages}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => handleFilterChange('page', queryOptions.page - 1)} disabled={queryOptions.page === 1}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleFilterChange('page', queryOptions.page + 1)} disabled={queryOptions.page === pagination.totalPages}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
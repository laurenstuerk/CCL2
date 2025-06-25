// src/pages/admin/AdminDashboard.jsx

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchGeneralStats } from "../../services/adminApi"; // Make sure path is correct
import { Helmet } from "react-helmet-async";

// UI & Icon Imports
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, UserCheck, Calendar, Clock, TrendingUp, Database } from "lucide-react";

// Helper to format numbers with commas for display
const formatNumber = (num) => (num !== undefined && num !== null ? num.toLocaleString() : '0');

export default function AdminDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  // --- Live Data Fetching with TanStack Query ---
  const { data: stats, isLoading } = useQuery({
    queryKey: ['adminGeneralStats'],
    queryFn: fetchGeneralStats,
    // Refetch the data every 30 seconds to keep the dashboard live
    refetchInterval: 30000,
  });

  // Update the clock every second (this is a purely visual element)
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-8 mt-24">
      <Helmet>
        <title>Admin Dashboard - Overview</title>
      </Helmet>
      <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white">Admin Dashboard</h1>
            <p className="text-gray-400 mt-2 text-sm sm:text-base">Live overview of platform metrics.</p>
          </div>
          <Badge variant="outline" className="w-fit mt-4 sm:mt-0 border-gray-700 text-gray-300">
            <Database className="w-3 h-3 mr-2 text-green-400" />
            Live Data
          </Badge>
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
          <div className="space-y-2">
            <div className="flex items-center space-x-3"><Calendar className="h-5 w-5 text-gray-400" /><span className="text-gray-400 text-sm uppercase tracking-wide">Date</span></div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-light">{formatDate(currentTime)}</div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-3"><Clock className="h-5 w-5 text-gray-400" /><span className="text-gray-400 text-sm uppercase tracking-wide">Time</span></div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-light font-mono">{formatTime(currentTime)}</div>
          </div>
        </div>

        {/* User Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
          {isLoading ? (
            // Skeleton loaders for a better loading experience
            <>
              <Skeleton className="h-28 bg-neutral-900 rounded-lg" />
              <Skeleton className="h-28 bg-neutral-900 rounded-lg" />
              <Skeleton className="h-28 bg-neutral-900 rounded-lg sm:col-span-2 lg:col-span-1" />
            </>
          ) : (
            // Live data display
            <>
              <div className="space-y-2">
                <div className="flex items-center space-x-3"><UserCheck className="h-5 w-5 text-green-400" /><span className="text-gray-400 text-sm uppercase tracking-wide">Active Users</span></div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-light text-green-400">{formatNumber(stats?.activeUsers)}</div>
                <p className="text-xs text-gray-500">Users with a valid session</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-3"><Users className="h-5 w-5 text-blue-400" /><span className="text-gray-400 text-sm uppercase tracking-wide">Total Users</span></div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-light text-blue-400">{formatNumber(stats?.totalUsers)}</div>
                <p className="text-xs text-gray-500">All registered accounts</p>
              </div>
              <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                <div className="flex items-center space-x-3"><TrendingUp className="h-5 w-5 text-purple-400" /><span className="text-gray-400 text-sm uppercase tracking-wide">Recent Signups</span></div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-light text-purple-400">{formatNumber(stats?.recentSignups)}</div>
                <p className="text-xs text-gray-500">Today</p>
              </div>
            </>
          )}
        </div>
        
        {/* Status Footer */}
        <div className="text-center text-xs text-gray-600 border-t border-gray-800 pt-6">
          <p>Updates every 30s • Last checked at {formatTime(currentTime)}</p>
        </div>
      </div>
    </div>
  )
}

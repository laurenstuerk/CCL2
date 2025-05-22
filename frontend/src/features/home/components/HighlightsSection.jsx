// src/sections/HighlightsSection.jsx
import React from "react";
import { Trophy, Box, Lock, Gamepad2, LayoutGrid, Move3D } from "lucide-react";

export default function HighlightsSection() {
  return (
    <section
      className="w-full py-24 bg-slate-950 text-gray-100 px-4"
      aria-labelledby="highlights-heading"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          id="highlights-heading"
          className="text-4xl font-bold text-center mb-12"
        >
          Highlights
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-auto">
          {/* 3D Models - Large Tile */}
          <div className="bg-slate-800/60 rounded-3xl p-6 md:col-span-2 md:row-span-2 backdrop-blur-sm border border-slate-700/30 hover:border-orange-500/50 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors">
                High Quality 3D Models
              </h3>
              <Move3D className="w-8 h-8 text-orange-400" />
            </div>
            <p className="text-slate-300 mb-6">
              Hand-crafted 3D models with exceptional detail and performance
              optimization.
            </p>
            <div className="relative h-110 bg-gradient-to-br from-slate-700/40 to-slate-800/40 rounded-2xl overflow-hidden flex items-center justify-center">
              <img
                src="https://quaternius.com/assets/images/fullres/ultimatenature.jpg"
                alt="3D Models Showcase"
                className="object-cover w-full h-full opacity-90 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
              <span className="absolute bottom-4 left-4 bg-orange-500/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                Premium Quality
              </span>
            </div>
          </div>

          {/* Secure Authentication - Medium Tile */}
          <div className="bg-slate-800/60 rounded-3xl p-6 md:col-span-1 backdrop-blur-sm border border-slate-700/30 hover:border-blue-500/50 transition-all group">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                Secure Authentication
              </h3>
              <Lock className="w-6 h-6 text-blue-400" />
            </div>
            <p className="text-slate-300 text-sm mb-4">
              OTP verification, JWT tokens, and secure password hashing.
            </p>
            <div className="h-32 bg-gradient-to-br from-slate-700/40 to-slate-800/40 rounded-xl overflow-hidden flex items-center justify-center">
              <img
                src="https://i.pinimg.com/originals/c1/b8/e1/c1b8e17e184e23f17a73da983a50f723.gif"
                alt="Security Features"
                className="object-cover w-full h-full opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* 3D Games - Wide Tile */}
          <div className="bg-slate-800/60 rounded-3xl p-6 md:col-span-2 backdrop-blur-sm border border-slate-700/30 hover:border-green-500/50 transition-all group">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                Immersive 3D Games
              </h3>
              <Gamepad2 className="w-6 h-6 text-green-400" />
            </div>
            <p className="text-slate-300 text-sm mb-4">
              Interactive gaming experiences with stunning 3D environments.
            </p>
            <div className="h-40 bg-gradient-to-br from-slate-700/40 to-slate-800/40 rounded-xl overflow-hidden flex items-center justify-center">
              <img
                src="https://quaternius.com/assets/images/fullres/ultimatenature.jpg"
                alt="3D Gaming"
                className="object-cover w-full h-full opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent"></div>
              <span className="absolute bottom-3 left-3 bg-green-500/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                Play Now
              </span>
            </div>
          </div>

          {/* Modern Design - Small Tile */}
          <div className="bg-slate-800/60 rounded-3xl p-6 backdrop-blur-sm border border-slate-700/30 hover:border-purple-500/50 transition-all group">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                Modern Design
              </h3>
              <LayoutGrid className="w-6 h-6 text-purple-400" />
            </div>
            <p className="text-slate-300 text-sm">
              Sleek interfaces with cutting-edge UI/UX principles.
            </p>
          </div>

          {/* Leaderboard - Tall Tile */}
          <div className="bg-slate-800/60 rounded-3xl p-6 md:row-span-2 backdrop-blur-sm border border-slate-700/30 hover:border-yellow-500/50 transition-all group">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                Global Leaderboard
              </h3>
              <Trophy className="w-6 h-6 text-yellow-400" />
            </div>
            <p className="text-slate-300 text-sm mb-4">
              Compete with users worldwide and track your progress.
            </p>
            <div className="h-72 bg-gradient-to-br from-slate-700/40 to-slate-800/40 rounded-xl overflow-hidden flex items-center justify-center">
              <img
                src="/api/placeholder/300/500"
                alt="Leaderboard"
                className="object-cover w-full h-full opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
            </div>
          </div>

          {/* 3D Interactions - Medium Tile */}
          <div className="bg-slate-800/60 rounded-3xl p-6 md:col-span-1 backdrop-blur-sm border border-slate-700/30 hover:border-teal-500/50 transition-all group">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-bold text-white group-hover:text-teal-400 transition-colors">
                3D Interactions
              </h3>
              <Box className="w-6 h-6 text-teal-400" />
            </div>
            <p className="text-slate-300 text-sm mb-4">
              Intuitive 3D object manipulation and interactions.
            </p>
            <div className="h-32 bg-gradient-to-br from-slate-700/40 to-slate-800/40 rounded-xl overflow-hidden flex items-center justify-center">
              <img
                src="/api/placeholder/300/200"
                alt="3D Interactions"
                className="object-cover w-full h-full opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Advanced Analytics - Medium Tile */}
          <div className="bg-slate-800/60 rounded-3xl p-6 md:col-span-2 backdrop-blur-sm border border-slate-700/30 hover:border-pink-500/50 transition-all group">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-bold text-white group-hover:text-pink-400 transition-colors">
                Advanced Analytics
              </h3>
              <svg
                className="w-6 h-6 text-pink-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <p className="text-slate-300 text-sm mb-4">
              Comprehensive data visualization and performance insights.
            </p>
            <div className="h-36 bg-gradient-to-br from-slate-700/40 to-slate-800/40 rounded-xl overflow-hidden flex items-center justify-center">
              <img
                // src="/api/placeholder/500/200"
                alt="Analytics Dashboard"
                className="object-cover w-full h-full opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

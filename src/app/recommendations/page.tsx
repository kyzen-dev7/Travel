"use client";

import { useState } from "react";
import { trendingDestinations, travelStyles } from "@/lib/mockData";
import { TrendingUp, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RecommendationsPage() {
  const [selectedStyle, setSelectedStyle] = useState<string>("all");
  const [maxBudget, setMaxBudget] = useState<number>(5000);

  const filtered = trendingDestinations.filter((dest) => {
    return dest.avgBudget <= maxBudget;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="text-blue-600" />
            Discover Destinations
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Find your perfect destination based on your budget and travel style.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter size={18} className="text-blue-600" />
            <h2 className="font-semibold text-gray-900 dark:text-white">Filter Destinations</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Max Budget: ${maxBudget.toLocaleString()}
              </label>
              <input
                type="range"
                min="500"
                max="10000"
                step="500"
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>$500</span>
                <span>$5,000</span>
                <span>$10,000</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Travel Style</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedStyle("all")}
                  className={cn(
                    "px-3 py-1 rounded-full text-sm border transition",
                    selectedStyle === "all"
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400"
                  )}
                >
                  All
                </button>
                {travelStyles.map((style) => (
                  <button
                    key={style.value}
                    onClick={() => setSelectedStyle(style.value)}
                    className={cn(
                      "px-3 py-1 rounded-full text-sm border transition flex items-center gap-1",
                      selectedStyle === style.value
                        ? "bg-blue-600 text-white border-blue-600"
                        : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400"
                    )}
                  >
                    <span>{style.icon}</span>
                    <span>{style.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((dest) => (
            <div
              key={dest.name}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 p-8 text-center">
                <span className="text-6xl">{dest.image}</span>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">{dest.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400">{dest.country}</p>
                  </div>
                  {dest.trending && (
                    <span className="flex items-center gap-1 text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-2 py-1 rounded-full">
                      🔥 Hot
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {dest.bestFor.map((tag) => (
                    <span key={tag} className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-3 mt-3">
                  <div>
                    <p className="text-xs text-gray-400">Avg. Budget</p>
                    <p className="font-semibold text-gray-900 dark:text-white">${dest.avgBudget.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Best Season</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{dest.season}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-500 dark:text-gray-400">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-lg font-medium">No destinations match your filters</p>
            <p className="text-sm">Try increasing your budget</p>
          </div>
        )}
      </div>
    </div>
  );
}

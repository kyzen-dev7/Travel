"use client";

import { useState } from "react";
import { Itinerary } from "@/types/travel";
import TravelForm from "@/components/planner/TravelForm";
import ItineraryView from "@/components/itinerary/ItineraryView";
import BudgetChart from "@/components/budget/BudgetChart";
import TravelInsights from "@/components/insights/TravelInsights";
import { trendingDestinations } from "@/lib/mockData";
import { Sparkles, TrendingUp, Star } from "lucide-react";

export default function Home() {
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);

  const handleSaveTrip = (trip: Itinerary) => {
    alert("Trip saved to your dashboard!");
    console.log("Saved trip:", trip.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Hero */}
      {!itinerary && (
        <section className="pt-12 pb-8 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="text-blue-500" size={28} />
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                AI-Powered Travel Planning
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              Plan Your Perfect Trip with{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Magic
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Enter your destination, budget, and travel style. Our AI generates a complete day-by-day
              itinerary with hotels, food, activities, and budget intelligence.
            </p>
          </div>
        </section>
      )}

      <div className="max-w-7xl mx-auto px-4 pb-12">
        {!itinerary ? (
          <>
            {/* Form */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <span>🗺️</span> Plan Your Trip
                </h2>
                <TravelForm onItineraryGenerated={setItinerary} />
              </div>
            </div>

            {/* Trending Destinations */}
            <div className="mt-16">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="text-blue-600" size={22} />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Trending Destinations</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {trendingDestinations.map((dest) => (
                  <div
                    key={dest.name}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="text-3xl mb-1">{dest.image}</div>
                        <h3 className="font-bold text-gray-900 dark:text-white">{dest.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{dest.country}</p>
                      </div>
                      {dest.trending && (
                        <span className="flex items-center gap-1 text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-2 py-1 rounded-full">
                          <TrendingUp size={10} />
                          Trending
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
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>Avg. ${dest.avgBudget.toLocaleString()}</span>
                      <span>Best: {dest.season}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Back button */}
            <button
              onClick={() => setItinerary(null)}
              className="mb-6 flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
            >
              ← Plan Another Trip
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main itinerary */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
                  <ItineraryView itinerary={itinerary} onSave={handleSaveTrip} />
                </div>
              </div>

              {/* Sidebar: Budget + Insights */}
              <div className="space-y-6">
                {/* Budget */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Star className="text-yellow-500" size={18} />
                    Budget Intelligence
                  </h3>
                  <BudgetChart
                    breakdown={itinerary.budgetBreakdown}
                    userBudget={itinerary.userBudget}
                    currency={itinerary.currency}
                  />
                </div>

                {/* Travel Insights */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4">✈️ Travel Insights</h3>
                  <TravelInsights
                    insights={itinerary.insights}
                    hotels={itinerary.hotels}
                    foodRecommendations={itinerary.foodRecommendations}
                    localTips={itinerary.localTips}
                    currency={itinerary.currency}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

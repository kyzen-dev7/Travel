"use client";

import { useState } from "react";
import { MapPin, DollarSign, Calendar, Users, Compass, Loader2 } from "lucide-react";
import { TravelFormData, Itinerary } from "@/types/travel";
import { travelStyles, currencies } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface TravelFormProps {
  onItineraryGenerated: (itinerary: Itinerary) => void;
}

export default function TravelForm({ onItineraryGenerated }: TravelFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<TravelFormData>({
    destination: "",
    budget: 2000,
    currency: "USD",
    startDate: "",
    endDate: "",
    travelStyle: "comfort",
    travelers: 1,
  });

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.destination.trim()) {
      setError("Please enter a destination");
      return;
    }
    if (!formData.startDate || !formData.endDate) {
      setError("Please select travel dates");
      return;
    }
    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      setError("End date must be after start date");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate itinerary");
      }

      onItineraryGenerated(data.itinerary);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Destination */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          <MapPin size={16} className="inline mr-1" />
          Destination
        </label>
        <input
          type="text"
          value={formData.destination}
          onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
          placeholder="e.g., Paris, Bali, Tokyo..."
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Calendar size={16} className="inline mr-1" />
            Start Date
          </label>
          <input
            type="date"
            min={today}
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Calendar size={16} className="inline mr-1" />
            End Date
          </label>
          <input
            type="date"
            min={formData.startDate || today}
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
      </div>

      {/* Budget & Currency */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          <DollarSign size={16} className="inline mr-1" />
          Total Budget
        </label>
        <div className="flex gap-2">
          <select
            value={formData.currency}
            onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
            className="px-3 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {currencies.map((c) => (
              <option key={c.code} value={c.code}>{c.code}</option>
            ))}
          </select>
          <input
            type="number"
            min="100"
            max="1000000"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
      </div>

      {/* Travelers */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          <Users size={16} className="inline mr-1" />
          Number of Travelers: <span className="text-blue-600">{formData.travelers}</span>
        </label>
        <input
          type="range"
          min="1"
          max="20"
          value={formData.travelers}
          onChange={(e) => setFormData({ ...formData, travelers: Number(e.target.value) })}
          className="w-full accent-blue-600"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>1</span>
          <span>5</span>
          <span>10</span>
          <span>15</span>
          <span>20</span>
        </div>
      </div>

      {/* Travel Style */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          <Compass size={16} className="inline mr-1" />
          Travel Style
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {travelStyles.map((style) => (
            <button
              key={style.value}
              type="button"
              onClick={() => setFormData({ ...formData, travelStyle: style.value })}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-medium transition-all",
                formData.travelStyle === style.value
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-blue-300"
              )}
            >
              <span>{style.icon}</span>
              <span>{style.label}</span>
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-60 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
      >
        {loading ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Generating Your Perfect Trip...
          </>
        ) : (
          <>✨ Generate AI Itinerary</>
        )}
      </button>
    </form>
  );
}

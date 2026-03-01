"use client";

import { useState } from "react";
import { Shield, Clock, FileText, Cloud, ChevronDown, ChevronUp } from "lucide-react";
import { TravelInsights as TravelInsightsType, HotelSuggestion } from "@/types/travel";

interface TravelInsightsProps {
  insights: TravelInsightsType;
  hotels: HotelSuggestion[];
  foodRecommendations: string[];
  localTips: string[];
  currency: string;
}

export default function TravelInsights({
  insights,
  hotels,
  foodRecommendations,
  localTips,
  currency,
}: TravelInsightsProps) {
  const [expanded, setExpanded] = useState<string | null>("hotels");

  const sections = [
    {
      id: "hotels",
      title: "🏨 Hotel Suggestions",
      content: (
        <div className="space-y-3">
          {hotels.map((hotel, i) => (
            <div key={i} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{hotel.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{hotel.location}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-blue-600 dark:text-blue-400">
                    {currency} {hotel.pricePerNight}/night
                  </p>
                  <p className="text-xs text-yellow-500">{"⭐".repeat(Math.round(hotel.rating))}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {hotel.amenities.map((amenity) => (
                  <span key={amenity} className="text-xs px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "food",
      title: "🍜 Food Recommendations",
      content: (
        <ul className="space-y-2">
          {foodRecommendations.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
              <span className="text-orange-400 mt-0.5">•</span>
              {item}
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "tips",
      title: "💡 Local Tips",
      content: (
        <ul className="space-y-2">
          {localTips.map((tip, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
              <span className="text-blue-400 mt-0.5">→</span>
              {tip}
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "besttime",
      title: "🕐 Best Time to Visit",
      content: (
        <p className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
          <Clock size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
          {insights.bestTimeToVisit}
        </p>
      ),
    },
    {
      id: "safety",
      title: "🛡️ Safety Tips",
      content: (
        <ul className="space-y-2">
          {insights.safetyTips.map((tip, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
              <Shield size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
              {tip}
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "visa",
      title: "📋 Visa Information",
      content: (
        <p className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
          <FileText size={16} className="text-purple-500 mt-0.5 flex-shrink-0" />
          {insights.visaInfo}
        </p>
      ),
    },
    {
      id: "weather",
      title: "🌤️ Weather Overview",
      content: (
        <p className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
          <Cloud size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
          {insights.weatherOverview}
        </p>
      ),
    },
  ];

  return (
    <div className="space-y-2">
      {sections.map((section) => (
        <div key={section.id} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
          <button
            onClick={() => setExpanded(expanded === section.id ? null : section.id)}
            className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
          >
            <span className="font-medium text-gray-900 dark:text-white text-sm">{section.title}</span>
            {expanded === section.id ? (
              <ChevronUp size={16} className="text-gray-400" />
            ) : (
              <ChevronDown size={16} className="text-gray-400" />
            )}
          </button>
          {expanded === section.id && (
            <div className="p-3 pt-0 border-t border-gray-100 dark:border-gray-700/50">
              {section.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

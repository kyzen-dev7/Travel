"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Edit2, Check, Download, Share2, Trash2, GripVertical } from "lucide-react";
import { Itinerary, Activity } from "@/types/travel";
import { cn } from "@/lib/utils";

interface ItineraryViewProps {
  itinerary: Itinerary;
  onSave?: (itinerary: Itinerary) => void;
}

export default function ItineraryView({ itinerary, onSave }: ItineraryViewProps) {
  const [expandedDays, setExpandedDays] = useState<number[]>([1]);
  const [editingActivity, setEditingActivity] = useState<string | null>(null);
  const [editedActivities, setEditedActivities] = useState<Record<string, Activity>>({});
  const [localItinerary, setLocalItinerary] = useState<Itinerary>(itinerary);
  const [copied, setCopied] = useState(false);

  const toggleDay = (day: number) => {
    setExpandedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const startEdit = (activity: Activity) => {
    setEditingActivity(activity.id);
    setEditedActivities((prev) => ({ ...prev, [activity.id]: { ...activity } }));
  };

  const saveEdit = (dayIndex: number, activityId: string) => {
    const edited = editedActivities[activityId];
    if (!edited) return;

    const updatedDays = localItinerary.days.map((day, i) => {
      if (i !== dayIndex) return day;
      return {
        ...day,
        activities: day.activities.map((a) => (a.id === activityId ? edited : a)),
      };
    });

    setLocalItinerary({ ...localItinerary, days: updatedDays });
    setEditingActivity(null);
  };

  const deleteActivity = (dayIndex: number, activityId: string) => {
    const updatedDays = localItinerary.days.map((day, i) => {
      if (i !== dayIndex) return day;
      return {
        ...day,
        activities: day.activities.filter((a) => a.id !== activityId),
      };
    });
    setLocalItinerary({ ...localItinerary, days: updatedDays });
  };

  const handleShare = () => {
    const url = `${window.location.origin}/shared/${localItinerary.shareId}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const categoryColors: Record<string, string> = {
    Accommodation: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
    Food: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
    Activity: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    Transport: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header actions */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {localItinerary.destination} Trip
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {localItinerary.days.length} days • {localItinerary.currency} {localItinerary.userBudget.toLocaleString()} budget
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 text-sm transition"
          >
            <Share2 size={16} />
            {copied ? "Copied!" : "Share"}
          </button>
          <button
            onClick={() => alert("PDF export coming soon!")}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm transition"
          >
            <Download size={16} />
            Export PDF
          </button>
          {onSave && (
            <button
              onClick={() => onSave(localItinerary)}
              className="flex items-center gap-1 px-3 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 text-sm transition"
            >
              <Check size={16} />
              Save Trip
            </button>
          )}
        </div>
      </div>

      {/* Days */}
      {localItinerary.days.map((day, dayIndex) => (
        <div
          key={day.day}
          className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden animate-slide-up"
          style={{ animationDelay: `${dayIndex * 0.05}s` }}
        >
          {/* Day header */}
          <button
            onClick={() => toggleDay(day.day)}
            className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 transition"
          >
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold">
                {day.day}
              </span>
              <div className="text-left">
                <div className="font-semibold text-gray-900 dark:text-white">{day.theme}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{day.date}</div>
              </div>
            </div>
            {expandedDays.includes(day.day) ? (
              <ChevronUp size={20} className="text-gray-400" />
            ) : (
              <ChevronDown size={20} className="text-gray-400" />
            )}
          </button>

          {/* Activities */}
          {expandedDays.includes(day.day) && (
            <div className="p-4 space-y-3">
              {day.activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 group"
                >
                  <div className="flex-shrink-0 mt-1">
                    <GripVertical size={16} className="text-gray-300 dark:text-gray-600 cursor-grab" />
                  </div>
                  <div className="flex-1 min-w-0">
                    {editingActivity === activity.id ? (
                      <div className="space-y-2">
                        <input
                          value={editedActivities[activity.id]?.title || ""}
                          onChange={(e) =>
                            setEditedActivities((prev) => ({
                              ...prev,
                              [activity.id]: { ...prev[activity.id], title: e.target.value },
                            }))
                          }
                          className="w-full px-3 py-1 rounded-lg border border-blue-300 dark:border-blue-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <textarea
                          value={editedActivities[activity.id]?.description || ""}
                          onChange={(e) =>
                            setEditedActivities((prev) => ({
                              ...prev,
                              [activity.id]: { ...prev[activity.id], description: e.target.value },
                            }))
                          }
                          rows={2}
                          className="w-full px-3 py-1 rounded-lg border border-blue-300 dark:border-blue-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => saveEdit(dayIndex, activity.id)}
                            className="px-3 py-1 bg-green-600 text-white rounded-lg text-xs hover:bg-green-700"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingActivity(null)}
                            className="px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-xs hover:bg-gray-300 dark:hover:bg-gray-500"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-xs text-gray-400 dark:text-gray-500 mr-2">{activity.time}</span>
                            <span className="font-medium text-gray-900 dark:text-white text-sm">{activity.title}</span>
                          </div>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                            <button
                              onClick={() => startEdit(activity)}
                              className="p-1 rounded text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              onClick={() => deleteActivity(dayIndex, activity.id)}
                              className="p-1 rounded text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={cn("text-xs px-2 py-0.5 rounded-full", categoryColors[activity.category] || "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300")}>
                            {activity.category}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {localItinerary.currency} {activity.cost}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

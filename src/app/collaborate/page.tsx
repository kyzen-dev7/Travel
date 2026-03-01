"use client";

import { useState } from "react";
import { Users, Share2, ThumbsUp, ThumbsDown, Copy, Check } from "lucide-react";

const mockActivities = [
  { id: "1", title: "Visit Eiffel Tower", votes: { up: 5, down: 1 }, userVote: null as VoteType },
  { id: "2", title: "Louvre Museum Tour", votes: { up: 8, down: 0 }, userVote: null as VoteType },
  { id: "3", title: "Seine River Cruise", votes: { up: 3, down: 2 }, userVote: null as VoteType },
  { id: "4", title: "Montmartre Walking Tour", votes: { up: 6, down: 1 }, userVote: null as VoteType },
  { id: "5", title: "Versailles Day Trip", votes: { up: 4, down: 3 }, userVote: null as VoteType },
];

const mockCollaborators = [
  { name: "Alice", avatar: "👩", online: true },
  { name: "Bob", avatar: "👨", online: true },
  { name: "Carol", avatar: "👩‍🦱", online: false },
  { name: "Dave", avatar: "🧑", online: false },
];

type VoteType = "up" | "down" | null;

interface Activity {
  id: string;
  title: string;
  votes: { up: number; down: number };
  userVote: VoteType;
}

export default function CollaboratePage() {
  const [activities, setActivities] = useState<Activity[]>(mockActivities);
  const [shareUrl] = useState("https://travelai.app/shared/xyz123abc");
  const [copied, setCopied] = useState(false);
  const [tripName] = useState("Paris Adventure 2025");

  const handleVote = (activityId: string, voteType: VoteType) => {
    setActivities((prev) =>
      prev.map((activity) => {
        if (activity.id !== activityId) return activity;
        const wasVotedSame = activity.userVote === voteType;
        const prevVote = activity.userVote;

        const newVotes = { ...activity.votes };
        if (prevVote) newVotes[prevVote]--;
        if (!wasVotedSame && voteType) newVotes[voteType]++;

        return {
          ...activity,
          votes: newVotes,
          userVote: wasVotedSame ? null : voteType,
        };
      })
    );
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Users className="text-blue-600" /> Collaboration Mode
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Plan trips together. Vote on activities. Agree on the perfect itinerary.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main voting area */}
          <div className="lg:col-span-2 space-y-4">
            {/* Trip header */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">{tripName}</h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">4 collaborators • 5 activities to vote on</p>
                </div>
                <span className="flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Live
                </span>
              </div>
            </div>

            {/* Activity voting */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Vote on Activities</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Cast your vote for each activity</p>
              </div>
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {activities.map((activity) => (
                  <div key={activity.id} className="p-4 flex items-center justify-between gap-4">
                    <span className="font-medium text-gray-900 dark:text-white flex-1">{activity.title}</span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleVote(activity.id, "up")}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition ${
                          activity.userVote === "up"
                            ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                        }`}
                      >
                        <ThumbsUp size={14} />
                        <span>{activity.votes.up}</span>
                      </button>
                      <button
                        onClick={() => handleVote(activity.id, "down")}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition ${
                          activity.userVote === "down"
                            ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                        }`}
                      >
                        <ThumbsDown size={14} />
                        <span>{activity.votes.down}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Share link */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Share2 size={18} className="text-blue-600" /> Share Trip
              </h3>
              <div className="flex gap-2">
                <input
                  readOnly
                  value={shareUrl}
                  className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs border border-gray-200 dark:border-gray-600"
                />
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg bg-blue-600 text-white text-xs hover:bg-blue-700 transition flex-shrink-0"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>

            {/* Collaborators */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Users size={18} className="text-blue-600" /> Collaborators
              </h3>
              <div className="space-y-2">
                {mockCollaborators.map((person) => (
                  <div key={person.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{person.avatar}</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{person.name}</span>
                    </div>
                    <span className={`text-xs ${person.online ? "text-green-500" : "text-gray-400"}`}>
                      {person.online ? "● Online" : "○ Offline"}
                    </span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-3 py-2 rounded-lg border border-dashed border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                + Invite collaborator
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

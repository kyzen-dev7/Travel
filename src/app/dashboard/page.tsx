"use client";

import { useState } from "react";
import Link from "next/link";
import { LogIn, UserPlus, Plus } from "lucide-react";

type AuthState = "guest" | "login" | "signup" | "logged-in";

export default function DashboardPage() {
  const [authState, setAuthState] = useState<AuthState>("guest");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setUserName(email.split("@")[0]);
    setAuthState("logged-in");
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setUserName(name || email.split("@")[0]);
    setAuthState("logged-in");
  };

  if (authState === "guest") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 text-center">
          <div className="text-6xl mb-4">✈️</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your Travel Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Sign in to save trips, view history, and collaborate with friends.</p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setAuthState("login")}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <LogIn size={18} /> Sign In
            </button>
            <button
              onClick={() => setAuthState("signup")}
              className="w-full py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center justify-center gap-2"
            >
              <UserPlus size={18} /> Create Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (authState === "login") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Welcome Back</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button type="submit" className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
              Sign In
            </button>
          </form>
          <div className="mt-4 text-center">
            <button onClick={() => setAuthState("signup")} className="text-blue-600 dark:text-blue-400 text-sm hover:underline">
              Don&apos;t have an account? Sign up
            </button>
          </div>
          <button onClick={() => setAuthState("guest")} className="mt-2 w-full text-center text-gray-400 text-sm hover:underline">
            Back
          </button>
        </div>
      </div>
    );
  }

  if (authState === "signup") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create Account</h1>
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button type="submit" className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
              Create Account
            </button>
          </form>
          <div className="mt-4 text-center">
            <button onClick={() => setAuthState("login")} className="text-blue-600 dark:text-blue-400 text-sm hover:underline">
              Already have an account? Sign in
            </button>
          </div>
          <button onClick={() => setAuthState("guest")} className="mt-2 w-full text-center text-gray-400 text-sm hover:underline">
            Back
          </button>
        </div>
      </div>
    );
  }

  // Logged in state
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Welcome back, {userName}! 👋
              </h1>
              <p className="text-gray-500 dark:text-gray-400">Manage your travel plans</p>
            </div>
          </div>
          <button
            onClick={() => setAuthState("guest")}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition"
          >
            Sign Out
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Trips", value: "0", icon: "✈️" },
            { label: "Countries", value: "0", icon: "🌍" },
            { label: "Budget Saved", value: "$0", icon: "💰" },
            { label: "Upcoming", value: "0", icon: "📅" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Saved Trips (empty state) */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Trips</h2>
            <Link
              href="/"
              className="flex items-center gap-1 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
            >
              <Plus size={16} /> Plan New Trip
            </Link>
          </div>
          <div className="text-center py-12 text-gray-400">
            <div className="text-5xl mb-4">🗺️</div>
            <p className="text-lg font-medium text-gray-600 dark:text-gray-400">No saved trips yet</p>
            <p className="text-sm mb-6">Start planning your first adventure!</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              <Plus size={18} /> Plan Your First Trip
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

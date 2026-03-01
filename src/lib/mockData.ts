import { Destination } from "@/types/travel";

export const trendingDestinations: Destination[] = [
  {
    name: "Bali",
    country: "Indonesia",
    image: "🏝️",
    trending: true,
    bestFor: ["Beach", "Culture", "Budget"],
    avgBudget: 1500,
    season: "April - October",
  },
  {
    name: "Tokyo",
    country: "Japan",
    image: "🗼",
    trending: true,
    bestFor: ["Culture", "Food", "Technology"],
    avgBudget: 3000,
    season: "March - May",
  },
  {
    name: "Paris",
    country: "France",
    image: "🗼",
    trending: true,
    bestFor: ["Romance", "Art", "Food"],
    avgBudget: 4000,
    season: "April - June",
  },
  {
    name: "New York",
    country: "USA",
    image: "🗽",
    trending: false,
    bestFor: ["City", "Culture", "Shopping"],
    avgBudget: 5000,
    season: "September - November",
  },
  {
    name: "Santorini",
    country: "Greece",
    image: "⛵",
    trending: true,
    bestFor: ["Romance", "Beach", "Luxury"],
    avgBudget: 3500,
    season: "June - September",
  },
  {
    name: "Machu Picchu",
    country: "Peru",
    image: "🏔️",
    trending: false,
    bestFor: ["Adventure", "History", "Nature"],
    avgBudget: 2500,
    season: "April - October",
  },
];

export const travelStyles = [
  { value: "budget", label: "Budget Backpacker", icon: "🎒" },
  { value: "comfort", label: "Comfort Traveler", icon: "🏨" },
  { value: "luxury", label: "Luxury Explorer", icon: "💎" },
  { value: "adventure", label: "Adventure Seeker", icon: "🧗" },
  { value: "cultural", label: "Cultural Immersion", icon: "🎭" },
  { value: "family", label: "Family Friendly", icon: "👨‍👩‍👧‍👦" },
];

export const currencies = [
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
  { code: "JPY", symbol: "¥" },
  { code: "INR", symbol: "₹" },
];

export interface TravelFormData {
  destination: string;
  budget: number;
  currency: string;
  startDate: string;
  endDate: string;
  travelStyle: string;
  travelers: number;
}

export interface Activity {
  id: string;
  time: string;
  title: string;
  description: string;
  cost: number;
  category: string;
}

export interface DayPlan {
  day: number;
  date: string;
  theme: string;
  activities: Activity[];
}

export interface HotelSuggestion {
  name: string;
  pricePerNight: number;
  rating: number;
  amenities: string[];
  location: string;
}

export interface BudgetBreakdown {
  accommodation: number;
  food: number;
  activities: number;
  transport: number;
  miscellaneous: number;
  total: number;
}

export interface TravelInsights {
  bestTimeToVisit: string;
  safetyTips: string[];
  visaInfo: string;
  weatherOverview: string;
}

export interface Itinerary {
  id: string;
  destination: string;
  days: DayPlan[];
  hotels: HotelSuggestion[];
  budgetBreakdown: BudgetBreakdown;
  foodRecommendations: string[];
  localTips: string[];
  insights: TravelInsights;
  userBudget: number;
  currency: string;
  shareId: string;
}

export interface SavedTrip {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  currency: string;
  itinerary: Itinerary;
  createdAt: string;
}

export interface Destination {
  name: string;
  country: string;
  image: string;
  trending: boolean;
  bestFor: string[];
  avgBudget: number;
  season: string;
}

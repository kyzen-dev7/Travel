import { TravelFormData, Itinerary, Activity, DayPlan } from "@/types/travel";

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function generateMockItinerary(formData: TravelFormData): Itinerary {
  const { destination, budget, currency, startDate, endDate, travelStyle, travelers } = formData;

  const start = new Date(startDate);
  const end = new Date(endDate);
  const numDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  const dayThemes = [
    "Arrival & Orientation",
    "Cultural Exploration",
    "Nature & Adventure",
    "Local Cuisine Tour",
    "Historical Sites",
    "Relaxation & Leisure",
    "Shopping & Departure",
  ];

  const days: DayPlan[] = Array.from({ length: numDays }, (_, i) => {
    const date = new Date(start);
    date.setDate(start.getDate() + i);

    const activities: Activity[] = [
      {
        id: generateId(),
        time: "09:00 AM",
        title: i === 0 ? "Check-in & Hotel Orientation" : `Morning Exploration - ${destination}`,
        description: i === 0
          ? `Arrive at ${destination}, check into hotel, and get oriented with the local area.`
          : `Explore the beautiful sights and sounds of ${destination} in the morning.`,
        cost: Math.floor(budget / numDays / 4),
        category: "Accommodation",
      },
      {
        id: generateId(),
        time: "12:00 PM",
        title: "Lunch at Local Restaurant",
        description: `Enjoy authentic ${destination} cuisine at a recommended local restaurant.`,
        cost: Math.floor(budget / numDays / 6),
        category: "Food",
      },
      {
        id: generateId(),
        time: "02:00 PM",
        title: i === numDays - 1 ? "Last-minute Shopping" : `Afternoon Activity`,
        description: i === numDays - 1
          ? "Pick up souvenirs and gifts for loved ones."
          : `Participate in a popular ${travelStyle} activity in ${destination}.`,
        cost: Math.floor(budget / numDays / 4),
        category: "Activity",
      },
      {
        id: generateId(),
        time: "07:00 PM",
        title: "Dinner & Evening",
        description: `Enjoy dinner and evening entertainment in ${destination}.`,
        cost: Math.floor(budget / numDays / 6),
        category: "Food",
      },
    ];

    return {
      day: i + 1,
      date: date.toISOString().split("T")[0],
      theme: dayThemes[i % dayThemes.length],
      activities,
    };
  });

  const accommodationCost = Math.floor(budget * 0.35);
  const foodCost = Math.floor(budget * 0.25);
  const activitiesCost = Math.floor(budget * 0.20);
  const transportCost = Math.floor(budget * 0.12);
  const miscCost = Math.floor(budget * 0.08);

  // travelers is used for future scaling; currently budget is total
  void travelers;

  return {
    id: generateId(),
    destination,
    days,
    hotels: [
      {
        name: `${destination} Grand Hotel`,
        pricePerNight: Math.floor(accommodationCost / numDays),
        rating: 4.5,
        amenities: ["WiFi", "Pool", "Gym", "Restaurant", "Spa"],
        location: `Central ${destination}`,
      },
      {
        name: `${destination} Boutique Inn`,
        pricePerNight: Math.floor(accommodationCost / numDays * 0.7),
        rating: 4.2,
        amenities: ["WiFi", "Breakfast", "Garden"],
        location: `Old Town ${destination}`,
      },
      {
        name: `${destination} Budget Hostel`,
        pricePerNight: Math.floor(accommodationCost / numDays * 0.4),
        rating: 3.8,
        amenities: ["WiFi", "Shared Kitchen", "Locker"],
        location: `Backpacker District`,
      },
    ],
    budgetBreakdown: {
      accommodation: accommodationCost,
      food: foodCost,
      activities: activitiesCost,
      transport: transportCost,
      miscellaneous: miscCost,
      total: accommodationCost + foodCost + activitiesCost + transportCost + miscCost,
    },
    foodRecommendations: [
      `Try the famous local street food in ${destination}'s night markets`,
      `Visit traditional ${destination} restaurants for authentic cuisine`,
      `Don't miss the local breakfast specialties`,
      `Explore food tours for a curated culinary experience`,
      `Try cooking classes to learn local recipes`,
    ],
    localTips: [
      `Learn a few basic phrases in the local language`,
      `Carry local currency for small purchases`,
      `Respect local customs and dress codes`,
      `Download offline maps before exploring`,
      `Keep emergency contacts and local embassy info handy`,
      `Stay hydrated and use sunscreen`,
    ],
    insights: {
      bestTimeToVisit: `The best time to visit ${destination} is during spring and autumn when the weather is mild.`,
      safetyTips: [
        "Keep your valuables secure and be aware of your surroundings",
        "Register with your country's embassy when traveling abroad",
        "Keep copies of important documents",
        "Have travel insurance that covers medical emergencies",
      ],
      visaInfo: `Please check the official embassy website for current visa requirements for ${destination}. Requirements vary by nationality.`,
      weatherOverview: `${destination} has a varied climate. Pack layers and check the forecast before your trip.`,
    },
    userBudget: budget,
    currency,
    shareId: generateId(),
  };
}

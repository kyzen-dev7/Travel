import { NextRequest, NextResponse } from "next/server";
import { generateMockItinerary } from "@/lib/generateItinerary";
import { TravelFormData } from "@/types/travel";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { destination, budget, currency, startDate, endDate, travelStyle, travelers } = body;

    if (!destination || !budget || !startDate || !endDate) {
      return NextResponse.json(
        { error: "Missing required fields: destination, budget, startDate, endDate" },
        { status: 400 }
      );
    }

    if (isNaN(Number(budget)) || Number(budget) <= 0) {
      return NextResponse.json(
        { error: "Budget must be a positive number" },
        { status: 400 }
      );
    }

    const formData: TravelFormData = {
      destination: String(destination).trim(),
      budget: Number(budget),
      currency: String(currency || "USD"),
      startDate: String(startDate),
      endDate: String(endDate),
      travelStyle: String(travelStyle || "comfort"),
      travelers: Number(travelers || 1),
    };

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const itinerary = generateMockItinerary(formData);

    return NextResponse.json({
      success: true,
      itinerary,
      message: "Itinerary generated successfully",
    });
  } catch (error) {
    console.error("Error generating itinerary:", error);
    return NextResponse.json(
      { error: "Failed to generate itinerary. Please try again." },
      { status: 500 }
    );
  }
}

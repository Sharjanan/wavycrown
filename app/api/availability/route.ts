// app/api/availability/route.ts
import { NextRequest, NextResponse } from "next/server";

type AvailabilityRequest = {
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
};

type Slot = {
  startAt: string;   // ISO datetime
  locationId: string;
};

export async function POST(req: NextRequest) {
  let body: AvailabilityRequest;

  try {
    body = (await req.json()) as AvailabilityRequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { startDate, endDate } = body;

  // TODO: integrate Square SDK here and populate slots from real data.
  // Keeping a typed, empty array for now avoids 'any' and unused vars.
  const slots: Slot[] = [];

  return NextResponse.json({
    availabilities: slots,
    startDate,
    endDate,
  });
}

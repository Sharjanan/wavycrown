import square from "square";
import { NextResponse } from "next/server";
import { SquareClient } from "square";

   const client = new SquareClient({
    token: process.env.SQUARE_ACCESS_TOKEN!,
    environment: 'production',
  });
export async function POST(req: Request) {
  const body = await req.json();

  const { startDate, endDate } = body;

  try {
const response = await fetch("https://connect.squareupsandbox.com/v2/bookings/availability/search", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Square-Version": "2023-12-13",
    "Authorization": `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
  },
  body: JSON.stringify({
    query: {
      filter: {
        locationId: process.env.SQUARE_LOCATION_ID,
        segmentFilters: [
          {
            serviceVariationId: "H6VBVZR5WK6L2AV25LFMZYTE",
            teamMemberIdFilter: {
              any: ["TMjlxDEVkFWHS8Ea"]
            }
          }
        ],
        startAtRange: {
          startAt: "2025-05-20T00:00:00Z",
          endAt: "2025-05-27T00:00:00Z"
        }
      }
    }
  })
});

const data = await response.json();

    return NextResponse.json(data.result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

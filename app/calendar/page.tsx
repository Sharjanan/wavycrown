"use client";

import { useEffect, useState } from "react";

export default function CalendarPage() {
  const [slots, setSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAvailability = async () => {
      const today = new Date();
      const startDate = today.toISOString().split("T")[0];
      const endDate = new Date(today.setDate(today.getDate() + 7)).toISOString().split("T")[0];

     try {
  const res = await fetch("/api/availability", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ startDate, endDate }),
  });

  if (!res.ok) throw new Error("Failed to fetch availability");

  const data = await res.json();
  console.log("Availability data:", data);
  setSlots(data.availabilities || []);
} catch (error) {
  console.error("Error fetching availability:", error);
} finally {
  setLoading(false);
}

    };

    

    fetchAvailability();
  }, []);

  return (
    <main className="min-h-screen p-6 bg-white text-black">
      <h1 className="text-3xl font-bold mb-4">Your Upcoming Shifts & Open Slots</h1>

      {loading ? (
        <p>Loading availability...</p>
      ) : slots.length === 0 ? (
        <p>No open slots available this week.</p>
      ) : (
        <ul className="space-y-2">
          {slots.map((slot, idx) => (
            <li key={idx} className="p-3 border rounded bg-gray-100">
              {new Date(slot.startAt).toLocaleString()} — {slot.locationId}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

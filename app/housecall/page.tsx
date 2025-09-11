// app/housecall/page.tsx
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import AddressForm from './AddressForm';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Datepicker } from "flowbite-react";

const HousecallMap = dynamic(() => import('./HousecallMap'), { ssr: false });

export default function HousecallPage() {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedHours, setSelectedHours] = useState<string[]>([]);
  const hourOptions = [
    { label: "Morning", value: "morning" },
    { label: "Afternoon", value: "afternoon" },
    { label: "Evening", value: "evening" },
    { label: "Weekend", value: "weekend" },
  ];
    const toggleHour = (value: string) => {
    setSelectedHours((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : prev.length < 2
        ? [...prev, value]
        : prev
    );
  };
  return (
    <>
    <main className="fixed inset-0 h-screen w-screen overflow-hidden pt-16">
      {/* Fullscreen background map */}
      <div className="absolute inset-0 -z-10">
        <HousecallMap coords={coords} />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-90
                      bg-gradient-to-b from-black via-black/50 to-transparent -z-0" />

      {/* Content overlay */}
      <section className="relative max-w-3xl mx-auto px-4 pt-32">
        <h1 className="text-3xl md:text-4xl font-semibold text-gold text-center drop-shadow-md">
          Step 1: Type Your Address
        </h1>

        <div className="mt-6 bg-white/200 backdrop-blur-sm rounded-2xl shadow-lg ">
          <AddressForm
            onGeocode={(lat, lng, label) => {
              setCoords({ lat, lng });
            }}
          />
        </div>
      </section>

      {/* Next button pinned near bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <Button
          className="px-40 py-3  font-semibold "
          variant="gold" size="pill"
          onClick={() => setDrawerOpen(true)}
        >
          Next
        </Button>
      </div>

    </main>

    {/* Drawer Overlay */}
{drawerOpen && (
  <div
    className="fixed  z-50"
    onClick={() => setDrawerOpen(false)}
  />
)}

{/* Drawer */}
<div
  className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-60 shadow-xl transform transition-transform duration-300 ${
    drawerOpen ? "-translate-x-0" : "translate-x-full"
  }`}
  style={{ width: "100%", maxWidth: 400 }}
  onClick={e => e.stopPropagation()}
>
  {/* Progress Bar */}
  <div className="w-full h-2 bg-gray-200">
    <div className="h-2 bg-gold transition-all" style={{ width: "50%" }} />
  </div>
  <div className="p-8 flex flex-col gap-6">
    <h2 className="text-2xl font-bold text-gold mb-4">Step 2: Booking Details</h2>
    <label className="text-black font-semibold">
            Preferred Date *
            <div className="relative max-w-sm">
  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
    </svg>
  </div>
 <Datepicker
      className="w-full rounded-lg border border-gray-300 text-sm text-black focus:ring-gold focus:border-gold"
      placeholder="Select date"
    /></div>
          </label>
    <label className="text-black font-semibold">
      Preferred Hours *
      <div className="grid grid-cols-2 gap-4">
              {hourOptions.map((option) => (
               <Card
      key={option.value}
      className={`cursor-pointer rounded-xl border-2 p-4 font-semibold transition-colors
        ${selectedHours.includes(option.value)
          ? "bg-gold text-black border-gold"
          : "bg-white text-black border-gray-300 hover:border-gold"
        }
        ${selectedHours.length === 2 && !selectedHours.includes(option.value) ? "opacity-50 cursor-not-allowed" : ""}
      `}
      onClick={() => toggleHour(option.value)}
      tabIndex={0}
      role="button"
      aria-pressed={selectedHours.includes(option.value)}
    >
      {option.label}
    </Card>
              ))}
            </div>
    </label>
    <Button
      className="mt-6 px-6 py-3 rounded-xl font-semibold"
      variant="gold" size="pill"
    >
      Continue
    </Button>
  </div>
</div>
    </>
  );
}

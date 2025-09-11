// app/housecall/page.tsx
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import AddressForm from './AddressForm';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
          className="px-40 py-3  font-semibold z-70"
          variant="mapButton" size="pill"
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
      <input className="hs-datepicker py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-600 focus:ring-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder:text-neutral-400 dark:focus:border-blue-500 dark:focus:ring-neutral-500" 
      type="text" 
      placeholder="Select day"
       
       />
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
      className="mt-6 px-6 py-3 rounded-xl font-semibold bg-gold text-black hover:bg-black hover:text-gold transition-colors shadow-lg"
      // onClick={...} // handle continue
    >
      Continue
    </Button>
  </div>
</div>
    </>
  );
}
